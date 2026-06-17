// Layer 10 — Breakpoint tokens.
//
// Values match MUI's defaults so `useMediaQuery(theme.breakpoints.up('md'))`
// behaves exactly as the MUI docs describe. Devs migrating in expect these
// numbers; changing them would force everyone to relearn which screens are
// which.
//
// Mental model:
//   - xs: phone portrait
//   - sm: phone landscape / small tablet
//   - md: tablet / small laptop
//   - lg: laptop / standard desktop
//   - xl: large desktop / wide screen

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  unit: 'px',
  step: 5, // MUI internal: 5px deduction for `down()` queries
};
