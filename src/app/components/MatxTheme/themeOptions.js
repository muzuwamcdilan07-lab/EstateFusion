import { red } from '@mui/material/colors';
import { components } from './components';

const themeOptions = {
  typography: {
    fontSize: 14,
    body1: { fontSize: '14px' },
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },

  status: { danger: red[500] },
  components: { ...components },

  // Provide a consistent aqua/blue/light background + dark (mostly-black) text baseline
  // across every existing theme option.
  palette: {
    primary: { main: '#1aa7d7' },
    secondary: { main: '#2f86ff' },
    background: {
      default: '#f7fbff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0b0b0f',
      secondary: '#1c1c24',
    },
  },
};


export default themeOptions;
