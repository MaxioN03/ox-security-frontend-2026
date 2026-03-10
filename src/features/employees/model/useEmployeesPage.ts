import { useMemo, useState } from 'react';
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
} from './selectors';
import type { EmployeeStatusFilter } from '@/domain/status';
import {
  clearPendingStatus,
  setPendingStatus,
  setSearchTerm,
  setStatusFilter,
} from './uiSlice';
import { useUrlSync } from './useUrlSync';

export interface ConfirmModalState {
  userId: number;
  name: string;
  currentStatus: EmployeeStatus;
  newStatus: EmployeeStatus;
}

export function useEmployeesPage() {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useGetUsersQuery();
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(
    null,
  );

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

  const handleSearchTermChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleStatusFilterChange = (value: string) => {
    dispatch(setStatusFilter(value as EmployeeStatusFilter));
  };

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

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeConfirmModal = () => setConfirmModal(null);

  return {
    isLoading,
    isError,
    isUpdating,
    searchTerm,
    statusFilter,
    allEmployees,
    employeesWithPendingStatus,
    isCreateModalOpen,
    confirmModal,
    handleSearchTermChange,
    handleStatusFilterChange,
    handleStatusChangeRequest,
    handleStatusChangeConfirm,
    openCreateModal,
    closeCreateModal,
    closeConfirmModal,
  };
}
