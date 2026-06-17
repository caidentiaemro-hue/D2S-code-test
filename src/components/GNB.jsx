import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import IconBtn from './IconBtn';
import TextInput from './TextInput';
import Avatar from './Avatar';
import Badge from './Badge';
import { Tabs, Tab } from './Tabs';
import { scale } from '../theme/tokens.spacing.js';
import { ramp, weights } from '../theme/tokens.typography.js';

const DEFAULT_TABS = [
  'Supplier Management',
  'Procurement',
  'Sourcing',
  'Contract',
  'Onboarding Evaluation',
  'Performance Evaluation',
  'Product Cost Management',
];

export default function GNB({
  tabs = DEFAULT_TABS,
  activeTab = 1,
  cartCount = 5,
  hasNotifications = true,
}) {
  const [tab, setTab] = useState(activeTab);

  return (
    <Box
      sx={(theme) => ({
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.vars.palette.divider}`,
        width: '100%',
      })}
    >
      {/* Top row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 3, pt: 1 }}>
        {/* Hamburger + logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
          <IconBtn size="medium" aria-label="open navigation">
            <MenuIcon />
          </IconBtn>
          <Typography
            noWrap
            sx={{
              fontSize: ramp.body.medium.fontSize,
              fontWeight: weights.bold,
              letterSpacing: '-0.01em',
              color: 'text.primary',
            }}
          >
            SAMSUNG SDS{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Caidentia</Box>
          </Typography>
        </Box>

        {/* Search */}
        <TextInput
          placeholder="Search"
          size="small"
          endAdornment={<SearchIcon sx={{ fontSize: scale.lg, color: 'text.disabled' }} />}
          sx={{ width: 280, flexShrink: 0 }}
        />

        {/* Right utilities */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <Button
            variant="text"
            size="small"
            startIcon={<AccessTimeIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              color: 'text.secondary',
              fontWeight: weights.semibold,
              fontSize: ramp.body.small.fontSize,
              textTransform: 'none',
              px: 1,
              height: scale.xl,
              minWidth: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Eastern Time (USA)
          </Button>

          <Badge dot={hasNotifications} color="default">
            <IconBtn size="medium" aria-label="notifications">
              <NotificationsNoneIcon />
            </IconBtn>
          </Badge>

          <Badge badgeContent={cartCount} color="error">
            <IconBtn size="medium" aria-label="cart">
              <ShoppingCartOutlinedIcon />
            </IconBtn>
          </Badge>

          <Avatar size="medium">
            <PersonOutlinedIcon />
          </Avatar>
        </Box>
      </Box>

      {/* Bottom row — nav tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 3 }}>
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}
