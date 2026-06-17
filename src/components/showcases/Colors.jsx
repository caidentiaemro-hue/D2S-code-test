import { Box, Stack, Typography, Divider, useTheme } from '@mui/material';

const SHADES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function isDarkShade(shade) {
  return shade >= 500;
}

function Swatch({ hex, shade }) {
  return (
    <Box
      sx={{
        bgcolor: hex,
        width: 56,
        height: 56,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isDarkShade(shade) ? '#fff' : 'text.primary',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 500, lineHeight: 1 }}>{shade}</Typography>
      <Typography sx={{ fontSize: 9, opacity: 0.8, mt: 0.25, fontFamily: 'monospace' }}>{hex.slice(1, 7)}</Typography>
    </Box>
  );
}

function Ramp({ name, ramp }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ width: 120, display: 'inline-block', color: 'text.secondary', textTransform: 'capitalize', mb: 0.5 }}>
        {name}
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
        {SHADES.map((s) => ramp[s] && <Swatch key={s} shade={s} hex={ramp[s]} />)}
      </Stack>
    </Box>
  );
}

function AlphaRamp({ name, ramp }) {
  const shades = Object.keys(ramp).map(Number).sort((a, b) => a - b);
  return (
    <Box>
      <Typography variant="caption" sx={{ width: 120, display: 'inline-block', color: 'text.secondary', textTransform: 'capitalize', mb: 0.5 }}>
        alpha · {name}
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
        {shades.map((s) => (
          <Box
            key={s}
            sx={{
              width: 56, height: 56, borderRadius: 1,
              border: '1px solid', borderColor: 'divider',
              backgroundColor: ramp[s],
              backgroundImage: 'linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)',
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0,0 6px,6px -6px,-6px 0px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: ramp[s], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: 10, fontWeight: 500, color: 'text.primary' }}>{s}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function ColorsShowcase() {
  const theme = useTheme();
  const palette = theme.palette.caidentia;
  const solid = Object.keys(palette).filter((k) => k !== 'alpha').sort();
  const alpha = palette.alpha ? Object.keys(palette.alpha).sort() : [];

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Caidentia Colors</Typography>
        <Typography variant="body2" color="text.secondary">
          Seed palette — {solid.length} solid families × 11 shades (25/50/100→900) plus {alpha.length} alpha overlays.
          Access via <code>theme.palette.caidentia.&lt;family&gt;.&lt;shade&gt;</code> or <code>sx=&#123;&#123; bgcolor: 'caidentia.gray.50' &#125;&#125;</code>.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1.5 }}>Solid</Typography>
        <Stack spacing={1.5}>
          {solid.map((name) => <Ramp key={name} name={name} ramp={palette[name]} />)}
        </Stack>
      </Box>

      {alpha.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 1.5 }}>Alpha</Typography>
          <Stack spacing={1.5}>
            {alpha.map((name) => <AlphaRamp key={name} name={name} ramp={palette.alpha[name]} />)}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
