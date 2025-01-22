import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Searchbox = ({
  allEmpDetails,
  searchUserList,
  searchIcon1,
  searchIcon2,
  placeholder,
  border,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
    // searchUserList(allEmpDetails); // Reset to all results when component mounts or route changes
  }, [allEmpDetails, location]);

  const filterDataByclickSearchIcon = useCallback(() => {
    console.log(allEmpDetails);
    if (allEmpDetails && allEmpDetails.length > 0) {
      console.log(allEmpDetails);

      const normalizedQuery = searchQuery.toString().toUpperCase();

      const result = allEmpDetails.find((emp) =>
        [emp.empID, emp.empBadgeNo, emp.sapNo, emp.name]?.some(
          (field) => field?.toString().toUpperCase() === normalizedQuery
        )
      );
      if (result) {
        searchUserList([result]);
      } else {
        alert("Employee not found.");
        searchUserList([]);
      }
    }
  }, [allEmpDetails, searchQuery]);
  
  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);

    if (query.trim()) {
      const results = allEmpDetails.filter((employee) => {
        return (
          // Check if empID exists and is a string, then check if it includes the query
          (employee.empID &&
            typeof employee.empID === "string" &&
            employee.empID.toUpperCase().includes(query.toUpperCase())) ||
          // Check if name exists and is a string
          (employee.name &&
            typeof employee.name === "string" &&
            employee.name.toUpperCase().includes(query.toUpperCase())) ||
          // Check if empName exists and is a string
          (employee.empName &&
            typeof employee.empName === "string" &&
            employee.empName.toUpperCase().includes(query.toUpperCase())) ||
          // Check if position exists and is a string
          (employee.position &&
            typeof employee.position === "string" &&
            employee.position.toUpperCase().includes(query.toUpperCase())) ||
          // Check if empBadgeNo exists and is a string
          (employee.empBadgeNo &&
            typeof employee.empBadgeNo === "string" &&
            employee.empBadgeNo.toUpperCase().includes(query.toUpperCase())) ||
          (employee.sapNo &&
            typeof employee.sapNo === "string" &&
            employee.sapNo.toUpperCase().includes(query.toUpperCase()))
        );
      });

      // Prioritize exact matches and empIDs starting with the query
      const sortedResults = results?.sort((a, b) => {
        const aEmpID = a.empID?.toString().toUpperCase();
        const bEmpID = b.empID?.toString().toUpperCase();
        const aName = a.name?.toUpperCase();
        const bName = b.name?.toUpperCase();
        const aEmpBadgeNo = a.empBadgeNo?.toString().toUpperCase();
        const bEmpBadgeNo = b.empBadgeNo?.toString().toUpperCase();
        const isExactMatchA =
          aEmpID === query ||
          aName === query ||
          a.empBadgeNo?.toString().toUpperCase() === query ||
          a.sapNo?.toString().toUpperCase() === query;

        const isExactMatchB =
          bEmpID === query ||
          bName === query ||
          b.empBadgeNo?.toString().toUpperCase() === query ||
          b.sapNo?.toString().toUpperCase() === query;

        const startsWithA =
          aEmpID?.startsWith(query) || aName?.startsWith(query) || aEmpBadgeNo?.startsWith(query);
        const startsWithB =
          bEmpID?.startsWith(query) || bName?.startsWith(query) || bEmpBadgeNo?.startsWith(query);

        if (isExactMatchA && !isExactMatchB) return -1;
        if (!isExactMatchA && isExactMatchB) return 1;

        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;

        return 0;
      });
      // Always call searchUserList with the results, even if empty
      searchUserList(sortedResults);
    } else {
      // If search query is empty, reset to show all results
      searchUserList(allEmpDetails);
    }
  };

  return (
    <div className="relative">
      <div
        className={`py-[9px] w-full text_size_5 bg-white border text-grey border-lite_grey ${border} flex items-center px-3 gap-2`}
      >
        <div className="text-dark_grey text-2xl mr-1 ">{searchIcon1}</div>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full text-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchIcon2 && (
          <div
            className="text-dark_grey text-2xl  cursor-pointer"
            onClick={() => {
              filterDataByclickSearchIcon();
            }}
          >
            {/* <img src={searchIcon1} alt=""  /> */}
            {searchIcon2}
          </div>
        )}
      </div>
    </div>
  );
};
