import * as Yup from "yup";
export const isValidUrl = (url) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return urlPattern.test(url);
};

export const familyDetailsSchema = Yup.object().shape({
  name: Yup.string().required("Name is mandatory"),
  relationship: Yup.string().required("Relationship is mandatory"),
  contact: Yup.string().required("Contact Number is mandatory"),
  address: Yup.string().required("Address is mandatory"),
});

// Modify the validation schema for familyDetails
export const getFamilyDetailsValidationSchema = (value) => {
  return Yup.mixed().test(
    "is-valid-family-details",
    "Invalid family details",
    (valueToTest) => {
      if (typeof valueToTest === "string") {
        // If it's a string (JSON string), validate that it's a valid JSON array and contains family details
        try {
          const parsed = JSON.parse(valueToTest);
          if (Array.isArray(parsed)) {
            return parsed.every((item) =>
              familyDetailsSchema.isValidSync(item)
            );
          }
          return false;
        } catch (e) {
          return false;
        }
      } else if (Array.isArray(valueToTest)) {
        // If it's already an array, validate it directly using familyDetailsSchema
        return Yup.array().of(familyDetailsSchema).isValidSync(valueToTest);
      }
      return false;
    }
  );
};

export const depInsuranceSchema = Yup.object().shape({
  depenInsType: Yup.string().required("Insurance type is required"),
  depenInfo: Yup.string().required("Dependent information is required"),
  depenName: Yup.string().required("Name is required"),
  depenRelation: Yup.string().required("Relationship is required"),
  depenGender: Yup.string().required("Gender is required"),
  depenIcNumber: Yup.string().notRequired(),
  depenDob: Yup.string().required("Date of Birth is required"),
  depenNation: Yup.string().required("Nationality is required"),
  depenPpNo: Yup.string().notRequired(),
  depenBcNo: Yup.string().required(
    "Birth Certificate number is required for non-locals"
  ),
  depenGroupInsEffect: Yup.string().notRequired().test(
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
  depenGroupInsEnd: Yup.string().notRequired().test(
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
  depenTravelInsEffect: Yup.string().notRequired().test(
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
  depenTravelInsEnd: Yup.string().notRequired().test(
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
  depenPersonInsEffect: Yup.string().notRequired().test(
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
  depenPersonInsEnd: Yup.string().notRequired().test(
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
  depenotherNation: Yup.string().when("depenNation", {
    is: "Other", // When `depenNation` equals "Other"
    then: Yup.string().required("Other nationality is required"), // Make it required
    otherwise: Yup.string().notRequired(), // Otherwise, it's not required
  }),

  depenInfUpload: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileOrUrl", // Custom test name
          "Only PDF, image files, or valid URLs are allowed", // Custom error message
          (value) => {
            // If value is a file, check for valid file types
            if (value instanceof File) {
              return ["application/pdf", "image/jpeg","image/jpg", "image/png"].includes(
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

// Modify the validation schema for familyDetails

export const getDepInsuranceValidationSchema = (value) => {
  return Yup.mixed().test(
    "is-valid-family-details",
    "Invalid family details",
    (valueToTest) => {
      if (typeof valueToTest === "string") {
        // If it's a string (JSON string), validate that it's a valid JSON array and contains family details
        try {
          const parsed = JSON.parse(valueToTest);
          if (Array.isArray(parsed)) {
            return parsed.every((item) => depInsuranceSchema.isValidSync(item));
          }
          return false;
        } catch (e) {
          return false;
        }
      } else if (Array.isArray(valueToTest)) {
        // If it's already an array, validate it directly using familyDetailsSchema
        return Yup.array().of(familyDetailsSchema).isValidSync(valueToTest);
      }
      return false;
    }
  );
};

export const dateStringSchema = Yup.string()
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    "Date must be in the format dd-mm-yyyy"
  )
  .notRequired() // If the field is optional
  .test("is-valid-date", "Invalid date format", (value) => {
    if (!value) return true; // Allow empty values
    const [day, month, year] = value.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return !isNaN(date.getTime()); // Check if it's a valid date
  });
