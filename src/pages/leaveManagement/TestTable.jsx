// import React from 'react';
import { useLeaveManageTwo } from '../../hooks/useTicketRequest';

const TestTable = () => {
  const { ticketMerged, loading, error } = useLeaveManageTwo();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <h1>Leave Management</h1>
      {ticketMerged.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Position</th>
              <th>Departure Date</th>
              <th>Arrival Date</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {ticketMerged.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.employeeInfo.name}</td>
                <td>{ticket.empID}</td>
                <td>{ticket.employeeInfo.contactNo}</td>
                <td>{ticket.employeeInfo.email}</td>
                <td>{ticket.employeeInfo.position || 'N/A'}</td>
                <td>{ticket.departureDate}</td>
                <td>{ticket.arrivalDate}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.hrStatus}</td>
                <td>{ticket.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No ticket requests available.</p>
      )}
    </div>
  );
};

export default TestTable;


// import { useState, useContext } from "react";
// import { DataSupply } from "./DataStoredContext";

// export const Searchbox = ({
//   searchUserList, // Provide a default no-op function
//   searchIcon1,
//   searchIcon2,
//   placeholder,
//   border,
// }) => {
//   const { userData } = useContext(DataSupply);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // searchHandler(query);

//     if (query) {
//       const results = userData.filter(
//         (employee) =>
//           employee.empID?.toLowerCase().includes(query) ||
//           employee.name?.toLowerCase().includes(query) ||
//           employee.workPosition?.toLowerCase().includes(query) ||
//           employee.employeeBadgeNumber?.toLowerCase().includes(query)
//       );
//       searchUserList(results); // If provided, otherwise will be a no-op
//     } else {
//       // emptySearch();
//       searchUserList(userData);
//     }
//   };

//   return (
//     <div className="relative">
//       <div
//         className={`py-2 w-full text_size_5 bg-white border text-grey border-lite_grey ${border} flex items-center px-3 gap-2`}
//       >
//         <div className="text-dark_grey text-2xl mr-1">{searchIcon1}</div>
//         <input
//           type="text"
//           placeholder={placeholder}
//           className="outline-none w-full text-sm"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         {searchIcon2 && (
//           <div className="text-dark_grey text-2xl">{searchIcon2}</div>
//         )}
//       </div>
//   </div>
// );
// };
