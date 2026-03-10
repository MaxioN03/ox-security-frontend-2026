import { type FC } from 'react';
import {
  EMPLOYEE_STATUSES,
  EMPLOYEE_STATUS_LABELS,
  type EmployeeStatus,
} from '@/domain/status';
import styles from './EmployeeStatusSelect.module.scss';

interface EmployeeStatusSelectProps {
  value: EmployeeStatus;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  onChange: (status: EmployeeStatus) => void;
}

export const EmployeeStatusSelect: FC<EmployeeStatusSelectProps> = ({
  value,
  disabled = false,
  id,
  'aria-label': ariaLabel,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <span
        className={`${styles.ring} ${styles[`ring${value}` as keyof typeof styles]}`}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <select
          className={styles.select}
          id={id}
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value as EmployeeStatus)}
          disabled={disabled}
        >
          {EMPLOYEE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {EMPLOYEE_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <svg
          className={styles.arrow}
          viewBox="0 0 24 24"
          width={12}
          height={12}
          aria-hidden="true"
        >
          <path d="M6 9 L12 15 L18 9 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};
