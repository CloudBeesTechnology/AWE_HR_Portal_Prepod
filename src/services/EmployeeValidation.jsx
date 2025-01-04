import * as Yup from "yup";
import { workInfoUploads } from "../utils/DropDownMenus";
import {
  dateStringSchema,
  getDepInsuranceValidationSchema,
  getFamilyDetailsValidationSchema,
  isValidUrl,
} from "./ValidationFunc";
export const NonLocalAccovalidationSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID Number is mandatory"),
  empBadgeNo: Yup.string().notRequired(),
  name: Yup.string().notRequired(),
  accommodation: Yup.string().notRequired(),
  accommodationAddress: Yup.string().notRequired(
    // "Accommodation Address is required"
  ),
});

export const LabourImmigrationSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is mandatory"),
  overMD: Yup.string().notRequired(),
  overME: Yup.string().notRequired(),
  bruhimsRD: Yup.string().notRequired(),
  bruhimsRNo: Yup.string().notRequired(),
  bruneiMAD: Yup.string().notRequired(),
  bruneiME: Yup.string().notRequired(),
  uploadFitness: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF allowed", // Custom error message
          (value) => {
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadRegis: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadBwn: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  dependPass: Yup.array().of(
    Yup.object().shape({
      dependName: Yup.string().notRequired(),
      dependPpNo: Yup.string().notRequired(),
      dependPpE: Yup.string().notRequired(),
      relation: Yup.string().notRequired(),
      labourDPBy: Yup.string().notRequired(),
      labourDRNo: Yup.string().notRequired(),
      labourDAmount: Yup.string()
        .notRequired()
        .test(
          "is-number",
          "Only numbers are allowed",
          (value) => !value || /^[0-9]+$/.test(value)
        ),
      uploadDp: Yup.array()
        .of(
          Yup.mixed().test(
            "fileOrUrl",
            "Only PDF, image files, or valid URLs are allowed",
            (value) => {
              if (value instanceof File) {
                return ["application/pdf", "image/jpeg", "image/png"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value);
              }
              return true;
            }
          )
        )
        .notRequired(),

      uploadDr: Yup.array()
        .of(
          Yup.mixed().test(
            "fileOrUrl",
            "Only PDF, image files, or valid URLs are allowed",
            (value) => {
              if (value instanceof File) {
                return ["application/pdf", "image/jpeg", "image/png"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value);
              }
              return true;
            }
          )
        )
        .notRequired(),
    })
  ),
});

