import type { FC } from 'react';
import styles from './EmployeesHeader.module.scss';

interface EmployeesHeaderProps {
  onLogoutClick?: () => void;
}

export const EmployeesHeader: FC<EmployeesHeaderProps> = ({
  onLogoutClick,
}) => {
  return (
    <header className={styles.root}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          OX
        </span>
        <h1 className={styles.title}>Employees</h1>
      </div>

      <button
        type="button"
        className={styles.logoutButton}
        onClick={onLogoutClick}
      >
        Log Out
      </button>
    </header>
  );
};
