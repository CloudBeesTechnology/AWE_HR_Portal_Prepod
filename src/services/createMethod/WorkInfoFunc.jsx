import { generateClient } from "@aws-amplify/api";
import { useCallback, useContext } from "react";
import {
  createEmpWorkInfo,
  createTerminationInfo,
  createEmpLeaveDetails,
  createServiceRecord,
} from "../../graphql/mutations";
import { DataSupply } from "../../utils/DataStoredContext";

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
      probDuration,
      WIContract,
      WIProbation,
      WIResignation,
      WITermination,
      WILeaveEntitle,
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

    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : null;

    const contractEndValue = formatDate(contractEnd);
    const contractStartValue = formatDate(contractStart);
    const dojValue = formatDate(doj);
    const probationEndValue = formatDate(probationEnd);
    const probationStartValue = formatDate(probationStart);
    const upgradeDateValue = formatDate(upgradeDate);
    const annualLeaveDateValue = formatDate(annualLeaveDate);
    const dateLeavePassValue = formatDate(dateLeavePass);
    const upgradeDepEmpDate = formatDate(depEmpDate);
    const upgradePositionRevDate = formatDate(positionRevDate);
    const upgradeRevSalaryDate = formatDate(revSalaryDate);
    const upgradeRevLeaveDate = formatDate(revLeaveDate);
    const upgradeRevALD = formatDate(revALD);

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
    ].map((value) => [...new Set([value])]);

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

    const uniqueValues1 = [
      annualLeave,
      annualLeaveDateValue,
      // compasLeave,
      destinateLeavePass,
      durLeavePass,
      dateLeavePassValue,
      leavePass,
      // materLeave,
      // mrageLeave,
      // paterLeave,
      // sickLeave,
      // sickLeaveDate,
      // hospLeave,
    ].map((value) => [...new Set([value])]);

    const [
      updatedAnnualLeave,
      updatedAnnualLeaveDateValue,
      // updatedCompasLeave,
      updatedDestinateLeavePass,
      updatedDurLeavePass,
      updatedDateLeavePassValue,
      updatedLeavePass,
      // updatedMaterLeave,
      // updatedMrageLeave,
      // updatedPaterLeave,
      // updatedSickLeave,
      // updatedSickLeaveDate,
      // updatedHospLeave,
    ] = uniqueValues1;

    const uniqueValues3 = [
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
    ].map((value) => [...new Set([value])]);

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
    ] = uniqueValues3;

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

    const totalData1 = {
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
     
    };
    const totalData2 = {
      empID,
      resignDate,
      resignNotProb,
      otherResignNotProb,
      resignNotConf,
      otherResignNotConf,
      reasonResign,
      reasonTerminate,
      termiDate,
      termiNotProb,
      otherTermiNotProb,
      termiNotConf,
      otherTermiNotConf,
      WIContract: JSON.stringify(WIContract),
      WIProbation: JSON.stringify(WIProbation),
      WIResignation: JSON.stringify(WIResignation),
      WITermination: JSON.stringify(WITermination),
      WILeaveEntitle: JSON.stringify(WILeaveEntitle),
    };
    const totalData3 = {
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
    console.log(totalData1);
    console.log(totalData2);
    console.log(totalData3);
    try {
      const [
        Emp,
         Leave, 
         Ter,
          Ser
        ] = await Promise.all([
        client.graphql({
          query: createEmpWorkInfo,
          variables: {
            input: totalData,
          },
        }),
        client.graphql({
          query: createEmpLeaveDetails,
          variables: {
            input: totalData1,
          },
        }),
        client.graphql({
          query: createTerminationInfo,
          variables: {
            input: totalData2,
          },
        }),
        client.graphql({
          query: createServiceRecord,
          variables: {
            input: totalData3,
          },
        }),
      ]);

      console.log(Emp);
      console.log(Leave);
      console.log(Ter);
      console.log(Ser);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { SubmitWIData };
};
