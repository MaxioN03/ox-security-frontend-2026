import { type FC, type InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> {
  label?: string;
  id?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input className={styles.input} id={id} {...props} />
    </div>
  );
};
