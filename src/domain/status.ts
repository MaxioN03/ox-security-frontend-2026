export const EMPLOYEE_STATUSES = [
  'Working',
  'OnVacation',
  'LunchTime',
  'BusinessTrip',
] as const;

export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[number];

export type EmployeeStatusFilter = EmployeeStatus | 'All';

export function isEmployeeStatus(value: string): value is EmployeeStatus {
  return (EMPLOYEE_STATUSES as readonly string[]).includes(value);
}
