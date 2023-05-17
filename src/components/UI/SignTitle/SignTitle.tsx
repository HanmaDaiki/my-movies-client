import { FC } from 'react';

import { Logo } from '../Logo/Logo';

import styles from './SignTitle.module.scss';

interface IProps {
  text: string;
}

const SignTitle: FC<IProps> = ({ text }) => {
  return(
    <div className={styles.container}>
      <Logo />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};

export { SignTitle };