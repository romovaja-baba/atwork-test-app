import logo from '@/assets/logo.svg';
import styles from './Header.module.scss';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="at-work" className={styles.logoImg} />
        </a>
        <ProfileMenu />
      </div>
    </header>
  );
}
