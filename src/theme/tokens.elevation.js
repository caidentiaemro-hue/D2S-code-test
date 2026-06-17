// Layer 7 — Elevation tokens (light + dark).
//
// Named scale, six steps. Each level is two shadows stacked:
//   - A short tight shadow for the immediate edge.
//   - A longer diffuse shadow for ambient depth.
// This two-layer technique reads as physical depth rather than a flat blur.
//
// Dark mode shadows use higher opacity but smaller spread — on a dark
// canvas, drop shadows don't read; depth comes from the surface getting
// lighter (background.raised > background.paper > background.default).
// The shadow here is used for sharpness/separation, not glow.

const light = {
  none: 'none',
  xs:   '0 1px 2px rgba(16, 24, 40, 0.05)',
  sm:   '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.10)',
  md:   '0 2px 4px rgba(16, 24, 40, 0.06), 0 4px 8px rgba(16, 24, 40, 0.10)',
  lg:   '0 4px 6px rgba(16, 24, 40, 0.05), 0 10px 15px rgba(16, 24, 40, 0.10)',
  xl:   '0 10px 15px rgba(16, 24, 40, 0.10), 0 20px 25px rgba(16, 24, 40, 0.10)',
  '2xl': '0 20px 25px rgba(16, 24, 40, 0.10), 0 25px 50px rgba(16, 24, 40, 0.25)',
};

const dark = {
  none: 'none',
  xs:   '0 1px 2px rgba(0, 0, 0, 0.30)',
  sm:   '0 1px 2px rgba(0, 0, 0, 0.30), 0 1px 3px rgba(0, 0, 0, 0.40)',
  md:   '0 2px 4px rgba(0, 0, 0, 0.30), 0 4px 8px rgba(0, 0, 0, 0.40)',
  lg:   '0 4px 6px rgba(0, 0, 0, 0.30), 0 10px 15px rgba(0, 0, 0, 0.40)',
  xl:   '0 10px 15px rgba(0, 0, 0, 0.40), 0 20px 25px rgba(0, 0, 0, 0.40)',
  '2xl': '0 20px 25px rgba(0, 0, 0, 0.40), 0 25px 50px rgba(0, 0, 0, 0.60)',
};

export const elevation = { light, dark };
