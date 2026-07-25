import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
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

  it('parses query as expected', () => {
    setUp('foo=hello&bar=123');

    expect(screen.getByTestId('foo')).toHaveTextContent('hello');
    expect(screen.getByTestId('bar')).toHaveTextContent('123');
  });
});
