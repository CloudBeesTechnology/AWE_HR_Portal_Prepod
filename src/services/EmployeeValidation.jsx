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
  accommodation: Yup.string().required("Accommodation is required"),
  accommodationAddress: Yup.string().required(
    "Accommodation Address is required"
  ),
});

export const LabourImmigrationSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID Number is mandatory"),
  overMD: Yup.date()
    .nullable() // Allows null or undefined values
    .notRequired() // Field is optional
    .test("is-past", "overMD must be a past date", function (value) {
      if (!value) return true; // Skip validation if the field is empty
      return new Date(value) < new Date(); // Check if the date is in the past
    }),

  overME: Yup.date()
    .nullable() // Allows null or undefined values
    .notRequired() // Field is optional
    .test("is-future", "overME must be a future date", function (value) {
      if (!value) return true; // Skip validation if the field is empty
      return new Date(value) > new Date(); // Check if the date is in the future
    }),
  bruhimsRD: Yup.string().notRequired(),
  bruhimsRNo: Yup.string().notRequired(),
  // bruneiMAD: Yup.array()
  // .of(
  //   Yup.string().test(
  //     "is-past-date",
  //     "Brunei Medical Appointment date must be in the past",
  //     (value) => {
  //       if (!value) return true; // Allow empty values
  //       const [day, month, year] = value.split("-");
  //       const issuedDate = new Date(`${year}-${month}-${day}`);
  //       const currentDate = new Date();
  //       return issuedDate < currentDate; // Check if issued date is in the past
  //     }
  //   )
  // )
  // .notRequired(),

  // bruneiME: Yup.array()
  // .of(
  //   Yup.string().test(
  //     "is-valid-date",
  //     "Expiry date must be in the future",
  //     (value) => {
  //       if (!value) return true; // Allow empty values
  //       const date = new Date(value);
  //       const currentDate = new Date();
  //       return date > currentDate;
  //     }
  //   )
  // )
  // .notRequired(),

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
  department: Yup.string().required("Department is mandatory"),
  otherDepartment: Yup.string().when("Department is mandatory", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Department is mandatory"),
    otherwise: () => Yup.string().notRequired(),
  }),
  position: Yup.string().required("Position is mandatory"),
  otherPosition: Yup.string().when("Position is mandatory", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Position is mandatory"),
    otherwise: () => Yup.string().notRequired(),
  }),
  jobCat: Yup.string().required("jobCategory is required"),
  otherJobCat: Yup.string().when("jobCategory is required", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other jobcat is required"),
    otherwise: () => Yup.string().notRequired(),
  }),
  doj: Yup.string()
    .required("Date of Join is required")
    .test("is-past-date", "Date of joining must be in the past", (value) => {
      if (!value) return true;
      const dojDate = new Date(value);
      const currentDate = new Date();
      return dojDate < currentDate;
    }),
  jobDesc: Yup.string().required("Job Description is required"),
  skillPool: Yup.string().required("Skill Pool is required"),
  relationship: Yup.string().required("Employee Status is required"),
  hr: Yup.string().notRequired(),
  manager: Yup.string().notRequired(),
  supervisor: Yup.string().notRequired(),
  upgradePosition: Yup.string().notRequired(),
  upgradeDate: Yup.string().notRequired(),
  contractPeriod: Yup.string().notRequired(),
  contractStart: Yup.string()
    .notRequired()
    .test(
      "is-after-doj",
      "Contract Start date must be after Date of Joining",
      function (value) {
        const { doj } = this.parent;
        if (!doj || !value) return true;

        const dojDate = new Date(doj);
        const contractStartDate = new Date(value);

        return contractStartDate > dojDate;
      }
    ),
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
      "is-after-doj",
      "Contract Start date must be after Date of Joining",
      function (value) {
        const { doj } = this.parent;
        if (!doj || !value) return true;
        const dojDate = new Date(doj);
        const contractStartDate = new Date(value);
        return contractStartDate > dojDate;
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
  workHrs: Yup.string().required("Normal Working Hours are required"),
  workWeek: Yup.string().required("Normal Working Week are required"),
  workMonth: Yup.string().required("Normal Working Month are required"),
  salaryType: Yup.string()
    .required("Type of Salary Pay is mandatory")
    .notOneOf([""], "Type of Salary Pay is mandatory"),

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
  leavePass: Yup.string().notRequired(),
  dateLeavePass: Yup.string().notRequired(),
  destinateLeavePass: Yup.string().notRequired(),
  durLeavePass: Yup.string().notRequired(),
  annualLeave: Yup.string().required("Annual Leave Entitlement Required"),
  annualLeaveDate: Yup.string().required("Annual Leave  Date is mandatory"),
  sickLeave: Yup.string().required("Sick Leave Entitlement Required"),
  sickLeaveDate: Yup.string().required("Sick Leave  Date is mandatory"),
  materLeave: Yup.string().notRequired(),
  materLeaveDate: Yup.string().notRequired(),
  paterLeave: Yup.string().notRequired(),
  paterLeaveDate: Yup.string().notRequired(),
  mrageLeave: Yup.string().notRequired(),
  mrageLeaveDate: Yup.string().notRequired(),
  compasLeave: Yup.string().notRequired(),
  compasLeaveDate: Yup.string().notRequired(),
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
  positionRevDate: Yup.string().notRequired(),
  revSalary: Yup.string().notRequired(),
  revSalaryDate: Yup.string().notRequired(),
  revLeavePass: Yup.string().notRequired(),
  revLeaveDate: Yup.string().notRequired(),
  revAnnualLeave: Yup.string().notRequired(),
  revALD: Yup.string().notRequired(),
  depEmp: Yup.string().notRequired(),
  depEmpDate: Yup.string().notRequired(),
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
  // My Command
  empID: Yup.string().required("Employee ID Number is mandatory"),
  profilePhoto: Yup.string().required("Upload Photo is mandatory"),

  // profilePhoto: Yup.mixed()
  //   .required("Upload Photo is mandatory")
  //   .test(
  //     "fileType",
  //     "Profile photo must be a JPG, PNG",
  //     (value) =>
  //       value
  //         ? typeof value === "string"
  //           ? /\.(jpg|jpeg|png|pdf)$/.test(value) || isValidUrl(value)
  //           : /\.(jpg|jpeg|png|pdf)$/.test(value.name)
  //         : false
  //   ),
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
  bwnIcExpiry: Yup.array()
    .of(
      Yup.string().test(
        "is-valid-date",
        "Expiry date must be in the future",
        (value) => {
          if (!value) return true; // Allow empty values
          const date = new Date(value);
          const currentDate = new Date();
          return date > currentDate;
        }
      )
    )
    .notRequired(),

  myIcNo: Yup.string().notRequired(),
  ppNo: Yup.string().notRequired(),
  ppIssued: Yup.array()
    .of(
      Yup.string().test(
        "is-past-date",
        "Issued date must be in the past",
        (value) => {
          if (!value) return true; // Allow empty values
          const [day, month, year] = value.split("-");
          const issuedDate = new Date(`${year}-${month}-${day}`);
          const currentDate = new Date();
          return issuedDate < currentDate; // Check if issued date is in the past
        }
      )
    )
    .notRequired(),

  ppExpiry: Yup.array()
    .of(
      Yup.string().test(
        "is-valid-date",
        "Expiry date must be in the future",
        (value) => {
          if (!value) return true; // Allow empty values
          const date = new Date(value);
          const currentDate = new Date();
          return date > currentDate;
        }
      )
    )
    .notRequired(),
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
  inducBriefUp: Yup.string().required("Induction Briefing Upload is mandatory"),

  preEmp: Yup.string().notRequired(),
  preEmpPeriod: Yup.string().notRequired(),
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

// Define the Insurance validation schema

export const AddInsuranceSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID Number is mandatory"),
  insuranceDetails: Yup.array().of(
    Yup.object().shape({
      typeInsurance: Yup.string().required("Insurance Type is required"),
      insuranceCompany: Yup.string().required("Insurance Company is required"),
    })
  ),
});

