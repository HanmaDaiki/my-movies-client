import { FC } from 'react';

import { Container } from '../UI/Container/Container';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  return(
    <footer className={styles.footer}>
      <Container className='footer'>
        <div className={styles.tech}>Vite, React, TypeScript, Sass, Redux</div>
        <div className={styles.social}>
          <span>© 2023</span>
          <a className={styles.link} href='https://github.com/HanmaDaiki' target='_blank'>GitHub</a>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };