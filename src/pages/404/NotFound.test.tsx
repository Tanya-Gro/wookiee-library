import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFound';

describe('NotFoundPage', () => {
  const ROLE_OPTIONS = { name: /back to base/i };
  it('renders title, subtitle and button', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      '404 - Not Found'
    );
    expect(screen.getByText(/this is not the page/i)).toBeInTheDocument();

    const button = screen.getByRole('button', ROLE_OPTIONS);
    expect(button).toBeInTheDocument();
  });
});
