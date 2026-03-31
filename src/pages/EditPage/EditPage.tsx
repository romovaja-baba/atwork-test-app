import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/store/userStore';
import { Loader } from '@/components/Loader/Loader';
import { Popup } from '@/components/Popup/Popup';
import { editUserSchema, type EditUserSchema } from './editUserSchema';
import styles from './EditPage.module.scss';

const NAV_ITEMS = [
  { label: 'Данные профиля', active: true },
  { label: 'Рабочее пространство', active: false },
  { label: 'Приватность', active: false },
  { label: 'Безопасность', active: false },
];

export function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useUserStore();
  const [showPopup, setShowPopup] = useState(false);

  const user = getUserById(Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.city,
          phone: user.phone.replace(/\D/g, ''),
          companyName: user.companyName,
        }
      : undefined,
  });

  const onSubmit = (data: EditUserSchema) => {
    updateUser(Number(id), {
      name: data.name,
      username: data.username,
      email: data.email,
      city: data.city,
      phone: data.phone,
      companyName: data.companyName,
    });
    setShowPopup(true);
  };

  const handleClosePopup = useCallback(() => setShowPopup(false), []);

  if (!user) {
    return <Loader message="Загружаем данные пользователя..." />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <img
              src={user.avatar}
              alt={user.username}
              className={styles.sidebarPhoto}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
              }}
            />
            <nav className={styles.sidebarNav}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}>
                  {item.label}
                </div>
              ))}
            </nav>
          </aside>

          <div className={styles.formPanel}>
            <h1 className={styles.formTitle}>Данные профиля</h1>
            <hr className={styles.divider} />

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Имя</label>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  {...register('name')}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Никнейм</label>
                <input
                  className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                  type="text"
                  {...register('username')}
                />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Почта</label>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  {...register('email')}
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Город</label>
                <input
                  className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                  type="text"
                  {...register('city')}
                />
                {errors.city && <span className={styles.error}>{errors.city.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel"
                  {...register('phone', {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, '');
                    },
                  })}
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Название компании</label>
                <input
                  className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                  type="text"
                  {...register('companyName')}
                />
                {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}
              </div>

              <button
                type="submit"
                className={styles.btnSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && <Popup message="Изменения сохранены!" onClose={handleClosePopup} />}
    </main>
  );
}

