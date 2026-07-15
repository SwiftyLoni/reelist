export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface CastMember {
  id: number;
  cast_id: number;
  character: string;
  name: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  job: string;
  name: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo' | string;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | string;
  official: boolean;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MovieDetails extends Movie {
  tagline: string;
  runtime: number | null;
  genres: Genre[];
  status: string;
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
  homepage: string | null;
}

export type SortOption =
  | 'popularity'
  | 'vote_average'
  | 'release_date'
  | 'title';

export type SortDirection = 'asc' | 'desc';

export interface DiscoverFilters {
  genres: number[];
  yearFrom: number;
  yearTo: number;
  minRating: number;
  sortBy: SortOption;
  sortDirection: SortDirection;
}
