import { describe, it, expect } from 'vitest';
import {
  EMPLOYEE_STATUSES,
  EMPLOYEE_STATUS_LABELS,
  isEmployeeStatus,
} from './status';

describe('status', () => {
  describe('EMPLOYEE_STATUSES', () => {
    it('contains all expected statuses', () => {
      expect(EMPLOYEE_STATUSES).toEqual([
        'Working',
        'OnVacation',
        'LunchTime',
        'BusinessTrip',
      ]);
    });
  });

  describe('EMPLOYEE_STATUS_LABELS', () => {
    it('has a label for each status', () => {
      for (const status of EMPLOYEE_STATUSES) {
        expect(EMPLOYEE_STATUS_LABELS[status]).toBeDefined();
        expect(typeof EMPLOYEE_STATUS_LABELS[status]).toBe('string');
      }
    });

    it('returns correct labels for each status', () => {
      expect(EMPLOYEE_STATUS_LABELS.Working).toBe('Working');
      expect(EMPLOYEE_STATUS_LABELS.OnVacation).toBe('On Vacation');
      expect(EMPLOYEE_STATUS_LABELS.LunchTime).toBe('Lunch Time');
      expect(EMPLOYEE_STATUS_LABELS.BusinessTrip).toBe('Business Trip');
    });
  });

  describe('isEmployeeStatus', () => {
    it('returns true for valid statuses', () => {
      expect(isEmployeeStatus('Working')).toBe(true);
      expect(isEmployeeStatus('OnVacation')).toBe(true);
      expect(isEmployeeStatus('LunchTime')).toBe(true);
      expect(isEmployeeStatus('BusinessTrip')).toBe(true);
    });

    it('returns false for invalid values', () => {
      expect(isEmployeeStatus('')).toBe(false);
      expect(isEmployeeStatus('Invalid')).toBe(false);
      expect(isEmployeeStatus('working')).toBe(false);
      expect(isEmployeeStatus('WORKING')).toBe(false);
    });
  });
});
