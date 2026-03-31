import favoriteIcon from "@/assets/favorite.svg";
import notificationIcon from "@/assets/notification.svg";
import styles from "./ProfileMenu.module.scss";
import { useMeStore } from "@/store/meStore";

export function ProfileMenu() {
    const { me } = useMeStore();

    if (!me) {
        return (
            <div className={styles.menu}>
                <div className={styles.iconWrap}>
                    <img
                        src={favoriteIcon}
                        width={16}
                        height={16}
                        alt="favorites"
                    />
                </div>
                <div className={styles.iconWrap}>
                    <img
                        src={notificationIcon}
                        width={16}
                        height={16}
                        alt="notifications"
                    />
                </div>
                <div className={styles.profilePictureWrap}>
                    <div className={styles.avatarPlaceholder} />
                </div>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className={styles.menu}>
            <div className={styles.buttons}>
                <div className={styles.iconWrap}>
                    <img src={favoriteIcon} width={16} height={16} />
                </div>
                <div className={styles.iconWrap}>
                    <img src={notificationIcon} width={16} height={16} />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.profilePictureWrap}>
                    <img
                        src={me.avatar}
                        width={20}
                        height={20}
                        alt={me.username}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(me.name)}`;
                        }}
                    />
                </div>
                <p>{me.name}</p>
            </div>
        </div>
    );
}
