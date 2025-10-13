// import React, { useEffect, useState, useCallback, useRef } from "react";

// export const SearchDisplayForTimeSheet = ({
//   searchResult,
//   newFormData,
//   searchIcon1,
//   searchIcon2,
//   placeholder,
//   rounded,
//   setDrpValue,
//   searchedValue,
//   id,
//   identify,
//   setSelectedLocation,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   useEffect(() => {
//     if (setDrpValue) {
//       setSearchQuery(setDrpValue);
//     }
//   }, [setDrpValue]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown-container")) {
//         setIsDropdownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = useCallback(() => {
//     setIsDropdownVisible((prev) => !prev);
//   }, []);

//   const handleSearch = (e) => {
//     const query = e.target.value.toUpperCase();
//     setSearchQuery(query);
//     searchedValue?.(id, query);

//     if (query) {
//       const results = newFormData?.filter(
//         (employee) =>
//           employee.name?.toUpperCase().includes(query) ||
//           employee.empID?.toUpperCase().includes(query) ||
//           employee.JOBCODE?.toUpperCase().includes(query) ||
//           employee.location?.toUpperCase().includes(query) ||
//           employee.empBadgeNo?.toUpperCase().includes(query)
//       );

//       const sortedResults = results?.sort((a, b) => {
//         const aEmpID = a.empID?.toString().toUpperCase();
//         const bEmpID = b.empID?.toString().toUpperCase();
//         const aName = a.name?.toUpperCase();
//         const bName = b.name?.toUpperCase();
//         const aJobcode = a.JOBCODE?.toString().toUpperCase();
//         const bJobcode = b.JOBCODE?.toString().toUpperCase();

//         const aLocation = a.location?.toString().toUpperCase();
//         const bLocation = b.location?.toString().toUpperCase();

//         const aEmpBadgeNo = a.empBadgeNo?.toString().toUpperCase();
//         const bEmpBadgeNo = b.empBadgeNo?.toString().toUpperCase();

//         const isExactMatchA =
//           aEmpID === query ||
//           aName === query ||
//           aJobcode === query ||
//           aLocation === query ||
//           aEmpBadgeNo === query;

//         const isExactMatchB =
//           bEmpID === query ||
//           bName === query ||
//           bJobcode === query ||
//           bLocation === query ||
//           bEmpBadgeNo === query;

//         const startsWithA =
//           aEmpID?.startsWith(query) ||
//           aName?.startsWith(query) ||
//           aJobcode?.startsWith(query) ||
//           aLocation?.startsWith(query) ||
//           aEmpBadgeNo?.startsWith(query);

//         const startsWithB =
//           bEmpID?.startsWith(query) ||
//           bName?.startsWith(query) ||
//           bJobcode?.startsWith(query) ||
//           bLocation?.startsWith(query) ||
//           bEmpBadgeNo?.startsWith(query);

//         if (isExactMatchA && !isExactMatchB) return -1;
//         if (!isExactMatchA && isExactMatchB) return 1;

//         if (startsWithA && !startsWithB) return -1;
//         if (!startsWithA && startsWithB) return 1;

//         return 0;
//       });
//       setFilteredEmployees(sortedResults);
//     } else {
//       setFilteredEmployees(newFormData);
//     }
//   };

//   useEffect(() => {
//     setFilteredEmployees(newFormData);
//   }, [isDropdownVisible]);
//   const handleSelect = (employee) => {
//     if (employee.empID || employee.name) {
//       setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
//       searchResult(employee);
//     } else if (employee.JOBCODE) {
//       setSearchQuery(employee.JOBCODE);
//       searchResult(employee, id);
//     } else if (employee.location) {
//       setSearchQuery(employee.location);
//       searchResult(employee, id);
//     }

//     setIsDropdownVisible(false);
//     setFilteredEmployees([]);
//   };

//   return (
//     <div className="relative dropdown-container">
//       <div
//         className={`py-2 w-full text_size_5 border text-dark_grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
//       >
//         <div className="text-dark_grey text-2xl">{searchIcon1}</div>
//         <input
//           type="text"
//           placeholder={placeholder}
//           className="outline-none w-full cursor-pointer"
//           value={searchQuery}
//           onChange={handleSearch}
//           onClick={toggleDropdown}
//         />
//         <div
//           className={`text-dark_grey cursor-pointer mb-1${
//             identify === "viewSummary" ? "text-[20px]" : "text-1xl"
//           }`}
//           onClick={() => {
//             if (identify === "viewSummary") {
//               setSelectedLocation?.(searchQuery);
//               // toggleDropdown();
//               setIsDropdownVisible(false);
//             }
//           }}
//         >
//           {/* {searchIcon2} */}
//           <span
//             className={`${
//               identify === "viewSummary"
//                 ? "border rounded-full px-2 py-1  text-[13px] text-[#555252] "
//                 : "hidden"
//             }`}
//           >
//             Search
//           </span>
//         </div>
//       </div>

