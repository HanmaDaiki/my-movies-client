import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';

import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { Preloader } from '../UI/Preloader/Preloader';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { TUserState } from '../../types/TUserState';
import { getUser } from '../../store/userSlice';
import { NotFound } from '../NotFound/NotFound';
import { Profile } from '../Profile/Profile';
import { moviesApi } from '../../utils/MoviesApi';
import { getSavedMovies, setMovies } from '../../store/moviesSlice';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isLogged } = useSelector(
    (state: { user: TUserState }) => state.user
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const movies = localStorage.getItem('movies-all') || '';

    if (movies === '') {
      moviesApi.getMovies().then((res) =>{
        dispatch(setMovies(res));
        localStorage.setItem('movies-all', JSON.stringify(res))
      });
    }

    const token = localStorage.getItem('movies-jwt') || '';

    dispatch(getUser(token)).finally(() => setIsLoading(false));
    dispatch(getSavedMovies(token));

    try {
      dispatch(setMovies(JSON.parse(movies)));
    } catch(err) {
      console.log(err);
    }

    if (token === '') {
      setIsLoading(false)
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main>
      <Routes>
        <Route
          path='/signin'
          element={!isLogged ? <SignIn /> : <Navigate to='/movies' />}
        />
        <Route
          path='/signup'
          element={!isLogged ? <SignUp /> : <Navigate to='/movies' />}
        />
        <Route path='/profile' element={ isLogged ? <Profile /> : <Navigate to='/signin' />} />
        <Route path='/movies' element={ isLogged ? <Movies /> : <Navigate to='/signin' />} />
        <Route path='/saved-movies' element={ isLogged ? <SavedMovies /> : <Navigate to='/signin' />} />
        <Route path='/' element={ isLogged ? <Navigate to='/movies' /> : <Navigate to='/signin' />} />
        <Route path='/*' element={<NotFound />}/>
      </Routes>
    </main>
  );
};

export { App };
