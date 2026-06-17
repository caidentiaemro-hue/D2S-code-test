import { Box, Stack, Typography, Divider, Paper } from '@mui/material';
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineConnector,
  TimelineContent, TimelineDot, TimelineOppositeContent,
} from '@mui/lab';
import Masonry from '@mui/lab/Masonry';

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

const HEIGHTS = [60, 100, 80, 140, 70, 120, 90, 160];

export default function LabShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Lab</Typography>
        <Typography variant="body2" color="text.secondary">
          Experimental components from @mui/lab — Timeline, Masonry.
        </Typography>
      </Box>

      <Section title="Timeline">
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">09:30</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sign up</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">10:00</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Email verified</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">10:45</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Profile complete</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>

      <Section title="Masonry">
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {HEIGHTS.map((h, i) => (
            <Paper key={i} sx={{ height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
              {i + 1}
            </Paper>
          ))}
        </Masonry>
      </Section>
    </Stack>
  );
}
