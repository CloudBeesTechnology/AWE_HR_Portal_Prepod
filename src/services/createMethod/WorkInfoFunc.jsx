import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import {
  createEmpWorkInfo,
  createTerminationInfo,
  createEmpLeaveDetails,
  createServiceRecord,
} from "../../graphql/mutations";

export const WorkInfoFunc = () => {
  const client = generateClient();
  const SubmitWIData = useCallback(async ({ workInfoValue }) => {
    if (!workInfoValue) {
      throw new Error("Missing required parameters");
    }
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
      // uploadCont,
      // uploadProb,
      // uploadResign,
      // uploadTerminate,
      // uploadLeave,
      workInfoUploads,
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
      sapNo,
    } = workInfoValue;

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
    };

    const totalData1 = {
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

    console.log(totalData, "totalData");
    console.log(totalData1, "totalData1");
    console.log(totalData2, "totalData2");
    console.log(totalData3, "totalData3");

    try {
      const [Emp, Terminate, Leave, Service] = await Promise.all([
        client.graphql({
          query: createEmpWorkInfo,
          variables: {
            input: totalData,
          },
        }),
        client.graphql({
          query: createTerminationInfo,
          variables: {
            input: {
              ...totalData1,
            },
          },
        }),
        client.graphql({
          query: createEmpLeaveDetails,
          variables: {
            input: {
              ...totalData2,
            },
          },
        }),
        client.graphql({
          query: createServiceRecord,
          variables: {
            input: {
              ...totalData3,
            },
          },
        }),
      ])
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(Emp);
      console.log(Terminate);
      console.log(Leave);
      console.log(Service);
    } catch (error) {
      //  console.error("Error executing GraphQL requests:", error);
      //  throw error; // Rethrow error if needed
    }
  }, []);
  return { SubmitWIData };
};
