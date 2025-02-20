import { FiSearch } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SearchBoxForTimeSheet = ({
  allEmpDetails,
  secondaryData,
  searchResult,
  placeholder,
  Position,
  searchIcon1,
  searchIcon2,
  border,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [secondaryData, location]);

  const filterDataByclickSearchIcon = useCallback(() => {
    if (secondaryData && secondaryData.length > 0) {
      const normalizedQuery = searchQuery.toString().toUpperCase();

      const result = secondaryData.find((emp) =>
        [
          emp.no,
          emp.NO,
          emp.fidNo,
          emp.FID,
          emp.empBadgeNo,
          emp.BADGE,
          emp.sapNo,
          emp.empID,
          emp.EMPLOYEEID,
          emp.NAME,
          emp.empName,
          emp.name,
        ].some((field) => field?.toString().toUpperCase() === normalizedQuery)
      );

      if (result) {
        searchResult([result]);
      } else {
        alert("Employee not found.");
        searchResult([]);
      }
    }
  }, [secondaryData, searchQuery, searchResult]);

  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);

    if (query) {
      const results = secondaryData.filter((employee) => {
        return [
          employee?.no,
          employee?.NO,
          employee?.fidNo,
          employee?.FID,
          employee?.empBadgeNo,
          employee?.EMPLOYEEID,
          employee?.BADGE,
          employee?.sapNo,
          employee?.empID,
          employee?.NAME,
          employee?.empName,
          employee?.name,
        ].some((field) => field?.toString().toUpperCase().includes(query));
      });

      // Prioritize exact matches and empIDs starting with the query
      const sortedResults = results.sort((a, b) => {
        const fields = [
          "no",
          "NO",
          "fidNo",
          "FID",
          "empBadgeNo",
          "BADGE",
          "sapNo",
          "empID",
          "EMPLOYEEID",
          "NAME",
          "empName",
          "name",
        ];

        const isExactMatch = (emp) =>
          fields.some(
            (field) => emp[field]?.toString().toUpperCase() === query
          );

        const startsWithQuery = (emp) =>
          fields.some((field) =>
            emp[field]?.toString().toUpperCase().startsWith(query)
          );

        if (isExactMatch(a) && !isExactMatch(b)) return -1;
        if (!isExactMatch(a) && isExactMatch(b)) return 1;

        if (startsWithQuery(a) && !startsWithQuery(b)) return -1;
        if (!startsWithQuery(a) && startsWithQuery(b)) return 1;

        return 0;
      });

      searchResult(sortedResults);
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
        <FiSearch
          className="text-xl text-dark_grey"
          onClick={() => {
            filterDataByclickSearchIcon();
          }}
        />
      </span>
    </div>
  );
};
