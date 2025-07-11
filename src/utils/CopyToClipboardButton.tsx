import { faClone } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, HTMLProps } from 'react';
import { useCallback } from 'react';
import { useTimeoutToggle } from '..';
import type { Size } from '../types';

export type CopyToClipboardButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'type' | 'onClick' | 'size'> & {
  /** Text to be copied when the button is clicked */
  text: string;
  /** Size of the button. Defaults to `lg` */
  size?: Size;

  /** Test seam */
  initialCopied?: boolean;
  /** Test seam */
  navigator_?: typeof globalThis.navigator;
};

export const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = (
  { text, className, size = 'lg', initialCopied = false, navigator_ = globalThis.navigator, ...rest },
) => {
  const [copied, toggleCopied] = useTimeoutToggle({ initialValue: initialCopied });
  const copyToClipboard = useCallback(
    () => navigator_.clipboard.writeText(text).then(toggleCopied),
    [navigator_.clipboard, text, toggleCopied],
  );

  return (
    <button
      type="button"
      className={clsx(
        'focus-ring rounded-sm cursor-pointer',
        {
          'text-md': size === 'sm',
          'text-lg': size === 'md',
          'text-xl': size === 'lg',
        },
        className,
      )}
      aria-label={`Copy ${text} to clipboard`}
      title="Copy to clipboard"
      onClick={copyToClipboard}
      {...rest}
    >
      <FontAwesomeIcon icon={copied ? faCheck : faClone} fixedWidth />
    </button>
  );
};
