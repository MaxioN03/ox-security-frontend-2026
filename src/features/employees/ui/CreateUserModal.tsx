import { type FC, useState, useEffect, useCallback } from 'react';
import type { EmployeeStatus } from '../../../domain/status';
import { EmployeeStatusSelect } from './EmployeeCard/EmployeeStatusSelect';
import styles from './CreateUserModal.module.scss';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ENGLISH_LETTERS_ONLY = /^[A-Za-z]*$/;

export const CreateUserModal: FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<EmployeeStatus>('Working');

  const handleClose = useCallback(() => {
    setName('');
    setStatus('Working');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleNameChange = (value: string) => {
    if (ENGLISH_LETTERS_ONLY.test(value)) {
      setName(value);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={styles.root}
        role="dialog"
        aria-modal="true"
        aria-label="Create new user"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Create New User</h2>
          <div className={styles.divider} />
        </header>

        <label className={styles.label} htmlFor="create-user-name">
          User name:
        </label>
        <input
          className={styles.input}
          id="create-user-name"
          type="text"
          value={name}
          placeholder="e.g. John Smith"
          onChange={(event) => handleNameChange(event.target.value)}
        />

        <label className={styles.label} htmlFor="create-user-status">
          Status:
        </label>
        <div className={styles.statusSelectWrapper}>
          <EmployeeStatusSelect value={status} onChange={setStatus} />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.createButton}
            onClick={handleClose}
            disabled={!name.trim()}
          >
            Create
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
