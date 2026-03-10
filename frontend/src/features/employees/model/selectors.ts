import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { usersApi } from '@/infrastructure/api/usersApi';
import type { Employee } from '@/domain/employee';
import type { EmployeeStatusFilter } from '@/domain/status';

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

export function filterEmployees(
  employees: Employee[],
  searchTerm: string,
  statusFilter: EmployeeStatusFilter,
): Employee[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  return employees.filter((employee) => {
    const hasMatchingStatus =
      statusFilter === 'All' || employee.status === statusFilter;
    const hasMatchingName =
      normalizedSearch.length === 0 ||
      employee.name.toLowerCase().includes(normalizedSearch);

    return hasMatchingStatus && hasMatchingName;
  });
}

export const selectFilteredAndSearchedEmployees = createSelector(
  [selectAllEmployees, selectSearchTerm, selectStatusFilter],
  filterEmployees,
);
