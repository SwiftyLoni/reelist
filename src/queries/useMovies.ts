import { useQuery } from '@tanstack/react-query';
import { getNowPlaying, getTopRated, getTrending, getUpcoming } from '../api/movies';
import { queryKeys } from './keys';

export function useTrending() {
  return useQuery({
    queryKey: queryKeys.trending(),
    queryFn: () => getTrending(),
    select: (data) => data.results,
  });
}

export function useTopRated() {
  return useQuery({
    queryKey: queryKeys.topRated(),
    queryFn: () => getTopRated(),
    select: (data) => data.results,
  });
}

export function useNowPlaying() {
  return useQuery({
    queryKey: queryKeys.nowPlaying(),
    queryFn: () => getNowPlaying(),
    select: (data) => data.results,
  });
}

export function useUpcoming() {
  return useQuery({
    queryKey: queryKeys.upcoming(),
    queryFn: () => getUpcoming(),
    select: (data) => data.results,
  });
}
