import * as Yup from "yup";

export const LoginSchema = Yup.object({
  userID: Yup.string().required("UserID is mandatory"),
  password: Yup.string().required("Password is Required"),
});
export const newPasswordSchema = Yup.object({
  newPassword: Yup.string()
  .required("New Password is required")
  .min(8, "Password must be at least 8 characters"),
rePassword: Yup.string()
  .required("Please confirm your password")
  .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
export const EmailSchema = Yup.object({
  userName: Yup.string().required("User Name is mandatory"),

});

export const UserSchema = Yup.object({
  empID: Yup.string().required("Employee ID is required"),
  password: Yup.string().required("Temporary Password is required"),
  selectType: Yup.string().required("Please select a type"),
  officialEmail: Yup.string().required("OfficialEmail is required"),
  userID: Yup.string().required("User ID is mandatory"),
  name: Yup.string().required("Name is mandatory"),
  contactNo: Yup.string().required("Contact number is mandatory"),
  position: Yup.string().required("Position is mandatory"),
  department: Yup.string().required("Department is mandatory"),
});

export const ChangePasswordSchema = Yup.object({
  userID: Yup.string().required("User ID is mandatory"),
  currentPassword: Yup.string().required("Current Password is mandatory"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password cannot exceed 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const ApplicantSchema = Yup.object().shape({
  profilePhoto: Yup.mixed()
    .required("Upload Photo is mandatory")
    .test("fileType", "Profile photo must be a JPG or PNG file", (value) =>
      value ? /\.(jpg|jpeg|png)$/.test(value.name) : false
    ),
  agent: Yup.string().notRequired(),
  position: Yup.string().required("Position is mandatory"),
  contractType: Yup.string().required("Contract Type mandatory"),
  empType: Yup.string().required("Employee Type mandatory"),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is mandatory"),
  chinese: Yup.string().notRequired(),
  gender: Yup.string().required("Gender is mandatory"),
  // age: Yup.string().required("age is mandatory"),
  dob: Yup.string().required("Date of Birth is mandatory"),
  age: Yup.number()
    .min(20, "Age must be at least 20")
    .max(99, "Age cannot exceed 99")
    .required("Age is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  cob: Yup.string().required("Country of Birth is mandatory"),
  nationality: Yup.string().required("Nationality is mandatory"),
  otherNation: Yup.string().when("nationality", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Nationality is required"),
    otherwise: () => Yup.string(),
  }),
  marital: Yup.string().required("Marital status is mandatory"),
  race: Yup.string().required("Race is mandatory"),
  otherRace: Yup.string().when("race", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Race is required"),
    otherwise: () => Yup.string(),
  }),
  religion: Yup.string().required("Religion is mandatory"),
  otherReligion: Yup.string().when("religion", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other religion is required"),
    otherwise: () => Yup.string(),
  }),
});

export const PersonalSchema = (nationality) => {
  console.log(nationality);
  const isBruneian =
    nationality &&
    (nationality.trim().toLowerCase() === "bruneian" ||
      nationality.trim().toLowerCase() === "brunei pr");
  console.log(isBruneian);

  return Yup.object({
    bwnIcNo: isBruneian
      ? Yup.string()
          .matches(
            /^\d{2}-\d{6}$/,
            "I/C Number must be in the format XX-XXXXXX, where X is a digit"
          )
          .required("I/C Number is mandatory for Bruneians")
      : Yup.string().notRequired(),

    bwnIcColour: isBruneian
      ? Yup.string().required("I/C Colour is mandatory for Bruneians")
      : Yup.string().notRequired(),

    bwnIcExpiry: isBruneian
      ? Yup.string().required("I/C Expiry is mandatory for Bruneians")
      : Yup.string().notRequired(),
    ppNo: isBruneian
      ? Yup.string().notRequired()
      : Yup.string().required("Passport Number is mandatory"),

    ppIssued: isBruneian
      ? Yup.string().notRequired()
      : Yup.string().required("Passport issued is mandatory"),
    ppExpiry: isBruneian
      ? Yup.string().notRequired()
      : Yup.string().required("Passport Expiry is mandatory"),
    ppDestinate: isBruneian
      ? Yup.string().notRequired()
      : Yup.string().required("Passport destination is mandatory"),

    alternateNo: Yup.string().notRequired(),
    contactNo: Yup.string().required("Contact Number is mandatory"),
    presentAddress: Yup.string().required("Present Address is mandatory"),
    permanentAddress: Yup.string().required("Permanent Address is mandatory"),
    driveLic: Yup.string().notRequired(),
    lang: Yup.string().required("Language is mandatory"),
    familyDetails: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().notRequired(),
          relationship: Yup.string().notRequired(),
          age: Yup.string().notRequired(),
          occupation: Yup.string().notRequired(),
          place: Yup.string().notRequired(),
        })
      )
      .notRequired(),
    eduDetails: Yup.array()
      .of(
        Yup.object().shape({
          university: Yup.string().required("University Name is mandatory "),
          fromDate: Yup.string().required("From Date is mandatory"),
          toDate: Yup.string().required("To Date is mandatory"),
          degree: Yup.string().required("Degree is mandatory"),
        })
      )
      .required("At least one education detail is mandatory"),
    workExperience: Yup.array().of(
      Yup.object().shape({
        fromDate: Yup.string().notRequired(),
        toDate: Yup.string().notRequired(),
        companyAndAddress: Yup.string().notRequired(),
        position: Yup.string().notRequired(),
        salary: Yup.string().notRequired(),
        reasonLeaving: Yup.string().notRequired(),
      })
    ),
  });
};

