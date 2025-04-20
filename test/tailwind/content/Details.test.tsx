import { screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import type { DetailsProps } from '../../../src/tailwind/content/Details';
import { Details } from '../../../src/tailwind/content/Details';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

describe('<Details />', () => {
  const setUp = (props: Omit<DetailsProps, 'summary' | 'children'> = {}) => renderWithEvents(
    <Details summary="Click me" {...props}>
      <div>These are the children</div>
    </Details>,
  );
  const openDetails = (user: UserEvent) => user.click(screen.getByText('Click me'));

  it.each([
    setUp,
    async () => {
      const { user, container } = setUp();
      await openDetails(user);
      return { container };
    },
  ])('passes a11y checks', (doSetUp) => checkAccessibility(doSetUp()));

  it('renders children only while it is open', async () => {
    const { user } = setUp();

    expect(screen.queryByText('These are the children')).not.toBeInTheDocument();
    await openDetails(user);
    expect(screen.getByText('These are the children')).toBeInTheDocument();
  });
});
