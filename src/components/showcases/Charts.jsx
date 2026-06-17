import { Box, Stack, Typography, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge } from '@mui/x-charts/Gauge';

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function ChartsShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Charts (MUI X)</Typography>
        <Typography variant="body2" color="text.secondary">
          Line, bar, pie, sparkline, gauge.
        </Typography>
      </Box>

      <Section title="LineChart">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
          series={[
            { data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'Series A' },
            { data: [3, 1.5, 4, 6, 4.5, 7], label: 'Series B' },
          ]}
          height={260}
        />
      </Section>

      <Section title="BarChart">
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
          series={[
            { data: [120, 180, 90, 210], label: 'This year' },
            { data: [100, 140, 130, 170], label: 'Last year' },
          ]}
          height={260}
        />
      </Section>

      <Section title="PieChart">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 35, label: 'A' },
                { id: 1, value: 25, label: 'B' },
                { id: 2, value: 20, label: 'C' },
                { id: 3, value: 20, label: 'D' },
              ],
              innerRadius: 40,
              paddingAngle: 2,
              cornerRadius: 4,
            },
          ]}
          height={240}
        />
      </Section>

      <Section title="SparkLine & Gauge">
        <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" color="text.secondary">Sparkline</Typography>
            <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={60} />
          </Box>
          <Box sx={{ width: 200 }}>
            <Typography variant="caption" color="text.secondary">Sparkline (bar)</Typography>
            <SparkLineChart plotType="bar" data={[1, 4, 2, 5, 7, 2, 4, 6]} height={60} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Gauge</Typography>
            <Gauge width={140} height={140} value={72} />
          </Box>
        </Stack>
      </Section>
    </Stack>
  );
}
