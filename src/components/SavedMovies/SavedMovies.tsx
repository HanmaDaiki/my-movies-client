import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../UI/Container/Container';
import { Header } from '../Header/Header';
import { Filter } from '../Filter/Filter';
import { Card } from '../Card/Card';

import { TMoviesState } from '../../types/TMoviesState';
import styles from './SavedMovies.module.scss';
import { TMovie } from '../../types/TMovie';

const SavedMovies: FC = () => {
  const [moviesRenderCounter, setMoviesRenderCounter] = useState(3);
  const [filteredArray, setFilteredArray] = useState<Array<TMovie>>([]);

  const { savedMoviesArray, savedMoviesFilter } = useSelector(
    (state: { movies: TMoviesState }) => state.movies
  );

  useEffect(() => {
    const filtering = savedMoviesArray.filter((movie) => {
      if (savedMoviesFilter.toggle) {
        return (
          movie.nameRU
            .toLowerCase()
            .includes(savedMoviesFilter.keyWord.toLowerCase()) &&
          movie.duration <= 40
        );
      } else {
        return movie.nameRU
          .toLowerCase()
          .includes(savedMoviesFilter.keyWord.toLowerCase());
      }
    });

    setFilteredArray(filtering);
    setMoviesRenderCounter(3);
  }, [savedMoviesFilter, savedMoviesArray]);

  return (
    <>
      <Header />
      <Filter fromComponent='saved-movies' />
      <section>
        <Container className='movie'>
          {filteredArray.length !== 0 ? (
            <>
              {filteredArray
                .slice(0, moviesRenderCounter)
                .map((movie, index) => {
                  return (
                    <Card
                      movie={movie}
                      key={index}
                      fromComponent='saved-movies'
                    />
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

export { SavedMovies };
