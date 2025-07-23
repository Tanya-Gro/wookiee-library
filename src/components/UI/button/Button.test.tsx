import Button from './Button';
import { render, screen } from '@testing-library/react';
import styles from './Button.module.css';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  const ROLE_OPTIONS = { name: 'Button' };

  it('render Button component enabled by default', () => {
    render(<Button onClick={() => {}}>{ROLE_OPTIONS.name}</Button>);

    const button = screen.getByRole('button', ROLE_OPTIONS);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.button);
    expect(button).not.toBeDisabled();
  });

  it('render Button component with onClick event', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>{ROLE_OPTIONS.name}</Button>);

    const button = screen.getByRole('button', ROLE_OPTIONS);
    await user.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });

  it('render Button component with disabled prop = true', () => {
    render(
      <Button onClick={() => {}} disabled={true}>
        {ROLE_OPTIONS.name}
      </Button>
    );

    const button = screen.getByRole('button', ROLE_OPTIONS);
    expect(button).toBeDisabled();
  });

  it('render Button component with disabled prop = false', () => {
    render(
      <Button onClick={() => {}} disabled={false}>
        {ROLE_OPTIONS.name}
      </Button>
    );

    const button = screen.getByRole('button', ROLE_OPTIONS);
    expect(button).not.toBeDisabled();
  });
});
