import React from "react";

const Pagination = ({ onPageChange, currentPage, totalItems, pageSize }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

//   if (totalPages <= 1) return null;
if (totalPages === 0) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-8  gap-2 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
