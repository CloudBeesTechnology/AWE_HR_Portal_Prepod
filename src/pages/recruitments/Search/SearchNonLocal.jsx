import { useState, useCallback, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
export const SearchNonLocalCandy = ({
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
  const { IVSSDetails, empPDData } = useContext(DataSupply);

  useEffect(() => {
    setSearchQuery("");
  }, [allEmpDetails, location]);

  const matchedCandidates = IVSSDetails?.filter((ivssCandidate) =>
    empPDData?.some(
      (empCandidate) => empCandidate.tempID === ivssCandidate.tempID
    )
  );

  const filterDataByclickSearchIcon = useCallback(() => {
    if (allEmpDetails && allEmpDetails.length > 0) {
      const normalizedQuery = searchQuery.toLowerCase();

      const bruneiCandidates = allEmpDetails
        .filter(
          (candidate) =>
            candidate.nationality !== "Bruneian" &&
            candidate.nationality !== "Brunei PR"
        )
        .filter((candidate) => {
          const matchedIVSS = matchedCandidates?.find(
            (ivssCandidate) => ivssCandidate.tempID === candidate.tempID
          );
          const isStatusValid =
            matchedIVSS && matchedIVSS.status === "Candidate List";
          return (
            !IVSSDetails.some(
              (detail) =>
                detail.tempID === candidate.tempID &&
                candidate.status !== "Inactive"
            ) || isStatusValid
          );
        });

      const result = bruneiCandidates.find((emp) =>
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
    }
  }, [allEmpDetails, searchQuery, searchFields]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const bruneiCandidates = allEmpDetails
        .filter(
          (candidate) =>
            candidate.nationality !== "Bruneian" &&
            candidate.nationality !== "Brunei PR"
        )
        .filter((candidate) => {
          const matchedIVSS = matchedCandidates?.find(
            (ivssCandidate) => ivssCandidate.tempID === candidate.tempID
          );
          const isStatusValid =
            matchedIVSS && matchedIVSS.status === "Candidate List";
          return (
            !IVSSDetails.some(
              (detail) =>
                detail.tempID === candidate.tempID &&
                candidate.status !== "Inactive"
            ) || isStatusValid
          );
        });

      const results = bruneiCandidates.filter((employee) => {
        return searchFields.some((field) => {
          return (
            employee[field] &&
            typeof employee[field] === "string" &&
            employee[field].toLowerCase().includes(query)
          );
        });
      });

      const sortedResults = results?.sort((a, b) => {
        const isExactMatchA = searchFields.some(
          (field) => a[field]?.toString().toLowerCase() === query
        );
        const isExactMatchB = searchFields.some(
          (field) => b[field]?.toString().toLowerCase() === query
        );

        if (isExactMatchA && !isExactMatchB) return -1;
        if (!isExactMatchA && isExactMatchB) return 1;
        return 0;
      });

      searchUserList(sortedResults);
    } else {
      const bruneiCandidates = allEmpDetails
        .filter(
          (candidate) =>
            candidate.nationality !== "Bruneian" &&
            candidate.nationality !== "Brunei PR"
        )
        .filter((candidate) => {
          const matchedIVSS = matchedCandidates?.find(
            (ivssCandidate) => ivssCandidate.tempID === candidate.tempID
          );
          const isStatusValid =
            matchedIVSS && matchedIVSS.status === "Candidate List";
          return (
            !IVSSDetails.some(
              (detail) =>
                detail.tempID === candidate.tempID &&
                candidate.status !== "Inactive"
            ) || isStatusValid
          );
        });

      searchUserList(bruneiCandidates);
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
            className="text-dark_grey text-2xl cursor-pointer"
            onClick={() => {
              filterDataByclickSearchIcon();
            }}
          >
            {searchIcon2}
          </div>
        )}
      </div>
    </div>
  );
};
