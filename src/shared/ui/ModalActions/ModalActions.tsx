import { type FC, type ReactNode } from 'react';
import styles from './ModalActions.module.scss';

interface ModalActionsProps {
  children: ReactNode;
  align?: 'start' | 'end';
}

export const ModalActions: FC<ModalActionsProps> = ({
  children,
  align = 'end',
}) => {
  return (
    <div
      className={`${styles.root} ${align === 'start' ? styles.alignStart : styles.alignEnd}`}
    >
      {children}
    </div>
  );
};
