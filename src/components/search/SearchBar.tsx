import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { SearchSuggestions } from './SearchSuggestions';
import { RecentSearches } from './RecentSearches';
import { useSearchSuggestions } from '../../queries/useSearch';
import { useUserStore } from '../../store/useUserStore';
import type { Movie } from '../../types/tmdb';
import './SearchBar.css';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const addRecentSearch = useUserStore((state) => state.addRecentSearch);

  const { data: suggestions = [], isFetching } = useSearchSuggestions(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addRecentSearch(trimmed);
    setIsFocused(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSelectMovie = (movie: Movie) => {
    addRecentSearch(movie.title);
    setIsFocused(false);
    setQuery('');
    navigate(`/movie/${movie.id}`);
  };

  const showSuggestions = isFocused && query.trim().length > 0;
  const showRecent = isFocused && query.trim().length === 0;

  return (
    <div className="search-bar" ref={containerRef}>
      <div className="search-bar__input-wrap">
        <Icon name="search" size={17} className="search-bar__icon" />
        <input
          type="search"
          placeholder="Search movies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch(query);
          }}
          aria-label="Search movies"
        />
      </div>
      {(showSuggestions || showRecent) && (
        <div className="search-bar__dropdown">
          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              isLoading={isFetching}
              onSelect={handleSelectMovie}
            />
          )}
          {showRecent && (
            <RecentSearches
              onSelect={(value) => {
                setQuery(value);
                runSearch(value);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
