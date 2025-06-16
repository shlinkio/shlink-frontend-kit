import { faSortAmountDown as sortDescIcon, faSortAmountUp as sortAscIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import type { Order } from '..';
import { determineOrder } from '..';
import type { DropdownProps } from '../navigation';
import { Dropdown } from '../navigation';

export type OrderingDropdownProps<T extends string = string> = Omit<DropdownProps, 'buttonContent'> & {
  items: Record<T, string>;
  order: Order<T>;
  onChange: (newOrder: Order<T>) => void;
  prefixed?: boolean;
};

export function OrderingDropdown<T extends string = string>(
  { items, order, onChange, prefixed = true, buttonVariant = 'button', ...rest }: OrderingDropdownProps<T>,
) {
  const handleItemClick = useCallback((fieldKey: T) => {
    const newOrder = determineOrder({ currentOrderDir: order.dir, currentField: order.field, newField: fieldKey });
    onChange(newOrder);
  }, [onChange, order.dir, order.field]);
  const isButton = buttonVariant === 'button';

  return (
    <Dropdown
      buttonContent={(
        <>
          {!isButton && 'Order by'}
          {isButton && !order.field && <i>Order by...</i>}
          {isButton && order.field && <>{prefixed && 'Order by: '}{items[order.field]} - {order.dir ?? 'DESC'}</>}
        </>
      )}
      buttonVariant={buttonVariant}
      {...rest}
    >
      {Object.entries(items).map(([fieldKey, fieldValue]) => (
        <Dropdown.Item
          key={fieldKey}
          selected={order.field === fieldKey}
          onClick={() => handleItemClick(fieldKey as T)}
          className="flex items-center justify-between gap-2"
        >
          {fieldValue as string}
          {order.field === fieldKey && <FontAwesomeIcon icon={order.dir === 'ASC' ? sortAscIcon : sortDescIcon} />}
        </Dropdown.Item>
      ))}
      <Dropdown.Separator />
      <Dropdown.Item disabled={!order.field} onClick={() => onChange({})}>
        <i>Clear selection</i>
      </Dropdown.Item>
    </Dropdown>
  );
}
