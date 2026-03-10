import type { FC } from 'react';
import styles from './EmployeesPage.module.scss';

export const EmployeesErrorState: FC = () => (
  <p className={`${styles.stateMessage} ${styles.stateError}`}>
    Couldn&apos;t load employees. Please try again later.
  </p>
);