export const EducationSchema = Yup.object({
  referees: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().notRequired(),
        address: Yup.string().notRequired(),
        phoneNumber: Yup.string().notRequired(),
        profession: Yup.string().notRequired(),
      })
    )
    .notRequired(),
  relatives: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().notRequired(),
        position: Yup.string().notRequired(),
        relationship: Yup.string().notRequired(),
      })
    )
    .notRequired(),
  description: Yup.string().notRequired(),
  emgDetails: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        relationship: Yup.string().required("Relationship is mandatory"),
        address: Yup.string().required("Address is mandatory"),
        phoneNumber: Yup.string().required("Phone Number is mandatory"),
        bloodGroup: Yup.string().notRequired(),
      })
    )
    .required("At least one emergency contact is mandatory"),
  disease: Yup.string().notRequired(),
  liquor: Yup.string().notRequired(),
  crime: Yup.string().notRequired(),
  diseaseDesc: Yup.string().when("disease", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  liquorDesc: Yup.string().when("liquor", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  crimeDesc: Yup.string().when("crime", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
});

export const CandidatesSchema = Yup.object().shape({
  salaryExpectation: Yup.string().notRequired(),
  noExperience: Yup.string().required("Experience is required"),
  noticePeriod: Yup.string().required("Notice period is required"),
  empStatement: Yup.string().required("Employee Statement is required"),
  perIS: Yup.string().required("Interview status is required"),
  perID: Yup.string().when("perInterviewStatus", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  supportInfo: Yup.string(),

  // File validation for resume (e.g., PDF, Word, Excel, or images)
  uploadResume: Yup.mixed()
    .required("Resume is required")
    .test(
      "fileType",
      "Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",
      (value) => {
        return (
          value &&
          [
            "application/pdf", // PDF
            "application/msword", // Word .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word .docx
            "application/vnd.ms-excel", // Excel .xls
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlsx
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/svg+xml", // Images
          ].includes(value.type)
        );
      }
    ),

  // File validation for certificate (e.g., PDF, Word, Excel, or images)
  uploadCertificate: Yup.mixed()
    .required("Certificate is required")
    .test(
      "fileType",
      "Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",
      (value) => {
        return (
          value &&
          [
            "application/pdf", // PDF
            "application/msword", // Word .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word .docx
            "application/vnd.ms-excel", // Excel .xls
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlsx
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/svg+xml", // Images
          ].includes(value.type)
        );
      }
    ),

  // File validation for passport (e.g., PDF, Word, Excel, or images)
  uploadPp: Yup.mixed()
    .required("Passport is required")
    .test(
      "fileType",
      "Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",
      (value) => {
        return (
          value &&
          [
            "application/pdf", // PDF
            "application/msword", // Word .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word .docx
            "application/vnd.ms-excel", // Excel .xls
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlsx
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/svg+xml", // Images
          ].includes(value.type)
        );
      }
    ),
});

// Define the validation schema using Yup
export const EmpRequisitionSchema = Yup.object().shape({
  nameReq: Yup.string().notRequired(),
  requestorID: Yup.string().notRequired(),
  approverID: Yup.string().notRequired(),
  department: Yup.string().required("Department is required"),
  project: Yup.string().required("Project is required"),
  position: Yup.string().required("Position is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
  reasonForReq: Yup.string().required("Reason for request is required"),
  justification: Yup.string().required("Justification is required"),
  replacementFor: Yup.string().notRequired(),
  qualification: Yup.string().required("State Qualification is required"),
  tentativeDate: Yup.date()
    .min(new Date(), "Tentative date must be in the future")
    .required("Tentative date is required")
    .typeError("Please enter a valid date"),
  status: Yup.string().notRequired(),
  remarkReq: Yup.string().notRequired(),
});


export const InterviewScheduleSchema = Yup.object().shape({
  interDate: Yup.date()
  .required("Date is required")
  .typeError("Date is required")
  .min(
    new Date(),
    "The selected date is in the past. Please choose a valid date."
  ),
  interTime: Yup.string()
  .required("Time is required")
  .matches(
    /^(0[8-9]|1[0-5]):([0-5]\d)$/,
    "Please choose a time between 8:00 AM and 4:00 PM."
  ),
  venue: Yup.string().required("Venue is required"),
  interType: Yup.string().notRequired(),
  empBadgeNo: Yup.string().notRequired("Badge Number is required"),
  manager:  Yup.string().notRequired("Manager is required"),
  message: Yup.string().optional(),
});

export const hiringJobSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  location: Yup.string().notRequired(),
  jobDesc: Yup.string().notRequired(),
  experience: Yup.string().required("Experience is required"),
  quantity: Yup.string().notRequired(),
  startDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  expiryDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired()
    .test("is-future-date", "Only Future Dates Allowed", function (value) {
      return !value || new Date(value) > new Date();
    }),
    uploadJobDetails:Yup.string().notRequired()
});

//WorkPass Tracking Forms Schema - Recruitment 
export const SawpFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  sawpLtrReq: Yup.date().notRequired(),
  sawpLtrRece: Yup.date().notRequired(),
  sawpFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const DoeFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  doeSubmit: Yup.date().notRequired(),
  doeApproval: Yup.date().notRequired(),
  doeValid: Yup.date().notRequired(),
  doeRefNo: Yup.string().notRequired(),
  doeFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const NlmsFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  nlmsSubmit: Yup.date().notRequired(),
  nlmsSubmitRefNo: Yup.string().notRequired(),
  nlmsApproval: Yup.date().notRequired(),
  nlmsValid: Yup.date().notRequired(),
  ldRefNo: Yup.string().notRequired(),
  nlmsFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const BankFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  bgSubmit: Yup.date().notRequired(),
  bgRece: Yup.date().notRequired(),
  bgValid: Yup.date().notRequired(),
  bgRefNo: Yup.string().notRequired(),
  bgAmount: Yup.string().notRequired(),
  bgFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const JitpaFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  jpTbaPurchase: Yup.date().notRequired(),
  jpEndorsement: Yup.date().notRequired(),
  jitpaValid: Yup.date().notRequired(),
  jpAmount: Yup.string().notRequired(),
  jitpaFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const LabourDepFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  labDepReceiptNo: Yup.string().notRequired(),
  labDepAmount: Yup.string().notRequired(),
  labEndrose: Yup.date().notRequired(),
  labDepFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const ImmigrationFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  immbdNo: Yup.string().notRequired(),
  docSubmit: Yup.date().notRequired(),
  visaApproval: Yup.date().notRequired(),
  visaRefNo: Yup.string().notRequired(),
  visaFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const AirTktFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  departure: Yup.date().notRequired(),
  arrival: Yup.date().notRequired(),
  cityName: Yup.string().notRequired(),
  airFare: Yup.string().notRequired(),
  airTktFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});
export const NonLocalMOBFormSchema = Yup.object().shape({
  tempID: Yup.string().required("Temporary ID is Required"),
  mobSignDate: Yup.date().notRequired(),
  agent: Yup.string().notRequired(),
  remarkNLMob: Yup.string().notRequired(),
  mobFile: Yup.mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});