import { useState } from 'react';
import {
  Box, Stack, Typography, Divider, Button, Alert, AlertTitle,
  LinearProgress, CircularProgress, Snackbar, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Backdrop,
} from '@mui/material';

function Section({ title, id, children }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function FeedbackShowcase() {
  const [snack, setSnack] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Feedback</Typography>
        <Typography variant="body2" color="text.secondary">
          Alerts, progress, snackbar, dialog, backdrop.
        </Typography>
      </Box>

      <Section title="Alert" id="feedback-alert">
        <Stack spacing={1.5}>
          <Alert severity="success">Operation successful.</Alert>
          <Alert severity="info">Heads up — info message.</Alert>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Something might be off — review before continuing.
          </Alert>
          <Alert severity="error" variant="filled">Filled error alert</Alert>
          <Alert severity="success" variant="outlined">Outlined success alert</Alert>
          <Alert severity="info" onClose={() => {}}>Closable info alert</Alert>
        </Stack>
      </Section>

      <Section title="Progress — linear" id="feedback-progress">
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <LinearProgress />
          <LinearProgress variant="determinate" value={40} />
          <LinearProgress variant="buffer" value={40} valueBuffer={60} />
          <LinearProgress color="secondary" />
        </Stack>
      </Section>

      <Section title="Progress — circular">
        <Stack direction="row" spacing={3} alignItems="center">
          <CircularProgress />
          <CircularProgress variant="determinate" value={66} />
          <CircularProgress color="secondary" size={24} />
          <CircularProgress size={64} thickness={2} />
        </Stack>
      </Section>

      <Section title="Snackbar / Dialog / Backdrop" id="feedback-snackbar">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="outlined" onClick={() => setSnack(true)}>Open snackbar</Button>
          <Button variant="outlined" onClick={() => setDialog(true)}>Open dialog</Button>
          <Button variant="outlined" onClick={() => setBackdrop(true)}>Show backdrop</Button>
        </Stack>
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={() => setSnack(false)}
          message="This is a snackbar"
        />
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to do this? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog(false)} variant="text">Cancel</Button>
            <Button onClick={() => setDialog(false)} variant="contained">Confirm</Button>
          </DialogActions>
        </Dialog>
        <Backdrop open={backdrop} onClick={() => setBackdrop(false)} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Section>
    </Stack>
  );
}
