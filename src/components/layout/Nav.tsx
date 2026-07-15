import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from '../ui/Icon';
import './Nav.css';

const LINKS: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/discover', label: 'Discover', icon: 'compass' },
  { to: '/watchlist', label: 'Watchlist', icon: 'bookmark' },
  { to: '/watched', label: 'Watched', icon: 'check-circle' },
  { to: '/stats', label: 'Stats', icon: 'bar-chart' },
];

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      {LINKS.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
        >
          <Icon name={icon} size={17} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
