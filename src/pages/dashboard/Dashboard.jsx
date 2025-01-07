import React, { useEffect, useCallback } from "react";
import { Round } from "./Round";
import { PathHead } from "./PathHead";
import { NewsEvent } from "./NewsEvent";
import { NewJoineeTable } from "./NewJoineeTable";
import { BirthdayReminder } from "./BirthdayReminder";
import { UserProgress } from "./UserProgress ";
import usePermission  from "../../hooks/usePermissionDashInside";

export const Dashboard = () => {
  const dashboardPermissions = usePermission("userID", "Dashboard");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Memoized component rendering function
  const renderComponent = useCallback(() => {
    return (
      <>
        {dashboardPermissions.includes("Employee count") && <PathHead />}
        <div className="flex gap-2 px-3 my-5 w-full">
          {/* Column 1: Recent Notifications */}
          {dashboardPermissions.includes("Recent Notifications") && (
            <div className="flex-1 w-full ">
              <div className="w-full h-full">
                <NewsEvent />
              </div>
            </div>
          )}

          {/* Column 2: Attendance */}
          {dashboardPermissions.includes("Application Received") && (
            <div className="flex-1 w-full">
              <div className="w-full h-full">
                <Round />
              </div>
            </div>
          )}

          {/* Column 3: User Action and Birthday Reminder */}
          {(dashboardPermissions.includes("User Action") ||
            dashboardPermissions.includes("Birthday Reminder")) && (
            <div className="flex-1 gap-4 pb-1 flex flex-col justify-between items-end overflow-hidden px-1">
              {dashboardPermissions.includes("User Action") && (
                <div className="w-full">
                  <UserProgress />
                </div>
              )}
              {dashboardPermissions.includes("Birthday Reminder") && (
                <div className="w-full h-full">
                  <BirthdayReminder />
                </div>
              )}
            </div>
          )}
        </div>

        {/* New Joinee Table */}
        {dashboardPermissions.includes("New Joinee") && <NewJoineeTable />}
      </>
    );
  }, [dashboardPermissions]);

  return (
    <section className="flex flex-col w-full pb-10 pt-5">
      {/* Render components based on visibleData */}
      {renderComponent()}
    </section>
  );
};
