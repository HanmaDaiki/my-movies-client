import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { Header } from '../Header/Header';
import { Container } from '../UI/Container/Container';

import { logOut, updateUser } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { TUserState } from '../../types/TUserState';
import styles from './Profile.module.scss';
import { registerEmail, registerText } from '../../utils/optionsForm';

const Profile: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const { name, email } = useSelector(
    (state: { user: TUserState }) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      const name = getValues('name');
      const email = getValues('email');
      const jwt = localStorage.getItem('movies-jwt') || '';
  
      dispatch(updateUser({ email: email, name: name, jwt: jwt }));
    }
  };

  return (
    <>
      <Header />
      <section>
        <Container className='profile'>
          <h1 className={styles.title}>Привет, {name}!</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label htmlFor='name' className={styles.input_label}>
                  Имя
                </label>
                <input
                  {...register('name', registerText)}
                  name='name'
                  className={styles.input}
                  defaultValue={name}
                />
                {errors.name && (
                  <span
                    className={styles.error}
                  >{`${errors.name.message}`}</span>
                )}
              </div>
              <div className={styles.line} />
              <div className={styles.input_container}>
                <label htmlFor='email' className={styles.input_label}>
                  E-mail
                </label>
                <input
                  {...register('email', registerEmail)}
                  name='email'
                  className={styles.input}
                  defaultValue={email}
                />

                {errors.email && (
                  <span
                    className={styles.error}
                  >{`${errors.email.message}`}</span>
                )}
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                type='submit'
                className={cn(styles.button, styles.submit)}
              >
                Редактировать
              </button>
              <button
                type='button'
                onClick={() => {
                  dispatch(logOut());
                  navigate('/signin');
                }}
                className={cn(styles.button, styles.exit)}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export { Profile };
