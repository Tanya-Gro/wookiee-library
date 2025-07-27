import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  const ROLE_OPTIONS = {
    homeLink: { name: /home/i },
    aboutLink: { name: /about/i },
  };

  it('render Header', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const HomeLink = screen.getByRole('link', ROLE_OPTIONS.homeLink);
    expect(HomeLink).toBeInTheDocument();
    expect(HomeLink).toHaveClass('link');

    const AboutLink = screen.getByRole('link', ROLE_OPTIONS.aboutLink);
    expect(AboutLink).toBeInTheDocument();
    expect(AboutLink).toHaveClass('link');
  });
});
