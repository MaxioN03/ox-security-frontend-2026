import { type FC, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  'aria-label'?: string;
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  debounceMs = 300,
  placeholder = 'Type to search',
  'aria-label': ariaLabel,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(newValue), debounceMs);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      onClick={focusInput}
      role="search"
    >
      <Icon name="search" size={18} color="muted" className={styles.icon} />
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        value={localValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
