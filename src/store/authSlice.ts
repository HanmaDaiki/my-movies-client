import { createSlice } from "@reduxjs/toolkit";
import { TAuthState } from "../types/TAuthState";

const initialState: TAuthState = {
  isLogged: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogged(state) {
      state.isLogged = !state.isLogged;
    }
  }
});

const authReducer = authSlice.reducer;
const { toggleLogged } = authSlice.actions;

export { authReducer, toggleLogged };