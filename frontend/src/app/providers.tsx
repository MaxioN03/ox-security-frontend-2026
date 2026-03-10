import { setupListeners } from '@reduxjs/toolkit/query';
import type { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store';

setupListeners(store.dispatch);

type AppProvidersProps = PropsWithChildren;

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="bottom-right" />
    </Provider>
  );
};
