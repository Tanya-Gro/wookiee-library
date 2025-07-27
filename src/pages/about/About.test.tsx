import { render, screen } from '@testing-library/react';
import { URLs } from '../../app/constants';
import AboutPage from './About';

describe('AboutPage', () => {
  it('renders main elements with texts and link', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Wookiee library'
    );

    expect(
      screen.getByText(/This galaxy-sized app was created by/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Tatiana Grosul')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Rolling Scopes School/i });
    expect(link).toHaveAttribute('href', URLs.RSS);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
