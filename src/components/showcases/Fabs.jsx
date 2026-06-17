import { Box, Stack, Typography, Divider, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SIZES = ['medium', 'large'];
const COLORS = ['default', 'primary', 'secondary', 'invert'];

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

function Row({ label, children }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
      <Typography variant="caption" sx={{ width: 80, color: 'text.secondary', textTransform: 'capitalize' }}>
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

export default function FabShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>FAB</Typography>
        <Typography variant="body2" color="text.secondary">
          Two sizes — medium (32) and large (40). Colors: default (white), primary, secondary, invert (black). Circular + Extended variants.
        </Typography>
      </Box>

      <Section title="Circular — by size">
        <Stack spacing={1.5}>
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              {COLORS.map((color) => (
                <Fab key={color} size={size} color={color} aria-label="add">
                  <AddIcon />
                </Fab>
              ))}
              <Fab size={size} color="primary" disabled aria-label="add disabled">
                <AddIcon />
              </Fab>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Extended — by size">
        <Stack spacing={1.5}>
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              {COLORS.map((color) => (
                <Fab key={color} variant="extended" size={size} color={color}>
                  <EditIcon sx={{ mr: 1 }} />
                  Edit
                </Fab>
              ))}
              <Fab variant="extended" size={size} color="primary" disabled>
                <EditIcon sx={{ mr: 1 }} />
                Disabled
              </Fab>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Without label icon (extended)">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Fab variant="extended" size="medium">Default</Fab>
          <Fab variant="extended" size="medium" color="primary">Primary</Fab>
          <Fab variant="extended" size="large" color="secondary">
            <FavoriteIcon sx={{ mr: 1 }} />
            Like
          </Fab>
        </Stack>
      </Section>
    </Stack>
  );
}
