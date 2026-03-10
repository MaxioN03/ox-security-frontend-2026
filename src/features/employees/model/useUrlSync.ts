import { useEffect, useRef } from 'react';
import type { AppDispatch } from '@/app/store';
import type { EmployeeStatusFilter } from '@/domain/status';
import { EMPLOYEE_STATUSES } from '@/domain/status';
import { setSearchTerm, setStatusFilter } from './uiSlice';

const SEARCH_PARAM = 'search';
const STATUS_PARAM = 'status';

const VALID_STATUS_FILTERS: readonly string[] = ['All', ...EMPLOYEE_STATUSES];

function isValidStatusFilter(value: string): value is EmployeeStatusFilter {
  return VALID_STATUS_FILTERS.includes(value);
}

function getParamsFromUrl(): { search: string; status: EmployeeStatusFilter } {
  const params = new URLSearchParams(window.location.search);
  const search = params.get(SEARCH_PARAM) ?? '';
  const statusParam = params.get(STATUS_PARAM);
  const status: EmployeeStatusFilter =
    statusParam && isValidStatusFilter(statusParam) ? statusParam : 'All';
  return { search, status };
}

function updateUrl(search: string, status: EmployeeStatusFilter) {
  const params = new URLSearchParams();
  if (search) params.set(SEARCH_PARAM, search);
  if (status !== 'All') params.set(STATUS_PARAM, status);
  const query = params.toString();
  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  window.history.replaceState(null, '', url);
}

export function useUrlSync(
  dispatch: AppDispatch,
  searchTerm: string,
  statusFilter: EmployeeStatusFilter,
) {
  const skipNextUrlUpdate = useRef(true);

  // Sync URL -> Redux on mount and popstate
  useEffect(() => {
    const syncFromUrl = () => {
      const { search, status } = getParamsFromUrl();
      dispatch(setSearchTerm(search));
      dispatch(setStatusFilter(status));
    };

    syncFromUrl();

    const handlePopState = () => syncFromUrl();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [dispatch]);

  // Sync Redux -> URL when user changes search/filter (skip initial run)
  useEffect(() => {
    if (skipNextUrlUpdate.current) {
      skipNextUrlUpdate.current = false;
      return;
    }
    updateUrl(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);
}
