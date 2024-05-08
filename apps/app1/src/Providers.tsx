import { PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { rootReducer } from './state/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export const Providers = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);
