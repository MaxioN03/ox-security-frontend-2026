import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { usersApi } from '@/infrastructure/api/usersApi';

const selectUsersQueryResult = usersApi.endpoints.getUsers.select();

export const selectEmployeesUiState = (state: RootState) => state.employeesUi;

export const selectSearchTerm = createSelector(
  selectEmployeesUiState,
  (employeesUi) => employeesUi.searchTerm.trim().toLowerCase(),
);

export const selectStatusFilter = createSelector(
  selectEmployeesUiState,
  (employeesUi) => employeesUi.statusFilter,
);

export const selectPendingStatusByUserId = createSelector(
  selectEmployeesUiState,
  (employeesUi) => employeesUi.pendingStatusByUserId,
);

export const selectAllEmployees = createSelector(
  selectUsersQueryResult,
  (queryResult) => queryResult.data ?? [],
);

export const selectFilteredAndSearchedEmployees = createSelector(
  [selectAllEmployees, selectSearchTerm, selectStatusFilter],
  (employees, searchTerm, statusFilter) =>
    employees.filter((employee) => {
      const hasMatchingStatus =
        statusFilter === 'All' || employee.status === statusFilter;
      const hasMatchingName =
        searchTerm.length === 0 ||
        employee.name.toLowerCase().includes(searchTerm);

      return hasMatchingStatus && hasMatchingName;
    }),
);
