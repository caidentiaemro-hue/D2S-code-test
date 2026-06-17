import { Box, Stack, Typography, Divider } from '@mui/material';
import GNB from '../GNB';

export default function PatternsShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Patterns</Typography>
        <Typography variant="body2" color="text.secondary">
          Assembled UI patterns built from Caidentia components.
        </Typography>
      </Box>

      {/* GNB */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>Global Navigation Bar (GNB)</Typography>
        <Box
          sx={(theme) => ({
            mx: { xs: -2, sm: -3 },
            border: `1px solid ${theme.vars.palette.divider}`,
            borderRadius: 0,
          })}
        >
          <GNB />
        </Box>
      </Box>
    </Stack>
  );
}
