import { type FC, useCallback, useEffect, useRef } from 'react';
import type { EmployeeStatus } from '@/domain/status';
import { EMPLOYEE_STATUS_LABELS } from '@/domain/status';
import styles from './ConfirmStatusChangeModal.module.scss';

interface ConfirmStatusChangeModalProps {
  isOpen: boolean;
  employeeName: string;
  currentStatus: EmployeeStatus;
  newStatus: EmployeeStatus;
  isUpdating: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export const ConfirmStatusChangeModal: FC<ConfirmStatusChangeModalProps> = ({
  isOpen,
  employeeName,
  currentStatus,
  newStatus,
  isUpdating,
  onConfirm,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    previousActiveElementRef.current?.focus();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    previousActiveElementRef.current =
      document.activeElement as HTMLElement | null;
    const focusables =
      modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables?.[0];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusables =
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const list = Array.from(focusables);
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  if (!isOpen) {
    return null;
  }

  const currentLabel = EMPLOYEE_STATUS_LABELS[currentStatus];
  const newLabel = EMPLOYEE_STATUS_LABELS[newStatus];

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={modalRef}
        className={styles.root}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-status-title"
        aria-describedby="confirm-status-description"
      >
        <h2 id="confirm-status-title" className={styles.title}>
          Change status?
        </h2>
        <p id="confirm-status-description" className={styles.description}>
          Change {employeeName}&apos;s status from {currentLabel} to {newLabel}?
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating…' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
