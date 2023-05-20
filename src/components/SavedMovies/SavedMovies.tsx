import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../UI/Container/Container';
import { Header } from '../Header/Header';

import { TMoviesState } from '../../types/TMoviesState';
import { Card } from '../Card/Card';

import styles from './SavedMovies.module.scss';

const SavedMovies: FC = () => {
  const [moviesRenderCounter, setMoviesRenderCounter] = useState(3)

  const { savedMoviesArray } = useSelector((state: { movies: TMoviesState}) => state.movies);

  return(
    <>
      <Header />
      <section>
        <Container className='movie'>
          {
            savedMoviesArray.slice(0, moviesRenderCounter).map((movie, index) => {
              return <Card movie={movie} key={index} fromComponent='saved-movies' />
            })
          }
          <button onClick={() => setMoviesRenderCounter(moviesRenderCounter + 3)} className={styles.more}>Eщё</button>
        </Container>
      </section>
    </>
  );
};

export { SavedMovies };