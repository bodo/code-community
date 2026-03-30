# Design System & Theme

## @abschluss/theme

A shared DaisyUI theme package providing consistent branding across all frontend projects.

### Package

| Field | Value |
| --- | --- |
| **Name** | `@abschluss/theme` |
| **Location** | `../packages/theme-abschluss/` |
| **Type** | ES module |
| **Exports** | `./theme.css`, `./fonts.css` |

### Usage

Projects reference the theme as a local dependency:

```json
{
  "@abschluss/theme": "file:../packages/theme-abschluss"
}
```

### Variants

| Theme | Selector | Purpose |
| --- | --- | --- |
| `abschluss-light` | `data-theme="abschluss-light"` | Default, light mode |
| `abschluss-dark` | `data-theme="abschluss-dark"` | Dark mode |

Both define a full color system: primary, secondary, accent, neutral, info, success, warning, error.

### Typography

Self-hosted fonts (WOFF2, no external CDN):

| Font | Weight | Usage |
| --- | --- | --- |
| **Inter** | 400--800 | UI text, headings |
| **JetBrains Mono** | 400--700 | Code, terminal |

### Consumers

| Project | Stack | Integration |
| --- | --- | --- |
| **multiple-choice-app** | Vue 3 + Vite + Tailwind | `file:` dependency in package.json |
| **abschluss.jetzt** | Astro + Tailwind | TBD |
| **abschluss.coach** | Astro + Tailwind | TBD |

## Sources

- `../packages/theme-abschluss/package.json`
- `../packages/theme-abschluss/theme.css`
- `../packages/theme-abschluss/fonts.css`
