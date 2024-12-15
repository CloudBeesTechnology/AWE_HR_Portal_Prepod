import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../../assets/logo/logo-with-name.svg";

export const LeaveSummaryPopUp = ({ selectedEmployee, handleClosePopup }) => {
  return (
    <section className="fixed top-0 left-0 bg-grey bg-opacity-75 inset-0 z-50  w-full h-full  flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[1000px] overflow-y-auto max-h-[70%]">
        <div className="flex flex-col justify-between items-center mb-4">
          <article className="flex items-center justify-between w-full">
            <div className="flex-1 w-full center">
              <img
                className="max-w-[240px]  w-full"
                src={logo}
                alt="logo not found"
              />
            </div>{" "}
            <p className="text-4xl" onClick={handleClosePopup}>
              <IoIosCloseCircleOutline />
            </p>
          </article>
          <h2 className="uppercase text-xl text-start w-full font-bold">
            Leave Summary for {selectedEmployee?.employeeName}
          </h2>
        </div>
        <div className="space-y-4 font-semibold">
          {/* Employee Details */}
          <h2 className="uppercase"> Employee ID: {selectedEmployee?.empId}</h2>
          <h2 className="uppercase"> Total Leave Balances: </h2>
          <table className="min-w-full bg-white text-sm font-semibold">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-sm">Leave Type</th>
                <th className="border px-4 py-2 text-sm">Total Leave</th>
                <th className="border px-4 py-2 text-sm">Days Taken</th>
                <th className="border px-4 py-2 text-sm">Remaining Leave</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedEmployee).map(([leaveType, data]) => {
                if (leaveType !== "empId" && leaveType !== "employeeName") {
                  const leaveName = leaveType.replace(/([A-Z])/g, " $1").trim();
                  console.log(data);

                  return (
                    <tr key={leaveType}>
                      <td className="border px-4 py-2">{leaveName}</td>
                      <td className="border px-4 text-center py-2">
                        {data.total}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {data.taken}
                      </td>
                      <td className="border px-4 text-center py-2">
                        {data.remaining < 0 ? 0 : data.remaining}
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
