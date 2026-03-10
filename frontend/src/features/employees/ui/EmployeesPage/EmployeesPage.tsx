import type { FC } from 'react';
import { useEmployeesPage } from '../../model/useEmployeesPage';
import { ConfirmStatusChangeModal } from '../ConfirmStatusChangeModal';
import { CreateUserModal } from '../CreateUserModal';
import { EmployeesHeader } from '../EmployeesHeader';
import { EmployeesToolbar } from '../EmployeesToolbar';
import { EmployeesListContent } from './EmployeesListContent';
import styles from './EmployeesPage.module.scss';

export const EmployeesPage: FC = () => {
  const {
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
  } = useEmployeesPage();

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
            onSearchTermChange={handleSearchTermChange}
            onStatusFilterChange={handleStatusFilterChange}
            onCreateClick={openCreateModal}
          />
        </div>

        <EmployeesListContent
          isLoading={isLoading}
          isError={isError}
          allEmployeesCount={allEmployees.length}
          employees={employeesWithPendingStatus}
          isUpdating={isUpdating}
          onStatusChange={handleStatusChangeRequest}
        />
      </section>

      <CreateUserModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />

      <ConfirmStatusChangeModal
        isOpen={confirmModal !== null}
        employeeName={confirmModal?.name ?? ''}
        currentStatus={confirmModal?.currentStatus ?? 'Working'}
        newStatus={confirmModal?.newStatus ?? 'Working'}
        isUpdating={isUpdating}
        onConfirm={handleStatusChangeConfirm}
        onClose={closeConfirmModal}
      />
    </div>
  );
};
