import type { ReactNode } from 'react';

import { Toaster } from '@/shared/components/ui/sonner';

import ReduxProvider from './providers/redux-provider';
import ReactQueryProvider from './providers/react-query-provider';

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
