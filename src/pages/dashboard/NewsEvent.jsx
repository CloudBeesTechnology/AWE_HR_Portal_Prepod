import React, { useContext } from "react";
import { DataSupply } from "../../utils/DataStoredContext";
import { Link } from "react-router-dom";

export const NewsEvent = () => {
  const { EmailNotifi } = useContext(DataSupply);

  // Filter unread notifications
  const unreadNotifications = EmailNotifi.filter(notification => notification.status === 'Unread');

  // Limit to the first three notifications
  const limitedNotifications = unreadNotifications.slice(0, 3);

  // Define border colors for notifications
  const bgColors = ["bg-[#DEFFFF]", "bg-[#ECF9E2]", "bg-[#FFF3DC]"];

  return (
    <div className="flex justify-center h-full p-2 w-full">
      <div className="rounded-lg shadow-md w-full h-full">
        <div className="bg-lite_grey rounded-t-2xl font-semibold p-3">
          <h2 className=" mx-2">Recent Notifications</h2>
        </div>

        {limitedNotifications.map((notification, index) => {
          const { createdAt, leaveType, message } = notification;
          const date = new Date(createdAt);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'long' }).toUpperCase();

          return (
            <div
              key={index}
              className={`flex justify-evenly mt-5 items-center m-2 `}
            >
              <div className="w-[150px] p-4  ">
                <div className={`p-2 text-center  rounded-md ${bgColors[index]}`}>
                  <small>{day}</small><br />
                  <small>{month}</small>
                </div>
              </div>
              <div className="px-2 flex flex-col w-[200px] ">
                <small><b>{leaveType}</b></small>
                <small className="text-grey mt-1">{message}</small>
              </div>
            </div>
          );
        })}
          <div className=" underline text-[#8bb4f1] text-center px-16 mb-3">
          <Link to="/notifications">View More
          </Link>
          </div>
      </div>
   
    </div>
  );
};

