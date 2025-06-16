import type { FC } from 'react';
import { useState } from 'react';
import { Paginator, SimpleCard } from '../../src';

export const PaginatorPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h2>Button-based paginator</h2>
        <SimpleCard>
          <Paginator pagesCount={10} currentPage={currentPage} onPageChange={setCurrentPage} />
        </SimpleCard>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2>Link-based paginator</h2>
        <SimpleCard>
          <Paginator pagesCount={10} currentPage={currentPage} urlForPage={() => ''} />
        </SimpleCard>
      </div>
    </div>
  );
};
