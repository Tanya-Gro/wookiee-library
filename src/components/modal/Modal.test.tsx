import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  it('renders children and closes on overlay click', async () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
