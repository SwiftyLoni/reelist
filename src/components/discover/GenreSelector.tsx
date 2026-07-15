import type { Genre } from '../../types/tmdb';
import { GenreChip } from '../movie/GenreChip';
import './GenreSelector.css';

interface GenreSelectorProps {
  genres: Genre[];
  selected: number[];
  onChange: (genreIds: number[]) => void;
}

export function GenreSelector({ genres, selected, onChange }: GenreSelectorProps) {
  const toggle = (id: number) => {
    onChange(selected.includes(id) ? selected.filter((g) => g !== id) : [...selected, id]);
  };

  return (
    <div className="genre-selector">
      {genres.map((genre) => (
        <GenreChip
          key={genre.id}
          label={genre.name}
          selected={selected.includes(genre.id)}
          onClick={() => toggle(genre.id)}
        />
      ))}
    </div>
  );
}
