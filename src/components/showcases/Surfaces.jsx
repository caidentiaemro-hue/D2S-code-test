import {
  Box, Stack, Typography, Divider, Paper, Card, CardContent, CardHeader, CardActions,
  Button, Avatar, AppBar, Toolbar, IconButton,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Section({ title, id, children }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function SurfacesShowcase() {
  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Surfaces</Typography>
        <Typography variant="body2" color="text.secondary">
          Paper, Card, AppBar, Accordion.
        </Typography>
      </Box>

      <Section title="Paper — elevation" id="surfaces-paper">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {[0, 1, 2, 4, 8, 16, 24].map((e) => (
            <Paper key={e} elevation={e} sx={{ p: 2, width: 96, textAlign: 'center' }}>
              elev {e}
            </Paper>
          ))}
        </Stack>
      </Section>

      <Section title="Card" id="surfaces-card">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Card sx={{ width: 280 }}>
            <CardHeader
              avatar={<Avatar>E</Avatar>}
              action={<IconButton size="small"><MoreVertIcon /></IconButton>}
              title="Card title"
              subheader="Subtitle"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Cards group related content. Use them sparingly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Action</Button>
              <Button size="small">Action 2</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ width: 280, p: 2 }}>
            <Typography variant="h5">Outlined</Typography>
            <Typography variant="body2" color="text.secondary">
              No elevation, just a border.
            </Typography>
          </Card>
        </Stack>
      </Section>

      <Section title="AppBar" id="surfaces-appbar">
        <Stack spacing={2}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton edge="start" color="inherit"><MenuIcon /></IconButton>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>Primary AppBar</Typography>
              <Button color="inherit">Action</Button>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Toolbar variant="dense">
              <Typography variant="h5" sx={{ flexGrow: 1 }}>Dense, default color</Typography>
              <IconButton size="small"><MoreVertIcon /></IconButton>
            </Toolbar>
          </AppBar>
        </Stack>
      </Section>

      <Section title="Accordion" id="surfaces-accordion">
        <Box sx={{ maxWidth: 560 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Section 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Expandable section content.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Section 2 (default expanded)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Disabled</Typography>
            </AccordionSummary>
          </Accordion>
        </Box>
      </Section>
    </Stack>
  );
}
