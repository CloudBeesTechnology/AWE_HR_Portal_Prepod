import { useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  updateEmpWorkInfo,
  updateTerminationInfo,
  updateEmpLeaveDetails,
  updateServiceRecord,
} from "../../graphql/mutations";

// Update Work Info Data function
export const UpdateWIData = () => {
  // Initialize AWS Amplify client
  const client = generateClient();

  // Function to handle updating the data for employee work info
  const WIUpdateData = useCallback(async ({ workInfoUpValue }) => {
    // Check if required data is provided
    if (!workInfoUpValue) {
      throw new Error("Missing required parameters");
    }

    // Destructure required fields from workInfoUpValue
    const {
      empID,
      department,
      otherDepartment,
      position,
      otherPosition,
      jobCat,
      otherJobCat,
      doj,
      jobDesc,
      skillPool,
      relationship,
      hr,
      manager,
      supervisor,
      upgradePosition,
      upgradeDate,
      contractPeriod,
      contractStart,
      contractEnd,
      workStatus,
      probationStart,
      probationEnd,
      workHrs,
      workWeek,
      workMonth,
      salaryType,
      resignDate,
      termiDate,
      resignNotProb,
      otherResignNotProb,
      termiNotProb,
      otherTermiNotProb,
      resignNotConf,
      otherResignNotConf,
      termiNotConf,
      otherTermiNotConf,
      reasonResign,
      reasonTerminate,
      leavePass,
      dateLeavePass,
      destinateLeavePass,
      durLeavePass,
      annualLeave,
      annualLeaveDate,
      sickLeave,
      sickLeaveDate,
      materLeave,
      materLeaveDate,
      paterLeave,
      paterLeaveDate,
      mrageLeave,
      mrageLeaveDate,
      compasLeave,
      compasLeaveDate,
      positionRev,
      positionRevDate,
      revSalary,
      revSalaryDate,
      revLeavePass,
      revLeaveDate,
      revAnnualLeave,
      revALD,
      depEmp,
      depEmpDate,
      remarkWI,
      workInfoUploads,
      uploadPR,
      uploadSP,
      uploadLP,
      uploadAL,
      uploadDep,
      sapNo,
      IDTable, // This should be checked and defined as expected
    } = workInfoUpValue;
console.log(IDTable);

    // Grouped data for each mutation to handle separately
    const totalData = {
      empID,
      department,
      otherDepartment,
      position,
      otherPosition,
      jobCat,
      otherJobCat,
      doj,
      jobDesc,
      skillPool,
      relationship,
      upgradePosition,
      upgradeDate,
      contractStart,
      contractPeriod,
      contractEnd,
      hr,
      manager,
      supervisor,
      workStatus,
      probationStart,
      probationEnd,
      workHrs,
      workWeek,
      workMonth,
      salaryType,
      sapNo,
      id: IDTable,
    };

    const totalData1 = {
      id: IDTable,
      empID,
      resignDate,
      termiDate,
      resignNotProb,
      otherResignNotProb,
      termiNotProb,
      otherTermiNotProb,
      resignNotConf,
      otherResignNotConf,
      termiNotConf,
      otherTermiNotConf,
      reasonResign,
      reasonTerminate,
      workInfoUploads,
    };

    const totalData2 = {
      id: IDTable,
      empID,
      leavePass,
      dateLeavePass,
      destinateLeavePass,
      durLeavePass,
      annualLeave,
      annualLeaveDate,
      sickLeave,
      sickLeaveDate,
      materLeave,
      materLeaveDate,
      paterLeave,
      paterLeaveDate,
      mrageLeave,
      mrageLeaveDate,
      compasLeave,
      compasLeaveDate,
    };

    const totalData3 = {
      id: IDTable,
      empID,
      positionRev,
      positionRevDate,
      revSalary,
      revSalaryDate,
      revLeavePass,
      revLeaveDate,
      revAnnualLeave,
      revALD,
      depEmp,
      depEmpDate,
      remarkWI,
      uploadPR,
      uploadSP,
      uploadLP,
      uploadAL,
      uploadDep,
    };

    try {
      // Make GraphQL calls concurrently using Promise.all
      const [Emp, Terminate, Leave, Service] = await Promise.all([
        client.graphql({
          query: updateEmpWorkInfo,
          variables: { input: totalData },
        }),
        client.graphql({
          query: updateTerminationInfo,
          variables: { input: totalData1 },
        }),
        client.graphql({
          query: updateEmpLeaveDetails,
          variables: { input: totalData2 },
        }),
        client.graphql({
          query: updateServiceRecord,
          variables: { input: totalData3 },
        }),
      ]);

      // Log each response for debugging
      console.log("Emp Data Updated:", Emp);
      console.log("Terminate Data Updated:", Terminate);
      console.log("Leave Data Updated:", Leave);
      console.log("Service Record Updated:", Service);
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateData };
};
// import { generateClient } from "@aws-amplify/api";
// import { useCallback } from "react";
// import {
//   updateEmpWorkInfo,
//   updateTerminationInfo,
//   updateEmpLeaveDetails,
//   updateServiceRecord,
// } from "../../graphql/mutations";

// export const UpdateWIData = () => {
//   const client = generateClient();
  
//   const WIUpdateData = useCallback(async ({ workInfoUpValue }) => {
//     if (!workInfoUpValue) {
//       throw new Error("Missing required parameters");
//     }

//     const {
//       empID,
//       department,
//       otherDepartment,
//       position,
//       otherPosition,
//       jobCat,
//       otherJobCat,
//       doj,
//       jobDesc,
//       skillPool,
//       relationship,
//       hr,
//       manager,
//       supervisor,
//       upgradePosition,
//       upgradeDate,
//       contractPeriod,
//       contractStart,
//       contractEnd,
//       workStatus,
//       probationStart,
//       probationEnd,
//       workHrs,
//       workWeek,
//       workMonth,
//       salaryType,
//       resignDate,
//       termiDate,
//       resignNotProb,
//       otherResignNotProb,
//       termiNotProb,
//       otherTermiNotProb,
//       resignNotConf,
//       otherResignNotConf,
//       termiNotConf,
//       otherTermiNotConf,
//       reasonResign,
//       reasonTerminate,
//       leavePass,
//       dateLeavePass,
//       destinateLeavePass,
//       durLeavePass,
//       annualLeave,
//       annualLeaveDate,
//       sickLeave,
//       sickLeaveDate,
//       materLeave,
//       materLeaveDate,
//       paterLeave,
//       paterLeaveDate,
//       mrageLeave,
//       mrageLeaveDate,
//       compasLeave,
//       compasLeaveDate,
//       workInfoUploads,
//       positionRev,
//       positionRevDate,
//       revSalary,
//       revSalaryDate,
//       revLeavePass,
//       revLeaveDate,
//       revAnnualLeave,
//       revALD,
//       depEmp,
//       depEmpDate,
//       remarkWI,
//       uploadPR,
//       uploadSP,
//       uploadLP,
//       uploadAL,
//       uploadDep,
//       sapNo,
//       IDTable, // Ensure IDTable is passed correctly
//     } = workInfoUpValue;

//     // Grouped data for each mutation
//     const totalData = {
//       empID,
//       department,
//       otherDepartment,
//       position,
//       otherPosition,
//       jobCat,
//       otherJobCat,
//       doj,
//       jobDesc,
//       skillPool,
//       relationship,
//       upgradePosition,
//       upgradeDate,
//       contractStart,
//       contractPeriod,
//       contractEnd,
//       hr,
//       manager,
//       supervisor,
//       workStatus,
//       probationStart,
//       probationEnd,
//       workHrs,
//       workWeek,
//       workMonth,
//       salaryType,
//       sapNo,
//       id: IDTable,
//     };

//     const totalData1 = {
//       id: IDTable,
//       empID,
//       resignDate,
//       termiDate,
//       resignNotProb,
//       otherResignNotProb,
//       termiNotProb,
//       otherTermiNotProb,
//       resignNotConf,
//       otherResignNotConf,
//       termiNotConf,
//       otherTermiNotConf,
//       reasonResign,
//       reasonTerminate,
//       workInfoUploads,
//     };

//     const totalData2 = {
//       id: IDTable.id,
//       empID,
//       leavePass,
//       dateLeavePass,
//       destinateLeavePass,
//       durLeavePass,
//       annualLeave,
//       annualLeaveDate,
//       sickLeave,
//       sickLeaveDate,
//       materLeave,
//       materLeaveDate,
//       paterLeave,
//       paterLeaveDate,
//       mrageLeave,
//       mrageLeaveDate,
//       compasLeave,
//       compasLeaveDate,
//     };

//     const totalData3 = {
//       id: IDTable,
//       empID,
//       positionRev,
//       positionRevDate,
//       revSalary,
//       revSalaryDate,
//       revLeavePass,
//       revLeaveDate,
//       revAnnualLeave,
//       revALD,
//       depEmp,
//       depEmpDate,
//       remarkWI,
//       uploadPR,
//       uploadSP,
//       uploadLP,
//       uploadAL,
//       uploadDep,
//     };

//     try {
//       const [Emp, Terminate, Leave, Service] = await Promise.all([
//         client.graphql({
//           query: updateEmpWorkInfo,
//           variables: { input: totalData },
//         }),
//         client.graphql({
//           query: updateTerminationInfo,
//           variables: { input: totalData1 },
//         }),
//         client.graphql({
//           query: updateEmpLeaveDetails,
//           variables: { input: totalData2 },
//         }),
//         client.graphql({
//           query: updateServiceRecord,
//           variables: { input: totalData3 },
//         }),
//       ]);

//       console.log("Emp:", Emp);
//       console.log("Terminate:", Terminate);
//       console.log("Leave:", Leave);
//       console.log("Service:", Service);
//     } catch (error) {
//       console.error("Error executing GraphQL requests:", error);
//       throw error; // Rethrow error if needed
//     }
//   }, []);

//   return { WIUpdateData };
// };
// // import { generateClient } from "@aws-amplify/api";
// // import { useCallback } from "react";
// // import {
// //   updateEmpWorkInfo,
// //   updateTerminationInfo,
// //   updateEmpLeaveDetails,
// //   updateServiceRecord,
// // } from "../../graphql/mutations";

// // export const UpdateWIData = () => {
// //   const client = generateClient();
// //   const WIUpdateData = useCallback(async ({ workInfoUpValue }) => {
// //     if (!workInfoUpValue) {
// //       throw new Error("Missing required parameters");
// //     }
// //     const {
// //       empID,
// //       department,
// //       otherDepartment,
// //       position,
// //       otherPosition,
// //       jobCat,
// //       otherJobCat,
// //       doj,
// //       jobDesc,
// //       skillPool,
// //       relationship,
// //       hr,
// //       manager,
// //       supervisor,
// //       upgradePosition,
// //       upgradeDate,
// //       contractPeriod,
// //       contractStart,
// //       contractEnd,
// //       workStatus,
// //       probationStart,
// //       probationEnd,
// //       workHrs,
// //       workWeek,
// //       workMonth,
// //       salaryType,
// //       resignDate,
// //       termiDate,
// //       resignNotProb,
// //       otherResignNotProb,
// //       termiNotProb,
// //       otherTermiNotProb,
// //       resignNotConf,
// //       otherResignNotConf,
// //       termiNotConf,
// //       otherTermiNotConf,
// //       reasonResign,
// //       reasonTerminate,
// //       leavePass,
// //       dateLeavePass,
// //       destinateLeavePass,
// //       durLeavePass,
// //       annualLeave,
// //       annualLeaveDate,
// //       sickLeave,
// //       sickLeaveDate,
// //       materLeave,
// //       materLeaveDate,
// //       paterLeave,
// //       paterLeaveDate,
// //       mrageLeave,
// //       mrageLeaveDate,
// //       compasLeave,
// //       compasLeaveDate,
// //       // uploadCont,
// //       // uploadProb,
// //       // uploadResign,
// //       // uploadTerminate,
// //       // uploadLeave,
// //       workInfoUploads,
// //       positionRev,
// //       positionRevDate,
// //       revSalary,
// //       revSalaryDate,
// //       revLeavePass,
// //       revLeaveDate,
// //       revAnnualLeave,
// //       revALD,
// //       depEmp,
// //       depEmpDate,
// //       remarkWI,
// //       uploadPR,
// //       uploadSP,
// //       uploadLP,
// //       uploadAL,
// //       uploadDep,
// //       sapNo,
// //     } = workInfoUpValue;

// //     const totalData = {
// //       empID,
// //       department,
// //       otherDepartment,
// //       position,
// //       otherPosition,
// //       jobCat,
// //       otherJobCat,
// //       doj,
// //       jobDesc,
// //       skillPool,
// //       relationship,
// //       upgradePosition,
// //       upgradeDate,
// //       contractStart,
// //       contractPeriod,
// //       contractEnd,
// //       hr,
// //       manager,
// //       supervisor,
// //       workStatus,
// //       probationStart,
// //       probationEnd,
// //       workHrs,
// //       workWeek,
// //       workMonth,
// //       salaryType,
// //       sapNo,
// //       IDTable,

// //     };

// //     const totalData1 = {
// //       id:IDTable.id,
// //       empID,
// //       resignDate,
// //       termiDate,
// //       resignNotProb,
// //       otherResignNotProb,
// //       termiNotProb,
// //       otherTermiNotProb,
// //       resignNotConf,
// //       otherResignNotConf,
// //       termiNotConf,
// //       otherTermiNotConf,
// //       reasonResign,
// //       reasonTerminate,
// //       workInfoUploads,
// //     };

// //     const totalData2 = {
// //       id:IDTable.id,
// //       empID,
// //       leavePass,
// //       dateLeavePass,
// //       destinateLeavePass,
// //       durLeavePass,
// //       annualLeave,
// //       annualLeaveDate,
// //       sickLeave,
// //       sickLeaveDate,
// //       materLeave,
// //       materLeaveDate,
// //       paterLeave,
// //       paterLeaveDate,
// //       mrageLeave,
// //       mrageLeaveDate,
// //       compasLeave,
// //       compasLeaveDate,
// //     };

// //     const totalData3 = {
// //       id:IDTable.id,
// //       empID,
// //       positionRev,
// //       positionRevDate,
// //       revSalary,
// //       revSalaryDate,
// //       revLeavePass,
// //       revLeaveDate,
// //       revAnnualLeave,
// //       revALD,
// //       depEmp,
// //       depEmpDate,
// //       remarkWI,
// //       uploadPR,
// //       uploadSP,
// //       uploadLP,
// //       uploadAL,
// //       uploadDep,
// //     };

// //     console.log(totalData, "totalData");
// //     console.log(totalData1, "totalData1");
// //     console.log(totalData2, "totalData2");
// //     console.log(totalData3, "totalData3");

// //     try {
// //       const [Emp, Terminate, Leave, Service] = await Promise.all([
// //         client.graphql({
// //           query: updateEmpWorkInfo,
// //           variables: {
// //             input: totalData,
// //           },
// //         }),
// //         client.graphql({
// //           query: updateTerminationInfo,
// //           variables: {
// //             input: {
// //               ...totalData1,
// //             },
// //           },
// //         }),
// //         client.graphql({
// //           query: updateEmpLeaveDetails,
// //           variables: {
// //             input: {
// //               ...totalData2,
// //             },
// //           },
// //         }),
// //         client.graphql({
// //           query: updateServiceRecord,
// //           variables: {
// //             input: {
// //               ...totalData3,
// //             },
// //           },
// //         }),
// //       ])
// //         .then((res) => {
// //           console.log(res);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //       console.log(Emp);
// //       console.log(Terminate);
// //       console.log(Leave);
// //       console.log(Service);
// //     } catch (error) {
// //       //  console.error("Error executing GraphQL requests:", error);
// //       //  throw error; // Rethrow error if needed
// //     }
// //   }, []);
// //   return { WIUpdateData };
// // };
