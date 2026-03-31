import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { User } from '@/types/user';
import { useUserStore } from '@/store/userStore';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  isArchived?: boolean;
}

export function UserCard({ user, isArchived = false }: UserCardProps) {
  const navigate = useNavigate();
  const { archiveUser, hideUser, restoreUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleEdit = () => { setOpen(false); navigate(`/edit/${user.id}`); };
  const handleArchive = () => { setOpen(false); archiveUser(user.id); };
  const handleHide = () => { setOpen(false); hideUser(user.id); };
  const handleRestore = () => { setOpen(false); restoreUser(user.id); };

  return (
    <div className={`${styles.card} ${isArchived ? styles.archived : ''}`}>
      <div className={styles.photoWrap}>
        <img
          src={user.avatar}
          alt={user.username}
          className={styles.photo}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.info}>
            <p className={styles.username}>{user.username}</p>
            <p className={styles.company}>{user.companyName}</p>
          </div>

          <div className={styles.menuWrap} ref={menuRef}>
            <button
              className={styles.menuBtn}
              onClick={() => setOpen((v) => !v)}
              aria-label="Действия"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5"  r="1.5"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>

            {open && (
              <div className={styles.dropdown}>
                {isArchived ? (
                  <button className={styles.dropItem} onClick={handleRestore}>Активировать</button>
                ) : (
                  <>
                    <button className={styles.dropItem} onClick={handleEdit}>Редактировать</button>
                    <button className={styles.dropItem} onClick={handleArchive}>Архивировать</button>
                    <button className={`${styles.dropItem} ${styles.dropItemDanger}`} onClick={handleHide}>Скрыть</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <p className={styles.city}>{user.city}</p>
      </div>
    </div>
  );
}

