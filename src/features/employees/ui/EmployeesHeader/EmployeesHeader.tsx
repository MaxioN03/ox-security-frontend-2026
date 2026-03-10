import type { FC } from 'react';
import { Button, Icon } from '@/shared/ui';
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
        <Icon
          name="users"
          size={28}
          color="primary"
          className={styles.logoIcon}
        />
        <h1 className={styles.title}>Employees</h1>
      </div>

      <Button
        variant="secondary"
        className={styles.logoutButton}
        onClick={onLogoutClick}
        aria-label="Log out"
      >
        Log Out
      </Button>
    </header>
  );
};
