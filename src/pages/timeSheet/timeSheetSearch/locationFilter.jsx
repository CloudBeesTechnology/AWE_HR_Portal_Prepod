import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const LocationFilter = ({
  handleSelectItem,
  storeLocation,
  isOpen,
  setIsOpen,
}) => {
  const options = ["Offshore", "Day Tripping", "Third Party Services"];

  const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedOption, setSelectedOption] = useState("");

  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    let uniqueLocations = [...new Set(storeLocation.filter(Boolean))];

    let filteredOptions = uniqueLocations.filter((option) =>
      option?.toLowerCase()?.includes?.(searchTerm?.toLowerCase())
    );

    setFilteredOptions(filteredOptions);
  }, [searchTerm]);

  const handleSelect = (option) => {
    setSearchTerm(option);
    setIsOpen(false);
  };

  return (
    <div
      className="text-dark_grey text_size_5 bg-white relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex justify-between items-center border border-lite_grey cursor-pointer rounded"
        onClick={() => {
          setFilteredOptions(storeLocation);
          setIsOpen(!isOpen);
        }}
      >
        <input
          type="text"
          className="px-3 py-1.5 outline-none rounded"
          placeholder="Search Location"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
        <i className="pr-2">
          <FaChevronDown />
        </i>
      </div>
      {isOpen && (
        <ul className="absolute top-10 w-full z-10 bg-medium_white max-h-32 rounded border border-lite_grey overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(option);
                  handleSelectItem(option);
                  setIsOpen(false);
                }}
                className="m-1 px-4 py-1.5 hover:text-white hover:bg-grey text-dark_grey duration-200 cursor-pointer"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationFilter;
