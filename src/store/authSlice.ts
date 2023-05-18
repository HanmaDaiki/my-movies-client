import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mainApi } from "../utils/MainApi";

const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: {name: string, email: string, password: string}, {rejectWithValue}) =>{
    try {
      const response = await mainApi.signUp(data.name, data.email, data.password);
      return response;
    } catch(err) {
      return rejectWithValue(err); 
    }
  }
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: {email: string, password: string}, {rejectWithValue}) =>{
    try {
      const response = await mainApi.signIn(data.email, data.password);
      return response.token;
    } catch(err) {
      return rejectWithValue(err); 
    }
  }
);

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, actions) =>  {
      localStorage.setItem('movies-jwt', actions.payload);
    });
  }
});

const authReducer = authSlice.reducer;

export { authReducer, signIn, signUp };