export const WorkInfoSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is mandatory"),
  department: Yup.string()
    .required("Department is mandatory"),

  otherDepartment: Yup.string().notRequired(),
  position: Yup.string()
    .required("Position is mandatory"),
  otherPosition: Yup.string().notRequired(),
  jobCat: Yup.string()
    .required("Job Category is mandatory"),
  otherJobCat: Yup.string().notRequired(),

  doj: Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .required("Date of Join is mandatory")
  .max(new Date(), "Date of Join cannot be in the future"),

   
  jobDesc: Yup.string().required("Job Description is mandatory"),
  skillPool: Yup.string().required("Skill Pool is mandatory"),
  hr: Yup.string().notRequired(),
  manager: Yup.string().required("Manager is mandatory"),
  supervisor: Yup.string().notRequired(),
  relationship: Yup.string()
    .required("Employee Status is mandatory"),

  upgradePosition: Yup.string().notRequired(),
  upgradeDate: Yup.string().notRequired(),
  contractPeriod: Yup.string().notRequired(),
  contractStart: Yup.string()
  .notRequired()
  ,
  contractEnd: Yup.string()
    .notRequired()
    .test(
      "is-after-contractStart",
      "Contract End date must be after Contract Start date",
      function (value) {
        const { contractStart } = this.parent;
        if (!contractStart || !value) return true; // If either is missing, skip validation

        const contractStartDate = new Date(contractStart);
        const contractEndDate = new Date(value);

        return contractEndDate > contractStartDate; // Contract End must be after Contract Start
      }
    ),
  workStatus: Yup.string()
    .required("Employment Work Status is required")
    .notOneOf([""], "Employment Work Status is mandatory"),
    probationStart: Yup.string()
    .notRequired()
    .test(
      "is-on-or-after-doj-or-contract-start",
      "Probation Start date must be the same as or after Date of Joining ",
      function (value) {
        const { doj } = this.parent;
        if (!doj || !value) return true;
  
        const dojDate = new Date(doj);
        const probationStartDate = new Date(value);
        return probationStartDate >= dojDate;
      }
    ),
  probationEnd: Yup.string()
    .notRequired()
    .test(
      "is-after-probationStart",
      "Probation End date must be after Probation Start date",
      function (value) {
        const { probationStart } = this.parent;
        if (!probationStart || !value) return true; // If either is missing, skip validation

        const probationStartDate = new Date(probationStart);
        const probationEndDate = new Date(value);

        return probationEndDate > probationStartDate; // Contract End must be after Contract Start
      }
   ),
  probDuration: Yup.string().notRequired(),
  workHrs: Yup.string()
    .required("Normal Working Hours mandatory"),
  workWeek: Yup.string()
    .required("Normal Working Week mandatory"),
  workMonth: Yup.string()
    .required("Normal Working Month mandatory"),
  salaryType: Yup.string()
    .required("Type of Salary Pay is mandatory")
    .notOneOf([""], "Type of Salary Pay is mandatory"),
    pervAnnualLeaveBal: Yup.string().notRequired(),
  resignDate: Yup.string().notRequired(),
  termiDate: Yup.string().notRequired(),
  resignNotProb: Yup.string().notRequired(),
  otherResignNotProb: Yup.string().notRequired(),
  termiNotProb: Yup.string().notRequired(),
  otherTermiNotProb: Yup.string().notRequired(),
  resignNotConf: Yup.string().notRequired(),
  otherResignNotConf: Yup.string().notRequired(),
  termiNotConf: Yup.string().notRequired(),
  otherTermiNotConf: Yup.string().notRequired(),
  reasonResign: Yup.string().notRequired(),
  reasonTerminate: Yup.string().notRequired(),
  leavePass: Yup.string()
  .notRequired(),
  dateLeavePass: Yup.string()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),
  destinateLeavePass:Yup.string()
  .notRequired(),

  durLeavePass:Yup.string()
  .notRequired(),

  annualLeave: Yup.string()
  .notRequired(),


  annualLeaveDate:Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),
  sickLeave: Yup.string().notRequired(),
  sickLeaveDate: Yup.string().notRequired(),
  materLeave: Yup.string().notRequired(),
  paterLeave: Yup.string().notRequired(),
  mrageLeave: Yup.string().notRequired(),
  // compasLeave: Yup.string().notRequired(),
  WIProbation: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  WIResignation: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  WITermination: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  WILeaveEntitle: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  WIContract: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  positionRev: Yup.string().notRequired(),
  positionRevDate: Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),

  revSalary: Yup.string().notRequired(),
  revSalaryDate:Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),

  revLeavePass: Yup.string().notRequired(),
  revLeaveDate:Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),

  revAnnualLeave:Yup.string().notRequired(),

  revALD:Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),

  depEmp: Yup.string().notRequired(),
  depEmpDate: Yup.date()
  .nullable()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .notRequired(),

  remarkWI: Yup.string().notRequired(),
  uploadPR: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadSP: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadLP: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadAL: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  uploadDep: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf"].includes(value.type);
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
});

export const employeeInfoSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID Number is mandatory"),
  profilePhoto: Yup.string().required("Upload Photo is mandatory"),
  contractType: Yup.array()
    .of(Yup.string().required("Each Contract Type is mandatory"))
    .min(1, "At least one Contract Type is required")
    .required("Contract Type is mandatory"),

  empType: Yup.array()
    .of(Yup.string().required("Each Employee Type is mandatory"))
    .min(1, "At least one Employee Type is required")
    .required("Employee Type is mandatory"),

  name: Yup.string()
    .min(3, "Name must be at least 3 characters") // Minimum length check
    .matches(
      /[A-Za-z\s]/,
      "Name cannot contain numbers or special characters"
    ) // Regex to allow only letters and spaces
    .required("Name is mandatory"),
  gender: Yup.string().required("Gender is mandatory"),
  dob: Yup.string()
    .required("Date of Birth is mandatory")
    .test("age", "You must be at least 15 years old", (value) => {
      if (!value) return false; // Fails if value is not provided
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();
      return (
        age > 15 ||
        (age === 15 &&
          (monthDifference > 0 ||
            (monthDifference === 0 && dayDifference >= 0)))
      );
    }),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  officialEmail: Yup.string().email("Please enter a valid email").notRequired(),
  nationality: Yup.string().required("Nationality is mandatory"),
  otherNation: Yup.string().notRequired(),
  religion: Yup.string().required("Religion is mandatory"),
  marital: Yup.string().required("Marital status is mandatory"),
  race: Yup.string().required("Race is mandatory"),
  otherRace: Yup.string().notRequired(),
  bwnIcNo: Yup.string().notRequired(),
  bwnIcColour: Yup.string().notRequired(),
  bwnIcExpiry: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  myIcNo: Yup.string().notRequired(),
  ppNo: Yup.string().notRequired(),
  ppIssued: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test("is-not-future-date", "Future Date Not Allowed", function (value) {
      return !value || new Date(value) <= new Date();
    }),

  ppExpiry: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test("is-future-date", "Only Future Dates Allowed", function (value) {
      return !value || new Date(value) > new Date();
    }),
  ppDestinate: Yup.string().notRequired(),
  contactNo: Yup.string().required("Contact Number is mandatory"),
  permanentAddress: Yup.string().required("Address is mandatory"),
  empBadgeNo: Yup.string().required("Employee Badge Number is mandatory"),
  sapNo: Yup.string().notRequired(),
  nationalCat: Yup.string().required("National Category is mandatory"),
  ctryOfOrigin: Yup.string().required("Country of Origin is mandatory"),
  oCOfOrigin: Yup.string().notRequired(),
  educLevel: Yup.string().required("Education Level is mandatory"),
  aTQualify: Yup.string().required(
    "Academic / Technical qualification is mandatory"
  ),
  familyDetails: Yup.mixed().test(
    "is-valid-family-details",
    "Invalid family details",
    function (value) {
      const { path, createError } = this;
      const isValid = getFamilyDetailsValidationSchema(value);
      if (!isValid) {
        return createError({
          path,
          message: "Invalid family details format or content",
        });
      }
      return true;
    }
  ),
  inducBrief: Yup.string().required("Induction Briefing Date is mandatory"),
  inducBriefUp: Yup.string().notRequired(),
  preEmp: Yup.string().notRequired(),
  preEmpPeriod: Yup.string().notRequired(),
