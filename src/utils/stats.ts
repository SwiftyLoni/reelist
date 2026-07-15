import type { Genre } from '../types/tmdb';
import type { UserRating, WatchedItem } from '../types/user';

export interface GenreStat {
  genreId: number;
  name: string;
  count: number;
  percentage: number;
}

export interface DecadeStat {
  decade: string;
  count: number;
}

export interface TopRatedMovie {
  movieId: number;
  title: string;
  posterPath: string | null;
  rating: number;
}

export function calculateAverageRating(ratings: UserRating[]): number {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  return total / ratings.length;
}

export function calculateGenreBreakdown(
  watched: WatchedItem[],
  genres: Genre[],
): GenreStat[] {
  if (watched.length === 0) return [];

  const genreNameById = new Map(genres.map((g) => [g.id, g.name]));
  const counts = new Map<number, number>();

  for (const item of watched) {
    for (const genreId of item.genreIds) {
      counts.set(genreId, (counts.get(genreId) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([genreId, count]) => ({
      genreId,
      name: genreNameById.get(genreId) ?? 'Unknown',
      count,
      percentage: (count / watched.length) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculateDecadeBreakdown(watched: WatchedItem[]): DecadeStat[] {
  const counts = new Map<string, number>();

  for (const item of watched) {
    const year = Number(item.releaseDate?.slice(0, 4));
    if (!year) continue;
    const decade = `${Math.floor(year / 10) * 10}s`;
    counts.set(decade, (counts.get(decade) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([decade, count]) => ({ decade, count }))
    .sort((a, b) => a.decade.localeCompare(b.decade));
}

export function calculateTopRated(
  watched: WatchedItem[],
  ratings: UserRating[],
  limit = 5,
): TopRatedMovie[] {
  const ratingByMovieId = new Map(ratings.map((r) => [r.movieId, r.rating]));

  return watched
    .filter((item) => ratingByMovieId.has(item.movieId))
    .map((item) => ({
      movieId: item.movieId,
      title: item.title,
      posterPath: item.posterPath,
      rating: ratingByMovieId.get(item.movieId) ?? 0,
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
