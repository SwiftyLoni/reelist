import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <EmptyState
      icon="film"
      title="404 — Scene not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      }
    />
  );
}
