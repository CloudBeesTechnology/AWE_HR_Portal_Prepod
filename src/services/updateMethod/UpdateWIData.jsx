import { useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import { updateEmpWorkInfo } from "../../graphql/mutations";

// Update Work Info Data function
export const UpdateWIData = () => {
  // Initialize AWS Amplify client
  const client = generateClient();

  const WIUpdateData = useCallback(async ({ workInfoUpValue }) => {
    // Check if required data is provided
    if (!workInfoUpValue) {
      throw new Error("Missing required parameters");
    }
    const formatDate = (date) =>
      date && new Date(date).toLocaleDateString("en-CA");
    const formattingDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : null;

    const updateFieldArray = (existingArray, newValue) => {
      // Normalize newValue: "N/A" for null, undefined, or empty string
      const normalizedNewValue =
        newValue === null || newValue === undefined || newValue.trim?.() === "" ? "N/A" : newValue.trim?.();
    
      // If existingArray is not an array, handle as an empty array or wrap it
      let array = Array.isArray(existingArray) ? existingArray : existingArray ? [existingArray] : [];
    
      // Clean invalid initial values (null, undefined, empty strings)
      array = array.filter((item) => item !== null && item !== undefined && item.trim?.() !== "");
    
      // If array is empty, do not allow "N/A" or empty strings as the first value
      if (array.length === 0) {
        return normalizedNewValue === "N/A" ? [] : normalizedNewValue ? [normalizedNewValue] : [];
      }
    
      // Avoid duplicates (case-insensitive)
      const lastValue = array[array.length - 1];
      if (lastValue.toLowerCase() === normalizedNewValue.toLowerCase()) return array;
    
      // Add new value to the array
      return [...array, normalizedNewValue];
    };
    
    const updateFieldArray2 = (existingArray, newValue) => {
      // Normalize newValue to "N/A" if it's null, undefined, or an empty string
      const normalizedNewValue =
      newValue === null || newValue === undefined || newValue?.trim() === "" ? "" : newValue?.trim();
      
      // If there's no existing array, return a new array with the normalized value
      if (!existingArray || existingArray?.length === 0) 
        return normalizedNewValue ? [normalizedNewValue] : [];
      
      // Compare the normalized new value (case-insensitive) with the last value in the array
      const lastValue = existingArray[existingArray.length - 1];
      if (lastValue?.toLowerCase() === normalizedNewValue?.toLowerCase()) return existingArray;
    
      // Add the new value to the array if it's not the same as the last value
      return [...existingArray, normalizedNewValue];
    };
  

    const {
      empID,
      workInfoDataRecord,
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
      probDuration,
      workHrs,
      workWeek,
      workMonth,
      salaryType,
      sapNo,
    } = workInfoUpValue;

    const contractEndValue = formatDate(contractEnd);
    const contractStartValue = formatDate(contractStart);
    const dojValue = formattingDate(doj);
    const probationEndValue = formatDate(probationEnd);
    const probationStartValue = formatDate(probationStart);
    const upgradeDateValue = formatDate(upgradeDate);

    if (workInfoDataRecord) {
      const updatedcontractEndValue = updateFieldArray2(
        workInfoDataRecord.contractEnd,
        contractEndValue
      );
      console.log(updatedcontractEndValue);
      const updatedcontractStartValue = updateFieldArray2(
        workInfoDataRecord.contractStart,
        contractStartValue
      );
      const updatedprobationEndValue = updateFieldArray2(
        workInfoDataRecord.probationEnd,
        probationEndValue
      );
      const updatedprobationStartValue = updateFieldArray2(
        workInfoDataRecord.probationStart,
        probationStartValue
      );
      const updatedupgradeDateValue = updateFieldArray2(
        workInfoDataRecord.upgradeDate,
        upgradeDateValue
      );

      const updatedPosition = updateFieldArray(
        workInfoDataRecord.position,
        position
      );
      const updatedotherPosition = updateFieldArray(
        workInfoDataRecord.otherPosition,
        otherPosition
      );
      const updateddepartment = updateFieldArray(
        workInfoDataRecord.department,
        department
      );
      const updatedotherDepartment = updateFieldArray(
        workInfoDataRecord.otherDepartment,
        otherDepartment
      );
      const updatedjobCat = updateFieldArray(workInfoDataRecord.jobCat, jobCat);
      const updatedotherJobCat = updateFieldArray(
        workInfoDataRecord.otherJobCat,
        otherJobCat
      );
      const updatedjobDesc = updateFieldArray(
        workInfoDataRecord.jobDesc,
        jobDesc
      );
      const updatedsalaryType = updateFieldArray(
        workInfoDataRecord.salaryType,
        salaryType
      );
      const updatedmanager = updateFieldArray(
        workInfoDataRecord.manager,
        manager
      );
      const updatedhr = updateFieldArray(workInfoDataRecord.hr, hr);
      const updatedsupervisor = updateFieldArray(
        workInfoDataRecord.supervisor,
        supervisor
      );
      const updatedworkHrs = updateFieldArray(
        workInfoDataRecord.workHrs,
        workHrs
      );
      const updatedworkMonth = updateFieldArray(
        workInfoDataRecord.workMonth,
        workMonth
      );
      const updatedworkWeek = updateFieldArray(
        workInfoDataRecord.workWeek,
        workWeek
      );
      const updatedworkStatus = updateFieldArray(
        workInfoDataRecord.workStatus,
        workStatus
      );
      const updatedrelationship = updateFieldArray(
        workInfoDataRecord.relationship,
        relationship
      );
      const updatedupgradePosition = updateFieldArray(
        workInfoDataRecord.upgradePosition,
        upgradePosition
      );
      const updatedcontractPeriod = updateFieldArray(
        workInfoDataRecord.contractPeriod,
        contractPeriod
      );
      const updatedprobDuration = updateFieldArray(
        workInfoDataRecord.probDuration,
        probDuration
      );

      const totalData = {
        id: workInfoDataRecord.id,
        empID,
        department: updateddepartment,
        otherDepartment: updatedotherDepartment,
        position: updatedPosition,
        otherPosition: updatedotherPosition,
        jobCat: updatedjobCat,
        otherJobCat: updatedotherJobCat,
        doj: dojValue,
        jobDesc: updatedjobDesc,
        skillPool,
        relationship: updatedrelationship,
        upgradePosition: updatedupgradePosition,
        upgradeDate: updatedupgradeDateValue,
        contractStart: updatedcontractStartValue,
        contractPeriod: updatedcontractPeriod,
        contractEnd: updatedcontractEndValue,
        hr: updatedhr,
        manager: updatedmanager,
        supervisor: updatedsupervisor,
        workStatus: updatedworkStatus,
        probationStart: updatedprobationStartValue,
        probationEnd: updatedprobationEndValue,
        probDuration: updatedprobDuration,
        workHrs: updatedworkHrs,
        workWeek: updatedworkWeek,
        workMonth: updatedworkMonth,
        salaryType: updatedsalaryType,
        sapNo,
      };

      //     console.log(totalData, "ertdfghjkhbtxrfgh");
      try {
        const Work = await client.graphql({
          query: updateEmpWorkInfo,
          variables: { input: totalData,},
        });
        console.log(Work);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateData };
};
