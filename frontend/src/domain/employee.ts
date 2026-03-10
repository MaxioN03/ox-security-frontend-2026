import type { EmployeeStatus } from './status';

export interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  img: string;
}
