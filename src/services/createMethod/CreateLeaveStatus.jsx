import { useCallback } from "react";
import { createLeaveStatus } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";

export const CRLeaveData = () => {
  const client = generateClient();

  const CRLeaveDetails = useCallback(async ({ LeaveValue }) => {
    if (!LeaveValue) {
      throw new Error("Missing required parameters");
    }
    const DateFormat = (date) => {
      if (!date) return null;
      date = date?.replace(/-/g, "/");
      // console.log(date,"recevied date");
      const parts = date?.split("/");

      if (parts.length === 3) {
        let [part1, part2, part3] = parts;

        // Check the format based on the length of the parts
        if (part1.length === 4) {
          // This is the yyyy/mm/dd format
          const [year, month, day] = [part1, part2, part3];
          console.log(year, month, day, "first yyyy");
          return `${year}-${month}-${day}`;
        } else if (part3.length === 4) {
          // This is the dd/mm/yyyy format
          const [day, month, year] = [part1, part2, part3];

          // console.log(day, month, year, "last yyyy");

          return `${year}-${month}-${day}`;
        } else {
          // Handle other cases (e.g., invalid format)
          console.error("Invalid date format");
          return "";
        }
      } else {
        console.error("Invalid date format");
        return "";
      }
    };

    const {
      empID,
      leaveType,
      fromDate,
      toDate,
      days,
      applyTo,
      reason,
      medicalCertificate,
      supervisorName,
      supervisorEmpID,
      supervisorStatus,
      supervisorDate,
      supervisorRemarks,
      managerName,
      managerEmpID,
      managerStatus,
      managerDate,
      managerRemarks,
      receivedDate,
      empStatus,
      empDate,
      empRemarks,
      selectedFrom,
      selectedTo,
      startDate,
      endDate,
    } = LeaveValue;
    const fromValue = DateFormat(fromDate);
    // console.log(fromValue);

    const timingchangeFromDate = fromValue
      ? new Date(fromValue).toISOString()
      : null;
    // console.log(timingchangeFromDate);
    const toValue = DateFormat(toDate);
    const timingchangeToDate = toValue ? new Date(toValue)?.toISOString() : null;
    // console.log(timingchangeToDate);
    const supervisorDatevalue = DateFormat(supervisorDate);
    // console.log(supervisorDatevalue);

    const timingchangeSupDate = supervisorDatevalue
      ? new Date(supervisorDatevalue).toISOString()
      : null;
    // console.log(timingchangeSupDate);
    const managervalue = DateFormat(managerDate);
    const timingchangemanagerDate = managervalue
      ? new Date(managervalue).toISOString()
      : null;
    // console.log(timingchangemanagerDate);
    const applyToArray = applyTo.split(",").map((item) => item.trim());
    // console.log(applyToArray, "applyTo as array");
const selectedFrom1=DateFormat(selectedFrom)
const selectedTo1=DateFormat(selectedTo)
// console.log(receivedDate,"checking");
const creatingDate=DateFormat(receivedDate)

    const totalData = {
      empID,
      leaveType,
      fromDate: timingchangeFromDate,
      toDate: timingchangeToDate,
      days,
      applyTo: applyToArray,
      reason,
      medicalCertificate,
      supervisorName,
      supervisorEmpID,
      supervisorStatus,
      supervisorDate: timingchangeSupDate,
      supervisorRemarks,
      managerName,
      managerEmpID,
      managerStatus,
      managerDate: timingchangemanagerDate,
      managerRemarks,
      empStatus,
      receivedDate:creatingDate,
      empDate,
      empRemarks,
      selectedFrom:selectedFrom1,
      selectedTo:selectedTo1,
      startDate: DateFormat(startDate),
      endDate: DateFormat(endDate),
    };

    console.log(totalData);

    // try {
    //   const res = await Promise.all([
    //     client.graphql({
    //       query: createLeaveStatus,
    //       variables: { input: totalData },
    //     }),
    //   ]);
    //   console.log("Response", res);
    // } catch (error) {
    //   console.error("Error executing GraphQL requests:", error);
    //   throw error;
    // }
  }, []);

  return { CRLeaveDetails };
};


