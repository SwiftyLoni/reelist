import type { ReactNode } from 'react';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export type IconName =
  | 'search'
  | 'star'
  | 'star-outline'
  | 'bookmark'
  | 'bookmark-filled'
  | 'check'
  | 'check-circle'
  | 'play'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'film'
  | 'clock'
  | 'calendar'
  | 'sort'
  | 'filter'
  | 'home'
  | 'compass'
  | 'bar-chart'
  | 'trash'
  | 'alert-triangle'
  | 'refresh';

const PATHS: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  star: (
    <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z" />
  ),
  'star-outline': (
    <path
      fill="none"
      d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z"
    />
  ),
  bookmark: <path fill="none" d="M6 3h12v18l-6-4.5L6 21z" />,
  'bookmark-filled': <path d="M6 3h12v18l-6-4.5L6 21z" />,
  check: (
    <path fill="none" d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" fill="none" />
      <path fill="none" d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" />,
  close: (
    <path
      fill="none"
      d="M18 6L6 18M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-left': (
    <path fill="none" d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-right': (
    <path fill="none" d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-down': (
    <path fill="none" d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" fill="none" />
      <g strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
      </g>
    </>
  ),
  moon: <path fill="none" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />,
  menu: (
    <g strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </g>
  ),
  film: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" />
      <line x1="7" y1="4" x2="7" y2="20" />
      <line x1="17" y1="4" x2="17" y2="20" />
      <line x1="3" y1="9" x2="7" y2="9" />
      <line x1="3" y1="15" x2="7" y2="15" />
      <line x1="17" y1="9" x2="21" y2="9" />
      <line x1="17" y1="15" x2="21" y2="15" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" />
      <path fill="none" d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" strokeLinecap="round" />
    </>
  ),
  sort: (
    <path
      fill="none"
      d="M7 4v16m0 0l-3-3m3 3l3-3M17 20V4m0 0l3 3m-3-3l-3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  filter: <path fill="none" d="M4 5h16l-6 8v6l-4-2v-4z" strokeLinejoin="round" />,
  home: (
    <path
      fill="none"
      d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"
      strokeLinejoin="round"
    />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  'bar-chart': (
    <g strokeLinecap="round">
      <line x1="6" y1="20" x2="6" y2="12" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="14" />
    </g>
  ),
  trash: (
    <path
      fill="none"
      d="M4 7h16M9 7V4h6v3m-8 0l1 13a1 1 0 001 1h6a1 1 0 001-1l1-13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'alert-triangle': (
    <>
      <path fill="none" d="M12 3l10 18H2z" strokeLinejoin="round" />
      <line x1="12" y1="9" x2="12" y2="14" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.6" />
    </>
  ),
  refresh: (
    <path
      fill="none"
      d="M20 11A8 8 0 105.5 16.5M20 11V5m0 6h-6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
