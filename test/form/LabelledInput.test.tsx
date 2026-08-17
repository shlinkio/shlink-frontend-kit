import { render } from '@testing-library/react';
import { page as screen } from 'vitest/browser';
import type { LabelledInputProps } from '../../src';
import { LabelledInput } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<LabelledInput />', () => {
  const setUp = (props: Omit<LabelledInputProps, 'label'> = {}) =>
    render(<LabelledInput label="The label" {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([{ error: 'The input is invalid' }, {}])('shows error if provided', async ({ error }) => {
    setUp({ error });

    if (error) {
      await expect.element(screen.getByTestId('error')).toHaveTextContent(error);
    } else {
      await expect.element(screen.getByTestId('error')).not.toBeInTheDocument();
    }
  });

  it.each([{ helpText: 'Introduce some information' }, {}])('shows error if provided', async ({ helpText }) => {
    setUp({ helpText });

    if (helpText) {
      await expect.element(screen.getByTestId('help-text')).toHaveTextContent(helpText);
    } else {
      await expect.element(screen.getByTestId('help-text')).not.toBeInTheDocument();
    }
  });
});
