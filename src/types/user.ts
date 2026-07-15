export interface WatchlistItem {
  movieId: number;
  title: string;
  posterPath: string | null;
  addedAt: number;
}

export interface WatchedItem {
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  genreIds: number[];
  watchedAt: number;
}

export interface UserRating {
  movieId: number;
  rating: number;
  ratedAt: number;
}

export type SortByAdded = 'recent' | 'alphabetical' | 'rating';

export type Theme = 'dark' | 'light';
