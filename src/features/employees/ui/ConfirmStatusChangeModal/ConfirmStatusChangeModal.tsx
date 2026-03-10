import { type FC, useCallback } from 'react';
import type { EmployeeStatus } from '@/domain/status';
import { EMPLOYEE_STATUS_LABELS } from '@/domain/status';
import { Button, Modal, ModalActions } from '@/shared/ui';
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

export const ConfirmStatusChangeModal: FC<ConfirmStatusChangeModalProps> = ({
  isOpen,
  employeeName,
  currentStatus,
  newStatus,
  isUpdating,
  onConfirm,
  onClose,
}) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const currentLabel = EMPLOYEE_STATUS_LABELS[currentStatus];
  const newLabel = EMPLOYEE_STATUS_LABELS[newStatus];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-status-title"
      aria-describedby="confirm-status-description"
    >
      <h2 id="confirm-status-title" className={styles.title}>
        Change status?
      </h2>
      <p id="confirm-status-description" className={styles.description}>
        Change {employeeName}&apos;s status from {currentLabel} to {newLabel}?
      </p>

      <ModalActions>
        <Button variant="secondary" onClick={onClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={isUpdating}>
          {isUpdating ? 'Updating…' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  );
};
