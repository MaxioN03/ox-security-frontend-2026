import { type FC, useState } from 'react';
import styles from './EmployeeAvatar.module.scss';

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface EmployeeAvatarProps {
  name: string;
  imageUrl: string;
}

export const EmployeeAvatar: FC<EmployeeAvatarProps> = ({ name, imageUrl }) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !imageUrl || imageError;

  return (
    <div className={styles.wrapper}>
      {showFallback ? (
        <div className={styles.fallback} aria-hidden="true">
          {getInitials(name)}
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
          width={112}
          height={112}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
