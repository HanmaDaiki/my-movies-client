import { FC } from 'react';

import styles from './Preloader.module.scss';

const Preloader: FC = () => {
  return <div className={styles.preloader}><div className={styles.image}></div></div>;
};

export { Preloader };