import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded mx-1 bg-blue-500 hover:bg-blue-800 text-white disabled:opacity-50 font-serif"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={`px-3 py-1 border rounded mx-1 font-serif ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded mx-1 bg-blue-500 text-white font-serif hover:bg-blue-800 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
