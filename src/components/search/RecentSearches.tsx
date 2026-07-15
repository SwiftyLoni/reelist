import { useUserStore } from '../../store/useUserStore';
import { Icon } from '../ui/Icon';
import './RecentSearches.css';

interface RecentSearchesProps {
  onSelect: (query: string) => void;
}

export function RecentSearches({ onSelect }: RecentSearchesProps) {
  const recentSearches = useUserStore((state) => state.recentSearches);
  const clearRecentSearches = useUserStore((state) => state.clearRecentSearches);

  if (recentSearches.length === 0) return null;

  return (
    <div className="recent-searches">
      <div className="recent-searches__header">
        <span>Recent Searches</span>
        <button type="button" onClick={clearRecentSearches}>
          Clear
        </button>
      </div>
      <ul>
        {recentSearches.map((query) => (
          <li key={query}>
            <button type="button" onClick={() => onSelect(query)}>
              <Icon name="clock" size={14} />
              {query}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
