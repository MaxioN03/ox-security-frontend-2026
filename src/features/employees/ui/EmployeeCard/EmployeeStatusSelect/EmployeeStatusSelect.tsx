import { type FC } from 'react';
import {
  EMPLOYEE_STATUSES,
  EMPLOYEE_STATUS_LABELS,
  type EmployeeStatus,
} from '@/domain/status';
import { Select } from '@/shared/ui';
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
  const options = EMPLOYEE_STATUSES.map((status) => ({
    value: status,
    label: EMPLOYEE_STATUS_LABELS[status],
  }));

  const ringPrefix = (
    <span
      className={`${styles.ring} ${styles[`ring${value}` as keyof typeof styles]}`}
      aria-hidden="true"
    />
  );

  return (
    <Select
      value={value}
      options={options}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
      prefix={ringPrefix}
      onChange={(v) => onChange(v as EmployeeStatus)}
    />
  );
};
