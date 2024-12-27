import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { getUrl } from "@aws-amplify/storage";
import { useOutletContext } from "react-router-dom";
import { Filter } from "./Filter";

export const LMTable = () => {
  const {
    handleClickForToggle,
    handleViewClick,  
    formatDate,
    userType,  
    currentPage,
    data,
    rowsPerPage,
    errorState,
    selectedDate,
  } = useOutletContext();
// console.log(data);

  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL

  // Logic to get the URL of the uploaded file
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });
      setPPLastUP(result.url.href);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  // Conditional table headers based on userType
  const heading = [
    "S. No",
    "Employee ID",
    "Name",
    "Received Date",
    userType !== "Supervisor" && userType !== "Manager" && "Supervisor Name",
    userType !== "Manager" && "Supervisor Approved Date",
    userType !== "Manager" && userType !== "Supervisor" && "Manager Name",
    userType !== "Supervisor" && "Manager Approved Date",
    "Documents",
    "Submitted Form",
    userType !== "SuperAdmin" && userType !== "HR" && "Status",
  ].filter(Boolean);

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };
// console.log(data.length);

  return (
    <section className="flex flex-col w-full mt-4">
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl ">
        {errorState?.noResults ? (
          <div className="text-center mt-6 py-20">
            {errorState?.dateError ? (
              <>
                <p className="text-[red]">No records found for the selected date: {selectedDate}</p>
                <p className="text-sm mt-2">Please select a different date or clear the date filter</p>
              </>
            ) : errorState?.searchError ? (
              <p>No matching results found for your search.</p>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        ) : data && data.length > 0 ? (
          <table className="w-full font-semibold text-sm text-center">
            <thead className="bg-[#939393] sticky top-0 rounded-t-lg">
              <tr>
                {heading.map((header, index) => (
                  <th key={index} className="px-4 py-5 text-[15px] text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => {
                  const displayIndex = startIndex + index + 1; // Adjust index based on pagination
// console.log(item);

                  return (
                    <tr
                      key={index}
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="py-3">{displayIndex}</td>
                      <td className="py-3">{item.empID}</td>
                      <td className="py-3">{item.empName || "N/A"}</td>
                      <td className="py-3">
                        {formatDate(item.leaveStatusCreatedAt)}
                      </td>
                      {userType !== "Supervisor" && userType !== "Manager" && (
                        <td className="py-3">{item.supervisorName || "N/A"}</td>
                      )}
                      {userType !== "Manager" && (
                        <td className="py-3">
                          {formatDate(item.supervisorDate) || "N/A"}
                        </td>
                      )}
                      {userType !== "Manager" && userType !== "Supervisor" && (
                        <td className="py-3">{item.managerName || "N/A"}</td>
                      )}
                      {userType !== "Supervisor" && (
                        <td className="py-3">
                          {formatDate(item.managerDate) || "N/A"}
                        </td>
                      )}

                      <td className="py-3">
                        <a
                          href={lastUploadUrl}
                          onClick={(e) => {
                            if (!item.medicalCertificate) {
                              e.preventDefault();
                            } else {
                              linkToStorageFile(item.medicalCertificate);
                            }
                          }}
                          download
                          className={
                            item.medicalCertificate
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.medicalCertificate ? "Download" : "N/A"}
                        </a>
                      </td>

                      <td className="py-3 cursor-pointer">
                        <button
                          className="border-b-2 border-[blue] text-[blue]"
                          onClick={() => {
                            handleClickForToggle();
                            handleViewClick(item, "LM");
                          }}
                        >
                          {item["submitted Form"] || "View"}
                        </button>
                      </td>
                      <td
                        className={`font-semibold ${getStatusClass(
                          item.managerStatus
                        )}`}
                      >
                        {(userType === "Supervisor" && item.supervisorStatus) ||
                          (userType === "Manager" && item.managerStatus)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={heading.length} className="text-center py-4">
                    {errorState?.searchError 
                      ? "No matching results found for your search"
                      : errorState?.dateError 
                      ? "No records found for the selected date"
                      : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            {errorState?.dateError ? (
              <>
                <p className="text-[red]">No records found for the selected date: {selectedDate}</p>
                <p className="text-sm mt-2">Please select a different date or clear the date filter</p>
              </>
            ) : errorState?.searchError ? (
              <p>No matching results found for your search</p>
            ) : (
              <p>Currently, no employees have requested leave.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
