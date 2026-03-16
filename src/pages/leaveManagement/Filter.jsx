import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export const Filter = ({ AfterFilter, name, gmPosition, userType }) => {
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

  const GM = "GENERAL MANAGER";
  const HR = "HR";

  return (
    <section className="">
      {/* Filter Buttons */}
      <div
        className="center gap-3 border relative rounded-md p-3 text-sm text-secondary border-[#CDCDCD]"
        onClick={toggleDropdown}
      >
        <IoFilterOutline />
        <p>{name}</p>
        {/* <p>Filter</p> */}
        {isOpen && (
          <div className=" top-10 absolute left-0 w-32 shadow-lg bg-white z-50 ">
            <div className="py-1 shadow-md  flex flex-col bg-white">
              <button
                onClick={() => handleFilterChange("All")}
                className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white "
              >
                All
              </button>
              {gmPosition === GM && (
                <>
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
                </>
              )}

              {userType === HR && (
                  <>
                  <button
                    onClick={() => handleFilterChange("Pending")}
                    className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white "
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("Verified");
                      //   selectOption();
                    }}
                    className="   w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
                  >
                    Verified
                  </button>
                  <button
                    onClick={() => handleFilterChange("Not Eligible")}
                    className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
                  >
                    Not Eligible
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
