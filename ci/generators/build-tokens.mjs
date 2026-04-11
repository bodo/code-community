#!/usr/bin/env node
/**
 * build-tokens.mjs — Design Token Build
 *
 * Reads ci/design-tokens.json and emits render-target-specific files in ci/build/:
 *
 *   - tokens.css           → Tailwind @theme block for Astro
 *   - tokens.typ           → Typst module for eBooks
 *   - tokens-reveal.css    → Reveal.js :root variables for the presentation deck
 *   - tokens-mautic.json   → Key-value subset consumed by build-mautic.mjs
 *
 * Pure function: takes input path, returns generated content as strings.
 * Side-effects (fs.writeFileSync) only in the CLI section at the bottom.
 * This makes the generator directly unit-testable.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CI_ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Generators (pure, testable)
// ---------------------------------------------------------------------------

/**
 * Iterate all colour tokens as (name, value) pairs.
 * Names are flattened: "primary.600" becomes "primary-600",
 * "light.bg" becomes "light-bg".
 */
export function* iterColors(tokens) {
  for (const [group, values] of Object.entries(tokens.colors)) {
    for (const [key, hex] of Object.entries(values)) {
      yield [`${group}-${key}`, hex];
    }
  }
}

/**
 * Generate Tailwind v4 @theme block for Astro.
 * Consumed via @import in website/abschluss.jetzt/src/styles/global.css.
 */
export function generateTokensCss(tokens) {
  const lines = [
    '/* AUTO-GENERATED — do not edit. Source: ci/design-tokens.json */',
    '/* Regenerate with: cd ci && npm run build:tokens */',
    '',
    '@theme {',
  ];

  for (const [name, hex] of iterColors(tokens)) {
    lines.push(`  --color-${name}: ${hex};`);
  }

  lines.push('');
  lines.push(`  --font-sans: ${tokens.typography.fontSans};`);
  lines.push(`  --font-mono: ${tokens.typography.fontMono};`);
  lines.push(`  --font-serif: ${tokens.typography.fontSerif};`);

  lines.push('');
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${value};`);
  }

  lines.push('');
  for (const [key, value] of Object.entries(tokens.shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

/**
 * Generate Typst module for eBooks.
 * Exports every color as a named constant, e.g. #let primary-600 = rgb("#2563eb")
 *
 * Historical aliases from content/template.typ (like `primary`, `accent`, `muted`)
 * are provided so the existing eBooks keep working. Aliases that would collide
 * with flat names (e.g. dark-bg, light-bg) are skipped because the flat name
 * already exists with the same value.
 */
export function generateTokensTyp(tokens) {
  const lines = [
    '// AUTO-GENERATED — do not edit. Source: ci/design-tokens.json',
    '// Regenerate with: cd ci && npm run build:tokens',
    '',
    '// --- Colors ---',
  ];

  const flatNames = new Set();
  for (const [name, hex] of iterColors(tokens)) {
    lines.push(`#let ${name} = rgb("${hex}")`);
    flatNames.add(name);
  }

  lines.push('');
  lines.push('// --- Convenience aliases (historical names from content/template.typ) ---');
  // Alias name → canonical token name
  const aliases = {
    'primary':       'primary-600',
    'primary-light': 'primary-500',
    'primary-dark':  'primary-900',
    'accent':        'accent-500',
    'accent-light':  'accent-400',
    'muted':         'light-muted',
    'warning':       'semantic-warning',
    'danger':        'semantic-danger',
  };
  for (const [alias, target] of Object.entries(aliases)) {
    if (flatNames.has(alias)) continue; // skip collisions
    lines.push(`#let ${alias} = ${target}`);
  }
  lines.push('');
  return lines.join('\n');
}

/**
 * Generate CSS variables for Reveal.js deck.
 * Maps our tokens onto Reveal's official --r-* variables.
 *
 * Note: the deck uses slightly different (brighter) accents than the main
 * website because they read better on a dark projector background. Those
 * values live in `tokens.deck.*` — a deck-specific section of the tokens.
 */
export function generateTokensRevealCss(tokens) {
  const deck = tokens.deck || {};
  return [
    '/* AUTO-GENERATED — do not edit. Source: ci/design-tokens.json */',
    '/* Regenerate with: cd ci && npm run build:tokens */',
    '',
    ':root {',
    `  --r-background-color: ${tokens.colors.dark.bg};`,
    `  --r-main-color: ${tokens.colors.dark.text};`,
    `  --r-heading-color: ${deck.heading || tokens.colors.primary[400]};`,
    `  --r-link-color: ${deck.heading || tokens.colors.primary[400]};`,
    `  --r-selection-background-color: ${deck.heading || tokens.colors.primary[400]}80;`,
    `  --r-selection-color: ${tokens.colors.dark.text};`,
    '',
    '  /* Custom shortcuts used by the deck (bright variants for projector contrast) */',
    `  --abschluss-accent: ${deck.accent || tokens.colors.accent[500]};`,
    `  --abschluss-green: ${deck.green || tokens.colors.accent[400]};`,
    `  --abschluss-orange: ${deck.orange || tokens.colors.semantic.warning};`,
    `  --abschluss-red: ${deck.red || '#ff1b1b'};`,
    `  --abschluss-muted: ${deck.muted || tokens.colors.dark.muted};`,
    '}',
    '',
  ].join('\n');
}

/**
 * Generate flat JSON for the Mautic builder (Phase 2 consumer).
 * Kept flat for easy Twig injection.
 */
export function generateTokensMauticJson(tokens) {
  const out = {};
  for (const [name, hex] of iterColors(tokens)) {
    out[`color-${name}`] = hex;
  }
  for (const [key, value] of Object.entries(tokens.email)) {
    out[`email-${key}`] = value;
  }
  out['font-sans'] = tokens.typography.fontSans;
  out['font-serif'] = tokens.typography.fontSerif;
  return JSON.stringify(out, null, 2) + '\n';
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

export function buildTokensToDisk({ ciRoot = CI_ROOT } = {}) {
  const tokensPath = join(ciRoot, 'design-tokens.json');
  const buildDir = join(ciRoot, 'build');

  const raw = readFileSync(tokensPath, 'utf8');
  const tokens = JSON.parse(raw);

  mkdirSync(buildDir, { recursive: true });

  const outputs = {
    'tokens.css':         generateTokensCss(tokens),
    'tokens.typ':         generateTokensTyp(tokens),
    'tokens-reveal.css':  generateTokensRevealCss(tokens),
    'tokens-mautic.json': generateTokensMauticJson(tokens),
  };

  for (const [filename, content] of Object.entries(outputs)) {
    writeFileSync(join(buildDir, filename), content, 'utf8');
    console.log(`  ✓ ${filename}`);
  }
}

// Run if invoked directly (not imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Building design tokens…');
  buildTokensToDisk();
  console.log('Done.');
}
