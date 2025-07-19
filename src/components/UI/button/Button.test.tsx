import Button from './Button';
import { render, screen } from '@testing-library/react';
import styles from './Button.module.css';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  const BUTTON_NAME = 'Button';

  it('render Button component enabled by default', () => {
    render(<Button onClick={() => {}}>{BUTTON_NAME}</Button>);

    const button = screen.getByRole('button', { name: BUTTON_NAME });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.button);
    expect(button).not.toBeDisabled();
  });

  it('render Button component with onClick event', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>{BUTTON_NAME}</Button>);

    const button = screen.getByRole('button', { name: BUTTON_NAME });
    await user.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });

  it('render Button component with disabled prop = true', () => {
    render(
      <Button onClick={() => {}} disabled={true}>
        {BUTTON_NAME}
      </Button>
    );

    const button = screen.getByRole('button', { name: BUTTON_NAME });
    expect(button).toBeDisabled();
  });

  it('render Button component with disabled prop = false', () => {
    render(
      <Button onClick={() => {}} disabled={false}>
        {BUTTON_NAME}
      </Button>
    );

    const button = screen.getByRole('button', { name: BUTTON_NAME });
    expect(button).not.toBeDisabled();
  });
});
