import { useColorScheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Switches between light and dark color schemes by toggling MUI's CSS-var
// selector. No re-render of the React tree — just an attribute swap on <html>.
export default function ThemeToggle({ size = 'small' }) {
  const { mode, setMode } = useColorScheme();

  // `mode` is undefined on first render before hydration completes — render
  // a neutral icon so the button still appears, but defer the actual toggle
  // until we know the current mode.
  if (!mode) {
    return (
      <IconButton size={size} color="inherit" aria-label="toggle color scheme" disabled>
        <LightModeIcon />
      </IconButton>
    );
  }

  const isDark = mode === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        size={size}
        color="inherit"
        onClick={() => setMode(next)}
        aria-label={`switch to ${next} mode`}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