bankName:Yup.string().notRequired(),
bankAccNo:Yup.string().notRequired(),

  bwnUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  applicationUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  cvCertifyUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  loiUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  myIcUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  paafCvevUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  ppUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
  supportDocUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }

            // If value is a string, check if it's a valid URL
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
});



// Validation EmployeeInsuranceschema Schema using Yup
export const EmpInsuranceschema = Yup.object().shape({
  empID: Yup.string().required("Employee ID Number is mandatory"),
  empBadgeNo: Yup.string().required("Employee Badge is required"),
  name: Yup.string().required("Employee Name is required"),
  department: Yup.string().required("Department is required"),
    empInsUpload: Yup.array()
    .of(
      Yup.mixed()
      .test(
        "fileOrUrl", // Custom test name
        "Only PDF, image files, or valid URLs are allowed", // Custom error message
        (value) => {
          // If value is a file, check for valid file types
          if (value instanceof File) {
            return ["application/pdf", "image/jpeg", "image/png"].includes(
              value.type
            );
          }
          
          // If value is a string, check if it's a valid URL
          if (typeof value === "string") {
            return isValidUrl(value); // Check if the string is a valid URL
          }
          
            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
      )
      .notRequired(), // Top-level array is not required
    });
    
    export const DependentInsuranceSchema = Yup.object().shape({
      empID: Yup.string().required("Employee ID is required"),
      depInsurance: Yup.mixed().test(
        "is-valid-family-details",
        "Invalid family details",
        function (value) {
          const { path, createError } = this;
          const isValid = getDepInsuranceValidationSchema(value);
          if (!isValid) {
            return createError({
              path,
              message: "Invalid family details format or content",
            });
          }
          return true;
        }
      ),
    });

    export const AddInsuranceSchema = Yup.object().shape({
      typeIns: Yup.string().required("Type Insurance is required"),
      insDetails: Yup.array().of(
        Yup.object().shape({
          company: Yup.string().required("Insurance company is required"),
        })
      ),
    });
    
    // Yup InsuranceInfoSchema validation schema
  export const GroupHSSchema = Yup.object().shape({
      groupHSNo: Yup.string().required("Group HS Number is required"), // Adjusted to .notRequired() as per your initial code
      groupHSExp: Yup.string().notRequired(), // Adjusted to .notRequired() as per your initial code
      groupHSUpload: Yup.array()
      .of(
        Yup.mixed()
          .test(
            "fileOrUrl", // Custom test name
            "Only PDF or valid URLs are allowed", // Custom error message
            (value) => {
              // If value is a file, check for valid file types
              if (value instanceof File) {
                return ["application/pdf"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value); // Check if the string is a valid URL
              }
  
              return true; // Return true if neither a file nor a string (invalid type)
            }
          )
          .notRequired()
      )
      .notRequired(),
    });
  export const WorkmenCompSchema = Yup.object().shape({
      empStatusType: Yup.string().required("Employee Status Type is required"),
      workmenCompNo: Yup.string().notRequired(),
      workmenCompExp: Yup.string().notRequired(),
      workmenComUp: Yup.array()
      .of(
        Yup.mixed()
          .test(
            "fileOrUrl", // Custom test name
            "Only PDF or valid URLs are allowed", // Custom error message
            (value) => {
              // If value is a file, check for valid file types
              if (value instanceof File) {
                return ["application/pdf"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value); // Check if the string is a valid URL
              }
  
              return true; // Return true if neither a file nor a string (invalid type)
            }
          )
          .notRequired()
      )
      .notRequired(),
    });
  export const TravellingSchema = Yup.object().shape({
    travelNo: Yup.string().required("Travelling Number is required"),
    travelExp: Yup.string().notRequired(),
    travelUp: Yup.array()
      .of(
        Yup.mixed()
          .test(
            "fileOrUrl", // Custom test name
            "Only PDF or valid URLs are allowed", // Custom error message
            (value) => {
              // If value is a file, check for valid file types
              if (value instanceof File) {
                return ["application/pdf"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value); // Check if the string is a valid URL
              }
  
              return true; // Return true if neither a file nor a string (invalid type)
            }
          )
          .notRequired()
      )
      .notRequired(),
    });
 export const PersonalAcciSchema = Yup.object().shape({
  perAccNo: Yup.string().required("Personal Number is required"),
  perAccExp: Yup.string().notRequired(),
  perAccUp: Yup.array()
      .of(
        Yup.mixed()
          .test(
            "fileOrUrl", // Custom test name
            "Only PDF or valid URLs are allowed", // Custom error message
            (value) => {
              // If value is a file, check for valid file types
              if (value instanceof File) {
                return ["application/pdf"].includes(
                  value.type
                );
              }
              if (typeof value === "string") {
                return isValidUrl(value); // Check if the string is a valid URL
              }
  
              return true; // Return true if neither a file nor a string (invalid type)
            }
          )
          .notRequired()
      )
      .notRequired(),
    });

    export const ClaimInsuranceSchema = Yup.object().shape({
      empID: Yup.string().required("Employee ID is required"),
      insuranceClaims: Yup.mixed().test(
        "is-valid-family-details",
        "Invalid family details",
        function (value) {
          const { path, createError } = this;
          const isValid = getDepInsuranceValidationSchema(value);
          if (!isValid) {
            return createError({
              path,
              message: "Invalid family details format or content",
            });
          }
          return true;
        }
      ),
    });

export const SawpEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),
  sawpEmpLtrReq: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Requested Date is required")
    .test("is-not-future-date", "Future Date Not Allowed", (value) => {
      return !value || value <= new Date();
    }),

  sawpEmpLtrReci: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-requested-date",
      "Received Date cannot be before the Requested Date",
      function (value) {
        const { sawpEmpLtrReq } = this.parent;
        return !value || !sawpEmpLtrReq || value >= sawpEmpLtrReq;
      }
    ),

  sawpEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
});

