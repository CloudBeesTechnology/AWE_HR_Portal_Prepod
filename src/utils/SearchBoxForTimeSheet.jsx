

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBoxForTimeSheet = ({
  allEmpDetails,
  secondaryData,
  searchResult,
  placeholder,
  Position,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    const query = e.target.value.trim().toUpperCase();
    setSearchQuery(query);

    if (query) {
      const filteredResults =
        secondaryData &&
        secondaryData?.map((employee) => {
          const checkSearchMatch = (item) => {
            return (
              item?.no?.toString().toUpperCase().includes(query) ||
              item?.NO?.toString().toUpperCase().includes(query) ||
              item?.fidNo?.toString().toUpperCase().includes(query) ||
              item?.FID?.toString().toUpperCase().includes(query) ||
              item?.empBadgeNo?.toString().toUpperCase().includes(query) ||
              item?.BADGE?.toString().toUpperCase().includes(query) ||
              item?.sapNo?.toString().toUpperCase().includes(query) ||
              item?.empID?.toString().toUpperCase().includes(query) 
            );
          };

          if (Position === "Manager_") {
            const matchingData = employee.data.filter(checkSearchMatch);

            if (matchingData.length > 0) {
              return { id: employee.id, data: matchingData }; // Return matched data
            }
          } else if (Position === "ViewTimeSheet_") {
            const matchingData = employee.data.filter(checkSearchMatch);
            if (matchingData.length > 0) {
              return { id: employee.id, data: matchingData }; // Return matched data
            }
          } else {
            const isMatch = checkSearchMatch(employee);

            // if (isMatch) {
            //   // console.log(`TimeKeeper Match Found:`, employee);
            // }
            return isMatch ? employee : null;
          }
        });

      const validResults = filteredResults?.filter(
        (result) => result !== null && result !== undefined
      );

      searchResult(validResults);
    } else {
      searchResult(secondaryData);
    }
  };

  return (
    <div className="flex items-center border border-[#D9D9D9] bg-white rounded p-2 text-[#000000] text-sm w-fit md:max-w-md">
      <input
        value={searchQuery}
        type="text"
        placeholder={placeholder}
        className="outline-none flex-grow text-sm text_size_7 text-dark_grey w-full "
        onChange={handleSearch}
      />
      <span className="ml-2">
        <FiSearch className="text-xl text-dark_grey" />
      </span>
    </div>
  );
};
