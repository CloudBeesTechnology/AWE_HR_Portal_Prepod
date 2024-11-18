import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
export const SearchForReport = ({
  tableBody,
  searchResult,
  setEmptySearch,
  emptySearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  //   tableBody.map((m) => {
  //     console.log(m[0]);
  //   });
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const results =
        tableBody &&
        tableBody.filter((employee) =>
          employee[0].toString().toUpperCase().includes(query)
        );
      searchResult(results);
    } else {
      setEmptySearch(!emptySearch);
    }
  };
  return (
    <div className="relative">
      <span className="absolute right-2 top-2">
        <FiSearch className="text-xl text-dark_grey" />
      </span>
      <input
        type="text"
        value={searchQuery}
        placeholder="Employee ID,Batch No"
        className="border border-[#D9D9D9] rounded outline-none  p-2 text-[#000000]  placeholder-[#000000]"
        onChange={handleSearch}
      />
    </div>
  );
};
