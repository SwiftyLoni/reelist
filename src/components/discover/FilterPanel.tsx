import type { ReactNode } from 'react';
import './FilterPanel.css';

interface FilterPanelProps {
  children: ReactNode;
}

interface FilterPanelSectionProps {
  title: string;
  children: ReactNode;
}

function FilterPanelRoot({ children }: FilterPanelProps) {
  return <div className="filter-panel">{children}</div>;
}

function Section({ title, children }: FilterPanelSectionProps) {
  return (
    <div className="filter-panel__section">
      <h3 className="filter-panel__section-title">{title}</h3>
      {children}
    </div>
  );
}

export const FilterPanel = Object.assign(FilterPanelRoot, { Section });
