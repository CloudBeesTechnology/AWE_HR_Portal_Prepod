import { useCallback, useContext } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  updateServiceRecord,
} from "../../graphql/mutations";

// Update Work Info Data function
export const UpdateWISRData = () => {
  // Initialize AWS Amplify client
  const client = generateClient();

  const WIUpdateSRData = useCallback(async ({ SRUpValue }) => {
    // Check if required data is provided
    if (!SRUpValue) {
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
      SRDataRecord,
      depEmpDate,
      depEmp,
      positionRev,
      positionRevDate,
      revSalary,
      revSalaryDate,
      revLeavePass,
      revLeaveDate,
      revAnnualLeave,
      revALD,
      remarkWI,
      uploadPR,
      uploadSP,
      uploadLP,
      uploadAL,
      uploadDep,
    } = SRUpValue;

    const upgradeDepEmpDate = formatDate(depEmpDate);
    const upgradePositionRevDate = formatDate(positionRevDate);
    const upgradeRevSalaryDate = formatDate(revSalaryDate);
    const upgradeRevLeaveDate = formatDate(revLeaveDate);
    const upgradeRevALD = formatDate(revALD);
    // console.log(contractEndValue);

  

    if (SRDataRecord) {
        const updateddepEmpDate = updateFieldArray2(
          SRDataRecord.depEmpDate,
          upgradeDepEmpDate
        );
        const updateddepEmp = updateFieldArray(SRDataRecord.depEmp, depEmp);
        const updatedpositionRevDate = updateFieldArray2(
          SRDataRecord.positionRevDate,
          upgradePositionRevDate
        );
        const updatedpositionRev = updateFieldArray(
          SRDataRecord.positionRev,
          positionRev
        );
        const updatedrevSalary = updateFieldArray(
          SRDataRecord.revSalary,
          revSalary
        );
        const updatedrevSalaryDate = updateFieldArray2(
          SRDataRecord.revSalaryDate,
          upgradeRevSalaryDate
        );
        const updatedrevLeaveDate = updateFieldArray2(
          SRDataRecord.revLeaveDate,
          upgradeRevLeaveDate
        );
        const updatedrevLeavePass = updateFieldArray(
          SRDataRecord.revLeavePass,
          revLeavePass
        );
        const updatedrevAnnualLeave = updateFieldArray(
          SRDataRecord.revAnnualLeave,
          revAnnualLeave
        );
        const updatedrevALD = updateFieldArray2(
          SRDataRecord.revALD,
          upgradeRevALD
        );
  
        const totalData3 = {
          id: SRDataRecord.id,
          empID,
          positionRev: updatedpositionRev,
          positionRevDate: updatedpositionRevDate,
          revSalary: updatedrevSalary,
          revSalaryDate: updatedrevSalaryDate,
          revLeavePass: updatedrevLeavePass,
          revLeaveDate: updatedrevLeaveDate,
          revAnnualLeave: updatedrevAnnualLeave,
          revALD: updatedrevALD,
          depEmp: updateddepEmp,
          depEmpDate: updateddepEmpDate,
          remarkWI,
          uploadPR,
          uploadSP,
          uploadLP,
          uploadAL,
          uploadDep,
        };
  
        // console.log(totalData3, "ertdfghjkhbtxrfgh");
  
        try {
          const Service = await client.graphql({
            query: updateServiceRecord,
            variables: { input: totalData3, limit: 20000 },
          });
          // console.log(Service);
        } catch (err) {
          console.log(err);
        }
      }
  

  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateSRData };
};
