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
import { capitalizedLetter } from "../../../utils/DateFormat";

export const EmployeeInfo = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { SubmitEIData, errorEmpID } = EmpInfoFunc();
  const { UpdateEIValue } = UpdateEmpInfo();
  const { empPIData, IDData, dropDownVal } = useContext(DataSupply);

  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
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
  const handleRelegianChange = (e) => {
    setSelectedReligion(e.target.value);
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
  const watchedProfilePhoto = watch("profilePhoto" || "");

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
  }, [uploadedDocs, watchedProfilePhoto]);

  const getLastValue = (value, field) => {
    // Ensure value is always an array
    const arrayValue = Array.isArray(value) ? value : value ? [value] : []; // If it's not an array, wrap it in an array
    if (
      arrayValue[arrayValue?.length - 1] !== "LPA" &&
      arrayValue[arrayValue?.length - 1] !== "SAWP"
    ) {
      const changedValue = capitalizedLetter(
        arrayValue[arrayValue?.length - 1]
      );
      return [changedValue]; // Return last element of the array
    } else {
      return arrayValue;
    }
  };

  const getLastArrayValue = (value, field) => {
    // If the value is an array, get the last value
    const lastValue = Array.isArray(value) ? value[value.length - 1] : value;

    // Check if the value is a valid date string, and if so, format it
    if (isValidDate(lastValue)) {
      return formatDate(lastValue);
    }

    // If it's not a date, return the last value as it is (no capitalization)
    return lastValue;
  };

  // Utility function to check if a date is valid
  const isValidDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()); // Return true if the date is valid
  };
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const d = new Date(date);
    // Ensure the date is formatted as yyyy-MM-dd
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = d.getDate().toString().padStart(2, "0");

    // Return the formatted date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  };

  const preprocessJSONString = (str) => {
    try {
      let processedStr = str.replace(/=/g, ":");
      processedStr = processedStr.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
      processedStr = processedStr.replace(/:\s*([^"{[\]},]+)/g, ': "$1"');

      return processedStr;
    } catch (error) {
      console.error("Error processing string:", error);
      return str; // Return original string if there's an error
    }
  };

  const cleanFamilyDetailsString = (familyDetailsInput) => {
    try {
      let familyDetailsString = familyDetailsInput;
      if (typeof familyDetailsString === "object") {
        if (Array.isArray(familyDetailsString)) {
          familyDetailsString = JSON.stringify(familyDetailsString);
        } else {
          familyDetailsString = JSON.stringify([familyDetailsString]);
        }
      }

      let cleanedString = familyDetailsString.trim();

      if (cleanedString.startsWith('"') && cleanedString.endsWith('"')) {
        cleanedString = cleanedString.slice(1, -1); // Remove surrounding quotes
      }

      cleanedString = cleanedString.replace(/([a-zA-Z0-9_]+)(:)/g, '"$1"$2');

      cleanedString = cleanedString.replace(/"(?!\\)/g, '\\"'); // Escape any unescaped quotes
      cleanedString = cleanedString.replace(/\\/g, "");
      const capitalizeWords = (str) =>
        str
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

      // After cleaning, the string should be a valid JSON array
      if (cleanedString.startsWith("[") && cleanedString.endsWith("]")) {
        // If it's an array-like string, parse it directly
        return JSON.parse(cleanedString).map((item) => {
          if (typeof item === "string") {
            return capitalizeWords(item);
          }
          if (typeof item === "object") {
            return Object.fromEntries(
              Object.entries(item).map(([key, value]) => [
                key,
                typeof value === "string" ? capitalizeWords(value) : value,
              ])
            );
          }
          return item;
        });
      } else {
        // If it's not in array format, wrap it in an array and parse it
        const parsedItem = JSON.parse(cleanedString);
        if (typeof parsedItem === "string") {
          return [capitalizeWords(parsedItem)];
        }
        if (typeof parsedItem === "object") {
          return [
            Object.fromEntries(
              Object.entries(parsedItem).map(([key, value]) => [
                key,
                typeof value === "string" ? capitalizeWords(value) : value,
              ])
            ),
          ];
        }
        return [parsedItem];
      }
    } catch (error) {
      console.error("Error cleaning and parsing familyDetails:", error);
      return []; // Return empty array if parsing fails
    }
  };

  const searchResult = async (result) => {
    console.log("Result", result);

    const keysToSet = [
      "driveLic",
      "inducBrief",
      "myIcNo",
      "nationalCat",
      "otherNation",
      "otherRace",
      "otherReligion",
      "preEmp",
      "preEmpPeriod",
      "race",
      "religion",
      "age",
      "aTQualify",
      "alternateNo",
      "agent",
      "dob",
      "cob",
      "ctryOfOrigin",
      "chinese",
      "educLevel",
      "eduDetails",
      "empBadgeNo",
      "bankName",
      "bankAccNo",
      "lang",
      "marital",
      "name",
      "oCOfOrigin",
      "position",
      "sapNo",
      "bwnIcColour",
      "gender",
      "nationality",
    ];

    // Set values for other fields
    keysToSet.forEach((key) => {
      let valueToSet = result[key];
      if (valueToSet === undefined || valueToSet === null) {
        valueToSet = "";
      }
      if (typeof valueToSet === "string") {
        const storedValue = capitalizedLetter(valueToSet).trim();
        setValue(key, storedValue); // Set the trimmed value
      } else {
        // If it's not a string, just set the value as is (or handle as needed)
        setValue(key, valueToSet);
      }
    });
    const fieldValue = ["empID", "email", "officialEmail"];

    fieldValue.forEach((val) => {
      const data = result[val];
      setValue(val, typeof data === "string" ? data : "");
    });

    if (result.nationality === "BRUNEI PR") {
      setValue("nationality", "Brunei PR");
    }
    const fields = ["contractType", "empType"];
    fields.forEach((field) =>
      setValue(field, getLastValue(result[field], field))
    );

    const fieldsArray = ["bwnIcExpiry", "ppExpiry", "ppIssued"];
    fieldsArray.forEach((field) =>
      setValue(field, getLastArrayValue(result[field]))
    );

    const changeString = [
      "permanentAddress",
      "contactNo",
      "ppNo",
      "ppDestinate",
      "bwnIcNo",
    ];
    changeString.forEach((field) => {
      const value = result[field];
      if (Array.isArray(value)) {
        // Join the array into a string and capitalize the first letter of each word
        const stringValue = value
          .join(", ")
          .split(" ") // Split by spaces
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ) // Capitalize each word
          .join(" "); // Rejoin with spaces
        setValue(field, stringValue || "");
      } else if (typeof value === "string") {
        // Capitalize the first letter of each word for a string
        const stringValue = value
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        setValue(field, stringValue || "");
      } else {
        // Set the value directly if not an array or string
        setValue(field, value || "");
      }
    });

    // Handle familyDetails
    if (
      Array.isArray(result.familyDetails) &&
      result.familyDetails.length > 0
    ) {
      const cleanedFamilyDetails = cleanFamilyDetailsString(
        result?.familyDetails[0]
      );
      setFamilyData(cleanedFamilyDetails || []);
    } else {
      setFamilyData([]);
    }

    setValue("profilePhoto", result?.profilePhoto?.toString() || "");
    setValue("inducBriefUp", result?.inducBriefUp?.toString() || "");

    setUploadedDocs((prev) => ({
      profilePhoto: result.profilePhoto || "",
      inducBriefUp: result.inducBriefUp || "",
    }));
    // Handle file uploads and names
    if (result.inducBriefUp && result.inducBriefUp !== null) {
      setUploadedFileNames((prev) => ({
        ...prev,
        inducBriefUp: getFileName(result.inducBriefUp) || "",
      }));
    } else {
      // Clear the previous value if inducBriefUp is null
      setUploadedFileNames((prev) => ({
        ...prev,
        inducBriefUp: "",
      }));
    }

    const profilePhotoString = result?.profilePhoto;
    const linkToStorageFile = async (pathUrl) => {
      try {
        if (!pathUrl) {
          setPPLastUP(avatar);
        }

        if (pathUrl) {
          const result = await getUrl({ path: pathUrl });

          setPPLastUP(result.url?.toString());
        }
      } catch (err) {
        console.log("Error fetching file from storage:", err);
      }
    };
    linkToStorageFile(profilePhotoString);

    // Handle multiple file uploads
    const uploadFields = [
      "bwnUpload",
      "applicationUpload",
      "cvCertifyUpload",
      "loiUpload",
      "myIcUpload",
      "paafCvevUpload",
      "ppUpload",
      "supportDocUpload",
    ];

    uploadFields.forEach((field) => {
      const fieldData = result[field];
      if (!fieldData) {
        setValue(field, []); // Clear the field value
        setUploadedFiles((prev) => ({ ...prev, [field]: [] }));
        setUploadedFileNames((prev) => ({ ...prev, [field]: "" })); // Clear the file name
        return;
      }

      try {
        // Parse the field data
        const outerParsed = JSON.parse(fieldData);
        const parsedArray = Array.isArray(outerParsed)
          ? outerParsed
          : [outerParsed];

        const parsedFiles = parsedArray.map((item) => {
          if (typeof item === "string") {
            try {
              const validJSON = preprocessJSONString(item);
              return JSON.parse(validJSON);
            } catch {
              return item;
            }
          }
          return item;
        });

        // Get the last file name
        const lastFile = parsedFiles[parsedFiles.length - 1];
        const lastFileName = lastFile?.upload
          ? getFileName(lastFile.upload)
          : Array.isArray(lastFile) && lastFile[0]?.upload
          ? getFileName(lastFile[0].upload)
          : "";

        // Update state
        setValue(field, parsedFiles);
        setUploadedFiles((prev) => ({ ...prev, [field]: parsedFiles }));
        setUploadedFileNames((prev) => ({
          ...prev,
          [field]: lastFileName, // Assign the extracted file name
        }));
      } catch (error) {
        console.error(`Failed to parse ${field}:`, error);
      }
    });
  };

  const getFileName = (filePath) => {
    if (!filePath || typeof filePath !== "string") {
      return ""; // Return an empty string if the file path is invalid
    }
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  const onSubmit = async (data) => {
    data.contractType = contractTypes;
    data.empType = empTypes;
    // console.log(data);

    const formatDate = (date) =>
      date ? new Date(date).toLocaleDateString("en-CA") : null;

    const bwnIcExpiry = formatDate(data.bwnIcExpiry);
    const ppIssued = formatDate(data.ppIssued);
    const ppExpiry = formatDate(data.ppExpiry);

    const removeLeadingNulls = (array, newValue) => {
      const newArray = [...(array || []), newValue]; // Combine old array and new value
      let firstValidIndex = newArray.findIndex((item) => item !== null);
      if (firstValidIndex !== -1) {
        return newArray.map((item) => (item === null ? "N/A" : item));
      } else {
        return [];
      }
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
          email: data.email.trim().toLowerCase(),
          officialEmail: data.officialEmail.trim().toLowerCase(),
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
          email: data.email.trim().toLowerCase(),
          officialEmail: data.officialEmail.trim().toLowerCase(),
        };

        await SubmitEIData({ empValue });
        setShowTitle("Employee Personal Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        className=" flex flex-col justify-center"
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
          handleRelegianChange={handleRelegianChange}
          selectedRace={selectedRace}
          selectedReligion={selectedReligion}
          watch={watch}
          dropDownVal={dropDownVal}
        />
        {/* Row5 */}
        <RowFive
          register={register}
          errors={errors}
          dropDownVal={dropDownVal}
        />
        {/* Row6 */}
        <RowSix
          register={register}
          errors={errors}
          handleNationalityChange={handleNationalityChange}
          selectedNationality={selectedNationality}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          watch={watch}
          dropDownVal={dropDownVal}
        />
        {/* Row7 */}
        <RowSeven register={register} errors={errors} />
        {/* Row8 */}
        <RowEight register={register} errors={errors} />
        {/* Row9 */}
        <RowNine
          register={register}
          errors={errors}
          dropDownVal={dropDownVal}
        />
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
