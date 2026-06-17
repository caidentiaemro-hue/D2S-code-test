import { forwardRef } from 'react';
import { IconButton as MUIIconButton } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { scale } from '../theme/tokens.spacing.js';
import { radii } from '../theme/tokens.radii.js';
import { borderWidths } from '../theme/tokens.borders.js';

// Box (button hit area) and icon glyph sizes per named size.
// All values resolve from the spacing scale — no arbitrary px.
const SIZE_MAP = {
  xsmall: { box: scale.lg,    icon: 12 },           // 16 / 12
  small:  { box: scale.xl,    icon: scale.lg },     // 24 / 16
  medium: { box: scale['2xl'],icon: 20 },           // 32 / 20
  large:  { box: scale['3xl'],icon: scale.xl },     // 40 / 24
  xlarge: { box: scale['4xl'],icon: 28 },           // 48 / 28
};

const IconBtn = forwardRef(function IconBtn(
  {
    variant = 'standard',
    shape = 'circular',
    size = 'medium',
    color = 'default',
    sx,
    children,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const dims = SIZE_MAP[size] ?? SIZE_MAP.medium;

  const isCustomColor = color !== 'default' && color !== 'inherit' && theme.palette[color];
  const mainColor = isCustomColor ? theme.palette[color].main : theme.palette.text.primary;
  const darkColor = isCustomColor ? theme.palette[color].dark : theme.palette.text.primary;
  const contrastColor = isCustomColor ? theme.palette[color].contrastText : theme.palette.background.paper;

  const variantStyles = (() => {
    if (variant === 'outlined') {
      return {
        border: `${borderWidths.thin}px solid ${mainColor}`,
        color: mainColor,
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: alpha(mainColor, 0.08) },
        '&.Mui-disabled': {
          borderColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
          backgroundColor: 'transparent',
        },
      };
    }
    if (variant === 'soft') {
      return {
        backgroundColor: alpha(mainColor, 0.12),
        color: mainColor,
        '&:hover': { backgroundColor: alpha(mainColor, 0.2) },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      };
    }
    if (variant === 'filled') {
      return {
        backgroundColor: mainColor,
        color: contrastColor,
        '&:hover': { backgroundColor: darkColor },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      };
    }
    return {
      color: mainColor,
      '&:hover': { backgroundColor: alpha(mainColor, 0.08) },
      '&.Mui-disabled': { color: theme.palette.action.disabled },
    };
  })();

  return (
    <MUIIconButton
      ref={ref}
      sx={{
        width: dims.box,
        height: dims.box,
        padding: 0,
        borderRadius: shape === 'rounded' ? radii.md : '50%',
        transition: theme.transitions.create(
          ['background-color', 'border-color', 'color'],
          { duration: theme.transitions.duration.shorter },
        ),
        '&:focus-visible': {
          outline: `${borderWidths.thick}px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        '& > svg, & .MuiSvgIcon-root': { fontSize: dims.icon },
        ...variantStyles,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MUIIconButton>
  );
});

export default IconBtn;
