import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SignSublink.module.scss';

interface IProps {
  text: string;
  redirect: string;
  textLink: string;
}

const SignSublink: FC<IProps> = ({ text, redirect, textLink }) => {
  const navigate = useNavigate();

  return (
    <span className={styles.sublink}>
      {text}
      <button className={styles.button} onClick={() => navigate(redirect)}>
        {textLink}
      </button>
    </span>
  );
};

export { SignSublink };
