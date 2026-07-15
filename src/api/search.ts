import { tmdbFetch } from './client';
import type { Movie, PaginatedResponse } from '../types/tmdb';

export function searchMovies(query: string, page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page,
    include_adult: 'false',
  });
}
