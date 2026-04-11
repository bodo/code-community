# ci/ — Single Source of Truth for design artefacts

This directory is the central build foundation for the abschluss.jetzt project. It owns the **design tokens** (colours, typography, spacing, shadows) and the **Mautic email theme source**. All consumers — the Astro website, the Typst eBooks, the Reveal.js presentation deck, and the Mautic email theme on vps3 — read their design values from generated files in `ci/build/`.

## Why is this here?

Before this directory existed, the same colour values were duplicated in:

- `website/abschluss.jetzt/src/styles/global.css` (Tailwind `@theme` block)
- `content/template.typ` (Typst eBook template)
- `organization/presentation/index.html` (Reveal deck)
- Every Mautic email template (inline HTML, hand-edited)

Changing a colour meant touching four places and hoping nobody forgot one. The `ci/` directory centralises all of this into a single JSON source (`design-tokens.json`) from which every consumer regenerates its artefacts.

## Directory layout

```txt
ci/
├── README.md                  — this file
├── package.json               — devDeps: mjml, html-validate, vitest
├── design-tokens.json         — SOURCE OF TRUTH: colors, typography, etc.
├── generators/
│   ├── build-tokens.mjs       — tokens.json → css / typst / reveal-css / mautic-json
│   ├── build-mautic.mjs       — MJML source → Mautic theme (Phase 2)
│   └── build-all.mjs          — orchestrator
├── scripts/
│   ├── build.sh               — run all generators
│   ├── check.sh               — build + git diff --exit-code (CI guard)
│   └── deploy-mautic-theme.sh — rsync theme to vps3 (Phase 2)
├── mautic-theme/              — MJML source + assets (Phase 2)
│   └── src/
├── __tests__/                 — vitest unit tests for generators
└── build/                     — GENERATED and COMMITTED
    ├── tokens.css             → website/abschluss.jetzt/src/styles/global.css (via @import)
    ├── tokens.typ             → content/template.typ (via #import)
    ├── tokens-reveal.css      → organization/presentation/index.html (via <link>)
    ├── tokens-mautic.json     → consumed by build-mautic.mjs
    └── mautic-theme/          → rsynced to vps3:/var/www/mautic/themes/ (Phase 2)
```

## Build output is committed

`ci/build/` is **committed to git**, not gitignored. This is deliberate:

- Consumers (website deploy, eBook build, reveal deck) don't need to run the ci-build step — they just pick up the latest `ci/build/` from the working tree
- CI check (`ci/scripts/check.sh`) regenerates the build directory and asserts `git diff --exit-code build/` — this catches any drift where someone changed `design-tokens.json` without rebuilding
- Code review sees the actual generated output, not just the source

## Usage

```bash
# Install dependencies once
cd ci
npm install

# Rebuild all artefacts
npm run build

# Just tokens (fast, no MJML)
npm run build:tokens

# Check that committed build/ is in sync with sources
npm run check

# Run tests
npm test
```

## Changing a colour

1. Edit `ci/design-tokens.json` — change the value, e.g. `"primary.600": "#1e40af"`
2. Run `npm run build` in `ci/`
3. Verify with `git diff ci/build/` that only the expected files changed
4. Commit both the source change and the regenerated build/ files in one commit
5. Deploy the consumers that need the new value:
   - Website: `cd website/abschluss.jetzt && npm run deploy`
   - eBooks: `cd content && ./build.sh && ./scripts/deploy-ebooks.sh`
   - Mautic theme: `cd ci && npm run deploy:mautic`
   - Reveal deck: `cd organization/presentation && ./deploy.sh`

## Migration path: from monorepo to packages

This directory is structured so it can later be split into proper npm packages
published to an internal registry (Verdaccio on pve3):

| Current | Future |
| --- | --- |
| `ci/design-tokens.json` | `@abschluss/design-tokens` package |
| `ci/generators/build-tokens.mjs` | `@abschluss/token-generators` package |
| `ci/mautic-theme/src/` | `@abschluss/mautic-theme` package |
| `ci/build/tokens.css` | entry in `@abschluss/design-tokens/dist/` |

Consumers would switch from `@import "../../../ci/build/tokens.css"` to
`@import "@abschluss/design-tokens/dist/tokens.css"` after `npm install`. The
generator logic itself barely changes.

This migration is **not part of the current plan** — we start with the
monorepo approach and only move to a registry once the scale justifies it
(multiple teams, multiple independent consumer repos, or versioning needs).

## See also

- `website/abschluss.jetzt/docs/design-tokens.md` — workflow details
- `website/abschluss.jetzt/docs/mautic-theme.md` — email theme specifics
- `website/abschluss.jetzt/docs/testing.md` — how the test suite is organised
