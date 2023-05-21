import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../UI/Container/Container';
import { Header } from '../Header/Header';
import { Card } from '../Card/Card';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getSavedMovies, setMoviesFilter } from '../../store/moviesSlice';
import { TMoviesState } from '../../types/TMoviesState';
import styles from './Movies.module.scss';
import { Filter } from '../Filter/Filter';
import { TMovie } from '../../types/TMovie';
import { TFilter } from '../../types/TFilter';
import { guardStorageData } from '../../utils/guardStorageData';

const Movies: FC = () => {
  const [moviesRenderCounter, setMoviesRenderCounter] = useState(3);
  const [filteredArray, setFilteredArray] = useState<Array<TMovie>>([]);
  const { moviesArray, moviesFilter } = useSelector(
    (state: { movies: TMoviesState }) => state.movies
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadSaveFilter: TFilter = guardStorageData(localStorage.getItem('movies-filter'));

    if (loadSaveFilter) {  
      dispatch(setMoviesFilter(loadSaveFilter));
    }

    if (moviesArray.length === 0) {
      const token = localStorage.getItem('movies-jwt') || '';

      dispatch(getSavedMovies(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtering = moviesArray.filter((movie) => {
      if (moviesFilter.toggle) {
        return (
          movie.nameRU
            .toLowerCase()
            .includes(moviesFilter.keyWord.toLowerCase()) &&
          movie.duration <= 40
        );
      } else {
        return movie.nameRU
          .toLowerCase()
          .includes(moviesFilter.keyWord.toLowerCase());
      }
    });

    setFilteredArray(filtering);
    setMoviesRenderCounter(3);
  }, [moviesFilter, moviesArray]);

  return (
    <>
      <Header />
      <Filter fromComponent='movies' />
      <section>
        <Container className='movie'>
          {filteredArray.length !== 0 ? (
            <>
              {filteredArray
                .slice(0, moviesRenderCounter)
                .map((movie, index) => {
                  return (
                    <Card movie={movie} key={index} fromComponent='movies' />
                  );
                })}
              {filteredArray.length > moviesRenderCounter && (
                <button
                  onClick={() =>
                    setMoviesRenderCounter(moviesRenderCounter + 3)
                  }
                  className={styles.more}
                >
                  Eщё
                </button>
              )}
            </>
          ) : (
            <div className={styles.notFound}>Ничего не найдено</div>
          )}
        </Container>
      </section>
    </>
  );
};

export { Movies };
