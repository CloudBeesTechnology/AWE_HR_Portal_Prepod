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
  filteredEmployees,
  setFilteredEmployees,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleHandle, setToggleHandle] = useState(false);

  useEffect(() => {
    if (setDrpValue) {
      setSearchQuery(setDrpValue);
    }
  }, [setDrpValue]);

  const toggleFunction = useCallback(() => {
    setToggleHandle(!toggleHandle);
    if (toggleHandle === true) {
      setFilteredEmployees?.([]);
    } else if (toggleHandle === false) {
      setFilteredEmployees?.(newFormData);
    }
    // console.log(filteredEmployees);
  }, [toggleHandle, newFormData]);

  const filterDatabyClickSearchIcon = useCallback(() => {
    if (newFormData && newFormData.length > 0) {
      const normalizedQuery = searchQuery.toString().toUpperCase();

      const result = newFormData.find((emp) =>
        [emp.empID, emp.name, emp.empBadgeNo, emp.sapNo]?.some(
          (field) => field?.toString().toUpperCase() === normalizedQuery
        )
      );
      if (result && searchQuery) {
        searchResult(result);
      } else if (!searchQuery) {
        alert("Your search box is empty. Enter a value to start searching.");
      } else {
        alert("Employee not found.");
        searchResult({});
      }
    }
  }, [searchQuery, newFormData]);
  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
    searchedValue?.(id, query);

    if (query) {
      const results = newFormData?.filter((employee) =>
        [
          employee.name,
          employee.empID,
          employee.empBadgeNo,
          employee.sapNo,
        ]?.some((field) => field?.toUpperCase().includes(query))
      );

      // Prioritize exact matches and empIDs starting with the query
      const sortedResults = results?.sort((a, b) => {
        const aEmpID = a.empID?.toString().toUpperCase();
        const bEmpID = b.empID?.toString().toUpperCase();
        const aName = a.name?.toUpperCase();
        const bName = b.name?.toUpperCase();

        const isExactMatchA = aEmpID === query || aName === query;

        const isExactMatchB = bEmpID === query || bName === query;

        const startsWithA =
          aEmpID?.startsWith(query) || aName?.startsWith(query);
        const startsWithB =
          bEmpID?.startsWith(query) || bName?.startsWith(query);

        if (isExactMatchA && !isExactMatchB) return -1;
        if (!isExactMatchA && isExactMatchB) return 1;

        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;

        return 0;
      });

      setFilteredEmployees?.(sortedResults);
      // console.log("if FilteredEmployees : ", results);
    } else {
      // console.log("Else FilteredEmployees : ", filteredEmployees);
      setFilteredEmployees?.(newFormData);
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
        <div
          className=" text-dark_grey  text-2xl cursor-pointer"
          onClick={() => {
            filterDatabyClickSearchIcon();
          }}
        >
          {searchIcon2}
        </div>
      </div>

      {filteredEmployees?.length > 0 && (
        <ul className=" absolute right-0 overflow-x-hidden  mt-2 w-full ml-auto max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {filteredEmployees.map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => {
                // console.log(employee);

                if (employee.empID || employee.name) {
                  // console.log(`${employee.empID} - ${employee.name || ""}`);

                  setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
                  searchResult(employee);
                  setSearchQuery("");
                }

                setToggleHandle(false);
                setFilteredEmployees?.([]); // Clear the filtered results
                // searchResult(employee);
                // setSearchQuery("");
              }}
            >
              <div>
                <span className=" text-sm">{employee?.empID}</span>
                <span className=" text-sm"> {employee?.name}</span>
                <span className=" text-sm">{employee?.JOBCODE}</span>
                <span className=" text-sm">{employee?.location}</span>

                {/* <span className="text-gray-600 text-sm">{employee.email}</span> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
