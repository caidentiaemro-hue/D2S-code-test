import { Box, Stack, Typography, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputLabel from '../InputLabel';

const PICKER_SLOT_PROPS = { textField: { size: 'small' } };

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function DatePickersShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Date Pickers (MUI X)</Typography>
        <Typography variant="body2" color="text.secondary">
          Date, time, datetime, and inline calendar pickers — dayjs adapter.
        </Typography>
      </Box>

      <Section title="Input pickers">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="flex-start">
          <Stack spacing={0.5}>
            <InputLabel size="small">Date</InputLabel>
            <DatePicker slotProps={PICKER_SLOT_PROPS} />
          </Stack>
          <Stack spacing={0.5}>
            <InputLabel size="small">Time</InputLabel>
            <TimePicker slotProps={PICKER_SLOT_PROPS} />
          </Stack>
          <Stack spacing={0.5}>
            <InputLabel size="small">Date &amp; time</InputLabel>
            <DateTimePicker slotProps={PICKER_SLOT_PROPS} />
          </Stack>
          <Stack spacing={0.5}>
            <InputLabel size="small" disabled>Disabled</InputLabel>
            <DatePicker slotProps={PICKER_SLOT_PROPS} disabled />
          </Stack>
        </Stack>
      </Section>

      <Section title="Inline calendar">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          <Box>
            <Typography variant="caption" color="text.secondary">DateCalendar</Typography>
            <DateCalendar />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">StaticDatePicker</Typography>
            <StaticDatePicker />
          </Box>
        </Stack>
      </Section>
    </Stack>
  );
}
