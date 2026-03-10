import { type FC, type ReactNode, useRef } from 'react';
import { useFocusTrap } from '@/shared/hooks';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClose = useFocusTrap(modalRef, { isActive: isOpen, onClose });

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
        ref={modalRef}
        className={styles.root}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </div>
    </div>
  );
};
