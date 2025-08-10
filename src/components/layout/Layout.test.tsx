import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Layout';

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

    const AboutLink = screen.getByRole('link', ROLE_OPTIONS.aboutLink);
    expect(AboutLink).toBeInTheDocument();
  });
});
