import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { DateFormat } from "../../utils/DateFormat";

export const Popup = ({ toggleFunction, specificNotificationDetails }) => {
  // Extracting the message
  const messageText = specificNotificationDetails?.message || "";

  // Define the pattern to extract the employee details (empID, name, expiry date)
  const employeePattern =
    /(\d+)-([A-Za-z0-9]+)-([A-Za-z\s]+)-([A-Za-z\s]+)-(\d{2}-\d{2}-\d{4})/g;

  // Match the pattern in the message to extract the employee details
  const employeeDetails = [];
  let match;
  while ((match = employeePattern.exec(messageText)) !== null) {
    employeeDetails.push({
      empID: match[1],
      badgeNo: match[2],
      name: match[3],
      position: match[4],
      expiryDate: match[5],
    });
  }

  const notificationTypes = [
    "Passport Expiry",
    "Employment Pass Expiry",
    "LD Expiry",
    "Medical Expiry",
    "Training Certificate Expiry",
    "Probation Review Expiry",
    "Contract Expiry",
  ];
  let remainingMessage = "";
  const messageContent = specificNotificationDetails?.message || "";
  // console.log("Original Message:", messageContent);

  // Check if "Dear HR," exists in the message
  const hasDearHR = messageContent.includes("Dear");

  if (hasDearHR) {
    // Extract remaining message after "Dear HR,"
    remainingMessage = messageContent.split("Dear")[1]?.trim() || "";
  } else {
    remainingMessage = messageContent;
  }

  // Ensure sentences are properly split
  let messageLines = remainingMessage
    ? remainingMessage.split(/(?<=[.!?])\s+/)
    : [];

  let formattedLines = [];

  if (hasDearHR) {
    formattedLines.push("Dear");
    formattedLines.push(...messageLines);
  } else {
    formattedLines.push(...messageLines);
  }

  // Ensure the last message line ends with a period
  const lastIndex = formattedLines.length - 1;
  if (
    lastIndex >= 0 &&
    formattedLines[lastIndex] &&
    !formattedLines[lastIndex].endsWith(".")
  ) {
    formattedLines[lastIndex] += ".";
  }

  const trainingData = specificNotificationDetails?.leaveType?.includes(
    "Training Requestor"
  )
    ? specificNotificationDetails?.message
    : "";
  const jsonStart = trainingData.indexOf("[");
  const jsonEnd = trainingData.lastIndexOf("]") + 1;
  const descriptionTraining =
    jsonStart !== -1 ? trainingData.slice(0, jsonStart).trim() : "";
  let courseArray = [];

  if (jsonStart !== -1 && jsonEnd !== -1) {
    try {
      const jsonString = trainingData.slice(jsonStart, jsonEnd);
      courseArray = JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse course array:", error);
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-5 z-50">
      <div className="center w-full ">
        {/* Render Employee Data Table */}
        {notificationTypes.includes(specificNotificationDetails?.leaveType) ? (
          <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md border h-full overflow-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <TbArrowBackUp
                className="text-2xl cursor-pointer"
                onClick={toggleFunction}
              />
              <p className="text-dark_grey text-[14px] pl-5">
                {specificNotificationDetails.date}
              </p>
            </div>
            <div className="grid gap-4 mt-2">
              <p className="text-[18px] font-medium text-center">
                {specificNotificationDetails?.leaveType}
              </p>
              <p className="text-[16px] font-medium">
                {specificNotificationDetails?.message.split(":")[0].trim()}
              </p>
              <p className="text-[16px] font-bold">Employee Details :</p>
              <table className="min-w-full mt-3">
                <thead>
                  <tr>
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">EmpID</th>
                    <th className="border p-2">Badge No</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">position</th>
                    <th className="border p-2">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeDetails.map((employee, index) => (
                    <tr key={index}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{employee.empID}</td>
                      <td className="border p-2">{employee.badgeNo}</td>
                      <td className="border p-2">{employee.name}</td>
                      <td className="border p-2">{employee.position}</td>
                      <td className="border p-2">{employee.expiryDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[16px] font-medium">
                {specificNotificationDetails?.message
                  .split(/(?=\bKindly take the necessary action\b)/)[1]
                  ?.trim()}
              </p>
            </div>{" "}
          </section>
        ) : specificNotificationDetails?.leaveType.includes(
            "Training Requestor"
          ) ? (
          <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md w-[70%]">
            <div className="flex justify-between items-center border-b pb-2">
              <TbArrowBackUp
                className="text-2xl cursor-pointer"
                onClick={toggleFunction}
              />
              <p className="text-dark_grey text-[14px] pl-5">
                {specificNotificationDetails.date}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <p className="text-[16px] font-bold">Emp ID :</p>
              <p className="text-dark_grey text-[14px] font-medium pl-5">
                {specificNotificationDetails?.empID}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-2">
              <p className="text-[16px] font-bold">Subject :</p>
              <p className="text-dark_grey text-[14px] font-medium pl-5">
                {" "}
                {specificNotificationDetails.leaveType}
              </p>
            </div>
            <div className="grid mt-2">
              <div className="grid grid-cols-2 mt-2">
                <p className=" text-[16px] font-bold">Description : </p>
                <p className="text-dark_grey text-[14px] font-medium pl-5">
                  {descriptionTraining}
                </p>
              </div>
              <table className="border my-10">
                <thead className="border">
                  <tr>
                    <th className="border px-3 py-2">S.No</th>
                    <th className="border px-3 py-2">Course Code</th>
                    <th className="border px-3 py-2">Course Name</th>
                    <th className="border px-3 py-2">Company</th>
                    <th className="border px-3 py-2">Start Date</th>
                    <th className="border px-3 py-2">End Date</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">MR No</th>
                    <th className="border px-3 py-2">Fee</th>
                  </tr>
                </thead>

                <tbody>
                  {courseArray.map((course, index) => (
                    <tr key={index} className="border">
                      <td className="border  px-2 py-1">{index + 1}</td>
                      <td className="border  px-2 py-1">{course.courseCode}</td>
                      <td className="border  px-2 py-1">{course.courseName}</td>
                      <td className="border  px-2 py-1">{course.company}</td>
                      <td className="border  px-2 py-1">{DateFormat(course.traineeSD)}</td>
                      <td className="border  px-2 py-1">{DateFormat(course.traineeED)}</td>
                      <td className="border  px-2 py-1">{course.traineeStatus || "-"}</td>
                      <td className="border  px-2 py-1">{course.MRNo || "-"}</td>
                      <td className="border  px-2 py-1">
                        {course.traineeCourseFee?.trim() || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md max-w-md  w-full">
            <div className="flex justify-between items-center border-b pb-2">
              <TbArrowBackUp
                className="text-2xl cursor-pointer"
                onClick={toggleFunction}
              />
              <p className="text-dark_grey text-[14px] pl-5">
                {specificNotificationDetails.date}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <p className="text-[16px] font-bold">Emp ID :</p>
              <p className="text-dark_grey text-[14px] font-medium pl-5">
                {specificNotificationDetails?.empID}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-2">
              <p className="text-[16px] font-bold">Subject :</p>
              <p className="text-dark_grey text-[14px] font-medium pl-5">
                {" "}
                {specificNotificationDetails.leaveType}
              </p>
            </div>
            <div className="grid mt-2">
              <p className=" text-[16px] font-bold">Description :</p>
              {formattedLines.map((line, index) => {
                // console.log(line,"sdfgh");

                return (
                  <p
                    key={index}
                    className="text-dark_grey text-[14px] font-medium mt-2"
                  >
                    {line.trim()}
                  </p>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
