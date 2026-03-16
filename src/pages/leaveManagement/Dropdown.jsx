import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export const Dropdown = ({ allItem, editStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Action");

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    editStatus(allItem, selectedOption);
  }, [selectedOption]);
  return (
    <div className="relative inline-block text-left">
      <button
        className="border border-[#686867] rounded-md text-dark_grey flex  py-2 px-3 items-center gap-2 mx-auto"
        onClick={toggleDropdown}
      >
        {/* {selectedOption} */}
        Action{" "}
        {!isOpen && (
          <span
            onClick={() => {
              toggleDropdown;
            }}
          >
            <IoIosArrowDown className="text-dark_grey" />
          </span>
        )}
        {isOpen && (
          <span
            onClick={() => {
              toggleDropdown;
            }}
          >
            <IoIosArrowUp className="text-dark_grey" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className=" top-10 absolute   w-32   border bg-white border-white z-50 ">
          <div className="py-1 shadow-md  bg-white">
            <button
              onClick={() => {
                handleOptionSelect("Approved");
                toggleDropdown();
              }}
              className="   w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
            >
              Approved
            </button>
            <button
              onClick={() => {
                handleOptionSelect("Rejected");
                toggleDropdown();
              }}
              className=" w-full text-left px-4 py-2 text-sm text-dark_grey hover:bg-lite_grey hover:text-white"
            >
              Rejected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
