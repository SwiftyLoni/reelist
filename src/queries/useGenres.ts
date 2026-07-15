import { useQuery } from '@tanstack/react-query';
import { getGenreList } from '../api/genres';
import { queryKeys } from './keys';

export function useGenres() {
  return useQuery({
    queryKey: queryKeys.genres(),
    queryFn: getGenreList,
    staleTime: Infinity,
    select: (data) => data.genres,
  });
}
