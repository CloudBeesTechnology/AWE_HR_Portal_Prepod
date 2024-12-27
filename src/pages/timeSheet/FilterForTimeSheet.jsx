
import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export const FilterForTimeSheet = ({ handleFilterChange, toggleDropdown, isOpen }) => {
  const [selectedFilter, setSelectedFilter] = useState("All"); // State to track the selected filter

  const onFilterSelect = (filter) => {
    setSelectedFilter(filter); // Update the selected filter
    handleFilterChange(filter); // Call the parent handler
  };

  return (
    <section className="w-fit grid grid-cols-1">
      {/* Filter Buttons */}
      <div
        className="center gap-2 border relative rounded-md p-[9px] text-sm text-secondary border-[#CDCDCD] bg-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <IoFilterOutline />
        <p>Filter</p>
        {isOpen && (
          <div className="top-10 absolute w-fit shadow-xl bg-white z-50">
            <div className="p-1 shadow-md flex flex-col bg-white ">
              {["All", "Pending", "Approved"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => onFilterSelect(filter)}
                  className={`w-full text-left px-4 py-2 text-sm border-b-2 border-white ${
                    selectedFilter === filter
                      ? "text-white bg-[#71717a]"
                      : "text-dark_grey hover:bg-grey hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
