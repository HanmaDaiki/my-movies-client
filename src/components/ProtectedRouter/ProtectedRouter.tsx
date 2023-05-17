import { FC } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Navigate } from 'react-router-dom';

import { TAuthState } from '../../types/TAuthState';

interface IProps {
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRouter: FC<IProps> = ({redirectPath = '/', children}) => {
  const isLogged = useSelector((state: { auth: TAuthState }) => state.auth.isLogged);

  if(!isLogged) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export { ProtectedRouter };