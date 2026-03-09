import { type FC, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { EmployeeStatus } from '../../../domain/status';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../../../infrastructure/api/usersApi';
import {
  clearPendingStatus,
  setPendingStatus,
  setSearchTerm,
  setStatusFilter,
} from '../model/uiSlice';
import {
  selectEmployeesUiState,
  selectFilteredAndSearchedEmployees,
  selectPendingStatusByUserId,
} from '../model/selectors';
import { CreateUserModal } from './CreateUserModal';
import { EmployeeCard } from './EmployeeCard';
import { EmployeesHeader } from './EmployeesHeader';
import { EmployeesToolbar } from './EmployeesToolbar';
import styles from './EmployeesPage.module.scss';

export const EmployeesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, isError } = useGetUsersQuery();
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { searchTerm, statusFilter } = useAppSelector(selectEmployeesUiState);
  const employees = useAppSelector(selectFilteredAndSearchedEmployees);
  const pendingStatusByUserId = useAppSelector(selectPendingStatusByUserId);

  const employeesWithPendingStatus = useMemo(
    () =>
      employees.map((employee) => ({
        ...employee,
        pendingStatus: pendingStatusByUserId[employee.id] ?? employee.status,
      })),
    [employees, pendingStatusByUserId],
  );

  const handleApply = async (
    userId: number,
    pendingStatus: EmployeeStatus,
    currentStatus: EmployeeStatus,
  ) => {
    if (pendingStatus === currentStatus) {
      return;
    }

    await updateUserStatus({ userId, status: pendingStatus }).unwrap();
    dispatch(clearPendingStatus(userId));
  };

  return (
    <section className={styles.layout}>
      <EmployeesHeader />

      <section className={styles.page}>
        <EmployeesToolbar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchTermChange={(value) => dispatch(setSearchTerm(value))}
          onStatusFilterChange={(value) => dispatch(setStatusFilter(value))}
          onCreateClick={() => setIsModalOpen(true)}
        />

        {isLoading || isFetching ? (
          <p className={styles.stateMessage}>Loading employees...</p>
        ) : null}

        {isError ? (
          <p className={`${styles.stateMessage} ${styles.stateError}`}>
            Failed to load employees. Please ensure backend runs on
            localhost:8000.
          </p>
        ) : null}

        {!isLoading && !isError && employeesWithPendingStatus.length === 0 ? (
          <p className={styles.stateMessage}>
            No employees match your filters.
          </p>
        ) : null}

        {!isLoading && !isError && employeesWithPendingStatus.length > 0 && (
          <ul className={styles.list}>
            {employeesWithPendingStatus.map((employee) => (
              <EmployeeCard
                key={employee.id}
                id={employee.id}
                name={employee.name}
                imageUrl={employee.img}
                currentStatus={employee.status}
                pendingStatus={employee.pendingStatus}
                isUpdating={isUpdating}
                onStatusChange={(userId, status) =>
                  dispatch(setPendingStatus({ userId, status }))
                }
                onApply={handleApply}
              />
            ))}
          </ul>
        )}
      </section>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
