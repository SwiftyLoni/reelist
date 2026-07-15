import { tmdbFetch } from './client';
import type {
  CreditsResponse,
  DiscoverFilters,
  MovieDetails,
  Movie,
  PaginatedResponse,
  VideosResponse,
} from '../types/tmdb';

export function getTrending(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>('/trending/movie/day', { page });
}

export function getTopRated(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/top_rated', { page });
}

export function getNowPlaying(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/now_playing', { page });
}

export function getUpcoming(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/upcoming', { page });
}

const SORT_FIELD: Record<DiscoverFilters['sortBy'], string> = {
  popularity: 'popularity',
  vote_average: 'vote_average',
  release_date: 'primary_release_date',
  title: 'original_title',
};

export function discoverMovies(filters: DiscoverFilters, page = 1) {
  const sortByParam = `${SORT_FIELD[filters.sortBy]}.${filters.sortDirection}`;

  return tmdbFetch<PaginatedResponse<Movie>>('/discover/movie', {
    page,
    with_genres: filters.genres.length ? filters.genres.join(',') : undefined,
    'primary_release_date.gte': `${filters.yearFrom}-01-01`,
    'primary_release_date.lte': `${filters.yearTo}-12-31`,
    'vote_average.gte': filters.minRating || undefined,
    sort_by: sortByParam,
  });
}

export function getMovieById(id: number) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`);
}

export function getMovieCredits(id: number) {
  return tmdbFetch<CreditsResponse>(`/movie/${id}/credits`);
}

export function getSimilar(id: number) {
  return tmdbFetch<PaginatedResponse<Movie>>(`/movie/${id}/similar`);
}

export function getVideos(id: number) {
  return tmdbFetch<VideosResponse>(`/movie/${id}/videos`);
}
