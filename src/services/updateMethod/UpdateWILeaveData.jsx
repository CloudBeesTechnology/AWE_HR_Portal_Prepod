import { useCallback, useContext } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  updateEmpLeaveDetails,
} from "../../graphql/mutations";

// Update Work Info Data function
export const UpdateWILeaveData = () => {
  // Initialize AWS Amplify client
  const client = generateClient();

  const WIUpdateLeaveData = useCallback(async ({ LeaveUpValue }) => {
    // Check if required data is provided
    if (!LeaveUpValue) {
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
      leaveDetailsDataRecord,
      annualLeave,
      annualLeaveDate,
      // compasLeave,
      destinateLeavePass,
      durLeavePass,
      dateLeavePass,
      leavePass,
      materLeave,
      mrageLeave,
      paterLeave,
      sickLeave,
      sickLeaveDate,
      hospLeave,
      pervAnnualLeaveBal,
      updatedBy,
    } = LeaveUpValue;

  
    const annualLeaveDateValue = formatDate(annualLeaveDate);
    const dateLeavePassValue = formatDate(dateLeavePass);
  
    // console.log(contractEndValue);

    if (leaveDetailsDataRecord) {
        const updatedleavePass = updateFieldArray(
          leaveDetailsDataRecord.leavePass,
          leavePass
        );
        const updateddateLeavePass = updateFieldArray2(
          leaveDetailsDataRecord.dateLeavePass,
          dateLeavePassValue
        );
        const updateddestinateLeavePass = updateFieldArray(
          leaveDetailsDataRecord.destinateLeavePass,
          destinateLeavePass
        );
        const updateddurLeavePass = updateFieldArray(
          leaveDetailsDataRecord.durLeavePass,
          durLeavePass
        );
        const updatedannualLeave = updateFieldArray(
          leaveDetailsDataRecord.annualLeave,
          annualLeave
        );
        const updatedannualLeaveDate = updateFieldArray2(
          leaveDetailsDataRecord.annualLeaveDate,
          annualLeaveDateValue
        );
  
        const totalData1 = {
          id: leaveDetailsDataRecord.id,
          empID,
          leavePass: updatedleavePass,
          dateLeavePass: updateddateLeavePass,
          destinateLeavePass: updateddestinateLeavePass,
          durLeavePass: updateddurLeavePass,
          annualLeave: updatedannualLeave,
          annualLeaveDate: updatedannualLeaveDate,
          sickLeave,
          sickLeaveDate,
          materLeave,
          paterLeave,
          mrageLeave,
          pervAnnualLeaveBal,
          // compasLeave,
          hospLeave,
          updatedBy: updatedBy,

        };
  
        //   // console.log(totalData1, "ertdfghjkhbtxrfgh");
        try {
          const Leave = await client.graphql({
            query: updateEmpLeaveDetails,
            variables: { input: totalData1},
          });
          console.log(Leave);
        } catch (err) {
          console.log(err);
        }
      }


  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateLeaveData };
};
