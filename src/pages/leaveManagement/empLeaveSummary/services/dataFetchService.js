// src/pages/leaveManagement/empLeaveSummary/services/dataFetchService.js
export const fetchAllData = async ({ storedData }) => {
  const {
    empPIData: allEmpPersonalInfos,
    workInfoData: allWorkInfo,
    empLeaveStatusData: allLeaveStatuses,
    leaveDetailsData: allEmpLeaveDetails,
  } = storedData;

  const empInfoMap = new Map(allEmpPersonalInfos.map((e) => [e.empID, e]));

  const workInfoMap = new Map(allWorkInfo.map((w) => [w.empID, w]));

  const leaveDetailsMap = new Map(
    allEmpLeaveDetails.map((l) => [l.empID, l])
  );

  const mergedLeaveData = allLeaveStatuses.map((leaveStatus) => {
    const empInfo = empInfoMap.get(leaveStatus.empID) || {};
    const workInfo = workInfoMap.get(leaveStatus.empID) || {};
    const leaveDetails = leaveDetailsMap.get(leaveStatus.empID) || {};

    return {
      ...leaveStatus,
      ...leaveDetails,
      // ...workInfo,
      id: leaveStatus.id,
      empID: leaveStatus.empID,
      empName: empInfo.name,
      empBadgeNo: empInfo.empBadgeNo,
      gender: empInfo.gender,
      empOfficialEmail: empInfo.officialEmail,
      doj: workInfo.doj,
      leaveStatusCreatedAt: leaveStatus.createdAt,
      leaveStatusReceivedDate: leaveStatus.receivedDate,
      leaveDays: leaveStatus.days,
      // leaveType: leaveStatus.leaveType,
      supervisorName: leaveStatus.supervisorName,
      supervisorEmpID: leaveStatus.supervisorEmpID,
      supervisorStatus: leaveStatus.supervisorStatus,
      supervisorDate: leaveStatus.supervisorDate,
      supervisorRemarks: leaveStatus.supervisorRemarks,
      managerName: leaveStatus.managerName,
      managerEmpID: leaveStatus.managerEmpID,
      managerStatus: leaveStatus.managerStatus,
      managerDate: leaveStatus.managerDate,
      managerRemarks: leaveStatus.managerRemarks,
      empStatus: leaveStatus.empStatus,
      reason: leaveStatus.reason,
      medicalCertificate: leaveStatus.medicalCertificate,
      empLeaveType: leaveStatus.leaveType,
      position: workInfo.position || "",
      department: workInfo.department || "",
      workHrs: workInfo?.workHrs || [],
      workMonth: workInfo?.workMonth || [],
      workWeek: workInfo?.workWeek || [],

      empLeaveStartDate: leaveStatus?.fromDate,
      empLeaveEndDate: leaveStatus?.toDate,

      empLeaveSelectedFrom: leaveStatus?.selectedFrom,
      empLeaveSelectedTo: leaveStatus?.selectedTo,

      empLeaveUpdatedAt: leaveStatus.updatedAt,
      compassionateLeave: leaveDetails.compasLeave || 0,
      annualLeave: leaveDetails.annualLeave || 0,
      sickLeave: leaveDetails.sickLeave || 0,
      maternityLeave: leaveDetails.materLeave || 0,
      paternityLeave: leaveDetails.paterLeave || 0,
      hospitalLeave: leaveDetails.hospLeave || 0,
      marriageLeave: leaveDetails.mrageLeave || 0,
      empPervAnnualLeaveBal: leaveDetails.pervAnnualLeaveBal || 0,
      leaveDetailsCreatedAt: leaveDetails.createdAt,
      leaveDetailsUpdatedAt: leaveDetails.updatedAt,
      empsickLeaveTaken: leaveDetails.sickLeaveTaken,

      empSickLeaveDate: leaveDetails.sickLeaveDate,

      empAnnualLeaveDate: leaveDetails?.annualLeaveDate,
    };
  });

  return {
    mergedData: mergedLeaveData,
    personalDetails: allEmpPersonalInfos,
  };
};

export const initializeLeaveType = (total = 0, isSpecialLeave = false) => ({
  totalLeave: isSpecialLeave ? null : total || 0,
  daysTaken: 0,
  waitingApproval: 0,
  remainingLeave: isSpecialLeave ? null : total,
});