// Layer 3 — Typography tokens.
//
// Three things live here:
//   1. families — font stacks (UI sans, monospace).
//   2. weights  — numeric constants for each named weight.
//   3. ramp     — the full named type ramp: display, heading, body, label.
//
// Weight rules (project convention):
//   - Display headings:  Regular (400)
//   - Section headings:  Medium  (500)
//   - Body & supporting: Regular (400)
//   - UI labels/buttons: Medium  (500)
//
// Line-height + letter-spacing conventions:
//   - Bigger text → tighter line-height + tighter tracking.
//   - Body sits at 1.5 line-height (industry standard for readability).
//   - Small/caption text gets slightly looser tracking for legibility.

export const families = {
  sans: '"Roboto", "Helvetica", "Arial", sans-serif',
  mono: '"Roboto Mono", "Menlo", "Consolas", monospace',
};

export const weights = {
  light:    300,
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
};

// Each entry returns the four properties MUI typography variants expect.
// Sizes use rem so they scale with the user's root font size.
export const ramp = {
  // --- Display: oversized hero text. Regular weight, very tight.
  display1: { fontFamily: families.sans, fontSize: '5rem',     fontWeight: weights.regular, lineHeight: 1.1,  letterSpacing: '-0.02em' }, // 80px
  display2: { fontFamily: families.sans, fontSize: '4rem',     fontWeight: weights.regular, lineHeight: 1.1,  letterSpacing: '-0.02em' }, // 64px
  display3: { fontFamily: families.sans, fontSize: '3rem',     fontWeight: weights.regular, lineHeight: 1.15, letterSpacing: '-0.02em' }, // 48px

  // --- Headings: section titles. Medium weight, slightly tight.
  h1: { fontFamily: families.sans, fontSize: '2.375rem', fontWeight: weights.medium, lineHeight: 1.2,  letterSpacing: '-0.01em' }, // 38px
  h2: { fontFamily: families.sans, fontSize: '2rem',     fontWeight: weights.medium, lineHeight: 1.2,  letterSpacing: '-0.01em' }, // 32px
  h3: { fontFamily: families.sans, fontSize: '1.5rem',   fontWeight: weights.medium, lineHeight: 1.25, letterSpacing: '-0.005em' }, // 24px
  h4: { fontFamily: families.sans, fontSize: '1.25rem',  fontWeight: weights.medium, lineHeight: 1.3,  letterSpacing: '0' },        // 20px
  h5: { fontFamily: families.sans, fontSize: '1rem',     fontWeight: weights.medium, lineHeight: 1.4,  letterSpacing: '0' },        // 16px

  // --- Body: reading copy. Regular weight, standard line-height.
  body: {
    large:  { fontFamily: families.sans, fontSize: '1rem',     fontWeight: weights.regular, lineHeight: 1.5, letterSpacing: '0' },     // 16px
    medium: { fontFamily: families.sans, fontSize: '0.875rem', fontWeight: weights.regular, lineHeight: 1.5, letterSpacing: '0' },     // 14px
    small:  { fontFamily: families.sans, fontSize: '0.75rem',  fontWeight: weights.regular, lineHeight: 1.4, letterSpacing: '0.005em' }, // 12px
  },

  // --- Label: UI text on controls (buttons, chips, tabs). Medium weight, no transform.
  label: {
    large:  { fontFamily: families.sans, fontSize: '1rem',     fontWeight: weights.medium, lineHeight: 1.25, letterSpacing: '0',       textTransform: 'none' }, // 16px
    medium: { fontFamily: families.sans, fontSize: '0.875rem', fontWeight: weights.medium, lineHeight: 1.25, letterSpacing: '0',       textTransform: 'none' }, // 14px
    small:  { fontFamily: families.sans, fontSize: '0.75rem',  fontWeight: weights.medium, lineHeight: 1.25, letterSpacing: '0.005em', textTransform: 'none' }, // 12px
  },

  // --- Caption: metadata, helper text. Same as body.small but semantically distinct.
  caption: { fontFamily: families.sans, fontSize: '0.75rem',  fontWeight: weights.regular, lineHeight: 1.4, letterSpacing: '0.005em' }, // 12px

  // --- Overline: tiny uppercase label (table headers, eyebrow text).
  overline: { fontFamily: families.sans, fontSize: '0.6875rem', fontWeight: weights.medium, lineHeight: 1.4, letterSpacing: '0.08em', textTransform: 'uppercase' }, // 11px

  // --- Code: monospace inline + block.
  code: { fontFamily: families.mono, fontSize: '0.875rem', fontWeight: weights.regular, lineHeight: 1.5, letterSpacing: '0' }, // 14px mono
};

export const typography = { families, weights, ramp };
