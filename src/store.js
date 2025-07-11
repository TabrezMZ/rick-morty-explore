import { configureStore } from '@reduxjs/toolkit';
import { characterApi } from './features/characters/characterApi';
import globalReducer from './features/global/globalSlice';

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});
