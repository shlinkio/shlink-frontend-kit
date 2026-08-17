import type { DetailsProps } from '../../src';
import { Details } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import type { RenderWithEventsResult } from '../__helpers__/setUpTest';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<Details />', () => {
  const setUp = (props: Omit<DetailsProps, 'summary' | 'children'> = {}) =>
    renderWithEvents(
      <Details summary="Click me" {...props}>
        <div>These are the children</div>
      </Details>,
    );
  const openDetails = ({ user, ...screen }: RenderWithEventsResult) => user.click(screen.getByText('Click me'));

  it.each([
    setUp,
    async () => {
      const result = await setUp();
      await openDetails(result);
      return result;
    },
  ])('passes a11y checks', (doSetUp) => checkAccessibility(doSetUp()));

  it('renders children only while it is open', async () => {
    const { user, ...screen } = await setUp();

    await expect.element(screen.getByText('These are the children')).not.toBeInTheDocument();
    await openDetails({ user, ...screen });
    await expect.element(screen.getByText('These are the children')).toBeInTheDocument();
  });
});
