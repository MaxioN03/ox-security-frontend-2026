import { type FC, useCallback } from 'react';
import { Modal } from '@/shared/ui';
import { CreateUserForm } from './CreateUserForm';
import styles from './CreateUserModal.module.scss';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal: FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (_name: string, _status: string) => {
      if (typeof _name === 'string' && _name.trim()) {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      aria-labelledby="create-user-title"
      aria-describedby="create-user-description"
    >
      <header className={styles.header}>
        <h2 id="create-user-title" className={styles.title}>
          Create New User
        </h2>
        <div className={styles.divider} />
      </header>
      <p id="create-user-description" className={styles.srOnly}>
        Enter a name and status for the new employee.
      </p>

      <CreateUserForm onSubmit={handleSubmit} onCancel={handleClose} />
    </Modal>
  );
};
