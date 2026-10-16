import ReduxProvider from './providers/redux-provider';
import ReactQueryProvider from './providers/react-query-provider';
import type { ReactNode } from 'react';
import { Toaster } from '../components/ui/sonner';
import ThemeProvider from './providers/theme-provider';

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default Providers;
