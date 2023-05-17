import { FC, PropsWithChildren } from 'react';

import styles from './SignButton.module.scss';

interface IProps extends PropsWithChildren {
  underText: React.ReactNode
}

const SignButton: FC<IProps> = ({ children, underText}) => {
  return(
    <div className={styles.container}>
      <button className={styles.button} type='submit'>{children}</button>
      {underText}
    </div>
  );
};

export { SignButton };