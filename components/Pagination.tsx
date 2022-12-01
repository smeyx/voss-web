import Button from '@components/Button';
import { ArrowRight, ArrowLeft } from 'phosphor-react';
import type { ReactElement } from 'react';

interface PaginationProps {
  currentPage: number,
  setCurrentPage: (currentPage: number) => void,
  pageSize: number,
  listLength: number,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, pageSize, listLength }): ReactElement => {
  const lastPage = Math.ceil(listLength / pageSize)
  const pageButtonClassName: string = 'p-4 rounded-md bg-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 disabled:opacity-0 transition-colors';
  return (
    <div className="w-full flex mt-4 items-center justify-between gap-2">
      <Button className={pageButtonClassName} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowLeft size="20" />
      </Button>
      <span className="rounded-md p-3 w-24 text-center border border-primary-500 dark:border-secondary-500">
        { currentPage } of { lastPage }
      </span>
      <Button className={pageButtonClassName} onClick={() => setCurrentPage(currentPage + 1)} disabled={(listLength < (currentPage * pageSize))}>
        <ArrowRight size="20" />
      </Button>
    </div>
  );
} 

export default Pagination;