// import { useCallback } from "react";
// import { createLeaveStatus } from "../../graphql/mutations";
// import { generateClient } from "@aws-amplify/api";

// export const CRLeaveData = () => {
//   const client = generateClient();

//   const CRLeaveDetails = useCallback(async ({ LeaveValue }) => {
//     if (!LeaveValue) {
//       throw new Error("Missing required parameters");
//     }
//     const DateFormat = (date) => {
//       if (!date) return null;
//       date = date?.replace(/-/g, "/");
//       console.log(date);
//       const parts = date?.split("/");

//       if (parts.length === 3) {
//         let [part1, part2, part3] = parts;

//         // Check the format based on the length of the parts
//         if (part1.length === 4) {
//           // This is the yyyy/mm/dd format
//           const [year, month, day] = [part1, part2, part3];
//           return `${year}-${month}-${day}`;
//         } else if (part3.length === 4) {
//           // This is the dd/mm/yyyy format
//           const [day, month, year] = [part1, part2, part3];
//           return `${year}-${month}-${day}`;
//         } else {
//           // Handle other cases (e.g., invalid format)
//           console.error("Invalid date format");
//           return "";
//         }
//       } else {
//         console.error("Invalid date format");
//         return "";
//       }
//     };

//     const {
//       empID,
//       leaveType,
//       fromDate,
//       toDate,
//       days,
//       applyTo,
//       reason,
//       medicalCertificate,
//       supervisorName,
//       supervisorEmpID,
//       supervisorStatus,
//       supervisorDate,
//       supervisorRemarks,
//       managerName,
//       managerEmpID,
//       managerStatus,
//       managerDate,
//       managerRemarks,
//       empStatus,
//       empDate,
//       empRemarks,
//       receivedDate,
//       selectedFrom,
//       selectedTo,
//       startDate,
//       endDate,
//     } = LeaveValue;
//     const fromValue = DateFormat(fromDate);
//     console.log(fromValue);

//     const timingchangeFromDate = fromValue
//       ? new Date(fromValue).toISOString()
//       : null;
//     console.log(timingchangeFromDate);
//     const toValue = DateFormat(toDate);
//     const timingchangeToDate = toValue ? new Date(toValue).toISOString() : null;
//     console.log(timingchangeToDate);
//     const supervisorDatevalue = DateFormat(supervisorDate);
//     console.log(supervisorDatevalue);

//     const timingchangeSupDate = supervisorDatevalue
//       ? new Date(supervisorDatevalue).toISOString()
//       : null;
//     console.log(timingchangeSupDate);
//     const managervalue = DateFormat(managerDate);
//     const timingchangemanagerDate = managervalue
//       ? new Date(managervalue).toISOString()
//       : null;
//     console.log(timingchangemanagerDate);
//     const applyToArray = applyTo.split(",").map((item) => item.trim());
//     console.log(applyToArray, "applyTo as array");
//     const creatingDate=DateFormat(receivedDate)

//     const totalData = {
//       empID,
//       leaveType,
//       fromDate: timingchangeFromDate,
//       toDate: timingchangeToDate,
//       days,
//       applyTo: applyToArray,
//       reason,
//       medicalCertificate,
//       supervisorName,
//       supervisorEmpID,
//       supervisorStatus,
//       supervisorDate: timingchangeSupDate,
//       supervisorRemarks,
//       managerName,
//       managerEmpID,
//       managerStatus,
//       managerDate: timingchangemanagerDate,
//       managerRemarks,
//       empStatus,
//       empDate,
//       empRemarks,
//       receivedDate:creatingDate,
//       selectedFrom,
//       selectedTo,
//       startDate: DateFormat(startDate),
//       endDate: DateFormat(endDate),
//     };

//     console.log(totalData);

//     try {
//       const res = await Promise.all([
//         client.graphql({
//           query: createLeaveStatus,
//           variables: { input: totalData },
//         }),
//       ]);
//       console.log("Response", res);
//     } catch (error) {
//       console.error("Error executing GraphQL requests:", error);
//       throw error;
//     }
//   }, []);

//   return { CRLeaveDetails };
// };
