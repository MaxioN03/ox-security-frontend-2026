import { type FC, useCallback, useState } from 'react';
import type { EmployeeStatus } from '@/domain/status';
import { EmployeeStatusSelect } from '../EmployeeCard/EmployeeStatusSelect';
import { Button, Input, ModalActions } from '@/shared/ui';
import styles from './CreateUserModal.module.scss';

const NAME_PATTERN = /^[A-Za-z\s]*$/;

interface CreateUserFormProps {
  onSubmit: (name: string, status: EmployeeStatus) => void;
  onCancel: () => void;
}

export const CreateUserForm: FC<CreateUserFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<EmployeeStatus>('Working');

  const handleNameChange = (value: string) => {
    if (NAME_PATTERN.test(value)) {
      setName(value);
    }
  };

  const handleSubmit = useCallback(() => {
    onSubmit(name.trim(), status);
  }, [name, status, onSubmit]);

  return (
    <>
      <Input
        label="User name:"
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
        <EmployeeStatusSelect
          id="create-user-status"
          value={status}
          onChange={setStatus}
        />
      </div>

      <ModalActions align="start">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!name.trim()}
        >
          Create
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalActions>
    </>
  );
};