// Validation EmployeeInsuranceschema Schema using Yup
export const EmpInsuranceschema = Yup.object().shape({
  empBadgeNo: Yup.string().required("Employee Badge is required"),
  name: Yup.string().required("Employee Name is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position is required"),
  doj: Yup.string().required("Date of Joining is required"),
  gender: Yup.string().required("Gender is required"),
  bwnIcNo: Yup.string().required("Brunei I/C Number is required"),
  ppNo: Yup.string().required("Passport Number is required for non-locals"),
  dob: Yup.string().required("Date of Birth is required"),
  marital: Yup.string().required("Marital Status is required"),
  nationality: Yup.string().required("Nationality is required"),
  groupIns: Yup.string().required("Group Insurance is required"),
  groupInsEffectDate: Yup.string().required("Effective Date is required"),
  groupInsEndDate: Yup.string().required("End Date is required"),
  workmenComp: Yup.string().required(
    "Please Select Any Workmen Compensation Insurance"
  ),
  workmePolicyNo: Yup.string().notRequired(),
  travelIns: Yup.string().required("Personal Accident Insurance is required"),
  accidentIns: Yup.string().required("Personal Accident Insurance is required"),
  // empInsUpload: Yup.string().notRequired(),
  // empInsUpload: Yup.array().of(
  //   Yup.object().shape({
  //     fileName: Yup.string().required("File name is required"),
  //     url: Yup.string().url("Please enter a valid URL").notRequired(),
  //   })
  // ),
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

// Yup InsuranceInfoSchema validation schema
export const InsuranceInfoSchema = Yup.object().shape({
  groupHSNumber: Yup.string().required(
    "Group H&S Insurance Policy Number is required"
  ),
  groupHSExpiry: Yup.string().required(
    "Group H&S Insurance Policy Expiry is required"
  ),
  workmenCompNumber: Yup.string().required(
    "Workmen Compensation Insurance Number is required"
  ),
  workmenCompExpiry: Yup.string().required(
    "Workmen Compensation Insurance Expiry is required"
  ),
  travellingNumber: Yup.string().required(
    "Travelling Insurance Policy Number is required"
  ),
  travellingExpiry: Yup.string().required(
    "Travelling Insurance Policy Expiry is required"
  ),
  personalAccidentNumber: Yup.string().required(
    "Personal Accident Insurance Policy Number is required"
  ),
  personalAccidentExpiry: Yup.string().required(
    "Personal Accident Insurance Expiry is required"
  ),
  groupHSUpload: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
  workmenCompUpload: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
  travellingUpload: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
  personalAccidentUpload: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
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

export const ClaimInsuranceSchema = Yup.object().shape({
  claimType: Yup.string().required("Insurance claim type is required"),
  dateSubmitted: Yup.string().required("Please select a name for the claim"),
  dateReported: Yup.string().required(
    "Date reported to Insurance Company is required"
  ),
  paymentReceived: Yup.string().required(
    "Date of payment received from Insurance Company is required"
  ),
  datePaid: Yup.string().required("Date paid to Employee is required"),
  claimUpload: Yup.array()
    .of(
      Yup.mixed()
        .required("File is required")
        .test(
          "fileType",
          "Only PDF files are allowed",
          (value) => value && /\.(pdf)$/.test(value.name)
        )
    )
    .min(1, "At least one file is required"),
});

export const SawpEmpSchema = Yup.object().shape({
  empID: Yup.string().required("Employee ID is required"),

  sawpEmpLtrReq: Yup.array()
    .of(
      Yup.date()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .required("Requested Date is required")
        .test("is-not-future-date", "Future Date Not Allowed", (value) => {
          return !value || value <= new Date();
        })
    )
    .required("Requested Dates are required"),

  // Handle sawpEmpLtrReci as an array of dates, ensuring it's after the requested date
  sawpEmpLtrReci: Yup.array()
    .of(
      Yup.date()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .test(
          "is-after-requested-date",
          "Received Date cannot be before the Requested Date",
          function (value) {
            const { sawpEmpLtrReq } = this.parent;
            // Check if received date is after any of the requested dates
            return (
              !value ||
              !sawpEmpLtrReq ||
              sawpEmpLtrReq.every((reqDate) => value >= new Date(reqDate))
            );
          }
        )
    )
    .notRequired(),

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
