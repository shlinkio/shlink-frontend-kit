import { normalizeTag } from '../../src';

describe('normalizeTag', () => {
  it('returns expected normalized value', () => {
    expect(normalizeTag('Foo bar   BAZ  ')).toEqual('foo-bar-baz');
  });
});
