import React from "react";
import { Link, useLocation } from "react-router-dom";

export const NavigateLM = ({ userType }) => {
  const location = useLocation();
  return (
    <section className="flex text-center items-center py-3 text_size_5">
      <Link
        to="/leaveManage"
        className={`pr-2 relative after:absolute after:-bottom-1 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManage" ? "after:bg-primary" : ""
        }`}
      >
        Request Leave
      </Link>{" "}
      <Link
        to="/leaveManage/historyLeave"
        className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManage/historyLeave"
            ? "after:bg-primary"
            : ""
        }`}
      >
        History of leave
      </Link>{" "}
      <Link
        to="/leaveManage/leaveBalance"
        className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
          location.pathname === "/leaveManage/leaveBalance"
            ? "after:bg-primary"
            : ""
        }`}
      >
        Employee Leave Balance
      </Link>{" "}
      {(userType === "HR" || userType === "SuperAdmin") && (
        <>
          {" "}
          <Link
            to="/leaveManage/requestTickets"
            className={`px-1 relative after:absolute after:-bottom-2 after:left-0 after:w-[90%] after:h-1 cursor-pointer ${
              location.pathname === "/leaveManage/requestTickets"
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
