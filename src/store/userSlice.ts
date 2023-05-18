import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUserState } from '../types/TUserState';
import { mainApi } from '../utils/MainApi';

const initialState: TUserState = {
  isLogged: false,
  name: '',
  email: ''
};

const getUser = createAsyncThunk(
  'user/getUser',
  async (jwt: string, {rejectWithValue}) => {
    try {
      const response = await mainApi.getUser(jwt);
      return response;
    } catch(err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({ 
  name: 'user', 
  initialState, 
  reducers: {
    logOut(state) {
      localStorage.removeItem('movies-jwt');
      state.isLogged = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, actions) => {
      state.email = actions.payload.email;
      state.name = actions.payload.name;
      state.isLogged = true;
    })
  }
});

const userReducer = userSlice.reducer;
const {logOut} = userSlice.actions;

export { userReducer, getUser, logOut };
