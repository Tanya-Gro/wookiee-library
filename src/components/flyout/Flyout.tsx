import type { ReactNode } from 'react';

import { handleDownload } from '../../helpers/handleDownload';
import { useCheckListStore } from '../../store/useCheckList';

import Button from '../UI/button/Button';

import styles from './flyout.module.css';

const Flyout = (): ReactNode => {
  const { selectedCards, deleteCards } = useCheckListStore((state) => state);

  return (
    <div className={styles.flyout}>
      <span className="info-message">
        Selected {selectedCards.length} cards
      </span>
      <Button onClick={deleteCards}>Unselect All</Button>
      <Button onClick={() => handleDownload(selectedCards)}>Download It</Button>
    </div>
  );
};

export default Flyout;
