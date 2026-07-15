import './YearRangeSlider.css';

interface YearRangeSliderProps {
  min: number;
  max: number;
  from: number;
  to: number;
  onChange: (from: number, to: number) => void;
}

export function YearRangeSlider({ min, max, from, to, onChange }: YearRangeSliderProps) {
  return (
    <div className="year-range">
      <div className="year-range__values">
        <span>{from}</span>
        <span>{to}</span>
      </div>
      <div className="year-range__track">
        <input
          type="range"
          min={min}
          max={max}
          value={from}
          aria-label="Year from"
          onChange={(e) => onChange(Math.min(Number(e.target.value), to), to)}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={to}
          aria-label="Year to"
          onChange={(e) => onChange(from, Math.max(Number(e.target.value), from))}
        />
      </div>
    </div>
  );
}
