export const useTableFieldData = (titleName) => {
  console.log(titleName);
  const getFieldData = (type) => {
    if (type === "HO") {
      return {
        fieldObj: {
          REC: null,
          CTR: null,
          DEPT: null,
          EMPLOYEEID: null,
          BADGE: null,
          NAME: null,
          DATE: null,
          ONAM: null,
          OFFAM: null,
          ONPM: null,
          OFFPM: null,
          IN: null,
          OUT: null,
          TOTALINOUT: null,
          ALLDAYMINUTES: null,
          NETMINUTES: null,
          TOTALHOURS: null,
          TOTALACTUALHOURS: null,
          REMARKS: null,
        },
        fields: [
          "REC",
          "CTR",
          "DEPT",
          "EMPLOYEEID",
          "BADGE",
          "NAME",
          "DATE",
          "ONAM",
          "OFFAM",
          "ONPM",
          "OFFPM",
          "IN",
          "OUT",
          "TOTALINOUT",
          "ALLDAYMINUTES",
          "NETMINUTES",
          "TOTALHOURS",
          "TOTALACTUALHOURS",
          "REMARKS",
        ],
        tableHeader: [
          "REC#",
          "CTR",
          "DEPT",
          "EMPLOYEE ID",
          "BADGE#",
          "NAME",
          "DATE",
          "ON AM",
          "OFF AM",
          "ON PM",
          "OFF PM",
          "IN",
          "OUT",
          "TOTAL IN/OUT",
          "ALL DAY MINUTES",
          "NET MINUTES",
          "TOTAL HOURS",
          "TOTAL ACTUAL HOURS",
          "REMARKS",
        ],
      };
      // return { fieldObj, fields, tableHeader };
    }
    if (type === "BLNG") {
      return {
        fieldObj: {
          FID: null,
          NAMEFLAST: null,
          ENTRANCEDATEUSED: null,
          ENTRANCEDATETIME: null,
          EXITDATETIME: null,
          DAYDIFFERENCE: null,
          AVGDAILYTOTALBYDAY: null,
          AHIGHLIGHTDAILYTOTALBYGROUP: null,
          ADININWORKSENGINEERINGSDNBHD: null,
          NORMALWORKINGHRSPERDAY: null,
          WORKINGHOURS: null,
          OT: null,
          REMARKS: null,
        },

        fields: [
          "FID",
          "NAMEFLAST",
          "ENTRANCEDATEUSED",
          "ENTRANCEDATETIME",
          "EXITDATETIME",
          "DAYDIFFERENCE",
          "AVGDAILYTOTALBYDAY",
          "AHIGHLIGHTDAILYTOTALBYGROUP",
          "ADININWORKSENGINEERINGSDNBHD",
          "NORMALWORKINGHRSPERDAY",
          "WORKINGHOURS",
          "OT",
          "REMARKS",
        ],

        tableHeader: [
          "FID",
          "NAME (FLAST)",
          "ENTRANCE DATE USED",
          "ENTRANCE DATETIME",
          "EXIT DATETIME",
          "DAY DIFFERENCE",
          "AVG. DAILY TOTAL BY DAY",
          "A HIGHLIGHT DAILY TOTAL BY GROUP",
          "ADININ WORK & ENGINEERING SDN BHD",
          "NORMAL WORKING HRS PERDAY",
          "ACTUAL WORKING HOURS",
          "OT",
          // "JOB CODE",
          // "LOCATION",
          "REMARKS",
        ],
      };
    }
    if (type === "SBW") {
      return {
        fieldObj: {
          NAME: null,
          DEPTDIV: null,
          BADGE: null,
          DATE: null,
          IN: null,
          OUT: null,
          TOTALINOUT: null,
          ALLDAYMINHRS: null,
          NETMINUTES: null,
          TOTALHOURS: null,
          WORKINGHOURS: null,
          OT: null,
          REMARKS: null,
        },
        fields: [
          "NAME",
          "DEPTDIV",
          "BADGE",
          "DATE",
          "IN",
          "OUT",
          "TOTALINOUT",
          "ALLDAYMINHRS",
          "NETMINUTES",
          "TOTALHOURS",
          "WORKINGHOURS",
          "OT",
          "REMARKS",
        ],
        tableHeader: [
          "Name",
          "DEPT/DIV",
          "BADGE#",
          "DATE",
          "IN",
          "OUT",
          "TOTAL IN/OUT",
          "ALL DAY MIN (HRS)",
          "NET MINUTES",
          "TOTAL HOURS",
          "ACTUAL WORKING HOURS",
          "OT",
          "REMARKS",
        ],
      };
    }
    if (type === "ORMC") {
      return {
        fieldObj: {
          NAME: null,
          DEPTDIV: null,
          BADGE: null,
          DATE: null,
          IN: null,
          OUT: null,
          TOTALINOUT: null,
          ALLDAYMINHRS: null,
          NETMINUTES: null,
          TOTALHOURS: null,
          WORKINGHOURS: null,
          OT: null,
          REMARKS: null,
        },
        fields: [
          "NAME",
          "DEPTDIV",
          "BADGE",
          "DATE",
          "IN",
          "OUT",
          "TOTALINOUT",
          "ALLDAYMINHRS",
          "NETMINUTES",
          "TOTALHOURS",
          "WORKINGHOURS",
          "OT",
          "REMARKS",
        ],
        tableHeader: [
          "Name",
          "DEPT/DIV",
          "BADGE#",
          "DATE",
          "IN",
          "OUT",
          "TOTAL IN/OUT",
          "ALL DAY MIN (HRS)",
          "NET MINUTES",
          "TOTAL HOURS",
          "ACTUAL WORKING HOURS",
          "OT",
          "REMARKS",
        ],
      };
    }
  };
  const AllFieldData = getFieldData(titleName);
  return AllFieldData;
};
