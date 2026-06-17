import { useState } from 'react';
import {
  Box, Stack, Typography, Divider,
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function ToggleButtonsShowcase() {
  const [standalone, setStandalone] = useState(false);
  const [groupSmall, setGroupSmall] = useState('label1');
  const [groupMed, setGroupMed] = useState('label1');
  const [groupLarge, setGroupLarge] = useState('label1');
  const [formats, setFormats] = useState(() => ['bold']);
  const [view, setView] = useState('list');

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Toggle Buttons</Typography>
        <Typography variant="body2" color="text.secondary">
          Standalone toggles and segmented control groups.
        </Typography>
      </Box>

      <Section title="Standalone — sizes">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
          <ToggleButton size="small" value="s" selected={standalone} onChange={() => setStandalone((v) => !v)}>
            <FavoriteBorderIcon /> Label
          </ToggleButton>
          <ToggleButton size="medium" value="m">
            <FavoriteBorderIcon /> Label
          </ToggleButton>
          <ToggleButton size="large" value="l">
            <FavoriteBorderIcon /> Label
          </ToggleButton>
        </Stack>
      </Section>

      <Section title="Standalone — states">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
          <ToggleButton value="default">
            <FavoriteBorderIcon /> Default
          </ToggleButton>
          <ToggleButton value="selected" selected>
            <FavoriteBorderIcon /> Selected
          </ToggleButton>
          <ToggleButton value="disabled" disabled>
            <FavoriteBorderIcon /> Disabled
          </ToggleButton>
          <ToggleButton value="dis-sel" selected disabled>
            <FavoriteBorderIcon /> Disabled selected
          </ToggleButton>
        </Stack>
      </Section>

      <Section title="Toggle Button Group — sizes">
        <Stack spacing={2}>
          {[
            { label: 'Small', size: 'small', value: groupSmall, set: setGroupSmall },
            { label: 'Medium', size: 'medium', value: groupMed, set: setGroupMed },
            { label: 'Large', size: 'large', value: groupLarge, set: setGroupLarge },
          ].map(({ label, size, value, set }) => (
            <Stack key={size} direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" sx={{ width: 52, color: 'text.disabled' }}>{label}</Typography>
              <ToggleButtonGroup
                size={size}
                value={value}
                exclusive
                onChange={(_, v) => { if (v !== null) set(v); }}
              >
                <ToggleButton value="label1">Label</ToggleButton>
                <ToggleButton value="label2">Label</ToggleButton>
                <ToggleButton value="label3">Label</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Toggle Button Group — multi-select">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap alignItems="center">
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
              Text formatting (multi)
            </Typography>
            <ToggleButtonGroup
              value={formats}
              onChange={(_, v) => setFormats(v)}
            >
              <ToggleButton value="bold"><FormatBoldIcon /></ToggleButton>
              <ToggleButton value="italic"><FormatItalicIcon /></ToggleButton>
              <ToggleButton value="underlined"><FormatUnderlinedIcon /></ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
              View (exclusive)
            </Typography>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, v) => { if (v !== null) setView(v); }}
            >
              <ToggleButton value="list"><ViewListIcon /></ToggleButton>
              <ToggleButton value="module"><ViewModuleIcon /></ToggleButton>
              <ToggleButton value="quilt"><ViewQuiltIcon /></ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
      </Section>

      <Section title="Toggle Button Group — icon + label">
        <ToggleButtonGroup
          value={groupMed}
          exclusive
          onChange={(_, v) => { if (v !== null) setGroupMed(v); }}
        >
          <ToggleButton value="label1"><FavoriteBorderIcon /> Label</ToggleButton>
          <ToggleButton value="label2"><FavoriteBorderIcon /> Label</ToggleButton>
          <ToggleButton value="label3"><FavoriteBorderIcon /> Label</ToggleButton>
        </ToggleButtonGroup>
      </Section>
    </Stack>
  );
}
