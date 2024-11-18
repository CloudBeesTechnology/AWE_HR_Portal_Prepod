import { useEffect, useState } from "react";
// import {
//   listEmployeePersonalDocs,
//   listEmployeePersonalInfos,
//   listEmployeeWorkInfos,
//   listLabourDependentPasses,
//   listLabourMedicalInfos,
//   listLabourWorkPasses,
//   listLeaveWorkInfos,
//   listTerminationWorkInfos,
// } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { Popup } from "./Popup";

export const Notifications = () => {
  const [mergeData, setMergeData] = useState();
  const [listOfNotifications, setListOfNotifications] = useState([]);
  const [toggleForPopup, setToggleForPopup] = useState(false);
  const [specificNotificationDetails, setSpecificNotificationDetails] =
    useState();
  const client = generateClient();

  const toggleFunction = () => {
    setToggleForPopup(!toggleForPopup);
  };
  const sendToPopup = (object) => {
    setSpecificNotificationDetails(object);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          empPersonalInfos,
          empPersonalDocs,
          labourDependentPasses,
          labourMedicalInfo,
          labourWorkPasses,
          employeeWorkInfo,
          terminationWorkInfo,
          leaveWorkInfo,
        ] = await Promise.all([
          client.graphql({ query: listEmployeePersonalInfos }),
          client.graphql({ query: listEmployeePersonalDocs }),
          client.graphql({ query: listLabourDependentPasses }),
          client.graphql({ query: listLabourMedicalInfos }),
          client.graphql({ query: listLabourWorkPasses }),
          client.graphql({ query: listEmployeeWorkInfos }),
          client.graphql({ query: listTerminationWorkInfos }),
          client.graphql({ query: listLeaveWorkInfos }),
        ]);

        const candidates =
          empPersonalInfos?.data?.listEmployeePersonalInfos?.items;
        const interviews =
          empPersonalDocs?.data?.listEmployeePersonalDocs?.items;
        const dependentPasses =
          labourDependentPasses?.data?.listLabourDependentPasses?.items;
        const medicalInfo =
          labourMedicalInfo?.data?.listLabourMedicalInfos?.items;
        const workPasses = labourWorkPasses?.data?.listLabourWorkPasses?.items;
        const workInfo = employeeWorkInfo?.data?.listEmployeeWorkInfos?.items;
        const terminations =
          terminationWorkInfo?.data?.listTerminationWorkInfos?.items;
        const leaves = leaveWorkInfo?.data?.listLeaveWorkInfos?.items;
        // console.log("listEmployeePersonalInfos : ", candidates);
        // console.log("listEmployeePersonalDocs : ", interviews);
        // console.log("listLabourDependentPasses : ", dependentPasses);
        // console.log("listLabourMedicalInfos : ", medicalInfo);
        // console.log("listLabourWorkPasses : ", workPasses);
        // console.log("listEmployeeWorkInfos : ", workInfo);
        // console.log("listTerminationWorkInfos", terminations);
        // console.log("listLeaveWorkInfos : ", leaves);
        const mergedData = candidates
          .map((candidate) => {
            const interviewDetails = interviews.find(
              (item) => item.empID === candidate.empID
            );
            const dependentPassDetails = dependentPasses.find(
              (item) => item.empID === candidate.empID
            );
            const medicalDetails = medicalInfo.find(
              (item) => item.empID === candidate.empID
            );
            const workPassDetails = workPasses.find(
              (item) => item.empID === candidate.empID
            );
            const workInfoDetails = workInfo.find(
              (item) => item.empID === candidate.empID
            );
            const terminationDetails = terminations.find(
              (item) => item.empID === candidate.empID
            );
            const leaveDetails = leaves.find(
              (item) => item.empID === candidate.empID
            );

            // Return null if all details are undefined
            if (
              !interviewDetails &&
              !dependentPassDetails &&
              !medicalDetails &&
              !workPassDetails &&
              !workInfoDetails &&
              !terminationDetails &&
              !leaveDetails
            ) {
              return null;
            }

            return {
              ...candidate,
              ...interviewDetails,
              ...dependentPassDetails,
              ...medicalDetails,
              ...workPassDetails,
              ...workInfoDetails,
              ...terminationDetails,
              ...leaveDetails,
            };
          })
          .filter((item) => item !== null); // Filter out null entries
        console.log(mergedData);
        setMergeData(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    // fetchData();
    return () => {
      // fetchData();
      one();
    };
  }, []);

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
      // return {
      //   empID: emp.empID,
      //   empBatchNo: emp.employeeBadgeNumber,
      //   name: emp.name,
      //   possition: emp.workPosition,
      //   department: emp.department,
      //   empPassExpiry: probationExpiryDate,
      //   date: today.toLocaleDateString(),
      // };
      // Check for each condition and push to notificationResults if true
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
              <th className="p-7  text-left"></th>
              <th className="p-7  text-left"></th>
            </tr>
          </thead>
          <tbody>
            {listOfNotifications &&
              listOfNotifications.map((notification, index) => (
                <tr key={index} className="border-b last:border-b-0 ">
                  {/* <td className="p-7">
                  <input type="checkbox" />
                </td> */}
                  <td className="p-7">{notification.date}</td>
                  <td className="p-7 text_size_6 text-dark_grey gap-5">
                    {notification.subject} <br />
                    <span className="text-sm text-dark_ash">
                      Please take immediate action to renew your{" "}
                      {notification.subject}...
                    </span>
                  </td>
                  {/* <td className="p-7  flex items-center gap-10">
                  <span
                    className="text-yellow border-b ml-1 cursor-pointer"
                    onClick={toggleFunction}
                  >
                    Read More
                  </span>

                  <div className=" mt-3.5 w-[60px] border label-new ">
                    <span className="flex justify-center items-center">
                      {" "}
                      New
                    </span>
                  </div>
                </td> */}
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
        </table>
      </div>
      {toggleForPopup && (
        <Popup
          toggleFunction={toggleFunction}
          specificNotificationDetails={specificNotificationDetails}
        />
      )}
    </section>
  );
};
