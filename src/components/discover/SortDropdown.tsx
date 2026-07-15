import type { SortDirection, SortOption } from '../../types/tmdb';
import { Icon } from '../ui/Icon';
import './SortDropdown.css';

interface SortDropdownProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortByChange: (value: SortOption) => void;
  onDirectionToggle: () => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'vote_average', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
  { value: 'title', label: 'Title' },
];

export function SortDropdown({
  sortBy,
  sortDirection,
  onSortByChange,
  onDirectionToggle,
}: SortDropdownProps) {
  return (
    <div className="sort-dropdown">
      <label className="sort-dropdown__select-wrap">
        <span className="sort-dropdown__label">Sort by</span>
        <select value={sortBy} onChange={(e) => onSortByChange(e.target.value as SortOption)}>
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="sort-dropdown__direction"
        onClick={onDirectionToggle}
        aria-label={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
      >
        <Icon name="sort" size={16} />
        {sortDirection === 'asc' ? 'Asc' : 'Desc'}
      </button>
    </div>
  );
}
