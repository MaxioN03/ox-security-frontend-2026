import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  EmployeeStatus,
  EmployeeStatusFilter,
} from '../../../domain/status';

interface EmployeesUiState {
  searchTerm: string;
  statusFilter: EmployeeStatusFilter;
  pendingStatusByUserId: Record<number, EmployeeStatus>;
}

const initialState: EmployeesUiState = {
  searchTerm: '',
  statusFilter: 'All',
  pendingStatusByUserId: {},
};

const employeesUiSlice = createSlice({
  name: 'employeesUi',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<EmployeeStatusFilter>) {
      state.statusFilter = action.payload;
    },
    setPendingStatus(
      state,
      action: PayloadAction<{ userId: number; status: EmployeeStatus }>,
    ) {
      const { userId, status } = action.payload;
      state.pendingStatusByUserId[userId] = status;
    },
    clearPendingStatus(state, action: PayloadAction<number>) {
      delete state.pendingStatusByUserId[action.payload];
    },
    clearAllPendingStatuses(state) {
      state.pendingStatusByUserId = {};
    },
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  setPendingStatus,
  clearPendingStatus,
  clearAllPendingStatuses,
} = employeesUiSlice.actions;

export const employeesUiReducer = employeesUiSlice.reducer;
