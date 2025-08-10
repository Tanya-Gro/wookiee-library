import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import styles from './Loader.module.css';

describe('Loader', () => {
  it('render Loader', () => {
    render(<Loader />);

    const text = screen.getByText(/Loading/i);
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('info-message');

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass(styles.loader);
  });
});
