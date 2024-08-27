import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number === currentPage - 1 || number === currentPage + 1 || number === currentPage) {
      return (
        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      );
    }

    if (number === 1 || number === totalPages) {
      return (
        <li key={number} className="page-item">
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      );
    }

    if (number === currentPage - 2 || number === currentPage + 2) {
      return (
        <li key={number} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }
    return null;
  });

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link">
            Précédent
          </button>
        </li>
        {renderPageNumbers}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link">
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;