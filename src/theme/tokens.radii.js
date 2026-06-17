// Layer 5 — Radius tokens.
//
// Named scale, derived from real usage in the existing components:
//   - Tooltip / small button:  sm  (4)
//   - Input / medium button:   md  (6)
//   - Large button / Paper:    lg  (8)
//   - Card / Avatar rounded:   xl  (12)
//   - Hero / large surface:    2xl (16)
//   - Pill / chip / toggle:    full (9999 — effectively infinite)
//
// Component recipes reference these names, not raw px.

export const radii = {
  none: 0,
  xs:   2,
  sm:   4,
  md:   6,
  lg:   8,
  xl:   12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};
