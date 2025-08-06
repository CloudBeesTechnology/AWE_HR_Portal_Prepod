import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNotifiCenter } from "../../hooks/useNotifiCenter";

export const RecentNotify = () => {
  const { matchingNotifications } = useNotifiCenter();

  const [notify, setNotify] = useState([]);

  useEffect(() => {
    setNotify(matchingNotifications);
  }, [matchingNotifications]);
  // Filter unread notifications and exclude ones where leaveType is null
  const unreadNotifications = notify
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .filter((notification) => notification.status === "Unread");

  // Limit to the first three notifications
  const limitedNotifications = unreadNotifications.slice(0, 3);

  // Define background colors for notifications
  const bgColors = ["bg-[#DEFFFF]", "bg-[#ECF9E2]", "bg-[#FFF3DC]"];
  const notificationTypes = [
    "Passport Expiry",
    "Employment Pass Expiry",
    "LD Expiry",
    "Medical Expiry",
    "Training Certificate Expiry",
    "Probation Review Expiry",
    "Contract Expiry",
  ];
  return (
    <div className="flex justify-center p-2 w-full h-full ">
      <div className="rounded-2xl shadow-md w-full bg-white overflow-hidden">
        <div className="bg-lite_grey rounded-t-2xl  font-semibold p-3">
          <h2 className="mx-2">Recent Notifications</h2>
        </div>

        {limitedNotifications.length > 0 ? (
          <section className="divide-y">
            {[...limitedNotifications].map((notification, index) => {
              const { createdAt, message } = notification;
              const date = new Date(createdAt);
              const day = date.getDate();
              const month = date
                .toLocaleString("default", { month: "long" })
                .toUpperCase();

              const cleanedMsg =
                typeof message === "string" && message.includes("Dear")
                  ? message.split(":")[0].trim()
                  : message;

              return notificationTypes?.includes(notification.leaveType) ? (
                <div key={index} className="flex items-center px-4 py-6 gap-4">
                  <div
                    className={`flex flex-col justify-center items-center w-12 h-12 rounded-md text-xs font-semibold text-dark_grey ${bgColors[index]}`}
                  >
                    <span className="text-base">{day}</span>
                    <span className="text-[10px] -mt-1">{month}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-dark_grey">
                      {notification?.leaveType}
                    </span>
                    +
                    <span className="text-xs text-dark_grey truncate max-w-[300px]">
                      {cleanedMsg}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex items-center px-4 py-6 gap-4">
                  <div
                    className={`flex flex-col justify-center items-center w-12 h-12 rounded-md text-xs font-semibold text-dark_grey ${bgColors[index]}`}
                  >
                    <span className="text-base">{day}</span>
                    <span className="text-[10px] -mt-1">{month}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-dark_grey">
                      {notification?.leaveType || "General"}
                    </span>
                    <span className="text-xs text-dark_grey truncate max-w-[300px]">
                      {cleanedMsg}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="text-center my-4">
              <Link
                to="/notifications"
                className="text-sm text-[blue] underline"
              >
                View More
              </Link>
            </div>
          </section>
        ) : (
          <div className="text-gray-500 text-center h-full py-20">
            <p>No new notifications available.</p>
          </div>
        )}
      </div>
    </div>
  );
};
