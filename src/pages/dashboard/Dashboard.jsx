import React, { useEffect, useCallback, useContext } from "react";
import { ApplicationReceived } from "./ApplicationReceived";
import { PathHead } from "./PathHead";
import { RecentNotify } from "./RecentNotify";
import { NewJoineeTable } from "./NewJoineeTable";
import { BirthdayReminder } from "./BirthdayReminder";
import { UserProgress } from "./UserProgress";
import usePermission from "../../hooks/usePermissionDashInside";
import { DataSupply } from "../../utils/DataStoredContext";

export const Dashboard = () => {
  const dashboardPermissions = usePermission("userID", "Dashboard");
  const { loading } = useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Memoized component rendering function
  const renderComponent = useCallback(() => {
    // Show skeleton loaders while data is loading
    if (loading) {
      return (
        <div className="flex flex-col">
          {/* PathHead skeleton - grid of 4 cards */}
          <div className="grid grid-cols-4 p-4 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-red to-BColor rounded-lg shadow-lg animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-1 h-16 mr-4 border rounded-md bg-dark_lavender border-BColor"></div>
                    <div>
                      <div className="w-12 h-8 bg-dark_lavender rounded mb-2"></div>
                      <div className="w-24 h-4 bg-dark_lavender rounded"></div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-dark_lavender rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 px-3 w-full py-2">
            {/* Column 1: Recent Notifications skeleton */}
            <div className="flex-1 w-full">
              <div className="flex justify-center p-2 w-full h-full">
                <div className="rounded-2xl shadow-md w-full bg-white overflow-hidden">
                  <div className="bg-lite_grey rounded-t-2xl font-semibold p-3 animate-pulse">
                    <div className="h-4 bg-[#DDDDDD] rounded w-1/3"></div>
                  </div>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-6 gap-4 border-b border-lite_grey animate-pulse"
                    >
                      <div className="flex flex-col justify-center items-center w-12 h-12 rounded-md bg-medium_blue"></div>
                      <div className="flex flex-col flex-1">
                        <div className="w-24 h-4 bg-lite_grey rounded mb-2"></div>
                        <div className="w-full h-3 bg-lite_grey rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Application Received skeleton */}
            <div className="w-full flex-1">
              <div className="flex justify-center h-full flex-col p-2 w-full">
                <div className="bg-lite_grey rounded-t-2xl font-semibold p-3 animate-pulse">
                  <div className="h-4 bg-[#DDDDDD] rounded w-1/2"></div>
                </div>
                <div className="rounded-lg shadow-md w-full center h-full">
                  <div className="flex flex-col items-center justify-center p-1">
                    <div className="w-full flex flex-wrap justify-evenly items-center custom-gap gap-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg shadow-lg flex items-center border h-[120px] w-[150px] border-lite_grey animate-pulse"
                        >
                          <div
                            className={`w-2 h-28 rounded-md ${
                              index === 0
                                ? "bg-purple"
                                : index === 1
                                ? "bg-yellow"
                                : index === 2
                                ? "bg-red"
                                : "bg-green"
                            }`}
                          ></div>
                          <div className="w-full flex justify-center items-center flex-col m-1">
                            <div className="w-20 h-4 bg-lite_grey rounded mb-2"></div>
                            <div className="w-8 h-6 bg-lite_grey rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: User Action and Birthday Reminder skeletons */}
            <div className="flex-1 gap-2 flex flex-col justify-between items-end h-full">
              <div className="w-full flex-1">
                <div className="flex justify-evenly items-center w-full gap-3 bg-white py-7 px-2 rounded-2xl shadow-lg animate-pulse h-full">
                  <div className="text-center w-full">
                    <div className="h-4 bg-lite_grey rounded w-3/4 mx-auto mb-2"></div>
                    <div className="relative w-full h-2 bg-lite_grey rounded-full overflow-hidden my-2">
                      <div className="absolute h-full bg-dark_lavender w-1/2" />
                    </div>
                    <div className="h-3 bg-lite_grey rounded w-1/4 mx-auto"></div>
                  </div>
                  <div className="text-center w-full">
                    <div className="h-4 bg-lite_grey rounded w-3/4 mx-auto mb-2"></div>
                    <div className="relative w-full h-2 bg-lite_grey rounded-full overflow-hidden my-2">
                      <div className="absolute h-full bg-dark_lavender w-1/3" />
                    </div>
                    <div className="h-3 bg-lite_grey rounded w-1/4 mx-auto"></div>
                  </div>
                </div>
              </div>
              <div className="w-full flex-1">
                <div className="w-full shadow-md rounded-2xl bg-white h-full overflow-hidden animate-pulse">
                  <div className="bg-lite_grey p-4 rounded-t-2xl">
                    <div className="h-4 bg-[#DDDDDD] rounded w-1/3"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-3 bg-lite_grey rounded w-1/4 mb-4"></div>
                    <div className="mt-4 grid grid-cols-2 gap-5">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[auto,1fr] gap-2 items-center bg-lite_skyBlue p-2 rounded-md shadow-sm"
                        >
                          <div className="w-10 h-10 rounded-full bg-lite_grey"></div>
                          <div className="p-1 min-w-0">
                            <div className="h-2 bg-lite_grey rounded mb-1"></div>
                            <div className="h-2 bg-lite_grey rounded mb-1 w-3/4"></div>
                            <div className="h-2 bg-lite_grey rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                      <div className="h-3 bg-lite_grey rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Joinee Table skeleton */}
          <div className="mt-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg m-2 animate-pulse">
              <div className="bg-lite_grey px-6 py-4 flex items-center justify-between">
                <div className="h-4 bg-[#DDDDDD] rounded w-1/4"></div>
                <div className="h-3 bg-[#DDDDDD] rounded w-16"></div>
              </div>
              <div className="min-w-full bg-white">
                <div className="text-center border-b border-lite_grey">
                  <div className="grid grid-cols-6 py-3">
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                    <div className="h-4 bg-lite_grey rounded mx-6"></div>
                  </div>
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border-b border-lite_grey">
                    <div className="grid grid-cols-6 py-4">
                      <div className="flex items-center gap-3 px-6">
                        <div className="w-9 h-9 rounded-full bg-lite_grey"></div>
                        <div className="h-4 bg-lite_grey rounded w-1/2"></div>
                      </div>
                      <div className="flex items-center px-6">
                        <div className="h-4 bg-lite_grey rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center px-6">
                        <div className="h-4 bg-lite_grey rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center px-6">
                        <div className="h-4 bg-lite_grey rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center px-6">
                        <div className="h-4 bg-lite_grey rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center px-6">
                        <div className="h-4 bg-lite_grey rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

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
              <ApplicationReceived />
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
        {dashboardPermissions.includes("New Joinee") && (
          <div>
            {" "}
            <NewJoineeTable />
          </div>
        )}
      </div>
    );
  }, [dashboardPermissions, loading]);

  return (
    <section className="flex flex-col w-full pb-10 pt-5">
      {/* Render components based on visibleData */}
      {renderComponent()}
    </section>
  );
};
