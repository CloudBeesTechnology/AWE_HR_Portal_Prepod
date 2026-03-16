import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SelectOffshoreType = ({ options, handleTypeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    handleTypeSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 dropdown-container">
      <div
        className={`flex justify-between items-center text_size_5 bg-white border border-lite_grey ${
          selected ? "text-dark_grey" : "text-medium_grey"
        }  rounded px-4 py-2 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || "Select Offshore Type"}
        <FaChevronDown className="text-md text-dark_grey" />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full p-2 bg-white  rounded mt-1 shadow-lg max-h-60 overflow-hidden">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-2 py-1 hover:text-white hover:bg-grey cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectOffshoreType;
