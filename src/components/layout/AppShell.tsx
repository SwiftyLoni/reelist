import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ToastContainer } from '../ui/ToastContainer';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { useUIStore } from '../../store/useUIStore';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import './AppShell.css';

export function AppShell() {
  const theme = useUIStore((state) => state.theme);
  useScrollRestoration();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="app-shell__main">
        <ErrorBoundary>
          <Suspense fallback={<div className="app-shell__loading">Loading…</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ToastContainer />
    </div>
  );
}