//       {isDropdownVisible && filteredEmployees?.length > 0 && (
//         <ul className="absolute right-0 overflow-x-hidden mt-2 w-full max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
//           {filteredEmployees.map((employee, index) => (
//             <li
//               key={index}
//               className="m-2 p-1 hover:bg-grey hover:text-white text_size_6 cursor-pointer flex justify-between items-center transition-all duration-200"
//               onClick={() => handleSelect(employee)}
//             >
//               <div>
//                 <span className="text-sm">{employee.empID}</span>
//                 <span className="text-sm"> {employee.name}</span>
//                 <span className="text-sm">{employee.JOBCODE}</span>
//                 <span className="text-sm">{employee.location}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState, useCallback, useRef } from "react";

export const SearchDisplayForTimeSheet = ({
  searchResult,
  newFormData,
  searchIcon1,
  searchIcon2,
  placeholder,
  rounded,
  setDrpValue,
  searchedValue,
  id,
  identify,
  setSelectedLocation,
  setRefreshTrigger,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (setDrpValue) {
      setSearchQuery(setDrpValue);
    }
  }, [setDrpValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const filterDatabyClickSearchIcon = useCallback(() => {
    if (newFormData && newFormData.length > 0) {
      const normalizedQuery = searchQuery.toString().toUpperCase();

      const result = newFormData.find((emp) =>
        [emp.empID, emp.name, emp.empBadgeNo, emp.sapNo]?.some(
          (field) =>
            field?.toString().toUpperCase()?.trim() ===
            String(normalizedQuery)?.toUpperCase()?.trim()
        )
      );

      if (result && searchQuery) {
        searchResult(result);
      } else if (!searchQuery) {
        alert("Your search box is empty. Enter a value to start searching.");
      } else {
        alert("Employee not found.");
        searchResult({});
      }
    }
  }, [searchQuery, newFormData]);

  const handleSearch = (e) => {
    const query = String(e.target.value)?.toUpperCase();
    setSearchQuery(query);
    searchedValue?.(id, query);

    if (query) {
      const results = newFormData?.filter(
        (employee) =>
          String(employee.name)?.toUpperCase()?.trim()?.includes(query) ||
          String(employee.empID)?.toUpperCase()?.trim()?.includes(query) ||
          String(employee.JOBCODE)?.toUpperCase()?.trim()?.includes(query) ||
          String(employee.location)?.toUpperCase()?.trim()?.includes(query) ||
          String(employee.empBadgeNo)?.toUpperCase()?.trim()?.includes(query) ||
          String(employee.sapNo)?.toUpperCase()?.trim()?.includes(query)
      );

      const sortedResults = results?.sort((a, b) => {
        const aEmpID = a.empID?.toString().toUpperCase();
        const bEmpID = b.empID?.toString().toUpperCase();
        const aName = a.name?.toUpperCase();
        const bName = b.name?.toUpperCase();
        const aJobcode = a.JOBCODE?.toString().toUpperCase();
        const bJobcode = b.JOBCODE?.toString().toUpperCase();

        const aLocation = a.location?.toString().toUpperCase();
        const bLocation = b.location?.toString().toUpperCase();

        const aEmpBadgeNo = a.empBadgeNo?.toString().toUpperCase();
        const bEmpBadgeNo = b.empBadgeNo?.toString().toUpperCase();

        const aSapNo = a.sapNo?.toString().toUpperCase();
        const bSapNo = b.sapNo?.toString().toUpperCase();

        const isExactMatchA =
          aEmpID === query ||
          aName === query ||
          aJobcode === query ||
          aLocation === query ||
          aEmpBadgeNo === query ||
          aSapNo === query;

        const isExactMatchB =
          bEmpID === query ||
          bName === query ||
          bJobcode === query ||
          bLocation === query ||
          bEmpBadgeNo === query ||
          bSapNo === query;

        const startsWithA =
          aEmpID?.startsWith(query) ||
          aName?.startsWith(query) ||
          aJobcode?.startsWith(query) ||
          aLocation?.startsWith(query) ||
          aEmpBadgeNo?.startsWith(query) ||
          aSapNo?.startsWith(query);

        const startsWithB =
          bEmpID?.startsWith(query) ||
          bName?.startsWith(query) ||
          bJobcode?.startsWith(query) ||
          bLocation?.startsWith(query) ||
          bEmpBadgeNo?.startsWith(query) ||
          bSapNo?.startsWith(query);

        if (isExactMatchA && !isExactMatchB) return -1;
        if (!isExactMatchA && isExactMatchB) return 1;

        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;

        return 0;
      });
      setFilteredEmployees(sortedResults);
    } else {
      setFilteredEmployees(newFormData);
    }
  };

  useEffect(() => {
    setFilteredEmployees(newFormData);
  }, [isDropdownVisible]);

  const handleSelect = (employee) => {
    if (
      identify === "VS_SapNo_BadgeNo" &&
      (employee.sapNo || employee.empBadgeNo)
    ) {
      setSearchQuery(
        `${employee.sapNo} ${employee.empBadgeNo || ""} ${employee.name || ""}`
      );
      searchResult(employee);
    } else if (employee.empID || employee.name) {
      setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
      searchResult(employee);
    } else if (employee.JOBCODE) {
      setSearchQuery(employee.JOBCODE);
      searchResult(employee, id);
    } else if (employee.location) {
      setSearchQuery(employee.location);
      searchResult(employee, id);
    }

    setIsDropdownVisible(false);
    setFilteredEmployees([]);
  };

  return (
    <div className="relative dropdown-container">
      <div
        className={`${identify === "viewSummary" ? "py-1.5" : "py-2"} w-full text_size_5 border text-dark_grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-full cursor-pointer"
          value={searchQuery}
          onChange={handleSearch}
          onClick={toggleDropdown}
        />
        <div
          className="text-dark_grey text-2xl cursor-pointer"
          onClick={() => {
            setRefreshTrigger?.((prev) => prev + 1);
            filterDatabyClickSearchIcon();
          }}
        >
          {searchIcon1}
        </div>
        <div
          className={`text-dark_grey cursor-pointer mb-1${
            identify === "viewSummary" ? "text-[20px] center" : "text-1xl"
          }`}
          onClick={() => {
            if (identify === "viewSummary") {
              setSelectedLocation?.(searchQuery);
              // toggleDropdown();
              setIsDropdownVisible(false);
            }
          }}
        >
          {/* {searchIcon2} */}
          <span
            className={`${
              identify === "viewSummary"
                ? "border rounded-full px-2 py-1  text-[13px] text-[#555252] "
                : "hidden"
            }`}
          >
            Search
          </span>
        </div>
      </div>

      {/* {isDropdownVisible && filteredEmployees?.length > 0 && (
        <ul className="absolute right-0 overflow-x-hidden mt-2 w-full max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {filteredEmployees.map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white text_size_6 cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => handleSelect(employee)}
            >
              {identify === "VS_SapNo_BadgeNo" ? (
                <div>
                  <span className="text-sm">{employee?.sapNo} </span>
                  <span className="text-sm"> {employee?.empBadgeNo} </span>
                  <span className="text-sm">{employee?.name} </span>
                </div>
              ) : (
                <div>
                  <span className="text-sm">{employee.empID}</span>
                  <span className="text-sm"> {employee.name}</span>
                  <span className="text-sm">{employee?.JOBCODE}</span>
                  <span className="text-sm">{employee?.location}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )} */}
      {isDropdownVisible && filteredEmployees?.length > 0 && (
        <ul className="absolute right-0 overflow-x-hidden mt-2 w-full max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {[
            ...(identify === "VS_SapNo_BadgeNo"
              ? [{ sapNo: "SELECT ALL", empBadgeNo: "", name: "" }]
              : []),
            ...filteredEmployees,
          ].map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white text_size_6 cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => {
                setRefreshTrigger?.((prev) => prev + 1);
                handleSelect(employee);
              }}
            >
              {identify === "VS_SapNo_BadgeNo" ? (
                <div>
                  {employee?.sapNo === "SELECT ALL" ? (
                    <span className="text-sm">SELECT ALL</span>
                  ) : (
                    <>
                      <span className="text-sm">{employee?.sapNo}</span>
                      <span className="text-sm"> {employee?.empBadgeNo}</span>
                      <span className="text-sm">{employee?.name}</span>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <span className="text-sm">{employee?.empID}</span>
                  <span className="text-sm"> {employee?.name}</span>
                  <span className="text-sm">{employee?.JOBCODE}</span>
                  <span className="text-sm">{employee?.location}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};