import { forwardRef } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SIZE_MAP = {
  xsmall: { px: 16,  fontSize: '0.625rem' },
  small:  { px: 24,  fontSize: '0.75rem'  },
  medium: { px: 32,  fontSize: '0.75rem'  },
  large:  { px: 40,  fontSize: '0.875rem' },
  xlarge: { px: 48,  fontSize: '1rem'     },
  '2xl':  { px: 56,  fontSize: '1.125rem' },
  '3xl':  { px: 64,  fontSize: '1.25rem'  },
  '4xl':  { px: 72,  fontSize: '1.5rem'   },
  '5xl':  { px: 96,  fontSize: '2rem'     },
  '6xl':  { px: 160, fontSize: '3rem'     },
};

const Avatar = forwardRef(function Avatar(
  { size = 'large', color = 'default', variant = 'circular', sx, children, ...rest },
  ref,
) {
  const theme = useTheme();
  const dims = SIZE_MAP[size] ?? SIZE_MAP.large;

  const colorSx = (() => {
    if (color === 'invert') return {
      backgroundColor: theme.palette.invert.main,
      color: theme.palette.invert.contrastText,
      borderColor: theme.palette.divider,
    };
    if (color === 'accent') return {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.divider,
    };
    return {};
  })();

  return (
    <MuiAvatar
      ref={ref}
      variant={variant}
      sx={{ width: dims.px, height: dims.px, fontSize: dims.fontSize, ...colorSx, ...sx }}
      {...rest}
    >
      {children}
    </MuiAvatar>
  );
});

export default Avatar;
