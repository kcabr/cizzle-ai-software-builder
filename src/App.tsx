/**
 * Main application component
 */
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import Wizard from './components/wizard/Wizard';
import { store } from './store';

// Create React Query client
const queryClient = new QueryClient();

/**
 * Root application component
 * Sets up providers and renders the main application
 */
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Wizard />
          <Toaster position="top-right" />
        </MainLayout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;