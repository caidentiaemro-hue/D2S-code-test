import { Box, Stack, Typography, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconBtn from '../IconBtn';

const COLORS = ['default', 'primary', 'secondary', 'error'];
const SIZES = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const COMBOS = [
  { variant: 'outlined', shape: 'circular' },
  { variant: 'outlined', shape: 'rounded' },
  { variant: 'soft', shape: 'circular' },
  { variant: 'soft', shape: 'rounded' },
  { variant: 'standard', shape: 'circular' },
  { variant: 'filled', shape: 'circular' },
  { variant: 'filled', shape: 'rounded' },
];

function Row({ variant, shape }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
        {variant} · {shape}
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
        {SIZES.map((size) => (
          <Stack key={size} direction="row" spacing={1} alignItems="center">
            {COLORS.map((color) => (
              <IconBtn key={color} variant={variant} shape={shape} size={size} color={color} aria-label="like">
                <FavoriteBorderIcon />
              </IconBtn>
            ))}
            <Box sx={{ width: 8 }} />
            {COLORS.map((color) => (
              <IconBtn
                key={`${color}-d`}
                variant={variant}
                shape={shape}
                size={size}
                color={color}
                disabled
                aria-label="like disabled"
              >
                <FavoriteBorderIcon />
              </IconBtn>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function IconButtonShowcase() {
  return (
    <Stack spacing={2.5} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Icon Buttons</Typography>
        <Typography variant="body2" color="text.secondary">
          Variant × shape × size × color. Right cluster in each size group is the disabled state.
        </Typography>
      </Box>
      {COMBOS.map((combo) => (
        <Row key={`${combo.variant}-${combo.shape}`} {...combo} />
      ))}
    </Stack>
  );
}
