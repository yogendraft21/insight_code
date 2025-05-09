import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;