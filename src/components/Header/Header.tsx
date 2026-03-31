import logo from '@/assets/logo.svg';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="at-work" className={styles.logoImg} />
        </a>
      </div>
    </header>
  );
}
