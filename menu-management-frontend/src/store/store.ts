import { configureStore } from '@reduxjs/toolkit';
import { menuApi } from './menuApi';

export const store = configureStore({
  reducer: {
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 