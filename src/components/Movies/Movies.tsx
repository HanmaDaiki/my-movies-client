import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../UI/Container/Container';
import { Header } from '../Header/Header';
import { Card } from '../Card/Card';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getSavedMovies } from '../../store/moviesSlice';
import { TMoviesState } from '../../types/TMoviesState';
import styles from './Movies.module.scss';


const Movies: FC = () => {
  const [moviesRenderCounter, setMoviesRenderCounter] = useState(3);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('movies-jwt') || '';

    dispatch(getSavedMovies(token));
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { moviesArray } = useSelector((state: { movies: TMoviesState}) => state.movies);

  return(
    <>
      <Header />
      <section>
        <Container className='movie'>
          {
            moviesArray.slice(0, moviesRenderCounter).map((movie, index) => {
              return <Card movie={movie} key={index} fromComponent='movies' />
            })
          }
          <button onClick={() => setMoviesRenderCounter(moviesRenderCounter + 3)} className={styles.more}>Eщё</button>
        </Container>
      </section>
    </>
  );
};

export { Movies };