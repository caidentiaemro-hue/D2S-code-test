import { useState } from 'react';
import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar, AppBar, Typography, Divider, Card, CardContent, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Buttons from '../components/showcases/Buttons';
import IconButtons from '../components/showcases/IconButtons';
import ButtonGroups from '../components/showcases/ButtonGroups';
import Fabs from '../components/showcases/Fabs';
import ToggleButtons from '../components/showcases/ToggleButtons';
import Badges from '../components/showcases/Badges';
import Checkboxes from '../components/showcases/Checkboxes';
import NumberInputs from '../components/showcases/NumberInputs';
import TypographyShowcase from '../components/showcases/Typography';
import Inputs from '../components/showcases/Inputs';
import Display from '../components/showcases/Display';
import Feedback from '../components/showcases/Feedback';
import Surfaces from '../components/showcases/Surfaces';
import Navigation from '../components/showcases/Navigation';
import Tables from '../components/showcases/Tables';
import DataGridShowcase from '../components/showcases/DataGrid';
import DatePickers from '../components/showcases/DatePickers';
import Charts from '../components/showcases/Charts';
import TreeViewShowcase from '../components/showcases/TreeView';
import Lab from '../components/showcases/Lab';
import Patterns from '../components/showcases/Patterns';
import PRList from '../components/showcases/PRList';
import ThemeToggle from '../components/ThemeToggle';

// Flat list drives page rendering — order matters
const SECTIONS = [
  { id: 'typography',    Component: TypographyShowcase },
  { id: 'buttons',       Component: Buttons },
  { id: 'icon-buttons',  Component: IconButtons },
  { id: 'button-groups', Component: ButtonGroups },
  { id: 'fabs',          Component: Fabs },
  { id: 'toggle-buttons',Component: ToggleButtons },
  { id: 'badges',        Component: Badges },
  { id: 'checkboxes',    Component: Checkboxes },
  { id: 'inputs',        Component: Inputs },
  { id: 'number-inputs', Component: NumberInputs },
  { id: 'display',       Component: Display },
  { id: 'feedback',      Component: Feedback },
  { id: 'surfaces',      Component: Surfaces },
  { id: 'navigation',    Component: Navigation },
  { id: 'tables',        Component: Tables },
  { id: 'datagrid',      Component: DataGridShowcase },
  { id: 'datepickers',   Component: DatePickers },
  { id: 'charts',        Component: Charts },
  { id: 'treeview',      Component: TreeViewShowcase },
  { id: 'lab',           Component: Lab },
  { id: 'patterns',      Component: Patterns },
  { id: 'pr-list',       Component: PRList },
];

// Grouped nav — each item.id is a DOM anchor (card-level or sub-section)
const NAV_GROUPS = [
  {
    label: 'Foundation',
    items: [
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    label: 'Buttons',
    items: [
      { id: 'buttons',        label: 'Button' },
      { id: 'icon-buttons',   label: 'Icon Button' },
      { id: 'button-groups',  label: 'Button Group' },
      { id: 'fabs',           label: 'FAB' },
      { id: 'toggle-buttons', label: 'Toggle Button' },
    ],
  },
  {
    label: 'Inputs',
    items: [
      { id: 'checkboxes',    label: 'Checkbox' },
      { id: 'inputs',        label: 'Text / Select' },
      { id: 'number-inputs', label: 'Number Input' },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { id: 'badges',            label: 'Badge' },
      { id: 'display-chip',      label: 'Chip' },
      { id: 'display-avatar',    label: 'Avatar' },
      { id: 'display-tooltip',   label: 'Tooltip' },
      { id: 'display-skeleton',  label: 'Skeleton' },
      { id: 'display-list',      label: 'List' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { id: 'feedback-alert',    label: 'Alert' },
      { id: 'feedback-progress', label: 'Progress' },
      { id: 'feedback-snackbar', label: 'Snackbar / Dialog' },
    ],
  },
  {
    label: 'Surfaces',
    items: [
      { id: 'surfaces-paper',     label: 'Paper' },
      { id: 'surfaces-card',      label: 'Card' },
      { id: 'surfaces-appbar',    label: 'App Bar' },
      { id: 'surfaces-accordion', label: 'Accordion' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { id: 'navigation-tabs',        label: 'Tabs' },
      { id: 'navigation-stepper',     label: 'Stepper' },
      { id: 'navigation-breadcrumbs', label: 'Breadcrumbs' },
      { id: 'navigation-pagination',  label: 'Pagination' },
      { id: 'navigation-menu',        label: 'Menu' },
      { id: 'navigation-link',        label: 'Link' },
      { id: 'navigation-bottomnav',   label: 'Bottom Nav' },
    ],
  },
  {
    label: 'MUI X',
    items: [
      { id: 'tables',      label: 'Table' },
      { id: 'datagrid',    label: 'DataGrid' },
      { id: 'datepickers', label: 'Date Pickers' },
      { id: 'charts',      label: 'Charts' },
      { id: 'treeview',    label: 'Tree View' },
    ],
  },
  {
    label: 'Experimental',
    items: [
      { id: 'lab', label: 'Lab' },
    ],
  },
  {
    label: 'Patterns',
    items: [
      { id: 'patterns', label: 'GNB' },
      { id: 'pr-list',  label: 'PR List page' },
    ],
  },
];

const DRAWER_WIDTH = 210;

function NavContent({ onNavigate }) {
  return (
    <>
      <Toolbar variant="dense" />
      <Divider />
      <List dense disablePadding sx={{ pb: 2 }}>
        {NAV_GROUPS.map((group) => (
          <Box key={group.label}>
            <Typography
              sx={{
                px: 2, pt: 1.5, pb: 0.25,
                display: 'block',
                fontSize: '0.625rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'text.disabled',
              }}
            >
              {group.label}
            </Typography>
            {group.items.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => onNavigate(item.id)}
                sx={{ py: 0.25, pl: 2.5, pr: 1 }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontSize: '0.8125rem' } } }}
                />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>
    </>
  );
}

export default function Home() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!isDesktop) setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: (t) => t.palette.custom?.containers?.tertiary ?? 'grey.100' }}>
      <AppBar position="fixed" color="primary" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1 }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>MUI Prototype — Component Library</Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Mobile: temporary overlay drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box', overflowX: 'hidden' },
        }}
      >
        <NavContent onNavigate={scrollTo} />
      </Drawer>

      {/* Desktop: permanent sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box', overflowX: 'hidden' },
        }}
      >
        <NavContent onNavigate={scrollTo} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3 },
          pt: { xs: 7, sm: 8 },
        }}
      >
        {SECTIONS.map(({ id, Component }) => (
          <Box key={id} id={id} sx={{ scrollMarginTop: 56, mb: { xs: 2, sm: 4 } }}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
                <Component />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
