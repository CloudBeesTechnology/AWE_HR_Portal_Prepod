import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpWorkInfo } from "../../graphql/mutations";

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
      probDuration,
      sapNo,
    } = workInfoValue;

    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : [];

    const formattingDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : null;

    const contractEndValue = formatDate(contractEnd);
    const contractStartValue = formatDate(contractStart);
    const dojValue = formattingDate(doj);
    const probationEndValue = formatDate(probationEnd);
    const probationStartValue = formatDate(probationStart);
    const upgradeDateValue = formatDate(upgradeDate);

    const uniqueValues = [
      contractEndValue,
      contractStartValue,
      probationEndValue,
      probationStartValue,
      upgradeDateValue,
      position,
      otherPosition,
      department,
      otherDepartment,
      jobCat,
      otherJobCat,
      relationship,
      hr,
      jobDesc,
      manager,
      probDuration,
      supervisor,
      salaryType,
      upgradePosition,
      workHrs,
      workStatus,
      workWeek,
      workMonth,
      contractPeriod,
    ].map((value) => {
      // If value is null, undefined, or an empty array, return an empty array
      if (value == null || (Array.isArray(value) && value.length === 0)) {
        return [];
      }
      // If value is an array, return the value wrapped in an array
      if (Array.isArray(value)) {
        return [...new Set(value)];
      }
      // For any other value (non-array), return it wrapped in an array
      return [value];
    });

    const [
      updatedContractEndValue,
      updatedContractStartValue,
      updatedProbationEndValue,
      updatedProbationStartValue,
      updatedUpgradeDateValue,
      updatedPosition,
      updatedOtherPosition,
      updatedDepartment,
      updatedOtherDepartment,
      updatedJobCat,
      updatedOtherJobCat,
      updatedRelationship,
      updatedHr,
      updatedJobDesc,
      updatedManager,
      updatedProbDuration,
      updatedSupervisor,
      updatedSalaryType,
      updatedUpgradePosition,
      updatedWorkHrs,
      updatedWorkStatus,
      updatedWorkWeek,
      updatedWorkMonth,
      updatedContractPeriod,
    ] = uniqueValues;

    const totalData = {
      empID,
      department: updatedDepartment,
      otherDepartment: updatedOtherDepartment,
      position: updatedPosition,
      otherPosition: updatedOtherPosition,
      jobCat: updatedJobCat,
      otherJobCat: updatedOtherJobCat,
      doj: dojValue,
      jobDesc: updatedJobDesc,
      skillPool,
      relationship: updatedRelationship,
      upgradePosition: updatedUpgradePosition,
      upgradeDate: updatedUpgradeDateValue,
      contractStart: updatedContractStartValue,
      contractPeriod: updatedContractPeriod,
      contractEnd: updatedContractEndValue,
      hr: updatedHr,
      manager: updatedManager,
      supervisor: updatedSupervisor,
      workStatus: updatedWorkStatus,
      probationStart: updatedProbationStartValue,
      probationEnd: updatedProbationEndValue,
      probDuration: updatedProbDuration,
      workHrs: updatedWorkHrs,
      workWeek: updatedWorkWeek,
      workMonth: updatedWorkMonth,
      salaryType: updatedSalaryType,
      sapNo,
    };

    try {
      const response = await Promise.all([
        client.graphql({
          query: createEmpWorkInfo,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { SubmitWIData };
};