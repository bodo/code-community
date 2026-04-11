#!/usr/bin/env node
/**
 * build-all.mjs — Orchestrator
 *
 * Runs the token generator, then (if present) the Mautic theme builder.
 * Phase 0 ships with tokens only; Phase 2 adds Mautic.
 */

import { buildTokensToDisk } from './build-tokens.mjs';

async function main() {
  console.log('[ci] Building design tokens…');
  buildTokensToDisk();

  // Try to run the Mautic theme builder if it exists. Soft-import so
  // Phase 0 of the project doesn't depend on mjml being installed yet.
  try {
    const { buildMauticTheme } = await import('./build-mautic.mjs');
    console.log('[ci] Building Mautic theme…');
    await buildMauticTheme();
  } catch (err) {
    if (err?.code === 'ERR_MODULE_NOT_FOUND') {
      console.log('[ci] Skipping Mautic theme (build-mautic.mjs not present yet).');
    } else {
      throw err;
    }
  }

  console.log('[ci] Build complete.');
}

main().catch(err => {
  console.error('[ci] Build failed:', err);
  process.exit(1);
});
