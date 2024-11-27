// import React, { useEffect, useMemo, useState } from "react";

// export const SearchDisplay = ({
//   searchResult,
//   newFormData,
//   searchIcon1,
//   searchIcon2,
//   placeholder,
//   rounded,
//   setDrpValue,
//   id,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);

//   useEffect(() => {
//     if (setDrpValue) {
//       setSearchQuery(setDrpValue);
//     }
//   }, [setDrpValue]);
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const results =
//         newFormData &&
//         newFormData.filter(
//           (employee) =>
//             employee.name?.toLowerCase().includes(query) ||
//             employee.empID?.toLowerCase().includes(query) ||
//             employee.JOBCODE?.toLowerCase().includes(query) ||
//             employee.location?.toLowerCase().includes(query)

//           // employee.email?.toLowerCase().includes(query) ||
//           // employee.id?.toLowerCase().includes(query) ||
//           // employee.name?.toLowerCase().includes(query)
//         );
//       setFilteredEmployees(results);
//     } else {
//       setFilteredEmployees([]);
//     }
//   };

//   return (
//     <div className="relative">
//       {/* <div className="relative m-0 w-96 ml-auto">
//           <IoMdSearch className="absolute right-2 top-2 text-ash " size={20} />
//           <input
//             type="text"
//             placeholder="Employee Name / Id / Email"
//             className="pl-3 pr-9 py-2  w-full text_size_6 border-1 shadow-md border-[#FFFFFF] rounded-3xl focus:outline-none "
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div> */}
//       <div
//         className={`py-2 w-full text_size_5 border text-grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
//       >
//         <div className=" text-dark_grey  text-2xl ">{searchIcon1}</div>
//         <input
//           type="text"
//           placeholder={placeholder}
//           className="outline-none w-full"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <div className=" text-dark_grey  text-2xl ">{searchIcon2}</div>
//       </div>

//       {searchQuery && filteredEmployees.length > 0 && (
//         <ul className=" absolute right-0 overflow-x-hidden  mt-2 w-64 ml-auto max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
//           {filteredEmployees.map((employee, index) => (
//             <li
//               key={index}
//               className="m-2 p-1 hover:bg-grey hover:text-white cursor-pointer flex justify-between items-center transition-all duration-200"
//               onClick={() => {
//                 if (employee.empID || employee.name) {
//                   setSearchQuery(`${employee.empID} - ${employee.name}`);
//                   searchResult(employee);
//                   setSearchQuery("");
//                 }

//                 if (employee.JOBCODE) {
//                   console.log("searchDisplay : ", employee.JOBCODE);
//                   setSearchQuery(employee.JOBCODE);
//                   searchResult(employee, id);
//                 }
//                 if (employee.location) {
//                   setSearchQuery(employee.location);
//                   console.log(employee.location);
//                   searchResult(employee, id);
//                 }
//                 setFilteredEmployees([]); // Clear the filtered results
//                 // searchResult(employee);
//                 // setSearchQuery("");
//               }}
//             >
//               <div>
//                 <span className=" text-sm">{employee.empID}</span>
//                 <span className=" text-sm"> {employee.name}</span>
//                 <span className=" text-sm">{employee.JOBCODE}</span>
//                 <span className=" text-sm">{employee.location}</span>
//                 {/* <span className="text-gray-600 text-sm">{employee.email}</span> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// #########################################################################
// #########################################################################

import React, { useCallback, useEffect, useState } from "react";

export const SearchDisplay = ({
  searchResult,
  newFormData,
  searchIcon1,
  searchIcon2,
  placeholder,
  rounded,
  setDrpValue,
  id,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [toggleHandle, setToggleHandle] = useState(false);

  useEffect(() => {
    if (setDrpValue) {
      setSearchQuery(setDrpValue);
    }
  }, [setDrpValue]);

  const toggleFunction = useCallback(() => {
    setToggleHandle(!toggleHandle);
    if (toggleHandle === true) {
      setFilteredEmployees([]);
    } else if (toggleHandle === false) {
      setFilteredEmployees(newFormData);
    }
    console.log(filteredEmployees);
  }, [toggleHandle, newFormData]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results =
        newFormData &&
        newFormData?.filter(
          (employee) =>
            employee.name?.toLowerCase().includes(query) ||
            employee.empID?.toLowerCase().includes(query) ||
            employee.JOBCODE?.toLowerCase().includes(query) ||
            employee.location?.toLowerCase().includes(query) ||
            employee.empBadgeNo?.toLowerCase().includes(query)

          // employee.email?.toLowerCase().includes(query) ||
          // employee.id?.toLowerCase().includes(query) ||
          // employee.name?.toLowerCase().includes(query)
        );
      setFilteredEmployees(results);
      console.log("if FilteredEmployees : ", filteredEmployees);
    } else {
      console.log("Else FilteredEmployees : ", filteredEmployees);
      setFilteredEmployees(newFormData);
    }
  };

  return (
    <div className="relative">
      {/* <div className="relative m-0 w-96 ml-auto">
          <IoMdSearch className="absolute right-2 top-2 text-ash " size={20} />
          <input
            type="text"
            placeholder="Employee Name / Id / Email"
            className="pl-3 pr-9 py-2  w-full text_size_6 border-1 shadow-md border-[#FFFFFF] rounded-3xl focus:outline-none "
            value={searchQuery}
            onChange={handleSearch}
          />
        </div> */}
      <div
        className={`py-2 w-full text_size_5 border text-grey bg-white border-lite_grey ${rounded} flex items-center px-2 gap-2`}
      >
        <div className=" text-dark_grey  text-2xl ">{searchIcon1}</div>
        <input
          type="text" 
          placeholder={placeholder}
          className="outline-none w-full"
          value={searchQuery}
          onChange={handleSearch}
          onClick={toggleFunction}
        />
        <div className=" text-dark_grey  text-2xl ">{searchIcon2}</div>
      </div>

      {filteredEmployees?.length > 0 && (
        <ul className=" absolute right-0 overflow-x-hidden  mt-2 w-full ml-auto max-h-36 overflow-y-auto rounded-lg shadow-lg bg-white z-10">
          {filteredEmployees.map((employee, index) => (
            <li
              key={index}
              className="m-2 p-1 hover:bg-grey hover:text-white cursor-pointer flex justify-between items-center transition-all duration-200"
              onClick={() => {
                if (employee.empID || employee.name) {
                  setSearchQuery(`${employee.empID} - ${employee.name || ""}`);
                  searchResult(employee);
                  setSearchQuery("");
                }

                if (employee.JOBCODE) {
                  setSearchQuery(employee.JOBCODE);
                  searchResult(employee, id);
                  // setToggleHandle(!toggleHandle);
                }

                if (employee.location) {
                  setSearchQuery(employee.location);
                  console.log(employee.location);
                  searchResult(employee, id);
                  // setToggleHandle(!toggleHandle);
                }
                setToggleHandle(false);
                setFilteredEmployees([]); // Clear the filtered results
                // searchResult(employee);
                // setSearchQuery("");
              }}
            >
              <div>
                <span className=" text-sm">{employee.empID}</span>
                <span className=" text-sm"> {employee.name}</span>
                <span className=" text-sm">{employee.JOBCODE}</span>
                <span className=" text-sm">{employee.location}</span>
           
                {/* <span className="text-gray-600 text-sm">{employee.email}</span> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
