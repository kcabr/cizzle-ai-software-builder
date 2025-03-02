/**
 * Main layout component for the application
 */
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout component with theme support
 * Provides Material-UI theme and basic page structure
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  // Create a theme that respects system preferences for dark mode
  const theme = useMemo(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#f50057',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
            fullWidth: true,
          },
        },
        MuiButton: {
          defaultProps: {
            variant: 'contained',
          },
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="main" sx={{ minHeight: '100vh' }}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MainLayout;