import { useEffect, useState } from "react";
import { Popup } from "./Popup";
import { useNotifiCenter } from "../../hooks/useNotifiCenter";

export const Notifications = () => {
  const { matchingNotifications, handleReadMore } = useNotifiCenter();
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [specificNotificationDetails, setSpecificNotificationDetails] =
    useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (matchingNotifications !== undefined && matchingNotifications !== null) {
      setLoading(false); 
    }
  }, [matchingNotifications]);

  return (
    <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg min-h-screen">
      <div className="bg-white rounded-2xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold pt-5 pl-16 text-dark_grey">
            Notification
          </h2>
          <p className="border-b-2 border-[#959595] mt-4"></p>
        </div>

        {loading ? ( // 🔹 Show loading indicator while fetching data
          <div className="text-center p-7 mt-20">
            <span>Loading...</span>
          </div>
        ) : matchingNotifications.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="text-grey">
              <tr className="uppercase bg-[#F1F1F1]">
                <th className="p-7 text-left">Date</th>
                <th className="p-7 text-left">Subject</th>
                <th className="p-7 text-left">Action</th>
                <th className="p-7 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...matchingNotifications]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((notification, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-7 w-[150px]">{notification.date}</td>
                    <td className="p-7 text_size_6 text-dark_grey flex flex-col gap-y-3">
                      {notification.leaveType} <br />
                      <span className="text-sm text-dark_ash">
                        {notification?.message?.split(":")[0].trim()}...
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="border-b-2 py-1 cursor-pointer"
                        onClick={() => {
                          setToggleForPopup(true);
                          setSpecificNotificationDetails(notification);
                          handleReadMore(notification, index);
                        }}
                      >
                        Read More
                      </span>
                    </td>
                    <td className="px-4 text-center">
                      {notification.status === "Read" ? (
                        <div className="mt-3.5 w-[60px] label-read">
                          <span className="flex justify-center items-center text-grey">
                            Seen
                          </span>
                        </div>
                      ) : (
                        <div className="mt-3.5 w-[60px] border label-new">
                          <span className="flex justify-center items-center text-white">
                            New
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-7 mt-20">
            <span>No Notifications Found</span>
          </div>
        )}
      </div>

      {toggleForPopup && specificNotificationDetails && (
        <Popup
          toggleFunction={() => setToggleForPopup(false)}
          specificNotificationDetails={specificNotificationDetails}
        />
      )}
    </section>
  );
};
