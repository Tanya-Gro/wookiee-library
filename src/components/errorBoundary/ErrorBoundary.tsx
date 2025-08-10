import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(
      `Error caught by ErrorBoundary:\n${error}\n\n Component stack:\n${info.componentStack}`
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="card-list column">
          <h2 className="info-message">😢 Something went wrong</h2>
          <p className="info-message">
            Please try refreshing the page or coming back later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
