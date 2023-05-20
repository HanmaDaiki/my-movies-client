import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TMoviesState } from '../types/TMoviesState';
import { TMovie } from '../types/TMovie';
import { mainApi } from '../utils/MainApi';

const initialState: TMoviesState = {
  moviesArray: [],
  savedMoviesArray: [],
};

const postSavedMovies = createAsyncThunk(
  'movies/postSavedMovies',
  async (data: { movie: TMovie; jwt: string }, { rejectWithValue }) => {
    try {
      const response = await mainApi.postSavedMovies(data.movie, data.jwt);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getSavedMovies = createAsyncThunk(
  'movies/getSavedMovies',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await mainApi.getSavedMovies(data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const deleteSavedMovie = createAsyncThunk(
  'movies/deleteSavedMovie',
  async (data: { id: number; jwt: string }, { rejectWithValue }) => {
    try {
      const response = await mainApi.deleteSavedMovie(data.id, data.jwt);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, actions) {
      state.moviesArray = actions.payload;
    },
    addSavedMovie(state, actions) {
      state.savedMoviesArray = [...state.savedMoviesArray, actions.payload];
    },
    removeSavedMovie(state, actions) {      
      state.savedMoviesArray = [
        ...state.savedMoviesArray.filter(
          (savedMovie) => savedMovie.id !== actions.payload
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSavedMovies.fulfilled, (state, actions) => {
      state.savedMoviesArray = actions.payload;
      localStorage.setItem('movies-saved', JSON.stringify(actions.payload));
    });
  },
});

const moviesReducer = moviesSlice.reducer;
const { setMovies, addSavedMovie, removeSavedMovie } = moviesSlice.actions;

export {
  moviesReducer,
  setMovies,
  postSavedMovies,
  getSavedMovies,
  addSavedMovie,
  deleteSavedMovie,
  removeSavedMovie
};
