import {
  Box, Stack, Typography, Divider,
  Chip, Avatar, AvatarGroup, Badge, Skeleton, Tooltip,
  List, ListItem, ListItemAvatar, ListItemText, ListItemIcon, ListItemButton,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';

const AVATAR_SIZES = [
  { px: 16,  label: 'xSmall', fontSize: '0.625rem' },
  { px: 24,  label: 'Small',  fontSize: '0.75rem'  },
  { px: 32,  label: 'Medium', fontSize: '0.75rem'  },
  { px: 40,  label: 'Large',  fontSize: '0.875rem' },
  { px: 48,  label: 'xLarge', fontSize: '1rem'     },
  { px: 56,  label: '2xL',    fontSize: '1.125rem' },
  { px: 64,  label: '3xL',    fontSize: '1.25rem'  },
  { px: 72,  label: '4xL',    fontSize: '1.5rem'   },
  { px: 96,  label: '5xL',    fontSize: '2rem'     },
  { px: 160, label: '6xL',    fontSize: '3rem'     },
];

const INVERT_SX  = { bgcolor: '#000000', color: '#fff', borderColor: '#f2f4f7' };
const ACCENT_SX  = { bgcolor: '#6172f3', color: '#fff', borderColor: '#f2f4f7' };

function Section({ title, id, children }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function DisplayShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Display</Typography>
        <Typography variant="body2" color="text.secondary">
          Tags, avatars, badges, skeletons, lists, tooltips.
        </Typography>
      </Box>

      <Section title="Chip" id="display-chip">
        <Stack spacing={1.5}>
          {/* sizes */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
            <Chip label="Small" size="small" onClick={() => {}} />
            <Chip label="Medium" onClick={() => {}} />
            <Chip label="Large" size="large" onClick={() => {}} />
          </Stack>
          {/* interactive states — default color */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
            <Chip label="Default" />
            <Chip label="Clickable" onClick={() => {}} />
            <Chip label="With delete" onDelete={() => {}} />
            <Chip label="With icon" icon={<FaceIcon />} onClick={() => {}} />
            <Chip avatar={<Avatar>M</Avatar>} label="Avatar" onClick={() => {}} />
            <Chip label="Outlined" variant="outlined" onClick={() => {}} />
            <Chip label="Disabled" disabled />
          </Stack>
          {/* error state */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
            <Chip label="Error" color="error" />
            <Chip label="Error clickable" color="error" onClick={() => {}} />
            <Chip label="Error + delete" color="error" onDelete={() => {}} />
            <Chip label="Error outlined" color="error" variant="outlined" />
            <Chip label="Error disabled" color="error" disabled />
          </Stack>
        </Stack>
      </Section>

      <Section title="Avatar" id="display-avatar">
        <Stack spacing={2.5}>
          {/* Sizes — Circle, Text, Default */}
          <Stack direction="row" spacing={1.5} alignItems="flex-end" flexWrap="wrap" useFlexGap>
            {AVATAR_SIZES.map(({ px, label, fontSize }) => (
              <Box key={px} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Avatar sx={{ width: px, height: px, fontSize }}>CA</Avatar>
                <Typography variant="caption" color="text.disabled">{label}</Typography>
              </Box>
            ))}
          </Stack>

          {/* Colors × Variants — Text */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
            <Avatar sx={{ width: 40, height: 40 }}>CA</Avatar>
            <Avatar sx={{ width: 40, height: 40, ...INVERT_SX }}>CA</Avatar>
            <Avatar sx={{ width: 40, height: 40, ...ACCENT_SX }}>CA</Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }}>CA</Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40, ...INVERT_SX }}>CA</Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40, ...ACCENT_SX }}>CA</Avatar>
          </Stack>

          {/* Colors × Variants — Icon */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
            <Avatar sx={{ width: 40, height: 40 }}><PersonIcon /></Avatar>
            <Avatar sx={{ width: 40, height: 40, ...INVERT_SX }}><PersonIcon /></Avatar>
            <Avatar sx={{ width: 40, height: 40, ...ACCENT_SX }}><PersonIcon /></Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }}><StorefrontIcon /></Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40, ...INVERT_SX }}><StorefrontIcon /></Avatar>
            <Avatar variant="rounded" sx={{ width: 40, height: 40, ...ACCENT_SX }}><StorefrontIcon /></Avatar>
          </Stack>

          {/* Image content */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
            <Avatar sx={{ width: 40, height: 40 }} src="https://i.pravatar.cc/40?u=a" alt="User A" />
            <Avatar sx={{ width: 40, height: 40 }} src="https://i.pravatar.cc/40?u=b" alt="User B" />
            <Avatar sx={{ width: 40, height: 40 }} src="https://i.pravatar.cc/40?u=c" alt="User C" />
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }} src="https://picsum.photos/seed/logo1/40" alt="Product" />
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }} src="https://picsum.photos/seed/logo2/40" alt="Product" />
          </Stack>

          {/* AvatarGroup */}
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '0.875rem' }, justifyContent: 'flex-end' }}>
            <Avatar src="https://i.pravatar.cc/40?u=a" alt="A" />
            <Avatar src="https://i.pravatar.cc/40?u=b" alt="B" />
            <Avatar src="https://i.pravatar.cc/40?u=c" alt="C" />
            <Avatar>DE</Avatar>
            <Avatar>FG</Avatar>
          </AvatarGroup>
        </Stack>
      </Section>

      <Section title="Badge" id="display-badge">
        <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap" useFlexGap>
          <Badge badgeContent={4} color="primary"><MailIcon /></Badge>
          <Badge badgeContent={100} max={99} color="error"><MailIcon /></Badge>
          <Badge color="warning" variant="dot"><MailIcon /></Badge>
          <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar>U</Avatar>
          </Badge>
          <Badge color="success" overlap="circular" variant="dot">
            <Avatar>U</Avatar>
          </Badge>
        </Stack>
      </Section>

      <Section title="Tooltip" id="display-tooltip">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Tooltip title="Top tooltip"><Chip label="hover top" /></Tooltip>
          <Tooltip title="Right tooltip" placement="right"><Chip label="right" /></Tooltip>
          <Tooltip title="Bottom tooltip" placement="bottom"><Chip label="bottom" /></Tooltip>
          <Tooltip title="With arrow" arrow><Chip label="arrow" /></Tooltip>
        </Stack>
      </Section>

      <Section title="Skeleton" id="display-skeleton">
        <Stack spacing={1} sx={{ maxWidth: 320 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" height={80} />
          <Skeleton variant="rounded" height={80} />
        </Stack>
      </Section>

      <Section title="List" id="display-list">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          <Box sx={{ width: 280, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <List dense>
              <ListItem><ListItemIcon><InboxIcon /></ListItemIcon><ListItemText primary="Inbox" /></ListItem>
              <ListItem><ListItemIcon><MailIcon /></ListItemIcon><ListItemText primary="Sent" secondary="Updated 2h ago" /></ListItem>
              <ListItem><ListItemIcon><StarIcon /></ListItemIcon><ListItemText primary="Starred" /></ListItem>
            </List>
          </Box>
          <Box sx={{ width: 280, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <List>
              <ListItemButton>
                <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar>
                <ListItemText primary="Alice" secondary="Hey there!" />
              </ListItemButton>
              <ListItemButton selected>
                <ListItemAvatar><Avatar>B</Avatar></ListItemAvatar>
                <ListItemText primary="Bob" secondary="Selected" />
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar><Avatar>C</Avatar></ListItemAvatar>
                <ListItemText primary="Carol" secondary="See you soon" />
              </ListItemButton>
            </List>
          </Box>
        </Stack>
      </Section>
    </Stack>
  );
}
