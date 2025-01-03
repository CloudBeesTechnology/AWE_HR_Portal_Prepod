import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { employeeInfoSchema } from "../../../services/EmployeeValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import avatar from "../../../assets/navabar/avatar.jpeg";
import { IoCameraOutline } from "react-icons/io5";
import { SpinLogo } from "../../../utils/SpinLogo";
import { uploadFields } from "../../../utils/DropDownMenus";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { RowTwo } from "./RowTwo";
import { RowThree } from "./RowThree";
import { RowFour } from "./RowFour";
import { RowFive } from "./RowFive";
import { RowSix } from "./RowSix";
import { RowSeven } from "./RowSeven";
import { RowEight } from "./RowEight";
import { RowNine } from "./RowNine";
import { RowTen } from "./RowTen";
import { RowEleven } from "./RowEleven";
import { RowTwelve } from "./RowTwelve";
import { EmpInfoFunc } from "../../../services/createMethod/EmpInfoFunc";
import { FormField } from "../../../utils/FormField";
import { DataSupply } from "../../../utils/DataStoredContext";
import { UpdateEmpInfo } from "../../../services/updateMethod/UpdateEmpInfo";
import { getUrl } from "@aws-amplify/storage";
import { RowThirteen } from "./RowThirteen";

export const EmployeeInfo = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { SubmitEIData, errorEmpID } = EmpInfoFunc();
  const { UpdateEIValue } = UpdateEmpInfo();
  const { empPIData, IDData } = useContext(DataSupply);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [notification, setNotification] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    bwnUpload: [],
    applicationUpload: [],
    cvCertifyUpload: [],
    myIcUpload: [],
    paafCvevUpload: [],
    ppUpload: [],
    supportDocUpload: [],
    loiUpload: [],
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadProfilePhoto: null,
    inducBriefUp: null,
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    profilePhoto: null,
    inducBriefUp: null,
  });

  const [PPLastUP, setPPLastUP] = useState(null);

  const [IBLastUP, setIBLastUP] = useState(null);
  const [familyData, setFamilyData] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const handleNationalityChange = (e) => {
    setSelectedNationality(e.target.value);
  };
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeInfoSchema),
    mode: "onChange",
    defaultValues: {
      familyDetails: JSON.stringify([]),
      contractType: [],
      empType: [],
    },
  });


  
  const contractTypes = watch("contractType");
  const empTypes = watch("empType");
  const watchedEmpID = watch("empID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const IDDetails = IDData
              ? IDData.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...IDDetails,
            };
          })
          .filter(Boolean);
        // console.log(mergedData);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, IDData]);

  const handleFileUpload = async (e, type) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }

    let selectedFile = e.target.files[0];

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    setValue(type, selectedFile);

    if (selectedFile) {
      await uploadDocs(selectedFile, type, setUploadedDocs, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name, // Dynamically store file name
      }));
    }
  };

  const handleFileChange = async (e, label) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/employeeInfo";
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }
    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);
    try {
      // Dynamically set field based on label
      await uploadDocs(selectedFile, label, setUploadedFiles, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      uploadedDocs?.profilePhoto ||
      (uploadedDocs?.inducBriefUp && uploadedDocs.inducBriefUp.length > 0)
    ) {
      if (uploadedDocs.profilePhoto) {
        const lastUploadProf = uploadedDocs.profilePhoto;
        const linkToStorageFile = async (url) => {
          const result = await getUrl({
            path: url,
          });

          return setPPLastUP(result.url.toString());
        };
        linkToStorageFile(lastUploadProf);
      }

      if (uploadedDocs.inducBriefUp && uploadedDocs.inducBriefUp.length > 0) {
        const lastUploadInduc =
          uploadedDocs.inducBriefUp[uploadedDocs.inducBriefUp.length - 1]
            .upload;
        setIBLastUP(lastUploadInduc);
      }
    }
  }, [uploadedDocs]);

  const getLastValue = (value, field) => {
    if (field === "contractType" || field === "empType") {
      return value;
    }

    return Array.isArray(value) ? value : value ? [value] : [];
  };

  const getLastArrayValue = (value, field) => {
    // Check if the value is an array
    return Array.isArray(value) ? value[value.length - 1] : value;
  };

  const preprocessJSONString = (str) => {
    try {
      // Replace `=` with `:`
      let processedStr = str.replace(/=/g, ":");

      // Add quotes around keys
      processedStr = processedStr.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');

      // Add quotes around string values
      processedStr = processedStr.replace(/:\s*([^"{[\]},]+)/g, ': "$1"');

      return processedStr;
    } catch (error) {
      console.error("Error processing string:", error);
      return str; // Return original string if there's an error
    }
  };

  
  // const cleanFamilyDetailsString = (familyDetailsString) => {
  //   try {
  //     // Ensure it's a string before applying .trim() and other string methods
  //     if (typeof familyDetailsString !== 'string') {
  //       console.error("Expected a string, but got:", typeof familyDetailsString);
  //       return []; // Return empty array if the value is not a string
  //     }
  
  //     // Log the raw value to inspect the format
  //     console.log("Raw familyDetails:", familyDetailsString);
  
  //     // Remove the surrounding quotes if they exist
  //     let cleanedString = familyDetailsString.trim();
  
  //     if (cleanedString.startsWith('"') && cleanedString.endsWith('"')) {
  //       cleanedString = cleanedString.slice(1, -1); // Remove surrounding quotes
  //     }
  
  //     // Replace escaped quotes (e.g., \") with regular quotes (")
  //     cleanedString = cleanedString.replace(/\\"/g, '"');
  
  //     // Add double quotes around property names (e.g., name to "name")
  //     cleanedString = cleanedString.replace(/([a-zA-Z0-9_]+)(:)/g, '"$1"$2');
  
  //     // After cleaning, the string should be a valid JSON array
  //     if (cleanedString.startsWith("[") && cleanedString.endsWith("]")) {
  //       // If it's an array-like string, parse it directly
  //       return JSON.parse(cleanedString);
  //     } else {
  //       // If it's not in array format, wrap it in an array and parse it
  //       return [JSON.parse(cleanedString)];
  //     }
  //   } catch (error) {
  //     console.error("Error cleaning and parsing familyDetails:", error);
  //     return []; // Return empty array if parsing fails
  //   }
  // };
  const cleanFamilyDetailsString = (familyDetailsInput) => {
    try {
      // Check if it's already a string
      let familyDetailsString = familyDetailsInput;
  
      // If it's an object, convert it to a string
      if (typeof familyDetailsString === 'object') {
        // If it's an array, we join the array elements into a string
        if (Array.isArray(familyDetailsString)) {
          familyDetailsString = JSON.stringify(familyDetailsString);
        } else {
          // If it's an object, use JSON.stringify to convert it to a string
          familyDetailsString = JSON.stringify([familyDetailsString]);
        }
      }
  
      // Now we can safely apply string manipulations
      console.log("Raw familyDetails:", familyDetailsString);
  
      // Remove the surrounding quotes if they exist
      let cleanedString = familyDetailsString.trim();
  
      // Remove surrounding quotes (if any) after trimming
      if (cleanedString.startsWith('"') && cleanedString.endsWith('"')) {
        cleanedString = cleanedString.slice(1, -1); // Remove surrounding quotes
      }
  
      // Fix malformed JSON by ensuring property names are wrapped in double quotes
      cleanedString = cleanedString.replace(/([a-zA-Z0-9_]+)(:)/g, '"$1"$2');
  
      // Handle potential single quotes around values or unescaped characters
      cleanedString = cleanedString.replace(/"(?!\\)/g, '\\"'); // Escape any unescaped quotes
  
      // Handle special characters that might be causing issues (like '/')
      cleanedString = cleanedString.replace(/\\/g, "");
  
      // After cleaning, the string should be a valid JSON array
      if (cleanedString.startsWith("[") && cleanedString.endsWith("]")) {
        // If it's an array-like string, parse it directly
        return JSON.parse(cleanedString);
      } else {
        // If it's not in array format, wrap it in an array and parse it
        return [JSON.parse(cleanedString)];
      }
    } catch (error) {
      console.error("Error cleaning and parsing familyDetails:", error);
      return []; // Return empty array if parsing fails
    }
  };
  
  
const searchResult = async (result) => {
  console.log(result); // Log the result to check the fetched data

  // Map the gender to the correct value (Male, Female, or whatever the input value is)
  const genderValue = result.gender === "M" || result.gender === "Male" ? "MALE"
    : result.gender === "F" || result.gender === "Female" ? "FEMALE"
    : result.gender;

  console.log("Gender value being passed: ", genderValue); // Debugging log

  // Set the gender value in the form
  setValue("gender", genderValue);

  // Map the bwnIcColour to its respective value (Yellow, Red, Green, Purple)
  const bwnIcColourValue = result.bwnIcColour === "Y" || result.bwnIcColour ==="Yellow" ? "YELLOW"
    : result.bwnIcColour === "R" || result.bwnIcColour ==="Red" ? "RED"
    : result.bwnIcColour === "G" || result.bwnIcColour ==="Green"? "GREEN"
    : result.bwnIcColour === "P" || result.bwnIcColour ==="Purple"? "PURPLE"
    : result.bwnIcColour;
  setValue("bwnIcColour", bwnIcColourValue);

  const maritalValue = result.marital === "S" || result.marital ==="Single" ? "SINGLE"
    : result.marital === "M" || result.marital ==="Married" ? "MARRIED"
    : result.marital === "W" || result.marital ==="Widow"? "WIDOW"
    : result.marital === "D" || result.marital ==="Divorce"? "DIVORCE"
    : result.marital;
  setValue("marital", maritalValue);

  const keysToSet = [
    "empID", "driveLic", "inducBrief", "myIcNo", "nationality", "nationalCat", 
    "otherNation", "otherRace", "otherReligion", "preEmp", "preEmpPeriod", "race", 
    "religion", "age", "aTQualify", "alternateNo", "agent", "dob", "cob",
    "ctryOfOrigin", "chinese", "educLevel", "email", "eduDetails", "empBadgeNo", 
    "empType", "bankName", "bankAccNo", "lang", "marital", "name", "oCOfOrigin", 
    "position", "sapNo", "officialEmail", "bwnIcColour",
  ];

  // Set values for other fields
  keysToSet.forEach((key) => {
    // If the key is "gender" or "bwnIcColour", use the mapped value
    const valueToSet = key === "gender" ? genderValue
      : key === "bwnIcColour" ? bwnIcColourValue :  key === "marital" ? maritalValue
      : result[key];
    console.log(`Setting value for ${key}:`, valueToSet);
    setValue(key, valueToSet);
  });

  const fields = ["contractType", "empType"];
  fields.forEach((field) => setValue(field, getLastValue(result[field])));

  const fieldsArray = ["bwnIcExpiry", "ppExpiry", "ppIssued"];
  fieldsArray.forEach((field) => setValue(field, getLastArrayValue(result[field])));

  const changeString = ["permanentAddress", "contactNo", "ppNo", "ppDestinate", "bwnIcNo"];
  changeString.forEach((field) => {
    const value = result[field];
    if (Array.isArray(value)) {
      const stringValue = value.join(", ");
      console.log(`Setting ${field} as a string:`, stringValue);
      setValue(field, stringValue);
    } else {
      setValue(field, value);
    }
  });

  // Handle familyDetails
  if (Array.isArray(result.familyDetails) && result.familyDetails.length > 0) {
    const cleanedFamilyDetails = cleanFamilyDetailsString(result.familyDetails[0]);
    console.log('Family Details:', cleanedFamilyDetails);
    setFamilyData(cleanedFamilyDetails);
  } else {
    console.error("Invalid familyDetails format:", result.familyDetails);
    setFamilyData([]);
  }

  // Handle file uploads and names
  if (result.inducBriefUp) {
    setUploadedFileNames((prev) => ({
      ...prev,
      inducBriefUp: getFileName(result.inducBriefUp) || "",
    }));
  }

  setValue("profilePhoto", result?.profilePhoto?.toString());
  setValue("inducBriefUp", result?.inducBriefUp?.toString());
  setUploadedDocs((prev) => ({
    profilePhoto: result.profilePhoto,
    inducBriefUp: result.inducBriefUp,
  }));

  const profilePhotoString = result?.profilePhoto;
  const linkToStorageFile = async (pathUrl) => {
    try {
      if (pathUrl) {
        const result = await getUrl({ path: pathUrl });
        setPPLastUP(result.url.toString());
      } else {
        console.log("No valid path provided for getUrl.");
      }
    } catch (err) {
      console.log("Error fetching file from storage:", err);
    }
  };
  linkToStorageFile(profilePhotoString);

  // Handle multiple file uploads
  const uploadFields = [
    "bwnUpload", "applicationUpload", "cvCertifyUpload", "loiUpload", "myIcUpload",
    "paafCvevUpload", "ppUpload", "supportDocUpload"
  ];

  uploadFields.map((field) => {
    if (result && result[field]) {
      try {
        const outerParsed = JSON.parse(result[field]);
        const parsedArray = Array.isArray(outerParsed) ? outerParsed : [outerParsed];

        const parsedFiles = parsedArray.map((item) => {
          if (typeof item === "string") {
            try {
              const validJSON = preprocessJSONString(item);
              return JSON.parse(validJSON);
            } catch (e) {
              return item;
            }
          }
          return item;
        });

        const lastFile = parsedFiles[parsedFiles.length - 1];
        const lastFileName = lastFile?.upload
          ? getFileName(lastFile.upload)
          : lastFile[0]?.upload
          ? getFileName(lastFile[0].upload)
          : null;

        setValue(field, parsedFiles);
        setUploadedFiles((prev) => ({ ...prev, [field]: parsedFiles }));
        setUploadedFileNames((prev) => ({ ...prev, [field]: lastFileName || "" }));
      } catch (error) {
        console.error(`Failed to parse ${field}:`, error);
      }
    }
  });
};


  const getFileName = (filePath) => {
    if (!filePath || typeof filePath !== "string") {
      console.error("Invalid file path:", filePath); // Log error for debugging
      return ""; // Return an empty string if the file path is invalid
    }
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  // const onSubmit = async (data) => {
  //   // console.log(data);
  //   data.contractType = contractTypes;
  //   data.empType = empTypes;

  //   const formatDate = (date) =>
  //     date ? new Date(date).toLocaleDateString("en-CA") : null;

  //   const bwnIcExpiry = formatDate(data.bwnIcExpiry);
  //   const ppIssued = formatDate(data.ppIssued);
  //   const ppExpiry = formatDate(data.ppExpiry);

  //   try {
  //     const checkingPITable = empPIData.find(
  //       (match) => match.empID === data.empID
  //     );
  //     const checkingIDTable = IDData.find(
  //       (match) => match.empID === data.empID
  //     );

  //     if (checkingIDTable && checkingPITable) {
  //       const updateFieldArray = (existingArray, newValue) => [
  //         ...new Set([...(existingArray || []), newValue]),
  //       ];

  //       const updatedbwnIcExpiry = updateFieldArray(
  //         checkingIDTable.bwnIcExpiry,
  //         bwnIcExpiry
  //       );
  //       const updatedppExpiry = updateFieldArray(
  //         checkingIDTable.ppExpiry,
  //         ppExpiry
  //       );
  //       const updatedppIssued = updateFieldArray(
  //         checkingIDTable.ppIssued,
  //         ppIssued
  //       );

  //       const collectValue = {
  //         ...data,
  //         profilePhoto: uploadedDocs.profilePhoto,
  //         inducBriefUp: uploadedDocs.inducBriefUp,
  //         bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
  //         bwnIcExpiry: updatedbwnIcExpiry,
  //         ppIssued: updatedppIssued,
  //         ppExpiry: updatedppExpiry,
  //         applicationUpload: JSON.stringify(uploadedFiles.applicationUpload),
  //         cvCertifyUpload: JSON.stringify(uploadedFiles.cvCertifyUpload),
  //         loiUpload: JSON.stringify(uploadedFiles.loiUpload),
  //         myIcUpload: JSON.stringify(uploadedFiles.myIcUpload),
  //         paafCvevUpload: JSON.stringify(uploadedFiles.paafCvevUpload),
  //         ppUpload: JSON.stringify(uploadedFiles.ppUpload),
  //         supportDocUpload: JSON.stringify(uploadedFiles.supportDocUpload),
  //         familyDetails: JSON.stringify(data.familyDetails),
  //         PITableID: checkingPITable.id,
  //         IDTable: checkingIDTable.id,
  //       };
  //       // console.log("AZQ Update", collectValue);

  //       await UpdateEIValue({ collectValue });
  //       setShowTitle("Employee Personal Info updated successfully");
  //       setNotification(true);
  //     } else {
  //       const [updatedbwnIcExpiry, updatedppExpiry, updatedppIssued] = [
  //         [bwnIcExpiry],
  //         [ppExpiry],
  //         [ppIssued],
  //       ].map((arr) => [...new Set(arr)]);

  //       const empValue = {
  //         ...data,
  //         profilePhoto: uploadedDocs.profilePhoto,
  //         inducBriefUp: uploadedDocs.inducBriefUp,
  //         bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
  //         bwnIcExpiry: updatedbwnIcExpiry,
  //         ppIssued: updatedppIssued,
  //         ppExpiry: updatedppExpiry,
  //         applicationUpload: JSON.stringify(uploadedFiles.applicationUpload),
  //         cvCertifyUpload: JSON.stringify(uploadedFiles.cvCertifyUpload),
  //         loiUpload: JSON.stringify(uploadedFiles.loiUpload),
  //         myIcUpload: JSON.stringify(uploadedFiles.myIcUpload),
  //         paafCvevUpload: JSON.stringify(uploadedFiles.paafCvevUpload),
  //         ppUpload: JSON.stringify(uploadedFiles.ppUpload),
  //         supportDocUpload: JSON.stringify(uploadedFiles.supportDocUpload),
  //         familyDetails: JSON.stringify(data.familyDetails),
  //       };
  //       // console.log("AZ", empValue);
  //       await SubmitEIData({ empValue });
  //       setShowTitle("Employee Personal Info saved successfully");
  //       setNotification(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const onSubmit = async (data) => {
    data.contractType = contractTypes;
    data.empType = empTypes;
  
    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : null;
  
    const bwnIcExpiry = formatDate(data.bwnIcExpiry);
    const ppIssued = formatDate(data.ppIssued);
    const ppExpiry = formatDate(data.ppExpiry);
  
    const removeLeadingNulls = (array, newValue) => {
      const newArray = [...(array || []), newValue]; // Combine old array and new value
      let firstValidIndex = newArray.findIndex((item) => item !== null);
      return firstValidIndex !== -1 ? newArray.slice(firstValidIndex) : []; // Remove leading nulls
    };
  
    try {
      const checkingPITable = empPIData.find(
        (match) => match.empID === data.empID
      );
      const checkingIDTable = IDData.find(
        (match) => match.empID === data.empID
      );
  
      if (checkingIDTable && checkingPITable) {
        const updatedbwnIcExpiry = removeLeadingNulls(
          checkingIDTable.bwnIcExpiry,
          bwnIcExpiry
        );
        const updatedppExpiry = removeLeadingNulls(
          checkingIDTable.ppExpiry,
          ppExpiry
        );
        const updatedppIssued = removeLeadingNulls(
          checkingIDTable.ppIssued,
          ppIssued
        );
  
        const collectValue = {
          ...data,
          profilePhoto: uploadedDocs.profilePhoto,
          inducBriefUp: uploadedDocs.inducBriefUp,
          bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
          bwnIcExpiry: updatedbwnIcExpiry,
          ppIssued: updatedppIssued,
          ppExpiry: updatedppExpiry,
          applicationUpload: JSON.stringify(uploadedFiles.applicationUpload),
          cvCertifyUpload: JSON.stringify(uploadedFiles.cvCertifyUpload),
          loiUpload: JSON.stringify(uploadedFiles.loiUpload),
          myIcUpload: JSON.stringify(uploadedFiles.myIcUpload),
          paafCvevUpload: JSON.stringify(uploadedFiles.paafCvevUpload),
          ppUpload: JSON.stringify(uploadedFiles.ppUpload),
          supportDocUpload: JSON.stringify(uploadedFiles.supportDocUpload),
          familyDetails: JSON.stringify(data.familyDetails),
          PITableID: checkingPITable.id,
          IDTable: checkingIDTable.id,
        };
  
        await UpdateEIValue({ collectValue });
        setShowTitle("Employee Personal Info updated successfully");
        setNotification(true);
      } else {
        const updatedbwnIcExpiry = removeLeadingNulls([], bwnIcExpiry);
        const updatedppExpiry = removeLeadingNulls([], ppExpiry);
        const updatedppIssued = removeLeadingNulls([], ppIssued);
  
        const empValue = {
          ...data,
          profilePhoto: uploadedDocs.profilePhoto,
          inducBriefUp: uploadedDocs.inducBriefUp,
          bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
          bwnIcExpiry: updatedbwnIcExpiry,
          ppIssued: updatedppIssued,
          ppExpiry: updatedppExpiry,
          applicationUpload: JSON.stringify(uploadedFiles.applicationUpload),
          cvCertifyUpload: JSON.stringify(uploadedFiles.cvCertifyUpload),
          loiUpload: JSON.stringify(uploadedFiles.loiUpload),
          myIcUpload: JSON.stringify(uploadedFiles.myIcUpload),
          paafCvevUpload: JSON.stringify(uploadedFiles.paafCvevUpload),
          ppUpload: JSON.stringify(uploadedFiles.ppUpload),
          supportDocUpload: JSON.stringify(uploadedFiles.supportDocUpload),
          familyDetails: JSON.stringify(data.familyDetails),
        };
  
        await SubmitEIData({ empValue });
        setShowTitle("Employee Personal Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const watchedProfilePhoto = watch("profilePhoto" || "");

  return (
    <section
      className="bg-[#F5F6F1CC] mx-auto p-10"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <h5 className="flex-1 text-center mt-2 text_size_2 uppercase">
          Employee Info
        </h5>
        <div className="flex-1">
          <SearchDisplay
            searchResult={searchResult}
            newFormData={allEmpDetails}
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
            filteredEmployees={filteredEmployees}
            setFilteredEmployees={setFilteredEmployees}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center "
      >
        {/* Row1 */}
        <div className="flex justify-between items-center py-7 mt-2">
          {/* Upload Image Section */}

          <div className="py-2 center flex-col max-w-[160px]">
            <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                handleFileUpload(e, "profilePhoto");
              }}
              className="hidden"
            />
            <div className="h-[120px] max-w-[120px] relative rounded-md bg-lite_skyBlue">
              <img
                src={
                  PPLastUP instanceof File
                    ? URL.createObjectURL(PPLastUP)
                    : typeof PPLastUP === "string" && PPLastUP
                    ? PPLastUP
                    : watchedProfilePhoto
                    ? watchedProfilePhoto
                    : PPLastUP
                    ? PPLastUP
                    : avatar
                }
                id="previewImg"
                alt="profile"
                className="object-cover w-full h-full"
                onError={(e) => (e.target.src = avatar)}
              />
              {(PPLastUP || watchedProfilePhoto) && (
                <div
                  className="absolute top-24 -right-3  bg-lite_grey p-[2px] rounded-full cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <IoCameraOutline className="w-6 h-6 p-1" />
                </div>
              )}
            </div>

            {/* Conditionally Render the "Choose Image" button */}
            {!PPLastUP && !watchedProfilePhoto && (
              <div className="mt-1 rounded-lg text-center">
                <button
                  type="button"
                  className="text_size_6"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Choose Image
                </button>
              </div>
            )}

            {!PPLastUP && !watchedProfilePhoto && errors.profilePhoto && (
              <p className="text-[red] text-[13px] text-center">
                {errors?.profilePhoto?.message}
              </p>
            )}
          </div>
          <div className="max-w-sm">
            <FormField
              label="Employee ID"
              register={register}
              name="empID"
              type="text"
              value={watch("empID") || ""}
              placeholder="Enter Employee ID"
              errors={errors}
            />
            {errorEmpID && (
              <p className="text-[red] text-[13px] text-center">{errorEmpID}</p>
            )}
          </div>
        </div>
        {/* Row2 */}
        <RowTwo
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          control={control}
        />

        {/* Row3 */}
        <RowThree register={register} errors={errors} />
        {/* Row4 */}
        <RowFour
          register={register}
          errors={errors}
          handleRaceChange={handleRaceChange}
          selectedRace={selectedRace}
          watch={watch}
        />
        {/* Row5 */}
        <RowFive register={register} errors={errors} />
        {/* Row6 */}
        <RowSix
          register={register}
          errors={errors}
          handleNationalityChange={handleNationalityChange}
          selectedNationality={selectedNationality}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          watch={watch}
        />
        {/* Row7 */}
        <RowSeven register={register} errors={errors} />
        {/* Row8 */}
        <RowEight register={register} errors={errors} />
        {/* Row9 */}
        <RowNine register={register} errors={errors} />
        {/* Row10 */}
        <RowTen register={register} errors={errors} />
        {/* Row11 */}
        <RowEleven
          register={register}
          errors={errors}
          control={control}
          watch={watch}
          setValue={setValue}
          value={familyData}
        />
        {/* Row12 */}
        <div className="grid grid-cols-2 gap-5 form-group mt-2">
          <RowTwelve register={register} errors={errors} />

          <div>
            <h2 className="text_size_5 mb-2">Upload Induction Form</h2>
            <label className="flex items-center px-3 py-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              <input
                type="file"
                {...register("inducBriefUp")}
                onChange={(e) => handleFileUpload(e, "inducBriefUp")}
                className="hidden"
                accept=".pdf, .jpg, .jpeg, .png"
              />
              <span className="ml-2 flex p-1 text-grey gap-10">
                <GoUpload /> Induction Form
              </span>
            </label>

            <p className="text-xs mt-1 text-grey">
              {uploadedFileNames?.inducBriefUp}
            </p>
          </div>
          <RowThirteen register={register} errors={errors} />
        </div>

        <div className="grid grid-cols-4 gap-5 form-group mt-5">
          {uploadFields.map((field, index) => (
            <Controller
              key={index}
              name={field.title}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="form-group">
                  <h2 className="text_size_5">Upload {field.label}</h2>
                  <label className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,image/jpeg,image/png"
                      onChange={(e) => handleFileChange(e, field.title)} // Pass field label for dynamic handling
                    />
                    <span className="ml-2 text-grey font-normal flex justify-between items-center gap-10">
                      {field.icon}
                      {field.label}
                    </span>
                  </label>
                  <p className="text-xs mt-1 text-grey">
                    {uploadedFileNames?.[field.title] || ""}
                  </p>
                  {/* Display validation error if any */}
                  {errors[field.title] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.title].message}
                    </p>
                  )}
                </div>
              )}
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center items-center mt-7 ">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/employeeInfo"
          />
        )}
      </form>
    </section>
  );
};
