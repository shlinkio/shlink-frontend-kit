import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useTimeout } from '../../hooks';
import type { InputProps } from './Input';
import { Input } from './Input';

export type SearchInputProps = Omit<InputProps, 'className' | 'onChange' | 'value'> & {
  onChange: (searchTerm: string) => void;
  containerClassName?: string;
  inputClassName?: string;
};

export const SearchInput: FC<SearchInputProps> = ({
  onChange,
  containerClassName,
  inputClassName,
  // Inputs have a default 'md' size. Search inputs are usually 'lg' as they are rendered at the top of sections
  size = 'lg',
  ...inputProps
}) => {
  const { setTimeout, clearCurrentTimeout } = useTimeout(500);
  const searchTermChanged = useCallback((newSearchTerm: string) => {
    if (!newSearchTerm) {
      // When setting an empty value, do it immediately
      clearCurrentTimeout();
      onChange(newSearchTerm);
    } else {
      setTimeout(() => onChange(newSearchTerm));
    }
  }, [clearCurrentTimeout, onChange, setTimeout]);

  return (
    <div className={clsx('tw:group tw:relative tw:focus-within:z-10', containerClassName)}>
      <FontAwesomeIcon
        icon={searchIcon}
        className={clsx(
          'tw:absolute tw:top-[50%] tw:translate-y-[-50%] tw:transition-colors',
          'tw:text-placeholder tw:group-focus-within:text-lm-text tw:dark:group-focus-within:text-dm-text',
          {
            'tw:left-3': size !== 'sm',
            'tw:scale-85 tw:left-2': size === 'sm',
          },
        )}
      />
      <Input
        type="search"
        className={clsx(
          {
            'tw:pl-9': size !== 'sm',
            'tw:pl-7': size === 'sm',
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
};
