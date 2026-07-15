import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMovieById, getMovieCredits, getSimilar, getVideos } from '../api/movies';
import { queryKeys } from './keys';

export function useMovieDetail(id: number) {
  const detailsQuery = useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => getMovieById(id),
    enabled: Number.isFinite(id),
  });

  const creditsQuery = useQuery({
    queryKey: queryKeys.credits(id),
    queryFn: () => getMovieCredits(id),
    enabled: Number.isFinite(id),
  });

  const similarQuery = useQuery({
    queryKey: queryKeys.similar(id),
    queryFn: () => getSimilar(id),
    enabled: Number.isFinite(id),
    select: (data) => data.results.slice(0, 6),
  });

  const videosQuery = useQuery({
    queryKey: queryKeys.videos(id),
    queryFn: () => getVideos(id),
    enabled: Number.isFinite(id),
    select: (data) =>
      data.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
      data.results.find((v) => v.site === 'YouTube'),
  });

  return {
    movie: detailsQuery.data,
    cast: creditsQuery.data?.cast.slice(0, 10) ?? [],
    similar: similarQuery.data ?? [],
    trailer: videosQuery.data,
    isLoading: detailsQuery.isLoading,
    isError: detailsQuery.isError || creditsQuery.isError,
    error: detailsQuery.error ?? creditsQuery.error,
  };
}

export function usePrefetchMovieDetail() {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.detail(id),
      queryFn: () => getMovieById(id),
    });
  };
}
