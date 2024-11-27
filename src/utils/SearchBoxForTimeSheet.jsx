import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBoxForTimeSheet = ({
  allEmpDetails,
  secondaryData,
  searchResult,
  placeholder,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toString().trim().toUpperCase(); // Trim whitespace
    setSearchQuery(query);

    if (query) {
      const filteredResults = allEmpDetails?.map((employee) => ({
        id: employee?.id || null,
        data: employee?.data?.filter(
          (item) =>

            item?.no?.toString().toUpperCase().includes(query) ||
            item?.fid?.toString().toUpperCase().includes(query) ||
            item?.badge?.toString().toUpperCase().includes(query)
        ),
      }));
      // .filter((entry) => entry.data && entry.data.length > 0); // Remove empty entries

      searchResult(filteredResults);
    } else {
      searchResult(secondaryData); // Reset to full list if query is empty
    }
  };

  return (
    <div className="flex justify-between items-center border border-[#D9D9D9] rounded p-2 text-[#000000] text-sm">
      <input
        value={searchQuery}
        type="text"
        placeholder={placeholder}
        className="outline-none"
        onChange={handleSearch}
      />
      <span>
        <FiSearch className="text-xl text-dark_grey" />
      </span>
    </div>
  );
};
