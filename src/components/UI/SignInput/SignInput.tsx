import { FC, forwardRef } from 'react';
import cn from 'classnames';
import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from 'react-hook-form';

import styles from './SignInput.module.scss';

interface IProps {
  name: string;
  label: string;
  type: 'email' | 'text' | 'submit' | 'password';
  placeholder?: string;
  option?: RegisterOptions;
  register?: UseFormRegister<FieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const SignInput: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ name, label, type, placeholder, option, register, error }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <input
          className={cn(styles.input, error && styles.input_error)}
          placeholder={placeholder}
          type={type}
          ref={ref}
          name={name}
          id={name}
          {...(register && register(name, option))}
        />
        <span className={styles.error}>{error && `${error.message}`}</span>
      </div>
    );
  }
);

export { SignInput };
