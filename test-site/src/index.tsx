import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#4DDD89',
    },
    secondary: {
      main: '#9AFFC4',
    },
    text: {
      primary: '#ffffff',
      secondary: '#868280'
    },
    background: {
      default: '#19191D',
    },
  },
  typography: {
    fontFamily: 'Bai Jamjuree, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#3d3e3e'
        }
      }
    },
    // Customize Textfield component
    MuiTextField: {
      defaultProps: {
        sx: {
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: 'var(--ifm-color-primary)'
          },
          "&:hover .MuiFormLabel-root": {
            color: "var(--ifm-color-primary)"
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--border-color)"
          }
        }
      },
    }
  }
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

