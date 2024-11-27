import { useState } from "react";

export const Searchbox = ({
  allEmpDetails,
  searchUserList, // Provide a default no-op function
  searchIcon1,
  searchIcon2,
  placeholder,
  border,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // searchHandler(query);

    if (query) {
      const results = allEmpDetails.filter(
        (employee) =>
          // employee.empID?.toLowerCase().includes(query) ||
          // employee.name?.toLowerCase().includes(query) ||
          // employee.position?.toLowerCase().includes(query) ||
          // employee.empBadgeNo?.toLowerCase().includes(query)
          (employee.empID && typeof employee.empID === 'string' && employee.empID.toLowerCase().includes(query)) ||
          (employee.name && typeof employee.name === 'string' && employee.name.toLowerCase().includes(query)) ||
          (employee.position && typeof employee.position === 'string' && employee.position.toLowerCase().includes(query)) ||
          (employee.empBadgeNo && typeof employee.empBadgeNo === 'string' && employee.empBadgeNo.toLowerCase().includes(query))
      );
      searchUserList(results); // If provided, otherwise will be a no-op
    } else {
      // emptySearch();
      searchUserList(allEmpDetails);
    }
  };

  return (
    <div className="relative">
      <div
        className={`py-2 w-full text_size_5 bg-white border text-grey border-lite_grey ${border} flex items-center px-3 gap-2`}
      >
        <div className="text-dark_grey text-2xl mr-1">{searchIcon1}</div>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full text-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchIcon2 && (
          <div className="text-dark_grey text-2xl">{searchIcon2}</div>
        )}
      </div>
    </div>
  );
};
