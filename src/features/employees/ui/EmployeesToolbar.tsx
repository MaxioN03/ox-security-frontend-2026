import type { FC } from 'react';
import {
  EMPLOYEE_STATUSES,
  type EmployeeStatusFilter,
} from '../../../domain/status';
import styles from './EmployeesToolbar.module.scss';

interface EmployeesToolbarProps {
  searchTerm: string;
  statusFilter: EmployeeStatusFilter;
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: EmployeeStatusFilter) => void;
  onCreateClick: () => void;
}

export const EmployeesToolbar: FC<EmployeesToolbarProps> = ({
  searchTerm,
  statusFilter,
  onSearchTermChange,
  onStatusFilterChange,
  onCreateClick,
}) => {
  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.createButton}
        onClick={onCreateClick}
      >
        Create
        <span aria-hidden="true">+</span>
      </button>

      <input
        className={styles.searchInput}
        type="text"
        value={searchTerm}
        placeholder="Type to search"
        onChange={(event) => onSearchTermChange(event.target.value)}
      />

      <select
        className={styles.filterSelect}
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value as EmployeeStatusFilter)
        }
      >
        <option value="All">Filter by status</option>
        {EMPLOYEE_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
