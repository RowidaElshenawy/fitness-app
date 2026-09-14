import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

type ReduxProviderProps = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
