// Layer 11 — Component tokens.
//
// Per-component structural recipes (sizes, padding, radii, typography).
// Every value is composed from layers 3-10 — no raw px, no raw hex.
// Layer 12 reads these to build MUI's `components.styleOverrides`.
//
// Why pure structure (no colors): light/dark modes already differ at the
// semantic layer; component recipes work in either mode by referencing
// role names there (`palette.primary.main`, `palette.fill.muted`) inside
// layer 12's override functions. This file stays mode-agnostic.

import { ramp }     from './tokens.typography.js';
import { scale }    from './tokens.spacing.js';
import { radii }    from './tokens.radii.js';
import { borderWidths } from './tokens.borders.js';

// Convenience: every size-aware component shares this size key.
const SIZES = ['small', 'medium', 'large'];

export const components = {
  // ---------------------------------------------------------------------
  // Button — three sizes; radius scales with size to match visual weight.
  // ---------------------------------------------------------------------
  button: {
    radius:     { small: radii.sm, medium: radii.md, large: radii.lg },
    minHeight:  { small: scale.xl, medium: scale['2xl'], large: scale['3xl'] }, // 24 / 32 / 40
    paddingX:   { small: scale.sm, medium: scale.md, large: scale.lg },         // 8 / 12 / 16
    paddingY:   { small: scale.xs, medium: scale.sm, large: scale.sm },         // 4 / 8 / 8
    typography: { small: ramp.body.small, medium: ramp.body.medium, large: ramp.body.large },
    focusRingWidth:  borderWidths.thick,
    focusRingOffset: 2,
    outlinedBorderWidth: borderWidths.thin,
  },

  // ---------------------------------------------------------------------
  // ButtonGroup — radius mirrors Button sizes; group manages outer corners.
  // ---------------------------------------------------------------------
  buttonGroup: {
    radius: { small: radii.sm, medium: radii.md, large: radii.lg },
  },

  // ---------------------------------------------------------------------
  // Card — single radius across the system.
  // ---------------------------------------------------------------------
  card: {
    radius:      radii.xl,
    borderWidth: borderWidths.thin,
  },

  // ---------------------------------------------------------------------
  // Paper — base elevation surface.
  // ---------------------------------------------------------------------
  paper: {
    radius: radii.lg,
  },

  // ---------------------------------------------------------------------
  // Input (OutlinedInput) — sunken background, border only on focus/error.
  // ---------------------------------------------------------------------
  input: {
    radius:      radii.md,
    borderWidth: borderWidths.thin,
  },

  // ---------------------------------------------------------------------
  // Chip — pill, three sizes. Labels use medium weight (label ramp).
  // ---------------------------------------------------------------------
  chip: {
    radius: radii.full,
    height:    { small: scale.xl,   medium: scale['2xl'],  large: scale['2xl'] }, // 20 / 24 / 32 → see exact override values below
    // Note: small chip is 20px (between xl=24 and lg=16) — using exact for fidelity
    heightPx:  { small: 20, medium: 24, large: 32 },
    paddingX:  { small: scale.sm, medium: scale.md, large: scale.lg }, // 8 / 12 / 16
    typography:{ small: ramp.label.small, medium: ramp.label.medium, large: ramp.label.large },
    iconSize:  { small: 12, medium: 16, large: 18 },
    avatarSize:{ small: 16, medium: 20, large: 24 },
  },

  // ---------------------------------------------------------------------
  // TableCell — single height + padding pair across the system.
  // ---------------------------------------------------------------------
  tableCell: {
    height:   scale['3xl'],            // 40
    paddingX: scale.lg,                // 16
    paddingY: scale.xs + scale.xxs,    // 6  (4 + 2) — close to scale.xs but explicit
  },

  // ---------------------------------------------------------------------
  // Switch — track + knob dimensions per size. Halo blooms on hover/focus.
  // ---------------------------------------------------------------------
  switch: {
    small:  { trackW: 24, trackH: 12, knob: 8,  travel: 12 },
    medium: { trackW: 32, trackH: 16, knob: 12, travel: 16 },
    large:  { trackW: 40, trackH: 20, knob: 16, travel: 20 },
  },

  // ---------------------------------------------------------------------
  // FAB — only medium + large (no small in the design system).
  //   Extended variant: pill with text, height same as size, auto width.
  // ---------------------------------------------------------------------
  fab: {
    medium: { size: scale['2xl'], iconSize: 20, extendedPaddingX: scale.lg, typography: ramp.body.medium }, // 32 / 16
    large:  { size: scale['3xl'], iconSize: 24, extendedPaddingX: scale['2xl'] / 2 + scale.xs * 2, typography: ramp.body.large }, // 40 / 20
  },

  // ---------------------------------------------------------------------
  // Checkbox — three sizes, each with padding tuned so click target is
  // comfortable while the visible glyph stays compact.
  // ---------------------------------------------------------------------
  checkbox: {
    small:  { box: scale.xl,      icon: 16, padding: scale.xs },      // 24 / 4
    medium: { box: scale['2xl'],  icon: 20, padding: 6 },              // 32 / 6 — 6 is off-scale; kept for fidelity
    large:  { box: scale['3xl'],  icon: 24, padding: scale.sm },       // 40 / 8
  },

  // ---------------------------------------------------------------------
  // Tooltip — small radius, no size variants.
  // ---------------------------------------------------------------------
  tooltip: {
    radius: radii.sm,
  },

  // ---------------------------------------------------------------------
  // Avatar — bordered. Rounded variant uses card-family radius.
  // ---------------------------------------------------------------------
  avatar: {
    borderWidth:   borderWidths.thin,
    roundedRadius: radii.xl,
  },

  // ---------------------------------------------------------------------
  // Badge — pill for numbers, circle for dot.
  // ---------------------------------------------------------------------
  badge: {
    minWidth:     scale['2xl'] / 2 + scale.xs,  // 20 — number badge target
    height:       20,
    radius:       10,                            // half of height — exact pill
    paddingX:     6,
    dotSize:      scale.sm,                      // 8
    typography:   ramp.body.small,               // 12px
  },

  // ---------------------------------------------------------------------
  // ToggleButton — pill, with segmented-control variant inside a group.
  // ---------------------------------------------------------------------
  toggleButton: {
    radius: radii.full,
    small:  { height: scale['2xl'],  paddingX: scale.md, typography: ramp.body.small,  iconSize: 16 }, // 32 / 12
    medium: { height: scale['3xl'],  paddingX: scale.lg, typography: ramp.body.medium, iconSize: 18 }, // 40 / 16
    large:  { height: scale['4xl'],  paddingX: scale.xl, typography: ramp.body.large,  iconSize: 20 }, // 48 / 24 — note: was 20 in current theme
    borderWidth: borderWidths.thin,
  },

  // ---------------------------------------------------------------------
  // ToggleButtonGroup — segmented control container.
  // ---------------------------------------------------------------------
  toggleButtonGroup: {
    radius:    radii.full,
    padding:   3,                                // 3px inset — off-grid but exact pill spec
    gap:       2,
  },
};

// Re-export the size enumeration so layer 12 and components can iterate.
export const componentSizes = SIZES;
