import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createServiceRecord } from "../../graphql/mutations";

export const CreateSRData = () => {
  const client = generateClient();

  const SRDataValue = useCallback(async ({ SRValue }) => {
    if (!SRValue) {
      throw new Error("Missing required parameters");
    }
    const {
      empID,
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
    } = SRValue;

    console.log(SRValue);
    

    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : [];

    const upgradeDepEmpDate = formatDate(depEmpDate);
    const upgradePositionRevDate = formatDate(positionRevDate);
    const upgradeRevSalaryDate = formatDate(revSalaryDate);
    const upgradeRevLeaveDate = formatDate(revLeaveDate);
    const upgradeRevALD = formatDate(revALD);

    const uniqueValues = [
      upgradeDepEmpDate,
      depEmp,
      upgradePositionRevDate,
      positionRev,
      upgradeRevSalaryDate,
      revSalary,
      upgradeRevLeaveDate,
      revLeavePass,
      upgradeRevALD,
      revAnnualLeave,
      // remarkWI,
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
      upgradeDepEmpDateValue,
      upgradeDepEmp,
      upgradePositionRevDateValue,
      pupgradePositionRev,
      upgradeRevSalaryDateValue,
      upgradeRevSalary,
      upgradeRevLeaveDateValue,
      upgradeRevLeavePass,
      upgradeRevALDValue,
      upgradeDRevAnnualLeave,
      // upgradeRemarkWI
    ] = uniqueValues;

    const totalData = {
      empID,
      depEmpDate: upgradeDepEmpDateValue,
      depEmp: upgradeDepEmp,
      positionRev: pupgradePositionRev,
      positionRevDate: upgradePositionRevDateValue,
      revSalary: upgradeRevSalary,
      revSalaryDate: upgradeRevSalaryDateValue,
      revLeavePass: upgradeRevLeavePass,
      revLeaveDate: upgradeRevLeaveDateValue,
      revAnnualLeave: upgradeDRevAnnualLeave,
      revALD: upgradeRevALDValue,
      remarkWI,
      uploadPR: JSON.stringify(uploadPR),
      uploadSP: JSON.stringify(uploadSP),
      uploadLP: JSON.stringify(uploadLP),
      uploadAL: JSON.stringify(uploadAL),
      uploadDep: JSON.stringify(uploadDep),
    };

    console.log(totalData);
    
    try {
      const response = await 
        client.graphql({
          query: createServiceRecord,
          variables: {
            input: totalData,
          },
        })
      // console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { SRDataValue };
};
