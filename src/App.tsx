/**
 * Main application component
 */
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Wizard from './components/wizard/Wizard';
import { store } from './store';
import { useLocalStorageSave } from './hooks/useLocalStorageSave';

// Create React Query client
const queryClient = new QueryClient();

/**
 * Inner App component that can use hooks
 */
function AppContent() {
  // Initialize local storage save
  useLocalStorageSave();
  
  return (
    <MainLayout>
      <Wizard />
      <Toaster position="top-right" />
    </MainLayout>
  );
}

/**
 * Root application component
 * Sets up providers and renders the main application
 */
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;