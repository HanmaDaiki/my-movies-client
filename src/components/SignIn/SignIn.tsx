import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Container } from '../UI/Container/Container';
import { SignInput } from '../UI/SignInput/SignInput';
import { SignButton } from '../UI/SignButton/SignButton';
import { SignSublink } from '../UI/SignSublink/SignSublink';
import { SignTitle } from '../UI/SignTitle/SignTitle';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { registerEmail, registerPassword } from '../../utils/optionsForm';
import styles from './SignIn.module.scss';
import { signIn } from '../../store/authSlice';
import { getUser } from '../../store/userSlice';

const SignIn: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const email = getValues('email');
    const password = getValues('password');

    dispatch(signIn({ email, password })).then((res) => {
      const token = localStorage.getItem('movies-jwt') || '';
      res.meta.requestStatus === 'fulfilled' &&
        dispatch(getUser(token)).then((res) => {
          res.meta.requestStatus === 'fulfilled' && navigate('/movies');
        });
    });
  };

  return (
    <Container className='sign'>
      <SignTitle text='Рады видеть!' />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <SignInput
            register={register}
            error={errors?.email}
            option={registerEmail}
            label='E-mail'
            name='email'
            type='email'
          />
          <SignInput
            register={register}
            error={errors?.password}
            option={registerPassword}
            label='Пароль'
            name='password'
            type='password'
          />
        </div>
        <SignButton
          underText={
            <SignSublink
              text='Ещё не зарегистрированы?'
              textLink='Регистрация'
              redirect='/signup'
            />
          }
        >
          Войти
        </SignButton>
      </form>
    </Container>
  );
};

export { SignIn };
