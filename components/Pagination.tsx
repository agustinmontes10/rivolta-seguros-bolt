import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const arrowClass =
    'grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy';

  return (
    <nav className="mt-12 flex justify-center">
      <ul className="inline-flex items-center gap-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Anterior"
            className={arrowClass}
          >
            <ArrowLeft size={18} />
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`h-11 min-w-[2.75rem] rounded-full px-3 text-sm font-bold transition-colors ${
                currentPage === number ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers?.length}
            aria-label="Siguiente"
            className={arrowClass}
          >
            <ArrowRight size={18} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
