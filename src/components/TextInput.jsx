import { forwardRef, useId } from 'react';
import {
  FormControl, FormHelperText, OutlinedInput, InputAdornment,
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

const TextInput = forwardRef(function TextInput(
  {
    label,
    helperText,
    error = false,
    required = false,
    disabled = false,
    size = 'medium',
    fullWidth = false,
    startAdornment,
    endAdornment,
    multiline = false,
    rows,
    minRows,
    placeholder,
    value,
    defaultValue,
    onChange,
    id,
    name,
    type = 'text',
    sx,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `ti-${reactId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const height = HEIGHT_BY_SIZE[size] ?? HEIGHT_BY_SIZE.medium;
  const fontSize = FONT_BY_SIZE[size] ?? FONT_BY_SIZE.medium;

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
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        aria-describedby={helperId}
        startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined}
        endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined}
        sx={{
          ...(multiline ? {} : { height }),
          fontSize,
        }}
        {...rest}
      />
      {helperText && (
        <FormHelperText id={helperId} sx={{ mx: 0, mt: 0.5 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default TextInput;
