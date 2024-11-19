import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Badge } from "@aws-amplify/ui-react";
import { UpdateEmpInfo } from "../../../services/updateMethod/UpdateEmpInfo";

export const EmployeeInfo = () => {
  const { SubmitEIData, errorEmpID } = EmpInfoFunc();
  const { UpdateEIValue } = UpdateEmpInfo();
  const { empPIData, IDData } = useContext(DataSupply);

  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);

  const [notification, setNotification] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
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
    defaultValues: {
      familyDetails: JSON.stringify([]),
    },
    resolver: yupResolver(employeeInfoSchema),
  });

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
    let selectedFile;
    let fileTypeValue;
    // Check if `e` is an event object or a file object
    if (e.target && e.target.files) {
      selectedFile = e.target.files[0];
      fileTypeValue = e.target.files[0];
    } else if (typeof e === "string") {
      // Check if the input is a URL (assuming e is a string)
      selectedFile = e;
    } else {
      selectedFile = e;
    }

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (typeof selectedFile === "string") {
      if (type === "profilePhoto") {
        setPPLastUP(selectedFile);
      } else if (type === "inducBriefUp") {
        setIBLastUP(selectedFile);
      }
    } else {
      // Validate file type
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
        return;
      }
    }


    setValue(type, selectedFile);

    if (fileTypeValue) {
      await uploadDocs(fileTypeValue, type, setUploadedDocs);

      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: fileTypeValue.name, // Dynamically store file name
      }));
    }
  };

  const handleFileChange = async (e, label) => {
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
      await uploadDocs(selectedFile, label, setUploadedFiles);
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
      (uploadedDocs?.profilePhoto && uploadedDocs.profilePhoto.length > 0) ||
      (uploadedDocs?.inducBriefUp && uploadedDocs.inducBriefUp.length > 0)
    ) {
      if (uploadedDocs.profilePhoto && uploadedDocs.profilePhoto.length > 0) {
        const lastUploadProf =
          uploadedDocs.profilePhoto[uploadedDocs.profilePhoto.length - 1]
            .upload;
        setPPLastUP(lastUploadProf);
      }

      if (uploadedDocs.inducBriefUp && uploadedDocs.inducBriefUp.length > 0) {
        const lastUploadInduc =
          uploadedDocs.inducBriefUp[uploadedDocs.inducBriefUp.length - 1]
            .upload;
        setIBLastUP(lastUploadInduc);
      }
    } else {
      console.log("No uploads found in profilePhoto or inducBriefUp");
    }
  }, [uploadedDocs]);

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    console.log(result);

    const keysToSet = [
      "empID",
      "driveLic",
      "inducBrief",
      "profilePhoto",
      "myIcNo",
      "nationality",
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
      "cob",
      "ctryOfOrigin",
      "chinese",
      "dob",
      "educLevel",
      "email",
      "eduDetails",
      "empBadgeNo",
      "empType",
      // "familyDetails",
      "gender",
      "lang",
      "marital",
      "name",
      "oCOfOrigin",
      "position",
      "sapNo",
    ];

    keysToSet.forEach((key) => {
      setValue(key, result[key]);
    });

    const fields = [
      "contactNo",
      "contractType",
      "empType",
      "bwnIcColour",
      "bwnIcExpiry",
      "bwnIcNo",
      "ppNo",
      "ppIssued",
      "ppExpiry",
      "ppDestinate",
      "permanentAddress",
    ];

    fields.forEach((field) => setValue(field, getLastValue(result[field])));
    const parsedData = JSON.parse(result.familyDetails);
    setFamilyData(parsedData);

    result.inducBriefUp &&
      setUploadedFileNames((prev) => ({
        ...prev,
        inducBriefUp: getFileName(result.inducBriefUp) || "",
      }));
    result.profilePhoto &&
      handleFileUpload(result.profilePhoto, "profilePhoto");
    result.inducBriefUp &&
      handleFileUpload(result.inducBriefUp, "inducBriefUp");

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

    uploadFields.map((field) => {
      if (result && result[field]) {
        try {
          // Parse the field data if it exists
          const parsedArray = JSON.parse(result[field]);

          // Then, parse each element inside the array (if it's stringified as well)
          const parsedFiles = parsedArray.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          );
          setValue(field, parsedFiles);

          setUploadedFiles((prev) => ({
            ...prev,
            [field]: parsedFiles, // Dynamically set based on field name
          }));

          setUploadedFileNames((prev) => ({
            ...prev,
            [field]:
              parsedFiles.length > 0
                ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                : "",
          }));
        } catch (error) {
          console.error(`Failed to parse ${field}:`, error);
        }
      }
    });
  };

  function getFileName(url) {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;

    const decodedUrl = decodeURIComponent(filePath);

    // Extract the file name after the last '/' in the path
    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  }
