import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRating, WatchedItem, WatchlistItem } from '../types/user';

const MAX_RECENT_SEARCHES = 8;

interface UserState {
  watchlist: WatchlistItem[];
  watched: WatchedItem[];
  ratings: UserRating[];
  recentSearches: string[];

  addToWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;

  markWatched: (item: Omit<WatchedItem, 'watchedAt'>) => void;
  removeFromWatched: (movieId: number) => void;
  isWatched: (movieId: number) => boolean;

  setRating: (movieId: number, rating: number) => void;
  getRating: (movieId: number) => number | undefined;

  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      watched: [],
      ratings: [],
      recentSearches: [],

      addToWatchlist: (item) =>
        set((state) => {
          if (state.watchlist.some((w) => w.movieId === item.movieId)) return state;
          return {
            watchlist: [...state.watchlist, { ...item, addedAt: Date.now() }],
          };
        }),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((w) => w.movieId !== movieId),
        })),

      isInWatchlist: (movieId) => get().watchlist.some((w) => w.movieId === movieId),

      markWatched: (item) =>
        set((state) => {
          if (state.watched.some((w) => w.movieId === item.movieId)) return state;
          return {
            watched: [...state.watched, { ...item, watchedAt: Date.now() }],
            watchlist: state.watchlist.filter((w) => w.movieId !== item.movieId),
          };
        }),

      removeFromWatched: (movieId) =>
        set((state) => ({
          watched: state.watched.filter((w) => w.movieId !== movieId),
        })),

      isWatched: (movieId) => get().watched.some((w) => w.movieId === movieId),

      setRating: (movieId, rating) =>
        set((state) => {
          const existing = state.ratings.find((r) => r.movieId === movieId);
          const ratedAt = Date.now();
          if (existing) {
            return {
              ratings: state.ratings.map((r) =>
                r.movieId === movieId ? { ...r, rating, ratedAt } : r,
              ),
            };
          }
          return { ratings: [...state.ratings, { movieId, rating, ratedAt }] };
        }),

      getRating: (movieId) => get().ratings.find((r) => r.movieId === movieId)?.rating,

      addRecentSearch: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          const deduped = [
            trimmed,
            ...state.recentSearches.filter(
              (s) => s.toLowerCase() !== trimmed.toLowerCase(),
            ),
          ];
          return { recentSearches: deduped.slice(0, MAX_RECENT_SEARCHES) };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'reelist-user-store',
      partialize: (state) => ({
        watchlist: state.watchlist,
        watched: state.watched,
        ratings: state.ratings,
        recentSearches: state.recentSearches,
      }),
    },
  ),
);
