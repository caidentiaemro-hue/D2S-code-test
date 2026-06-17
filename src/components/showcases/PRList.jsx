import { useState } from 'react';
import {
  Box, Stack, Typography, Button, IconButton, Checkbox, Link,
  Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GNB from '../GNB';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import InlineBadge from '../InlineBadge';
import IconBtn from '../IconBtn';
import { scale } from '../../theme/tokens.spacing.js';
import { radii } from '../../theme/tokens.radii.js';
import { ramp, weights } from '../../theme/tokens.typography.js';

// ─── Sample data ──────────────────────────────────────────────────────────────

const STATUS_STYLE = {
  Draft:        { color: 'grey',    label: 'Draft' },
  Pending:      { color: 'warning', label: 'Pending' },
  'In Progress':{ color: 'primary', label: 'In Progress' },
  Approved:     { color: 'success', label: 'Approved' },
};

const SAMPLE = [
  { status: 'Draft' },
  { status: 'Pending' },
  { status: 'Pending' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'In Progress' },
  { status: 'Approved' },
  { status: 'Approved' },
  { status: 'Approved' },
  { status: 'Approved' },
  { status: 'Approved' },
  { status: 'Approved' },
  { status: 'Approved' },
].map((r, i) => ({
  id: i,
  ...r,
  title: 'Anti-Rust Paper Rolls',
  prNo: 'PR20250909',
  type: 'Items',
  org: 'Company ABC/Purchasing',
  requestDate: '12/31/2025',
  creator: 'Harry Potter',
  currency: 'USD',
  amount: '1,200.00',
  lineItems: 5,
  rejected: 0,
}));

const STATUS_COUNTS = { Pending: 2, 'In Progress': 8, Approved: 22 };

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3 }}>
      <Box sx={{ minWidth: 0 }}>
        {/* Breadcrumbs */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            fontSize: ramp.body.small.fontSize,
            mb: 0.5,
          }}
        >
          <Link href="#" underline="hover" color="inherit">Home</Link>
          <ChevronRightIcon sx={{ fontSize: 14 }} />
          <Link href="#" underline="hover" color="inherit">Procure to Pay</Link>
        </Box>
        {/* Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h3" sx={{ lineHeight: 1.2 }}>Purchase Requisitions</Typography>
          <IconBtn size="small" aria-label="bookmark">
            <StarBorderIcon />
          </IconBtn>
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ flexShrink: 0, borderRadius: `${radii.full}px`, px: 2 }}
      >
        Create New PR
      </Button>
    </Box>
  );
}

// ─── Filter Box (top filter row + search button) ──────────────────────────────

function FilterBox() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
    >
      <SelectInput
        label="Operation Org."
        size="small"
        defaultValue="all"
        options={[{ value: 'all', label: 'All' }]}
        sx={{ minWidth: 200, flex: 1 }}
      />
      <TextInput
        label="Request Date"
        size="small"
        defaultValue="09/20/2024 - 10/20/2025"
        endAdornment={<CalendarTodayOutlinedIcon sx={{ fontSize: scale.lg, color: 'text.tertiary' }} />}
        sx={{ minWidth: 240, flex: 1 }}
      />
      <SelectInput
        label="Purchase Type"
        size="small"
        defaultValue="all"
        options={[{ value: 'all', label: 'All' }]}
        sx={{ minWidth: 200, flex: 1 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<SearchIcon />}
          sx={{ borderRadius: `${radii.full}px`, px: 2 }}
        >
          Search
        </Button>
        <IconBtn size="medium" variant="outlined" aria-label="saved filters">
          <BookmarkBorderOutlinedIcon />
        </IconBtn>
        <IconBtn size="medium" variant="outlined" aria-label="settings">
          <SettingsOutlinedIcon />
        </IconBtn>
      </Box>
    </Box>
  );
}

// ─── Filter Bar (status pill filters) ─────────────────────────────────────────

function FilterBar({ active, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {Object.entries(STATUS_COUNTS).map(([status, count]) => {
        const isActive = active === status;
        return (
          <Box
            key={status}
            role="button"
            tabIndex={0}
            onClick={() => onChange(isActive ? null : status)}
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              height: scale['2xl'], // 32
              px: 1.5,
              borderRadius: `${radii.full}px`,
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: ramp.body.medium.fontSize,
              fontWeight: weights.medium,
              backgroundColor: isActive ? theme.vars.palette.fill.strong : theme.vars.palette.fill.muted,
              color: 'text.primary',
              transition: 'background-color 150ms',
              '&:hover': { backgroundColor: theme.vars.palette.fill.strong },
            })}
          >
            {status}
            <Box
              component="span"
              sx={{
                color: 'text.tertiary',
                fontWeight: weights.regular,
                fontSize: ramp.body.small.fontSize,
              }}
            >
              {count}
            </Box>
          </Box>
        );
      })}
      <IconBtn size="small" aria-label="reset filters">
        <RefreshIcon />
      </IconBtn>
    </Box>
  );
}

// ─── Action bar (above table) ─────────────────────────────────────────────────

function ActionBar({ total }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Total <Box component="span" sx={{ color: 'text.primary', fontWeight: weights.semibold }}>{total}</Box>
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconBtn size="small" aria-label="export">
          <FileDownloadOutlinedIcon />
        </IconBtn>
        <IconBtn size="small" aria-label="column settings">
          <SettingsOutlinedIcon />
        </IconBtn>
      </Box>
    </Box>
  );
}

// ─── Data Grid ────────────────────────────────────────────────────────────────

function DataGrid({ rows }) {
  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.vars.palette.divider}`,
        borderRadius: `${radii.md}px`,
        overflow: 'hidden',
      })}
    >
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow
              sx={(theme) => ({
                backgroundColor: theme.vars.palette.fill.subtle,
                '& .MuiTableCell-root': {
                  fontWeight: weights.semibold,
                  color: 'text.secondary',
                  fontSize: ramp.body.small.fontSize,
                  borderBottom: `1px solid ${theme.vars.palette.divider}`,
                },
              })}
            >
              <TableCell padding="checkbox">
                <Checkbox size="small" />
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>PR No.</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Operation Org.</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell>Line Items</TableCell>
              <TableCell align="right">Rejected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const style = STATUS_STYLE[row.status];
              return (
                <TableRow
                  key={row.id}
                  hover
                  sx={(theme) => ({
                    '& .MuiTableCell-root': {
                      fontSize: ramp.body.medium.fontSize,
                      color: 'text.primary',
                      borderBottom: `1px solid ${theme.vars.palette.divider}`,
                    },
                    '&:last-child .MuiTableCell-root': { borderBottom: 0 },
                  })}
                >
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>
                    <InlineBadge size="small" color={style.color}>{style.label}</InlineBadge>
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.prNo}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.org}</TableCell>
                  <TableCell>{row.requestDate}</TableCell>
                  <TableCell>{row.creator}</TableCell>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell>
                    <Link href="#" underline="hover" sx={{ color: 'primary.main', fontWeight: weights.medium }}>
                      {row.lineItems} items
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.rejected}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PRListShowcase() {
  const [tab, setTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState(null);

  const filtered = statusFilter ? SAMPLE.filter((r) => r.status === statusFilter) : SAMPLE;

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>PR List page</Typography>
        <Typography variant="body2" color="text.secondary">
          Purchase Requisitions list — full screen assembled from Caidentia components.
        </Typography>
      </Box>

      {/* Full-bleed page mockup */}
      <Box
        sx={(theme) => ({
          mx: { xs: -2, sm: -3 },
          border: `1px solid ${theme.vars.palette.divider}`,
          borderRadius: 0,
          overflow: 'hidden',
        })}
      >
        {/* GNB */}
        <GNB activeTab={1} />

        {/* Page body */}
        <Box
          sx={(theme) => ({
            bgcolor: theme.vars.palette.background.default,
            px: { xs: 2, sm: 4, lg: 6 },
            py: 3,
          })}
        >
          {/* Page header */}
          <PageHeader />

          {/* Tabs */}
          <Box sx={(theme) => ({
            mt: 3,
            borderBottom: `1px solid ${theme.vars.palette.divider}`,
          })}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Requisitions" />
              <Tab label="Line Items" />
            </Tabs>
          </Box>

          {/* Content card */}
          <Box
            sx={(theme) => ({
              mt: 2,
              bgcolor: theme.vars.palette.background.paper,
              border: `1px solid ${theme.vars.palette.divider}`,
              borderRadius: `${radii.lg}px`,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            })}
          >
            <FilterBox />
            <Box sx={(theme) => ({ borderTop: `1px solid ${theme.vars.palette.divider}` })} />
            <FilterBar active={statusFilter} onChange={setStatusFilter} />
            <ActionBar total={filtered.length} />
            <DataGrid rows={filtered} />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
