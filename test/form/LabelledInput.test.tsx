import { render, screen } from '@testing-library/react';
import type { LabelledInputProps } from '../../src';
import { LabelledInput } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<LabelledInput />', () => {
  const setUp = (props: Omit<LabelledInputProps, 'label'> = {}) => render(
    <LabelledInput label="The label" {...props} />,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    { error: 'The input is invalid' },
    {},
  ])('shows error if provided', ({ error }) => {
    setUp({ error });

    if (error) {
      expect(screen.getByTestId('error')).toHaveTextContent(error);
    } else {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    }
  });

  it.each([
    { helpText: 'Introduce some information' },
    {},
  ])('shows error if provided', ({ helpText }) => {
    setUp({ helpText });

    if (helpText) {
      expect(screen.getByTestId('help-text')).toHaveTextContent(helpText);
    } else {
      expect(screen.queryByTestId('help-text')).not.toBeInTheDocument();
    }
  });
});
