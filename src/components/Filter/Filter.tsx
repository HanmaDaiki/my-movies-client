import { FC, useState, useEffect } from 'react';
import cn from 'classnames';

import { Container } from '../UI/Container/Container';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setMoviesFilter, setSavedMoviesFilter } from '../../store/moviesSlice';
import styles from './Filter.module.scss';
import { useSelector } from 'react-redux';
import { TMoviesState } from '../../types/TMoviesState';


interface IProps {
  fromComponent: 'movies' | 'saved-movies';
}

const Filter: FC<IProps> = ({ fromComponent }) => {
  const [swictcher, setSwitcher] = useState(false);
  const [keyWord, setKeyWord] = useState(''); 

  const { savedMoviesFilter, moviesFilter } = useSelector(
    (state: { movies: TMoviesState }) => state.movies
  );

  useEffect(() => {
    if (fromComponent === 'movies') {
      setSwitcher(moviesFilter.toggle);
      setKeyWord(moviesFilter.keyWord);
    }

    if (fromComponent === 'saved-movies') {
      setSwitcher(savedMoviesFilter.toggle);
      setKeyWord(savedMoviesFilter.keyWord);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesFilter, savedMoviesFilter]) 

  const dispatch = useAppDispatch();

  // #TODO: Разедлить логику toggle и keyword!!
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fromComponent === 'movies') {
      dispatch(setMoviesFilter({
        toggle: swictcher,
        keyWord: keyWord
      }))
    }

    if (fromComponent === 'saved-movies') {
      dispatch(setSavedMoviesFilter({
        toggle: swictcher,
        keyWord: keyWord
      }))
    }
  };

  return(
    <Container className='filter'> 
      <div className={styles.filter}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.icon} />
          <input onChange={(e) => setKeyWord(e.target.value)} value={keyWord} placeholder='Фильм' className={styles.input} />
          <button type='submit' className={styles.submit} />
        </form>
        <div className={styles.toggle}>
          <div onClick={() => setSwitcher(!swictcher)} className={cn(styles.switcher, swictcher ? styles.on : styles.off)}>
            <div className={styles.circle}></div>
          </div>
          <span className={styles.text}>Короткометражки</span>
        </div>
      </div>
    </Container>
  );
};

export { Filter };