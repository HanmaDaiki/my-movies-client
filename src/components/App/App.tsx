import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';

import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { Preloader } from '../UI/Preloader/Preloader';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { TUserState } from '../../types/TUserState';
import { getUser, logOut } from '../../store/userSlice';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isLogged, name, email } = useSelector(
    (state: { user: TUserState }) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('movies-jwt') || '';

    dispatch(getUser(token))
      .then((res) => {
        res.meta.requestStatus === 'fulfilled' && navigate('/');
      })
      .finally(() => setIsLoading(false));
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
              <div style={{ color: '#fff', fontSize: '56px' }}>
                Авторизован, как {name} -- {email}{' '}
                <button onClick={() => {
                  dispatch(logOut());
                  navigate('/signin')
                  }}>выйти</button>
              </div>
            ) : (
              <Navigate to='/signin' />
            )
          }
        />
      </Routes>
    </main>
  );
};

export { App };
