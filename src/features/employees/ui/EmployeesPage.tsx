import { type FC, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { EmployeeStatus } from '@/domain/status';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '@/infrastructure/api/usersApi';
import {
  selectAllEmployees,
  selectEmployeesUiState,
  selectFilteredAndSearchedEmployees,
  selectPendingStatusByUserId,
} from '../model/selectors';
import {
  clearPendingStatus,
  setPendingStatus,
  setSearchTerm,
  setStatusFilter,
} from '../model/uiSlice';
import { useUrlSync } from '../model/useUrlSync';
import { ConfirmStatusChangeModal } from './ConfirmStatusChangeModal';
import { CreateUserModal } from './CreateUserModal';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeCardSkeleton } from './EmployeeCardSkeleton';
import { EmployeesHeader } from './EmployeesHeader';
import { EmployeesToolbar } from './EmployeesToolbar';
import styles from './EmployeesPage.module.scss';

export const EmployeesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useGetUsersQuery();
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    userId: number;
    name: string;
    currentStatus: EmployeeStatus;
    newStatus: EmployeeStatus;
  } | null>(null);

  const { searchTerm, statusFilter } = useAppSelector(selectEmployeesUiState);
  const allEmployees = useAppSelector(selectAllEmployees);
  const employees = useAppSelector(selectFilteredAndSearchedEmployees);
  const pendingStatusByUserId = useAppSelector(selectPendingStatusByUserId);

  useUrlSync(dispatch, searchTerm, statusFilter);

  const employeesWithPendingStatus = useMemo(
    () =>
      employees.map((employee) => ({
        ...employee,
        pendingStatus: pendingStatusByUserId[employee.id] ?? employee.status,
      })),
    [employees, pendingStatusByUserId],
  );

  const handleStatusChangeRequest = (
    userId: number,
    newStatus: EmployeeStatus,
    currentStatus: EmployeeStatus,
    name: string,
  ) => {
    if (newStatus === currentStatus) return;
    setConfirmModal({ userId, name, currentStatus, newStatus });
  };

  const handleStatusChangeConfirm = async () => {
    if (!confirmModal) return;
    const { userId, newStatus } = confirmModal;
    dispatch(setPendingStatus({ userId, status: newStatus }));
    setConfirmModal(null);
    try {
      await updateUserStatus({ userId, status: newStatus }).unwrap();
      dispatch(clearPendingStatus(userId));
      toast.success('Status updated');
    } catch {
      dispatch(clearPendingStatus(userId));
      toast.error('Failed to update status');
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <EmployeesHeader />
      </div>

      <section className={styles.page}>
        <div className={styles.toolbarWrapper}>
          <EmployeesToolbar
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchTermChange={(value) => dispatch(setSearchTerm(value))}
            onStatusFilterChange={(value) => dispatch(setStatusFilter(value))}
            onCreateClick={() => setIsModalOpen(true)}
          />
        </div>

        {isLoading && (
          <ul className={styles.list}>
            {Array.from({ length: 2 }).map((_, i) => (
              <EmployeeCardSkeleton key={i} />
            ))}
          </ul>
        )}

        {isError ? (
          <p className={`${styles.stateMessage} ${styles.stateError}`}>
            Couldn&apos;t load employees. Please try again later.
          </p>
        ) : null}

        {!isLoading && !isError && employeesWithPendingStatus.length === 0 ? (
          <p className={styles.stateMessage}>
            {allEmployees.length === 0
              ? 'No employees yet.'
              : 'No employees match your filters.'}
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
                  handleStatusChangeRequest(
                    userId,
                    status,
                    employee.status,
                    employee.name,
                  )
                }
              />
            ))}
          </ul>
        )}
      </section>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmStatusChangeModal
        isOpen={confirmModal !== null}
        employeeName={confirmModal?.name ?? ''}
        currentStatus={confirmModal?.currentStatus ?? 'Working'}
        newStatus={confirmModal?.newStatus ?? 'Working'}
        isUpdating={isUpdating}
        onConfirm={handleStatusChangeConfirm}
        onClose={() => setConfirmModal(null)}
      />
    </div>
  );
};
