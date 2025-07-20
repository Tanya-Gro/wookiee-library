import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  function Bomb(): null {
    throw new Error('Woops....');
    return null;
  }

  it('render ErrorBoundary onError', async () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please try refreshing the page/i)
    ).toBeInTheDocument();
  });
});
