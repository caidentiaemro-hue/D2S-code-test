import { forwardRef, useId } from 'react';
import {
  FormControl, FormHelperText, Select, MenuItem, InputAdornment, Box,
} from '@mui/material';
import InputLabel from './InputLabel';
import { scale } from '../theme/tokens.spacing.js';
import { ramp } from '../theme/tokens.typography.js';

const HEIGHT_BY_SIZE = {
  small:  scale['2xl'], // 32
  medium: scale['3xl'], // 40
  large:  scale['4xl'], // 48
};

const FONT_BY_SIZE = {
  small:  ramp.body.small.fontSize,  // 0.75rem
  medium: ramp.body.medium.fontSize, // 0.875rem
  large:  ramp.body.large.fontSize,  // 1rem
};

const SelectInput = forwardRef(function SelectInput(
  {
    label,
    helperText,
    error = false,
    required = false,
    disabled = false,
    size = 'medium',
    fullWidth = false,
    startAdornment,
    placeholder,
    value,
    defaultValue,
    onChange,
    id,
    name,
    options,
    children,
    multiple = false,
    sx,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `si-${reactId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const height = HEIGHT_BY_SIZE[size] ?? HEIGHT_BY_SIZE.medium;
  const fontSize = FONT_BY_SIZE[size] ?? FONT_BY_SIZE.medium;

  const isControlled = value !== undefined;
  const computedValue = isControlled ? value : undefined;
  const computedDefault = !isControlled
    ? (defaultValue !== undefined ? defaultValue : (multiple ? [] : ''))
    : undefined;

  const renderValue = placeholder
    ? (val) => {
        const empty = val === '' || val == null || (Array.isArray(val) && val.length === 0);
        if (empty) {
          return <Box component="span" sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
        }
        return Array.isArray(val) ? val.join(', ') : val;
      }
    : undefined;

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
      <Select
        ref={ref}
        id={inputId}
        name={name}
        {...(isControlled ? { value: computedValue } : { defaultValue: computedDefault })}
        onChange={onChange}
        multiple={multiple}
        displayEmpty={Boolean(placeholder)}
        renderValue={renderValue}
        startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined}
        aria-describedby={helperId}
        sx={{
          height,
          fontSize,
          '& .MuiSelect-select': {
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        {...rest}
      >
        {children
          ?? options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.icon && (
                <Box component="span" sx={{ mr: 1, display: 'inline-flex', '& svg': { fontSize: 18 } }}>
                  {opt.icon}
                </Box>
              )}
              {opt.label}
            </MenuItem>
          ))}
      </Select>
      {helperText && (
        <FormHelperText id={helperId} sx={{ mx: 0, mt: 0.5 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default SelectInput;
