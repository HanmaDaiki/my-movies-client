import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { userReducer } from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;

export { store };