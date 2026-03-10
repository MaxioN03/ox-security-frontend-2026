import type { FC } from 'react';
import type { EmployeeStatus } from '@/domain/status';
import { EmployeeCard } from '../EmployeeCard';
import { EmployeeCardSkeleton } from '../EmployeeCardSkeleton';
import { EmployeesEmptyState } from './EmployeesEmptyState';
import { EmployeesErrorState } from './EmployeesErrorState';
import styles from './EmployeesPage.module.scss';

interface EmployeeWithPendingStatus {
  id: number;
  name: string;
  img: string;
  status: EmployeeStatus;
  pendingStatus: EmployeeStatus;
}

interface EmployeesListContentProps {
  isLoading: boolean;
  isError: boolean;
  allEmployeesCount: number;
  employees: EmployeeWithPendingStatus[];
  isUpdating: boolean;
  onStatusChange: (
    userId: number,
    status: EmployeeStatus,
    currentStatus: EmployeeStatus,
    name: string,
  ) => void;
}

export const EmployeesListContent: FC<EmployeesListContentProps> = ({
  isLoading,
  isError,
  allEmployeesCount,
  employees,
  isUpdating,
  onStatusChange,
}) => {
  if (isLoading) {
    return (
      <ul className={styles.list}>
        {Array.from({ length: 2 }).map((_, i) => (
          <EmployeeCardSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (isError) {
    return <EmployeesErrorState />;
  }

  if (employees.length === 0) {
    return <EmployeesEmptyState hasEmployees={allEmployeesCount > 0} />;
  }

  return (
    <ul className={styles.list}>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          id={employee.id}
          name={employee.name}
          imageUrl={employee.img}
          currentStatus={employee.status}
          pendingStatus={employee.pendingStatus}
          isUpdating={isUpdating}
          onStatusChange={(userId, status) =>
            onStatusChange(userId, status, employee.status, employee.name)
          }
        />
      ))}
    </ul>
  );
};
