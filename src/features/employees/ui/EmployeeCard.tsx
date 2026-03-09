import type { FC } from 'react';
import { EMPLOYEE_STATUSES, type EmployeeStatus } from '../../../domain/status';
import styles from './EmployeeCard.module.scss';

interface EmployeeCardProps {
  id: number;
  name: string;
  imageUrl: string;
  currentStatus: EmployeeStatus;
  pendingStatus: EmployeeStatus;
  isUpdating: boolean;
  onStatusChange: (userId: number, status: EmployeeStatus) => void;
  onApply: (
    userId: number,
    pendingStatus: EmployeeStatus,
    currentStatus: EmployeeStatus,
  ) => void;
}

const STATUS_COLORS: Record<EmployeeStatus, string> = {
  Working: '#34c759',
  OnVacation: '#ff7a59',
  LunchTime: '#ffc857',
  BusinessTrip: '#a66bff',
};

export const EmployeeCard: FC<EmployeeCardProps> = ({
  id,
  name,
  imageUrl,
  currentStatus,
  pendingStatus,
  isUpdating,
  onStatusChange,
  onApply,
}) => {
  const hasChanges = pendingStatus !== currentStatus;

  return (
    <li className={styles.root}>
      <div className={styles.main}>
        <img src={imageUrl} alt={name} className={styles.avatar} />
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.statusLabel}>
            <span
              className={styles.statusDot}
              style={{ backgroundColor: STATUS_COLORS[currentStatus] }}
              aria-hidden="true"
            />
            {currentStatus}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <select
          className={styles.statusSelect}
          value={pendingStatus}
          onChange={(event) =>
            onStatusChange(id, event.target.value as EmployeeStatus)
          }
        >
          {EMPLOYEE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={styles.applyButton}
          disabled={!hasChanges || isUpdating}
          onClick={() => onApply(id, pendingStatus, currentStatus)}
        >
          {isUpdating ? 'Applying...' : 'Apply'}
        </button>
      </div>
    </li>
  );
};
