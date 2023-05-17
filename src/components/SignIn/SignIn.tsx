import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '../UI/Container/Container';
import { SignInput } from '../UI/SignInput/SignInput';

import styles from './SignIn.module.scss';
import { registerEmail, registerPassword } from '../../utils/optionsForm';
import { SignButton } from '../UI/SignButton/SignButton';
import { SignSublink } from '../UI/SignSublink/SignSublink';
import { SignTitle } from '../UI/SignTitle/SignTitle';

const SignIn: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    console.log('data');
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
