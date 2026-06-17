import { Box, Stack, Typography, Divider } from '@mui/material';
import NumberField from '../NumberField';
import NumberSpinner from '../NumberSpinner';

const SIZES = ['small', 'medium', 'large'];

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function NumberInputsShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Number Inputs</Typography>
        <Typography variant="body2" color="text.secondary">
          Two patterns: NumberField (text input with vertical spin arrows) and NumberSpinner (− value + horizontal stepper).
        </Typography>
      </Box>

      <Section title="NumberField — sizes">
        <Stack direction="row" spacing={2} alignItems="flex-end" flexWrap="wrap" useFlexGap>
          {SIZES.map((s) => (
            <NumberField key={s} label={s} size={s} defaultValue={1} min={0} max={99} sx={{ width: 160 }} />
          ))}
        </Stack>
      </Section>

      <Section title="NumberField — states">
        <Stack direction="row" spacing={2} alignItems="flex-end" flexWrap="wrap" useFlexGap>
          <NumberField label="Default" defaultValue={1} sx={{ width: 160 }} />
          <NumberField label="With helper" defaultValue={1} helperText="0–100" sx={{ width: 160 }} />
          <NumberField label="Min/max" defaultValue={5} min={0} max={10} helperText="Range 0–10" sx={{ width: 160 }} />
          <NumberField label="Step" defaultValue={0} step={5} helperText="Steps of 5" sx={{ width: 160 }} />
          <NumberField label="Error" error defaultValue={-1} helperText="Must be positive" sx={{ width: 160 }} />
          <NumberField label="Disabled" disabled defaultValue={1} sx={{ width: 160 }} />
        </Stack>
      </Section>

      <Section title="NumberSpinner — sizes">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          {SIZES.map((s) => (
            <Box key={s} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{s}</Typography>
              <NumberSpinner size={s} defaultValue={1} min={0} max={99} />
            </Box>
          ))}
        </Stack>
      </Section>

      <Section title="NumberSpinner — states">
        <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Default</Typography>
            <NumberSpinner defaultValue={1} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>At min (0)</Typography>
            <NumberSpinner defaultValue={0} min={0} max={10} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>At max (10)</Typography>
            <NumberSpinner defaultValue={10} min={0} max={10} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Step 5</Typography>
            <NumberSpinner defaultValue={0} step={5} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Disabled</Typography>
            <NumberSpinner defaultValue={1} disabled />
          </Box>
        </Stack>
      </Section>
    </Stack>
  );
}
