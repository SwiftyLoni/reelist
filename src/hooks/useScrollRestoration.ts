import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

export function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const key = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (navigationType === 'POP') {
      const saved = scrollPositions.get(key);
      window.scrollTo(0, saved ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, navigationType]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(key, window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [key]);
}
