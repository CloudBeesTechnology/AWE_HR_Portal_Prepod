import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesSchema } from "../../services/Validation";
import { generateClient } from "aws-amplify/api";
import { GoUpload } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { listPersonalDetails } from "../../graphql/queries";
import { RecODFunc } from "../../services/createMethod/RecODFunc";
import { SpinLogo } from "../../utils/SpinLogo";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";

import {
  uploadDocs,
  uploadDocString,
} from "../../services/uploadsDocsS3/UploadDocs";
import { DataSupply } from "../../utils/DataStoredContext";
import { useTempID } from "../../utils/TempIDContext";
import { CandyDetails } from "../../services/updateMethod/UpdatePersonalDetails";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadApplication } from "../recruitments/deleteDocsRecruit/DeleteUploadApplication";
import { MdCancel } from "react-icons/md";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { DeletePopup } from "../../utils/DeletePopup";

const client = generateClient();

export const OtherDetails = ({ fetchedData }) => {
  const { formattedPermissions } = useDeleteAccess();
  const { submitODFunc } = RecODFunc();
  const [notification, setNotification] = useState(false);
  const { candyDetails } = CandyDetails();
  const location = useLocation();
  const navigatingEducationData = location.state?.FormData;
  // console.log(navigatingEducationData);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [latestTempIDData, setLatesTempIDData] = useState("");
  const [mergedData, setMergedData] = useState([]);
  const { tempID } = useTempID();
  const { empPDData, educDetailsData } = useContext(DataSupply);

  const [isUploadingString, setIsUploadingString] = useState({
    uploadResume: false,
    uploadCertificate: false,
    uploadPp: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
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
              setValue(key, interviewData[key]);
            } else {
              // console.log(`No value for key ${key}`);
            }
          });

          if (interviewData) {
            // console.log(interviewData.uploadPp, "poijhgh");

            setUploadedFileNames((prev) => ({
              ...prev,
              uploadCertificate: extractFileName(
                interviewData.uploadCertificate
              ),
              uploadPp: extractFileName(interviewData.uploadPp),
              uploadResume: extractFileName(interviewData.uploadResume),
            }));
            setUploadedDocs((prev) => ({
              ...prev,
              uploadCertificate: interviewData.uploadCertificate,
              uploadPp: interviewData.uploadPp,
              uploadResume: interviewData.uploadResume,
            }));
          }
        } else {
          // console.log("No interview data found for tempID:", tempID);
        }
      }
    }
  }, [tempID, setValue, educDetailsData]);

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      const decodedUrl = decodeURIComponent(url); // Decode URL if it has encoded characters
      const fileNameWithParams = decodedUrl.split("/").pop(); // Extract the last part after "/"
      return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0]; // Remove query params, fragments, and other unnecessary parts
    }
    return "";
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

    setValue(type, file);

    const tempID = navigatingEducationData?.tempID;

    const fileTypeMapping = {
      uploadResume: "uploadResume",
      uploadCertificate: "uploadCertificate",
      uploadPp: "uploadPp",
    };

    if (fileTypeMapping[type]) {
      updateUploadingString(type, true);
      await uploadDocString(
        file,
        fileTypeMapping[type],
        setUploadedDocs,
        tempID
      );

      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: file.name,
      }));
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const tempID = navigatingEducationData?.tempID;
      if (!tempID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(fileType, fileName, tempID);
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
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
    } catch (error) {
      // console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const getTotalCount = async () => {
    let totalCount = 0;
    let nextToken = null;

    try {
      do {
        const result = await client.graphql({
          query: listPersonalDetails,
          variables: { nextToken },
        });

        const items = result?.data?.listPersonalDetails?.items || [];
        totalCount += items.length;

        nextToken = result?.data?.listPersonalDetails?.nextToken;
      } while (nextToken);

      return totalCount;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  };

  const generateNextTempID = (totalCount) => {
    const nextNumber = totalCount + 1;
    return String(nextNumber);
  };

  useEffect(() => {
    const fetchNextTempID = async () => {
      const totalCount = await getTotalCount();
      const nextTempID = generateNextTempID(totalCount);
      setLatesTempIDData(nextTempID);
    };
    fetchNextTempID();
  }, []);
  // console.log(uploadedDocs);

  const onSubmit = async (data) => {
    // console.log(data);

    try {
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

      const reqValue = {
        ...data,
        ...navigatingEducationData,
        eduDetails: formattedEduDetails,
        familyDetails: formattedFamilyDetails,
        workExperience: formattedWorkExperience,
        emgDetails: formattedEmgDetails,
        referees: formattedReferees,
        relatives: formattedRelatives,
        uploadResume: uploadedDocs.uploadResume,
        uploadCertificate: uploadedDocs.uploadCertificate,
        uploadPp: uploadedDocs.uploadPp,
        status: "Active",
      };

      const checkingPDTable = empPDData.find(
        (match) => match.tempID === data.tempID
      );
      const checkingEDTable = educDetailsData.find(
        (match) => match.tempID === data.tempID
      );

      if (checkingPDTable && checkingEDTable) {
        const updateReqValue = {
          ...reqValue,
          PDTableID: checkingPDTable.id,
          EDTableID: checkingEDTable.id,
        };

        // console.log("Updated VALUES", updateReqValue);
        await candyDetails({ reqValue: updateReqValue });
        setNotification(true);
      } else {
        // console.log("Create VALUES", reqValue);
        await submitODFunc({ reqValue, latestTempIDData });
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const requiredPermissions = ["Candidate"];

  const access = "Recruitment";

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <div className=" grid grid-cols-2 gap-5">
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

        {/* File Uploads */}
        <div className="my-5 ">
          <label className="text_size_6">Choose file</label>
          <div className=" grid grid-cols-3  mt-3 mb-10 gap-5 w-full">
            <div>
              <FileUploadField
                label="Upload Resume"
                register={register} // Ensuring register is passed correctly
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
                register={register} // Ensuring register is passed correctly
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
                label="Upload IC / Passport"
                register={register} // Ensuring register is passed correctly
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
          </div>
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
            declaration made by me may be ground for termination of my contract
            of employment without notice.
          </label>
        </div>
        {errors.empStatement && (
          <p className="text-[red] text-sm">{errors?.empStatement?.message}</p>
        )}

        <div className="text-center my-10">
          <button type="submit" className="primary_btn">
            Submit
          </button>
        </div>
      </form>
      {notification && (
        <SpinLogo
          text="Your Application Submitted Successfully"
          notification={notification}
          path="/recrutiles/candidate"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </div>
  );
};
