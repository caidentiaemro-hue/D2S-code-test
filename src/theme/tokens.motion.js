// Layer 8 — Motion tokens.
//
// Durations are in ms (MUI expects integers).
// Easings are CSS cubic-beziers.
//
// Pick a duration by *what kind of UI change* it is:
//   - instant: 0 — no animation (reduced-motion fallback)
//   - fast:    feedback on direct input (button press, hover halo)
//   - normal:  default UI transition (most things)
//   - slow:    large reveals (modal, drawer)
//   - slowest: cross-screen transitions
//
// Pick an easing by *what the element is doing*:
//   - standard:    moving + transforming (most cases)
//   - enter:       fading/sliding in (decelerate at the end)
//   - exit:        fading/sliding out (accelerate at the start)
//   - emphasized:  hero moments with bounce/anticipation

export const durations = {
  instant: 0,
  fast:    150,
  normal:  250,
  slow:    350,
  slowest: 500,
};

export const easings = {
  standard:   'cubic-bezier(0.4, 0, 0.2, 1)',
  enter:      'cubic-bezier(0, 0, 0.2, 1)',
  exit:       'cubic-bezier(0.4, 0, 1, 1)',
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  linear:     'linear',
};

export const motion = { durations, easings };
