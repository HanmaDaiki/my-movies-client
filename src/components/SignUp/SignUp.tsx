import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '../UI/Container/Container';
import { SignInput } from '../UI/SignInput/SignInput';
import { SignButton } from '../UI/SignButton/SignButton';
import { SignSublink } from '../UI/SignSublink/SignSublink';
import { SignTitle } from '../UI/SignTitle/SignTitle';

import { signIn, signUp } from '../../store/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  registerEmail,
  registerPassword,
  registerText,
} from '../../utils/optionsForm';
import styles from './SignUp.module.scss';
import { getUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = () => {
    const name = getValues('name');
    const email = getValues('email');
    const password = getValues('password');

    dispatch(signUp({ name, email, password })).then((res) => {
      res.meta.requestStatus === 'fulfilled' &&
        dispatch(signIn({ email, password })).then((res) => {
          const token = localStorage.getItem('movies-jwt') || '';
          res.meta.requestStatus === 'fulfilled' &&
            dispatch(getUser(token)).then((res) => {
              res.meta.requestStatus === 'fulfilled' && navigate('/profile');
            });
        });
    });
  };

  return (
    <Container className='sign'>
      <SignTitle text='Добро пожаловать!' />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <SignInput
            register={register}
            error={errors?.name}
            option={registerText}
            label='Имя'
            name='name'
            type='text'
          />
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
              text='Уже зарегистрированы?'
              textLink='Войти'
              redirect='/signin'
            />
          }
        >
          Зарегистрироваться
        </SignButton>
      </form>
    </Container>
  );
};

export { SignUp };
