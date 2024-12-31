import { useCallback, useContext } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  updateEmpWorkInfo,
  updateTerminationInfo,
  updateEmpLeaveDetails,
  updateServiceRecord,
} from "../../graphql/mutations";
import { DataSupply } from "../../utils/DataStoredContext";

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
      date ? new Date(date).toLocaleDateString("en-CA") : null;

    const updateFieldArray = (existingArray, newValue) => [
      ...new Set([...(existingArray || []), newValue]),
    ];

    const updateFieldArray1 = (existingArray, newValue) => {
      // Simply add the newValue to the existingArray without checking duplicates
      existingArray.push(newValue);
      return existingArray;  // Return the updated array
    };

    const {
      empID,
      SRDataRecord,
      leaveDetailsDataRecord,
      workInfoDataRecord,
      terminateDataRecord,
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
      WIContract,
      WIProbation,
      WIResignation,
      WITermination,
      WILeaveEntitle,
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
    } = workInfoUpValue;

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
    // console.log(contractEndValue);

    if (workInfoDataRecord) {
      const updatedcontractEndValue = updateFieldArray(
        workInfoDataRecord.contractEnd,
        contractEndValue
      );
      console.log(updatedcontractEndValue);
      const updatedcontractStartValue = updateFieldArray(
        workInfoDataRecord.contractStart,
        contractStartValue
      );
      const updatedprobationEndValue = updateFieldArray(
        workInfoDataRecord.probationEnd,
        probationEndValue
      );
      const updatedprobationStartValue = updateFieldArray(
        workInfoDataRecord.probationStart,
        probationStartValue
      );
      const updatedupgradeDateValue = updateFieldArray(
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
      const updatedmanager = updateFieldArray1(
        workInfoDataRecord.manager,
        manager
      );
      const updatedhr = updateFieldArray1(workInfoDataRecord.hr, hr);
      const updatedsupervisor = updateFieldArray1(
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
      };

      // console.log(totalData, "ertdfghjkhbtxrfgh");
     try{ const Work = await client.graphql({
      query: updateEmpWorkInfo, 
      variables: { input: totalData, limit:20000, },
    })
    // console.log(Work);
  }
    catch(err){
      console.log(err);     
     }
    }

    if (leaveDetailsDataRecord) {
      const updatedleavePass = updateFieldArray(
        leaveDetailsDataRecord.leavePass,
        leavePass
      );
      const updateddateLeavePass = updateFieldArray(
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
      const updatedannualLeaveDate = updateFieldArray(
        leaveDetailsDataRecord.annualLeaveDate,
        annualLeaveDateValue
      );

      const totalData1 = {
      id: leaveDetailsDataRecord.id,
      empID,
      leavePass:updatedleavePass,
      dateLeavePass:updateddateLeavePass,
      destinateLeavePass:updateddestinateLeavePass,
      durLeavePass:updateddurLeavePass,
      annualLeave:updatedannualLeave,
      annualLeaveDate:updatedannualLeaveDate,
      sickLeave,
      sickLeaveDate,
      materLeave,
      paterLeave,
      mrageLeave,
      pervAnnualLeaveBal,
      // compasLeave,
      hospLeave, 
     
    };
    
    //   // console.log(totalData1, "ertdfghjkhbtxrfgh");
      try{const Leave = await client.graphql({
        query: updateEmpLeaveDetails, 
        variables: { input: totalData1, limit:20000, },
      });
      // console.log(Leave);
    }catch(err){
    console.log(err);
      }
    }

    if (terminateDataRecord) {
      const totalData2 = {
      id: terminateDataRecord.id,
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
    
      // console.log(totalData2, "ertdfghjkhbtxrfgh");
      
      try{
        const Terminate = await client.graphql({
          query: updateTerminationInfo, 
          variables: { input: totalData2 , limit:20000,},
        });
        // console.log(Terminate);
      }catch(err){console.log(err);
      }
    }

  
    if (SRDataRecord) {
      const updateddepEmpDate = updateFieldArray(
        SRDataRecord.depEmpDate,
        upgradeDepEmpDate
      );
      const updateddepEmp = updateFieldArray(SRDataRecord.depEmp, depEmp);
      const updatedpositionRevDate = updateFieldArray(
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
      const updatedrevSalaryDate = updateFieldArray(
        SRDataRecord.revSalaryDate,
        upgradeRevSalaryDate
      );
      const updatedrevLeaveDate = updateFieldArray(
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
      const updatedrevALD = updateFieldArray(
        SRDataRecord.revALD,
        upgradeRevALD
      );
      
      
    const totalData3 = {
      id: SRDataRecord.id,
      empID,
      positionRev:updatedpositionRev,
      positionRevDate:updatedpositionRevDate,
      revSalary:updatedrevSalary,
      revSalaryDate:updatedrevSalaryDate,
      revLeavePass:updatedrevLeavePass,
      revLeaveDate:updatedrevLeaveDate,
      revAnnualLeave:updatedrevAnnualLeave,
      revALD:updatedrevALD,
      depEmp:updateddepEmp,
      depEmpDate:updateddepEmpDate,
      remarkWI,
      uploadPR,
      uploadSP,
      uploadLP,
      uploadAL,
      uploadDep,
    };
    
      // console.log(totalData3, "ertdfghjkhbtxrfgh");   


      try{
        const Service = await client.graphql({
          query: updateServiceRecord, 
          variables: { input: totalData3, limit:20000, },
        });
        // console.log(Service);
      }catch(err){console.log(err);
      }
    }

    // try {
    //   // Make GraphQL calls concurrently using Promise.all
    //   const [Emp, Terminate, Leave, Service] = await Promise.all([
    //     client.graphql({
    //       query: updateEmpWorkInfo,
    //       variables: { input: totalData },
    //     }),
    //     client.graphql({
    //       query: updateTerminationInfo,
    //       variables: { input: totalData1 },
    //     }),
    //     client.graphql({
    //       query: updateEmpLeaveDetails,
    //       variables: { input: totalData2 },
    //     }),
    //     client.graphql({
    //       query: updateServiceRecord,
    //       variables: { input: totalData3 },
    //     }),
    //   ]);

    //   // Log each response for debugging
    //   console.log("Emp Data Updated:", Emp);
    //   console.log("Terminate Data Updated:", Terminate);
    //   console.log("Leave Data Updated:", Leave);
    //   console.log("Service Record Updated:", Service);
    // } catch (error) {
    //   console.error("Error executing GraphQL requests:", error);
    //   throw error;
    // }
  }, []);

  // Return the update function so it can be used in the component
  return { WIUpdateData };
};
