import type { Movie } from '../../types/tmdb';
import { PosterImage } from '../movie/PosterImage';
import { formatYear } from '../../utils/formatters';
import './SearchSuggestions.css';

interface SearchSuggestionsProps {
  suggestions: Movie[];
  isLoading: boolean;
  onSelect: (movie: Movie) => void;
}

export function SearchSuggestions({ suggestions, isLoading, onSelect }: SearchSuggestionsProps) {
  if (isLoading) {
    return <div className="search-suggestions search-suggestions--empty">Searching…</div>;
  }

  if (suggestions.length === 0) {
    return <div className="search-suggestions search-suggestions--empty">No movies found</div>;
  }

  return (
    <ul className="search-suggestions">
      {suggestions.map((movie) => (
        <li key={movie.id}>
          <button type="button" onClick={() => onSelect(movie)}>
            <div className="search-suggestions__poster">
              <PosterImage path={movie.poster_path} alt={movie.title} size="w185" />
            </div>
            <span className="search-suggestions__info">
              <span className="search-suggestions__title">{movie.title}</span>
              <span className="search-suggestions__year">{formatYear(movie.release_date)}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
