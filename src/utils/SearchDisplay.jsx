

import React, { useCallback, useEffect, useState } from "react";

export const SearchDisplay = ({
  searchResult,
  newFormData,
  searchIcon1,
  searchIcon2,
  placeholder,
  rounded,
  setDrpValue,
  searchedValue,
  id,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [toggleHandle, setToggleHandle] = useState(false);

  useEffect(() => {
    if (setDrpValue) {
      setSearchQuery(setDrpValue);
    }
  }, [setDrpValue]);

  const toggleFunction = useCallback(() => {
    setToggleHandle(!toggleHandle);
    if (toggleHandle === true) {
      setFilteredEmployees([]);
    } else if (toggleHandle === false) {
      setFilteredEmployees(newFormData);
    }
    // console.log(filteredEmployees);
  }, [toggleHandle, newFormData]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    searchedValue?.(id, query);
    if (query) {
      const results =
        newFormData &&
        newFormData?.filter(
          (employee) =>
            employee.name?.toLowerCase().includes(query) ||
            employee.empID?.toLowerCase().includes(query) ||
            employee.JOBCODE?.toLowerCase().includes(query) ||
            employee.location?.toLowerCase().includes(query) ||
            employee.empBadgeNo?.toLowerCase().includes(query)

        );
      setFilteredEmployees(results);
      // console.log("if FilteredEmployees : ", filteredEmployees);
    } else {
      console.log("Else FilteredEmployees : ", filteredEmployees);
      setFilteredEmployees(newFormData);
    }
  };

  return (
    <div className="relative">
     
      <div
        className={`py-2 w-full text_size_5 border text-grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
      >
        <div className=" text-dark_grey  text-2xl ">{searchIcon1}</div>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full"
          value={searchQuery}
          onChange={handleSearch}
          onClick={toggleFunction}
        />
        <div className=" text-dark_grey  text-2xl ">{searchIcon2}</div>
      </div>

      {filteredEmployees?.length > 0 && (
        <ul className=" absolute right-0 overflow-x-hidden  mt-2 w-full ml-auto max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {filteredEmployees.map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => {
                if (employee.empID || employee.name) {
                  setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
                  searchResult(employee);
                  setSearchQuery("");
                }

                if (employee.JOBCODE) {
                  setSearchQuery(employee.JOBCODE);
                  searchResult(employee, id);
              
                }

                if (employee.location) {
                  setSearchQuery(employee.location);
                  console.log(employee.location);
                  searchResult(employee, id);
                
                }
                setToggleHandle(false);
                setFilteredEmployees([]); // Clear the filtered results
               
              }}
            >
              <div>
                <span className=" text-sm">{employee.empID}</span>
                <span className=" text-sm"> {employee.name}</span>
                <span className=" text-sm">{employee.JOBCODE}</span>
                <span className=" text-sm">{employee.location}</span>
           
               
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
