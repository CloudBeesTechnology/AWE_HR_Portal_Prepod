import { GoUpload } from "react-icons/go";
import {
  GenderDD,
  MaritalDD,
  NationalityDD,
} from "../../utils/DropDownMenus";
export const WorkDataPass = {

    positions : [
        "Accountant", "Accounts Assistant", "Accounts Coordinator", "Admin Clerk", 
        "Advance Scaffolder", "Advance Scaffolder Leadman", "Assistant Field Engineer", 
        "Assistant Material Controller", "Assistant Quality Control Inspector", 
        "Basic Scaffolder", "Basic Scaffolder 1", "Basic Scaffolder 2", "Blaster/Painter", 
        "Blasting/Painting & Insulation Coordinator", "Blasting/Painting PTW Supervisor", 
        "Blasting/Painting Supervisor", "Calibration & Certification Coordinator", 
        "Camp Inspector cum Driver", "Clerk", "Coating Field Support", "Construction Engineer", 
        "Contract Engineer", "Contract Manager", "Cost Engineer", "Costing Engineer", 
        "Deputy Facility Manager", "Deputy HR Manager", "Deputy Logistic Coordinator", 
        "Deputy Project Manager", "Director's Personal Asst", "Document & Data Controller", 
        "Document Controller", "Document Controller cum Training/Medical Support", 
        "Document Controller/Timekeeper", "Driver", "Driver/Operator", "E&I Manager", 
        "Equipment & Maintenance Coordinator", "Executive Director", "Field Engineer", 
        "Field Engineer - Rotating", "Finance & Procurement Manager", 
        "Finance/Project Controls Coordinator", "Fitter Mechanic", "Fitter Mechanic Grade A", 
        "Flange Management Engineer", "Flange Management Inspector", "Foreman", 
        "Forklift cum Overhead Crane Operator", "Forklift Operator", "General Manager", 
        "Helper", "HP Jetter/Senior Mechanical Technician", "HR Assistant", 
        "HR Assistant Coordinator", "HR Coordinator", "HR Manager", "HR/LBD Coordinator", 
        "HSE & Welfare Advisor", "HSE Advisor", "HSSE Advisor/Auditor", "HSSE Coordinator", 
        "HSSE Manager", "HSSE Officer", "HSSE Training Coordinator", "Industrial Cleaner", 
        "Industrial Cleaner Lead", "Industrial Cleaner Supervisor", "Insulation Fabricator", 
        "Insulation Field Support", "Insulation Inspector", "Insulation Supervisor", 
        "Insulation Supervisor/Permit Holder", "Insulation Worksite Supervisor", 
        "Insulator", "Insulator cum Fabricator", "Inventory Maintenance Supervisor", 
        "IT Assistant Engineer", "Junior Coordinator", "Junior Electrician", "Junior Engineer", 
        "Junior Field Engineer", "Junior Material Coordinator", "Junior Mechancial Technician", 
        "Junior Mechanical Technician", "Junior Planner", "Junior QC Inspector", 
        "Junior Scheduler", "LBD & Welfare Manager", "Leadman", "Load Out Leadman", 
        "Loadout/Backload Supervisor", "Logistics Coordinator", "Logistics Scheduler", 
        "Logistics Scheduler & Timekeeper", "Machinist", "Machinist Grade A", 
        "Maintenance Coordinator", "Managing Director", "Marker Fitter", 
        "Marker Fitter Grade A", "Marker Fitter Grade B", "Material Coordinator", 
        "Mechanic", "Mechanical Construction Coordinator", "Mechanical cum Hotwork Supervisor", 
        "Mechanical Engineer", "Mechanical Execution Lead", "Mechanical Field Engineer", 
        "Mechanical Insulation Supervisor", "Mechanical Supervisor", 
        "Mechanical Supervisor/ PIC", "Mechanical Supervisor/Permit Holder", 
        "Mechanical Technician", "Mechanical Technician cum Rigger", 
        "Mechanical/Hotwork Supervisor", "Office Assistant/Driver", 
        "Offshore Operations Manager", "OMEC Contract Manager", "Painter", 
        "Pass Coordinator cum Document Controller", "Permit Coordinator", 
        "Personnel Officer", "Pipe Welder - 6GR Trainee", "Pipe Welder (6G)", "Piping Supervisor", 
        "Planner", "Planning Engineer", "Procurement Coordinator", "Project Coordinator", 
        "Project Engineer", "PTW Supervisor", "Public Relation Officer", "Purchaser cum Expeditor", 
        "Purchasing Clerk", "Purchasing Coordinator", "PWHT Technician cum Electrician", 
        "QA/QC Coordinator", "QA/QC Engineer", "QA/QC Inspector", "QA/QC Manager/QMR", 
        "Quantity Surveyor", "Rigger", "Rotating Equipment Engineer", "Rotating Equipment Technician", 
        "Rotating Supervisor", "Rotating Technician", "Rotating Technician cum Mechanical Technician", 
        "Scaffold Coordinator", "Scaffolder", "Scaffolding Field Support", "Scaffolding Inspector", 
        "Scaffolding Inspector cum Supervisor", "Scaffolding Superintendent", 
        "Scaffolding Supervisor", "Scaffolding Supervisor & Permit Holder", 
        "Scaffolding Supervisor/Inspector", "Secretary", "Secretary Cum Admin", 
        "Senior Document Controller", "Senior Inspector", "Senior Mechanical Supervisor", 
        "Senior Mechanical Technician", "Senior Mechanical Technician cum HP/UHP Lead Operator", 
        "Senior Mechanical Technician/Banksman", "Senior Planning Engineer", 
        "Senior Rotating Technician", "Senior Scheduler", "Senior Supervisor", 
        "Store Assistant", "Store Coordinator", "Storekeeper", "Supervisor", 
        "Technical Assistant/Driver", "Technical Clerk", "Technical Field Support", 
        "Technical Field Support cum Fire Watcher", "Timekeeper/Clerk", "Tools & Equipment Coordinator", 
        "Trainee Technician", "Training Coordinator", "Turnaround Coordinator", 
        "UHP/HP Pump Operator/Hydro Jetter cum Mechanical Technician", "Unit Shutdown Coordinator", 
        "Valve Technician", "Welder", "Welder Grade A", "Welder Grade A1", "Welder Grade B", 
        "Welder Grade C", "Welfare Officer cum CVEV Officer", "Workpack Preparer", 
        "Worksite Supervisor", "Apprentice Blaster Painter", 
        "Apprentice Marker Fitter Level 1A (Structural & Basic Piping)", 
        "Assistant Construction Supervisor", "Construction Site Supervisor", "Electrician", 
        "HSSE Offshore Officer", "Marker Fitter Multiskill", "Mechanic", 
        "Mechanical Construction Supervisor", "Mechanical Leadman", 
        "Offshore Fabrication Workshop / Deck Supervisor", "Offshore Mechanical Store Supervisor", 
        "Offshore PWHT Technician", "Rigger Multiskill", "Senior Inspector", "Storekeeper", 
        "Welder", "Welder Multiskill", "Welding Inspector", "Other"
      ],
      
      workFields : [
        {
          label: "Date of Join",
          name: "doj",
          type: "date",
        },
        {
          label: "Job Description",
          name: "jobDesc",
          type: "text",
        },
        {
          label: "Skill Pool",
          name: "skillPool",
          type: "select",
          options: [
            "",
            "Corporate",
            "Management",
            "Supervisory",
            "Administration & Accounts",
            "Skilled",
            "Unskilled",
          ],
        },
        {
          label: "HR ID",
          name: "hr",
          value: "Hr-notification@adininworks.com",
          type: "text",
        },
        {
          label: "Manager ID",
          name: "manager",
          type: "text",
        },
        {
          label: "Supervisor ID",
          name: "supervisor",
          type: "text",
        },
      ],
 
        // {
        //   label: "Normal Working Day per Week",
        //   name: "workWeek",
        //   type: "text",
        // },
        // {
        //   label: "Normal Working Day per Month",
        //   name: "workMonth",
        //   type: "text",
        // },
        // {
        //   label: "Employment Work Status",
        //   name: "workStatus",
        //   type: "select",
        //   options: ["", "Probationary", "Active", "Resignation", "Termination"],
        // },
        // {
        //   label: "Type of Salary Pay",
        //   name: "salaryType",
        //   type: "select",
        //   options: ["", "Monthly", "Daily"],
        // },
        
    
     terminationFields : [
        { label: "Date of Resignation", name: "resignDate", type: "date" },
        { label: "Date of Termination", name: "termiDate", type: "date" },
        {
          label: "Resignation Notice During Probation",
          name: "resignNotProb",
          type: "select",
          options: ["", "1 Week", "28 Working Days", "N/A", "Other"],
        },
        {
          label: "Termination Notice During Probation",
          name: "termiNotProb",
          type: "select",
          options: ["", "1 Week", "28 Working Days", "N/A", "Other"],
        },
        {
          label: "Resignation Notice After Confirmation",
          name: "resignNotConf",
          type: "select",
          options: ["", "1 Month", "3 Months", "N/A", "Other"],
        },
        {
          label: "Termination Notice After Confirmation",
          name: "termiNotConf",
          type: "select",
          options: ["", "1 Month", "3 Months", "N/A", "Other"],
        },
        { label: "Reason of Resignation", name: "reasonResign", type: "text" },
        { label: "Reason of Termination", name: "reasonTerminate", type: "text" },
      ],

      leaveBasic : [
        {
          label: "Date of Leave Passage Entitlement After Contract",
          name: "dateLeavePass",
          type: "date",
        },
        {
          label: "Duration Period of Leave Passage Entitlement",
          name: "durLeavePass",
          type: "text",
        },
        {
          label: "Destination of Leave Passage Entitlement",
          name: "destinateLeavePass",
          type: "text",
        },
      ],
    
      leaveFieldsAnother:[
        { label: "Annual Leave Entitlement", name: "annualLeave", type: "text" },
        { label: "Effective Date", name: "annualLeaveDate", type: "date" },  
        { label: "Sick Leave Entitlement", name: "sickLeave", type: "text" },
        { label: "Effective Date", name: "sickLeaveDate", type: "date" },
        { label: "Maternity Leave Entitlement", name: "materLeave",  type: "text" },
        { label: "Paternity Leave Entitlement", name: "paterLeave",  type: "text" },
        { label: "Marriage Leave Entitlement", name: "mrageLeave",  type: "text" },
        // { label: "Compassionate Entitlement", name: "compasLeave",  type: "text" },
        { label: "Hospitalisation Leave Entitlement", name: "hospLeave", type: "text" },
        { label: "Previous Annual Leave Balance", name: "pervAnnualLeaveBal", type: "text" },
      //   <FormField
      //   label="Previous Annual Leave Balance"
      //   register={register}
      //   type="text"
      //   name="pervAnnualLeaveBal"
      //   errors={errors}
      // />
      ],
     serviceRecords : [
        { label: "Position Revision", name: "positionRev", type: "text" },
        { label: "Effective Date", name: "positionRevDate", type: "date" },
        { label: "Upload File", name: "uploadPR", type: "file" },
        { label: "Salary Package Revision", name: "revSalary", type: "text" },
        { label: "Effective Date", name: "revSalaryDate", type: "date" },
        { label: "Upload File", name: "uploadSP", type: "file" },
        { label: "Leave Passage Revision", name: "revLeavePass", type: "text" },
        { label: "Effective Date", name: "revLeaveDate", type: "date" },
        { label: "Upload File", name: "uploadLP", type: "file" },
        { label: "Annual Leave Revison", name: "revAnnualLeave", type: "text" },
        { label: "Effective date", name: "revALD", type: "date" },
        { label: "Upload File", name: "uploadAL", type: "file" },
        { label: "Change of Department", name: "depEmp", type: "text" },
        { label: "Effective Date", name: "depEmpDate", type: "date" },
        { label: "Upload File", name: "uploadDep", type: "file" },
      ],
      hiringJob:[
        { label: "Job Title", name: "jobTitle", type: "text" },
        { label: "Experience", name: "experience", type: "text" },
        { label: "Location", name: "location", type: "text" },
        { label: "Quantity", name: "quantity", type: "number" },
        { label: "Start Date", name: "startDate", type: "date" },
        { label: "Expiry Date", name: "expiryDate", type: "date" },
      ],

//      formField1 : [
//         { label: "Employee Badge Number", key: "empBadgeNo", type: "text" },
//         { label: "Employee Name", key: "name", type: "text" },
//         { label: "Department", key: "department", type: "text" },
//         { label: "Position", key: "position", type: "text" },
//         { label: "Date of Joining", key: "doj", type: "date" },
//         { label: "Gender", key: "gender", type: "select", options: GenderDD },
//         { label: "Brunei I/C Number", key: "bwnIcNo", type: "text" },
//         { label: "Passport Number for Non-Local", key: "ppNo", type: "text" },
//         { label: "Date of Birth", key: "dob", type: "date" },
//         {
//           label: "Marital Status",
//           key: "marital",
//           type: "select",
//           options: MaritalDD,
//         },
//         {
//           label: "Nationality",
//           key: "nationality",
//           type: "select",
//           options: NationalityDD,
//         },
//         // { label: "Other Nationality", key: "otherNation", type: "text" }
//       ],
// formField2:[
//   {
//     label: "Group H&S Insurance",
//     key: "groupIns",
//     type: "select",
//     options: [
//       "Single",
//       "Employee & spouse",
//       "Employee & Child",
//       "Employee & Family",
//       "Decline",
//       "Others",
//     ],
//   },
//   {
//     label: "Group H&S Insurance Enrollment Effective Date",
//     key: "groupInsEffectDate",
//     type: "date",
//   },
//   {
//     label: "Group H&S Insurance Enrollment End Date",
//     key: "groupInsEndDate",
//     type: "date",
//   },
//   {
//     label: "Workmen Compensation Insurance",
//     key: "workmenComp",
//     type: "select",
//     options: ["Offshore", "Onshore", "General"],
//   },
//   { label: "Policy Number", key: "workmePolicyNo", type: "text" },
//   {
//     label: "Travelling Insurance",
//     key: "travelIns",
//     type: "select",
//     options: ["Yes", "No"],
//   },
//   {
//     label: "Personal Accident Insurance",
//     key: "accidentIns",
//     type: "select",
//     options: ["Yes", "No"],
//   },
// ]
}

