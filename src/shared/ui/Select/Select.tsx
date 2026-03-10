import { type FC, type ReactNode } from 'react';
import { Icon } from '../Icon';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

type SelectVariant = 'default' | 'filter';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  placeholder?: string;
  prefix?: ReactNode;
  variant?: SelectVariant;
}

export const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  disabled = false,
  id,
  'aria-label': ariaLabel,
  placeholder,
  prefix,
  variant = 'default',
}) => {
  return (
    <div
      className={`${styles.wrapper} ${variant === 'filter' ? styles.variantFilter : ''}`}
    >
      {prefix}
      <div className={styles.inner}>
        <select
          className={styles.select}
          id={id}
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow}>
          <Icon name="chevronDown" size={12} color="secondary" />
        </span>
      </div>
    </div>
  );
};
