import { describe, it, expect } from 'vitest';
import {
  employeesUiReducer,
  setSearchTerm,
  setStatusFilter,
  setPendingStatus,
  clearPendingStatus,
  clearAllPendingStatuses,
} from './uiSlice';

const initialState = {
  searchTerm: '',
  statusFilter: 'All' as const,
  pendingStatusByUserId: {},
};

describe('employeesUiSlice', () => {
  describe('setSearchTerm', () => {
    it('updates search term', () => {
      const state = employeesUiReducer(initialState, setSearchTerm('john'));
      expect(state.searchTerm).toBe('john');
    });

    it('replaces previous search term', () => {
      let state = employeesUiReducer(initialState, setSearchTerm('alice'));
      state = employeesUiReducer(state, setSearchTerm('bob'));
      expect(state.searchTerm).toBe('bob');
    });
  });

  describe('setStatusFilter', () => {
    it('updates status filter', () => {
      const state = employeesUiReducer(
        initialState,
        setStatusFilter('Working'),
      );
      expect(state.statusFilter).toBe('Working');
    });

    it('can set filter to All', () => {
      let state = employeesUiReducer(
        initialState,
        setStatusFilter('OnVacation'),
      );
      state = employeesUiReducer(state, setStatusFilter('All'));
      expect(state.statusFilter).toBe('All');
    });
  });

  describe('setPendingStatus', () => {
    it('adds pending status for user', () => {
      const state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'OnVacation' }),
      );
      expect(state.pendingStatusByUserId[1]).toBe('OnVacation');
    });

    it('overwrites existing pending status for same user', () => {
      let state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'Working' }),
      );
      state = employeesUiReducer(
        state,
        setPendingStatus({ userId: 1, status: 'LunchTime' }),
      );
      expect(state.pendingStatusByUserId[1]).toBe('LunchTime');
    });

    it('tracks multiple users independently', () => {
      let state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'Working' }),
      );
      state = employeesUiReducer(
        state,
        setPendingStatus({ userId: 2, status: 'OnVacation' }),
      );
      expect(state.pendingStatusByUserId[1]).toBe('Working');
      expect(state.pendingStatusByUserId[2]).toBe('OnVacation');
    });
  });

  describe('clearPendingStatus', () => {
    it('removes pending status for user', () => {
      let state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'Working' }),
      );
      state = employeesUiReducer(state, clearPendingStatus(1));
      expect(state.pendingStatusByUserId[1]).toBeUndefined();
    });

    it('does not affect other users', () => {
      let state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'Working' }),
      );
      state = employeesUiReducer(
        state,
        setPendingStatus({ userId: 2, status: 'OnVacation' }),
      );
      state = employeesUiReducer(state, clearPendingStatus(1));
      expect(state.pendingStatusByUserId[2]).toBe('OnVacation');
    });
  });

  describe('clearAllPendingStatuses', () => {
    it('clears all pending statuses', () => {
      let state = employeesUiReducer(
        initialState,
        setPendingStatus({ userId: 1, status: 'Working' }),
      );
      state = employeesUiReducer(
        state,
        setPendingStatus({ userId: 2, status: 'OnVacation' }),
      );
      state = employeesUiReducer(state, clearAllPendingStatuses());
      expect(state.pendingStatusByUserId).toEqual({});
    });
  });
});
