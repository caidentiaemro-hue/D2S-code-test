import { forwardRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { scale } from '../theme/tokens.spacing.js';
import { radii } from '../theme/tokens.radii.js';
import { ramp } from '../theme/tokens.typography.js';
import { borderWidths } from '../theme/tokens.borders.js';

const HEIGHT_BY_SIZE = {
  small:  scale.xl,     // 24
  medium: scale['2xl'], // 32
  large:  scale['3xl'], // 40
};
const ICON_BY_SIZE   = { small: 14, medium: scale.lg, large: 20 };  // 14 / 16 / 20
const FONT_BY_SIZE   = {
  small:  ramp.body.small.fontSize,
  medium: ramp.body.medium.fontSize,
  large:  ramp.body.large.fontSize,
};
const VALUE_W_BY_SIZE = {
  small:  28,
  medium: scale['3xl'], // 40
  large:  scale['4xl'], // 48
};

const NumberSpinner = forwardRef(function NumberSpinner(
  {
    size = 'medium',
    value,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    disabled = false,
    sx,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;

  const height = HEIGHT_BY_SIZE[size] ?? HEIGHT_BY_SIZE.medium;
  const iconSize = ICON_BY_SIZE[size] ?? ICON_BY_SIZE.medium;
  const fontSize = FONT_BY_SIZE[size] ?? FONT_BY_SIZE.medium;
  const valueWidth = VALUE_W_BY_SIZE[size] ?? VALUE_W_BY_SIZE.medium;

  const set = (next) => {
    if (min !== undefined && next < min) next = min;
    if (max !== undefined && next > max) next = max;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const atMin = min !== undefined && Number(current) <= min;
  const atMax = max !== undefined && Number(current) >= max;

  return (
    <Box
      ref={ref}
      role="group"
      aria-label="number stepper"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height,
        bgcolor: (theme) => theme.palette.background.sunken,
        borderRadius: `${radii.md}px`,
        border: `${borderWidths.thin}px solid transparent`,
        transition: (theme) => theme.transitions.create(['background-color', 'border-color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          bgcolor: (theme) => (disabled ? undefined : theme.palette.fill.muted),
        },
        '&:focus-within': {
          borderColor: (theme) => theme.palette.primary.main,
          bgcolor: (theme) => theme.palette.background.sunken,
        },
        opacity: disabled ? 0.5 : 1,
        ...sx,
      }}
      {...rest}
    >
      <IconButton
        size="small"
        onClick={() => set(Number(current) - step)}
        disabled={disabled || atMin}
        sx={{
          width: height,
          height,
          borderRadius: `${radii.md}px 0 0 ${radii.md}px`,
          padding: 0,
        }}
        aria-label="decrement"
      >
        <RemoveIcon sx={{ fontSize: iconSize }} />
      </IconButton>
      <Typography
        component="span"
        sx={{
          minWidth: valueWidth,
          textAlign: 'center',
          fontSize,
          color: disabled ? 'text.disabled' : 'text.primary',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {current}
      </Typography>
      <IconButton
        size="small"
        onClick={() => set(Number(current) + step)}
        disabled={disabled || atMax}
        sx={{
          width: height,
          height,
          borderRadius: `0 ${radii.md}px ${radii.md}px 0`,
          padding: 0,
        }}
        aria-label="increment"
      >
        <AddIcon sx={{ fontSize: iconSize }} />
      </IconButton>
    </Box>
  );
});

export default NumberSpinner;
