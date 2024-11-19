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
      WIContract,
      WIProbation,
      WIResignation,
      WITermination,
      WILeaveEntitle,
      uploadPR,
      uploadSP,
      uploadLP,
      uploadAL,
      uploadDep,
      sapNo,
      SRDRTable,
      WIDTable,
      LDRTable,
      TDRTable,
    } = workInfoUpValue;

    const totalData = {
      id: WIDTable,
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
      id: TDRTable,
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
      WIContract,
      WIProbation,
      WIResignation,
      WITermination,
      WILeaveEntitle,
    };

    const totalData2 = {
      id: LDRTable,
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
      id: SRDRTable,
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