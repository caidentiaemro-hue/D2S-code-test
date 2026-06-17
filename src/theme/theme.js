// Layer 12 — Theme assembly.
//
// Composes layers 1-11 into a MUI extended theme with `light` and `dark`
// color schemes. Consumed via `<CssVarsProvider theme={theme}>` in main.jsx.
// Mode is switched at runtime by `useColorScheme().setMode('dark' | 'light')`
// — no provider remount, just a CSS-var swap.
//
// Layering rule: this file is the ONLY place where layers 1-11 are imported
// and combined. Every component override below reads from those tokens —
// no raw px, no raw hex.

import { extendTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { caidentia }         from './tokens.colors.js';
import { semantic }          from './tokens.semantic.js';
import { ramp, families, weights } from './tokens.typography.js';
import { spacing, scale }    from './tokens.spacing.js';
import { radii }             from './tokens.radii.js';
import { borderWidths }      from './tokens.borders.js';
import { elevation }         from './tokens.elevation.js';
import { motion }            from './tokens.motion.js';
import { zIndex }            from './tokens.zIndex.js';
import { breakpoints }       from './tokens.breakpoints.js';
import { components as c }   from './tokens.components.js';

// ---------------------------------------------------------------------------
// Per-scheme palette: bridges our semantic tokens to MUI's expected slots so
// every built-in MUI component picks up our colors without an override.
// ---------------------------------------------------------------------------
function buildPalette(mode) {
  const s = semantic[mode];
  return {
    mode,
    // MUI core slots
    primary:    s.primary,
    secondary:  s.secondary,
    error:      s.error,
    warning:    s.warning,
    info:       s.info,
    success:    s.success,
    text:       s.text,
    background: s.background,
    divider:    s.divider,
    action:     s.action,
    // Project custom slots
    invert:     s.invert,
    border:     s.border,
    fill:       s.fill,
    // Primitive layer — always available for direct access
    caidentia,
    // Legacy custom keys kept for any existing showcase code that still uses them
    custom: {
      accents: {
        blue:       caidentia.blue[500],
        violet:     caidentia.violet[500],
        cyan:       caidentia.cyan[500],
        fuchsia:    caidentia.fuchsia[500],
        indigo:     caidentia.indigo[500],
        pink:       caidentia.pink[500],
        rose:       caidentia.rose[500],
        teal:       caidentia.teal[500],
        yellow:     caidentia.yellow[500],
        lightBlue:  caidentia.blueLight[500],
        lightGreen: caidentia.greenLight[500],
      },
      containers: {
        secondary:  mode === 'light' ? caidentia.gray[25]  : caidentia.gray[800],
        tertiary:   mode === 'light' ? caidentia.gray[50]  : caidentia.gray[700],
        quaternary: mode === 'light' ? caidentia.gray[100] : caidentia.gray[600],
        quinary:    mode === 'light' ? caidentia.blueViolet[25] : caidentia.blueViolet[900],
        underlay:   mode === 'light' ? caidentia.grayBlue[100]  : caidentia.grayBlue[800],
      },
    },
  };
}

// ---------------------------------------------------------------------------
// MUI typography: map our ramp into MUI's variant slots (h1-h6, body1/2, etc.)
// and expose custom slots (display1-3, customContent.*) for project use.
// ---------------------------------------------------------------------------
const typography = {
  fontFamily: families.sans,
  fontFamilyMono: families.mono,
  fontWeightLight:    weights.light,
  fontWeightRegular:  weights.regular,
  fontWeightMedium:   weights.medium,
  fontWeightSemiBold: weights.semibold,
  fontWeightBold:     weights.bold,

  // MUI native variants
  h1:        ramp.h1,
  h2:        ramp.h2,
  h3:        ramp.h3,
  h4:        ramp.h4,
  h5:        ramp.h5,
  h6:        ramp.h5,                // MUI requires h6; alias to h5 (we use 5 levels)
  subtitle1: ramp.label.large,
  subtitle2: ramp.label.medium,
  body1:     ramp.body.large,
  body2:     ramp.body.medium,
  caption:   ramp.caption,
  overline:  ramp.overline,
  button:    { ...ramp.label.medium },

  // Custom slots
  display1: ramp.display1,
  display2: ramp.display2,
  display3: ramp.display3,
  customContent: {
    xSmall:  { fontFamily: families.sans, fontSize: '0.625rem', fontWeight: weights.regular, lineHeight: 1.4 },
    small:   ramp.body.small,
    medium:  ramp.body.medium,
    large:   ramp.body.large,
    xLarge:  { fontFamily: families.sans, fontSize: '1.125rem', fontWeight: weights.regular, lineHeight: 1.5 },
    xxLarge: { fontFamily: families.sans, fontSize: '1.25rem',  fontWeight: weights.regular, lineHeight: 1.5 },
  },
};

// ---------------------------------------------------------------------------
// Shadows: MUI requires an array of 25. Map our 6-step scale onto it.
// ---------------------------------------------------------------------------
function buildShadows(mode) {
  const e = elevation[mode];
  // Tiers: 0=none, 1-2=xs, 3-4=sm, 5-7=md, 8-15=lg, 16-23=xl, 24=2xl
  const arr = new Array(25);
  arr[0] = e.none;
  for (let i = 1;  i <= 2;  i++) arr[i] = e.xs;
  for (let i = 3;  i <= 4;  i++) arr[i] = e.sm;
  for (let i = 5;  i <= 7;  i++) arr[i] = e.md;
  for (let i = 8;  i <= 15; i++) arr[i] = e.lg;
  for (let i = 16; i <= 23; i++) arr[i] = e.xl;
  arr[24] = e['2xl'];
  return arr;
}

// ---------------------------------------------------------------------------
// Component overrides — read from c (component tokens) + theme.vars.palette.
// Every value is sourced from a token layer. No magic numbers below.
// ---------------------------------------------------------------------------
const componentOverrides = {
  MuiButton: {
    defaultProps: { disableElevation: true, variant: 'contained' },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: c.button.radius.medium,
        textTransform: 'none',
        fontWeight: weights.medium,
        lineHeight: 1.25,
        letterSpacing: 0,
        transition: theme.transitions.create(
          ['background-color', 'border-color', 'color', 'box-shadow', 'opacity'],
          { duration: theme.transitions.duration.shorter },
        ),
        '&:focus-visible': {
          outline: `${c.button.focusRingWidth}px solid ${theme.vars.palette.primary.main}`,
          outlineOffset: c.button.focusRingOffset,
        },
      }),
      sizeSmall: {
        minHeight: c.button.minHeight.small,
        padding: `${c.button.paddingY.small}px ${c.button.paddingX.small}px`,
        fontSize: c.button.typography.small.fontSize,
        borderRadius: c.button.radius.small,
      },
      sizeMedium: {
        minHeight: c.button.minHeight.medium,
        padding: `${c.button.paddingY.medium}px ${c.button.paddingX.medium}px`,
        fontSize: c.button.typography.medium.fontSize,
        borderRadius: c.button.radius.medium,
      },
      sizeLarge: {
        minHeight: c.button.minHeight.large,
        padding: `${c.button.paddingY.large}px ${c.button.paddingX.large}px`,
        fontSize: c.button.typography.large.fontSize,
        borderRadius: c.button.radius.large,
      },
      contained: ({ theme }) => ({
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.action.disabledBackground,
          color: theme.vars.palette.action.disabled,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: c.button.outlinedBorderWidth,
        '&:hover': {
          borderWidth: c.button.outlinedBorderWidth,
          backgroundColor: theme.vars.palette.action.hover,
        },
        '&.Mui-disabled': {
          borderColor: theme.vars.palette.action.disabledBackground,
          color: theme.vars.palette.action.disabled,
        },
      }),
      text: ({ theme }) => ({
        '&:hover': { backgroundColor: theme.vars.palette.action.hover },
        '&.Mui-disabled': { color: theme.vars.palette.action.disabled },
      }),
    },
  },

  MuiButtonGroup: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ ownerState }) => {
        const size = ownerState.size ?? 'medium';
        return { borderRadius: c.buttonGroup.radius[size] };
      },
      grouped: { minWidth: 'auto' },
      groupedContainedPrimary: ({ theme }) => ({
        '&:not(:last-of-type)': { borderColor: theme.vars.palette.primary.dark },
      }),
      groupedContainedSecondary: ({ theme }) => ({
        '&:not(:last-of-type)': { borderColor: theme.vars.palette.secondary.dark },
      }),
      groupedTextHorizontal: ({ theme }) => ({
        '&:not(:last-of-type)': { borderRightColor: theme.vars.palette.divider },
      }),
      groupedTextVertical: ({ theme }) => ({
        '&:not(:last-of-type)': { borderBottomColor: theme.vars.palette.divider },
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: c.card.radius,
        borderWidth: c.card.borderWidth,
        borderColor: theme.vars.palette.divider,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: { borderRadius: c.paper.radius },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: c.input.radius,
        backgroundColor: theme.vars.palette.background.sunken,
        '&:hover': { backgroundColor: theme.vars.palette.fill.muted },
        '&.Mui-focused': { backgroundColor: theme.vars.palette.background.sunken },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
          borderWidth: c.input.borderWidth,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.primary.main,
          borderWidth: c.input.borderWidth,
        },
        '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.primary.main,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.error.main,
        },
        '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.error.main,
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const isDefault = !ownerState.color || ownerState.color === 'default';
        const size = ownerState.size ?? 'medium';
        return {
          borderRadius: c.chip.radius,
          ...(isDefault && {
            backgroundColor: theme.vars.palette.action.selected,
            '&:hover':            { backgroundColor: theme.vars.palette.action.focus },
            '&.Mui-focusVisible': { backgroundColor: theme.vars.palette.action.selected },
          }),
          ...(size === 'small' && {
            height: c.chip.heightPx.small,
            fontSize: c.chip.typography.small.fontSize,
            fontWeight: weights.medium,
          }),
          ...(size === 'medium' && {
            height: c.chip.heightPx.medium,
            fontSize: c.chip.typography.medium.fontSize,
            fontWeight: weights.medium,
          }),
        };
      },
      label: ({ ownerState }) => ({
        ...(ownerState.size === 'small'  && { paddingLeft: c.chip.paddingX.small,  paddingRight: c.chip.paddingX.small  }),
        ...(ownerState.size === 'medium' && { paddingLeft: c.chip.paddingX.medium, paddingRight: c.chip.paddingX.medium }),
      }),
      icon:       ({ ownerState }) => ({ fontSize: c.chip.iconSize[ownerState.size ?? 'medium'] }),
      deleteIcon: ({ ownerState }) => ({ fontSize: c.chip.iconSize[ownerState.size ?? 'medium'] }),
      avatar:     ({ ownerState }) => {
        const size = ownerState.size ?? 'medium';
        return {
          width:    c.chip.avatarSize[size],
          height:   c.chip.avatarSize[size],
          fontSize: size === 'small' ? '0.625rem' : '0.75rem',
        };
      },
    },
    variants: [
      {
        props: { size: 'large' },
        style: {
          height: c.chip.heightPx.large,
          fontSize: c.chip.typography.large.fontSize,
          fontWeight: weights.medium,
          '& .MuiChip-label':      { paddingLeft: c.chip.paddingX.large, paddingRight: c.chip.paddingX.large },
          '& .MuiChip-icon':       { fontSize: c.chip.iconSize.large },
          '& .MuiChip-deleteIcon': { fontSize: c.chip.iconSize.large },
          '& .MuiChip-avatar':     { width: c.chip.avatarSize.large, height: c.chip.avatarSize.large, fontSize: '0.75rem' },
        },
      },
    ],
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        height: c.tableCell.height,
        padding: `${c.tableCell.paddingY}px ${c.tableCell.paddingX}px`,
      },
    },
  },

  MuiSwitch: {
    defaultProps: { size: 'medium' },
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const s = c.switch[ownerState.size ?? 'medium'];
        const colorKey = ownerState.color === 'secondary' ? 'secondary' : 'primary';
        const main = theme.vars.palette[colorKey].main;
        // `main` is a var() reference, so we can't append hex alpha to it.
        // Use color-mix to blend the var with transparency at runtime.
        const haloHover = `color-mix(in srgb, ${main} 12%, transparent)`;
        const haloFocus = `color-mix(in srgb, ${main} 30%, transparent)`;
        const padY = (s.trackH - s.knob) / 2;

        return {
          width: s.trackW,
          height: s.trackH,
          padding: 0,
          overflow: 'visible',
          '& .MuiSwitch-switchBase': {
            padding: padY,
            '&.Mui-checked': {
              transform: `translateX(${s.travel}px)`,
              color: theme.vars.palette.background.paper,
            },
            '&:hover .MuiSwitch-thumb': {
              boxShadow: `0 0 0 ${s.knob}px ${haloHover}, ${theme.shadows[1]}`,
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              boxShadow: `0 0 0 ${s.knob}px ${haloFocus}, ${theme.shadows[1]}`,
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              backgroundColor: theme.vars.palette.action.disabledBackground,
              boxShadow: theme.shadows[1],
            },
          },
          '& .MuiSwitch-thumb': {
            width: s.knob,
            height: s.knob,
            backgroundColor: theme.vars.palette.background.paper,
            boxShadow: theme.shadows[1],
          },
          '& .MuiSwitch-track': {
            backgroundColor: main,
            borderRadius: s.trackH / 2,
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-track': { backgroundColor: main, opacity: 1 },
          '& .Mui-disabled + .MuiSwitch-track': { backgroundColor: theme.vars.palette[colorKey].light, opacity: 1 },
        };
      },
    },
  },

  MuiSelect: {
    defaultProps: { IconComponent: KeyboardArrowDownIcon },
  },

  MuiFab: {
    defaultProps: { size: 'medium', color: 'default' },
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        ...(ownerState.color === 'default' && {
          backgroundColor: theme.vars.palette.background.paper,
          color: theme.vars.palette.text.primary,
          '&:hover': { backgroundColor: theme.vars.palette.action.hover },
          '&.Mui-disabled': {
            backgroundColor: theme.vars.palette.action.disabledBackground,
            color: theme.vars.palette.action.disabled,
          },
        }),
        ...(ownerState.color === 'invert' && {
          backgroundColor: theme.vars.palette.invert.main,
          color: theme.vars.palette.invert.contrastText,
          '&:hover': { backgroundColor: theme.vars.palette.invert.main, opacity: 0.85 },
          '&.Mui-disabled': {
            backgroundColor: theme.vars.palette.action.disabledBackground,
            color: theme.vars.palette.action.disabled,
          },
        }),
      }),
      sizeMedium: {
        width: c.fab.medium.size,
        height: c.fab.medium.size,
        minHeight: c.fab.medium.size,
        '& .MuiSvgIcon-root': { fontSize: c.fab.medium.iconSize },
      },
      sizeLarge: {
        width: c.fab.large.size,
        height: c.fab.large.size,
        minHeight: c.fab.large.size,
        '& .MuiSvgIcon-root': { fontSize: c.fab.large.iconSize },
      },
    },
    variants: [
      {
        props: { variant: 'extended', size: 'medium' },
        style: {
          width: 'auto',
          minWidth: 'auto',
          padding: `0 ${c.fab.medium.extendedPaddingX}px`,
          borderRadius: c.fab.medium.size / 2,
          fontSize: c.fab.medium.typography.fontSize,
        },
      },
      {
        props: { variant: 'extended', size: 'large' },
        style: {
          width: 'auto',
          minWidth: 'auto',
          padding: `0 ${c.fab.large.extendedPaddingX}px`,
          borderRadius: c.fab.large.size / 2,
          fontSize: c.fab.large.typography.fontSize,
        },
      },
    ],
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const colorKey = ownerState.color && ownerState.color !== 'default' ? ownerState.color : 'primary';
        const mainColor = theme.vars.palette[colorKey]?.main ?? theme.vars.palette.action.active;
        return {
          width: c.checkbox.medium.box,
          height: c.checkbox.medium.box,
          padding: c.checkbox.medium.padding,
          boxSizing: 'border-box',
          color: theme.vars.palette.action.active,
          '& .MuiSvgIcon-root': { fontSize: c.checkbox.medium.icon },
          // mainColor is a var() reference — use color-mix for alpha-blended state bgs.
          '&:hover':           { backgroundColor: `color-mix(in srgb, ${mainColor} 8%, transparent)` },
          '&.Mui-focusVisible':{ backgroundColor: `color-mix(in srgb, ${mainColor} 16%, transparent)` },
          '&:active':          { backgroundColor: `color-mix(in srgb, ${mainColor} 24%, transparent)` },
          '&.Mui-disabled':    { color: theme.vars.palette.action.disabled },
        };
      },
      sizeSmall: {
        width: c.checkbox.small.box,
        height: c.checkbox.small.box,
        padding: c.checkbox.small.padding,
        '& .MuiSvgIcon-root': { fontSize: c.checkbox.small.icon },
      },
    },
    variants: [
      {
        props: { size: 'large' },
        style: {
          width: c.checkbox.large.box,
          height: c.checkbox.large.box,
          padding: c.checkbox.large.padding,
          '& .MuiSvgIcon-root': { fontSize: c.checkbox.large.icon },
        },
      },
    ],
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.vars.palette.background.inverse,
        color: theme.vars.palette.text.inverse,
        borderRadius: c.tooltip.radius,
      }),
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `${c.avatar.borderWidth}px solid ${theme.vars.palette.divider}`,
        fontWeight: weights.semibold,
      }),
      colorDefault: ({ theme }) => ({
        backgroundColor: theme.vars.palette.fill.muted,
        color: theme.vars.palette.text.secondary,
      }),
      rounded: { borderRadius: c.avatar.roundedRadius },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: ({ ownerState }) => ({
        ...(ownerState.variant !== 'dot' && {
          minWidth: c.badge.minWidth,
          height: c.badge.height,
          fontSize: c.badge.typography.fontSize,
          fontWeight: weights.bold,
          padding: `0 ${c.badge.paddingX}px`,
          borderRadius: c.badge.radius,
          lineHeight: 1,
        }),
      }),
      dot: {
        width: c.badge.dotSize,
        height: c.badge.dotSize,
        minWidth: c.badge.dotSize,
        padding: 0,
        borderRadius: '50%',
      },
      colorDefault: ({ theme }) => ({
        backgroundColor: theme.vars.palette.text.secondary,
        color: theme.vars.palette.text.inverse,
      }),
    },
    variants: [
      {
        props: { color: 'invert' },
        style: ({ theme }) => ({
          '& .MuiBadge-badge': {
            backgroundColor: theme.vars.palette.invert.main,
            color: theme.vars.palette.invert.contrastText,
          },
        }),
      },
    ],
  },

  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: 40,
      },
      flexContainer: {
        gap: 4,
      },
      indicator: ({ theme }) => ({
        height: 2,
        backgroundColor: theme.vars.palette.text.secondary,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 40,
        padding: '0 4px',
        fontSize: ramp.body.medium.fontSize,
        fontWeight: weights.regular,
        color: theme.vars.palette.text.secondary,
        textTransform: 'none',
        letterSpacing: 0,
        '&.Mui-selected': {
          fontWeight: weights.medium,
          color: theme.vars.palette.text.secondary,
        },
      }),
    },
  },

  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const size = ownerState.size ?? 'medium';
        const s = c.toggleButton[size];
        return {
          textTransform: 'none',
          borderRadius: c.toggleButton.radius,
          border: `${c.toggleButton.borderWidth}px solid ${theme.vars.palette.divider}`,
          color: theme.vars.palette.text.secondary,
          fontWeight: weights.regular,
          height: s.height,
          padding: `0 ${s.paddingX}px`,
          fontSize: s.typography.fontSize,
          lineHeight: 1,
          gap: scale.xs + scale.xxs / 2,
          '& .MuiSvgIcon-root': { fontSize: s.iconSize },
          '&:hover': { backgroundColor: theme.vars.palette.fill.muted },
          '&.Mui-selected': {
            backgroundColor: theme.vars.palette.fill.strong,
            color: theme.vars.palette.text.primary,
            fontWeight: weights.medium,
            borderColor: 'transparent',
            '&:hover': { backgroundColor: theme.vars.palette.fill.strong },
          },
          '&.Mui-disabled': {
            color: theme.vars.palette.text.disabled,
            borderColor: theme.vars.palette.action.disabledBackground,
            opacity: 0.6,
          },
          // Inside a ToggleButtonGroup → segmented control
          '&.MuiToggleButtonGroup-grouped': {
            border: 0,
            borderRadius: `${c.toggleButton.radius}px !important`,
            '&:not(:first-of-type)': { marginLeft: 0, borderLeft: 0 },
            '&:hover': { backgroundColor: theme.vars.palette.fill.subtle },
            '&.Mui-selected': {
              backgroundColor: theme.vars.palette.background.paper,
              color: theme.vars.palette.text.primary,
              fontWeight: weights.medium,
              boxShadow: theme.shadows[1],
              '&:hover': { backgroundColor: theme.vars.palette.background.paper },
            },
            '&.Mui-disabled': { opacity: 0.5, boxShadow: 'none' },
          },
        };
      },
    },
  },

  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.vars.palette.fill.muted,
        borderRadius: c.toggleButtonGroup.radius,
        padding: `${c.toggleButtonGroup.padding}px`,
        gap: `${c.toggleButtonGroup.gap}px`,
        border: 'none',
      }),
      grouped: { margin: 0 },
    },
  },
};

// ---------------------------------------------------------------------------
// Assemble the extended theme.
// ---------------------------------------------------------------------------
export const theme = extendTheme({
  // Use a data-attribute selector so we can flip mode by setting
  // `data-mui-color-scheme="dark"` on <html>. Default would be a
  // prefers-color-scheme media query (OS-driven, can't be toggled by UI).
  colorSchemeSelector: 'data',
  colorSchemes: {
    light: {
      palette: buildPalette('light'),
      shadows: buildShadows('light'),
    },
    dark: {
      palette: buildPalette('dark'),
      shadows: buildShadows('dark'),
    },
  },
  typography,
  spacing,
  shape: { borderRadius: radii.sm },
  breakpoints,
  zIndex,
  transitions: {
    duration: motion.durations,
    easing:   motion.easings,
  },
  components: componentOverrides,
});
