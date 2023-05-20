import { TMovie } from "./TMovie";

export type TMoviesState = {
  moviesArray: Array<TMovie>;
  savedMoviesArray: Array<TMovie>;
}