import type { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { store } from './store';

setupListeners(store.dispatch);

type AppProvidersProps = PropsWithChildren;

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
