import { Box, Stack, Typography, Checkbox, Divider } from '@mui/material';

const SIZES = ['small', 'medium', 'large'];
const COLORS = ['primary', 'secondary', 'error'];
const COL_WIDTH = 48;

function HeaderRow() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ width: 80 }} />
      {['off', 'on', 'indet'].map((label) => (
        <Typography key={`e-${label}`} variant="caption" sx={{ width: COL_WIDTH, textAlign: 'center', color: 'text.secondary' }}>
          {label}
        </Typography>
      ))}
      <Box sx={{ width: 16 }} />
      {['off', 'on', 'indet'].map((label) => (
        <Typography key={`d-${label}`} variant="caption" sx={{ width: COL_WIDTH, textAlign: 'center', color: 'text.disabled' }}>
          {label}
        </Typography>
      ))}
    </Stack>
  );
}

function ColorRow({ color, size }) {
  const cell = (extraProps) => (
    <Box sx={{ width: COL_WIDTH, display: 'flex', justifyContent: 'center' }}>
      <Checkbox size={size} color={color} {...extraProps} />
    </Box>
  );
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="caption" sx={{ width: 80, textTransform: 'capitalize', color: 'text.secondary' }}>
        {color}
      </Typography>
      {cell({ defaultChecked: false })}
      {cell({ defaultChecked: true })}
      {cell({ indeterminate: true })}
      <Box sx={{ width: 16 }} />
      {cell({ disabled: true })}
      {cell({ disabled: true, defaultChecked: true })}
      {cell({ disabled: true, indeterminate: true })}
    </Stack>
  );
}

function SizeBlock({ size }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, textTransform: 'capitalize' }}>{size}</Typography>
      <Stack spacing={0.5}>
        <HeaderRow />
        {COLORS.map((c) => <ColorRow key={c} color={c} size={size} />)}
      </Stack>
    </Box>
  );
}

export default function CheckboxShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Checkbox</Typography>
        <Typography variant="body2" color="text.secondary">
          All interactive — hover, focus, and press a checkbox to see its halo states. Right cluster is disabled.
        </Typography>
      </Box>
      {SIZES.map((s) => <SizeBlock key={s} size={s} />)}
    </Stack>
  );
}
