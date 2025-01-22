export const ViewTimesheetDetails = async (obj, type) => {
  let parsedEmpWorkInfo = [];
  try {
    if (Array.isArray(obj.empWorkInfo)) {
      parsedEmpWorkInfo = obj.empWorkInfo?.map((info) =>
        typeof info === "string" ? JSON.parse(info) : info
      );
    }
  } catch (error) {
    // console.error("Error parsing empWorkInfo for ID:", obj.id, error);
  }
  if (obj && type === "HO") {
    const sheetData = {
      REC: obj.rec || 0,
      CTR: obj.ctr || "",
      DEPT: obj.empDept || "",
      EMPLOYEEID: obj.empID || "",
      BADGE: obj.empBadgeNo || "",
      NAME: obj.empName || 0,
      DATE: obj.date || "",
      ONAM: obj.onAM || "",
      OFFAM: obj.offAM || "",
      ONPM: obj.onPM || 0,
      OFFPM: obj.offPM || 0,
      IN: obj?.inTime || 0,
      OUT: obj.outTime || 0,
      TOTALINOUT: obj.totalInOut || "",
      ALLDAYMINUTES: obj.allDayHrs || "",
      NETMINUTES: obj.netMins || "",
      TOTALHOURS: obj.totalHrs || "",
      NORMALWORKINGHRSPERDAY: obj?.normalWorkHrs || 0,
      WORKINGHOURS: obj?.actualWorkHrs || 0,
      OT: obj?.otTime || 0,
      TOTALACTUALHOURS: obj.actualWorkHrs || "",
      jobLocaWhrs: parsedEmpWorkInfo.flat() || [],

      REMARKS: obj.remarks || "",
      STATUS: obj.status || "",
    };

    return sheetData;
  } else if (obj && type === "Offshore") {
    const sheetData = {
      NAME: obj.empName || "",
      NO: obj.fidNo || "",
      LOCATION: obj.location || "",
      TRADE: obj.trade || "",
      DATE: obj.date || "",
      TOTALHOURS: obj.totalNT || 0,
      TOTALHOURS2: obj.totalOT || 0,
      TOTALHOURS3: obj.totalNTOT || 0,
      WORKINGHOURS: obj.actualWorkHrs || 0,
      OT: obj?.otTime || 0,
      NORMALWORKINGHRSPERDAY: obj?.normalWorkHrs || 0,
      jobLocaWhrs: parsedEmpWorkInfo.flat() || [], // Use parsed empWorkInfo
      REMARKS: obj.remarks || "",
      STATUS: obj.status || "",
    };
    return sheetData;
  } else if (obj && type === "ORMC") {
    const sheetData = {
      NAME: obj.empName || 0,
      DEPTDIV: obj.empDept || "",
      BADGE: obj.empBadgeNo || "",
      DATE: obj.date || "",
      IN: obj.inTime || "",
      OUT: obj.outTime || 0,
      TOTALINOUT: obj.totalInOut || "",
      ALLDAYMINHRS: obj.allDayHrs || "",
      NETMINUTES: obj.netMins || "",
      TOTALHOURS: obj.totalHrs || 0,
      NORMALWORKINGHRSPERDAY: obj?.normalWorkHrs || 0,
      WORKINGHOURS: obj.actualWorkHrs || 0,
      OT: obj?.otTime || 0,
      jobLocaWhrs: parsedEmpWorkInfo.flat() || [],

      REMARKS: obj.remarks || "",
      STATUS: obj.status || "",
    };
    return sheetData;
  } else if (obj && type === "SBW") {
    const sheetData = {
      NAME: obj.empName || 0,
      DEPTDIV: obj.empDept || "",
      BADGE: obj.empBadgeNo || "",
      DATE: obj.date || "",
      IN: obj.inTime || "",
      OUT: obj.outTime || 0,
      TOTALINOUT: obj.totalInOut || "",
      ALLDAYMINHRS: obj.allDayHrs || "",
      NETMINUTES: obj.netMins || "",
      TOTALHOURS: obj.totalHrs || 0,
      NORMALWORKINGHRSPERDAY: obj?.normalWorkHrs || 0,
      WORKINGHOURS: obj.actualWorkHrs || 0,
      OT: obj?.otTime || 0,
      jobLocaWhrs: parsedEmpWorkInfo.flat() || [],

      REMARKS: obj.remarks || "",
      STATUS: obj.status || "",
    };
    return sheetData;
  } else if (obj && type === "BLNG") {
    const sheetData = {
      FID: obj.fidNo || 0,
      NAMEFLAST: obj.empName || "",
      ENTRANCEDATEUSED: obj.date || "",
      ENTRANCEDATETIME: obj.inTime?.replace(/[\[\]]/g, "") || "",
      EXITDATETIME: obj.outTime?.replace(/[\[\]]/g, "") || "",
      AVGDAILYTOTALBYDAY: obj.avgDailyTD || "",
      AHIGHLIGHTDAILYTOTALBYGROUP: obj.totalHrs || "",
      ADININWORKSENGINEERINGSDNBHD: obj.aweSDN || "",
      WORKINGHOURS: obj.actualWorkHrs || 0,
      OT: obj.otTime || 0,
      NORMALWORKINGHRSPERDAY: obj?.normalWorkHrs || 0,
      jobLocaWhrs: parsedEmpWorkInfo.flat() || [],

      REMARKS: obj.remarks || "",
      STATUS: obj.status || "",
    };
    return sheetData;
  }
};
