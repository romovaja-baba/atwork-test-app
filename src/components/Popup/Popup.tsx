import { useEffect } from 'react';
import styles from './Popup.module.scss';
import successIcon from '@/assets/success.svg';

interface PopupProps {
  message: string;
  onClose: () => void;
}

export function Popup({ message, onClose }: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.iconWrap}>
          <img src={successIcon} alt="at-work" height={85} width={85}/>
        </div>

        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

