import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";


export const Filter = ({ AfterFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };
  useEffect(() => {
    AfterFilter(selectedCategory);
  }, [selectedCategory]);
  return (

      <section className="">
        {/* Filter Buttons */}
        <div
          className="center gap-2 border relative rounded-md p-[9px]  text-sm text-secondary border-[#CDCDCD]"
          onClick={toggleDropdown}
        >
          <IoFilterOutline />
          <p>Filter</p>
        {isOpen && (
          <div className=" top-10 absolute left-0 w-32 shadow-lg bg-white z-50 ">
            <div className="py-1 shadow-md  flex flex-col bg-white">
              <button
                onClick={() => handleFilterChange("All")}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white "
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("Pending")}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white "
              >
                Pending
              </button>
              <button
                onClick={() => {
                  handleFilterChange("Approved");
                  //   selectOption();
                }}
                className="   w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
              >
                Approved
              </button>
              <button
                onClick={() => handleFilterChange("Rejected")}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
              >
                Rejected
              </button>
            </div>
          </div>
        )}
        </div>
      </section>
    
  );
};
