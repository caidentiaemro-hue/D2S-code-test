# my-prototype — design system + component library

A single-product UI library built on MUI v9. The point of this repo is **a clean, layered design system** that's easy to hand off to MUI developers.

## Stack

- React 19 + Vite
- MUI v9 (`@mui/material`, `@mui/x-*` for charts/datagrid/datepickers/treeview)
- Emotion (MUI's default)
- JavaScript (no TypeScript yet — module augmentation for custom palette keys is currently a non-issue)

## Architecture — 12-layer token system

The design system is built bottom-up. Each layer depends only on the ones below it. **Never reach past one layer down.**

```
src/theme/
├── tokens.colors.js        Layer 1  Caidentia primitives (25 families × 11 shades + alpha)
├── tokens.semantic.js      Layer 2  text / background / border / fill / status / action — light + dark
├── tokens.typography.js    Layer 3  Roboto + named ramp (display/h/body/label)
├── tokens.spacing.js       Layer 4  8px grid + named scale (xxs..7xl)
├── tokens.radii.js         Layer 5  named radii (none/xs/sm/md/lg/xl/2xl/3xl/full)
├── tokens.borders.js       Layer 6  widths + styles
├── tokens.elevation.js     Layer 7  6-step shadow scale, per-mode
├── tokens.motion.js        Layer 8  durations + easings
├── tokens.zIndex.js        Layer 9  named layers (base..tooltip)
├── tokens.breakpoints.js   Layer 10 MUI defaults (xs/sm/md/lg/xl)
├── tokens.components.js    Layer 11 per-component recipes (Button.medium.padding, etc.)
└── theme.js                Layer 12 composes 1–11 into MUI extendTheme({ colorSchemes })
```

`tokens.colors.js` is auto-generated from `~/Desktop/caidentia_colors.json` — **never hand-edit**. Regenerate when the Figma export changes.

## Hard rules

These are non-negotiable. Past corrections from the project owner.

1. **Use the project's custom components, not raw MUI.**
   - For inputs: `<TextInput>` / `<SelectInput>` / `<NumberField>` (in `src/components/`), **not** `<TextField label="...">`.
   - For icon buttons: `<IconBtn>`, not raw `<IconButton>`.
   - For inline pills/badges: `<InlineBadge>`.
   - The custom wrappers enforce conventions (label-above pattern, size scales, dark-mode safety) that raw MUI doesn't.

2. **No magic values.** Every size, padding, radius, font, weight, color comes from a token.
   - Sizes/spacing: `scale.lg` or `theme.spacing(2)` — never `16px`.
   - Radii: `radii.md` — never `6` or `'6px'`.
   - Colors: semantic role (`theme.palette.background.sunken`) or Caidentia primitive (`theme.palette.caidentia.gray[200]`) — never hex.

3. **Labels go ABOVE inputs**, as separate elements. The `InputLabel` component handles this. Do not use MUI's `<TextField label="...">` floating-label pattern.

4. **Typography weights:** display = Regular (400), headings = Medium (500), body = Regular (400). Labels = Medium (500).

5. **Neutral anchor is `caidentia.gray`** — not `grayModern`, `grayNeutral`, etc. Stick to one family.

## MUI v9 + dark mode gotchas

The theme uses `extendTheme({ colorSchemes: { light, dark } })` with `colorSchemeSelector: 'data'` and is consumed via `<CssVarsProvider>` in [src/main.jsx](src/main.jsx). Mode is toggled at runtime by `useColorScheme().setMode('dark')` — instantly via CSS-var swap, no React re-render.

**Inside `styleOverrides`, always use `theme.vars.palette.X.Y` — NOT `theme.palette.X.Y`.**
- `theme.palette.X.Y` returns the literal hex captured at theme-build time → stuck in light mode forever.
- `theme.vars.palette.X.Y` returns `'var(--mui-palette-X-Y)'` → flips with the html attribute.

**For alpha-blended colors that need to flip with mode, use `color-mix()`, not hex concatenation.**
```js
// Wrong — can't append hex alpha to a var() string:
const hover = `${theme.vars.palette.primary.main}1f`;

// Right — alpha-blends the var at runtime:
const hover = `color-mix(in srgb, ${theme.vars.palette.primary.main} 12%, transparent)`;
```

## Custom palette slots (beyond MUI's built-ins)

These are project additions to `palette.*` and work in both light and dark:

- `text.tertiary`, `text.inverse`, `text.link`
- `background.raised`, `background.sunken`, `background.overlay`, `background.inverse`
- `border.subtle`, `border.strong`, `border.focus`  (note: MUI's `divider` is also still available)
- `fill.subtle`, `fill.muted`, `fill.strong`, `fill.inverse` (for chips/badges/tinted shapes)
- `invert.main`, `invert.contrastText` (black on light / white on dark)
- `error.bg`, `error.border`, `error.fg` — and the same on `warning` / `info` / `success`
- `primary.bg`, `primary.fg`
- `caidentia.<family>.<shade>` — full primitive scale for direct access

`<Button color="invert">` works because `MuiFab` and `MuiBadge` have explicit `invert` variants in the theme. For other components, add an `invert` variant in [theme.js](src/theme/theme.js) when needed — don't sprinkle inline overrides.

## Adding things

- **New token in an existing layer**: edit the relevant `tokens.*.js` file. Don't add to `theme.js`.
- **New component override**: add a recipe to `tokens.components.js`, wire it into the `componentOverrides` block in [theme.js](src/theme/theme.js).
- **New custom wrapper component**: add to `src/components/`. Reuse `InputLabel` for the label slot. Import tokens from `../theme/tokens.*.js` rather than hardcoding.
- **New showcase / reference page**: add a file to `src/components/showcases/`, then register it in `SECTIONS` and `NAV_GROUPS` in [src/pages/Home.jsx](src/pages/Home.jsx).

## Project commands

```bash
npm run dev      # vite dev server (port 5173/5174)
npm run build    # vite production build
npm run lint     # eslint
```

## Reference

- [src/components/](src/components/) — custom wrappers (`IconBtn`, `InlineBadge`, `InputLabel`, `TextInput`, `SelectInput`, `NumberField`, `NumberSpinner`, `ThemeToggle`)
- [src/components/showcases/](src/components/showcases/) — one showcase per component category, serves as the live catalog
- [src/pages/Home.jsx](src/pages/Home.jsx) — the catalog shell (sidebar nav + theme toggle in AppBar)
