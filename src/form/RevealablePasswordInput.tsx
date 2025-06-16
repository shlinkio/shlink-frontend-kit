import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FocusEvent } from 'react';
import { forwardRef, useCallback, useRef  } from 'react';
import { useToggle } from '..';
import type { InputProps } from './Input';
import { Input } from './Input';

export type RevealablePasswordInputProps = Omit<InputProps, 'type'> & {
  containerClassName?: string;
};

export const RevealablePasswordInput = forwardRef<HTMLInputElement, RevealablePasswordInputProps>((
  { containerClassName, className, size, ...rest },
  ref,
) => {
  const { flag: passwordRevealed, toggle: togglePasswordRevealed, setToFalse: hidePassword } = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);
  const onContainerBlur = useCallback(({ relatedTarget }: FocusEvent) => {
    if (!containerRef.current?.contains(relatedTarget)) {
      hidePassword();
    }
  }, [containerRef, hidePassword]);

  return (
    <div
      className={clsx('group relative', containerClassName)}
      ref={containerRef}
      onBlurCapture={onContainerBlur}
    >
      <Input
        ref={ref}
        type={passwordRevealed ? 'text' : 'password'}
        className={clsx(
          {
            'pr-10': size !== 'sm',
            'pr-8': size === 'sm',
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
          'absolute top-[50%] translate-y-[-50%] px-1 cursor-pointer',
          'text-placeholder hover:text-lm-text hover:dark:text-dm-text transition-colors',
          {
            'right-1.5': size !== 'sm',
            'scale-85 right-1': size === 'sm',
          },
        )}
        tabIndex={-1}
      >
        <FontAwesomeIcon fixedWidth icon={passwordRevealed ? faEyeSlash : faEye} />
      </button>
    </div>
  );
});
