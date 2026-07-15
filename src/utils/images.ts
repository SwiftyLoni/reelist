const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w185' | 'w342' | 'w500' | 'original';
export type BackdropSize = 'w780' | 'w1280' | 'original';
export type ProfileSize = 'w185' | 'h632';

export function posterUrl(path: string | null, size: PosterSize = 'w342'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function backdropUrl(path: string | null, size: BackdropSize = 'w1280'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function profileUrl(path: string | null, size: ProfileSize = 'w185'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
