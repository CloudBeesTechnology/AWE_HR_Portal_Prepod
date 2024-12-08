import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { getUrl } from "@aws-amplify/storage";


export const LMTable = ({
  initialData,
  statusUpdate,
  handleClickForToggle,
  onViewClick,
  userType,
  personalInfo,
  formatDate,
}) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL

  const linkToStorageFile = async (pathUrl) => {
    try {
      // Fetch the file URL from AWS Amplify storage
      const result = await getUrl({ path: pathUrl });
         console.log("File URL:", result.url.href);
      // Set the generated URL in state to be used for the download link
      setPPLastUP(result.url.href); 
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };


  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const heading = [
    "S. No",
    "Employee ID",
    "Name",
    "Received Date",
    userType !== "Supervisor" && userType !== "Manager" && "Supervisor Name",
    userType !== "Manager" && "Approved Date",
    userType !== "Manager" && userType !== "Supervisor" && "Manager Name",
    userType !== "Supervisor" && "Approved Date",
    "Documents",
    "Submitted Form",
    // "Action",
    userType !== "SuperAdmin" && userType !== "HR" && "Status",
  ].filter(Boolean);

  const editStatus = (itemId, status) => {
    // Call the statusUpdate function and update the local state
    statusUpdate(itemId, status).then((updatedItem) => {
      console.log("Helo",editStatus)
      setData((prevData) =>
        
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    });
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[#C50000]"
      : status === "Approved"
      ? "text-[#0CB100]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-gray-500";
  };

  const filteredData = data.filter((item) => item.empStatus !== "Cancelled");

  const finalData =
    (userType !== "SuperAdmin" || userType !== "HR") && userType === "Manager"
      ? filteredData.filter(
          (item) =>
            item.supervisorStatus === "Approved" &&
            (item.managerName === personalInfo.name ||
              item.supervisorName === personalInfo.name)
        )
      : userType === "Supervisor"
      ? filteredData.filter((item) => item.supervisorName === personalInfo.name)
      : filteredData;

  useEffect(() => {
    const filteredData = finalData;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setData(paginatedData);
  }, [currentPage, rowsPerPage]);
  const filteredResults = finalData;
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);
  // const dataToDisplay =
  //   userType === "HR" || userType === "SuperAdmin" ? filteredData : finalData;
  return (
    // <section className="flex flex-col">
    //   <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto">
    //     <table className="w-[1150px]">
    //       <thead className="bg-black sticky top-0">
    //         <tr className="bg-[#C5C5C5] rounded-sm">
    //           {heading.map((header, index) => (
    //             <th
    //               key={index}
    //               className="px-4 py-5 text-[15px] text-secondary"
    //             >
    //               {header}
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {finalData && finalData.length > 0 ? (
    //           finalData.map((item, index) => (
    //             <tr
    //               key={item.id}
    //               className="text-center text-sm border-b-2 border-[#CECECE]"
    //             >
    //               <td className="border-b-2 border-[#CECECE] py-3">
    //                 {index + 1}
    //               </td>
    //               <td className="border-b-2 border-[#CECECE] py-3">
    //                 {item.empID}
    //               </td>
    //               <td className="border-b-2 border-[#CECECE] text-start pl-4">
    //                 {item.employeeInfo.name || "Tony Stark"}
    //               </td>
    //               <td className="border-b-2 border-[#CECECE]">
    //                 {formatDate(item.createdAt)}
    //               </td>
    //               {userType !== "Supervisor" && userType !== "Manager" && (
    //                 <td className="border-b-2 border-[#CECECE]">
    //                   {item.supervisorName || "N/A"}
    //                 </td>
    //               )}
    //               {userType !== "Manager" && (
    //                 <td className="border-b-2 border-[#CECECE]">
    //                   {formatDate(item.supervisorDate) || "N/A"}
    //                 </td>
    //               )}
    //               {userType !== "Manager" && userType !== "Supervisor" && (
    //                 <td className="border-b-2 border-[#CECECE]">
    //                   {item.managerName || "N/A"}
    //                 </td>
    //               )}
    //               {userType !== "Supervisor" && (
    //                 <td className="border-b-2 border-[#CECECE]">
    //                   {formatDate(item.managerDate) || "N/A"}
    //                 </td>
    //               )}

    //               <td className="border-b-2 border-[#CECECE]">
    //                 <span className="border-b-2 border-dark_grey">
    //                   <a
    //                     href={lastUploadUrl}
    //                     onClick={() =>
    //                       linkToStorageFile(item.medicalCertificate)
    //                     } // Call the linkToStorageFile function
    //                     download
    //                   >
    //                     {item.medicalCertificate ? "Download" : "N/A"}
    //                   </a>
    //                 </span>
    //               </td>

    //               <td className="border-b-2 border-[#CECECE] cursor-pointer">
    //                 <span
    //                   className="border-b-2 border-dark_grey"
    //                   onClick={() => {
    //                     handleClickForToggle();
    //                     onViewClick(item);
    //                   }}
    //                 >
    //                   {item["submitted Form"] || "View"}
    //                 </span>
    //               </td>
    //               <td className={`${getStatusClass(item.managerStatus)}`}>
    //                 {(userType === "Supervisor" && item.supervisorStatus) ||
    //                   (userType === "Manager" && item.managerStatus)}
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan={heading.length} className="text-center py-4">
    //               No data available
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    //   <div className="ml-20 flex justify-center">
    //     <div className="w-[60%] flex justify-start mt-4  px-10">
    //       {userType !== "SuperAdmin" && userType !== "HR" && (
    //         <Pagination
    //           currentPage={currentPage}
    //           totalPages={totalPages}
    //           onPageChange={(newPage) => {
    //             if (newPage >= 1 && newPage <= totalPages) {
    //               setCurrentPage(newPage);
    //             }
    //           }}
    //         />
    //       )}
    //     </div>
    //     <div>
        
    //     </div>
    //   </div>
    // </section>

     <section className="flex flex-col">
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto rounded-xl">
        <table className="w-[1150px] font-semibold text-sm text-center">
          <thead className="bg-[#939393] sticky top-0 rounded-t-lg">
            <tr>
              {heading.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-5 text-[15px] text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalData && finalData.length > 0 ? (
              finalData.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                >
                  <td className="py-3">
                    {index + 1}
                  </td>
                  <td className="py-3">
                    {item.empID}
                  </td>
                  <td className="py-3 text-start pl-4">
                    {item.employeeInfo.name || "Tony Stark"}
                  </td>
                  <td className="py-3">
                    {formatDate(item.createdAt)}
                  </td>
                  {userType !== "Supervisor" && userType !== "Manager" && (
                    <td className="py-3">
                      {item.supervisorName || "N/A"}
                    </td>
                  )}
                  {userType !== "Manager" && (
                    <td className="py-3">
                      {formatDate(item.supervisorDate) || "N/A"}
                    </td>
                  )}
                  {userType !== "Manager" && userType !== "Supervisor" && (
                    <td className="py-3">
                      {item.managerName || "N/A"}
                    </td>
                  )}
                  {userType !== "Supervisor" && (
                    <td className="py-3">
                      {formatDate(item.managerDate) || "N/A"}
                    </td>
                  )}

                  <td className="py-3">
                    <span className="border-b-2 border-[orange] text-[orange]">
                      <a
                        href={lastUploadUrl}
                        onClick={() =>
                          linkToStorageFile(item.medicalCertificate)
                        }
                        download
                      >
                        {item.medicalCertificate ? "Download" : "N/A"}
                      </a>
                    </span>
                  </td>

                  <td className="py-3 cursor-pointer">
                    <span
                      className="border-b-2 border-[blue] text-[blue]"
                      onClick={() => {
                        handleClickForToggle();
                        onViewClick(item);
                      }}
                    >
                      {item["submitted Form"] || "View"}
                    </span>
                  </td>
                  <td className={`font-semibold ${getStatusClass(item.managerStatus)}`}>
                    {(userType === "Supervisor" && item.supervisorStatus) ||
                      (userType === "Manager" && item.managerStatus)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={heading.length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ml-20 flex justify-center">
        <div className="w-[60%] flex justify-start mt-4  px-10">
          {userType !== "SuperAdmin" && userType !== "HR" && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                  setCurrentPage(newPage);
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
)
};
//{userType === "Supervisior" && item.supervisorStatus || userType === "Manager" && item.managerStatus}



// remainingAnualLeave, remainingSickLeave, remainingMateLeave, 
// remainingmrageLeave, remainingPaternityLeave, remainingHosLeave
// remainingCompasLeave