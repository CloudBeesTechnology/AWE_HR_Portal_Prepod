import React, { useEffect, useCallback } from "react";
import { ApplicationReceived} from "./ApplicationReceived";
import { PathHead } from "./PathHead";
import { RecentNotify } from "./RecentNotify";
import { NewJoineeTable } from "./NewJoineeTable";
import { BirthdayReminder } from "./BirthdayReminder";
import { UserProgress } from "./UserProgress ";
import usePermission from "../../hooks/usePermissionDashInside";

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
      <div className="flex flex-col">
        {dashboardPermissions.includes("Employee count") && (
          <div>
            <PathHead />
          </div>
        )}
        <div className="flex gap-2 px-3 w-full py-2">
          {/* Column 1: Recent Notifications */}
          {dashboardPermissions.includes("Recent Notifications") && (
            <div className="flex-1 w-full">
              <RecentNotify />
            </div>
          )}

          {/* Column 2: Attendance */}
          {dashboardPermissions.includes("Application Received") && (
            
              <div className="w-full flex-1">
                <ApplicationReceived/>
              </div>
           
          )}

          {/* Column 3: User Action and Birthday Reminder */}
          {(dashboardPermissions.includes("User Action") ||
            dashboardPermissions.includes("Birthday Reminder")) && (
            <div className="flex-1 gap-2  flex flex-col justify-between items-end h-full ">
              {dashboardPermissions.includes("User Action") && (
                <div className="w-full flex-1">
                  <UserProgress />
                </div>
              )}
              {dashboardPermissions.includes("Birthday Reminder") && (
                <div className="w-full flex-1">
                  <BirthdayReminder />
                </div>
              )}
            </div>
          )}
        </div>

        {/* New Joinee Table */}
        {dashboardPermissions.includes("New Joinee") && <div> <NewJoineeTable /></div>}
      </div>
    );
  }, [dashboardPermissions]);

  return (
    <section className="flex flex-col w-full pb-10 pt-5">
      {/* Render components based on visibleData */}
      {renderComponent()}
    </section>
  );
};
