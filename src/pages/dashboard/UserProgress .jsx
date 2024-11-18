// import React, { useState } from 'react';

// export const UserProgress = () => {
//   const [activeUsers, setActiveUsers] = useState(88);
//   const [inactiveUsers, setInactiveUsers] = useState(50);

//   // Function to handle the active users input change
//   const handleActiveUsersChange = (e) => {
//     const value = Math.min(Math.max(e.target.value, 0), 100); // Restrict value between 0 and 100
//     setActiveUsers(value);
//   };

//   // Function to handle the inactive users input change
//   const handleInactiveUsersChange = (e) => {
//     const value = Math.min(Math.max(e.target.value, 0), 100); // Restrict value between 0 and 100
//     setInactiveUsers(value);
//   };

//   return (
//     <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-lg space-y-6">
//       {/* Active Users */}
//       <div className="text-center">
//         <h3 className="text-lg font-semibold">Active users</h3>
//         <input
//           type="number"
//           value={activeUsers}
//           onChange={handleActiveUsersChange}
//           className="border p-1 rounded mb-2 w-20 text-center"
//           placeholder="Active %"
//         />
//         <div className="relative w-40 h-3 bg-grey rounded-full overflow-hidden my-2">
//           <div
//             className="absolute h-full bg-[#32d432]"
//             style={{ width: `${activeUsers}%` }}
//           />
//         </div>
//         <p className="font-medium">{activeUsers}%</p>
//       </div>

//       {/* Inactive Users */}
//       <div className="text-center">
//         <h3 className="text-lg font-semibold">Inactive users</h3>
//         <input
//           type="number"
//           value={inactiveUsers}
//           onChange={handleInactiveUsersChange}
//           className="border p-1 rounded mb-2 w-20 text-center"
//           placeholder="Inactive %"
//         />
//         <div className="relative w-40 h-3 bg-grey rounded-full overflow-hidden my-2">
//           <div
//             className="absolute h-full bg-yellow"
//             style={{ width: `${inactiveUsers}%` }}
//           />
//         </div>
//         <p className="font-medium">{inactiveUsers}%</p>
//       </div>
//     </div>
//   );
// };

import React from 'react';

export const UserProgress = () => {
  const activeUsers = 88;
  const inactiveUsers = 12;

  return (
    <div className="flex justify-center items-center w-full space-x-10 bg-white p-7 rounded-2xl shadow-lg">
      {/* Active Users */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">Active users</h3>
        <div className="relative w-40 h-2 bg-grey rounded-full overflow-hidden my-2">
          <div
            className="absolute h-full bg-[#32d432]"
            style={{ width: `${activeUsers}%` }}
          />
        </div>
        <p className="font-medium">{activeUsers} user</p>
      </div>

      {/* Inactive Users */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">Inactive users</h3>
        <div className="relative w-40 h-2 bg-grey rounded-full overflow-hidden my-2">
          <div
            className="absolute h-full bg-yellow"
            style={{ width: `${inactiveUsers}%` }}
          />
        </div>
        <p className="font-medium">{inactiveUsers} user</p>
      </div>
    </div>
  );
};


