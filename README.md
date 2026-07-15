# 🎬 Reelist

> Discover, track, and rate movies — a cinematic, editorial take on movie discovery.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**Live demo:** _add your deployed URL here_

## Screenshots

| Home | Movie Detail | Discover |
| --- | --- | --- |
| ![Home](./screenshots/home.png) | ![Detail](./screenshots/detail.png) | ![Discover](./screenshots/discover.png) |

## Features

**Navigation & Routing**
- Home with hero + curated rows (Trending, Top Rated, Now Playing, Upcoming)
- Discover page with URL-synced, shareable filters
- Dedicated search results page
- Full movie detail page with cast, trailer, and similar titles
- Personal Watchlist and Watched pages
- Stats dashboard with genre/decade breakdowns
- Custom 404 page

**Discovery & Filtering**
- Multi-select genre chips, year range, minimum rating, sort + direction
- All filters reflected in the URL for bookmarking/sharing
- Reset filters when any are active

**Search**
- Debounced (300ms) autocomplete with top 5 suggestions
- Recent searches (last 8) persisted to localStorage

**Movie Grid & Cards**
- Responsive grid (2 → 3 → 5 → 6 columns)
- Skeleton loading (no spinners)
- Infinite scroll via `useInfiniteQuery`
- Empty states with clear CTAs

**Movie Detail**
- Backdrop hero, full metadata, overview
- Horizontally scrollable cast rail
- Trailer modal (YouTube embed via TMDB videos endpoint)
- Similar movies grid
- Add to Watchlist / Mark Watched / interactive 10-star rating

**UX Polish**
- Dark (default) and light themes, persisted
- Toast notifications, error boundaries with retry
- Scroll restoration, hover prefetching of movie details

## Tech Stack & Reasoning

- **React 18 + TypeScript (strict)** — functional components and hooks throughout, with full type coverage on every TMDB response shape.
- **Vite** — fast dev server and builds with zero-config TypeScript support.
- **React Router v6** — nested layout routing for the shared `AppShell`, with lazy-loaded route components.
- **Why TanStack Query** — TMDB is a read-heavy REST API; Query gives us caching, background refetching, request de-duplication, and `useInfiniteQuery` for pagination without hand-rolling any of it. It also owns loading/error/success state so components stay declarative.
- **Why Zustand for client state only** — server data (movies, cast, search results) belongs in TanStack Query's cache, not a global store. Zustand is reserved strictly for state that is genuinely local to the user's device: watchlist, watched list, ratings, recent searches, and theme — all persisted to `localStorage` via Zustand's `persist` middleware. Keeping the two concerns separate avoids the classic mistake of duplicating server state into a client store.
- **Why URL state for filters** — Discover/search filters live in `URLSearchParams`, not component state, so results are shareable and bookmarkable, and back/forward navigation "just works" without extra wiring.
- **Plain CSS with custom properties** — no build-time or runtime styling abstraction; theme switching is a single attribute toggle that swaps CSS variable values.

## Architecture

```
src/
├── types/       # TMDB + user data type definitions (no `any`)
├── api/         # Thin fetch layer — one file per TMDB resource group
├── store/       # Zustand stores (persisted client state)
├── queries/     # TanStack Query hooks + query key factory
├── pages/       # Route-level components, one per page
├── components/  # Organized by feature area (movie, discover, search, detail, stats, layout, ui)
├── hooks/       # Cross-cutting hooks (debounce, intersection observer, URL filters, toast)
└── utils/       # Pure formatting/calculation helpers
```

The split between `api/` (raw HTTP) and `queries/` (React Query hooks) keeps data-fetching logic testable independent of React, while `store/` vs `queries/` keeps client and server state from ever being conflated.

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/SwiftyLoni/reelist.git
   cd reelist
   npm install
   ```
2. Get a free TMDB API key:
   - Sign up at [themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Go to **Settings → API** ([themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))
   - Request a Developer API key (approved instantly)
   - Copy the **API Key (v3 auth)**
3. Copy `.env.example` to `.env` and paste your key:
   ```bash
   cp .env.example .env
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_TMDB_API_KEY` | Yes | TMDB v3 API key used to authenticate all requests |

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check with `tsc` and produce a production build |
| `npm run preview` | Preview the production build locally |

## Deployment (Vercel)

1. Push this repo to GitHub (already done if you followed setup).
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Set the `VITE_TMDB_API_KEY` environment variable in the Vercel project settings.
4. Deploy — Vercel auto-detects the Vite build (`npm run build`, output `dist/`).

## Roadmap

- [ ] Actor/person detail pages
- [ ] TV show support alongside movies
- [ ] Shareable public watchlists
- [ ] Collections/franchise grouping on detail pages
- [ ] PWA / offline support for watchlist and watched data

## Notes on Rate Limiting

TMDB allows roughly 40 requests per 10 seconds. TanStack Query's caching (5-minute `staleTime`) and request de-duplication handle this naturally under normal usage — see inline comments in `src/queries/` where this matters most (search and hover-prefetch).

## License

MIT © [Erijon Bytyqi](https://github.com/SwiftyLoni)

---

Built with ☕ in Pristina, Kosovo
