import { useState } from 'react';
import {
  Box, Stack, Typography, Divider, Tabs, Tab,
  Stepper, Step, StepLabel, Breadcrumbs, Link, Pagination,
  Menu, MenuItem, Button, BottomNavigation, BottomNavigationAction, Paper,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Section({ title, id, children }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

const STEPS = ['Sign up', 'Verify email', 'Add details', 'Finish'];

export default function NavigationShowcase() {
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);
  const [bnav, setBnav] = useState(0);
  const [anchor, setAnchor] = useState(null);

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Navigation</Typography>
        <Typography variant="body2" color="text.secondary">
          Tabs, Stepper, Breadcrumbs, Pagination, Menu, Link, BottomNavigation.
        </Typography>
      </Box>

      <Section title="Tabs" id="navigation-tabs">
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Overview" />
              <Tab label="Activity" />
              <Tab label="Settings" />
              <Tab label="Disabled" disabled />
            </Tabs>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab2} onChange={(_, v) => setTab2(v)} variant="fullWidth" textColor="secondary" indicatorColor="secondary">
              <Tab label="One" />
              <Tab label="Two" />
              <Tab label="Three" />
            </Tabs>
          </Box>
        </Stack>
      </Section>

      <Section title="Stepper" id="navigation-stepper">
        <Stack spacing={2}>
          <Stepper activeStep={1}>
            {STEPS.map((s) => (
              <Step key={s}><StepLabel>{s}</StepLabel></Step>
            ))}
          </Stepper>
          <Stepper activeStep={2} alternativeLabel>
            {STEPS.map((s) => (
              <Step key={s}><StepLabel>{s}</StepLabel></Step>
            ))}
          </Stepper>
        </Stack>
      </Section>

      <Section title="Breadcrumbs" id="navigation-breadcrumbs">
        <Stack spacing={1}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="#">Home</Link>
            <Link underline="hover" color="inherit" href="#">Projects</Link>
            <Typography color="text.primary">Current</Typography>
          </Breadcrumbs>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="#">Root</Link>
            <Link underline="hover" color="inherit" href="#">Subdir</Link>
            <Typography color="text.primary">File.txt</Typography>
          </Breadcrumbs>
        </Stack>
      </Section>

      <Section title="Pagination" id="navigation-pagination">
        <Stack spacing={1.5}>
          <Pagination count={10} />
          <Pagination count={10} color="primary" />
          <Pagination count={10} variant="outlined" shape="rounded" />
          <Pagination count={10} size="small" />
        </Stack>
      </Section>

      <Section title="Menu" id="navigation-menu">
        <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>Open menu</Button>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem onClick={() => setAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>My account</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchor(null)}>Logout</MenuItem>
        </Menu>
      </Section>

      <Section title="Link" id="navigation-link">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Link href="#">Default link</Link>
          <Link href="#" underline="none">No underline</Link>
          <Link href="#" underline="always">Always underline</Link>
          <Link href="#" color="secondary">Secondary</Link>
          <Link href="#" color="error">Error</Link>
        </Stack>
      </Section>

      <Section title="BottomNavigation" id="navigation-bottomnav">
        <Paper elevation={3} sx={{ maxWidth: 480 }}>
          <BottomNavigation value={bnav} onChange={(_, v) => setBnav(v)} showLabels>
            <BottomNavigationAction label="Recent" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Paper>
      </Section>
    </Stack>
  );
}
