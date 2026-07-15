import type { GenreStat } from '../../utils/stats';
import './GenreBreakdown.css';

interface GenreBreakdownProps {
  stats: GenreStat[];
}

export function GenreBreakdown({ stats }: GenreBreakdownProps) {
  return (
    <div className="genre-breakdown">
      {stats.map((stat) => (
        <div className="genre-breakdown__row" key={stat.genreId}>
          <span className="genre-breakdown__name">{stat.name}</span>
          <div className="genre-breakdown__bar-track">
            <div
              className="genre-breakdown__bar-fill"
              style={{ width: `${stat.percentage}%` }}
            />
          </div>
          <span className="genre-breakdown__count">{stat.count}</span>
        </div>
      ))}
    </div>
  );
}
