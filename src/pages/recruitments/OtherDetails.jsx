import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesSchema } from "../../services/Validation";
import { generateClient } from "aws-amplify/api";
import { useLocation } from "react-router-dom";
import { listPersonalDetails } from "../../graphql/queries";
import { RecODFunc } from "../../services/createMethod/RecODFunc";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { uploadReqString } from "../../services/uploadsDocsS3/UploadDocs";
import { DataSupply } from "../../utils/DataStoredContext";
import { useTempID } from "../../utils/TempIDContext";
import { CandyDetails } from "../../services/updateMethod/UpdatePersonalDetails";
import { DeleteUploadApplication } from "../recruitments/deleteDocsRecruit/DeleteUploadApplication";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { DeletePopup } from "../../utils/DeletePopup";
import { handleDeleteFileTemp } from "../../services/uploadsDocsS3/DeleteTempDocs";

const client = generateClient();

export const OtherDetails = ({ fetchedData }) => {
  const { formattedPermissions } = useDeleteAccess();
  const { submitODFunc } = RecODFunc();
  const [deletePopup, setDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTitle1, setDeleteTitle1] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [mergedData, setMergedData] = useState([]);
  const { candyDetails } = CandyDetails();
  const location = useLocation();
  // const navigatingEducationData = location.state?.FormData;
  const { tempID } = useTempID();
  const { empPDData, educDetailsData } = useContext(DataSupply);

  const [isUploadingString, setIsUploadingString] = useState({
    uploadResume: false,
    uploadCertificate: false,
    uploadPp: false,
    uploadIc: false,
  });

  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
    uploadIc: null,
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
    uploadIc: null,
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CandidatesSchema),
    defaultValues: {
      perIS: "no",
      perIDesc: "",
    },
  });

  const navigatingEducationData = JSON.parse(
    localStorage.getItem("educationFormData")
  );

  const EMPID = localStorage.getItem("userID");
  const TODAY = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (fetchedData) {
      setValue("perIS", fetchedData.perIS || "no");
      setValue("perIDesc", fetchedData.perIDesc || "");
    }
  }, [fetchedData, setValue]);

  useEffect(() => {
    if (empPDData.length > 0 && educDetailsData.length > 0) {
      const merged = empPDData.map((empData) => {
        const educData = educDetailsData.find(
          (educ) => educ.tempID === empData.tempID
        );
        return {
          ...empData,
          ...(educData ? educData : {}),
        };
      });
      setMergedData(merged);
    }
  }, [empPDData, educDetailsData]);

  useEffect(() => {
    const parseDetails = (data) => {
      try {
        let cleanedData = data.replace(/\\/g, "");

        cleanedData = cleanedData.replace(/'/g, '"');

        cleanedData = cleanedData.replace(
          /([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g,
          '$1"$3":'
        );

        cleanedData = cleanedData.replace(
          /:([a-zA-Z0-9_/.\s]+)(?=\s|,|\})/g,
          ':"$1"'
        );

        if (cleanedData.startsWith('"') && cleanedData.endsWith('"')) {
          cleanedData = cleanedData.slice(1, -1);
        }

        const parsedData = JSON.parse(cleanedData);

        if (!Array.isArray(parsedData)) {
          return [];
        }

        return parsedData;
      } catch (error) {
        console.error("Error parsing details:", error);
        return [];
      }
    };

    if (tempID) {
      if (educDetailsData.length > 0) {
        const interviewData = educDetailsData.find(
          (data) => data.tempID === tempID
        );

        if (interviewData) {
          Object.keys(interviewData).forEach((key) => {
            if (
              key === "emgDetails" ||
              key === "referees" ||
              key === "relatives"
            ) {
              if (
                Array.isArray(interviewData[key]) &&
                typeof interviewData[key][0] === "string"
              ) {
                let parsedData = parseDetails(interviewData[key][0]);

                if (parsedData.length > 0) {
                  setValue(key, parsedData);
                }
              }
            } else if (interviewData[key]) {
              // Log value being set
              setValue(key, interviewData[key]);
            }
          });

          if (interviewData) {
            setUploadedFileNames((prev) => ({
              ...prev,
              uploadCertificate: extractFileName(
                interviewData.uploadCertificate
              ),
              uploadPp: extractFileName(interviewData.uploadPp),
              uploadResume: extractFileName(interviewData.uploadResume),
              uploadIc: extractFileName(interviewData.uploadIc),
            }));

            setUploadedDocs((prev) => ({
              ...prev,
              uploadCertificate: interviewData.uploadCertificate,
              uploadPp: interviewData.uploadPp,
              uploadResume: interviewData.uploadResume,
              uploadIc: interviewData.uploadIc,
            }));
          }
        } else {
          // console.log("No interview data found for the given tempID.");
        }
      } else {
        // console.log("EducDetailsData is empty.");
      }
    } else {
      // console.log("TempID is not provided.");
    }
  }, [tempID, setValue, educDetailsData]);

  const extractFileName = (url) => {
    try {
      if (!url || typeof url !== "string") return "";
      let parsed = JSON.parse(url);

      if (Array.isArray(parsed) && parsed[0]?.upload) {
        url = parsed[0].upload;
      }
    } catch (e) {}

    const decodedUrl = decodeURIComponent(url);
    const fileNameWithParams = decodedUrl.split("/").pop();
    return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0];
  };

  const updateUploadingString = (type, value) => {
    setIsUploadingString((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 3.5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 3.5 MB.");
      return;
    }

    setValue(type, file);

    const fileTypeMapping = {
      uploadResume: "uploadResume",
      uploadCertificate: "uploadCertificate",
      uploadPp: "uploadPp",
      uploadIc: "uploadIc",
    };

    if (fileTypeMapping[type]) {
      updateUploadingString(type, true);

      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: file.name,
      }));
    }
  };

  const handleDeleteMsg = () => {
    setDeletePopup(!deletePopup);
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = navigatingEducationData?.tempID;
      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFileTemp(fileType, fileName, tempID);
      const isDeletedArrayUploaded = await DeleteUploadApplication(
        fileType,
        fileName,
        tempID,
        setUploadedFileNames,
        setUploadedDocs,
        setIsUploadingString
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setDeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      alert("Error processing the file deletion.");
    }
  };

  const getTotalCount = async () => {
    try {
      let allTempIDs = [];
      let nextToken = null;

      do {
        const result = await client.graphql({
          query: listPersonalDetails,
          variables: { nextToken },
        });

        const items = result?.data?.listPersonalDetails?.items || [];
        const tempIDs = items.map((val) => val.tempID);
        allTempIDs = [...allTempIDs, ...tempIDs];

        nextToken = result?.data?.listPersonalDetails?.nextToken;
      } while (nextToken);

      const sortedData = allTempIDs.sort((a, b) => {
        const numA = a.match(/\d+/) ? parseInt(a.match(/\d+/)[0], 10) : 0;
        const numB = b.match(/\d+/) ? parseInt(b.match(/\d+/)[0], 10) : 0;

        const prefixA = a.replace(/\d+/g, "") || "";
        const prefixB = b.replace(/\d+/g, "") || "";

        if (prefixA === prefixB) {
          return numA - numB;
        }
        return prefixA.localeCompare(prefixB);
      });

      return sortedData[sortedData.length - 1] || "TEMP0";
    } catch (error) {
      console.error("Error fetching total count:", error);
      return "TEMP0";
    }
  };

  const generateNextTempID = (totalCount) => {
    const prefixMatch = totalCount.match(/[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "TEMP";
    const numberMatch = totalCount.match(/\d+/);
    const numberPart = numberMatch ? parseInt(numberMatch[0], 10) : 0;
    const nextNumber = numberPart + 1;

    const numberLength = numberMatch ? numberMatch[0].length : 1;
    const paddedNextNumber = String(nextNumber).padStart(numberLength, "0");

    return `${prefix}${paddedNextNumber}`;
  };

  const fetchNextTempID = async () => {
    const totalCount = await getTotalCount();
    const nextTempID = generateNextTempID(totalCount);
    return nextTempID;
  };

  var latestTempIDData;

  function base64ToFile(base64String, fileName) {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  const originalName =
    navigatingEducationData?.profilePhotoName || "profilePhoto.png";

  const onSubmit = async (data) => {
    // console.log("data", data);
    try {
      setIsLoading(true);

      const isUpdate = data?.tempID;

      if (!isUpdate) {
        const nextTempID = await fetchNextTempID();
        latestTempIDData = nextTempID;
      }

      const personName = !data?.tempID ? latestTempIDData : data?.tempID;
      // console.log(personName);

      // const latestTempIDData = personName;

      const formattedFamilyDetails = JSON.stringify(
        navigatingEducationData?.familyDetails
      );
      const formattedEduDetails = JSON.stringify(
        navigatingEducationData?.eduDetails
      );
      const formattedWorkExperience = JSON.stringify(
        navigatingEducationData?.workExperience
      );
      const formattedEmgDetails = JSON.stringify(
        navigatingEducationData?.emgDetails
      );
      const formattedReferees = JSON.stringify(
        navigatingEducationData?.referees
      );
      const formattedRelatives = JSON.stringify(
        navigatingEducationData?.relatives
      );

      //  Conditional file upload check using isUp state
      const uploadedResume = isUploadingString.uploadResume
        ? await uploadReqString(data.uploadResume, "uploadResume", personName)
        : uploadedDocs?.uploadResume;

      const uploadedCertificate = isUploadingString.uploadCertificate
        ? await uploadReqString(
            data.uploadCertificate,
            "uploadCertificate",
            personName
          )
        : uploadedDocs?.uploadCertificate;

      const uploadedPp = isUploadingString.uploadPp
        ? await uploadReqString(data.uploadPp, "uploadPp", personName)
        : uploadedDocs?.uploadPp;

      const uploadedIc = isUploadingString.uploadIc
        ? await uploadReqString(data.uploadIc, "uploadIc", personName)
        : uploadedDocs?.uploadIc;

      let UpProfilePhoto;

      const profilePhoto = navigatingEducationData?.profilePhoto;

      // Check: If base64 string → convert to File
      const isBase64Image =
        typeof profilePhoto === "string" &&
        profilePhoto.startsWith("data:image");

      let preparedFile = profilePhoto;

      if (isBase64Image) {
        preparedFile = base64ToFile(profilePhoto, originalName);
      }

      if (
        navigatingEducationData.profilePhotoDoc &&
        !navigatingEducationData.profilePhotoDoc.includes("Employee")
      ) {
        UpProfilePhoto = navigatingEducationData.profilePhotoDoc;
      } else {
        UpProfilePhoto = await uploadReqString(
          preparedFile,
          "profilePhoto",
          personName
        );
      }

      //"Helpp"
      const baseURL =
        "https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/";
      // const baseURL =
      //   "https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/";

      const safeReplace = (url) => {
        if (url && !url.includes("undefined")) {
          return url.replace(baseURL, "");
        }
        return null;
      };

      const currentDate = new Date().toISOString().split("T")[0];

      const wrapUpload = (filePath) => {
        const safePath = safeReplace(filePath);
        return safePath ? [{ upload: safePath, date: currentDate }] : null;
      };

      const checkingPDTable = empPDData.find(
        (match) => match.tempID === personName
      );
      const checkingEDTable = educDetailsData.find(
        (match) => match.tempID === personName
      );

      // Handle Personal Details Update History
      const empPreviousUpdates = checkingPDTable?.updatedBy
        ? JSON.parse(checkingPDTable.updatedBy)
        : [];

      const empUpdatedBy = [
        ...empPreviousUpdates,
        { userID: EMPID, date: TODAY },
      ];

      const orderedEmpUpdatedBy = empUpdatedBy.map((entry) => ({
        userID: entry.userID,
        date: entry.date,
      }));

      // Handle Education Details Update History
      const eduPreviousUpdates = checkingEDTable?.updatedBy
        ? JSON.parse(checkingEDTable.updatedBy)
        : [];

      const eduUpdatedBy = [
        ...eduPreviousUpdates,
        { userID: EMPID, date: TODAY },
      ];

      const orderedEduUpdatedBy = eduUpdatedBy.map((entry) => ({
        userID: entry.userID,
        date: entry.date,
      }));

      const reqValue = {
        ...data,
        ...navigatingEducationData,
        noExperience: data.noExperience,
        salaryExpectation: data.salaryExpectation,
        noticePeriod: data.noticePeriod,
        perIS: data.perIS,
        perIDesc: data.perIDesc,
        supportInfo: data.supportInfo,
        empStatement: data.empStatement,
        eduDetails: formattedEduDetails,
        familyDetails: formattedFamilyDetails,
        workExperience: formattedWorkExperience,
        emgDetails: formattedEmgDetails,
        referees: formattedReferees,
        relatives: formattedRelatives,
        status: "Active",
        profilePhoto: safeReplace(UpProfilePhoto?.replace(baseURL, "")),
        uploadResume: isUploadingString.uploadResume
          ? JSON.stringify(wrapUpload(uploadedResume))
          : uploadedDocs?.uploadResume,

        uploadCertificate: isUploadingString.uploadCertificate
          ? JSON.stringify(wrapUpload(uploadedCertificate))
          : uploadedDocs?.uploadCertificate,

        uploadPp: isUploadingString.uploadPp
          ? JSON.stringify(wrapUpload(uploadedPp))
          : uploadedDocs?.uploadPp,

        uploadIc: isUploadingString.uploadIc
          ? JSON.stringify(wrapUpload(uploadedIc))
          : uploadedDocs?.uploadIc,
        createdBy: JSON.stringify([{ userID: EMPID, date: TODAY }]),
      };
      // console.log(reqValue);

      if (checkingPDTable && checkingEDTable) {
        const updateReqValue = {
          ...reqValue,
          orderedEmpUpdatedBy: JSON.stringify(orderedEmpUpdatedBy),
          orderedEduUpdatedBy: JSON.stringify(orderedEduUpdatedBy),
          PDTableID: checkingPDTable.id,
          EDTableID: checkingEDTable.id,
        };

        // console.log("Update call", { updateReqValue, latestTempIDData });

        await candyDetails({ reqValue: updateReqValue })
          .then(() => {
            // setNotification(true);
            setShowTitle("Your Application Submitted Successfully");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("Application Details Update Call Error", err);
          });
      } else {
        // console.log("Create call", { reqValue, latestTempIDData });

        await submitODFunc({ reqValue, latestTempIDData })
          .then(() => {
            // setNotification(true);
            setShowTitle("Your Application Submitted Successfully");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("Application Details Create Call Error", err);
          });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  const requiredPermissions = ["Candidate"];
  const access = "Recruitment";

  // console.log("tempID:", tempID);

  return (
    <>
      {showTitle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Message */}
            <div className="p-6 text-center">
              <p className="text-darkText text-lg">{showTitle}</p>
            </div>

            {/* OK Button */}
            <div className="px-6 py-3 bg-lightBg border-t border-borderGray flex justify-center">
              <button className="bg-primary px-6 py-2 rounded-lg font-semibold uppercase hover:bg-yellow transition">
                <a href={"/recrutiles/candidate"}>Okay</a>
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block text_size_6">
                Number of Years Experience in Applied Position
              </label>
              <input
                label="Number of Years Experience in Applied Position"
                {...register("noExperience")}
                className="input-field border"
                name="noExperience"
                type="text"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <label className="block text_size_6">Salary Expected</label>
              <input
                label="Salary Expected"
                {...register("salaryExpectation")}
                className="input-field border"
                name="salaryExpectation"
                type="text"
                errors={errors}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text_size_6">
              Termination Notice for Present job (month/Date)
            </label>
            <input
              label="Termination Notice for Present job (month/Date)"
              {...register("noticePeriod")}
              className="input-field border"
              name="noticePeriod"
              type="text"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <label className="text_size_6">
              Have you been interviewed for a position at this company before?
            </label>
            <div className="flex justify-between items-center mt-2 mb-4">
              <div>
                <Controller
                  name="perIS"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id="yes"
                        {...field}
                        value="yes"
                        checked={field.value === "yes"}
                        onChange={() => field.onChange("yes")}
                        className="mr-2 p-3"
                      />
                      <label htmlFor="yes" className="mr-4 text_size_6">
                        Yes
                      </label>

                      <input
                        type="radio"
                        id="no"
                        {...field}
                        value="no"
                        checked={field.value === "no"}
                        onChange={() => field.onChange("no")}
                        className="mr-2 p-3"
                      />
                      <label htmlFor="no" className="text_size_6">
                        No
                      </label>
                    </>
                  )}
                />
                {errors.perIS && (
                  <p className="text-[red] text-xs mt-1">
                    {errors.perIS.message}
                  </p>
                )}
              </div>

              <div>
                <label className="w-[350px] text_size_7">
                  If yes, please give Details
                </label>
                <Controller
                  name="perIDesc"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      disabled={watch("perIS") !== "yes"}
                      className={`mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full ${
                        errors.perIDesc ? "border-[red]" : ""
                      }`}
                    />
                  )}
                />
                {errors.perIDesc && (
                  <p className="text-[red] text-xs mt-4">
                    {errors.perIDesc.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text_size_6 mb-2">
              Any other information you wish to provide?
            </label>
            <textarea
              name="supportInfo"
              {...register("supportInfo")}
              className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
              rows="4"
            ></textarea>
          </div>

          <div className="my-5">
            <label className="text_size_6">Choose file</label>
            <div className="grid grid-cols-3 mt-3 mb-10 gap-5 w-full">
              <div>
                <FileUploadField
                  label="Upload Resume"
                  register={register}
                  fileKey="uploadResume"
                  handleFileUpload={handleFileUpload}
                  uploadedFileNames={uploadedFileNames}
                  deletedStringUpload={deletedStringUpload}
                  isUploadingString={isUploadingString}
                  error={errors.uploadResume}
                  formattedPermissions={formattedPermissions}
                  requiredPermissions={requiredPermissions}
                  access={access}
                />
              </div>

              <div>
                <FileUploadField
                  label="Qualification Certificate"
                  register={register}
                  fileKey="uploadCertificate"
                  handleFileUpload={handleFileUpload}
                  uploadedFileNames={uploadedFileNames}
                  deletedStringUpload={deletedStringUpload}
                  isUploadingString={isUploadingString}
                  error={errors.uploadCertificate}
                  formattedPermissions={formattedPermissions}
                  requiredPermissions={requiredPermissions}
                  access={access}
                />
              </div>

              <div>
                <FileUploadField
                  label="Upload Passport"
                  register={register}
                  fileKey="uploadPp"
                  handleFileUpload={handleFileUpload}
                  uploadedFileNames={uploadedFileNames}
                  deletedStringUpload={deletedStringUpload}
                  isUploadingString={isUploadingString}
                  error={errors.uploadPp}
                  formattedPermissions={formattedPermissions}
                  requiredPermissions={requiredPermissions}
                  access={access}
                />
              </div>

              <div>
                <FileUploadField
                  label="Upload IC"
                  register={register}
                  fileKey="uploadIc"
                  handleFileUpload={handleFileUpload}
                  uploadedFileNames={uploadedFileNames}
                  deletedStringUpload={deletedStringUpload}
                  isUploadingString={isUploadingString}
                  error={errors.UploadIC}
                  formattedPermissions={formattedPermissions}
                  requiredPermissions={requiredPermissions}
                  access={access}
                />
              </div>
            </div>
            <p className="text-xs text-medium_grey mt-1 text-center">
              Please note: Upload a PDF / JPG, PNG under 3.5MB (3584KB) only.
            </p>
          </div>

          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="employeeStatement"
              {...register("empStatement", {
                required: "This field is required",
              })}
              className="w-5 h-5 border-medium_grey rounded"
            />
            <label htmlFor="empStatement" className="ml-2 text-gray-700">
              I Hereby Declare that every statement made by me in this form is
              true and correct and I understand and agree that any false
              declaration made by me may be ground for termination of my
              contract of employment without notice.
            </label>
          </div>
          {errors.empStatement && (
            <p className="text-[red] text-sm">
              {errors?.empStatement?.message}
            </p>
          )}

          <div className="text-center my-10">
            <button type="submit" className="primary_btn" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {/* {notification && (
          <SpinLogo
            text="Your Application Submitted Successfully"
            notification={notification}
            path="/recrutiles/candidate"
          />
        )} */}
        {deletePopup && (
          <DeletePopup
            handleDeleteMsg={handleDeleteMsg}
            title1={deleteTitle1}
          />
        )}
      </div>
    </>
  );
};
