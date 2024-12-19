import { useEffect, useState } from "react";
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
    setSearchQuery('');
    // searchUserList(allEmpDetails); // Reset to all results when component mounts or route changes
  }, [allEmpDetails, location]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      const results = allEmpDetails.filter((employee) => {
        return (
          // Check if empID exists and is a string, then check if it includes the query
          (employee.empID && typeof employee.empID === 'string' && 
            employee.empID.toLowerCase().includes(query.toLowerCase())) ||
          
          // Check if name exists and is a string
          (employee.name && typeof employee.name === 'string' && 
            employee.name.toLowerCase().includes(query.toLowerCase())) ||
          
          // Check if empName exists and is a string
          (employee.empName && typeof employee.empName === 'string' && 
            employee.empName.toLowerCase().includes(query.toLowerCase())) ||
    
          // Check if position exists and is a string
          (employee.position && typeof employee.position === 'string' && 
            employee.position.toLowerCase().includes(query.toLowerCase())) ||
    
          // Check if empBadgeNo exists and is a string
          (employee.empBadgeNo && typeof employee.empBadgeNo === 'string' && 
            employee.empBadgeNo.toLowerCase().includes(query.toLowerCase()))
        );
      });
      
      // Always call searchUserList with the results, even if empty
      searchUserList(results);
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
