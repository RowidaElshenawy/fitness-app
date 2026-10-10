import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

type ReduxProviderProps = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
