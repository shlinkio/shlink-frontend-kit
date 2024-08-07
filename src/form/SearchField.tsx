import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { useState } from 'react';
import './SearchField.scss';

const DEFAULT_SEARCH_INTERVAL = 500;
let timer: NodeJS.Timeout | null;
const resetTimer = () => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = null;
};

type SearchFieldProps = {
  onChange: (value: string) => void;
  className?: string;
  large?: boolean;
  noBorder?: boolean;
  initialValue?: string;
  setTimeout_?: typeof setTimeout,
};

export const SearchField = (
  { onChange, className, large = true, noBorder = false, initialValue = '', setTimeout_ = setTimeout }: SearchFieldProps,
) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const searchTermChanged = (newSearchTerm: string, timeout = DEFAULT_SEARCH_INTERVAL) => {
    setSearchTerm(newSearchTerm);

    resetTimer();

    timer = setTimeout_(() => {
      onChange(newSearchTerm);
      resetTimer();
    }, timeout);
  };

  return (
    <div className={clsx('search-field', className)}>
      <input
        type="text"
        className={clsx('form-control search-field__input', {
          'form-control-lg': large,
          'search-field__input--no-border': noBorder,
        })}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => searchTermChanged(e.target.value)}
      />
      <FontAwesomeIcon icon={searchIcon} className="search-field__icon" />
      <button
        aria-label="Clear search"
        type="button"
        className="close search-field__close btn-close"
        hidden={searchTerm === ''}
        id="search-field__close"
        onClick={() => searchTermChanged('', 0)}
      />
    </div>
  );
};
