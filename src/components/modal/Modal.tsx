import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import styles from './Modal.module.css';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
