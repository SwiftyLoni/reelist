import { Icon } from '../ui/Icon';
import './RatingSelector.css';

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const STEPS = [0, 2, 4, 6, 7, 8, 9];

export function RatingSelector({ value, onChange }: RatingSelectorProps) {
  return (
    <div className="rating-selector" role="group" aria-label="Minimum rating">
      {STEPS.map((step) => (
        <button
          key={step}
          type="button"
          className={`rating-selector__step${value === step ? ' rating-selector__step--active' : ''}`}
          onClick={() => onChange(step)}
          aria-pressed={value === step}
        >
          {step === 0 ? (
            'Any'
          ) : (
            <>
              <Icon name="star" size={13} />
              {step}+
            </>
          )}
        </button>
      ))}
    </div>
  );
}
