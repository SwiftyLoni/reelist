import { useState } from 'react';
import { posterUrl, type PosterSize } from '../../utils/images';
import { Icon } from '../ui/Icon';
import './PosterImage.css';

interface PosterImageProps {
  path: string | null;
  alt: string;
  size?: PosterSize;
  loading?: 'lazy' | 'eager';
}

export function PosterImage({ path, alt, size = 'w342', loading = 'lazy' }: PosterImageProps) {
  const [failed, setFailed] = useState(false);
  const url = posterUrl(path, size);

  if (!url || failed) {
    return (
      <div className="poster-image poster-image--fallback" role="img" aria-label={alt}>
        <Icon name="film" size={28} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      className="poster-image"
      onError={() => setFailed(true)}
    />
  );
}
