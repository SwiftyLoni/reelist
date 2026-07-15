import { Link } from 'react-router-dom';
import { Nav } from './Nav';
import { SearchBar } from '../search/SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from '../ui/Icon';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="Reelist home">
          <Icon name="film" size={22} />
          <span>Reelist</span>
        </Link>
        <Nav />
        <div className="header__actions">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
