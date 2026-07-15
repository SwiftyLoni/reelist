import { Link } from 'react-router-dom';
import type { Movie } from '../../types/tmdb';
import { backdropUrl } from '../../utils/images';
import { formatYear } from '../../utils/formatters';
import { RatingBadge } from './RatingBadge';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import './HeroSection.css';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const backdrop = backdropUrl(movie.backdrop_path, 'w1280');

  return (
    <section className="hero" aria-label="Featured movie">
      {backdrop && (
        <img src={backdrop} alt="" className="hero__backdrop" loading="eager" aria-hidden="true" />
      )}
      <div className="hero__overlay" />
      <div className="hero__content">
        <span className="hero__eyebrow">Trending Today</span>
        <h1 className="hero__title">{movie.title}</h1>
        <div className="hero__meta">
          <RatingBadge rating={movie.vote_average} />
          <span>{formatYear(movie.release_date)}</span>
        </div>
        <p className="hero__overview">{movie.overview}</p>
        <Link to={`/movie/${movie.id}`}>
          <Button size="lg" icon={<Icon name="play" size={18} />}>
            View Details
          </Button>
        </Link>
      </div>
    </section>
  );
}
