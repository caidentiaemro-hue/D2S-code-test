// Layer 9 — Z-index tokens.
//
// Named layers with deliberate gaps so we can slip a new layer in without
// renumbering. Values align with MUI's defaults so built-in components
// (AppBar, Drawer, Modal) stack correctly alongside our own surfaces.
//
// Rule of thumb: a component's z-index should reference a token, never a
// magic number. If you find yourself wanting `999`, the token is missing
// from this file — add it here first.

export const zIndex = {
  base:        0,     // default flow
  raised:      1,     // hover lift, focused input
  sticky:      100,   // sticky table headers, sticky toolbars
  fab:         900,   // floating action buttons
  appBar:      1100,  // top nav (MUI default)
  drawer:      1200,  // side drawer (MUI default)
  modalBackdrop: 1290, // scrim
  modal:       1300,  // modal panel (MUI default)
  snackbar:    1400,  // toasts (MUI default)
  popover:     1450,  // dropdowns, menus
  tooltip:     1500,  // tooltips (MUI default — always on top)
};
