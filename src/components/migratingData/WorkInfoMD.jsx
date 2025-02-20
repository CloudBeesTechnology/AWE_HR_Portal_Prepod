import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { DataSupply } from "../../utils/DataStoredContext";
import { WorkInfoFunc } from "../../services/createMethod/WorkInfoFunc";
import { UpdateWIData } from "../../services/updateMethod/UpdateWIData";

export const WorkInfoMD = () => {
  const { workInfoData } = useContext(DataSupply);
  const { SubmitWIData } = WorkInfoFunc();
  const { WIUpdateData } = UpdateWIData();
  console.log(workInfoData);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start from Jan 1, 1900
    const daysOffset = serial - 2; // Excel considers 1 as Jan 1, 1900
    return new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  // Link 1:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfo.csv"
  // Link 2:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfo.csv"
  // Link 3:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfO.csv"
  // Link 4:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmPWorkInfo.csv"
  // Link 5:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EMPWorkInfo.csv"
  // Link 6:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfo+Update.csv"
  // Link 7:"https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfo+5.csv"

  const fetchExcelFile = async () => {
    try {
      // Fetch the Excel file from the URL
      const response = await axios.get(
        "https://commonfiles.s3.ap-southeast-1.amazonaws.com/BulkDataFiles/EmpWorkInfo/EmpWorkInfo+5.csv",
        {
          responseType: "arraybuffer", // Important to fetch as arraybuffer
        }
      );
      // Convert the response to an array buffer
      const data = new Uint8Array(response.data);
      console.log(data);

      // Parse the file using XLSX
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      // Convert sheet data to JSON format
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      const dateKeys = [
        "doj",
        "contractStart",
        "contractEnd",
        "probationEnd",
        "probationStart",
        "upgradeDate",
      ];
      const transformedData = sheetData.slice(1).map((row) => {
        let result = {};
        sheetData[0].forEach((key, index) => {
          let value = row[index];
          if (dateKeys.includes(key) && !isNaN(value)) {
            value = excelDateToJSDate(value).toISOString().split("T")[0];
          }

          result[key] = value !== undefined ? String(value) : value; // Convert to string
        });
        return result;
      });
      // console.log("All Data:", transformedData);
      for (const workInfoValue of transformedData) {

        if (!workInfoValue.empID) {
          continue;
        }

        if (workInfoValue.empID) {
          workInfoValue.empID = String(workInfoValue.empID);
        }

        console.log(workInfoValue);

        const checkingWorkInfoTable = workInfoData.find(
          (match) => match.empID === workInfoValue.empID
        );

        if (checkingWorkInfoTable) {
          console.log(workInfoValue, "update");
          const workInfoUpValue = {
            ...workInfoValue,
            workInfoDataRecord: checkingWorkInfoTable,
          };
          await WIUpdateData({ workInfoUpValue });
        } else {
          console.log(workInfoValue, "create");
          await SubmitWIData({ workInfoValue });
        }

       }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-40">
      WorkInfoMD
      <button onClick={fetchExcelFile}>Click Here</button>
    </div>
  );
};

// import React from "react";
// import {
//   CountryORDD,
//   DepartmentDD,
//   EducLevelDD,
//   JobCatDD,
//   NationalityDD,
//   RaceDD,
//   RelationshipDD,
//   ReligionDD,
//   WorkStatusDD,
// } from "../../utils/DropDownMenus";
// import { generateClient } from "@aws-amplify/api";
// import {
//   createKeyValueStore,
//   updateKeyValueStore,
// } from "../../graphql/mutations";
// import {  } from "../../pages/employees/WorkDataPass";

// const client = generateClient();

// export const WorkInfoMD = () => {
//   const deptData = async () => {
//     console.log("hp");

//     const updateDD = {
//       raceDD: [
//         "Australian",
//         "Bangladesi",
//         "Bidayuh",
//         "British",
//         "Chinese",
//         "Dayak",
//         "Dusun",
//         "Dusun Muslim",
//         "Eurasian",
//         "Filipino",
//         "Iban",
//         "Iban Chinese",
//         "Iban Dayak",
//         "Iban Muslim",
//         "Indian",
//         "Indonesia",
//         "Java",
//         "Kadazan",
//         "Kayan",
//         "Kedayan",
//         "Kelabit",
//         "Kenyah",
//         "Lun Bawang",
//         "Malay",
//         "Melanau",
//         "Murut",
//         "Muslim",
//         "Srilankan",
//         "Thai",
//         "Ukit",
//         "Other",
//       ],
//       religionDD: [
//         "Islam",
//         "Christian",
//         "Hindu",
//         "Buddhist",
//         "Free Thinker",
//         "Not Mentioned",
//       ],
//       positionDD: [
//         "Accountant",
//         "Accounts Assistant",
//         "Accounts Coordinator",
//         "Admin Clerk",
//         "Advance Scaffolder",
//         "Advance Scaffolder Leadman",
//         "Apprentice Blaster Painter",
//         "Apprentice Marker Fitter Level 1A (Structural & Basic Piping)",
//         "Assistant Construction Supervisor",
//         "Assistant Field Engineer",
//         "Assistant Material Controller",
//         "Assistant Quality Control Inspector",
//         "Blaster/Painter",
//         "Blasting/Painting & Insulation Coordinator",
//         "Blasting/Painting PTW Supervisor",
//         "Blasting/Painting Supervisor",
//         "Calibration & Certification Coordinator",
//         "Camp Inspector cum Driver",
//         "Clerk",
//         "Coating Field Support",
//         "Construction Engineer",
//         "Construction Site Supervisor",
//         "Contract Engineer",
//         "Contract Manager",
//         "Cost Engineer",
//         "Costing Engineer",
//         "Deputy Facility Manager",
//         "Deputy HR Manager",
//         "Deputy Logistic Coordinator",
//         "Deputy Project Manager",
//         "Director's Personal Asst",
//         "Document & Data Controller",
//         "Document Controller",
//         "Document Controller cum Training/Medical Support",
//         "Document Controller/Timekeeper",
//         "Driver",
//         "Driver/Operator",
//         "E&I Manager",
//         "Electrician",
//         "Equipment & Maintenance Coordinator",
//         "Executive Director",
//         "Field Engineer",
//         "Field Engineer - Rotating",
//         "Finance & Procurement Manager",
//         "Finance/Project Controls Coordinator",
//         "Fitter Mechanic",
//         "Fitter Mechanic Grade A",
//         "Flange Management Engineer",
//         "Flange Management Inspector",
//         "Foreman",
//         "Forklift cum Overhead Crane Operator",
//         "Forklift Operator",
//         "General Manager",
//         "Helper",
//         "HP Jetter/Senior Mechanical Technician",
//         "HR Assistant",
//         "HR Assistant Coordinator",
//         "HR Coordinator",
//         "Human Resource Manager",
//         "HR/LBD Coordinator",
//         "HSE & Welfare Advisor",
//         "HSE Advisor",
//         "HSSE Advisor/Auditor",
//         "HSSE Coordinator",
//         "HSSE Manager",
//         "HSSE Officer",
//         "HSSE Offshore Officer",
//         "HSSE Training Coordinator",
//         "Industrial Cleaner",
//         "Industrial Cleaner Lead",
//         "Industrial Cleaner Supervisor",
//         "Insulation Fabricator",
//         "Insulation Field Support",
//         "Insulation Inspector",
//         "Insulation Supervisor",
//         "Insulation Supervisor/Permit Holder",
//         "Insulation Worksite Supervisor",
//         "Insulator",
//         "Insulator cum Fabricator",
//         "Inventory Maintenance Supervisor",
//         "IT Assistant Engineer",
//         "Junior Coordinator",
//         "Junior Electrician",
//         "Junior Engineer",
//         "Junior Field Engineer",
//         "Junior Material Coordinator",
//         "Junior Mechancial Technician",
//         "Junior Mechanical Technician",
//         "Junior Planner",
//         "Junior QC Inspector",
//         "Junior Scheduler",
//         "LBD & Welfare Manager",
//         "Leadman",
//         "Load Out Leadman",
//         "Loadout/Backload Supervisor",
//         "Logistics Coordinator",
//         "Logistics Scheduler",
//         "Logistics Scheduler & Timekeeper",
//         "Machinist",
//         "Machinist Grade A",
//         "Maintenance Coordinator",
//         "Managing Director",
//         "Marker Fitter",
//         "Marker Fitter Grade A",
//         "Marker Fitter Grade B",
//         "Marker Fitter Multiskill",
//         "Material Coordinator",
//         "Mechanic",
//         "Mechanical Construction Coordinator",
//         "Mechanical Construction Supervisor",
//         "Mechanical cum Hotwork Supervisor",
//         "Mechanical Engineer",
//         "Mechanical Execution Lead",
//         "Mechanical Field Engineer",
//         "Mechanical Insulation Supervisor",
//         "Mechanical Leadman",
//         "Mechanical Supervisor",
//         "Mechanical Supervisor/ PIC",
//         "Mechanical Supervisor/Permit Holder",
//         "Mechanical Technician",
//         "Mechanical Technician cum Rigger",
//         "Mechanical/Hotwork Supervisor",
//         "Office Assistant/Driver",
//         "Offshore Fabrication Workshop / Deck Supervisor",
//         "Offshore Mechanical Store Supervisor",
//         "Offshore Operations Manager",
//         "Offshore PWHT Technician",
//         "OMEC Contract Manager",
//         "Painter",
//         "Pass Coordinator cum Document Controller",
//         "Permit Coordinator",
//         "Personnel Officer",
//         "Pipe Welder - 6GR Trainee",
//         "Pipe Welder (6G)",
//         "Piping Supervisor",
//         "Planner",
//         "Planning Engineer",
//         "Procurement Coordinator",
//         "Project Coordinator",
//         "Project Engineer",
//         "PTW Supervisor",
//         "Public Relation Officer",
//         "Purchaser cum Expeditor",
//         "Purchasing Clerk",
//         "Purchasing Coordinator",
//         "PWHT Technician cum Electrician",
//         "QA/QC Coordinator",
//         "QA/QC Engineer",
//         "QA/QC Inspector",
//         "QA/QC Manager/QMR",
//         "Quantity Surveyor",
//         "Rigger",
//         "Rigger Multiskill",
//         "Rotating Equipment Engineer",
//         "Rotating Equipment Technician",
//         "Rotating Supervisor",
//         "Rotating Technician",
//         "Rotating Technician cum Mechanical Technician",
//         "Scaffold Coordinator",
//         "Scaffolder",
//         "Scaffolding Field Support",
//         "Scaffolding Inspector",
//         "Scaffolding Inspector cum Supervisor",
//         "Scaffolding Superintendent",
//         "Scaffolding Supervisor",
//         "Scaffolding Supervisor & Permit Holder",
//         "Scaffolding Supervisor/Inspector",
//         "Secretary",
//         "Secretary Cum Admin",
//         "Senior Document Controller",
//         "Senior Inspector",
//         "Senior Mechanical Supervisor",
//         "Senior Mechanical Technician",
//         "Senior Mechanical Technician cum HP/UHP Lead Operator",
//         "Senior Mechanical Technician/Banksman",
//         "Senior Planning Engineer",
//         "Senior Rotating Technician",
//         "Senior Scheduler",
//         "Senior Supervisor",
//         "Store Assistant",
//         "Store Coordinator",
//         "Storekeeper",
//         "Supervisor",
//         "Technical Assistant/Driver",
//         "Technical Clerk",
//         "Technical Field Support",
//         "Technical Field Support cum Fire Watcher",
//         "Timekeeper/Clerk",
//         "Tools & Equipment Coordinator",
//         "Trainee Technician",
//         "Training Coordinator",
//         "Turnaround Coordinator",
//         "UHP/HP Pump Operator/Hydro Jetter cum Mechanical Technician",
//         "Unit Shutdown Coordinator",
//         "Valve Technician",
//         "Welder",
//         "Welder Grade A",
//         "Welder Grade A1",
//         "Welder Grade B",
//         "Welder Grade C",
//         "Welder Multiskill",
//         "Welding Inspector",
//         "Welfare Officer cum CVEV Officer",
//         "Workpack Preparer",
//         "Worksite Supervisor",
//         "Other",
//       ],
//       nationalityDD: [
//         "Bruneian",
//         "Brunei PR",
//         "Malaysian",
//         "Indonesian",
//         "Indian",
//         "Bangladeshi",
//         "Thai",
//         "Sri Lankan",
//         "Filipino",
//         "Other",
//       ],
//       relationshipDD: [
//         "Single",
//         "Employee & Spouse",
//         "Employee, Spouse & Children (max 2 pax below age 18)",
//       ],
//       workStatusDD: ["Probationary", "Active", "Resignation", "Termination"],
//       countryORDD: [
//         "Afghanistan",
//         "Bangladesh",
//         "Brunei",
//         "Brunei Darussa",
//         "Brunei Darussalam",
//         "India",
//         "Indonesia",
//         "Malaysia",
//         "Philippines",
//         "Sri Lanka",
//         "Thailand",
//         "United Kingdom",
//         "Other",
//       ],
//       educLevelDD: [
//         "Postgraduate",
//         "Bachelor or Equivalent",

//         "Advance Diploma or Equivalant",

//         "Technical/Vocational/Diploma/Certificate",

//         "Secondary Education",
//         "Primary Education or Below",
//         "Others",
//       ],
//       departmentDD: [
//         "Accounts",
//         "BLNG",
//         "SBW",
//         "Corporate",
//         "CPD",
//         "E&I",
//         "Human Resource",
//         "LBD",
//         "Offshore",
//         "Purchasing",
//         "Other",
//       ],
//       jobCatDD : [
        
//          "Blaster/Painter", 
//          "Clerical", 
//          "Coordinator", 
//          "Director", 
//          "Driver", 
//          "Driver/Operator", 
//          "Electrician", 
//          "Engineer", 
//          "Fitter", 
//          "Helper/Store Assistant", 
//          "Inspector", 
//          "Insulation", 
//          "Leadman", 
//          "Machinist", 
//          "Manager", 
//          "Mechanic", 
//          "Rigger/Field Support", 
//          "Safety", 
//          "Scaffolder", 
//          "Storekeeper", 
//          "Superintendent", 
//          "Supervisor", 
//          "Technician", 
//          "Welder", 
//          "Other", 
//       ],
//       resignNotifConfDD: ["1 Month", "3 Months", "N/A", "Other"],
//       resignNotifProbDD: ["1 Week", "28 Days", "N/A", "Other"],
//       termiNotifConfDD: ["28 Days", "1 Month", "3 Months", "N/A", "Other"],
//       termiNotifProbDD: ["1 Week", "28 Days", "N/A", "Other"],
//       workPermitDD: [
//         "Foreign Worker License (LPA)",
//         "Foreign Worker License (SAWP)",
//         "Foreign Worker License Additional (LPA)",
//         "Foreign Worker License Additional (SAWP)",
//         "Foreign Worker License Renewal (LPA)",
//         "Foreign Worker License Renewal (SAWP)",
//         "Foreign Worker License Change Salary/Job Title (LPA)",
//         "Foreign Worker License Cancellation (LPA)",
//         "Foreign Worker License Cancellation (SAWP)",
//         "Foreign Worker License Cancellation SAWP to LPA",
//         "Foreign Worker License Transfer of Contract (LPA)",
//         // Add remaining options here
//       ],
//       insuClaimDD: [
//         "Group H&S Insurance",
//         "Travelling Insurance",
//         "Personal Accident Insurance",
//       ],
//       insuHSDD: [
//         "Employee",
//         "Employee & spouse",
//         "Employee & Child",
//         "Employee & Family",
//         "Decline",
//         "Others",
//       ],
//     };

//     try {
//       await client
//         .graphql({
//           query: createKeyValueStore,
//           variables: {
//             input: {
//               // id: "74d3bd0f-a775-4bca-88f7-dc6e90cd3cbe",
//               ...updateDD,
//             },
//           },
//         })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-40">
//       WorkInfoMD
//       <button onClick={deptData}> Click Here</button>
//     </div>
//   );
// };
