import { tmdbFetch } from './client';
import type { GenreListResponse } from '../types/tmdb';

export function getGenreList() {
  return tmdbFetch<GenreListResponse>('/genre/movie/list');
}
