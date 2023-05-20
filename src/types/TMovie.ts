export type TMovie = {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: TImage;
  trailerLink: string;
  thumbnail: string;
  id: number;
  nameRU: string;
  nameEN: string;
  _id: number;
}

export type TImage = {
  url: string;
}