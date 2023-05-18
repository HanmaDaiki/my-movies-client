import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { TUserState } from '../../types/TUserState';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  const { isLogged } = useSelector(
    (state: { user: TUserState }) => state.user
  );

  const navigate = useNavigate();

  return(
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <span className={styles.text}>Страница не найдена</span>
      <button className={styles.button} onClick={() => 
        isLogged ? navigate('/') : navigate('/signin')
      }>Назад</button>
    </div>
  );
};

export { NotFound };