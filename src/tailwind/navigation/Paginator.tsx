import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { useCallback , useMemo } from 'react';
import { Link } from 'react-router';
import type { NumberOrEllipsis } from '../helpers';
import { ELLIPSIS, keyForPage, pageIsEllipsis, prettifyPageNumber, progressivePagination } from '../helpers';

const commonClasses = [
  'tw:border tw:border-r-0 tw:last:border-r tw:border-lm-border tw:dark:border-dm-border',
  'tw:rounded-none tw:first:rounded-l tw:last:rounded-r',
];

const buildPaginatorItemClasses = (active = false) => clsx(
  commonClasses,
  'tw:px-3 tw:py-2 tw:cursor-pointer tw:no-underline',
  'tw:focus-ring tw:focus-visible:z-1',
  !active && [
    'tw:text-lm-brand tw:dark:text-dm-brand',
    'tw:bg-lm-primary tw:dark:bg-dm-primary',
    'tw:highlight:bg-lm-secondary tw:dark:highlight:bg-dm-secondary',
  ],
  active && 'tw:bg-lm-main tw:dark:bg-dm-main tw:text-white',
);

const DisabledPaginatorItem: FC<PropsWithChildren> = ({ children }) => (
  <span aria-hidden className={clsx(commonClasses, 'tw:px-3 tw:py-2 tw:text-gray-400')}>
    {children}
  </span>
);

const EllipsisPaginatorItem = () => <DisabledPaginatorItem>{ELLIPSIS}</DisabledPaginatorItem>;

type BasePaginatorItemProps = {
  active?: boolean;
  isEllipsis?: boolean;
};

type PaginatorItemProps<T extends HTMLElement> =
  PropsWithChildren<BasePaginatorItemProps & Omit<HTMLProps<T>, 'className'>>;

function LinkPaginatorItem(
  { children, active, isEllipsis, href, ...anchorProps }: PaginatorItemProps<HTMLAnchorElement>,
) {
  const classes = useMemo(() => buildPaginatorItemClasses(active), [active]);
  return isEllipsis ? <EllipsisPaginatorItem /> : (
    <Link className={classes} to={href!} {...anchorProps}>
      {children}
    </Link>
  );
}

function ButtonPaginatorItem(
  { children, active, isEllipsis, ...buttonProps }: Omit<PaginatorItemProps<HTMLButtonElement>, 'type'>,
) {
  const classes = useMemo(() => buildPaginatorItemClasses(active), [active]);
  return isEllipsis ? <EllipsisPaginatorItem /> : (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export type PaginatorProps = {
  pagesCount: number;
  currentPage: number;
} & ({
  onPageChange: (currentPage: number) => void;
} | {
  urlForPage: (pageNumber: number) => string;
});

export const Paginator: FC<PaginatorProps> = ({ currentPage, pagesCount, ...rest }) => {
  const isLinksPaginator = 'urlForPage' in rest;
  const PaginatorItem = isLinksPaginator ? LinkPaginatorItem : ButtonPaginatorItem;
  const itemPropsForPageNumber = useCallback(
    (pageNumber: NumberOrEllipsis) => isLinksPaginator
      ? { href: pageIsEllipsis(pageNumber) ? undefined : rest.urlForPage(pageNumber) }
      : { onClick: () => !pageIsEllipsis(pageNumber) && rest.onPageChange(pageNumber) },
    [isLinksPaginator, rest],
  );

  if (pagesCount < 2) {
    return null;
  }

  return (
    <div className="tw:select-none tw:flex" data-testid="paginator">
      {currentPage === 1 ? (
        <DisabledPaginatorItem>
          <FontAwesomeIcon size="xs" icon={faChevronLeft} />
        </DisabledPaginatorItem>
      ) : (
        <PaginatorItem {...itemPropsForPageNumber(Math.max(1, currentPage - 1))} aria-label="Previous">
          <FontAwesomeIcon size="xs" icon={faChevronLeft} />
        </PaginatorItem>
      )}
      {progressivePagination(currentPage, pagesCount).map((pageNumber, index) => (
        <PaginatorItem
          key={keyForPage(pageNumber, index)}
          active={pageNumber === currentPage}
          isEllipsis={pageIsEllipsis(pageNumber)}
          {...itemPropsForPageNumber(pageNumber)}
        >
          {prettifyPageNumber(pageNumber)}
        </PaginatorItem>
      ))}
      {currentPage === pagesCount ? (

        <DisabledPaginatorItem>
          <FontAwesomeIcon size="xs" icon={faChevronRight} />
        </DisabledPaginatorItem>
      ) : (
        <PaginatorItem {...itemPropsForPageNumber(Math.min(pagesCount, currentPage + 1))} aria-label="Next">
          <FontAwesomeIcon size="xs" icon={faChevronRight} />
        </PaginatorItem>
      )}
    </div>
  );
};
