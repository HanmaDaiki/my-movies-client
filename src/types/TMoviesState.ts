import { TFilter } from "./TFilter";
import { TMovie } from "./TMovie";

export type TMoviesState = {
  moviesArray: Array<TMovie>;
  savedMoviesArray: Array<TMovie>;
  moviesFilter: TFilter;
  savedMoviesFilter: TFilter;
}