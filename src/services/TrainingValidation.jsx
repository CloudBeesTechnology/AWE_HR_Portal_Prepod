import * as Yup from "yup";
import { isValidUrl } from "./ValidationFunc";

// Define validation schema
export const CourceValidationSchema = Yup.object().shape({
  courseSelect: Yup.string().required("Course selection is required"),
  courseName: Yup.array().of(Yup.string().notRequired()),
  company: Yup.array().of(Yup.string().notRequired()),
});
  
  export const blastingPaintingSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().notRequired(),
    department: Yup.string().notRequired(),
    blastingBadgeNo: Yup.string().required('Blasting/Painting Badge Number is required'),
    blastingStartDate: Yup.string().notRequired(),
    blastingEndDate: Yup.string().notRequired(),
    blastingQulifiExp: Yup.string().notRequired(),
    name: Yup.string().notRequired(),
    position: Yup.string().notRequired(),
    blastingRemarks: Yup.string().notRequired(),
    blastingUpload: Yup.array()
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

export const trainingCertificatesValidation = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().notRequired(),
    department: Yup.string().notRequired(),
    courseCode: Yup.string().notRequired(),
    courseName: Yup.string().notRequired(),
    company: Yup.string().notRequired(),
    orgiCertifiDate: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    name: Yup.string().notRequired(),
    eCertifiDate: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    certifiExpiry: Yup.string().required('Certifi Expiry is required').test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    trainingUpCertifi: Yup.array()
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

  export const WeldingValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().notRequired(),
    department: Yup.string().notRequired(),
    weldingStampNor: Yup.string().required('welding Stamp Number is required'),
    wpsNumber: Yup.string().notRequired(),
    weldingProcess: Yup.string().notRequired(),
    weldingPosition: Yup.string().notRequired(),
    thicknessRange: Yup.string().notRequired(),
    WQExpiry: Yup.string().notRequired(),
    name: Yup.string().notRequired(),
    position: Yup.string().notRequired(),
    WQRNo: Yup.string().notRequired(),
    weldingCode: Yup.string().notRequired(),
    weldingMaterial: Yup.string().notRequired(),
    fillerMetal: Yup.string().notRequired(),
    diameterRange: Yup.string().notRequired(),
    WQRemarks:Yup.string().notRequired(),
    weldingUpload: Yup.array()
    .of(
      Yup.mixed()
      .test(
        "fileOrUrl", // Custom test name
        "Only PDF, image files, or valid URLs are allowed", // Custom error message
        (value) => {
          // If value is a file, check for valid file types
          if (value instanceof File) {
            return ["application/pdf"].includes(
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

  // Define validation schema
export const TrainingValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().notRequired(),
    name: Yup.string().notRequired(),
    department: Yup.string().notRequired(),
    courseCode: Yup.string().required('Training Course Code is required'),
    courseName: Yup.string().notRequired(),
    company: Yup.string().notRequired(),
    traineeSD: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    traineeED: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    traineeStatus: Yup.string().notRequired(),
    MRNo: Yup.string().notRequired(),
    purchaseONo: Yup.string().notRequired(),
    traineeCourseFee: Yup.string().notRequired(),
    medicalName: Yup.string().notRequired(),
    medicalExpiry: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    medicalAppointDate: Yup.string().notRequired().test(
      'validDate',
      'Invalid date format or year must be a valid 4-digit year without leading zeros',
      (value) => {
        // If empty, it's valid because it's optional
        if (!value) return true;
  
        // Validate the date format YYYY-MM-DD (ISO format)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const match = value.match(regex);
  
        if (!match) return false; // Invalid format
  
        // Split the value into year, month, and day
        const [year, month, day] = value.split('-');
  
        // Validate that the year is exactly 4 digits
        if (year.length !== 4) return false;
  
        // Validate that the year doesn't start with '0' unless it's '0000'
        if (year.startsWith('0') && year !== '0000') return false;
  
        // Validate the month and day are valid
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
  
        // Check if the month is between 01 and 12 and the day is between 01 and 31
        if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;
  
        return true;
      }
    ),
    medicalReport: Yup.array()
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