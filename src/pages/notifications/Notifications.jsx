import { useEffect, useState } from "react";
import { listEmailNotifis, listEmpPersonalInfos } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { Popup } from "./Popup";

export const Notifications = () => {
  const [listOfNotifications, setListOfNotifications] = useState([]);
  const [leaveOfNotifications, setLeaveOfNotifications] = useState([]);
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [userID, setUserID] = useState("");
  const [specificNotificationDetails, setSpecificNotificationDetails] =
    useState();
    const [popupData, setPopupData] = useState();
  const client = generateClient();

  const toggleFunction = () => {
    setToggleForPopup(!toggleForPopup);
  };
  const sendToPopup = (object, leave) => {
    setSpecificNotificationDetails(object);
    setPopupData(leave)
  
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    // console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    console.log(userID, "userid");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailNotifis = await client.graphql({ query: listEmailNotifis });
        const leaveNotification = emailNotifis?.data?.listEmailNotifis?.items;

        // Log the receipentEmpID for debugging
        console.log(
          "Leave Notifications (receipentEmpID):",
          leaveNotification.map((notification) => notification.receipentEmpID)
        );

        // Filter leave notifications for the logged-in user, ensuring recipientEmpID is not null or empty
        const filteredLeaveNotifications = leaveNotification.filter(
          (notification) => {
            // Normalize both IDs to lowercase for case-insensitive comparison
            const recipientEmpID = notification.receipentEmpID
              ? notification.receipentEmpID.trim().toLowerCase()
              : "";
            const loggedInUserID = userID ? userID.trim().toLowerCase() : "";

            // Log for debugging
            console.log(`Comparing: ${recipientEmpID} === ${loggedInUserID}`);

            // Return the notification if recipientEmpID matches loggedInUserID and is not null or empty
            return recipientEmpID === loggedInUserID && recipientEmpID !== ""; // Ensures valid recipientEmpID
          }
        );

        // Log the filtered leave notifications
        console.log(
          "Filtered Leave Notifications:",
          filteredLeaveNotifications
        );

        // Set leave notifications in the table
        const additionalNotifications = filteredLeaveNotifications.map(
          (notification) => ({
            empID: notification.empID,
            name: notification.name, // Adjust according to your data structure
            subject: notification.leaveType,
            message: notification.message,
            date: new Date(notification.createdAt).toLocaleDateString(),
            type: "Leave Notification",
          })
        );

        setLeaveOfNotifications(additionalNotifications);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, [userID]);

  const calculateNotificationDate = (expiryDate, monthsBefore) => {
    const date = new Date(expiryDate);
    date.setMonth(date.getMonth() - monthsBefore); // Adjust by the given number of months
    return date; // Return the Date object
  };

  const calculateNotificationYear = (expiryDate, yearsBefore) => {
    const date = new Date(expiryDate);
    date.setFullYear(date.getFullYear() - yearsBefore); // Adjust by the given number of years
    return date; // Return the Date object
  };

  const one = () => {
    const employeeData = [
      {
        empID: "E001",
        name: "John Doe",
        ProbationaryEndDate: "2024-11-15", // yyyy-mm-dd format, 1 month
        contractEndDate: "2024-12-15", // 2 months
        employmentPassExpiry: "2024-11-17", // 1 month
        passportExpiry: "2025-10-16", // 1 year
        bruneiMedicalExpiry: "2025-01-15", // 3 months
        employeeBadgeNumber: "BAT001",
        workPosition: "Admin",
        department: "web development",
        nationality: "Bruneian",
      },
      {
        empID: "E002",
        name: "Jane Smith",
        ProbationaryEndDate: "2024-11-16", // yyyy-mm-dd format, 1 month
        contractEndDate: "2025-01-15", // 2 months
        employmentPassExpiry: "2024-11-18", // 1 month
        passportExpiry: "2025-10-08", // 1 year
        bruneiMedicalExpiry: "2025-01-08", // 3 months
        employeeBadgeNumber: "BAT002",
        workPosition: "HR",
        department: "Mobile App development",
        nationality: "Brunei PR",
      },
      {
        empID: "E003",
        name: "Alice Brown",
        ProbationaryEndDate: "2024-12-15", // yyyy-mm-dd format, 1 month
        contractEndDate: "2024-12-16", // 2 months
        employmentPassExpiry: "2024-11-14", // 1 month
        passportExpiry: "2025-10-14", // 1 year
        bruneiMedicalExpiry: "2025-01-17", // 3 months
        employeeBadgeNumber: "BAT003",
        workPosition: "Time keeper",
        department: "web development",
        nationality: "Indian",
      },
    ];

    const notifications = employeeData.map((emp) => {
      const today = new Date();

      // Calculate notification dates
      const probationNotificationDate = calculateNotificationDate(
        new Date(emp.ProbationaryEndDate),
        1
      );
      const contractNotificationDate = calculateNotificationDate(
        new Date(emp.contractEndDate),
        2
      );
      const employeeNotificationDate = calculateNotificationDate(
        new Date(emp.employmentPassExpiry),
        1
      );
      const passportNotificationDate = calculateNotificationYear(
        new Date(emp.passportExpiry),
        1
      );
      const medicalNotificationDate = calculateNotificationDate(
        new Date(emp.bruneiMedicalExpiry),
        3
      );

      const notificationResults = [];
      if (
        today >= probationNotificationDate &&
        today <= new Date(emp.ProbationaryEndDate)
      ) {
        notificationResults.push({
          empID: emp.empID,
          empBatchNo: emp.employeeBadgeNumber,
          name: emp.name,
          possition: emp.workPosition,
          department: emp.department,
          type: "Probation",
          expiryDate: emp.ProbationaryEndDate,
          date: today.toLocaleDateString(),
          subject: "Probation Expiry",
          title: "Monthly Probation Expiry",
          nationality: emp.nationality,
        });
      }

      if (
        today >= contractNotificationDate &&
        today <= new Date(emp.contractEndDate)
      ) {
        notificationResults.push({
          empID: emp.empID,
          empBatchNo: emp.employeeBadgeNumber,
          name: emp.name,
          possition: emp.workPosition,
          department: emp.department,
          type: "Contract",
          expiryDate: emp.contractEndDate,
          date: today.toLocaleDateString(),
          subject: "Contract Expiry",
          title: "Monthly Contract Expiry",
          nationality: emp.nationality,
        });
      }

      if (
        today >= employeeNotificationDate &&
        today <= new Date(emp.employmentPassExpiry)
      ) {
        notificationResults.push({
          empID: emp.empID,
          empBatchNo: emp.employeeBadgeNumber,
          name: emp.name,
          possition: emp.workPosition,
          department: emp.department,
          type: "Employment Pass",
          expiryDate: emp.employmentPassExpiry,
          date: today.toLocaleDateString(),
          subject: "Employment Pass Expiry",
          title: "Monthly Employment Pass Expiry",
          nationality: emp.nationality,
        });
      }

      if (
        today >= passportNotificationDate &&
        today <= new Date(emp.passportExpiry)
      ) {
        notificationResults.push({
          empID: emp.empID,
          empBatchNo: emp.employeeBadgeNumber,
          name: emp.name,
          possition: emp.workPosition,
          department: emp.department,
          type: "Passport",
          expiryDate: emp.passportExpiry,
          date: today.toLocaleDateString(),
          subject: "Passport Expiry",
          title: "Monthly Passport Expiry",
          nationality: emp.nationality,
        });
      }

      if (
        today >= medicalNotificationDate &&
        today <= new Date(emp.bruneiMedicalExpiry)
      ) {
        notificationResults.push({
          empID: emp.empID,
          empBatchNo: emp.employeeBadgeNumber,
          name: emp.name,
          possition: emp.workPosition,
          department: emp.department,
          type: "Brunei Medical",
          expiryDate: emp.bruneiMedicalExpiry,
          date: today.toLocaleDateString(),
          subject: "Employment Medical Expiry",
          title: "Monthly Employment Pass Expiry",
          nationality: emp.nationality,
        });
      }

      return notificationResults; // Return notification results for this employee
    });

    // Flatten the nested arrays
    const flattenedNotifications = notifications.flat();

    // Set notifications state (if using React state)
    setListOfNotifications(flattenedNotifications);

    // Log results for now
    console.log(flattenedNotifications);
  };

  useEffect(() => {
    one();
  }, []);

  return (
    <section className="p-10 bg-[#F7F8F4] shadow-md rounded-lg">
      <div className=" bg-white rounded-2xl">
        <div className=" mb-4">
          <h2 className="text-lg font-semibold  pt-5 pl-16 text-dark_grey">
            Notification
          </h2>
          <p className="border-b-2 border-[#959595] mt-4"></p>
          {/* <div> */}
          {/* <button className="px-3 py-1 mt-5   ml-16 flex justify-center items-center bg-yellow rounded-full text_size_5">
            Dismiss All
          </button> */}
          {/* </div> */}
        </div>

        <table className="w-full text-sm">
          <thead className="text-grey">
            <tr className="uppercase bg-[#F1F1F1]">
              {/* <th className="p-5 w-10">
                <input type="checkbox" />
              </th> */}
              <th className="p-7 text-left">Date</th>
              <th className="p-7 text-left">Subject</th>
              {/* <th className="p-7 text-left">Title</th> */}
              <th className="p-7  text-left">Action</th>
              <th className="p-7  text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveOfNotifications &&
              leaveOfNotifications.map((notification, index) => (
                <tr key={index} className="border-b last:border-b-0 ">
                  <td className="p-7">{notification.date}</td>
                  <td className="p-7 text_size_6 text-dark_grey gap-5">
                    {notification.subject} <br />
                    <span className="text-sm text-dark_ash">
                  
                      {notification.message}...
                    </span>
                  </td>
                  <td className="pr-14 ">
                    <span
                      className="border-b-2 py-1 cursor-pointer"
                      onClick={() => {
                        toggleFunction();
                        sendToPopup(notification);
                      }}
                    >
                      Read More
                    </span>
                  </td>
                  <td className="px-4">
                    <div className=" mt-3.5 w-[60px] border label-new ">
                      <span className="flex justify-center items-center">
                        New
                      </span>
                    </div>
                  </td>
                  {/* {notification.isNew && (   
              <td className=" mt-3.5 w-[60px] border label-new ">
                   <span className="flex justify-center items-center"> New</span>
              </td>
              )} */}
                </tr>
              ))}
          </tbody>
          <tbody>
            {listOfNotifications &&
              listOfNotifications.map((notification1, index) => (
                <tr key={index} className="border-b last:border-b-0 ">
                  <td className="p-7">{notification1.date}</td>
                  <td className="p-7 text_size_6 text-dark_grey gap-5">
                    {notification1.subject} <br />
                    <span className="text-sm text-dark_ash">
                      Please take immediate action to renew your{" "}
                      {notification1.subject}...
                    </span>
                  </td>
                  <td className="pr-14 ">
                    <span
                      className="border-b-2 py-1 cursor-pointer"
                      onClick={() => {
                        toggleFunction();
                        sendToPopup(notification1);
                      }}
                    >
                      Read More
                    </span>
                  </td>
                  <td className="px-4">
                    <div className=" mt-3.5 w-[60px] border label-new ">
                      <span className="flex justify-center items-center">
                        New
                      </span>
                    </div>
                  </td>
                  {/* {notification.isNew && (   
              <td className=" mt-3.5 w-[60px] border label-new ">
                   <span className="flex justify-center items-center"> New</span>
              </td>
              )} */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {toggleForPopup && (
        <Popup
          toggleFunction={toggleFunction}
          specificNotificationDetails={specificNotificationDetails}
          popupData={popupData}
        />
      )}
    </section>
  );
};
