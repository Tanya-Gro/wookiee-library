import { render, screen } from '@testing-library/react';
import { useCheckListStore } from '../../store/useCheckList';
import * as downloadHelper from '../../helpers/handleDownload';
import { mockCard } from '../../test-utils/mocks/cards';
import userEvent from '@testing-library/user-event';

import Flyout from './Flyout';
const UNSELECT_ALL_ROLE_OPTIONS = { name: /Unselect All/i };
const DOWNLOAD_ROLE_OPTIONS = { name: /Download/i };
describe('Flyout', () => {
  beforeEach(() => {
    useCheckListStore.setState({ selectedCards: [] });
  });

  it('renders selected cards count and buttons', () => {
    useCheckListStore.setState({ selectedCards: [mockCard[0], mockCard[1]] });

    vi.spyOn(downloadHelper, 'handleDownload').mockReturnValue('mocked-href');

    render(<Flyout />);

    expect(screen.getByText(/Selected 2 cards/)).toBeInTheDocument();

    const unselectBtn = screen.getByRole('button', UNSELECT_ALL_ROLE_OPTIONS);
    expect(unselectBtn).toBeInTheDocument();

    const downloadLink = screen.getByRole('link', DOWNLOAD_ROLE_OPTIONS);
    expect(downloadLink).toHaveAttribute('href', 'mocked-href');
    expect(downloadLink).toHaveAttribute('download', '2_wookiee_cards.csv');
  });

  it('calls deleteCards when Unselect All clicked', async () => {
    const deleteCardsMock = vi.spyOn(
      useCheckListStore.getState(),
      'deleteCards'
    );
    useCheckListStore.setState({
      selectedCards: [mockCard[0], mockCard[1]],
    });

    vi.spyOn(downloadHelper, 'handleDownload').mockReturnValue('mocked');

    render(<Flyout />);

    const unselectAllButton = screen.getByRole(
      'button',
      UNSELECT_ALL_ROLE_OPTIONS
    );
    await userEvent.click(unselectAllButton);

    expect(deleteCardsMock).toHaveBeenCalled();
  });
});
