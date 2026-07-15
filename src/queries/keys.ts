import type { DiscoverFilters } from '../types/tmdb';

export const queryKeys = {
  all: ['movies'] as const,

  trending: () => [...queryKeys.all, 'trending'] as const,
  topRated: () => [...queryKeys.all, 'top-rated'] as const,
  nowPlaying: () => [...queryKeys.all, 'now-playing'] as const,
  upcoming: () => [...queryKeys.all, 'upcoming'] as const,

  discover: (filters: DiscoverFilters) =>
    [...queryKeys.all, 'discover', filters] as const,

  detail: (id: number) => [...queryKeys.all, 'detail', id] as const,
  credits: (id: number) => [...queryKeys.all, 'credits', id] as const,
  similar: (id: number) => [...queryKeys.all, 'similar', id] as const,
  videos: (id: number) => [...queryKeys.all, 'videos', id] as const,

  search: (query: string) => [...queryKeys.all, 'search', query] as const,

  genres: () => [...queryKeys.all, 'genres'] as const,
};
