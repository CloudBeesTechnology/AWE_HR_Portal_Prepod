import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const SearchCandy = ({
  allEmpDetails,
  searchUserList,
  searchIcon1,
  searchIcon2,
  placeholder,
  border,
  searchFields = ["name", "tempID", "position", "nationality"],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [allEmpDetails, location]);

  const filterDataByclickSearchIcon = useCallback(() => {
    if (!allEmpDetails?.length) return;

    const normalizedQuery = searchQuery.toLowerCase();
    const result = allEmpDetails.find((emp) =>
      searchFields.some(
        (field) =>
          emp[field] &&
          typeof emp[field] === "string" &&
          emp[field].toLowerCase().includes(normalizedQuery)
      )
    );

    if (result) {
      searchUserList([result]);
    } else {
      alert("Employee not found.");
      searchUserList([]);
    }
  }, [allEmpDetails, searchQuery, searchFields]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const results = allEmpDetails.filter((employee) =>
        searchFields.some(
          (field) =>
            employee[field] &&
            typeof employee[field] === "string" &&
            employee[field].toLowerCase().includes(query)
        )
      );

      const sortedResults = results.sort((a, b) => {
        const isExactMatchA = searchFields.some(
          (field) => a[field]?.toLowerCase() === query
        );
        const isExactMatchB = searchFields.some(
          (field) => b[field]?.toLowerCase() === query
        );
        return isExactMatchA && !isExactMatchB ? -1 : isExactMatchB && !isExactMatchA ? 1 : 0;
      });

      searchUserList(sortedResults);
    } else {
      searchUserList(allEmpDetails);
    }
  };

  return (
    <div className="relative">
      <div
        className={`py-[9px] w-full text_size_5 bg-white border text-grey border-lite_grey ${border} flex items-center px-3 gap-2`}
      >
        <div className="text-dark_grey text-2xl mr-1">{searchIcon1}</div>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full text-sm"
          value={searchQuery}
          onChange={(e)=>{
            handleSearch(e)
          }}
        />
        {searchIcon2 && (
          <div
            className="text-dark_grey text-2xl cursor-pointer"
            onClick={filterDataByclickSearchIcon}
          >
            {searchIcon2}
          </div>
        )}
      </div>
    </div>
  );
};
