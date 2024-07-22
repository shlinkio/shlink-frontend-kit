import { parseQueryString, stringifyQueryParams } from '../../src';

describe('query', () => {
  describe('parseQueryString', () => {
    it.each([
      ['', {}],
      ['foo=bar', { foo: 'bar' }],
      ['?foo=bar', { foo: 'bar' }],
      ['?foo=bar&baz=123', { foo: 'bar', baz: '123' }],
      ['foo=bar&baz[]=123&baz[]=456', { foo: 'bar', baz: ['123', '456'] }],
    ])('parses query string as expected', (queryString, expectedResult) => {
      expect(parseQueryString(queryString)).toEqual(expectedResult);
    });
  });

  describe('stringifyQueryParams', () => {
    it.each([
      [{}, ''],
      [{ foo: 'bar' }, 'foo=bar'],
      [{ foo: 'bar', baz: '123' }, 'foo=bar&baz=123'],
      [{ foo: 'bar', ignored: undefined }, 'foo=bar'],
      [{ bar: 'foo', list: ['one', 'two'] }, encodeURI('bar=foo&list[]=one&list[]=two')],
    ])('stringifies query as expected', (queryObj, expectedResult) => {
      expect(stringifyQueryParams(queryObj)).toEqual(expectedResult);
    });
  });
});
