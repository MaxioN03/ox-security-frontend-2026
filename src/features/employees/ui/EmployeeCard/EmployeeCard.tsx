import { type FC } from 'react';
import type { EmployeeStatus } from '../../../../domain/status';
import { EmployeeAvatar } from './EmployeeAvatar';
import { EmployeeStatusSelect } from './EmployeeStatusSelect';
import styles from './EmployeeCard.module.scss';

interface EmployeeCardProps {
  id: number;
  name: string;
  imageUrl: string;
  currentStatus: EmployeeStatus;
  pendingStatus: EmployeeStatus;
  isUpdating: boolean;
  onStatusChange: (userId: number, status: EmployeeStatus) => void;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({
  id,
  name,
  imageUrl,
  currentStatus,
  pendingStatus,
  isUpdating,
  onStatusChange,
}) => {
  const handleSelectChange = (newStatus: EmployeeStatus) => {
    if (newStatus !== currentStatus) {
      onStatusChange(id, newStatus);
    }
  };

  return (
    <li className={styles.root}>
      <EmployeeAvatar name={name} imageUrl={imageUrl} />
      <div className={styles.right}>
        <p className={styles.name}>{name}</p>
        <EmployeeStatusSelect
          value={pendingStatus}
          disabled={isUpdating}
          onChange={handleSelectChange}
        />
      </div>
    </li>
  );
};
