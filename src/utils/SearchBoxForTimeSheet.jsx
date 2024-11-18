import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
export const SearchBoxForTimeSheet = ({ excelData, searchResult }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = excelData.filter(
        (employee) =>
          employee.__EMPTY_2?.toString().includes(query) ||
          employee["Sub ID"]?.toString().includes(query)
      );
      searchResult(results);
    } else {
      searchResult(excelData);
    }
  };
  return (
    <div className=" flex justify-between items-center border border-[#D9D9D9] rounded p-2  text-[#000000] text-sm">
      <input
        value={searchQuery}
        type="text"
        placeholder="Employee Id"
        className="outline-none"
        onChange={handleSearch}
      />
      <span>
        <FiSearch className="text-xl text-dark_grey" />
      </span>
    </div>
  );
};
