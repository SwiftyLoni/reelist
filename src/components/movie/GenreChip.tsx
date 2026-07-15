import './GenreChip.css';

interface GenreChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function GenreChip({ label, selected = false, onClick }: GenreChipProps) {
  if (!onClick) {
    return <span className="genre-chip">{label}</span>;
  }

  return (
    <button
      type="button"
      className={`genre-chip genre-chip--interactive${selected ? ' genre-chip--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