export const DoeEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),
  doeEmpSubmit: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Submission Date is required")
    .test("is-not-future-date", "Future Date Not Allowed", function (value) {
      return !value || new Date(value) <= new Date();
    }),
  doeEmpApproval: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-submission-date",
      "Approval Date Must Be After Submitted Date",
      function (value) {
        const { doeEmpSubmit } = this.parent;
        return (
          !value || !doeEmpSubmit || new Date(value) >= new Date(doeEmpSubmit)
        );
      }
    ),
  doeEmpValid: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-approval-date",
      "Expiry Date Must Be After Approval Date",
      function (value) {
        const { doeEmpApproval } = this.parent;
        return (
          !value ||
          !doeEmpApproval ||
          new Date(value) >= new Date(doeEmpApproval)
        );
      }
    ),

  doeEmpRefNo: Yup.string().notRequired(),
  doeEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  // Yup.mixed()
  //   .notRequired() // File is optional
  //   .test("fileSize", "File must be between 7MB", (value) => {
  //     if (!value) return true; // No file selected, it's valid
  //     const fileSize = value.size; // File size in bytes
  //     return fileSize >= 1 * 1024 && fileSize <= 7 * 1024 * 1024; // 1KB to 10MB
  //   }),
});

export const NlmsEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is Required"),
  permitType: Yup.string().required("Permit Type Required"),
  nlmsEmpSubmit: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Submission Date is Required")
    .test(
      "is-not-future-date",
      "Future Date Not Allowed",
      (value) => !value || new Date(value) <= new Date()
    ),
  nlmsEmpSubmitRefNo: Yup.string().notRequired(),
  nlmsEmpApproval: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-submission",
      "Approval Date Must Be After Submitted Date",
      function (value) {
        const { nlmsEmpSubmit } = this.parent;
        return (
          !value || !nlmsEmpSubmit || new Date(value) >= new Date(nlmsEmpSubmit)
        );
      }
    ),
  nlmsRefNo: Yup.string().notRequired(),
  nlmsEmpValid: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-approval",
      "Expiry Date Must Be After Approval Date",
      function (value) {
        const { nlmsEmpApproval } = this.parent;
        return (
          !value ||
          !nlmsEmpApproval ||
          new Date(value) >= new Date(nlmsEmpApproval)
        );
      }
    ),
  nlmsEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl",
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value);
            }

            return true;
          }
        )
        .notRequired()
    )
    .notRequired(),
  // Yup.mixed()
  //   .notRequired() // File is optional
  //   .test("fileSize", "File must be between 7MB", (value) => {
  //     if (!value) return true; // No file selected, it's valid
  //     const fileSize = value.size; // File size in bytes
  //     return fileSize >= 1 * 1024 && fileSize <= 7 * 1024 * 1024; // 1KB to 10MB
  //   }),
});

