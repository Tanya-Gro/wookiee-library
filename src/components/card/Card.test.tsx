import type { Data } from '@/schemas/types';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card component', () => {
  it('renders correctly with valid data', () => {
    const mockData: Data = {
      name: 'Anna Ivanova',
      age: 18,
      email: 'ann@ex.ru',
      password: '*******',
      gender: 'female',
      country: 'Russia',
      picture: 'data:image/png;base64,xxxx',
    };

    render(<Card data={mockData} />);

    expect(screen.getByText(/Anna Ivanova/)).toBeInTheDocument();
    expect(screen.getByText(/18 years/)).toBeInTheDocument();
    expect(screen.getByText(/ann@ex.ru/)).toBeInTheDocument();
    expect(screen.getByText(/female/)).toBeInTheDocument();
    expect(screen.getByText(/Russia/)).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByAltText('Preview');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('data:image/png;base64,xxxx');
  });
});
