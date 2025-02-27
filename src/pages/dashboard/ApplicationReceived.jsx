import { useContext } from "react";
import { DataSupply } from "../../utils/DataStoredContext";

// Function to parse date strings into Date objects
const parseDate = (date) => {
  if (!date) return null;
  const dateParts = date.split("/");
  if (dateParts.length === 3) {
    const day = dateParts[0];
    const month = dateParts[1] - 1; // Month is 0-indexed
    const year = dateParts[2];
    const parsedDate = new Date(year, month, day);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const ApplicationReceived = () => {
  const { hiringData, empPDData } = useContext(DataSupply);

  const validData = hiringData?.filter((item) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize time to 00:00:00

    const expiryDate = parseDate(item.expiryDate);
    if (!expiryDate) return false;

    expiryDate.setHours(0, 0, 0, 0); // Normalize expiry date time
    return expiryDate >= currentDate; // Show if expiry is today or later
  });

  // Sort by createdAt (descending) and get the last 4 entries
  const latestData = validData
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="flex justify-center  h-full flex-col w-full">
      <div className="bg-lite_grey rounded-t-2xl font-semibold p-3">
        <h2 className="mx-2">Application Received</h2>
      </div>
      <div className="rounded-lg shadow-md w-full center h-full">
        <div className="flex flex-col items-center justify-center p-1">
          <div className="w-full flex flex-wrap justify-evenly items-center custom-gap gap-3">
            {latestData.length > 0 ? (
              latestData.map((item, index) => {
                const startDate = parseDate(item.startDate);
                const expiryDate = parseDate(item.expiryDate);

                if (!expiryDate) return null; // Skip invalid dates

                expiryDate.setHours(0, 0, 0, 0); // Normalize expiry date
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0); // Normalize today’s date

                if (expiryDate < currentDate) return null; // Skip expired posts

                // Count matching positions in empPDData
                const positionCount = empPDData?.filter((emp) => {
                  const empCreatedAt = new Date(emp.createdAt);
                  return (
                    emp?.position?.trim().toLowerCase() ===
                      item?.jobTitle?.trim().toLowerCase() &&
                    empCreatedAt >= startDate &&
                    empCreatedAt <= expiryDate
                  );
                }).length || 0;

                return (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg flex items-center border h-[120px] w-[150px] border-lite_grey"
                  >
                    <div
                      className={`w-2 h-28 rounded-md ${
                        index === 0
                          ? "bg-[#6E349E]"
                          : index === 1
                          ? "bg-[#F1A924]"
                          : index === 2
                          ? "bg-[#E61A1A]"
                          : "bg-[#17C900]"
                      }`}
                    ></div>
                    <div className="w-full flex justify-center items-center flex-col m-1">
                      <p className="text-sm font-medium text-center">
                        {item.jobTitle}
                      </p>
                      <p className="text-lg mt-2 text-center">
                        {positionCount}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-dark_grey text-lg ">
                  No Hiring Job Posts Available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// import { useContext } from "react";
// import { DataSupply } from "../../utils/DataStoredContext";

// // Function to parse date strings into Date objects
// const parseDate = (date) => {
//   if (!date) return null; // Return null for invalid date
//   // Handle DD/MM/YYYY format
//   const dateParts = date.split("/");
//   if (dateParts.length === 3) {
//     const day = dateParts[0];
//     const month = dateParts[1] - 1; // Month is 0-indexed in JavaScript Date
//     const year = dateParts[2];
//     const parsedDate = new Date(year, month, day); // Return Date object
//     return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null if invalid
//   }
//   // Fallback to standard Date parsing (ISO format, YYYY-MM-DD)
//   const parsedDate = new Date(date);
//   return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null if invalid
// };

// export const Round = () => {
//   const { hiringData, empPDData } = useContext(DataSupply);
// // console.log(hiringData);

//   empPDData.forEach((item) => {
//     if (item.position?.toLowerCase() === "accounts manager") {
//       console.log(item);
//     }
//   });
  
  
  
    
 
  

//   const validData = hiringData?.filter((item) => {
//     const currentDate = new Date(); // Current date
//     const expiryDate = parseDate(item.expiryDate); // Parsing expiryDate as a Date object
//     // If expiryDate is invalid (null), skip this item
//     if (!expiryDate) return false;
//     // Check if expiryDate is today or in the future
//     const isToday =
//       expiryDate?.getDate() === currentDate?.getDate() &&
//       expiryDate?.getMonth() === currentDate?.getMonth() &&
//       expiryDate?.getFullYear() === currentDate?.getFullYear();

//     return expiryDate > currentDate || isToday; // Include items expiring today or in the future
//   });

//   // Sort by createdAt (descending) and get the last 4 entries
//   const latestData = validData
//     ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 4);

//   return (
//     <div className="flex justify-center h-full flex-col p-2 w-full">
//       <div className="bg-lite_grey rounded-t-2xl font-semibold p-3">
//         <h2 className="mx-2">Application Received</h2>
//       </div>
//       <div className="rounded-lg shadow-md w-full center h-full">
//         <div className="flex flex-col items-center justify-center p-1">
//           <div className="w-full flex flex-wrap justify-evenly items-center custom-gap gap-3">
//             {latestData?.some(
//               (item) => parseDate(item.expiryDate) >= new Date()
//             ) ? (
//               latestData.map((item, index) => {
//                 // Parse start and expiry dates
//                 const startDate = parseDate(item.startDate);
//                 const expiryDate = parseDate(item.expiryDate);

//                 // Check if the job post is expired
//                 if (expiryDate < new Date()) return null;

//                 // Count matching positions in empPDData
//                 const positionCount = empPDData?.filter((emp) => {
//                   const empCreatedAt = new Date(emp.createdAt);
//                   return (
//                     emp.position.trim().toLowerCase() === item.jobTitle.trim().toLowerCase() && // Matching jobTitle
//                     empCreatedAt >= startDate &&
//                     empCreatedAt <= expiryDate // CreatedAt is within the date range
//                   );
//                 }).length || 0;
               
//                 return (
//                   <div
//                     key={index}
//                     className="rounded-lg shadow-lg flex items-center border h-[120px] w-[140px] border-lite_grey"
//                   >
//                     {/* Vertical bar for color */}
//                     <div
//                       className={`w-2 h-28 rounded-md ${
//                         index === 0
//                           ? "bg-[#6E349E]"
//                           : index === 1
//                           ? "bg-[#F1A924]"
//                           : index === 2
//                           ? "bg-[#E61A1A]"
//                           : "bg-[#17C900]"
//                       }`}
//                     ></div>
//                     <div className="w-full flex justify-center items-center flex-col m-1">
//                       {/* Job Title */}
//                       <p className="text-sm font-medium text-center">{item.jobTitle}</p>
//                       {/* Count of matching positions */}
//                       <p className="text-lg mt-2">{positionCount}</p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="flex justify-center items-center w-full h-full">
//                 <p className="text-dark_grey text-lg ">
//                   No Hiring Job Posts Available
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