console.log(PPLastUP);

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const checkingPITable = empPIData.find(
        (match) => match.empID === data.empID
      );
      const checkingIDTable = IDData.find(
        (match) => match.empID === data.empID
      );
      if (checkingIDTable && checkingPITable) {
        const collectValue = {
          ...data,
          profilePhoto: PPLastUP,
          inducBriefUp: IBLastUP,
          bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
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
        console.log(collectValue);

        await UpdateEIValue({ collectValue });
        setShowTitle("Employee Personal Info updated successfully");
        setNotification(true);
      } else {
        const empValue = {
          ...data,
          profilePhoto: PPLastUP,
          inducBriefUp: IBLastUP,
          bwnUpload: JSON.stringify(uploadedFiles.bwnUpload),
          applicationUpload: JSON.stringify(uploadedFiles.applicationUpload),
          cvCertifyUpload: JSON.stringify(uploadedFiles.cvCertifyUpload),
          loiUpload: JSON.stringify(uploadedFiles.loiUpload),
          myIcUpload: JSON.stringify(uploadedFiles.myIcUpload),
          paafCvevUpload: JSON.stringify(uploadedFiles.paafCvevUpload),
          ppUpload: JSON.stringify(uploadedFiles.ppUpload),
          supportDocUpload: JSON.stringify(uploadedFiles.supportDocUpload),
          familyDetails: JSON.stringify(data.familyDetails),
        };
        // console.log(empValue);
        await SubmitEIData({ empValue });
        setShowTitle("Employee Personal Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Error submitting data to AWS:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  const watchedProfilePhoto = watch("profilePhoto" || "");
  const watchInducBriefUpload = watch("inducBriefUp" || "");

  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Employee Info
        </p>
        <div className="flex-1">
          <SearchDisplay
            searchResult={searchResult}
            newFormData={allEmpDetails}
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
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
              onChange={(e) => handleFileUpload(e, "profilePhoto")}
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
              {(PPLastUP ||
                watchedProfilePhoto) && (
                <div
                  className="absolute top-24 -right-3  bg-lite_grey p-[2px] rounded-full cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <IoCameraOutline className="w-6 h-6 p-1" />
                </div>
              )}
            </div>

            {/* Conditionally Render the "Choose Image" button */}
            {!PPLastUP &&
              !watchedProfilePhoto && (
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

            {!PPLastUP &&
              !watchedProfilePhoto &&
              errors.profilePhoto && (
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
        <RowTwo register={register} errors={errors} watch={watch} />

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
        <RowSeven
          register={register}
          errors={errors}
          // value={watch("bwnIcExpiry") || ""}
        />
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
            <h2 className="text_size_5 mb-2">Upload</h2>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              <input
                type="file"
                {...register("inducBriefUp")}
                onChange={(e) => handleFileUpload(e, "inducBriefUp")}
                className="hidden"
                accept=".pdf, .jpg, .jpeg, .png"
              />
              <span className="ml-2 flex p-1 gap-10">
                <GoUpload /> Induction Form
              </span>
            </label>
            {!uploadedFileNames?.inducBriefUp && !watchInducBriefUpload ? (
              <p className="text-[red] text-[13px] mt-1">
                {errors?.inducBriefUp?.message}
              </p>
            ) : (
              <p className="text-xs mt-1 text-grey">
                {uploadedFileNames?.inducBriefUp}
              </p>
            )}
          </div>
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
            path="/employee"
          />
        )}
      </form>
    </section>
  );
};
