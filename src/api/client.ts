const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined;

export class TmdbError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'TmdbError';
    this.status = status;
  }
}

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  if (!API_KEY) {
    throw new TmdbError(
      'Missing VITE_TMDB_API_KEY. Add it to your .env file.',
      401,
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new TmdbError(
      `TMDB request failed: ${response.statusText}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}
