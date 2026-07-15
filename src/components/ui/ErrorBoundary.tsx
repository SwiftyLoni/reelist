import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Icon } from './Icon';
import { Button } from './Button';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Reelist crashed:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <Icon name="alert-triangle" size={32} />
          <h2>Something went wrong</h2>
          <p>{this.state.error.message || 'An unexpected error occurred.'}</p>
          <Button onClick={this.handleRetry} icon={<Icon name="refresh" size={16} />}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
