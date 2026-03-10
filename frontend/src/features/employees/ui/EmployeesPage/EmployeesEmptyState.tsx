import type { FC } from 'react';
import styles from './EmployeesPage.module.scss';

interface EmployeesEmptyStateProps {
  hasEmployees: boolean;
}

export const EmployeesEmptyState: FC<EmployeesEmptyStateProps> = ({
  hasEmployees,
}) => (
  <p className={styles.stateMessage}>
    {hasEmployees ? 'No employees match your filters.' : 'No employees yet.'}
  </p>
);
