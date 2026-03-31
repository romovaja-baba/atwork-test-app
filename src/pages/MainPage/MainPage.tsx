import { useEffect } from 'react';
import { useUsersQuery } from '@/hooks/useUsers';
import { useUserStore } from '@/store/userStore';
import { UserCard } from '@/components/UserCard/UserCard';
import { Loader } from '@/components/Loader/Loader';
import styles from './MainPage.module.scss';

export function MainPage() {
  const { data, isLoading, isError } = useUsersQuery();
  const { users, initUsers } = useUserStore();

  useEffect(() => {
    if (data) initUsers(data);
  }, [data, initUsers]);

  const activeUsers = users.filter((u) => u.status === 'active');
  const archivedUsers = users.filter((u) => u.status === 'archived');

  if (isLoading) {
    return <Loader message="Загружаем пользователей..." />;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <p>Не удалось загрузить данные. Проверьте подключение и попробуйте снова.</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Активные</h2>
            <hr className={styles.sectionDivider} />
          </div>

          {activeUsers.length === 0 ? (
            <div className={styles.empty}>
              <p>Нет активных пользователей</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {activeUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </section>

        {archivedUsers.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Архив</h2>
              <hr className={styles.sectionDivider} />
            </div>
            <div className={styles.grid}>
              {archivedUsers.map((user) => (
                <UserCard key={user.id} user={user} isArchived />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
