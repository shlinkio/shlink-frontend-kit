import { faCircleNotch, faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { forwardRef , useCallback } from 'react';
import { useTimeout } from '..';
import type { InputProps } from './Input';
import { Input } from './Input';

export type SearchInputProps = Omit<InputProps, 'className' | 'onChange' | 'value'> & {
  onChange: (searchTerm: string) => void;
  containerClassName?: string;
  inputClassName?: string;

  /** When set to true, it displays a loading indicator in place of the magnifyinf glass icon */
  loading?: boolean;

  /**
   * Whether onChange should be triggered immediately or debounced.
   * Defaults to false.
   */
  immediate?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onChange,
  containerClassName,
  inputClassName,
  // Inputs have a default 'md' size. Search inputs are usually 'lg' as they are rendered at the top of sections
  size = 'lg',
  loading = false,
  variant = 'default',
  immediate = false,
  ...inputProps
}, ref) => {
  const { setTimeout, clearCurrentTimeout } = useTimeout(500);
  const searchTermChanged = useCallback((newSearchTerm: string) => {
    if (!newSearchTerm || immediate) {
      // When setting an empty value, do it immediately
      clearCurrentTimeout();
      onChange(newSearchTerm);
    } else {
      setTimeout(() => onChange(newSearchTerm));
    }
  }, [clearCurrentTimeout, immediate, onChange, setTimeout]);

  return (
    <div className={clsx('group relative focus-within:z-10', containerClassName)}>
      {variant === 'default' && (
        <FontAwesomeIcon
          icon={loading ? faCircleNotch : searchIcon}
          spin={loading}
          className={clsx(
            'absolute top-[50%] translate-y-[-50%] transition-colors',
            'text-placeholder group-focus-within:text-lm-text dark:group-focus-within:text-dm-text',
            {
              'left-3': size !== 'sm',
              'scale-85 left-2': size === 'sm',
            },
          )}
        />
      )}
      <Input
        ref={ref}
        variant={variant}
        type="search"
        className={clsx(
          variant === 'default' && {
            'pl-9': size !== 'sm',
            'pl-7': size === 'sm',
          },
          inputClassName,
        )}
        placeholder="Search..."
        onChange={(e) => searchTermChanged(e.target.value)}
        size={size}
        {...inputProps}
      />
    </div>
  );
});
