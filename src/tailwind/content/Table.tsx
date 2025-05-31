import clsx from 'clsx';
import type { FC, HTMLProps, PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { Size } from '../types';

export type SectionType = 'head' | 'body' | 'footer';

const TableSectionContext = createContext<{ section: SectionType } | undefined>(undefined);

const TableContext = createContext<{ responsive: boolean; size: Size }>({ responsive: true, size: 'md' });

export type TableElementProps = PropsWithChildren & {
  className?: string;
};

const TableHead: FC<TableElementProps> = ({ children, className }) => {
  const { responsive } = useContext(TableContext);

  return (
    <TableSectionContext.Provider value={{ section: 'head' }}>
      <thead
        className={clsx(
          { 'tw:hidden tw:lg:table-header-group': responsive },
          className,
        )}
      >
        {children}
      </thead>
    </TableSectionContext.Provider>
  );
};

const TableBody: FC<TableElementProps> = ({ children, className }) => {
  const { responsive } = useContext(TableContext);

  return (
    <TableSectionContext.Provider value={{ section: 'body' }}>
      <tbody
        className={clsx(
          { 'tw:lg:table-row-group tw:flex tw:flex-col tw:gap-y-3': responsive },
          className,
        )}
      >
        {children}
      </tbody>
    </TableSectionContext.Provider>
  );
};

const TableFooter: FC<TableElementProps> = ({ children, className }) => {
  const { responsive } = useContext(TableContext);

  return (
    <TableSectionContext.Provider value={{ section: 'footer' }}>
      <tfoot
        className={clsx(
          { 'tw:lg:table-row-group tw:flex tw:flex-col tw:gap-y-3 tw:mt-4': responsive },
          className,
        )}
      >
        {children}
      </tfoot>
    </TableSectionContext.Provider>
  );
};

const Row: FC<HTMLProps<HTMLTableRowElement>> = ({ children, className, ...rest }) => {
  const sectionContext = useContext(TableSectionContext);
  const inBody = sectionContext?.section === 'body';
  const { responsive } = useContext(TableContext);

  return (
    <tr
      className={clsx(
        'tw:group',
        {
          'tw:lg:table-row tw:flex tw:flex-col': responsive,
          'tw:lg:border-0 tw:border-y-2 tw:border-lm-border tw:dark:border-dm-border': responsive,

          'tw:hover:bg-lm-primary tw:dark:hover:bg-dm-primary': inBody,
          // Use a different hover bg color depending on the table being inside a card or not
          'tw:group-[&]/card:hover:bg-lm-secondary tw:dark:group-[&]/card:hover:bg-dm-secondary': inBody,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
};

export type CellProps = HTMLProps<HTMLTableCellElement> & {
  /**
   * The name of the column to be displayed in small resolutions when the table is responsive, where the cells collapse.
   * It is ignored for non-responsive tables.
   */
  columnName?: string;

  /**
   * Whether to use a th or td tag. If not provided, it is inferred based on the section, using td when inside tbody,
   * and th when inside thead or tfoot
   */
  type?: 'td' | 'th';
};

const Cell: FC<CellProps> = ({ children, className, columnName, type, ...rest }) => {
  const sectionContext = useContext(TableSectionContext);
  const Tag = type ?? (sectionContext?.section !== 'body' ? 'th' : 'td');
  const { responsive, size } = useContext(TableContext);

  return (
    <Tag
      data-column={responsive ? columnName : undefined}
      className={clsx(
        'tw:border-lm-border tw:dark:border-dm-border',
        {
          'tw:p-1': size === 'sm',
          'tw:p-2': size === 'md',
          'tw:p-3': size === 'lg',

          'tw:border-b-1': !responsive,
          'tw:block tw:lg:table-cell tw:not-last:border-b-1 tw:lg:border-b-1': responsive,

          // For responsive tables, display the content in data-column attribute for md sizes and lower
          'tw:before:lg:hidden tw:before:content-[attr(data-column)] tw:before:font-bold tw:before:mr-1': responsive && Tag === 'td',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export type TableProps = Omit<HTMLProps<HTMLTableElement>, 'size'> & {
  header: ReactNode;
  footer?: ReactNode;

  /**
   * By default, the table rows will collapse under large resolutions, and the headers will be hidden.
   * Set `responsive={false}` to avoid this behavior.
   */
  responsive?: boolean;

  /** Determines the padding in every cell. Defaults to md */
  size?: Size;
};

const BaseTable: FC<TableProps> = ({ header, footer, children, responsive = true, size = 'md', ...rest }) => {
  return (
    <TableContext.Provider value={{ responsive, size }}>
      <table className="tw:w-full" {...rest}>
        <TableHead>
          {header}
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
        {footer && (
          <TableFooter>
            {footer}
          </TableFooter>
        )}
      </table>
    </TableContext.Provider>
  );
};

export const Table = Object.assign(BaseTable, { Row, Cell });
