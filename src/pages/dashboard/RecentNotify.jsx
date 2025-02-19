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
      <div className="rounded-lg shadow-md w-full h-full">
        <div className="bg-lite_grey rounded-t-2xl  font-semibold p-3">
          <h2 className="mx-2">Recent Notifications</h2>
        </div>

        {limitedNotifications.length > 0 ? (
          <section>
            {[...limitedNotifications].map((notification, index) => {
              const { createdAt, message } = notification;
              const date = new Date(createdAt);
              const day = date.getDate();
              const month = date
                .toLocaleString("default", { month: "long" })
                .toUpperCase();

              return notificationTypes?.includes(notification.leaveType) ? (
                <div
                  key={index}
                  className="flex justify-evenly items-center m-2"
                >
                  <div className="w-[130px] p-4">
                    <div
                      className={`p-1 text-center rounded-md ${bgColors[index]}`}
                    >
                      <small>{day}</small>
                      <br />
                      <small>{month}</small>
                    </div>
                  </div>
                  <div className="px flex flex-col w-[200px]">
                    <small>
                      <b>{notification?.leaveType}</b>
                    </small>
                    <small className="text-grey mt-1">
                      {typeof message === "string" && message.includes("Dear")
                        ? message.split(":")[0].trim()
                        : message}
                    </small>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex justify-evenly items-center m-2"
                >
                  <div className="w-[130px] p-4">
                    <div
                      className={`p-1 text-center rounded-md ${bgColors[index]}`}
                    >
                      <small>{day}</small>
                      <br />
                      <small>{month}</small>
                    </div>
                  </div>
                  <div className="px flex flex-col w-[200px]">
                    <small>
                      <b>{notification?.leaveType}</b>
                    </small>
                    <small className="text-grey mt-1">
                      {typeof message === "string" && message.includes("Dear")
                        ? message.split(":")[0].trim()
                        : message}
                    </small>
                  </div>
                </div>
              );
            })}

            <div className="underline text-[#8bb4f1] text-center px-16  my-5">
              <Link to="/notifications">View More</Link>
            </div>
          </section>
        ) : (
          <div className="text-dark_grey text-center h-full  pt-40 overflow-hidden">
            <p>No new notifications available.</p>
          </div>
        )}
      </div>
    </div>
  );
};
