import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const getDisplayedPages = () => {
    const pages = [];

    if (totalPages <= 4) {
      // If total pages are 4 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If currentPage is near the start or end, adjust to show 4 pages
      let start = Math.max(currentPage - 1, 1); // Ensure the starting page doesn't go below 1
      let end = start + 3; // Display 4 pages

      // If end exceeds totalPages, adjust the start
      if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - 3, 1); // Ensure start doesn't go below 1
      }

      // Push pages from start to end into the pages array
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center gap-6 w-3/5 items-center">
   
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}  
        className="flex items-center gap-2 border border-[#5A5858] text-xs text-dark_grey rounded-lg hover:bg-gray-200 px-5 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <FaArrowLeft className="text-xs" />
        <span>Previous</span>
      </button>

      {displayedPages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 p-4 flex items-center justify-center text-xs font-medium rounded-full ${currentPage === page ? 'bg-[indigo] shadow-md text-white' : 'bg-gray-200 text-dark_grey'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 border border-[#5A5858] text-xs text-dark_grey rounded-lg px-5 py-2 "
      >
        <span>Next</span>
        <FaArrowRight className="text-xs" />
      </button>
    </div>
  );
};
