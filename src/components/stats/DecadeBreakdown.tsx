import type { DecadeStat } from '../../utils/stats';
import './DecadeBreakdown.css';

interface DecadeBreakdownProps {
  stats: DecadeStat[];
}

export function DecadeBreakdown({ stats }: DecadeBreakdownProps) {
  const max = Math.max(...stats.map((s) => s.count), 1);

  return (
    <div className="decade-breakdown">
      {stats.map((stat) => (
        <div className="decade-breakdown__col" key={stat.decade}>
          <span className="decade-breakdown__count">{stat.count}</span>
          <div className="decade-breakdown__bar-track">
            <div
              className="decade-breakdown__bar-fill"
              style={{ height: `${(stat.count / max) * 100}%` }}
            />
          </div>
          <span className="decade-breakdown__label">{stat.decade}</span>
        </div>
      ))}
    </div>
  );
}
