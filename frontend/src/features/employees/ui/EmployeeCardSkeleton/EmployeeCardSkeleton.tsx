import type { FC } from 'react';
import styles from './EmployeeCardSkeleton.module.scss';

export const EmployeeCardSkeleton: FC = () => {
  return (
    <li className={styles.root}>
      <div className={styles.avatar} />
      <div className={styles.right}>
        <div className={styles.name} />
        <div className={styles.statusLine} />
      </div>
    </li>
  );
};
