import { determineOrder, determineOrderDir, orderToString, sortList, stringToOrder } from '../../src';

describe('ordering', () => {
  describe('determineOrderDir', () => {
    it('returns ASC when current order field and selected field are different', () => {
      expect(determineOrderDir({ currentField: 'foo', newField: 'bar' })).toEqual('ASC');
      expect(determineOrderDir({ currentField: 'bar', newField: 'foo' })).toEqual('ASC');
    });

    it('returns ASC when no current order dir is provided', () => {
      expect(determineOrderDir({ currentField: 'foo', newField: 'foo' })).toEqual('ASC');
      expect(determineOrderDir({ currentField: 'bar', newField: 'bar' })).toEqual('ASC');
    });

    it('returns DESC when current order field and selected field are equal and current order dir is ASC', () => {
      expect(determineOrderDir({ currentField: 'foo', newField: 'foo', currentOrderDir: 'ASC' })).toEqual('DESC');
      expect(determineOrderDir({ currentField: 'bar', newField: 'bar', currentOrderDir: 'ASC' })).toEqual('DESC');
    });

    it('returns undefined when current order field and selected field are equal and current order dir is DESC', () => {
      expect(determineOrderDir({ currentField: 'foo', newField: 'foo', currentOrderDir: 'DESC' })).toBeUndefined();
      expect(determineOrderDir({ currentField: 'bar', newField: 'bar', currentOrderDir: 'DESC' })).toBeUndefined();
    });
  });

  describe('determineOrder', () => {
    it('returns ASC when current order field and selected field are different', () => {
      expect(determineOrder({ currentField: 'foo', newField: 'bar' })).toEqual({ field: 'bar', dir: 'ASC' });
      expect(determineOrder({ currentField: 'bar', newField: 'foo' })).toEqual({ field: 'foo', dir: 'ASC' });
    });

    it('returns ASC when no current order dir is provided', () => {
      expect(determineOrder({ currentField: 'foo', newField: 'foo' })).toEqual({ field: 'foo', dir: 'ASC' });
      expect(determineOrder({ currentField: 'bar', newField: 'bar' })).toEqual({ field: 'bar', dir: 'ASC' });
    });

    it('returns DESC when current order field and selected field are equal and current order dir is ASC', () => {
      expect(determineOrder({ currentField: 'foo', newField: 'foo', currentOrderDir: 'ASC' })).toEqual(
        { field: 'foo', dir: 'DESC' },
      );
      expect(determineOrder({ currentField: 'bar', newField: 'bar', currentOrderDir: 'ASC' })).toEqual(
        { field: 'bar', dir: 'DESC' },
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

  describe('sortList', () => {
    const list = [
      { name: 'foo', surname: 'bar' },
      { name: 'Alice', surname: 'Johnson' },
      { name: 'John', surname: 'Doe' },
    ];

    it.each([
      { field: 'name' as const },
      { dir: 'ASC' as const },
    ])('returns list as is when either order field or dir are not set', (order) => {
      expect(sortList(list, order)).toEqual(list);
    });

    it.each([
      {
        order: { field: 'name' as const, dir: 'ASC' as const },
        expectedList: [
          { name: 'Alice', surname: 'Johnson' },
          { name: 'John', surname: 'Doe' },
          { name: 'foo', surname: 'bar' },
        ],
      },
      {
        order: { field: 'name' as const, dir: 'DESC' as const },
        expectedList: [
          { name: 'foo', surname: 'bar' },
          { name: 'John', surname: 'Doe' },
          { name: 'Alice', surname: 'Johnson' },
        ],
      },
      {
        order: { field: 'surname' as const, dir: 'ASC' as const },
        expectedList: [
          { name: 'John', surname: 'Doe' },
          { name: 'Alice', surname: 'Johnson' },
          { name: 'foo', surname: 'bar' },
        ],
      },
      {
        order: { field: 'surname' as const, dir: 'DESC' as const },
        expectedList: [
          { name: 'foo', surname: 'bar' },
          { name: 'Alice', surname: 'Johnson' },
          { name: 'John', surname: 'Doe' },
        ],
      },
    ])('orders list based on provided options', ({ order, expectedList }) => {
      expect(sortList(list, order)).toEqual(expectedList);
    });
  });
});
