import { useState } from 'react';
import {
  Box, Stack, Typography, Divider,
  TextField, MenuItem, InputAdornment,
  Checkbox, FormControlLabel, FormGroup,
  Radio, RadioGroup, FormControl, FormLabel,
  Switch, Slider, Rating, Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'];

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  );
}

export default function InputsShowcase() {
  const [select, setSelect] = useState('apple');
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('a');
  const [sw, setSw] = useState(true);
  const [slider, setSlider] = useState(30);
  const [rating, setRating] = useState(3);

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>Inputs</Typography>
        <Typography variant="body2" color="text.secondary">
          Form controls across variants, sizes, and states.
        </Typography>
      </Box>

      <Section title="TextInput — sizes">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextInput label="Small" size="small" placeholder="Placeholder" sx={{ width: 220 }} />
          <TextInput label="Medium" size="medium" placeholder="Placeholder" sx={{ width: 220 }} />
          <TextInput label="Large" size="large" placeholder="Placeholder" sx={{ width: 220 }} />
        </Stack>
      </Section>

      <Section title="TextInput — states">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextInput label="Default" placeholder="Placeholder" sx={{ width: 220 }} />
          <TextInput label="Filled" defaultValue="Some value" sx={{ width: 220 }} />
          <TextInput label="With helper" helperText="Helper text below" sx={{ width: 220 }} />
          <TextInput label="Required" required placeholder="Required field" sx={{ width: 220 }} />
          <TextInput label="Error" error helperText="Something's not right" defaultValue="Bad" sx={{ width: 220 }} />
          <TextInput label="Disabled" disabled defaultValue="Off limits" sx={{ width: 220 }} />
        </Stack>
      </Section>

      <Section title="TextInput — adornments & multiline">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextInput
            label="Search"
            placeholder="Search…"
            startAdornment={<SearchIcon fontSize="small" />}
            sx={{ width: 280 }}
          />
          <TextInput
            label="Amount"
            placeholder="0.00"
            startAdornment="$"
            endAdornment="USD"
            sx={{ width: 220 }}
          />
          <TextInput
            label="Description"
            multiline
            minRows={3}
            placeholder="Tell us more…"
            helperText="Markdown supported"
            sx={{ width: 320 }}
          />
        </Stack>
      </Section>


      <Section title="SelectInput — sizes">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <SelectInput
            label="Small"
            size="small"
            placeholder="Choose…"
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Medium"
            size="medium"
            placeholder="Choose…"
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
            ]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Large"
            size="large"
            placeholder="Choose…"
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
            ]}
            sx={{ width: 220 }}
          />
        </Stack>
      </Section>

      <Section title="SelectInput — states">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <SelectInput
            label="With value"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
            ]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Helper text"
            placeholder="Pick one"
            helperText="Helper text goes here"
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Required"
            required
            placeholder="Required"
            options={[
              { value: 'a', label: 'Option A' },
            ]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Error"
            error
            helperText="Please choose a valid option"
            defaultValue="apple"
            options={[{ value: 'apple', label: 'Apple' }]}
            sx={{ width: 220 }}
          />
          <SelectInput
            label="Disabled"
            disabled
            defaultValue="apple"
            options={[{ value: 'apple', label: 'Apple' }]}
            sx={{ width: 220 }}
          />
        </Stack>
      </Section>

      <Section title="SelectInput — adornments, icons, multi">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <SelectInput
            label="With leading icon"
            placeholder="Pick a language"
            startAdornment={<LanguageIcon fontSize="small" />}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
            ]}
            sx={{ width: 240 }}
          />
          <SelectInput
            label="Options with icons"
            placeholder="Pick a favorite"
            options={[
              { value: 'a', label: 'Alpha', icon: <StarIcon /> },
              { value: 'b', label: 'Beta', icon: <StarIcon /> },
              { value: 'c', label: 'Gamma', icon: <StarIcon /> },
            ]}
            sx={{ width: 240 }}
          />
          <SelectInput
            label="Multi-select"
            multiple
            defaultValue={['apple', 'banana']}
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            sx={{ width: 240 }}
          />
        </Stack>
      </Section>

      <Section title="Autocomplete">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Autocomplete
            options={FRUITS}
            sx={{ width: 240 }}
            renderInput={(p) => <TextField {...p} label="Pick a fruit" />}
          />
          <Autocomplete
            multiple
            options={FRUITS}
            defaultValue={[FRUITS[0]]}
            sx={{ width: 320 }}
            renderInput={(p) => <TextField {...p} label="Multiple" />}
          />
        </Stack>
      </Section>

      <Section title="Checkbox">
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Checked" />
          <FormControlLabel control={<Checkbox />} label="Unchecked" />
          <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
          <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Secondary" />
          <FormControlLabel control={<Checkbox disabled defaultChecked />} label="Disabled" />
        </FormGroup>
      </Section>

      <Section title="Radio">
        <FormControl>
          <FormLabel>Choose one</FormLabel>
          <RadioGroup row value={radio} onChange={(e) => setRadio(e.target.value)}>
            <FormControlLabel value="a" control={<Radio />} label="Option A" />
            <FormControlLabel value="b" control={<Radio />} label="Option B" />
            <FormControlLabel value="c" control={<Radio color="secondary" />} label="Option C" />
            <FormControlLabel value="d" control={<Radio disabled />} label="Disabled" />
          </RadioGroup>
        </FormControl>
      </Section>

      <Section title="Switch">
        <Stack spacing={2}>
          {['secondary', 'primary'].map((color) => (
            <Box key={color}>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize', display: 'block', mb: 0.5 }}>
                {color}
              </Typography>
              <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
                {['small', 'medium', 'large'].map((size) => (
                  <Stack key={size} direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ width: 50, color: 'text.disabled' }}>{size}</Typography>
                    <Switch size={size} color={color} />
                    <Switch size={size} color={color} defaultChecked />
                    <Switch size={size} color={color} disabled />
                    <Switch size={size} color={color} disabled defaultChecked />
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
          <FormControlLabel control={<Switch checked={sw} onChange={(e) => setSw(e.target.checked)} />} label="Controlled with label" />
        </Stack>
      </Section>

      <Section title="Slider">
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <Slider value={slider} onChange={(_, v) => setSlider(v)} aria-label="value" />
          <Slider defaultValue={[20, 60]} valueLabelDisplay="auto" />
          <Slider defaultValue={50} marks step={10} min={0} max={100} />
          <Slider defaultValue={40} disabled />
        </Stack>
      </Section>

      <Section title="Rating">
        <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
          <Rating value={rating} onChange={(_, v) => setRating(v)} />
          <Rating defaultValue={2.5} precision={0.5} />
          <Rating defaultValue={4} readOnly />
          <Rating defaultValue={3} disabled />
          <Rating defaultValue={3} size="small" />
          <Rating defaultValue={3} size="large" />
        </Stack>
      </Section>
    </Stack>
  );
}
