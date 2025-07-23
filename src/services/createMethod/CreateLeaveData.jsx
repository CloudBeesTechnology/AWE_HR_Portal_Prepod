import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpLeaveDetails } from "../../graphql/mutations";

export const CreateLeaveData = () => {
  const client = generateClient();

  const LeaveDataValue = useCallback(async ({ LeaveValue }) => {
    if (!LeaveValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
      leavePass,
      dateLeavePass,
      hospLeave,
      destinateLeavePass,
      durLeavePass,
      annualLeave,
      annualLeaveDate,
      sickLeave,
      sickLeaveDate,
      materLeave,
      paterLeave,
      mrageLeave,
      // compasLeave,
      pervAnnualLeaveBal,
      remainAnnualLeave,
      createdBy,
    } = LeaveValue;

    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : [];

    const annualLeaveDateValue = formatDate(annualLeaveDate);
    const dateLeavePassValue = formatDate(dateLeavePass);

    const uniqueValues1 = [
      annualLeave,
      annualLeaveDateValue,
      destinateLeavePass,
      durLeavePass,
      dateLeavePassValue,
      leavePass,
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
      updatedAnnualLeave,
      updatedAnnualLeaveDateValue,
      // updatedCompasLeave,
      updatedDestinateLeavePass,
      updatedDurLeavePass,
      updatedDateLeavePassValue,
      updatedLeavePass,
    ] = uniqueValues1;

    const totalData = {
      empID,
      annualLeave: updatedAnnualLeave,
      annualLeaveDate: updatedAnnualLeaveDateValue,
      // compasLeave,
      destinateLeavePass: updatedDestinateLeavePass,
      durLeavePass: updatedDurLeavePass,
      dateLeavePass: updatedDateLeavePassValue,
      leavePass: updatedLeavePass,
      materLeave,
      mrageLeave,
      paterLeave,
      pervAnnualLeaveBal,
      sickLeave,
      sickLeaveDate,
      hospLeave,
      remainAnnualLeave,
      createdBy: createdBy,
    };

    try {
      const response = await Promise.all([
        client.graphql({
          query: createEmpLeaveDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);
      // console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { LeaveDataValue };
};
