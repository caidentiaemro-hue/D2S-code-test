// Layer 2 — Semantic color tokens (light + dark).
//
// Maps role names to Caidentia primitives. Components reference these roles,
// not raw hex. Light + dark are mirrors of the same role taxonomy so dark
// mode is a one-line scheme swap, not a component-level refactor.
//
// Naming follows MUI-native palette slots wherever they exist:
//   - text.*, background.*, divider, action.*  → MUI built-ins (extended)
//   - error / warning / info / success         → MUI status families (extended with bg/border/fg)
//   - primary / secondary                      → MUI brand slots
// Custom-only namespaces (no MUI equivalent):
//   - border.{subtle,strong,focus}             → border scale (MUI has only `divider`)
//   - fill.{subtle,muted,strong,inverse}       → tinted shapes on a surface
//   - invert.{main,contrastText}               → project convention

import { caidentia } from './tokens.colors';

const { gray, blueViolet, red, orange, blue, green } = caidentia;

const light = {
  text: {
    primary:   gray[900],
    secondary: gray[600],
    disabled:  gray[400],
    tertiary:  gray[500],
    inverse:   '#ffffff',
    link:      blueViolet[600],
  },

  background: {
    default: '#ffffff',
    paper:   '#ffffff',
    raised:  '#ffffff',
    sunken:  gray[50],
    overlay: 'rgba(0,0,0,0.5)',
    inverse: gray[900],
  },

  divider: gray[200],
  border: {
    subtle: gray[200],
    strong: gray[500],
    focus:  blueViolet[600],
  },

  fill: {
    subtle:  gray[50],
    muted:   gray[100],
    strong:  gray[200],
    inverse: gray[900],
  },

  primary: {
    main:         blueViolet[600],
    dark:         blueViolet[700],
    light:        blueViolet[300],
    contrastText: '#ffffff',
    bg:           blueViolet[50],
    fg:           blueViolet[700],
  },

  secondary: {
    main:         gray[600],
    dark:         gray[700],
    light:        gray[300],
    contrastText: '#ffffff',
  },

  error: {
    main:         red[600],
    light:        red[50],
    dark:         red[700],
    contrastText: '#ffffff',
    bg:           red[50],
    border:       red[200],
    fg:           red[700],
  },

  warning: {
    main:         orange[600],
    light:        orange[50],
    dark:         orange[700],
    contrastText: '#ffffff',
    bg:           orange[50],
    border:       orange[200],
    fg:           orange[700],
  },

  info: {
    main:         blue[600],
    light:        blue[50],
    dark:         blue[700],
    contrastText: '#ffffff',
    bg:           blue[50],
    border:       blue[200],
    fg:           blue[700],
  },

  success: {
    main:         green[600],
    light:        green[50],
    dark:         green[700],
    contrastText: '#ffffff',
    bg:           green[50],
    border:       green[200],
    fg:           green[700],
  },

  invert: {
    main:         '#000000',
    contrastText: '#ffffff',
  },

  action: {
    hover:              'rgba(0,0,0,0.04)',
    selected:           'rgba(0,0,0,0.08)',
    focus:              'rgba(0,0,0,0.12)',
    disabled:           'rgba(0,0,0,0.38)',
    disabledBackground: 'rgba(0,0,0,0.12)',
    active:             'rgba(0,0,0,0.56)',
  },
};

const dark = {
  text: {
    primary:   gray[50],
    secondary: gray[300],
    disabled:  gray[600],
    tertiary:  gray[400],
    inverse:   gray[900],
    link:      blueViolet[400],
  },

  background: {
    default: gray[900],
    paper:   gray[800],
    raised:  gray[700],
    sunken:  gray[800],
    overlay: 'rgba(0,0,0,0.7)',
    inverse: '#ffffff',
  },

  divider: gray[800],
  border: {
    subtle: gray[800],
    strong: gray[500],
    focus:  blueViolet[400],
  },

  fill: {
    subtle:  gray[800],
    muted:   gray[700],
    strong:  gray[600],
    inverse: '#ffffff',
  },

  primary: {
    main:         blueViolet[500],
    dark:         blueViolet[600],
    light:        blueViolet[400],
    contrastText: '#ffffff',
    bg:           blueViolet[900],
    fg:           blueViolet[300],
  },

  secondary: {
    main:         gray[500],
    dark:         gray[600],
    light:        gray[700],
    contrastText: '#ffffff',
  },

  error: {
    main:         red[500],
    light:        red[900],
    dark:         red[400],
    contrastText: '#ffffff',
    bg:           red[900],
    border:       red[700],
    fg:           red[300],
  },

  warning: {
    main:         orange[500],
    light:        orange[900],
    dark:         orange[400],
    contrastText: '#ffffff',
    bg:           orange[900],
    border:       orange[700],
    fg:           orange[300],
  },

  info: {
    main:         blue[500],
    light:        blue[900],
    dark:         blue[400],
    contrastText: '#ffffff',
    bg:           blue[900],
    border:       blue[700],
    fg:           blue[300],
  },

  success: {
    main:         green[500],
    light:        green[900],
    dark:         green[400],
    contrastText: '#ffffff',
    bg:           green[900],
    border:       green[700],
    fg:           green[300],
  },

  invert: {
    main:         '#ffffff',
    contrastText: '#000000',
  },

  action: {
    hover:              'rgba(255,255,255,0.06)',
    selected:           'rgba(255,255,255,0.10)',
    focus:              'rgba(255,255,255,0.14)',
    disabled:           'rgba(255,255,255,0.38)',
    disabledBackground: 'rgba(255,255,255,0.12)',
    active:             'rgba(255,255,255,0.70)',
  },
};

export const semantic = { light, dark };
