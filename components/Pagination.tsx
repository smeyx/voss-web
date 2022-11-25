import { ArrowRight, ArrowLeft } from 'phosphor-react';
import type { ReactElement } from 'react';

interface PaginationProps {
  currentPage: number,
  setCurrentPage: (currentPage: number) => void,
  pageSize: number,
  listLength: number,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, pageSize, listLength }): ReactElement => {
  const pageButtonClassName: string = 'p-4 rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-600 disabled:opacity-0 transition-colors';
  return (
    <div className="w-full flex mt-4 items-center justify-between gap-2">
      <button className={pageButtonClassName} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowLeft size="20" />
      </button>
      <span className="rounded-full text-lg">
        { currentPage }
      </span>
      <button className={pageButtonClassName} onClick={() => setCurrentPage(currentPage + 1)}>
        <ArrowRight size="20" />
      </button>
    </div>
  );
} 

export default Pagination;