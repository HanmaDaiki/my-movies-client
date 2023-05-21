import { FC } from 'react';
import cn from 'classnames';

import { TMovie } from '../../types/TMovie';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { TMoviesState } from '../../types/TMoviesState';
import styles from './Card.module.scss';
import {
  deleteSavedMovie,
  getSavedMovies,
  postSavedMovies,
  removeSavedMovie,
} from '../../store/moviesSlice';

interface IProps {
  fromComponent: 'movies' | 'saved-movies';
  movie: TMovie;
}

const Card: FC<IProps> = ({ fromComponent, movie }) => {
  const { savedMoviesArray } = useSelector(
    (state: { movies: TMoviesState }) => state.movies
  );
  const token = localStorage.getItem('movies-jwt') || '';

  const savedMovie = savedMoviesArray.filter(
    (savedMovie) => savedMovie.id === movie.id
  );

  const isLiked = savedMovie.length > 0;

  const calculateDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - 60 * hours;

    return `${hours}ч ${minutes}м`;
  };

  const dispatch = useAppDispatch();

  const toggleLike = () => {
    console.log('click');

    if (!isLiked) {
      dispatch(postSavedMovies({ movie: movie, jwt: token })).then((res) => {
        res.meta.requestStatus === 'fulfilled' &&
          dispatch(getSavedMovies(token));
      });
      return;
    }

    dispatch(deleteSavedMovie({ id: savedMovie[0]._id, jwt: token })).then(
      (res) => {
        res.meta.requestStatus === 'fulfilled' &&
          dispatch(removeSavedMovie(movie.id));
      }
    );
  };

  return (
    <article className={styles.article}>
      <div className={styles.left}>
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.nameRU}</h3>
          <span className={styles.duration}>
            {calculateDuration(movie.duration)}
          </span>
        </div>
        <button
          onClick={toggleLike}
          className={
            fromComponent === 'movies'
              ? cn(styles.like, isLiked && styles.active)
              : styles.remove
          }
        />
      </div>
      <a href={movie.trailerLink} target='_blank'>
        <img
          className={styles.image}
          src={`https://api.nomoreparties.co/${movie.image.url || movie.image}`}
        />
      </a>
    </article>
  );
};

export { Card };
