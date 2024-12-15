import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { getUrl } from "@aws-amplify/storage";
import { useOutletContext } from "react-router-dom";

export const LMTable = () => {
  const {
    handleClickForToggle,
    filteredData,
    handleViewClick,
    formatDate,
    userType,
    statusUpdate,
    currentPage,
    rowsPerPage,
  } = useOutletContext();
  const startIndex = (currentPage - 1) * rowsPerPage;
  const [storedData, setStoredData] = useState(filteredData);
  const [lastUploadUrl, setPPLastUP] = useState(""); // State to store the last uploaded file's URL
  const linkToStorageFile = async (pathUrl) => {
    try {
      const result = await getUrl({ path: pathUrl });

      setPPLastUP(result.url.href);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
    }
  };
  useEffect(() => {
    setStoredData(filteredData);
  }, [filteredData]);
  const heading = [
    "S. No",
    "Employee ID",
    "Name",
    "Received Date",
    userType !== "Supervisor" && userType !== "Manager" && "Supervisor Name",
    userType !== "Manager" && " Supervisor Approved Date",
    userType !== "Manager" && userType !== "Supervisor" && "Manager Name",
    userType !== "Supervisor" && "Manager Approved Date",
    "Documents",
    "Submitted Form",
    // "Action",
    userType !== "SuperAdmin" && userType !== "HR" && "Status",
  ].filter(Boolean);

  const editStatus = (itemId, status) => {
    // Call the statusUpdate function and update the local state
    statusUpdate(itemId, status).then((updatedItem) => {
      // console.log("Helo", editStatus);
      setStoredData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    });
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[green]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-[#E8A317]";
  };

  const userID = localStorage.getItem("userID");

  let finalData;

  if (userType === "Manager") {
    finalData = storedData.filter((item) => {
      const condition =
        (item?.supervisorStatus === "Approved" &&
          item?.managerEmpID.toString().toLowerCase() === userID) ||
        item?.managerEmpID.toString().toLowerCase() === userID;
      // (item?.managerEmpID.toString().toLowerCase() === userID ||
      //   item?.supervisorEmpID.toString().toLowerCase() === userID);

      return condition;
    });
  } else if (userType === "Supervisor") {
    finalData = storedData.filter((item) => {
      const condition =
        item?.supervisorEmpID?.toString().toLowerCase() || "" === userID;

      return condition;
    });
  } else {
    finalData = storedData;
  }

  return (
    <section className="flex flex-col w-full">
      <div className="leaveManagementTable w-full max-w-[100%] overflow-x-auto rounded-xl">
        {finalData && finalData.length > 0 ? (
          <table className="w-[1150px] font-semibold text-sm text-center">
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
              {finalData && finalData.length > 0 ? (
                finalData.map((item, index) => {
                  const displayIndex = startIndex + index + 1; // Adjust index based on pagination

                  return (
                    <tr
                      key={index}
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="py-3">{displayIndex}</td>
                      <td className="py-3">{item.empID}</td>
                      <td className="py-3">
                        {item.employeeInfo.name || "Tony Stark"}
                      </td>
                      <td className="py-3">{formatDate(item.createdAt)}</td>
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

                      <td className="py-3 ">
                        <a
                          href={lastUploadUrl}
                          onClick={(e) => {
                            if (!item.medicalCertificate) {
                              e.preventDefault(); // Prevent the default link behavior when there's no certificate
                            } else {
                              linkToStorageFile(item.medicalCertificate); // Trigger the download if the certificate exists
                            }
                          }}
                          download
                          className={
                            item.medicalCertificate
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          } // Apply underline only when medicalCertificate exists
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
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p> Currently, no employees have requested leave.</p>
          </div>
        )}
      </div>
      </section>
  );
};
