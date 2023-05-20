import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { userReducer } from './userSlice';
import { moviesReducer } from './moviesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    movies: moviesReducer
  }
});

export type AppDispatch = typeof store.dispatch;

export { store };