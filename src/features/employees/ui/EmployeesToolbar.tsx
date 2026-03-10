import { type FC, useEffect, useRef, useState } from 'react';
import {
  EMPLOYEE_STATUSES,
  EMPLOYEE_STATUS_LABELS,
  type EmployeeStatusFilter,
} from '@/domain/status';
import styles from './EmployeesToolbar.module.scss';

interface EmployeesToolbarProps {
  searchTerm: string;
  statusFilter: EmployeeStatusFilter;
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: EmployeeStatusFilter) => void;
  onCreateClick: () => void;
}

const SEARCH_DEBOUNCE_MS = 300;

export const EmployeesToolbar: FC<EmployeesToolbarProps> = ({
  searchTerm,
  statusFilter,
  onSearchTermChange,
  onStatusFilterChange,
  onCreateClick,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => onSearchTermChange(value),
      SEARCH_DEBOUNCE_MS,
    );
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.createButton}
        onClick={onCreateClick}
        aria-label="Create new employee"
      >
        Create
        <svg
          className={styles.createIcon}
          viewBox="0 0 24 24"
          width={28}
          height={28}
          aria-hidden="true"
        >
          <line
            x1="12"
            y1="4"
            x2="12"
            y2="20"
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="nonScalingStroke"
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="nonScalingStroke"
          />
        </svg>
      </button>

      <div className={styles.searchFilterModule}>
        <div className={styles.searchInputWrapper} onClick={focusSearchInput}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width={18}
            height={18}
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            />
            <line
              x1="16"
              y1="16"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={searchInputRef}
            className={styles.searchInput}
            type="search"
            value={localSearch}
            placeholder="Type to search"
            aria-label="Search employees by name"
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>

        <div className={styles.searchFilterDivider} aria-hidden="true" />

        <div className={styles.filterSelectWrapper}>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            aria-label="Filter by status"
            onChange={(event) =>
              onStatusFilterChange(event.target.value as EmployeeStatusFilter)
            }
          >
            <option value="All">Filter by status</option>
            {EMPLOYEE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {EMPLOYEE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <svg
            className={styles.filterSelectArrow}
            viewBox="0 0 24 24"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <path d="M6 9 L12 15 L18 9 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};
