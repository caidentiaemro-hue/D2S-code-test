import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { scale } from '../theme/tokens.spacing.js';
import { ramp, weights } from '../theme/tokens.typography.js';

// Size → typography ramp slot. Labels use the `label` ramp (medium weight,
// tight line-height) since they're UI text, not body copy.
const TYPO_BY_SIZE = {
  small:  ramp.label.small,
  medium: ramp.label.medium,
  large:  ramp.label.large,
};

const InputLabel = forwardRef(function InputLabel(
  {
    size = 'medium',
    required = false,
    disabled = false,
    error = false,
    htmlFor,
    children,
    sx,
    ...rest
  },
  ref,
) {
  const typo = TYPO_BY_SIZE[size] ?? TYPO_BY_SIZE.medium;

  return (
    <Box
      ref={ref}
      component="label"
      htmlFor={htmlFor}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${scale.xxs}px`,
        fontFamily: typo.fontFamily,
        fontSize: typo.fontSize,
        lineHeight: typo.lineHeight,
        fontWeight: weights.medium,
        color: (theme) => {
          if (disabled) return theme.palette.text.disabled;
          if (error) return theme.palette.error.main;
          return theme.palette.text.secondary;
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
      {required && (
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            color: (theme) => (disabled ? theme.palette.text.disabled : theme.palette.error.main),
            ml: `${scale.xxs}px`,
            lineHeight: 1,
          }}
        >
          *
        </Box>
      )}
    </Box>
  );
});

export default InputLabel;
