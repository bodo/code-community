/**
 * Unit tests for build-tokens.mjs — the pure generator functions.
 *
 * We feed a minimal fixture token set and assert the shape of the generated
 * outputs. No filesystem side-effects — the generator functions are pure.
 */

import { describe, it, expect } from 'vitest';
import {
  iterColors,
  generateTokensCss,
  generateTokensTyp,
  generateTokensRevealCss,
  generateTokensMauticJson,
} from '../generators/build-tokens.mjs';

const fixture = {
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb', 900: '#1e3a8a' },
    accent:  { 500: '#10b981' },
    semantic: { warning: '#f59e0b', danger: '#ef4444', success: '#10b981', info: '#3b82f6' },
    dark:    { bg: '#0f172a', text: '#e2e8f0', muted: '#94a3b8' },
    light:   { bg: '#f8fafc', muted: '#64748b' },
  },
  typography: {
    fontSans: '"Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    fontSerif: 'Georgia, serif',
  },
  radius: { sm: '0.25rem', md: '0.5rem' },
  shadows: { sm: '0 1px 2px rgb(0 0 0 / 0.05)' },
  email: {
    contentWidth: '600px',
    bodyBackground: '#f8fafc',
    buttonBackground: '#2563eb',
  },
};

describe('iterColors', () => {
  it('flattens nested color groups to <group>-<key> pairs', () => {
    const pairs = Array.from(iterColors(fixture));
    expect(pairs).toContainEqual(['primary-600', '#2563eb']);
    expect(pairs).toContainEqual(['accent-500', '#10b981']);
    expect(pairs).toContainEqual(['dark-bg', '#0f172a']);
    expect(pairs).toContainEqual(['light-muted', '#64748b']);
    expect(pairs).toContainEqual(['semantic-warning', '#f59e0b']);
  });

  it('emits every color in the fixture', () => {
    const pairs = Array.from(iterColors(fixture));
    // 3 primary + 1 accent + 4 semantic + 3 dark + 2 light
    expect(pairs).toHaveLength(13);
  });
});

describe('generateTokensCss', () => {
  it('produces a Tailwind v4 @theme block', () => {
    const css = generateTokensCss(fixture);
    expect(css).toMatch(/^\/\* AUTO-GENERATED/);
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-primary-600: #2563eb;');
    expect(css).toContain('--color-dark-bg: #0f172a;');
    expect(css).toContain('--font-sans: "Inter", sans-serif;');
    expect(css).toContain('--radius-md: 0.5rem;');
    expect(css).toContain('--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);');
    expect(css.trim().endsWith('}')).toBe(true);
  });

  it('carries the "do not edit" warning', () => {
    const css = generateTokensCss(fixture);
    expect(css).toContain('do not edit');
    expect(css).toContain('ci/design-tokens.json');
  });
});

describe('generateTokensTyp', () => {
  it('exports flat color constants', () => {
    const typ = generateTokensTyp(fixture);
    expect(typ).toContain('#let primary-600 = rgb("#2563eb")');
    expect(typ).toContain('#let dark-bg = rgb("#0f172a")');
    expect(typ).toContain('#let accent-500 = rgb("#10b981")');
  });

  it('exports historical convenience aliases', () => {
    const typ = generateTokensTyp(fixture);
    expect(typ).toContain('#let primary = primary-600');
    expect(typ).toContain('#let accent = accent-500');
    expect(typ).toContain('#let muted = light-muted');
    expect(typ).toContain('#let warning = semantic-warning');
  });

  it('does not emit self-referential aliases that collide with flat names', () => {
    const typ = generateTokensTyp(fixture);
    // dark-bg exists as a flat name, so there must not be a line like
    // "#let dark-bg = dark-bg" (would shadow itself / be nonsense)
    expect(typ).not.toMatch(/#let dark-bg = dark-bg$/m);
    expect(typ).not.toMatch(/#let light-bg = light-bg$/m);
  });
});

describe('generateTokensRevealCss', () => {
  it('maps tokens onto Reveal.js --r-* variables', () => {
    const css = generateTokensRevealCss(fixture);
    expect(css).toContain('--r-background-color: #0f172a;');
    expect(css).toContain('--r-main-color: #e2e8f0;');
    expect(css).toContain('--r-heading-color:');
    expect(css).toContain(':root {');
  });

  it('provides convenience colour variables for the deck', () => {
    const css = generateTokensRevealCss(fixture);
    expect(css).toContain('--abschluss-accent: #10b981;');
    expect(css).toContain('--abschluss-orange: #f59e0b;');
  });
});

describe('generateTokensMauticJson', () => {
  it('produces flat key-value pairs with color- prefix', () => {
    const json = JSON.parse(generateTokensMauticJson(fixture));
    expect(json['color-primary-600']).toBe('#2563eb');
    expect(json['color-accent-500']).toBe('#10b981');
  });

  it('includes email-specific tokens with email- prefix', () => {
    const json = JSON.parse(generateTokensMauticJson(fixture));
    expect(json['email-contentWidth']).toBe('600px');
    expect(json['email-buttonBackground']).toBe('#2563eb');
  });

  it('includes font-sans for use in email bodies', () => {
    const json = JSON.parse(generateTokensMauticJson(fixture));
    expect(json['font-sans']).toBe('"Inter", sans-serif');
  });
});
