import { Box, Stack, Typography, Divider, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InlineBadge from '../InlineBadge';

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

// Helper to show badge sizes via sx overrides (Badge has no native size prop)
function SmallBadge(props) {
  return (
    <Badge
      sx={{
        '& .MuiBadge-badge': { minWidth: 16, height: 16, fontSize: '0.625rem', padding: '0 4px' },
        '& .MuiBadge-dot': { width: 6, height: 6, minWidth: 6 },
      }}
      {...props}
    />
  );
}
function LargeBadge(props) {
  return (
    <Badge
      sx={{
        '& .MuiBadge-badge': { minWidth: 24, height: 24, padding: '0 8px' },
        '& .MuiBadge-dot': { width: 10, height: 10, minWidth: 10 },
      }}
      {...props}
    />
  );
}

// Anchor element for overlay badges
function Anchor({ size = 28 }) {
  return <Box sx={{ width: size, height: size, borderRadius: 1, backgroundColor: 'action.hover' }} />;
}

const OVERLAY_COLORS = ['default', 'primary', 'secondary', 'error', 'warning', 'success', 'invert'];

export default function BadgesShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Badge</Typography>
        <Typography variant="body2" color="text.secondary">
          Overlay notification badges, dot indicators, and inline status labels.
        </Typography>
      </Box>

      <Section title="Standard — colors">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap alignItems="flex-end">
          {OVERLAY_COLORS.map((c) => (
            <Stack key={c} alignItems="center" spacing={1}>
              <Badge badgeContent={1} color={c}>
                <Anchor />
              </Badge>
              <Typography variant="caption" color="text.disabled" sx={{ textTransform: 'capitalize' }}>{c}</Typography>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Standard — sizes">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap alignItems="flex-end">
          {[
            { label: 'Small', BadgeComp: SmallBadge },
            { label: 'Medium', BadgeComp: Badge },
            { label: 'Large', BadgeComp: LargeBadge },
          ].map(({ label, BadgeComp }) => (
            <Stack key={label} alignItems="center" spacing={1}>
              <BadgeComp badgeContent={9} color="primary">
                <Anchor />
              </BadgeComp>
              <Typography variant="caption" color="text.disabled">{label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Dot — colors">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap alignItems="flex-end">
          {OVERLAY_COLORS.map((c) => (
            <Stack key={c} alignItems="center" spacing={1}>
              <Badge variant="dot" color={c}>
                <Anchor />
              </Badge>
              <Typography variant="caption" color="text.disabled" sx={{ textTransform: 'capitalize' }}>{c}</Typography>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Dot — sizes">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap alignItems="flex-end">
          {[
            { label: 'Small', BadgeComp: SmallBadge },
            { label: 'Medium', BadgeComp: Badge },
            { label: 'Large', BadgeComp: LargeBadge },
          ].map(({ label, BadgeComp }) => (
            <Stack key={label} alignItems="center" spacing={1}>
              <BadgeComp variant="dot" color="primary">
                <Anchor />
              </BadgeComp>
              <Typography variant="caption" color="text.disabled">{label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="On icons">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap alignItems="center">
          <Badge badgeContent={4} color="error">
            <IconButton><NotificationsIcon /></IconButton>
          </Badge>
          <Badge badgeContent={12} color="primary">
            <IconButton><MailIcon /></IconButton>
          </Badge>
          <Badge badgeContent={99} color="warning">
            <IconButton><ShoppingCartIcon /></IconButton>
          </Badge>
          <Badge variant="dot" color="success">
            <IconButton><NotificationsIcon /></IconButton>
          </Badge>
          <Badge badgeContent={0} showZero color="secondary">
            <IconButton><MailIcon /></IconButton>
          </Badge>
        </Stack>
      </Section>

      <Section title="Inline Badge — colors">
        <Stack spacing={2}>
          {(['small', 'medium']).map((size) => (
            <Stack key={size} direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <Typography variant="caption" sx={{ width: 52, color: 'text.disabled', textTransform: 'capitalize' }}>{size}</Typography>
              {['primary', 'secondary', 'success', 'warning', 'error', 'accent', 'invert', 'grey', 'inactive', 'white'].map((color) => (
                <InlineBadge key={color} color={color} size={size}>
                  Badge Text
                </InlineBadge>
              ))}
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Inline Badge — with dot indicator">
        <Stack spacing={2}>
          {(['small', 'medium']).map((size) => (
            <Stack key={size} direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <Typography variant="caption" sx={{ width: 52, color: 'text.disabled', textTransform: 'capitalize' }}>{size}</Typography>
              {['primary', 'secondary', 'success', 'warning', 'error', 'accent', 'invert', 'grey', 'inactive', 'white'].map((color) => (
                <InlineBadge key={color} color={color} size={size} dot>
                  Badge Text
                </InlineBadge>
              ))}
            </Stack>
          ))}
        </Stack>
      </Section>
    </Stack>
  );
}
