import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  filterEmployees,
  selectFilteredAndSearchedEmployees,
} from './selectors';
import { employeesUiReducer, setSearchTerm, setStatusFilter } from './uiSlice';
import { usersApi } from '@/infrastructure/api/usersApi';
import type { Employee } from '@/domain/employee';

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', status: 'Working', img: '' },
  { id: 2, name: 'Bob Smith', status: 'OnVacation', img: '' },
  { id: 3, name: 'Charlie Brown', status: 'Working', img: '' },
  { id: 4, name: 'Diana Prince', status: 'LunchTime', img: '' },
  { id: 5, name: 'Eve Wilson', status: 'BusinessTrip', img: '' },
];

const createStore = () =>
  configureStore({
    reducer: {
      employeesUi: employeesUiReducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });

describe('filterEmployees (main page search & status filter logic)', () => {
  it('returns all employees when filter is All and search is empty', () => {
    const result = filterEmployees(mockEmployees, '', 'All');
    expect(result).toHaveLength(5);
    expect(result.map((e) => e.name)).toEqual([
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'Diana Prince',
      'Eve Wilson',
    ]);
  });

  it('filters by status when status filter is set', () => {
    const result = filterEmployees(mockEmployees, '', 'Working');
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.name)).toEqual([
      'Alice Johnson',
      'Charlie Brown',
    ]);
  });

  it('filters by search term (case insensitive)', () => {
    const result = filterEmployees(mockEmployees, 'alice', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Johnson');
  });

  it('trims and lowercases search term', () => {
    const result = filterEmployees(mockEmployees, '  BOB  ', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bob Smith');
  });

  it('combines status filter and search term', () => {
    const result = filterEmployees(mockEmployees, 'charlie', 'Working');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Charlie Brown');
  });

  it('returns empty array when no employees match both filters', () => {
    const result = filterEmployees(mockEmployees, 'charlie', 'OnVacation');
    expect(result).toHaveLength(0);
  });

  it('returns empty array when no employees provided', () => {
    const result = filterEmployees([], '', 'All');
    expect(result).toHaveLength(0);
  });
});

describe('selectFilteredAndSearchedEmployees (full flow: store + selector)', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(mockEmployees), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        ),
      ),
    );
  });

  it('filters by search term when user types in toolbar', async () => {
    const store = createStore();
    await store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));
    store.dispatch(setSearchTerm('alice'));

    const result = selectFilteredAndSearchedEmployees(store.getState());
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Johnson');
  });

  it('filters by status when user selects from dropdown', async () => {
    const store = createStore();
    await store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));
    store.dispatch(setStatusFilter('Working'));

    const result = selectFilteredAndSearchedEmployees(store.getState());
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.name)).toEqual([
      'Alice Johnson',
      'Charlie Brown',
    ]);
  });

  it('combines search and status filter like user actions on main page', async () => {
    const store = createStore();
    await store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));
    store.dispatch(setSearchTerm('charlie'));
    store.dispatch(setStatusFilter('Working'));

    const result = selectFilteredAndSearchedEmployees(store.getState());
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Charlie Brown');
  });

  it('returns empty when no match (shows "No employees match your filters")', async () => {
    const store = createStore();
    await store.dispatch(usersApi.endpoints.getUsers.initiate(undefined));
    store.dispatch(setSearchTerm('xyz'));
    store.dispatch(setStatusFilter('OnVacation'));

    const result = selectFilteredAndSearchedEmployees(store.getState());
    expect(result).toHaveLength(0);
  });
});
