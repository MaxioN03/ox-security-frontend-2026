import { type FC } from 'react';
import {
  EMPLOYEE_STATUSES,
  type EmployeeStatus,
} from '../../../../../domain/status';
import styles from './EmployeeStatusSelect.module.scss';

const STATUS_COLORS: Record<EmployeeStatus, string> = {
  Working: '#34c759',
  OnVacation: '#ff7a59',
  LunchTime: '#ffc857',
  BusinessTrip: '#a66bff',
};

interface EmployeeStatusSelectProps {
  value: EmployeeStatus;
  disabled?: boolean;
  onChange: (status: EmployeeStatus) => void;
}

export const EmployeeStatusSelect: FC<EmployeeStatusSelectProps> = ({
  value,
  disabled = false,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.ring}
        style={{ borderColor: STATUS_COLORS[value] }}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <select
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value as EmployeeStatus)}
          disabled={disabled}
        >
          {EMPLOYEE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
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
