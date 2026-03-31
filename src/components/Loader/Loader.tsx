import styles from './Loader.module.scss';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
