import { Box, Button, Stack, Typography, Divider } from '@mui/material';

const VARIANTS = ['contained', 'outlined', 'text'];
const COLORS = ['primary', 'secondary', 'error', 'inherit'];
const SIZES = ['large', 'medium', 'small'];

function VariantBlock({ variant }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, textTransform: 'capitalize' }}>
        {variant}
      </Typography>

      <Stack spacing={1.5}>
        {SIZES.map((size) => (
          <Stack key={size} direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography variant="caption" sx={{ width: 56, color: 'text.secondary' }}>
              {size}
            </Typography>
            {COLORS.map((color) => (
              <Button key={color} variant={variant} color={color} size={size}>
                Button
              </Button>
            ))}
            {COLORS.map((color) => (
              <Button key={`${color}-disabled`} variant={variant} color={color} size={size} disabled>
                Button
              </Button>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function ButtonShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Buttons</Typography>
        <Typography variant="body2" color="text.secondary">
          Variant × color × size grid. Right half of each row is the disabled state.
        </Typography>
      </Box>
      {VARIANTS.map((variant) => (
        <VariantBlock key={variant} variant={variant} />
      ))}
    </Stack>
  );
}
