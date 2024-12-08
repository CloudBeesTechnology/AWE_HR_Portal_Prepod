// import React, { useState } from "react";
// import { FiSearch } from "react-icons/fi";

// export const SearchBoxForTimeSheet = ({
//   allEmpDetails,
//   secondaryData,

//   searchResult,
//   placeholder,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   console.log(secondaryData);
//   const handleSearch = (e) => {
//     const query = e.target.value.toString().trim().toUpperCase(); // Trim whitespace

//     setSearchQuery(query);

//     if (query) {
//       const filteredResults = secondaryData?.map((employee) => ({
//         id: employee?.id || null,
//         data: employee?.data?.filter(
//           (item) =>
//             item?.no?.toString().toUpperCase().includes(query) ||
//             item?.NO?.toString().toUpperCase().includes(query) ||
//             item?.fid?.toString().toUpperCase().includes(query) ||
//             item?.FID?.toString().toUpperCase().includes(query) ||
//             item?.badge?.toString().toUpperCase().includes(query) ||
//             item?.BADGE?.toString().toUpperCase().includes(query)
//         ),
//       }));
//       // .filter((entry) => entry.data && entry.data.length > 0); // Remove empty entries

//       searchResult(filteredResults);
//     } else {
//       searchResult(secondaryData); // Reset to full list if query is empty
//     }
//   };

//   return (
//     // <div className="flex justify-between items-center border border-[#D9D9D9] bg-white rounded p-2 text-[#000000] text-sm">
//     //   <input
//     //     value={searchQuery}
//     //     type="text"
//     //     placeholder={placeholder}
//     //     className="outline-none"
//     //     onChange={handleSearch}
//     //   />
//     //   <span>
//     //     <FiSearch className="text-xl text-dark_grey" />
//     //   </span>
//     // </div>
//     <div className="flex items-center border border-[#D9D9D9] bg-white rounded p-2 text-[#000000] text-sm w-fit md:max-w-md">
//       <input
//         value={searchQuery}
//         type="text"
//         placeholder={placeholder}
//         className="outline-none flex-grow text-sm w-full"
//         onChange={handleSearch}
//       />
//       <span className="ml-2">
//         <FiSearch className="text-xl text-dark_grey" />
//       </span>
//     </div>
//   );
// };

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
  // console.log("Search EmpId : ", secondaryData);
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
              item?.fid?.toString().toUpperCase().includes(query) ||
              item?.FID?.toString().toUpperCase().includes(query) ||
              item?.badge?.toString().toUpperCase().includes(query) ||
              item?.BADGE?.toString().toUpperCase().includes(query) ||
              item?.sapNo?.toString().toUpperCase().includes(query) ||
              item?.empBadgeNo?.toString().toUpperCase().includes(query)
            );
          };

          if (Position === "Manager") {
            const matchingData = employee.data.filter(checkSearchMatch);

            if (matchingData.length > 0) {
              return { id: employee.id, data: matchingData }; // Return matched data
            }
          } else if (Position === "ViewTimeSheet") {
            const matchingData = employee.data.filter(checkSearchMatch);
            if (matchingData.length > 0) {
              return { id: employee.id, data: matchingData }; // Return matched data
            }
          } else {
            const isMatch = checkSearchMatch(employee);

            if (isMatch) {
              // console.log(`TimeKeeper Match Found:`, employee);
            }
            return isMatch ? employee : null;
          }
        });

      const validResults = filteredResults.filter(
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
        className="outline-none flex-grow text-sm w-full"
        onChange={handleSearch}
      />
      <span className="ml-2">
        <FiSearch className="text-xl text-dark_grey" />
      </span>
    </div>
  );
};
