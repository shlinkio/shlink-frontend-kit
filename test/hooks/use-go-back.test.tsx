import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { useGoBack } from '../../src';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('useGoBack', () => {
  function FakeComponent() {
    const goBack = useGoBack();
    return <button data-testid="go-back" onClick={goBack}>Go back</button>;
  }

  const setUp = () => {
    const history = createMemoryHistory();
    history.push('/foo');
    history.push('/bar');
    history.push('/baz');

    const result = renderWithEvents(
      <Router location={history.location} navigator={history}>
        <FakeComponent />
      </Router>,
    );

    return { ...result, history };
  };

  it('navigates one level back every time it is called', async () => {
    const { user, history } = setUp();

    expect(history.location.pathname).toEqual('/baz');
    await user.click(screen.getByTestId('go-back'));
    expect(history.location.pathname).toEqual('/bar');
    await user.click(screen.getByTestId('go-back'));
    expect(history.location.pathname).toEqual('/foo');
  });
});
