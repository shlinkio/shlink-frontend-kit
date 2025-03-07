import { determineOrder, determineOrderDir, orderToString, stringToOrder } from '../../src';

describe('ordering', () => {
  describe('determineOrderDir', () => {
    it('returns ASC when current order field and selected field are different', () => {
      expect(determineOrderDir('foo', 'bar')).toEqual('ASC');
      expect(determineOrderDir('bar', 'foo')).toEqual('ASC');
    });

    it('returns ASC when no current order dir is provided', () => {
      expect(determineOrderDir('foo', 'foo')).toEqual('ASC');
      expect(determineOrderDir('bar', 'bar')).toEqual('ASC');
    });

    it('returns DESC when current order field and selected field are equal and current order dir is ASC', () => {
      expect(determineOrderDir('foo', 'foo', 'ASC')).toEqual('DESC');
      expect(determineOrderDir('bar', 'bar', 'ASC')).toEqual('DESC');
    });

    it('returns undefined when current order field and selected field are equal and current order dir is DESC', () => {
      expect(determineOrderDir('foo', 'foo', 'DESC')).toBeUndefined();
      expect(determineOrderDir('bar', 'bar', 'DESC')).toBeUndefined();
    });

    it('accepts a single object as argument', () => {
      expect(determineOrderDir({ newField: 'foo', currentField: 'bar' })).toEqual('ASC');
      expect(determineOrderDir({ newField: 'foo', currentField: 'foo', currentOrderDir: 'ASC' })).toEqual('DESC');
    });
  });

  describe('determineOrder', () => {
    it('returns ASC when current order field and selected field are different', () => {
      expect(determineOrder('foo', 'bar')).toEqual({ field: 'bar', dir: 'ASC' });
      expect(determineOrder('bar', 'foo')).toEqual({ field: 'foo', dir: 'ASC' });
    });

    it('returns ASC when no current order dir is provided', () => {
      expect(determineOrder('foo', 'foo')).toEqual({ field: 'foo', dir: 'ASC' });
      expect(determineOrder('bar', 'bar')).toEqual({ field: 'bar', dir: 'ASC' });
    });

    it('returns DESC when current order field and selected field are equal and current order dir is ASC', () => {
      expect(determineOrder('foo', 'foo', 'ASC')).toEqual({ field: 'foo', dir: 'DESC' });
      expect(determineOrder('bar', 'bar', 'ASC')).toEqual({ field: 'bar', dir: 'DESC' });
    });

    it('accepts a single object as argument', () => {
      expect(determineOrder({ newField: 'foo', currentField: 'bar' })).toEqual({ field: 'foo', dir: 'ASC' });
      expect(determineOrder({ newField: 'foo', currentField: 'foo', currentOrderDir: 'ASC' })).toEqual(
        { field: 'foo', dir: 'DESC' },
      );
    });
  });

  describe('orderToString', () => {
    it.each([
      [{}, undefined],
      [{ field: 'foo' }, undefined],
      [{ field: 'foo', dir: 'ASC' as const }, 'foo-ASC'],
      [{ field: 'bar', dir: 'DESC' as const }, 'bar-DESC'],
    ])('casts the order to string', (order, expectedResult) => {
      expect(orderToString(order)).toEqual(expectedResult);
    });
  });

  describe('stringToOrder', () => {
    it.each([
      ['foo-ASC', { field: 'foo', dir: 'ASC' }],
      ['bar-DESC', { field: 'bar', dir: 'DESC' }],
    ])('casts a string to an order objects', (order, expectedResult) => {
      expect(stringToOrder(order)).toEqual(expectedResult);
    });
  });
});
