import { Box, Stack, Typography, Divider, ButtonGroup, Button } from '@mui/material';

const ORIENTATIONS = ['horizontal', 'vertical'];
const COLORS = ['primary', 'secondary'];
const VARIANTS = ['contained', 'text', 'outlined'];

function Group({ orientation, color, variant }) {
  return (
    <ButtonGroup orientation={orientation} variant={variant} color={color} aria-label="button group">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </ButtonGroup>
  );
}

function OrientationBlock({ orientation }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textTransform: 'capitalize' }}>{orientation}</Typography>
      <Stack
        direction="column"
        spacing={3}
      >
        {COLORS.map((color) => (
          <Box key={color}>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize', display: 'block', mb: 1 }}>
              {color}
            </Typography>
            <Stack direction="row" spacing={6} alignItems="flex-start" flexWrap="wrap" useFlexGap>
              {VARIANTS.map((variant) => (
                <Box key={variant}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1, textTransform: 'capitalize' }}>
                    {variant}
                  </Typography>
                  <Group orientation={orientation} color={color} variant={variant} />
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function ButtonGroupsShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Button Group</Typography>
        <Typography variant="body2" color="text.secondary">
          Orientation × color × variant. Same API as MUI ButtonGroup — children are real Buttons, so any onClick/disabled etc. just works.
        </Typography>
      </Box>
      {ORIENTATIONS.map((o) => <OrientationBlock key={o} orientation={o} />)}
    </Stack>
  );
}
