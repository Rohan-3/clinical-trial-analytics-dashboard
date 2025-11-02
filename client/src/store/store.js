import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './analyticsSlice';
import officialsReducer from './officialsSlice';

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
    officials: officialsReducer,
  },
});
