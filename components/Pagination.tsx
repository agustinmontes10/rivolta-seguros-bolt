import React from 'react';

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

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex items-center gap-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-2 px-3 leading-tight rounded ${currentPage === 1 ? 'bg-gray-300 hover:bg-gray-300 hover:text-gray-500 text-gray-500 cursor-not-allowed' : 'bg-white text-[#152549]'} border border-gray-300 hover:bg-[#1a2d5a] hover:text-white transition-colors`}
          >
            Anterior
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`py-2 px-3 leading-tight rounded ${currentPage === number ? 'bg-[#152549] text-white' : 'bg-white text-[#152549]'} border border-gray-300 hover:bg-[#1a2d5a] hover:text-white transition-colors`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`py-2 px-3 leading-tight rounded ${currentPage === pageNumbers.length ? 'bg-gray-300 hover:bg-gray-300 hover:text-gray-500 text-gray-500 cursor-not-allowed' : 'bg-white text-[#152549]'} border border-gray-300 hover:bg-[#1a2d5a] hover:text-white transition-colors`}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;