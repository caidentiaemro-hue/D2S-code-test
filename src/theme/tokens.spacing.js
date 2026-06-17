// Layer 4 — Spacing tokens.
//
// Grid: 8px base unit (4pt half-steps below 8).
// Two ways to consume:
//   - MUI factor-style:    theme.spacing(2)  →  '16px'
//   - Named tokens:        scale.lg          →  16
//   - Direct in sx:        sx={{ p: 2 }}     →  '16px' (MUI shorthand)
//
// The factor system stays MUI-native so theme.spacing() works everywhere
// MUI expects it. Named tokens give us readable references for component
// recipes (e.g. Button.medium.paddingX = scale.md) and ad-hoc custom code.

// --- Factor → pixel map. Defines every legal spacing step in the system.
const factorMap = {
  0:    0,
  0.25: 2,
  0.5:  4,
  0.75: 6,
  1:    8,
  1.5:  12,
  2:    16,
  2.5:  20,
  3:    24,
  4:    32,
  5:    40,
  6:    48,
  7:    56,
  8:    64,
  10:   80,
  12:   96,
  16:   128,
  20:   160,
  24:   192,
};

// --- Named scale. Each token resolves to an integer (px).
export const scale = {
  none: factorMap[0],     // 0
  xxs:  factorMap[0.25],  // 2
  xs:   factorMap[0.5],   // 4
  sm:   factorMap[1],     // 8
  md:   factorMap[1.5],   // 12
  lg:   factorMap[2],     // 16
  xl:   factorMap[3],     // 24
  '2xl': factorMap[4],    // 32
  '3xl': factorMap[5],    // 40
  '4xl': factorMap[6],    // 48
  '5xl': factorMap[8],    // 64
  '6xl': factorMap[10],   // 80
  '7xl': factorMap[12],   // 96
};

// --- MUI-compatible spacing function.
// Accepts a number (factor) or string (token name). Returns px integer for
// MUI to format. Out-of-system factors throw in dev so designers catch
// off-grid values instead of silently rounding.
export const spacing = (factor) => {
  if (typeof factor === 'string') {
    if (factor in scale) return scale[factor];
    throw new Error(`spacing(): unknown token "${factor}". Use one of: ${Object.keys(scale).join(', ')}.`);
  }
  if (factor in factorMap) return factorMap[factor];
  // Allow MUI's internal calls (it sometimes passes computed factors).
  // Off-grid values pass through but log a warning so we catch them.
  if (typeof factor === 'number') {
    if (import.meta?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`spacing(${factor}): off-grid value. Add to factorMap or use a named token.`);
    }
    return factor * 8;
  }
  throw new Error(`spacing(): invalid input "${factor}".`);
};

export const spacingTokens = { scale, spacing, factorMap };
