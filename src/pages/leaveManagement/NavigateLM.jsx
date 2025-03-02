import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTempID } from "../../utils/TempIDContext";

export const NavigateLM = ({ userType }) => {
  const location = useLocation();
  const { gmPosition, HRMPosition } = useTempID();
  const GM = "GENERAL MANAGER";
  const HRM = "HR MANAGER"
  return (
    <section className="flex text-center items-center py-3 text_size_5">
      <Link
        to="/leaveManagement"
        className={`pr-2 relative after:absolute after:-bottom-1 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManagement" ? "after:bg-primary" : ""
        }`}
      >
        Request Leave
      </Link>{" "}
      <Link
        to="/leaveManagement/historyLeave"
        className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManagement/historyLeave"
            ? "after:bg-primary"
            : ""
        }`}
      >
        History of leave
      </Link>{" "}
      <Link
        to="/leaveManagement/leaveBalance"
        className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManagement/leaveBalance"
            ? "after:bg-primary"
            : ""
        }`}
      >
        Employee Leave Balance
      </Link>{" "}
      {(
        HRMPosition === HRM 
      ||
        userType === "SuperAdmin"
        //  ||
        // gmPosition === GM
      ) && (
        <>
          {" "}
          <Link
            to="/leaveManagement/requestTickets"
            className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
              location.pathname === "/leaveManagement/requestTickets"
                ? "after:bg-primary"
                : ""
            }`}
          >
            Request Tickets
          </Link>
        </>
      )}
    </section>
  );
};
