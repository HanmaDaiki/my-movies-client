import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';

import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { Preloader } from '../UI/Preloader/Preloader';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { TUserState } from '../../types/TUserState';
import { getUser, logOut } from '../../store/userSlice';
import { NotFound } from '../NotFound/NotFound';
import { Header } from '../Header/Header';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isLogged, name, email } = useSelector(
    (state: { user: TUserState }) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('movies-jwt') || '';

    if (token === '') {
      setIsLoading(false)
      return
    }

    dispatch(getUser(token)).finally(() => setIsLoading(false));
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
          element={!isLogged ? <SignIn /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!isLogged ? <SignUp /> : <Navigate to='/' />}
        />
        <Route
          path='/'
          element={
            isLogged ? (
              <>
              <Header />
              <div style={{ color: '#fff', fontSize: '16px' }}>
                Авторизован, как {name} -- {email}{' '}
                <button onClick={() => {
                  dispatch(logOut());
                  navigate('/signin')
                  }}>выйти</button>
              </div></>
            ) : (
              <Navigate to='/signin' />
            )
          }
        />
        <Route path='/*' element={<NotFound />}/>
      </Routes>
    </main>
  );
};

export { App };
