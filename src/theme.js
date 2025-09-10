import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#10847E' },
    secondary: { main: '#FFB703' },
    success: { main: '#2BB673' },
    background: { default: '#F6FFF9', paper: '#FFFFFF' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h3: { fontWeight: 800, letterSpacing: -0.5 },
    h4: { fontWeight: 700 },
    subtitle1: { color: '#4A5568' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, textTransform: 'none' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(16,132,126,0.08)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'saturate(180%) blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#0F172A'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: { root: { minHeight: 64 } }
    },
    MuiPaper: {
      defaultProps: { elevation: 0 }
    },
    MuiTextField: {
      styleOverrides: { root: { backgroundColor: '#FFFFFF' } }
    }
  },
})

export default theme


