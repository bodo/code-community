#!/usr/bin/env node
/**
 * build-mautic.mjs — Build the Mautic email theme from MJML sources.
 *
 * Flow:
 *   1. Read ci/mautic-theme/src/email-base.mjml.
 *   2. Inline any <!-- INCLUDE:partials/xxx.mjml --> markers by literal file substitution.
 *   3. Substitute TOKEN:foo-bar placeholders with the actual values from
 *      ci/build/tokens-mautic.json (written by build-tokens.mjs).
 *   4. Compile the resulting MJML into HTML via the mjml node API.
 *   5. Replace <!-- SLOT:name --> markers with Mautic-Twig slot syntax
 *      `{{ slot('name', '…default…') }}`.
 *   6. Write the result to ci/build/mautic-theme/abschluss/html/base.html.twig
 *      and copy config.json, theme.css, placeholder thumbnail.
 *
 * The generator functions (applyTokens, inlineIncludes, slotifyHtml) are pure
 * and unit-tested separately. The CLI entry point at the bottom performs the
 * side-effects (fs reads/writes, mjml compile).
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CI_ROOT = resolve(__dirname, '..');
const THEME_SRC_ROOT = join(CI_ROOT, 'mautic-theme');
const BUILD_ROOT = join(CI_ROOT, 'build', 'mautic-theme', 'abschluss');

// ---------------------------------------------------------------------------
// Pure transformation functions (unit-testable)
// ---------------------------------------------------------------------------

/**
 * Replace every TOKEN:foo-bar placeholder in $source with the value from
 * $tokens (a flat key/value object, as emitted by generateTokensMauticJson).
 *
 * Unknown tokens are left as-is (so a later test can catch them).
 */
export function applyTokens(source, tokens) {
  return source.replace(/TOKEN:([a-zA-Z0-9_-]+)/g, (_match, key) => {
    if (key in tokens) return tokens[key];
    return `TOKEN:${key}`; // keep for visibility; test will fail on unresolved
  });
}

/**
 * Expand <!-- INCLUDE:partials/foo.mjml --> markers by substituting
 * the content of the referenced file. Paths are relative to $baseDir.
 * Recursion is not supported (keep partials flat).
 */
export function inlineIncludes(source, baseDir, readFile) {
  return source.replace(/<!--\s*INCLUDE:([^\s]+)\s*-->/g, (_match, relPath) => {
    const full = join(baseDir, relPath);
    return readFile(full);
  });
}

/**
 * Convert SLOT:name markers into Mautic Twig slot syntax.
 * Matches both HTML comment form (<!-- SLOT:foo -->) and bare form (SLOT:foo),
 * because MJML strips HTML comments inside certain elements (like mj-preview).
 * Mautic's slot helper takes a name and an optional default value.
 */
export function slotifyHtml(html) {
  // Comment form first (more restrictive)
  let out = html.replace(/<!--\s*SLOT:([a-zA-Z_][a-zA-Z0-9_]*)\s*-->/g,
    (_match, name) => `{{ slot('${name}', '') }}`);
  // Bare form — only for surviving text nodes like the preview string
  out = out.replace(/SLOT:([a-zA-Z_][a-zA-Z0-9_]*)/g,
    (_match, name) => `{{ slot('${name}', '') }}`);
  return out;
}

/**
 * Assert every TOKEN: and SLOT: placeholder has been resolved.
 * Throws on any leftover — guards against typos in partials.
 */
export function assertNoUnresolvedPlaceholders(content) {
  const leftoverTokens = content.match(/TOKEN:[a-zA-Z0-9_-]+/g);
  if (leftoverTokens) {
    throw new Error(`Unresolved tokens in generated theme: ${[...new Set(leftoverTokens)].join(', ')}`);
  }
  const leftoverSlots = content.match(/<!--\s*SLOT:[^>]+-->/g);
  if (leftoverSlots) {
    throw new Error(`Unresolved slot markers in generated theme: ${leftoverSlots.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

export async function buildMauticTheme({ ciRoot = CI_ROOT } = {}) {
  const mjmlModule = await import('mjml');
  const mjml2html = mjmlModule.default ?? mjmlModule;

  const themeSrc = join(ciRoot, 'mautic-theme');
  const buildRoot = join(ciRoot, 'build', 'mautic-theme', 'abschluss');

  // 1. Read tokens
  const tokensPath = join(ciRoot, 'build', 'tokens-mautic.json');
  if (!existsSync(tokensPath)) {
    throw new Error(`Tokens file not found: ${tokensPath}. Run build-tokens.mjs first.`);
  }
  const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));

  // 2. Read and assemble MJML source
  const baseMjml = readFileSync(join(themeSrc, 'src', 'email-base.mjml'), 'utf8');
  const withIncludes = inlineIncludes(
    baseMjml,
    join(themeSrc, 'src'),
    (path) => readFileSync(path, 'utf8')
  );
  const withTokens = applyTokens(withIncludes, tokens);

  // 3. Compile MJML → HTML
  const result = mjml2html(withTokens, { validationLevel: 'soft', minify: false });
  if (result.errors && result.errors.length > 0) {
    for (const err of result.errors) {
      console.error(`  ! MJML: ${err.formattedMessage}`);
    }
    throw new Error('MJML compile failed.');
  }

  // 4. Slotify + verify
  const twig = slotifyHtml(result.html);
  assertNoUnresolvedPlaceholders(twig);

  // 5. Write output tree
  mkdirSync(join(buildRoot, 'html'), { recursive: true });
  mkdirSync(join(buildRoot, 'assets', 'css'), { recursive: true });
  mkdirSync(join(buildRoot, 'assets', 'images'), { recursive: true });

  writeFileSync(join(buildRoot, 'html', 'base.html.twig'), twig, 'utf8');
  writeFileSync(join(buildRoot, 'html', 'email.html.twig'), twig, 'utf8');
  writeFileSync(join(buildRoot, 'html', 'page.html.twig'),
    '{# Landing page template placeholder — not used yet. #}\n' + twig, 'utf8');

  // Copy config + theme assets
  copyFileSync(join(themeSrc, 'config.json'), join(buildRoot, 'config.json'));
  copyFileSync(join(themeSrc, 'assets', 'theme.css'), join(buildRoot, 'assets', 'css', 'theme.css'));
  copyFileSync(join(ciRoot, 'build', 'tokens-mautic.json'), join(buildRoot, 'assets', 'css', 'tokens.json'));

  // Placeholder thumbnail — a 1x1 transparent PNG so Mautic's theme picker
  // doesn't 404. Real thumbnail can replace it later.
  const pngPath = join(buildRoot, 'thumbnail.png');
  if (!existsSync(pngPath)) {
    const tinyPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB8DtXNJsAAAAASUVORK5CYII=',
      'base64'
    );
    writeFileSync(pngPath, tinyPng);
  }

  console.log(`  ✓ mautic-theme/abschluss/html/base.html.twig (${twig.length} bytes)`);
  console.log(`  ✓ mautic-theme/abschluss/config.json`);
}

// Run if invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Building Mautic theme…');
  buildMauticTheme().then(
    () => console.log('Done.'),
    (err) => { console.error('[build-mautic] failed:', err); process.exit(1); }
  );
}
