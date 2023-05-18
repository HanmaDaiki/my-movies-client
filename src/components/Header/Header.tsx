import { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../UI/Container/Container';
import { Logo } from '../UI/Logo/Logo';

import styles from './Header.module.scss';

const Header: FC = () => {
  const [mobileMenu, toggleMobileMenu] = useState(false);

  return(
    <header className={styles.header}>
      <Container className='header'>
        <div className={styles.left}>
          <Logo />
          <nav className={styles.navigation}>
            <ul className={styles.list}>
              <li><NavLink className={styles.link} to='/movies'>Фильмы</NavLink></li>
              <li><NavLink className={styles.link} to='/saved-movies'>Сохраненные фильмы</NavLink></li>
            </ul>          
          </nav>
        </div>
        <Link to='/profile' className={styles.account}>Аккаунт <div className={styles.icon}/></Link>
        <button className={styles.button_menu} onClick={() => toggleMobileMenu(!mobileMenu)} />  
      </Container>
      {
        mobileMenu &&
        <div className={styles.mobile_menu}>
          <nav className={cn(styles.navigation, styles.mobile)}>
            <ul className={cn(styles.list, styles.mobile)}>
              <li><NavLink className={cn(styles.link, styles.mobile)} to='/movies'>Фильмы</NavLink></li>
              <li><NavLink className={cn(styles.link, styles.mobile)} to='/saved-movies'>Сохраненные фильмы</NavLink></li>
            </ul>          
          </nav>
          <Link to='/profile' className={cn(styles.account, styles.mobile)}>Аккаунт <div className={styles.icon}/></Link>
          <button className={styles.close_mobile} onClick={() => toggleMobileMenu(!mobileMenu)} />
        </div>
      }
    </header>
  );
};

export { Header };