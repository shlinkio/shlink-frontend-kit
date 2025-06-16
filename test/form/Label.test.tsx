import { render, screen } from '@testing-library/react';
import type { LabelProps } from '../../src';
import { Label } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<Label />', () => {
  const setUp = (props: Pick<LabelProps, 'children' | 'required'>) => render(<Label {...props} />);

  it.each([
    { required: false },
    { required: true },
  ])('passes a11y checks', ({ required }) => checkAccessibility(setUp({ children: 'Foo', required })));

  it.each([
    { content: 'Foo' },
    { content: 'Bar' },
  ])('renders provided content', ({ content }) => {
    setUp({ children: content });
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it.each([
    { required: false },
    { required: true },
  ])('renders required indicator when is required', ({ required }) => {
    setUp({ children: 'Foo', required });

    if (required) {
      expect(screen.getByTestId('required-indicator')).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId('required-indicator')).not.toBeInTheDocument();
    }
  });
});