export const BankEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),

  bankSubmit: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Submission Date is required")
    .test("is-not-future-date", "Future Date Not Allowed", function (value) {
      return !value || new Date(value) <= new Date();
    }),

  bankRece: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-submission-date",
      "Approval Date Must Be After Submission Date",
      function (value) {
        const { bankSubmit } = this.parent;
        return !value || !bankSubmit || new Date(value) >= new Date(bankSubmit);
      }
    ),
  bankRefNo: Yup.string().notRequired(),
  bankAmt: Yup.string().notRequired(),
  bankValid: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-approval-date",
      "Valid Until Date Must Be After Approval Date",
      function (value) {
        const { bankRece } = this.parent;
        return !value || !bankRece || new Date(value) >= new Date(bankRece);
      }
    ),

  bankEndorse: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-submission-date",
      "Endorsement Date must be after Submission Date",
      function (value) {
        const { bankSubmit } = this.parent;
        return !value || !bankSubmit || new Date(value) > new Date(bankSubmit);
      }
    ),
  bankEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl",
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value);
            }

            return true;
          }
        )
        .notRequired()
    )
    .notRequired(),
});

export const JitpaEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),

  tbaPurchase: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("TBA Purchase Date is required")
    .test(
      "is-not-future-date",
      "Future Date Not Allowed",
      (value) => !value || new Date(value) <= new Date()
    ),

  jitpaAmt: Yup.string().notRequired(),

  jpValid: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-not-past-date",
      "Valid Until Date must be in the future",
      (value) => !value || new Date(value) > new Date()
    ),

  jpEndorse: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test(
      "is-after-purchase-date",
      "Endorsement Date must be after TBA Purchase Date",
      function (value) {
        const { tbaPurchase } = this.parent;
        return (
          !value || !tbaPurchase || new Date(value) > new Date(tbaPurchase)
        );
      }
    ),

  jpEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
});

export const LabourDepositSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),
  lbrReceiptNo: Yup.string().required(
    "Labour Deposit Receipt Number is required"
  ),
  lbrDepoAmt: Yup.string()
    .required("Deposit Amount is required")
    .min(0, "Deposit Amount must be greater than or equal to 0"),
  lbrDepoSubmit: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Submit Date is required")
    .test("is-not-future-date", "Future Date Not Allowed", function (value) {
      return !value || new Date(value) <= new Date();
    }),
  lbrDepoUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),
});

export const ImmigEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),

  ppLocation: Yup.string()
    .oneOf(
      ["HRD", "Immigration", "Employee", "Vacation"],
      "Invalid passport location"
    )
    .required("Passport location is required"),

  arrivStampUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  immigEmpUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  reEntryUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
            if (typeof value === "string") {
              return isValidUrl(value); // Check if the string is a valid URL
            }

            return true; // Return true if neither a file nor a string (invalid type)
          }
        )
        .notRequired()
    )
    .notRequired(),

  arrivStampExp: Yup.string().notRequired(),
  immigRefNo: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  ppSubmit: Yup.string().notRequired(),
  empPassExp: Yup.string().notRequired(),
  empPassStatus: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  airTktStatus: Yup.string()
    .oneOf(["Company", "Own"], "Invalid air ticket status")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  reEntryVisa: Yup.string()
    .oneOf(["Single", "Multiple"], "Invalid re-entry visa type")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  immigApproval: Yup.string().notRequired(),
  reEntryVisaExp: Yup.string().notRequired(),
  remarkImmig: Yup.string()
    .max(500, "Remarks can't exceed 500 characters")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});
