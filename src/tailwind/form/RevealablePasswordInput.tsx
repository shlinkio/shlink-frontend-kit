import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FocusEvent } from 'react';
import { forwardRef, useCallback, useRef  } from 'react';
import { useToggle } from '../../hooks';
import type { InputProps } from './Input';
import { Input } from './Input';

export type RevealablePasswordInputProps = Omit<InputProps, 'type'> & {
  containerClassName?: string;
};

export const RevealablePasswordInput = forwardRef<HTMLInputElement, RevealablePasswordInputProps>((
  { containerClassName, className, size, ...rest },
  ref,
) => {
  const [passwordRevealed, togglePasswordRevealed,, hidePassword] = useToggle(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const onContainerBlur = useCallback(({ relatedTarget }: FocusEvent) => {
    if (!containerRef.current?.contains(relatedTarget)) {
      hidePassword();
    }
  }, [containerRef, hidePassword]);

  return (
    <div
      className={clsx('tw:group tw:relative', containerClassName)}
      ref={containerRef}
      onBlurCapture={onContainerBlur}
    >
      <Input
        ref={ref}
        type={passwordRevealed ? 'text' : 'password'}
        className={clsx(
          {
            'tw:pr-10': size !== 'sm',
            'tw:pr-8': size === 'sm',
          },
          className,
        )}
        size={size}
        data-testid="input"
        {...rest}
      />
      <button
        type="button"
        onClick={togglePasswordRevealed}
        title={passwordRevealed ? 'Hide password' : 'Show password'}
        aria-label={passwordRevealed ? 'Hide password' : 'Show password'}
        className={clsx(
          'tw:absolute tw:top-[50%] tw:translate-y-[-50%] tw:px-1 tw:cursor-pointer',
          'tw:text-placeholder tw:hover:text-lm-text tw:hover:dark:text-dm-text tw:transition-colors',
          {
            'tw:right-1.5': size !== 'sm',
            'tw:scale-85 tw:right-1': size === 'sm',
          },
        )}
        tabIndex={-1}
      >
        <FontAwesomeIcon fixedWidth icon={passwordRevealed ? faEyeSlash : faEye} />
      </button>
    </div>
  );
});
