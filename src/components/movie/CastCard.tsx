import type { CastMember } from '../../types/tmdb';
import { profileUrl } from '../../utils/images';
import { Icon } from '../ui/Icon';
import './CastCard.css';

interface CastCardProps {
  member: CastMember;
}

export function CastCard({ member }: CastCardProps) {
  const url = profileUrl(member.profile_path, 'w185');

  return (
    <div className="cast-card">
      {url ? (
        <img src={url} alt={member.name} loading="lazy" className="cast-card__photo" />
      ) : (
        <div className="cast-card__photo cast-card__photo--fallback">
          <Icon name="film" size={22} />
        </div>
      )}
      <p className="cast-card__name">{member.name}</p>
      <p className="cast-card__character">{member.character}</p>
    </div>
  );
}
