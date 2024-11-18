import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesSchema } from "../../services/Validation";
import { generateClient } from "aws-amplify/api";
import { GoUpload } from "react-icons/go"; // Ensure this import is correct
import { useLocation } from "react-router-dom";
import { listPersonalDetails } from "../../graphql/queries";
import { RecODFunc } from "../../services/createMethod/RecODFunc";
import { SpinLogo } from "../../utils/SpinLogo";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
const client = generateClient();

export const OtherDetails = () => {
  const { submitODFunc } = RecODFunc();
  const [notification, setNotification] = useState(false);
  const location = useLocation();
  const navigatingEducationData = location.state?.FormData;
  const [latestTempIDData, setLatesTempIDData] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPassport: null,
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

  // File upload handler
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    const personName = navigatingEducationData?.name;
    if (file) {
      if (type === "uploadResume") {
        await uploadDocs(file, "uploadResume", setUploadedDocs, personName);

        setUploadedFileNames((prev) => ({
          ...prev,
          uploadResume: file.name, // Store the file name for display
        }));
      } else if (type === "uploadCertificate") {
        await uploadDocs(
          file,
          "uploadCertificate",
          setUploadedDocs,
          personName
        );

        setUploadedFileNames((prev) => ({
          ...prev,
          uploadCertificate: file.name, // Store the file name for display
        }));
      } else if (type === "uploadPp") {
        await uploadDocs(file, "uploadPassport", setUploadedDocs, personName);

        setUploadedFileNames((prev) => ({
          ...prev,
          uploadPp: file.name, // Store the file name for display
        }));
      }
    }
  };

  const getTotalCount = async () => {
    try {
      const result = await client.graphql({
        query: listPersonalDetails,
      });
      const items = result?.data?.listPersonalDetails?.items || [];
      return items.length; // Return the count of all entries
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0; // Return 0 if there's an error
    }
  };

  const generateNextTempID = (totalCount) => {
    const nextNumber = totalCount + 1;
    const nextTempID = `TEMP${String(nextNumber).padStart(3, "0")}`;
    return nextTempID;
  };

  useEffect(() => {
    const fetchNextTempID = async () => {
      const totalCount = await getTotalCount();
      const nextTempID = generateNextTempID(totalCount);
      setLatesTempIDData(nextTempID); // Set the generated ID
    };
    fetchNextTempID();
  }, []);

  const onSubmit = async (data) => {
    try {
      const reqValue = {
        ...data,
        ...navigatingEducationData,
        eduDetails: JSON.stringify(data.eduDetails),
        familyDetails: JSON.stringify(data.familyDetails),
        workExperience: JSON.stringify(data.workExperience),
        emgDetails: JSON.stringify(data.emgDetails),
        referees: JSON.stringify(data.referees),
        relatives: JSON.stringify(data.relatives),
        uploadResume: uploadedDocs.uploadResume,
        uploadCertificate: uploadedDocs.uploadCertificate,
        uploadPp: uploadedDocs.uploadPassport,
        status:"Acitve"
      };

      await submitODFunc({
        reqValue,
        latestTempIDData,
      });
      setNotification(true);
    } catch (error) {
      console.log(error);
      
      console.error(
        "Error submitting data to AWS:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      {/* Salary Expected */}
      <div className=" grid grid-cols-2 gap-5">
        <div className="mb-4">
      <FormField
                label="Number of Years Experience in Applied Position"
                register={register}
                name="noExperience"
                type="text"
                errors={errors}
                
              />
        
        </div>
        <div className="mb-4">
        <FormField
                label="Salary Expected"
                register={register}
                name="salaryExpectation"
                type="text"
                errors={errors}
                
              />
      
        </div>
      </div>

      {/* Termination Notice */}
      <div className="mb-4">
      <FormField
                label="  Termination Notice for Present job (month/Date)"
                register={register}
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
              defaultValue="no" // Provide a default value
              render={({ field }) => (
                <>
                  <input
                    type="radio"
                    id="yes"
                    {...field}
                    value="yes"
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
                    className="mr-2 p-3"
                    defaultChecked // This ensures that "No" is checked by default
                  />
                  <label htmlFor="no" className="text_size_6">
                    No
                  </label>
                </>
              )}
            />
            {errors.perIS && (
              <p className="text-[red] text-xs mt-1">{errors.perIS.message}</p>
            )}
          </div>

          <div>
            <label className="w-[350px] text_size_7">
              If yes, please give Details
            </label>
            <Controller
              name="perIDesc"
              control={control}
              defaultValue="" // Provide an initial value to avoid uncontrolled behavior
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

      {/* Support Information */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">
          Any other information you wish to provide?
        </label>
        <textarea
          {...register("supportInfo")}
          className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          rows="4"
        ></textarea>
      </div>

      {/* File Uploads */}
      <div className="my-5 ">
        <label className="text_size_6">Choose file</label>
        <div className="flex items-center justify-between mt-3 mb-10 gap-5">
          {/* Resume Upload */}
          <div>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Upload Resume
              <input
                type="file"
                {...register("uploadResume")}
                onChange={(e) => handleFileChange(e, "uploadResume")}
                className="hidden"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <span className="ml-2">
                <GoUpload />
              </span>
            </label>
            {/* Display uploaded file name */}
            {uploadedFileNames.uploadResume ? (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.uploadResume}
              </p>
            ):(  <p className="text-[red] text-xs mt-1">
              {errors?.uploadResume?.message}
            </p>)}

          
          </div>

          {/* Certificate Upload */}
          <div>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Qualification Certificate
              <input
                type="file"
                {...register("uploadCertificate")}
                onChange={(e) => handleFileChange(e, "uploadCertificate")}
                className="hidden"
                accept="application/pdf, image/png, image/jpeg"
              />
              <span className="ml-2">
                <GoUpload />
              </span>
            </label>
            {/* Display uploaded file name */}
            {uploadedFileNames.uploadCertificate ? (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.uploadCertificate}
              </p>
            ):(<p className="text-[red] text-xs mt-1">
              {errors?.uploadCertificate?.message}
            </p>)}
        
          </div>

          {/* Passport Upload */}
          <div>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Upload IC / Passport
              <input
                type="file"
                {...register("uploadPp")}
                onChange={(e) => handleFileChange(e, "uploadPp")}
                className="hidden"
                accept="application/pdf, image/png, image/jpeg"
              />
              <span className="ml-2">
                <GoUpload />
              </span>
            </label>
            {/* Display uploaded file name */}
            {uploadedFileNames.uploadPp ? (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.uploadPp}
              </p>
            ):(<p className="text-[red] text-xs mt-1">
              {errors?.uploadPp?.message}
            </p>)}
           
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
          I Hereby Declare that every statement made by me in this form is true
          and correct and I understand and agree that any false declaration made
          by me may be ground for termination of my contract of employment
          without notice.
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
      {notification && (
        <SpinLogo
          text="Your Application Submitted Successfully"
          notification={notification}
          path="/recrutiles/candidate"
        />
      )}
    </form> 
  );
};
