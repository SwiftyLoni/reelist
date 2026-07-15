import type { IconName } from '../ui/Icon';
import { Icon } from '../ui/Icon';
import './StatCard.css';

interface StatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon name={icon} size={20} />
      </div>
      <div>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}
