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
  const pageButtonClassName = 'disabled:opacity-0 w-1/6 grow-0';
  return (
    <div className="w-full flex mt-4 mb-4 items-center justify-between gap-2">
      <Button
        className={pageButtonClassName}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft size="20" />
      </Button>
      <span className="rounded-md p-3 w-24 text-center">
        {currentPage} of {lastPage > 0 ? lastPage : 1}
      </span>
      <Button
        className={pageButtonClassName}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={(listLength < (currentPage * pageSize))}
      >
        <ArrowRight size="20" />
      </Button>
    </div>
  );
} 

export default Pagination;