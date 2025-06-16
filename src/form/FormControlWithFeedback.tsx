import type { FC, PropsWithChildren, ReactNode } from 'react';

export type FormControlWithFeedbackProps = PropsWithChildren<{
  /** An error message to display under the input. Will cause the input to be set with `error` feedback. */
  error?: ReactNode;
  /** Informative help to be display under the input */
  helpText?: ReactNode;

  'data-testid'?: string;
}>;

/**
 * This component should not be exported from the module. It's designed to reuse as a helper wrapper
 */
export const FormControlWithFeedback: FC<FormControlWithFeedbackProps> = (
  { children, helpText, error, 'data-testid': testId },
) => (
  <div className="flex flex-col gap-1" data-testid={testId}>
    {children}
    {helpText && (
      <small
        data-testid={testId ? `${testId}-help-text` : 'help-text'}
        className="text-gray-500 dark:text-gray-400"
      >
        {helpText}
      </small>
    )}
    {error && <span data-testid={testId ? `${testId}-error` : 'error'} className="text-danger">{error}</span>}
  </div>
);
