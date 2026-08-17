import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { page as screen } from 'vitest/browser';
import { useParsedQuery } from '../../src';

describe('useParsedQuery', () => {
  const FakeComponent = () => {
    const { foo, bar } = useParsedQuery<{ foo?: string; bar?: number }>();

    return (
      <div>
        <span data-testid="foo">{foo}</span>
        <span data-testid="bar">{bar}</span>
      </div>
    );
  };
  const setUp = (search: string) => {
    const history = createMemoryHistory();
    history.push({ search });

    render(
      <Router location={history.location} navigator={history}>
        <FakeComponent />
      </Router>,
    );
  };

  it('parses query as expected', async () => {
    setUp('foo=hello&bar=123');

    await expect.element(screen.getByTestId('foo')).toHaveTextContent('hello');
    await expect.element(screen.getByTestId('bar')).toHaveTextContent('123');
  });
});
