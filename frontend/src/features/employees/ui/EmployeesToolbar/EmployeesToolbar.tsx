import { type FC } from 'react';
import {
  STATUS_FILTER_OPTIONS,
  type EmployeeStatusFilter,
} from '@/domain/status';
import { Button, Icon, SearchInput, Select } from '@/shared/ui';
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
  return (
    <div className={styles.root}>
      <Button
        variant="primary"
        className={styles.createButton}
        onClick={onCreateClick}
        aria-label="Create new employee"
      >
        Create
        <Icon name="plus" size={28} className={styles.createIcon} />
      </Button>

      <div className={styles.searchFilterModule}>
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange}
          debounceMs={SEARCH_DEBOUNCE_MS}
          placeholder="Type to search"
          aria-label="Search employees by name"
        />

        <div className={styles.searchFilterDivider} aria-hidden="true" />

        <div className={styles.filterSelectWrapper}>
          <Select
            variant="filter"
            value={statusFilter}
            options={STATUS_FILTER_OPTIONS}
            aria-label="Filter by status"
            onChange={(value) =>
              onStatusFilterChange(value as EmployeeStatusFilter)
            }
          />
        </div>
      </div>
    </div>
  );
};
