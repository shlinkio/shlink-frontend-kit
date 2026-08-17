import { MemoryRouter } from 'react-router';
import type { RenderResult } from 'vitest-browser-react';
import type { PaginatorProps } from '../../src';
import { ELLIPSIS, Paginator } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<Paginator />', () => {
  const setUp = (props: PaginatorProps) =>
    renderWithEvents(
      <MemoryRouter>
        <Paginator {...props} />
      </MemoryRouter>,
    );

  it.each([{ onPageChange: vi.fn() }, { urlForPage: vi.fn().mockReturnValue('') }])('passes a11y checks', (props) =>
    checkAccessibility(setUp({ pagesCount: 10, currentPage: 5, ...props })),
  );

  it.each([
    { pagesCount: 0, shouldRender: false },
    { pagesCount: 1, shouldRender: false },
    { pagesCount: 2, shouldRender: true },
    { pagesCount: 10, shouldRender: true },
  ])('renders empty for less than 2 pages', async ({ pagesCount, shouldRender }) => {
    const { container } = await setUp({ pagesCount, currentPage: 1, onPageChange: vi.fn() });

    if (shouldRender) {
      await expect.element(container).not.toBeEmptyDOMElement();
    } else {
      await expect.element(container).toBeEmptyDOMElement();
    }
  });

  it.each([
    { currentPage: 2, expectedPrevPage: 1, expectedNextPage: 3 },
    { currentPage: 9, expectedPrevPage: 8, expectedNextPage: 10 },
    { currentPage: 5, expectedPrevPage: 4, expectedNextPage: 6 },
  ])('next and prev pages point to the right page', async ({ currentPage, expectedPrevPage, expectedNextPage }) => {
    const urlForPage = (page: number) => `/${page}`;
    const screen = await setUp({ pagesCount: 10, currentPage, urlForPage });

    await expect.element(screen.getByLabelText('Previous')).toHaveAttribute('href', urlForPage(expectedPrevPage));
    await expect.element(screen.getByLabelText('Next')).toHaveAttribute('href', urlForPage(expectedNextPage));
  });

  it('disables prev when current page is the first one', async () => {
    const screen = await setUp({ pagesCount: 10, currentPage: 1, onPageChange: vi.fn() });

    await expect.element(screen.getByLabelText('Previous')).not.toBeInTheDocument();
    await expect.element(screen.getByLabelText('Next')).toBeInTheDocument();
  });

  it('disables next when current page is the last one', async () => {
    const screen = await setUp({ pagesCount: 10, currentPage: 10, onPageChange: vi.fn() });

    await expect.element(screen.getByLabelText('Previous')).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Next')).not.toBeInTheDocument();
  });

  it.each([
    {
      pagesCount: 10,
      currentPage: 2,
      expectedPages: [1, 2, 3, 4, 10],
      expectedEllipsis: 1,
    },
    {
      pagesCount: 10,
      currentPage: 3,
      expectedPages: [1, 2, 3, 4, 5, 10],
      expectedEllipsis: 1,
    },
    {
      pagesCount: 10,
      currentPage: 5,
      expectedPages: [1, 3, 4, 5, 6, 7, 10],
      expectedEllipsis: 2,
    },
    {
      pagesCount: 10,
      currentPage: 10,
      expectedPages: [1, 8, 9, 10],
      expectedEllipsis: 1,
    },
    {
      pagesCount: 4,
      currentPage: 2,
      expectedPages: [1, 2, 3, 4],
      expectedEllipsis: 0,
    },
    {
      pagesCount: 5,
      currentPage: 3,
      expectedPages: [1, 2, 3, 4, 5],
      expectedEllipsis: 0,
    },
  ])('renders expected amount of pages', async ({ pagesCount, currentPage, expectedPages, expectedEllipsis }) => {
    const screen = await setUp({ pagesCount, currentPage, onPageChange: vi.fn() });

    expect(screen.getByRole('button', { name: /^\d+$/ }).elements()).toHaveLength(expectedPages.length);
    expect(screen.getByText(ELLIPSIS).elements()).toHaveLength(expectedEllipsis);

    await Promise.all(
      expectedPages.map((pageNumber) =>
        expect.element(screen.getByText(`${pageNumber}`, { exact: true })).toBeInTheDocument(),
      ),
    );
  });

  it.each([
    { getButton: (screen: RenderResult) => screen.getByText(ELLIPSIS).elements()[0], shouldInvoke: false },
    { getButton: (screen: RenderResult) => screen.getByText('4'), shouldInvoke: true },
  ])('invokes onPageChange when a non-ellipsis page is clicked', async ({ getButton, shouldInvoke }) => {
    const onPageChange = vi.fn();
    const { user, ...screen } = await setUp({ onPageChange, currentPage: 5, pagesCount: 10 });

    await user.click(getButton(screen));

    if (shouldInvoke) {
      expect(onPageChange).toHaveBeenCalled();
    } else {
      expect(onPageChange).not.toHaveBeenCalled();
    }
  });
});
