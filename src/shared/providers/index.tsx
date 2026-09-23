import type { ReactNode } from 'react';

import ReduxProvider from './providers/redux-provider';
import ReactQueryProvider from './providers/react-query-provider';

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}

export default Providers;
