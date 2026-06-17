import { Box, Stack, Typography, Divider } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

const RICH_ITEMS = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'components', label: 'components', children: [
        { id: 'btn', label: 'Button.jsx' },
        { id: 'icn', label: 'IconBtn.jsx' },
      ] },
      { id: 'pages', label: 'pages', children: [
        { id: 'home', label: 'Home.jsx' },
      ] },
      { id: 'theme', label: 'theme', children: [
        { id: 'thm', label: 'theme.js' },
      ] },
    ],
  },
  { id: 'public', label: 'public' },
  { id: 'pkg', label: 'package.json' },
];

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function TreeViewShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>TreeView (MUI X)</Typography>
        <Typography variant="body2" color="text.secondary">
          SimpleTreeView (manual children) and RichTreeView (data-driven).
        </Typography>
      </Box>

      <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
        <Section title="SimpleTreeView">
          <Box sx={{ width: 280, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <SimpleTreeView defaultExpandedItems={['src']}>
              <TreeItem itemId="src" label="src">
                <TreeItem itemId="components" label="components">
                  <TreeItem itemId="btn" label="Button.jsx" />
                  <TreeItem itemId="icn" label="IconBtn.jsx" />
                </TreeItem>
                <TreeItem itemId="theme" label="theme">
                  <TreeItem itemId="thm" label="theme.js" />
                </TreeItem>
              </TreeItem>
              <TreeItem itemId="public" label="public" />
              <TreeItem itemId="pkg" label="package.json" />
            </SimpleTreeView>
          </Box>
        </Section>

        <Section title="RichTreeView">
          <Box sx={{ width: 280, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <RichTreeView items={RICH_ITEMS} defaultExpandedItems={['src', 'components']} />
          </Box>
        </Section>
      </Stack>
    </Stack>
  );
}
