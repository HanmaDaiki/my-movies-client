import { Route, Routes } from 'react-router-dom';

import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { ProtectedRouter } from '../ProtectedRouter/ProtectedRouter';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='*'
          element={
            <ProtectedRouter redirectPath='/signin'>
              <></>
            </ProtectedRouter>
          }
        />
      </Routes>
    </main>
  );
};

export { App };
