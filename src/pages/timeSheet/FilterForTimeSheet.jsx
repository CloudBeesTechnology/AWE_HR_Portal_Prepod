import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export const FilterForTimeSheet = ({
  handleFilterChange,
  toggleDropdown,
  isOpen,
}) => {
  const Position = localStorage.getItem("userType");
  const [selectedFilter, setSelectedFilter] = useState("All Records");

  const onFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleFilterChange(filter);
  };
  const filterOptions =
    Position === "Manager"
      ? ["All Records", "Pending", "Approved", "Verified", "Rejected"]
      : ["All Records", "Unsubmitted", "Approved", "Verified", "Rejected"];
  return (
    <section className="w-fit grid grid-cols-1">
      <div
        className="center gap-2 border relative rounded-md p-[9px] text-sm text-secondary border-[#CDCDCD] bg-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <IoFilterOutline />
        <p>Filter</p>
        {isOpen && (
          <div className="top-10 absolute w-fit shadow-xl bg-white z-50">
            <div className="p-1 shadow-md flex flex-col bg-white ">
              {filterOptions.map((filter) => (
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
