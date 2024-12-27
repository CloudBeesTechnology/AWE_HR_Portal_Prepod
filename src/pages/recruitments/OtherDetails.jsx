import React, { useEffect, useState, useContext } from "react";
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
import { useOutletContext } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { useTempID } from "../../utils/TempIDContext";
import { CandyDetails  } from "../../services/updateMethod/UpdatePersonalDetails";

const client = generateClient();

export const OtherDetails = () => {
  const { submitODFunc } = RecODFunc();
  const [notification, setNotification] = useState(false);
  const { candyDetails } = CandyDetails()
  const location = useLocation();
  const navigatingEducationData = location.state?.FormData;
  const [latestTempIDData, setLatesTempIDData] = useState("");
  const [mergedData, setMergedData] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
  });
  // const { tempID } = useOutletContext();
  const { tempID } = useTempID();
  const { empPDData, educDetailsData } = useContext(DataSupply);
  const [uploadedDocs, setUploadedDocs] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPassport: null,
  });
  const [formData, setFormData] = useState({
    interview: {
      id: "",
      crime: "",
      crimeDesc: "",
      emgDetails: [], // Assuming this is an array
      noExperience: "",
      empStatement: "",
      desc: "",
      disease: "",
      diseaseDesc: "",
      liquor: "",
      liquorDesc: "",
      noticePeriod: "",
      perIS: "no", // Default value
      perIDesc: "",
      referees: [], // Assuming this is an array
      relatives: [], // Assuming this is an array
      salaryExpectation: "",
      supportInfo: "",
      uploadResume: [], // Assuming this is an array
      uploadCertificate: [], // Assuming this is an array
      uploadPp: [], // Assuming this is an array
      age: "",
      alternateNo: "",
      agent: "",
      bwnIcNo: "",
      bwnIcExpiry: "",
      bwnIcColour: "",
      contactNo: "",
      cob: "", // Assuming cob stands for country of birth
      contractType: "",
      chinese: "", // Assuming this field is for ethnicity
      dob: "",
      driveLic: "",
      email: "",
      empType: "",
      eduDetails: [], // Assuming this is an array of educational details
      familyDetails: [], // Assuming this is an array
      gender: "",
      lang: "", // Assuming this is for languages spoken
      marital: "",
      name: "",
      nationality: "",
      otherNation: "",
      otherRace: "",
      otherReligion: "",
      ppNo: "",
      ppIssued: "",
      ppExpiry: "",
      ppDestinate: "",
      presentAddress: "",
      permanentAddress: "",
      profilePhoto: "", // Assuming this is a URL or path to the photo
      position: "",
      race: "",
      religion: "",
      workExperience: [], // Assuming this is an array
      status: "", // Assuming this field refers to candidate status (e.g., active, rejected, etc.)
    },
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
    if (empPDData.length > 0 && educDetailsData.length > 0) {
      const merged = empPDData.map((empData) => {
        // Find the matching record from educDetailsData based on tempID
        const educData = educDetailsData.find(
          (educ) => educ.tempID === empData.tempID
        );
        return {
          ...empData,
          ...(educData ? educData : {}), // Merge the data from both arrays
        };
      });
      setMergedData(merged); // Store the merged data
    }
  }, [empPDData, educDetailsData]);
  console.log(mergedData)


  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };
  console.log(tempID);

  useEffect(() => {
    if (educDetailsData.length > 0 && tempID) {
      const interviewData = educDetailsData.find(
        (data) => data.tempID === tempID
      ); // Use the candidate's tempID to filter the data
      if (interviewData) {
        setFormData({
          interview: {
            noExperience: interviewData.noExperience,
            salaryExpectation: interviewData.salaryExpectation,
            supportInfo: interviewData.supportInfo,
            noticePeriod: interviewData.noticePeriod,
            perIDesc: interviewData.perIDesc,
            perIS: interviewData.perIS,
            uploadCertificate: interviewData.uploadCertificate,
            uploadPp: interviewData.uploadPp,
            uploadResume: interviewData.uploadResume,
          },
        });
      }
      if (interviewData) {
        setUploadedFileNames((prev) => ({
          ...prev,
          uploadCertificate: extractFileName(interviewData.uploadCertificate),
          uploadPp: extractFileName(interviewData.uploadPp),
          uploadResume: extractFileName(interviewData.uploadResume),
        }));
      }
    }
  }, [educDetailsData, tempID]);

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
    return  String(nextNumber);
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
       data.preventDefault();
    
    try {
      const reqValue = {
        ...data,
        ...navigatingEducationData,
        eduDetails: JSON.stringify(navigatingEducationData.eduDetails),
        familyDetails: JSON.stringify(navigatingEducationData.familyDetails),
        workExperience: JSON.stringify(navigatingEducationData.workExperience),
        emgDetails: JSON.stringify(navigatingEducationData.emgDetails),
        referees: JSON.stringify(navigatingEducationData.referees),
        relatives: JSON.stringify(navigatingEducationData.relatives),
        uploadResume: uploadedDocs.uploadResume,
        uploadCertificate: uploadedDocs.uploadCertificate,
        uploadPp: uploadedDocs.uploadPassport,
        status: "Acitve",
      };

      await submitODFunc({
        reqValue,
        latestTempIDData,
      });
      console.log("Value", reqValue);
      localStorage.setItem("otherFormData", JSON.stringify(reqValue));
      // setNotification(true);
    } catch (error) {
      console.log(error);

      console.error(
        "Error submitting data to AWS:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  const handleSubmitTwo = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Find the correct interview data using the tempID of the selected candidate
    const selectedInterviewData = mergedData.find((data) => data.tempID === tempID);
  
    if (!selectedInterviewData) {
      console.error("Candidate not found");
      return;
    }
  
    // Log the selectedInterviewData to compare
    console.log("Selected Interview Data before merge:", selectedInterviewData);
  
    const candyID = selectedInterviewData.id;
    console.log("Candy ID:", candyID);
  
    // Merge selectedInterviewData and formData to update the interview details
    const updatedInterviewData = {
      ...selectedInterviewData, // Start with the existing interview data
      ...formData.interview,    // Override with the values from formData
    };
  
    // Log the updatedInterviewData to compare with the original data
    console.log("Updated Interview Data after merge:", updatedInterviewData);
  
    // Prepare the required data for candyDetails (reqValue)
    const reqValue = {
      id: candyID,
      crime: updatedInterviewData.crime,
      crimeDesc: updatedInterviewData.crimeDesc,
      emgDetails: updatedInterviewData.emgDetails,
      noExperience: updatedInterviewData.noExperience,
      empStatement: updatedInterviewData.empStatement,
      desc: updatedInterviewData.desc,
      disease: updatedInterviewData.disease,
      diseaseDesc: updatedInterviewData.diseaseDesc,
      liquor: updatedInterviewData.liquor,
      liquorDesc: updatedInterviewData.liquorDesc,
      noticePeriod: updatedInterviewData.noticePeriod,
      perIS: updatedInterviewData.perIS,
      perIDesc: updatedInterviewData.perIDesc,
      referees: updatedInterviewData.referees,
      relatives: updatedInterviewData.relatives,
      salaryExpectation: updatedInterviewData.salaryExpectation,
      supportInfo: updatedInterviewData.supportInfo,
      uploadResume: updatedInterviewData.uploadResume,
      uploadCertificate: updatedInterviewData.uploadCertificate,
      uploadPp: updatedInterviewData.uploadPp,
      // For PersonalDetails
      age: updatedInterviewData.age,
      alternateNo: updatedInterviewData.alternateNo,
      agent: updatedInterviewData.agent,
      bwnIcNo: updatedInterviewData.bwnIcNo,
      bwnIcExpiry: updatedInterviewData.bwnIcExpiry,
      bwnIcColour: updatedInterviewData.bwnIcColour,
      contactNo: updatedInterviewData.contactNo,
      cob: updatedInterviewData.cob,
      contractType: updatedInterviewData.contractType,
      chinese: updatedInterviewData.chinese,
      dob: updatedInterviewData.dob,
      driveLic: updatedInterviewData.driveLic,
      email: updatedInterviewData.email,
      empType: updatedInterviewData.empType,
      eduDetails: updatedInterviewData.eduDetails,
      familyDetails: updatedInterviewData.familyDetails,
      gender: updatedInterviewData.gender,
      lang: updatedInterviewData.lang,
      marital: updatedInterviewData.marital,
      name: updatedInterviewData.name,
      nationality: updatedInterviewData.nationality,
      otherNation: updatedInterviewData.otherNation,
      otherRace: updatedInterviewData.otherRace,
      otherReligion: updatedInterviewData.otherReligion,
      ppNo: updatedInterviewData.ppNo,
      ppIssued: updatedInterviewData.ppIssued,
      ppExpiry: updatedInterviewData.ppExpiry,
      ppDestinate: updatedInterviewData.ppDestinate,
      presentAddress: updatedInterviewData.presentAddress,
      permanentAddress: updatedInterviewData.permanentAddress,
      profilePhoto: updatedInterviewData.profilePhoto,
      position: updatedInterviewData.position,
      race: updatedInterviewData.race,
      religion: updatedInterviewData.religion,
      workExperience: updatedInterviewData.workExperience,
      status: updatedInterviewData.status,
      tempID: updatedInterviewData.tempID,
    };
  
    console.log("Prepared reqValue:", reqValue);
  
    
    // Log latestTempIDData before calling the mutation
    // console.log("Latest Temp ID Data:", latestTempIDData);  // Check latestTempIDData
  
    try {
      // Submit the data using the mutation
      // await candyDetails({ reqValue });
  
      console.log("Data stored successfully...");
      // setNotification(true);
    } catch (error) {
      console.error("Error submitting interview details:", error);
    }
  };
  

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <form className="pt-5">
        {/* Salary Expected */}
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
              value={formData.interview.noExperience}
              onChange={(e) =>
                handleInputChange("noExperience", e.target.value)
              }
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
              value={formData.interview.salaryExpectation}
              onChange={(e) =>
                handleInputChange("salaryExpectation", e.target.value)
              }
            />
          </div>
        </div>

        {/* Termination Notice */}

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
            value={formData.interview.noticePeriod}
            onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
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
            value={formData.interview.supportInfo}
            onChange={(e) => handleInputChange("supportInfo", e.target.value)}
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
              ) : (
                <p className="text-[red] text-xs mt-1">
                  {errors?.uploadResume?.message}
                </p>
              )}
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
              ) : (
                <p className="text-[red] text-xs mt-1">
                  {errors?.uploadCertificate?.message}
                </p>
              )}
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
              ) : (
                <p className="text-[red] text-xs mt-1">
                  {errors?.uploadPp?.message}
                </p>
              )}
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
          <button onclick={onSubmit} type="submit" className="primary_btn">
            Submit
          </button>
        </div>
          <div className="text-center my-10">
          <button onClick={handleSubmitTwo} type="submit" className="primary_btn">
            Update
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
    </div>
  );
};
