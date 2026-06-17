import { Box, Stack, Typography, useTheme, Divider } from '@mui/material';

const HEADERS = [
  ['display1', '80px / 400'],
  ['display2', '64px / 400'],
  ['display3', '48px / 400'],
  ['h1', '38px / 500'],
  ['h2', '32px / 500'],
  ['h3', '24px / 500'],
  ['h4', '20px / 500'],
  ['h5', '16px / 500'],
];

const BODY = [
  ['xxLarge', '2XLarge', '20px / 400'],
  ['xLarge', 'XLarge', '18px / 400'],
  ['large', 'Large', '16px / 400'],
  ['medium', 'Medium', '14px / 400'],
  ['small', 'Small', '12px / 400'],
  ['xSmall', 'XSmall', '10px / 400'],
];

function Row({ name, spec, style }) {
  return (
    <Stack direction="row" spacing={2} alignItems="baseline">
      <Typography variant="caption" sx={{ width: 96, color: 'text.secondary' }}>{name}</Typography>
      <Typography variant="caption" sx={{ width: 96, color: 'text.disabled' }}>{spec}</Typography>
      <Box sx={style}>The quick brown fox</Box>
    </Stack>
  );
}

export default function TypographyShowcase() {
  const theme = useTheme();
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Typography</Typography>
        <Typography variant="body2" color="text.secondary">
          Headers (display + h1–h5) and body ramp (XSmall → 2XLarge).
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>Headers</Typography>
        <Stack spacing={1.5}>
          {HEADERS.map(([variant, spec]) => (
            <Row key={variant} name={variant} spec={spec} style={theme.typography[variant]} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>Body</Typography>
        <Stack spacing={1.5}>
          {BODY.map(([key, label, spec]) => (
            <Row key={key} name={label} spec={spec} style={theme.typography.customContent[key]} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
