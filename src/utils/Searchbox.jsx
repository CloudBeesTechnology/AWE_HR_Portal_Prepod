import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Searchbox = ({
  allEmpDetails,
  searchUserList, // Provide a default no-op function
  searchIcon1,
  searchIcon2,
  placeholder,
  border,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
const location=useLocation()
  useEffect(() => {
    setSearchQuery(''); // Reset search input on route change
    // searchUserList(allEmpDetails);
  }, [allEmpDetails,location]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // searchHandler(query);

    // if (query) {
    //   const results = allEmpDetails.filter(
    //     (employee) =>
    //       // employee.empID?.toLowerCase().includes(query) ||
    //       // employee.name?.toLowerCase().includes(query) ||
    //       // employee.position?.toLowerCase().includes(query) ||
    //       // employee.empBadgeNo?.toLowerCase().includes(query)
    //       (employee.empID && typeof employee.empID === 'string' && employee.empID.toLowerCase().includes(query)) ||
    //       (employee.name || employee.employeeInfo.name && typeof employee.name === 'string' && employee.name.toLowerCase().includes(query)) ||
    //       (employee.position  || employee.workInfo.position && typeof employee.position === 'string' && employee.position.toLowerCase().includes(query)) ||
    //       (employee.empBadgeNo || employee.employeeInfo.position && typeof employee.empBadgeNo === 'string' && employee.empBadgeNo.toLowerCase().includes(query))
    //   );
    //   searchUserList(results); // If provided, otherwise will be a no-op
    // } 
    if (query) {
      const results = allEmpDetails.filter((employee) => {
        return (
          // Check if empID exists and is a string, then check if it includes the query
          (employee.empID && typeof employee.empID === 'string' && employee.empID.toLowerCase().includes(query.toLowerCase())) ||
          
          // Check if name exists and is a string
          (employee.name && typeof employee.name === 'string' && employee.name.toLowerCase().includes(query.toLowerCase())) ||
          
          // Check if empName exists and is a string
          (employee.empName && typeof employee.empName === 'string' && employee.empName.toLowerCase().includes(query.toLowerCase())) ||
    
          // Check if position exists and is a string
          (employee.position && typeof employee.position === 'string' && employee.position.toLowerCase().includes(query.toLowerCase())) ||
    
          // Check if empBadgeNo exists and is a string
          (employee.empBadgeNo && typeof employee.empBadgeNo === 'string' && employee.empBadgeNo.toLowerCase().includes(query.toLowerCase()))
        );
      });
      searchUserList(results)
    }
    
    else {
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
