import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const Pagination = ({ totalPages, currentPage, paginate }) => {
  const maxButtons = 4;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center space-x-5 ">
      {/* Previous Button */}
      <div
        onClick={() => paginate(currentPage - 1)}
        className={` py-1.5 flex items-center justify-center space-x-2 rounded-lg border border-dark_ash bg-white cursor-pointer w-28 ${
          currentPage === 1 ? " pointer-events-none" : ""
        }`}
      >
        <FaArrowLeft />
        <span>Previous</span>
      </div>

      <div className="flex items-center justify-center space-x-5">
        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`rounded-full  text-lg w-7 h-7 flex items-center justify-center  ${
              currentPage === number
                ? "bg-[indigo] text-white"
                : " text-dark_grey hover:bg-[indigo] hover:text-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div
        onClick={() => paginate(currentPage + 1)}
        className={`px-3 py-1.5 flex items-center  space-x-2 rounded-lg border border-dark_ash bg-white cursor-pointer  ${
          currentPage === totalPages ? " pointer-events-none" : ""
        }`}
      >
        <span>Next</span>
        <FaArrowRight />
      </div>
    </div>
  );
};
