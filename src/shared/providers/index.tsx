import ReduxProvider from './providers/redux-provider';
import ReactQueryProvider from './providers/react-query-provider';
import type { ReactNode } from 'react';
import { Toaster } from '../components/ui/sonner';

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </ReduxProvider>
  );
}

export default Providers;
