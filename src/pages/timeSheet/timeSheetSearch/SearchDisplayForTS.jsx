import React, { useEffect, useState, useCallback, useRef } from "react";

export const SearchDisplayForTimeSheet = ({
  searchResult,
  newFormData,
  searchIcon1,
  searchIcon2,
  placeholder,
  rounded,
  setDrpValue,
  searchedValue,
  id,
  identify,
  setSelectedLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Sync external dropdown value with search query
  useEffect(() => {
    if (setDrpValue) {
      setSearchQuery(setDrpValue);
    }
  }, [setDrpValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  // Handle search query and filter results
  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
    searchedValue?.(id, query);

    if (query) {
      const results = newFormData?.filter(
        (employee) =>
          employee.name?.toUpperCase().includes(query) ||
          employee.empID?.toUpperCase().includes(query) ||
          employee.JOBCODE?.toUpperCase().includes(query) ||
          employee.location?.toUpperCase().includes(query) ||
          employee.empBadgeNo?.toUpperCase().includes(query)
      );
      setFilteredEmployees(results);
    } else {
      setFilteredEmployees(newFormData);
    }
  };

  useEffect(() => {
    setFilteredEmployees(newFormData);
  }, [isDropdownVisible]);
  // Handle item selection
  const handleSelect = (employee) => {
    if (employee.empID || employee.name) {
      setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
      searchResult(employee);
    } else if (employee.JOBCODE) {
      setSearchQuery(employee.JOBCODE);
      searchResult(employee, id);
    } else if (employee.location) {
      setSearchQuery(employee.location);
      searchResult(employee, id);
    }

    setIsDropdownVisible(false);
    setFilteredEmployees([]);
  };

  return (
    <div className="relative dropdown-container">
      <div
        className={`py-2 w-full text_size_5 border text-dark_grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
      >
        <div className="text-dark_grey text-2xl">{searchIcon1}</div>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full cursor-pointer"
          value={searchQuery}
          onChange={handleSearch}
          onClick={toggleDropdown}
        />
        <div
          className={`text-dark_grey cursor-pointer ${
            identify === "viewSummary" ? "text-[20px]" : "text-1xl"
          }`}
          onClick={() => {
            if (identify === "viewSummary") {
              setSelectedLocation?.(searchQuery);
            }
          }}
        >
          {searchIcon2}
        </div>
      </div>

      {isDropdownVisible && filteredEmployees?.length > 0 && (
        <ul className="absolute right-0 overflow-x-hidden mt-2 w-full max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {filteredEmployees.map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white text_size_6 cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => handleSelect(employee)}
            >
              <div>
                <span className="text-sm">{employee.empID}</span>
                <span className="text-sm"> {employee.name}</span>
                <span className="text-sm">{employee.JOBCODE}</span>
                <span className="text-sm">{employee.location}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
