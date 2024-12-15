import { useOutletContext } from "react-router-dom";

export const TicketsTable = () => {
  const {
    filteredData,
    handleViewClick,
    handleClickForToggle,
    formatDate,
    userType,
    currentPage,
    rowsPerPage,
  } = useOutletContext();
  // console.log(filteredData);
  
//   const check=filteredData.map((val)=>{
// return val.empID
//   })
//   console.log(check);
  const startIndex = (currentPage - 1) * rowsPerPage;

  const heading = [
    "S.No",
    "Emp ID",
    "Name",
    "Department",
    "Position",
    "Date Join",
    "Departure date",
    "Arrival date",
    "Submitted form",
    userType !== "SuperAdmin" && "Status",
  ];
  const isValidData = Array.isArray(filteredData) && filteredData.length > 0;

  return (
    <section>
      <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] max-w-[100%] overflow-x-auto flex-grow rounded-xl">
        {isValidData ? (
          <table className="w-[1150px] font-semibold text-sm">
            <thead className="bg-[#939393] sticky top-0 rounded-t-lg">
              <tr className="px-6">
                {heading.map((header, index) => (
                  <th key={index} className="py-5 text-[15px] text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData ? (
                filteredData.map((item, index) => {
                  const displayIndex = startIndex + index + 1; // Adjust index based on pagination
                  // console.log(item.empID);

                  return (
                    <tr
                      key={index}
                      className="text-center text-sm shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                    >
                      <td className="border-b-2  border-[#CECECE] py-5">
                        {displayIndex}
                      </td>
                      <td className="border-b-2  border-[#CECECE] py-5">
                        {item?.empID}
                      </td>
                      <td className="border-b-2  border-[#CECECE] py-5">
                        {item?.employeeInfo.name}
                      </td>
                      <td className="border-b-2 border-[#CECECE] py-5">
                        {Array.isArray(item.workInfo?.department) &&
                        item.workInfo.department.length > 0
                          ? item.workInfo.department[
                              item.workInfo.department.length - 1
                            ]
                          : "N/A"}
                      </td>
                      <td className="border-b-2 border-[#CECECE] py-5">
                        {Array.isArray(item.workInfo?.position) &&
                        item.workInfo.position.length > 0
                          ? item.workInfo.position[
                              item.workInfo.position.length - 1
                            ]
                          : "N/A"}
                      </td>

                      <td className="border-b-2  border-[#CECECE] py-5">
                        {formatDate(item.ticketRequest.createdAt)}
                      </td>
                      <td className="border-b-2  border-[#CECECE] py-5">
                        {formatDate(item.ticketRequest.departureDate)}
                      </td>
                      <td className="border-b-2  border-[#CECECE] py-5">
                        {formatDate(item.ticketRequest.arrivalDate)}
                      </td>

                      <td className="border-b-2  border-[#CECECE] cursor-pointer py-5">
                        <span
                          className="border-b-2 text-[blue] "
                          onClick={() => {
                            handleClickForToggle();
                            handleViewClick(item, "Tickets");
                          }}
                        >
                          {"View"}
                        </span>
                      </td>
                      {userType !== "SuperAdmin" && (
                        <td
                          className={`border-b-2 border-[#CECECE] py-5 ${
                            item.ticketRequest.hrStatus === "Rejected"
                              ? "text-[#C50000]"
                              : item.hrStatus === "Approved"
                              ? "text-[#0CB100]"
                              : item.hrStatus === "Pending"
                              ? "text-dark_grey"
                              : ""
                          }`}
                        >
                          {item.ticketRequest.hrStatus}
                        </td>
                      )}
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
            <p>Ticket Request not available.</p>
          </div>
        )}
      </div>
    </section>
  );
};
