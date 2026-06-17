import { Box } from '@mui/material';
import { scale } from '../theme/tokens.spacing.js';
import { radii } from '../theme/tokens.radii.js';
import { ramp, weights } from '../theme/tokens.typography.js';

// Two sizes: small (20px) and medium (24px). Both pill-shaped.
const SIZE = {
  small:  { height: 20,           paddingX: 6,         typography: ramp.body.small  }, // 12px
  medium: { height: scale.xl,     paddingX: scale.sm,  typography: ramp.body.medium }, // 24 / 8 / 14px
};

// Filled-style backgrounds. All colors route through theme.palette so they
// flip automatically in dark mode.
function getFilledSx(color, theme) {
  const c = theme.palette.caidentia;
  const map = {
    primary:   { backgroundColor: theme.palette.primary.main,   color: theme.palette.primary.contrastText },
    secondary: { backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText },
    success:   { backgroundColor: theme.palette.success.main,   color: theme.palette.success.contrastText },
    warning:   { backgroundColor: theme.palette.warning.main,   color: theme.palette.warning.contrastText },
    error:     { backgroundColor: theme.palette.error.main,     color: theme.palette.error.contrastText },
    info:      { backgroundColor: theme.palette.info.main,      color: theme.palette.info.contrastText },
    accent:    { backgroundColor: c.cyan[500],                  color: '#ffffff' }, // brand cyan reads on both modes
    invert:    { backgroundColor: theme.palette.invert.main,    color: theme.palette.invert.contrastText },
    // Neutral fills use semantic roles so they invert correctly in dark mode.
    grey:      { backgroundColor: theme.palette.fill.muted,     color: theme.palette.text.secondary },
    inactive:  { backgroundColor: theme.palette.fill.strong,    color: theme.palette.text.secondary },
    white:     {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
    },
  };
  return map[color] ?? map.primary;
}

// Dot-style indicators. Color is mapped per badge color; the badge itself is
// background-less in dot mode.
function getDotColor(color, theme) {
  const c = theme.palette.caidentia;
  const map = {
    primary:   theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success:   theme.palette.success.main,
    warning:   theme.palette.warning.main,
    error:     theme.palette.error.main,
    info:      theme.palette.info.main,
    accent:    c.cyan[500],
    invert:    theme.palette.invert.main,
    grey:      theme.palette.text.tertiary,
    inactive:  theme.palette.text.disabled,
    white:     theme.palette.divider,
  };
  return map[color] ?? map.primary;
}

export default function InlineBadge({ color = 'primary', size = 'medium', dot = false, children, sx }) {
  const sz = SIZE[size] ?? SIZE.medium;
  return (
    <Box
      component="span"
      sx={[
        (theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: `${scale.xs}px`,
          height: sz.height,
          padding: `0 ${sz.paddingX}px`,
          borderRadius: `${radii.full}px`,
          fontSize: sz.typography.fontSize,
          fontWeight: weights.medium,
          lineHeight: 1,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          ...(dot
            ? { color: theme.palette.text.secondary }
            : getFilledSx(color, theme)
          ),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {dot && (
        <Box
          component="span"
          sx={(theme) => ({
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: getDotColor(color, theme),
            flexShrink: 0,
          })}
        />
      )}
      {children}
    </Box>
  );
}
