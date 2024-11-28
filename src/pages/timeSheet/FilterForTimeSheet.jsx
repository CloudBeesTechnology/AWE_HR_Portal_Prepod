import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export const FilterForTimeSheet = ({ AfterFilter, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   AfterFilter(selectedCategory);
  // }, [selectedCategory]);

  return (
    <section className="w-fit grid grid-cols-1">
      {/* Filter Buttons */}
      <div
        className="center gap-2 border relative rounded-md p-[9px]  text-sm text-secondary border-[#CDCDCD]  bg-white"
        onClick={toggleDropdown}
      >
        <IoFilterOutline />
        <p>Filter</p>
        {isOpen && (
          <div className=" top-10 absolute  w-fit shadow-xl bg-white z-50">
            <div className="p-1 shadow-md  flex flex-col bg-white ">
              <button
                onClick={() => {
                  handleFilterChange("All");
                }}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-grey hover:text-white "
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange("Pending");
                }}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-grey hover:text-white "
              >
                Pending
              </button>
              <button
                onClick={() => {
                  handleFilterChange("Approved");
                  //   selectOption();
                }}
                className="   w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-grey hover:text-white"
              >
                Approved
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
