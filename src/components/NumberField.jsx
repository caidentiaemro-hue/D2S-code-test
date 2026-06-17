import { forwardRef, useId, useState } from 'react';
import {
  FormControl, FormHelperText, OutlinedInput, ButtonBase, Box,
} from '@mui/material';
import InputLabel from './InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { scale } from '../theme/tokens.spacing.js';
import { ramp } from '../theme/tokens.typography.js';
import { borderWidths } from '../theme/tokens.borders.js';

const HEIGHT_BY_SIZE = {
  small:  scale.xl,     // 24
  medium: scale['2xl'], // 32
  large:  scale['3xl'], // 40
};

// Icon glyph + spinner-strip widths are component-specific; not on the spacing
// scale because they need fine control to look right next to the input.
const ICON_BY_SIZE   = { small: 12, medium: 14, large: 16 };
const SPIN_W_BY_SIZE = { small: 18, medium: 22, large: 26 };

const FONT_BY_SIZE = {
  small:  ramp.body.small.fontSize,
  medium: ramp.body.medium.fontSize,
  large:  ramp.body.large.fontSize,
};

function SpinButton({ dir, iconSize, onClick, disabled }) {
  const Icon = dir === 'up' ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;
  return (
    <ButtonBase
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      disabled={disabled}
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        transition: (theme) => theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.shortest,
        }),
        '&:hover': { backgroundColor: (theme) => theme.palette.action.hover },
        '&:active': { backgroundColor: (theme) => theme.palette.action.selected },
        '&.Mui-disabled': { color: 'text.disabled' },
      }}
      aria-label={dir === 'up' ? 'increment' : 'decrement'}
    >
      <Icon sx={{ fontSize: iconSize }} />
    </ButtonBase>
  );
}

const NumberField = forwardRef(function NumberField(
  {
    label,
    helperText,
    error = false,
    required = false,
    disabled = false,
    size = 'medium',
    fullWidth = false,
    value,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    id,
    name,
    sx,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `nf-${reactId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const height = HEIGHT_BY_SIZE[size] ?? HEIGHT_BY_SIZE.medium;
  const iconSize = ICON_BY_SIZE[size] ?? ICON_BY_SIZE.medium;
  const spinWidth = SPIN_W_BY_SIZE[size] ?? SPIN_W_BY_SIZE.medium;
  const fontSize = FONT_BY_SIZE[size] ?? FONT_BY_SIZE.medium;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = isControlled ? value : internal;

  const clamp = (n) => {
    if (n === '' || Number.isNaN(n)) return n;
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  };

  const commit = (next) => {
    const v = clamp(next);
    if (!isControlled) setInternal(v);
    onChange?.({ target: { name, value: v } }, v);
  };

  const handleStep = (delta) => {
    const base = current === '' || current == null ? 0 : Number(current);
    if (Number.isNaN(base)) return;
    commit(base + delta * step);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw === '') return commit('');
    const num = Number(raw);
    if (!Number.isNaN(num)) commit(num);
  };

  const atMax = max !== undefined && Number(current) >= max;
  const atMin = min !== undefined && Number(current) <= min;

  const spinner = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        width: spinWidth,
        ml: 0.5,
        borderLeft: (theme) => `${borderWidths.thin}px solid ${theme.palette.divider}`,
      }}
    >
      <SpinButton dir="up" iconSize={iconSize} onClick={() => handleStep(1)} disabled={disabled || atMax} />
      <SpinButton dir="down" iconSize={iconSize} onClick={() => handleStep(-1)} disabled={disabled || atMin} />
    </Box>
  );

  return (
    <FormControl error={error} required={required} disabled={disabled} fullWidth={fullWidth} sx={sx}>
      {label && (
        <InputLabel
          htmlFor={inputId}
          size={size}
          required={required}
          error={error}
          disabled={disabled}
          sx={{ mb: 0.5 }}
        >
          {label}
        </InputLabel>
      )}
      <OutlinedInput
        ref={ref}
        id={inputId}
        name={name}
        type="number"
        value={current}
        onChange={handleInputChange}
        aria-describedby={helperId}
        endAdornment={spinner}
        inputProps={{ min, max, step }}
        sx={{
          height,
          fontSize,
          paddingRight: 0,
          '& .MuiOutlinedInput-input': {
            paddingTop: 0,
            paddingBottom: 0,
          },
          '& input[type=number]': { MozAppearance: 'textfield' },
          '& input[type=number]::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
          '& input[type=number]::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
        }}
        {...rest}
      />
      {helperText && (
        <FormHelperText id={helperId} sx={{ mx: 0, mt: 0.5 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default NumberField;
