/**
 * Unit tests for build-mautic.mjs — pure transformation functions.
 */

import { describe, it, expect } from 'vitest';
import {
  applyTokens,
  inlineIncludes,
  slotifyHtml,
  assertNoUnresolvedPlaceholders,
} from '../generators/build-mautic.mjs';

describe('applyTokens', () => {
  const tokens = {
    'color-primary-600': '#2563eb',
    'color-light-muted': '#64748b',
    'email-contentWidth': '600px',
  };

  it('substitutes a single token', () => {
    expect(applyTokens('color: TOKEN:color-primary-600;', tokens))
      .toBe('color: #2563eb;');
  });

  it('substitutes multiple tokens in one string', () => {
    const input = '<div style="color: TOKEN:color-primary-600; width: TOKEN:email-contentWidth;">';
    expect(applyTokens(input, tokens))
      .toBe('<div style="color: #2563eb; width: 600px;">');
  });

  it('leaves unknown tokens untouched so tests can catch them', () => {
    expect(applyTokens('TOKEN:unknown-key', tokens)).toBe('TOKEN:unknown-key');
  });

  it('ignores plain text that happens to contain TOKEN', () => {
    expect(applyTokens('a TOKEN of appreciation', tokens))
      .toBe('a TOKEN of appreciation');
  });
});

describe('inlineIncludes', () => {
  it('replaces an INCLUDE marker with the file content', () => {
    const source = 'before\n<!-- INCLUDE:partials/header.mjml -->\nafter';
    const readFile = (path) => {
      if (path === 'base/partials/header.mjml') return '<mj-text>hi</mj-text>';
      throw new Error('unexpected: ' + path);
    };
    expect(inlineIncludes(source, 'base', readFile))
      .toBe('before\n<mj-text>hi</mj-text>\nafter');
  });

  it('handles multiple includes in one source', () => {
    const source = '<!-- INCLUDE:a.mjml -->\n<!-- INCLUDE:b.mjml -->';
    const readFile = (path) => path.endsWith('a.mjml') ? 'AAA' : 'BBB';
    expect(inlineIncludes(source, 'base', readFile)).toBe('AAA\nBBB');
  });

  it('leaves source unchanged if no includes present', () => {
    expect(inlineIncludes('plain text', 'base', () => 'x')).toBe('plain text');
  });
});

describe('slotifyHtml', () => {
  it('converts a comment-form SLOT marker to twig syntax', () => {
    expect(slotifyHtml('<div><!-- SLOT:content --></div>'))
      .toBe("<div>{{ slot('content', '') }}</div>");
  });

  it('converts a bare SLOT marker (survives mj-preview stripping)', () => {
    expect(slotifyHtml('<div>SLOT:preview</div>'))
      .toBe("<div>{{ slot('preview', '') }}</div>");
  });

  it('handles multiple slots in the same input', () => {
    const input = '<!-- SLOT:a -->\n<!-- SLOT:b -->';
    expect(slotifyHtml(input))
      .toBe("{{ slot('a', '') }}\n{{ slot('b', '') }}");
  });
});

describe('assertNoUnresolvedPlaceholders', () => {
  it('passes for clean output', () => {
    expect(() => assertNoUnresolvedPlaceholders('<html>clean</html>')).not.toThrow();
  });

  it('throws on leftover TOKEN markers', () => {
    expect(() => assertNoUnresolvedPlaceholders('color: TOKEN:color-missing;'))
      .toThrow(/Unresolved tokens/);
  });

  it('throws on leftover SLOT markers', () => {
    expect(() => assertNoUnresolvedPlaceholders('<!-- SLOT:forgotten -->'))
      .toThrow(/Unresolved slot/);
  });
});
