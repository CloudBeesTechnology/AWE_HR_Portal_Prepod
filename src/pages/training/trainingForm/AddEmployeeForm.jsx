import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainingValidationSchema } from "../../../services/TrainingValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { data, Link } from "react-router-dom";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { DataSupply } from "../../../utils/DataStoredContext";
import { AddEmpFun } from "../../../services/createMethod/AddEmpFun";
import { FileUpload } from "../../employees/medicalDep/FileUploadField";
import { AddEmpReqUp } from "../../../services/updateMethod/AddEmpReqUp";
import { SpinLogo } from "../../../utils/SpinLogo";
import { sendEmail } from "../../../services/EmailServices";
import { DateFormat } from "../../../utils/DateFormat";
import { useCreateNotification } from "../../../hooks/useCreateNotification";
import useEmployeePersonalInfo from "../../../hooks/useEmployeePersonalInfo";
import { DeleteDocsTriningEmpR } from "../../../services/uploadDocsDelete/DeleteDocsTriningEmpR";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";

export const AddEmployeeForm = () => {
  const { empPIData, workInfoData, AddCourseDetails, AddEmpReq } =
    useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { createNotification } = useCreateNotification(); // Hook for creating notification
  const { AddEmpData } = AddEmpFun();
  const { TrReqUp } = AddEmpReqUp();
  const { formattedPermissions } = useDeleteAccess();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");

  const [emailData, setEmailData] = useState({
    managerEmpID: "",
    managerOfficialMail: "",
    managerName: "",
    hrOfficialmail: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TrainingValidationSchema),
    defaultValues: {
      mediRequired: false,
    },
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);
  const { personalInfo } = useEmployeePersonalInfo(userID);

  // console.log(personalInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const TrainCer = AddCourseDetails
              ? AddCourseDetails.find((user) => user.empID === emp.empID)
              : {};
            const AddReq = AddEmpReq
              ? AddEmpReq.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...TrainCer,
              ...AddReq,
            };
          })
          .filter(Boolean);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, workInfoData, AddCourseDetails, AddEmpReq]);

  const watchedEmpID = watch("empID");
  const [notification, setNotification] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]); // Track selected course
  const [showMedicalFields, setShowMedicalFields] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [isUploading, setIsUploading] = useState({
    medicalReport: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    medicalReport: null,
  });
  const [uploadMedicalReports, setUploadMedicalReports] = useState({
    medicalReport: [],
  });

  const handleCourseSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the selected course
    const matchedCourse = AddCourseDetails.find(
      (course) => String(course.courseSelect) === String(selectedValue)
    );

    setSelectedCourse(matchedCourse || null);

    if (matchedCourse) {
      // Set form values
      setValue("courseName", matchedCourse.courseName || "");
      setValue("company", matchedCourse.company || "");
    }
  };

  const watchMRUpload = watch("medicalReport", ""); // Watch the trainingUpCertifi field

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    // const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileNameWithExtension;
  };

  const updateUploadingState = (label, value) => {
    setIsUploading((prev) => ({
      ...prev,
      [label]: value,
    }));
    // console.log(value);
  };

  const handleFileChange = async (e, label) => {
    const watchedEmpID = watch("empID");
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

    // Ensure no duplicate files are added
    const currentFiles = watch(label) || [];
    if (currentFiles?.some((file) => file.name === selectedFile.name)) {
      alert("This file has already been uploaded.");
      return;
    }

    setValue(label, [...currentFiles, selectedFile]);

    try {
      updateUploadingState(label, true);
      await uploadDocs(
        selectedFile,
        label,
        setUploadMedicalReports,
        watchedEmpID
      );
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };
  const deleteFile = async (fileType, fileName) => {
    try {
      const watchedEmpID = watch("empID");
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedEmpID
      );
      const isDeletedArrayUploaded = await DeleteDocsTriningEmpR(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setUploadMedicalReports,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();
      // console.log(`Deleted "${fileName}". Remaining files:`);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  useEffect(() => {
    // Set initial showMedicalFields based on form state
    setShowMedicalFields(getValues("mediRequired"));
  }, [getValues]);

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    // Ensure result is defined
    if (!result) {
      console.warn("Search result is undefined or null");
      return;
    }

    // Find work info based on empID
    const workInfo = workInfoData.find((data) => data.empID === result.empID);

    if (workInfo) {
      const managerEmpID =
        workInfo.manager?.[workInfo.manager.length - 1] || null;

      // Update HR email in emailData
      const hrOfficialmail = "hr-training@adininworks.com";
      setEmailData((prevData) => ({
        ...prevData,
        hrOfficialmail,
      }));

      if (managerEmpID) {
        // Find the manager's information from empPIData
        const managerInfo = empPIData.find(
          (data) => data.empID === String(managerEmpID)
        );

        if (managerInfo) {
          // Update manager's official email and name in emailData
          setEmailData((prevData) => ({
            ...prevData,
            managerOfficialMail: managerInfo.officialEmail || "",
            managerName: managerInfo.name || "",
            managerEmpID: managerInfo.empID || "",
          }));
        }
        // else {
        //   console.warn(
        //     `Manager with empID ${managerEmpID} not found in empPIData`
        //   );
        // }
      }
    } else {
      console.warn(`Work info for empID ${result.empID} not found`);
    }

    // Define keys to set
    const keysToSet = [
      "empID",
      "empBadgeNo",
      "name",
      "MRNo",
      "medicalName",
      "medicalExpiry",
      "medicalAppointDate",
      "traineeSD",
      "traineeED",
      "traineeStatus",
      "traineeCourseFee",
    ];

    const fields = ["department", "courseCode", "courseName", "company"];
    const uploadFields = ["medicalReport"];

    // Set simple fields with fallback for undefined/null/empty values
    keysToSet.forEach((key) => {
      const value = result[key] || null; // Fallback to null if undefined, null, or empty string
      setValue(key, value);
    });

    // Set fields with the last value in the array
    fields.forEach((field) => {
      const value = getLastValue(result[field]) || null; // Fallback to null if undefined, null, or empty array
      setValue(field, value);

      if (field === "courseName" || field === "company") {
        setSelectedCourse((prev) => ({
          ...prev,
          [field]: Array.isArray(value) ? value : [value], // Ensure it is an array
        }));
      }
    });

    // Handle upload fields
    uploadFields.forEach((field) => {
      const fieldData = result[field]?.[0] || null; // Fallback to null if undefined, null, or empty array

      if (fieldData) {
        try {
          const parsedArray = JSON.parse(fieldData);
          setValue(field, parsedArray);
          setUploadMedicalReports((prev) => ({
            ...prev,
            [field]: parsedArray,
          }));

          if (Array.isArray(parsedArray) && parsedArray.length > 0) {
            const fileNames = parsedArray.map((item) =>
              item?.upload ? getFileName(item.upload) : "Unknown file"
            );

            setUploadedFileNames((prev) => ({
              ...prev,
              [field]: fileNames,
            }));
          }
        } catch (error) {
          console.error(`Error parsing upload field ${field}:`, error);
        }
      } else {
        setValue(field, null); // Set to null if no data
        setUploadMedicalReports((prev) => ({ ...prev, [field]: null }));
        setUploadedFileNames((prev) => ({ ...prev, [field]: [] }));
      }
    });

    // Set medical required flag
    const mediRequired =
      result?.medicalName || result?.medicalExpiry ? true : false;
    setValue("mediRequired", mediRequired);
    setShowMedicalFields(mediRequired);
  };

  const onSubmit = async (data) => {
    try {
      const EmpReqDataRecord = AddEmpReq
        ? AddEmpReq.find((match) => match.empID === data.empID)
        : {};

      if (EmpReqDataRecord) {
        const TMRDataUp = {
          ...data,
          medicalReport: uploadMedicalReports.medicalReport,
          id: EmpReqDataRecord.id,
        };

        await TrReqUp({ TMRDataUp });

        setShowTitle("Training details Updated successfully");
        setNotification(true);
      } else {
        const AddEmpValue = {
          ...data,
          medicalReport: uploadMedicalReports.medicalReport,
        };
        await AddEmpData({ AddEmpValue });

        // Email Subject and Body
        const emailSubject = `Employee Training Notification - ${data.name} `;
        const emailBody = `
        <p>Dear ${emailData.managerName},</p>
        <p>
          Please be informed that ${data.name} is scheduled for training on 
          <strong>${data.courseName}</strong> from 
          <strong>${DateFormat(data.traineeSD)}</strong> to 
          <strong>${DateFormat(data.traineeED)}</strong>.
        </p>
      `;
        const emailBody1 = `
<p>Dear HR,</p>
 <p>
          Please be informed that ${data.name} is scheduled for training on 
          <strong>${data.courseName}</strong> from 
          <strong>${DateFormat(data.traineeSD)}</strong> to 
          <strong>${DateFormat(data.traineeED)}</strong>.
        </p>`;

        sendEmail(
          emailSubject,
          emailBody,
          "hr_no-reply@adininworks.com",
          emailData.managerOfficialMail
        );

        sendEmail(
          emailSubject,
          emailBody1,
          "hr_no-reply@adininworks.com",
          emailData.hrOfficialmail
        );
        sendEmail(
          emailSubject,
          emailBody1,
          "hr_no-reply@adininworks.com",
          "hr-training@adininworks.com"
        );

        await createNotification({
          empID: data.empID,
          leaveType: "Training Requestor",
          message: `Employee Training Notification - ${
            data.name
          }. Dear Hr, Please be informed that ${
            data.name
          } is scheduled for training on 
          ${data.courseName} from 
          ${DateFormat(data.traineeSD)} to 
          ${DateFormat(data.traineeED)}.`,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: emailData.hrOfficialmail,
          status: "Unread",
        });

        await createNotification({
          empID: data.empID,
          leaveType: "Training Requestor",
          message: `Employee Training Notification - ${data.name}. Dear ${
            emailData.managerName
          }, Please be informed that ${data.name} is scheduled for training on 
          ${data.courseName} from 
          ${DateFormat(data.traineeSD)} to 
          ${DateFormat(data.traineeED)}.`,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: emailData.managerOfficialMail,
          receipentEmpID: emailData.managerEmpID,
          status: "Unread",
        });

        setShowTitle("Training details Saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requiredPermissions = ["Training Requestor"];

  const access = "Training";

  return (
    <section className="bg-[#F8F8F8] p-10 center flex-col w-full ">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/trainingReq" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
            Add Employee
          </h1>
        </article>
      </div>
      <section className=" mt-16 mb-14 w-full bg-white px-20 py-10">
        <div className="flex-1 w-[30%] mt-5">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end  items-center py-5 mt-2">
            <div className="max-w-sm">
              <label className="text_size_5">Employee ID</label> <br />
              <input
                // ref={inputRef}
                type="text"
                className="input-field"
                {...register("empID")}
              />
              {errors.empID && (
                <p className="text-[red] text-[12px]">{errors.empID.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text_size_5">Employee Badge Number</label>
              <input
                type="text"
                className={`input-field `}
                {...register("empBadgeNo")}
              />
              {errors.empBadgeNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.empBadgeNo.message}
                </p>
              )}
            </div>

            <div>
              <label className="text_size_5">Employee Name</label>
              <input
                type="text"
                className={`input-field `}
                {...register("name")}
              />
            </div>

            <div>
              <label className="text_size_5">Department</label>
              <input
                type="text"
                className={`input-field `}
                {...register("department")}
              />
            </div>

            <div>
              <label className="text_size_5">
                Material Requisition (MR) Number
              </label>
              <input
                type="text"
                className={`input-field `}
                {...register("MRNo")}
              />
              {errors.MRNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.MRNo.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="courseSelect" className="font-semibold">
                Course Code
              </label>
              <select
                {...register("courseCode")}
                onChange={handleCourseSelectChange}
                className="input-field select-custom"
              >
                <option value="">Training Course Select</option>
                {AddCourseDetails.map((course) => (
                  <option key={course.courseSelect} value={course.courseSelect}>
                    {course.courseSelect}
                  </option>
                ))}
              </select>
              {errors.courseCode && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.courseCode.message}
                </p>
              )}
            </div>

            {/* Course Name */}
            <div className="mb-4">
              <label className="text_size_5">Course Name</label>
              <select
                {...register("courseName")}
                className="input-field select-custom"
              >
                <option>Select</option>
                {selectedCourse && Array.isArray(selectedCourse.courseName) ? (
                  selectedCourse.courseName.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option value={selectedCourse?.courseName || ""}>
                    {selectedCourse?.courseName || "No Course Name Available"}
                  </option>
                )}
              </select>
              {errors.courseName && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.courseName.message}
                </p>
              )}
            </div>

            {/* Training Company */}
            <div className="mb-4">
              <label className="text_size_5">Training Company</label>
              <select
                {...register("company")}
                className="input-field select-custom"
              >
                <option>Select</option>
                {selectedCourse && Array.isArray(selectedCourse.company) ? (
                  selectedCourse.company.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option value={selectedCourse?.company || ""}>
                    {selectedCourse?.company || "No Company Available"}
                  </option>
                )}
              </select>
              {errors.company && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label className="text_size_5">Training Course Fee</label>
              <input
                type="text"
                className={`input-field `}
                {...register("traineeCourseFee")}
              />
            </div>

            <div>
              <label className="text_size_5">Training Start Date</label>
              <input
                type="date"
                className={`input-field `}
                {...register("traineeSD")}
              />
              {errors.traineeSD && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.traineeSD.message}
                </p>
              )}
            </div>

            <div>
              <label className="text_size_5">Training End Date</label>
              <input
                type="date"
                className={`input-field `}
                {...register("traineeED")}
              />
              {errors.traineeED && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.traineeED.message}
                </p>
              )}
            </div>

            <div>
              <label className="text_size_5">Training Status</label>
              <select
                className={`input-field select-custom`}
                {...register("traineeStatus")}
              >
                <option value="">Select Status</option>
                <option value="Mandatory">Mandatory</option>
                <option value="Supplementary">Supplementary</option>
                {/* Add status options here */}
              </select>
              {errors.traineeStatus && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.traineeStatus.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2 flex items-center gap-5 my-5">
            <div className="flex items-center gap-2 cursor-pointer">
              {/* Visible Checkbox */}
              <input
                type="checkbox"
                id="mediRequired"
                {...register("mediRequired")}
                checked={getValues("mediRequired")}
                onChange={() => {
                  const newValue = !getValues("mediRequired");
                  setShowMedicalFields(newValue);
                  setValue("mediRequired", newValue);
                }}
                className="w-[18px] h-[18px] border border-grey rounded appearance-none flex items-center justify-center cursor-pointer"
              />

              {/* Checkmark Icon inside Checkbox (only visible when checked) */}
              {getValues("mediRequired") && (
                <svg
                  className="w-5 h-5 text-[white] bg-green -ml-[26px] pointer-events-none rounded"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}

              {/* Clickable Label */}
              <label htmlFor="mediRequired" className="cursor-pointer">
                If Medical Required
              </label>
            </div>
          </div>

          {/* Conditionally render input fields if showMedicalFields is true */}
          {showMedicalFields && (
            <div className="grid grid-cols-2 gap-6 mb-10">
              {/* Medical Name */}
              <div>
                <label className="text_size_5">Medical Name</label>
                <input
                  type="text"
                  className="input-field"
                  {...register("medicalName", {
                    required: "Medical Name is required",
                  })} // Add validation
                />
                {errors.medicalName && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.medicalName.message}
                  </p>
                )}
              </div>

              {/* Medical Appointment Date */}
              <div>
                <label className="text_size_5">Medical Appointment Date</label>
                <input
                  type="date"
                  className="input-field"
                  {...register("medicalAppointDate", {
                    required: "Appointment date is required",
                  })}
                />
                {errors.medicalAppointDate && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.medicalAppointDate.message}
                  </p>
                )}
              </div>

              {/* Medical Expiry */}
              <div>
                <label className="text_size_5">Medical Expiry</label>
                <input
                  type="date"
                  className="input-field"
                  {...register("medicalExpiry", {
                    required: "Medical Expiry is required",
                  })}
                />
                {errors.medicalExpiry && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.medicalExpiry.message}
                  </p>
                )}
              </div>
              <FileUpload
                label="Upload Medical Report"
                name="medicalReport"
                register={register}
                uploadedFileNames={uploadedFileNames} // Ensure this exists
                isUploading={isUploading} // Ensure this exists
                handleFileChange={handleFileChange}
                deleteFile={deleteFile}
                error={errors?.medicalReport}
                formattedPermissions={formattedPermissions}
                requiredPermissions={requiredPermissions}
                access={access}
              />
              {/* <FileUploadField
                label="Upload Medical Report"
                onChangeFunc={(e) => handleFileChange(e, "medicalReport")}
                register={register}
                name="medicalReport"
                error={errors}
                fileName={
                  uploadedFileNames.medicalReport ||
                  extractFileName(watchMRUpload)
                }
              /> */}
              {/* File Upload */}
            </div>
          )}

          <div className="col-span-2 flex justify-center">
            <button type="submit" className="primary_btn">
              Submit
            </button>
          </div>
        </form>
      </section>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/trainingReq/add"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};
