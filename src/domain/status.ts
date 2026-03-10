export const EMPLOYEE_STATUSES = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
] as const;

export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[number];

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  Working: 'Working',
  OnVacation: 'On Vacation',
  LunchTime: 'Lunch Time',
  BusinessTrip: 'Business Trip',
};

export type EmployeeStatusFilter = EmployeeStatus | 'All';

export function isEmployeeStatus(value: string): value is EmployeeStatus {
  return (EMPLOYEE_STATUSES as readonly string[]).includes(value);
}

export const STATUS_FILTER_OPTIONS: {
  value: EmployeeStatusFilter;
  label: string;
}[] = [
  { value: 'All', label: 'Filter by status' },
  ...EMPLOYEE_STATUSES.map((status) => ({
    value: status as EmployeeStatusFilter,
    label: EMPLOYEE_STATUS_LABELS[status],
  })),
];
