import type { ReactNode } from 'react';

import { handleDownload } from '../../helpers/handleDownload';
import { useCheckListStore } from '../../store/useCheckList';
import Button from '../UI/button/Button';
import buttonStyles from '../UI/button/Button.module.css';
import styles from './flyout.module.css';

const Flyout = (): ReactNode => {
  const { selectedCards, deleteCards } = useCheckListStore((state) => state);

  return (
    <div className={styles.flyout}>
      <span className="info-message">
        Selected {selectedCards.length} cards
      </span>
      <Button onClick={deleteCards}>Unselect All</Button>
      <a
        className={buttonStyles.button + ' ' + styles.link}
        href={handleDownload(selectedCards)}
        download={`${selectedCards.length}_wookiee_cards.csv`}
      >
        Download
      </a>
    </div>
  );
};

export default Flyout;
