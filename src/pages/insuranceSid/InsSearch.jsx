import React, { useCallback, useEffect, useState } from "react";

export const InsSearch = ({
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
  }, [toggleHandle, newFormData]);

  const filterDatabyClickSearchIcon = useCallback(() => {
    if (newFormData && newFormData.length > 0) {
      const normalizedQuery = searchQuery.toString().toUpperCase();

      // Filter by groupHSNo, workmenCompNo, travelNo, or perAccNo
      const result = newFormData.find(
        (emp) =>
          emp.groupHSNo?.toString().toUpperCase() === normalizedQuery ||
          emp.workmenCompNo?.toString().toUpperCase() === normalizedQuery ||
          emp.travelNo?.toString().toUpperCase() === normalizedQuery ||
          emp.perAccNo?.toString().toUpperCase() === normalizedQuery
      );

      if (result && searchQuery) {
        searchResult(result);
      } else if (!searchQuery) {
        alert("Your search box is empty. Enter a value to start searching.");
      } else {
        alert("Policy Number Not Found.");
        searchResult({});
      }
    }
  }, [searchQuery, newFormData]);

  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
    searchedValue?.(id, query);

    if (query) {
      // Filter by groupHSNo, workmenCompNo, travelNo, or perAccNo
      const results = newFormData?.filter(
        (employee) =>
          employee.groupHSNo?.toString().toUpperCase().includes(query) ||
          employee.workmenCompNo?.toString().toUpperCase().includes(query) ||
          employee.travelNo?.toString().toUpperCase().includes(query) ||
          employee.perAccNo?.toString().toUpperCase().includes(query)
      );

      // Prioritize exact matches for groupHSNo, workmenCompNo, travelNo, or perAccNo
      const sortedResults = results?.sort((a, b) => {
        const aGroupHSNo = a.groupHSNo?.toString().toUpperCase();
        const bGroupHSNo = b.groupHSNo?.toString().toUpperCase();
        const aWorkmenCompNo = a.workmenCompNo?.toString().toUpperCase();
        const bWorkmenCompNo = b.workmenCompNo?.toString().toUpperCase();
        const aTravelNo = a.travelNo?.toString().toUpperCase();
        const bTravelNo = b.travelNo?.toString().toUpperCase();
        const aPerAccNo = a.perAccNo?.toString().toUpperCase();
        const bPerAccNo = b.perAccNo?.toString().toUpperCase();

        const isExactMatchA =
          aGroupHSNo === query ||
          aWorkmenCompNo === query ||
          aTravelNo === query ||
          aPerAccNo === query;
        const isExactMatchB =
          bGroupHSNo === query ||
          bWorkmenCompNo === query ||
          bTravelNo === query ||
          bPerAccNo === query;

        if (isExactMatchA && !isExactMatchB) return -1;
        if (!isExactMatchA && isExactMatchB) return 1;

        const startsWithA =
          aGroupHSNo?.startsWith(query) ||
          aWorkmenCompNo?.startsWith(query) ||
          aTravelNo?.startsWith(query) ||
          aPerAccNo?.startsWith(query);
        const startsWithB =
          bGroupHSNo?.startsWith(query) ||
          bWorkmenCompNo?.startsWith(query) ||
          bTravelNo?.startsWith(query) ||
          bPerAccNo?.startsWith(query);

        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;

        return 0;
      });

      setFilteredEmployees?.(sortedResults);
    } else {
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
                if (employee.groupHSNo) {
                  setSearchQuery(`${employee.groupHSNo}`);
                  searchResult(employee);
                } else if (employee.workmenCompNo) {
                  setSearchQuery(`${employee.workmenCompNo}`);
                  searchResult(employee);
                } else if (employee.travelNo) {
                  setSearchQuery(`${employee.travelNo}`);
                  searchResult(employee);
                } else if (employee.perAccNo) {
                  setSearchQuery(`${employee.perAccNo}`);
                  searchResult(employee);
                }

                setToggleHandle(false);
                setFilteredEmployees?.([]); // Clear the filtered results
              }}
            >
              <div>
                <span className=" text-sm">
                  {employee?.groupHSNo ||
                    employee?.workmenCompNo ||
                    employee?.travelNo ||
                    employee?.perAccNo}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
