import { useRef } from 'react';
import type { Movie } from '../../types/tmdb';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { Icon } from '../ui/Icon';
import './MovieRow.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

export function MovieRow({ title, movies, isLoading = false }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="movie-row" aria-label={title}>
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
        <div className="movie-row__controls">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollBy(-600)}
          >
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollBy(600)}
          >
            <Icon name="chevron-right" size={18} />
          </button>
        </div>
      </div>
      <div className="movie-row__track" ref={scrollRef}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="movie-row__item" key={i}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie) => (
              <div className="movie-row__item" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
      </div>
    </section>
  );
}
