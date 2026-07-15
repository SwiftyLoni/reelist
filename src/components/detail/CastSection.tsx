import type { CastMember } from '../../types/tmdb';
import { CastCard } from '../movie/CastCard';
import './CastSection.css';

interface CastSectionProps {
  cast: CastMember[];
}

export function CastSection({ cast }: CastSectionProps) {
  if (cast.length === 0) return null;

  return (
    <section className="cast-section" aria-label="Cast">
      <h2 className="cast-section__title">Top Cast</h2>
      <div className="cast-section__track">
        {cast.map((member) => (
          <CastCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
