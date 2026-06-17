// Layer 6 — Border tokens.
//
// Only widths live here. Colors come from layer 2 (border.* / divider in
// the semantic file). A border is always "width × color" — these two
// dimensions are kept separate so a focus ring can keep its color while
// changing weight per component size.

export const borderWidths = {
  none: 0,
  hairline: 1,   // dividers, default
  thin:     1,   // alias — same as hairline, used semantically for inputs/cards
  thick:    2,   // focus rings, emphasis
  heavy:    4,   // hero accents, decorative
};

// Convenience: pre-composed border strings for the common cases.
// Use these in component recipes when you want one string for the full
// shorthand. Colors are still passed in at composition time so light/dark
// adapts via the semantic layer.
export const borderStyle = {
  solid:  'solid',
  dashed: 'dashed',
  dotted: 'dotted',
};

export const borders = { widths: borderWidths, style: borderStyle };
