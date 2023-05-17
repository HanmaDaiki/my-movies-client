import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '../UI/Container/Container';
import { SignInput } from '../UI/SignInput/SignInput';
import { SignButton } from '../UI/SignButton/SignButton';
import { SignSublink } from '../UI/SignSublink/SignSublink';
import { SignTitle } from '../UI/SignTitle/SignTitle';

import { registerEmail, registerPassword, registerText } from '../../utils/optionsForm';
import styles from './SignUp.module.scss';

const SignUp: FC = () => {
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
