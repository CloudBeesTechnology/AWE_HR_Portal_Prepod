import React, { useContext, useState, useEffect } from 'react';
import { DataSupply } from '../../utils/DataStoredContext';

export const NewJoineeTable = () => {
  const { empPIData, IDData, workInfoData } = useContext(DataSupply);
  const [latestJoinees, setLatestJoinees] = useState([]);

  useEffect(() => {
    // Merge entries with the same empID from empPIData, IDData, and workInfoData
    const joineesMap = {};

    [...empPIData, ...IDData, ...workInfoData].forEach((entry) => {
      const { empID } = entry;
      if (!joineesMap[empID]) {
        joineesMap[empID] = { ...entry, startDates: [entry.doj] };
      } else {
        // Merge fields and add unique dates
        const existingEntry = joineesMap[empID];
        joineesMap[empID] = {
          ...existingEntry,
          ...entry, // overwrite with latest non-null values from the current entry
          startDates: [...new Set([...existingEntry.startDates, entry.doj])],
        };
      }
    });

    // Get all merged entries
    const allJoinees = Object.values(joineesMap);

    // Sort by the latest date (using doj or startDates) and show only the latest 5
    const latest5Joinees = allJoinees
      .sort((a, b) => new Date(b.doj) - new Date(a.doj)) // Sort by doj in descending order
      .slice(0, 5); // Get only the top 5

    setLatestJoinees(latest5Joinees);
  }, [empPIData, IDData, workInfoData]);


  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden m-2">
      <div className="bg-lite_grey p-4">
        <h2 className="text-lg font-semibold">New Joinee</h2>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6 text-left text-sm font-medium">Employee</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Country</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Position</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Start Dates</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Type</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {latestJoinees.map((joinee) => (
            <tr key={joinee.empID} className="border-b last:border-none text-sm">
              <td className="py-4 px-6 flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={joinee.profilePhoto || '/path/to/default-image.jpg'}
                  alt={joinee.name || 'Unnamed'}
                />
                <span className="text-grey">{joinee.name || 'N/A'}</span>
              </td>
              <td className="py-4 px-6 text-grey">{joinee.nationality || 'N/A'}</td>
              <td className="py-4 px-6 text-grey">{joinee.position || 'N/A'}</td>
              <td className="py-4 px-6 text-grey">
                {joinee.doj || 'N/A'}
              </td>
              <td className="py-4 px-6 text-grey">{joinee.contractType || 'N/A'}</td>
              <td className="py-4 px-6">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    joinee.workStatus === 'Active'
                      ? 'text-[#14AD35] bg-[#41d441]'
                      : 'text-[#ff0000] bg-[#ffcccc]'
                  }`}
                >
                  {joinee.workStatus || 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// import React, { useContext } from 'react';
// import { DataSupply } from '../../utils/DataStoredContext';

// export const NewJoineeTable = () => {
//   const { empPIData, IDData, workInfoData } = useContext(DataSupply);

//   // Merge entries with the same empID from empPIData and IDData
//   const joineesMap = {};

//   [...empPIData, ...IDData, ...workInfoData].forEach((entry) => {
//     const { empID } = entry;
//     if (!joineesMap[empID]) {
//       joineesMap[empID] = { ...entry, startDates: [ entry.doj] };
//     } else {
//       // Merge fields and add unique dates
//       const existingEntry = joineesMap[empID];
//       joineesMap[empID] = {
//         ...existingEntry,
//         ...entry, // overwrite with latest non-null values from the current entry
//         startDates: [...new Set([...existingEntry.startDates,  entry.doj])]
//       };
//     }
//   });

//   const joinees = Object.values(joineesMap);
//   console.log("Merged Joinees Data:", joinees);

//   return (
//     <div className="bg-white shadow-md rounded-2xl overflow-hidden m-2">
//       <div className="bg-lite_grey p-4">
//         <h2 className="text-lg font-semibold">New Joinee</h2>
//       </div>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr className="border-b">
//             <th className="py-3 px-6 text-left text-sm font-medium">Employee</th>
//             <th className="py-3 px-6 text-left text-sm font-medium">Country</th>
//             <th className="py-3 px-6 text-left text-sm font-medium">Position</th>
//             <th className="py-3 px-6 text-left text-sm font-medium">Start Dates</th>
//             <th className="py-3 px-6 text-left text-sm font-medium">Type</th>
//             <th className="py-3 px-6 text-left text-sm font-medium">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {joinees.map((joinee) => (
//             <tr key={joinee.empID} className="border-b last:border-none text-sm">
//               <td className="py-4 px-6 flex items-center">
//                 <img
//                   className="w-10 h-10 rounded-full mr-4"
//                   src={joinee.profilePhoto || '/path/to/default-image.jpg'}
//                   alt={joinee.name || 'Unnamed'}
//                 />
//                 <span className="text-grey">{joinee.name || 'N/A'}</span>
//               </td>
//               <td className="py-4 px-6 text-grey">{joinee.nationality || 'N/A'}</td>
//               <td className="py-4 px-6 text-grey">{joinee.position || 'N/A'}</td>
//               <td className="py-4 px-6 text-grey">{joinee.doj || 'N/A'}
//               </td>
//               <td className="py-4 px-6 text-grey">{joinee.contractType || 'N/A'}</td>
//               <td className="py-4 px-6">
//                 <span
//                   className={`rounded-full px-3 py-1 text-sm ${
//                     joinee.workStatus === 'Active'
//                       ? 'text-[#14AD35] bg-[#41d441]'
//                       : 'text-[#ff0000] bg-[#ffcccc]'
//                   }`}
//                 >
//                   {joinee.workStatus || 'Inactive'}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
