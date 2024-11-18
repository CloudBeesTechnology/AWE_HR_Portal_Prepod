import * as Yup from "yup";

// Define validation schema
export const CourceValidationSchema = Yup.object().shape({
  courceSelect: Yup.string().required("Course selection is required"),
  courseNameFields: Yup.array().of(Yup.string().required("Course name is required")),
  companyFields: Yup.array().of(Yup.string().required("Training company is required")),
});
  
  export const blastingPaintingValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    employeeBadgeNumber: Yup.string().required('Employee Badge Number is required'),
    department: Yup.string().required('Department is required'),
    blastingPaintingBadgeNumber: Yup.string().required('Blasting/Painting Badge Number is required'),
    blastingPaintingAssessmentStartDate: Yup.string().required('Assessment Start Date is required'),
    blastingPaintingAssessmentEndDate: Yup.string().required('Assessment End Date is required'),
    blastingPaintingQualificationExpiry: Yup.string().required('Qualification Expiry is required'),
    blastingUpload: Yup.mixed()
    .required("Upload is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
    employeeName: Yup.string().required('Employee Name is required'),
    position: Yup.string().required('Position is required'),
    blastingPaintingRemarks: Yup.string(),
  });

export const trainingCertificatesValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().required('Employee Badge Number is required'),
    department: Yup.string().notRequired(),
    courseCode: Yup.string().notRequired(),
    courseName: Yup.string().notRequired(),
    company: Yup.string().notRequired(),
    orgiCertifiDate: Yup.string().notRequired(),
    empName: Yup.string().notRequired(),
    eCertifiDate: Yup.string().notRequired(),
    certifiExpiry: Yup.string().notRequired(),
    trainingUpCertifi: Yup.mixed()
    .notRequired()
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && /\.(pdf)$/.test(value.name)
    ),
  });

  export const WeldingValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().required('Employee Badge Number is required'),
    department: Yup.string().required('Department is required'),
    weldingStampNo: Yup.string().required('Welding Stamp Number is required'),
    wpsNumber: Yup.string().required('WPS Number is required'),
    weldingProcess: Yup.string().required('Welding Process is required'),
    weldingPosition: Yup.string().required('Welding Position is required'),
    thicknessRange: Yup.string().required('Thickness Range is required'),
    WQExpiry: Yup.string().required('Welding Qualification Expiry is required'),
    weldingUpload:  Yup.mixed().notRequired(),
    empName: Yup.string().required('Employee Name is required'),
    position: Yup.string().required('Position is required'),
    WQRNo: Yup.string().required('WQR Number is required'),
    weldingCode: Yup.string().required('Welding Code is required'),
    weldingMaterial: Yup.string().required('Welding Material is required'),
    fillerMetal: Yup.string().required('Filler Metal is required'),
    diameterRange: Yup.string().required('Diameter Range is required'),
    WQRemarks:Yup.string().notRequired(),
  });

  // Define validation schema
export const TrainingValidationSchema = Yup.object().shape({
    empID: Yup.string().required('Employee ID is required'),
    empBadgeNo: Yup.string().required('Employee Badge Number is required'),
    empName: Yup.string().required('Employee Name is required'),
    department: Yup.string().required('Department is required'),
    traineeCourseCode: Yup.string().required('Training Course Code is required'),
    traineeCourseName: Yup.string().required('Training Course Name is required'),
    traineeCompany: Yup.string().required('Training Company is required'),
    traineeSD: Yup.string().required('Training Start Date is required'),
    traineeED: Yup.string().required('Training End Date is required'),
    traineeStatus: Yup.string().required('Training Status is required'),
    MRNo: Yup.string().required('MR Number is required'),
    purchaseONo: Yup.string().required('PO Number is required'),
    traineeCourseFee: Yup.string()
    .typeError("Training course fee must be a number")
    .required("Training course fee is required"),
    medicalName: Yup.string().notRequired(),
    medicalExpiry: Yup.string().notRequired(),
    medicalAppointDate: Yup.string().notRequired(),
    medicalReport: Yup.mixed()
    .notRequired()
      
  });