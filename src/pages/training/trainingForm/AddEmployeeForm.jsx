import { useState, useEffect, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainingValidationSchema } from "../../../services/TrainingValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  trainingUp,
  uploadDocs,
} from "../../../services/uploadsDocsS3/UploadDocs";
import { DataSupply } from "../../../utils/DataStoredContext";
import { AddEmpFun } from "../../../services/createMethod/AddEmpFun";
import {
  FileUpload,
  FileUploadFieldNew,
} from "../../employees/medicalDep/FileUploadField";
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
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { DeleteClaim } from "../../insuranceSid/DeleteUpload/DeleteClaim";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";

export const AddEmployeeForm = () => {
  const { empPIData, workInfoData, AddCourseDetails, AddEmpReq } =
    useContext(DataSupply);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  const { createNotification } = useCreateNotification();
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
  const [notification, setNotification] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [showMedicalFields, setShowMedicalFields] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [isUploading, setIsUploading] = useState({
    medicalReport: false,
  });

  const [uploadMedicalReports, setUploadMedicalReports] = useState({
    medicalReport: [],
  });
  //----------------------------------------------------------------------------
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const [fileNames, setFileNames] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TrainingValidationSchema),
    defaultValues: {
      // trainingreq: [], // Initialize with empty array for dynamic fields
      trainingreq: [
        {
          mediRequired: false,
          // courseCode: "",
          // courseName: "",
          // company: "",
          traineeSD: "",
          traineeED: "",
          traineeStatus: "",
          MRNo: "",
          traineeCourseFee: "",
          medicalName: "",
          medicalExpiry: "",
          medicalAppointDate: "",
          medicalReport: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trainingreq",
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const { personalInfo } = useEmployeePersonalInfo(userID);

  // console.log("medi", uploadMedicalReports);
  // console.log("flieNames", uploadedFileNames);
  // console.log("File 2", fileNames);

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

  const handleCourseSelectChange = (event) => {
    const selectedValue = event.target.value;
    const matchedCourse = AddCourseDetails.find(
      (course) => String(course.courseSelect) === String(selectedValue)
    );
    setSelectedCourse(matchedCourse || null);

    if (matchedCourse) {
      setValue("courseName", matchedCourse.courseName || "");
      setValue("company", matchedCourse.company || "");
    }
  };

  const watchMRUpload = watch("medicalReport", "");

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop();
    return fileNameWithExtension;
  };

  const updateUploadingState = (label, value, idx) => {
    setIsUploading((prev) => ({
      ...prev,
      [`${idx}_${label}`]: value,
    }));
    // console.log(idx, value);
  };

  const handleFileChange = async (e, type, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/trainingReq/add";
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
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

    setValue(`trainingreq[${index}].medicalReport`, selectedFile);
    try {
      updateUploadingState(type, true, index);
      await trainingUp(
        selectedFile,
        type,
        setUploadMedicalReports,
        watchedEmpID,
        index
      );
      setUploadedFileNames((prev) => ({
        ...prev,
        [`${index}_${type}`]: [selectedFile.name],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const handleDeleteMethod = async (fileType, fileName, index, field) => {
    try {
      if (!watchedEmpID) {
        alert("Please provide the Employee ID before deleting files.");
        return;
      }

      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedEmpID
      );
      // console.log(`handleDeleteFile result: ${isDeleted}`);

      const isDeletedArrayUpload = await DeleteDocsTriningEmpR(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setFileNames,
        setUploadMedicalReports,
        uploadMedicalReports,
        index,
        field,
        setIsUploading
      );

      if (!isDeleted) {
        console.error(`Failed to delete file: ${fileName}, dynamodb.`);
        return;
      } else if (isDeletedArrayUpload) {
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

  const mediRequiredValues = watch("mediRequired");

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    // console.log(result,"result");
    if (!result) {
      console.warn("Search result is undefined or null");
      return;
    }

    const workInfo = workInfoData.find((data) => data.empID === result.empID);

    if (workInfo) {
      const managerEmpID =
        workInfo.manager?.[workInfo.manager.length - 1] || null;

      const hrOfficialmail = "hr-training@adininworks.com";
      setEmailData((prevData) => ({
        ...prevData,
        hrOfficialmail,
      }));

      if (managerEmpID) {
        const managerInfo = empPIData.find(
          (data) => data.empID === String(managerEmpID)
        );

        if (managerInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            managerOfficialMail: managerInfo.officialEmail || "",
            managerName: managerInfo.name || "",
            managerEmpID: managerInfo.empID || "",
          }));
        }
      }
    }

    const keysToSet = ["empID", "empBadgeNo", "name"];

    const fields = ["department", "position"];

    keysToSet.forEach((key) => {
      const value = result[key] || null;
      setValue(key, value);
    });

    fields.forEach((field) => {
      const value = getLastValue(result[field]) || null;
      setValue(field, value);
    });
    const traineeTrackData = result?.traineeTrack;

    if (traineeTrackData) {
      try {
        // Validate JSON format before parsing
        const parsedData = JSON.parse(traineeTrackData);

        if (!Array.isArray(parsedData)) {
          console.error(
            "Invalid insuranceClaims data format:",
            traineeTrackData
          );
          return;
        }

        if (parsedData.length > 0) {
          setValue("trainingreq", parsedData);

          // console.log(parsedData, "parsedData");
          setSelectedCourse(
            parsedData.map((item, index) => ({
              index,
              courseName: item.courseName,
              company: item.company,
            }))
          );
          const medicalFieldsState = parsedData.reduce((acc, item, i) => {
            acc[i] = item.mediRequired;
            return acc;
          }, {});
          setShowMedicalFields(medicalFieldsState);
          parsedData.forEach((item, idx) => {
            if (item?.medicalReport) {
              try {
                const url = item.medicalReport;
                if (Array.isArray(url) && url.length === 0) return; // Skip empty uploads

                const parsedArray =
                  typeof url === "string" ? JSON.parse(url) : url;

                if (!Array.isArray(parsedArray)) {
                  console.error("Invalid traineeTrackUpload format:", url);
                  return;
                }

                const parsedFiles = parsedArray
                  .map((file) => {
                    try {
                      return typeof file === "string" ? JSON.parse(file) : file;
                    } catch (nestedError) {
                      console.error(
                        "Error parsing nested medicalReport item:",
                        file
                      );
                      return null;
                    }
                  })
                  .filter(Boolean); // Remove null values
                setUploadMedicalReports((prev) => ({
                  ...prev,
                  medicalReport: {
                    ...prev.medicalReport,
                    [idx]: parsedFiles,
                  },
                }));

                const fileNames = parsedFiles.map((file) =>
                  file && file.upload ? getFileName(file.upload) : ""
                );
                setUploadedFileNames((prev) => ({
                  ...prev,
                  [`${idx}_medicalReport`]: fileNames,
                }));
              } catch (innerError) {
                console.error(
                  "Error parsing medicalReport JSON:",
                  item.medicalReport
                );
              }
            }
          });
        }
      } catch (error) {
        console.error(
          "Error parsing traineeTrackData:",
          error,
          traineeTrackData
        );
      }
    } else {
      console.log("reset");
      reset({
        empID: getValues("empID"),
        empBadgeNo: getValues("empBadgeNo"),
        name: getValues("name"),
        department: getValues("department"),
        position: getValues("position"),
        trainingreq: [
          {
            courseName: "",
            company: "",
            mediRequired: false,
            medicalReport: [],
          },
        ],
        // other fields to reset if needed
      });

      // setSelectedCourse([{ index: 0, courseName: "", company: "" }]);
      setShowMedicalFields({ 0: false });
      setUploadMedicalReports({ medicalReport: { 0: [] } });
      setUploadedFileNames({ "0_medicalReport": [] });
    }
  };

  const handleAddTrainingReq = () => {
    append({
      courseCode: "",
      courseName: "",
      company: "",
      traineeSD: "",
      traineeED: "",
      traineeStatus: "",
      MRNo: "",
      traineeCourseFee: "",
      medicalName: "",
      medicalExpiry: "",
      medicalAppointDate: "",
      medicalReport: [],
    });
  };

  const handleMinusData = (idxToRemove) => {
    remove(idxToRemove);
    setUploadedFileNames((prev) => {
      const newFiles = {};
      Object.entries(prev).forEach(([key, value]) => {
        const [indexStr, suffix] = key.split("_");
        const index = parseInt(indexStr, 10);

        if (index < idxToRemove) {
          // keep as is
          newFiles[`${index}_${suffix}`] = value;
        } else if (index > idxToRemove) {
          // shift down
          newFiles[`${index - 1}_${suffix}`] = value;
        }
        // skip the exact removed index
      });

      return newFiles;
    });
    setUploadMedicalReports((prev) => {
      const newReports = {};

      Object.entries(prev.medicalReport || {}).forEach(([key, value]) => {
        const index = Number(key);

        if (index < idxToRemove) {
          newReports[index] = value;
        } else if (index > idxToRemove) {
          newReports[index - 1] = value;
        }
      });

      return { medicalReport: newReports };
    });
    setShowMedicalFields((prev) => {
      const newVisibility = {};

      Object.entries(prev).forEach(([key, value]) => {
        const index = Number(key);

        if (index < idxToRemove) {
          newVisibility[index] = value;
        } else if (index > idxToRemove) {
          newVisibility[index - 1] = value;
        }
      });

      return newVisibility;
    });
  };

  const onSubmit = async (data) => {
    try {
      const EmpReqDataRecord = AddEmpReq
        ? AddEmpReq.find((match) => match.empID === data.empID)
        : {};

      if (EmpReqDataRecord) {
        const oldTrainings = EmpReqDataRecord.trainingTrack || [];
        const newTrainings = data?.trainingreq || [];
        const newlyAddedTrainings = newTrainings.filter((newItem) => {
          return !oldTrainings.some(
            (oldItem) =>
              oldItem.courseCode === newItem.courseCode &&
              oldItem.traineeSD === newItem.traineeSD &&
              oldItem.traineeED === newItem.traineeED
          );
        });
        if (newlyAddedTrainings.length > 0) {
          const trainingRows = newlyAddedTrainings
            .map((item, idx) => {
              return `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${item.courseName}</td>
                  <td>${item.company}</td>
                  <td>${DateFormat(item.traineeSD)}</td>
                  <td>${DateFormat(item.traineeED)}</td>
                  <td>${item.traineeStatus || "-"}</td>
                </tr>
              `;
            })
            .join("");
          const trainingTable = `
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Course Name</th>
          <th>Company</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${trainingRows}
      </tbody>
    </table>
  `;

          const emailSubject = `Employee Training Notification - ${data.name}`;

          const emailBody = `
    <p>Dear ${emailData.managerName},</p>
    <p>Please be informed that ${data.name} is scheduled for the following training(s):</p>
    ${trainingTable}
    <p>Regards,<br/>Training Team</p>
  `;

          const emailBody1 = `
    <p>Dear HR,</p>
    <p>Please be informed that ${data.name} is scheduled for the following training(s):</p>
    ${trainingTable}
    <p>Regards,<br/>Training Team</p>
  `;
          sendEmail(
            emailSubject,
            emailBody,
            "arthihari398@gmail.com",
            "veda.thiyagarajane@gmail.com"
          );
          await createNotification({
            empID: data.empID,
            leaveType: "Training Requestor",
            message: `Employee Training Notification - ${data.name}. Dear Hr, Please be informed that ${data.name} is scheduled for training on
            ${data?.trainingreq}.`,
            senderEmail: "hr_no-reply@adininworks.com",
            receipentEmail: "veda.thiyagarajane@gmail.com",
            status: "Unread",
          });
        }
        const TMRDataUp = {
          trainingTrack: data?.trainingreq?.map((trainee, index) => {
            return {
              ...trainee,
              medicalReport:
                JSON.stringify(uploadMedicalReports?.medicalReport?.[index]) ||
                [],
            };
          }),
          department: data.department,
          empBadgeNo: data.empBadgeNo,
          empID: data.empID,
          id: EmpReqDataRecord.id,
        };

        await TrReqUp({ TMRDataUp });
        console.log(TMRDataUp, "Training details Updated successfully");

        // setShowTitle("Training details Updated successfully");
        // setNotification(true);
      } else {
        const AddEmpValue = {
          trainingTrack: data?.trainingreq?.map((trainee, index) => {
            return {
              ...trainee,
              medicalReport:
                JSON.stringify(uploadMedicalReports?.medicalReport?.[index]) ||
                [],
            };
          }),
          department: data.department,
          empBadgeNo: data.empBadgeNo,
          empID: data.empID,
        };
        await AddEmpData({ AddEmpValue });
        console.log(AddEmpValue, "Training details Saved successfully");
        const trainingRows = data?.trainingreq
          ?.map((item, idx) => {
            return `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.courseName}</td>
              <td>${item.company}</td>
              <td>${DateFormat(item.traineeSD)}</td>
              <td>${DateFormat(item.traineeED)}</td>
              <td>${item.traineeStatus || "-"}</td>
            </tr>
          `;
          })
          .join("");
        console.log(trainingRows);

        const trainingTable = `
  <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Course Name</th>
        <th>Company</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${trainingRows}
    </tbody>
  </table>
`;
        const emailSubject = `Employee Training Notification - ${data.name} `;
        const emailBody = `
        <p>Dear ${emailData.managerName},</p>
        <p>
          Please be informed that ${data.name} is scheduled for the following training(s)
        :</p>
  ${trainingTable}
  <p>Regards,<br/>Training Team</p>
        </p>
      `;
        const emailBody1 = `
<p>Dear HR,</p>
 <p>Please be informed that ${data.name} is scheduled for the following training(s):</p>
  ${trainingTable}
  <p>Regards,<br/>Training Team</p>`;
        sendEmail(
          emailSubject,
          emailBody,
          "arthihari398@gmail.com",
          "veda.thiyagarajane@gmail.com"
        );
        await createNotification({
          empID: data.empID,
          leaveType: "Training Requestor",
          message: `Employee Training Notification - ${data.name}. Dear Hr, Please be informed that ${data.name} is scheduled for training on
          ${data?.trainingreq}.`,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: "veda.thiyagarajane@gmail.com",
          status: "Unread",
        });

        // setShowTitle("Training details Saved successfully");
        // setNotification(true);
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
          <div className="flex justify-end items-center py-5 mt-2">
            <div className="max-w-sm">
              <label className="text_size_5">Employee ID</label> <br />
              <input
                type="text"
                className="input-field"
                {...register("empID")}
              />
              {errors.empID && (
                <p className="text-[red] text-[12px]">{errors.empID.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
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
                <label className="text_size_5">Position</label>
                <input
                  type="text"
                  className={`input-field `}
                  {...register("position")}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Training Requirements */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="my-10 border border-[#E9E7E7] rounded-lg px-5  pt-6"
            >
              <div className="mb-6 flex justify-between ">
                <h3 className="col-span-2 text-lg font-semibold">
                  Training Requirement #{index + 1}
                </h3>
                <div className="my-auto center">
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={handleAddTrainingReq}
                      className="text-grey text-xl"
                    >
                      <FaRegPlusSquare />
                    </button>
                  )}

                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleMinusData(index)}
                      className="text-xl text-grey"
                    >
                      <FaRegMinusSquare />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 ">
                <div className="mb-4">
                  <label htmlFor="courseSelect" className="font-semibold">
                    Course Code
                  </label>
                  <select
                    {...register(`trainingreq.${index}.courseCode`)}
                    onChange={handleCourseSelectChange}
                    className="input-field select-custom"
                  >
                    <option value="">Training Course Select</option>
                    {AddCourseDetails.map((course, index) => (
                      <option
                        key={`${course.courseSelect}-${index}`} 
                        value={course.courseSelect}
                      >
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

                <div className="mb-4">
                  <label className="text_size_5">Course Name</label>
                  <select
                    {...register(`trainingreq.${index}.courseName`)}
                    className="input-field select-custom"
                  >
                    <option>Select</option>
                    {selectedCourse &&
                    Array.isArray(selectedCourse.courseName) ? (
                      selectedCourse.courseName.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))
                    ) : selectedCourse && selectedCourse[index]?.courseName ? (
                      <option value={selectedCourse[index].courseName}>
                        {selectedCourse[index].courseName}
                      </option>
                    ) : (
                      <option value={selectedCourse?.courseName || ""}>
                        {selectedCourse?.courseName ||
                          "No Course Name Available"}
                      </option>
                    )}
                  </select>
                  {errors.courseName && (
                    <p className="text-[red] text-[13px] mt-1">
                      {errors.courseName.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="text_size_5">Training Company</label>
                  <select
                    {...register(`trainingreq.${index}.company`)}
                    className="input-field select-custom"
                  >
                    <option>Select</option>
                    {selectedCourse && Array.isArray(selectedCourse.company) ? (
                      selectedCourse.company.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))
                    ) : selectedCourse && selectedCourse[index]?.company ? (
                      <option value={selectedCourse[index].company}>
                        {selectedCourse[index].company}
                      </option>
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
                  <label className="text_size_5">MR Number</label>
                  <input
                    {...register(`trainingreq.${index}.MRNo`)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text_size_5">Course Fee</label>
                  <input
                    {...register(`trainingreq.${index}.traineeCourseFee`)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text_size_5">Status</label>
                  <select
                    {...register(`trainingreq.${index}.traineeStatus`)}
                    className="input-field select-custom"
                  >
                    <option value="">Select Status</option>
                    <option value="Mandatory">Mandatory</option>
                    <option value="Supplementary">Supplementary</option>
                  </select>
                </div>

                <div>
                  <label className="text_size_5">Start Date</label>
                  <input
                    type="date"
                    {...register(`trainingreq.${index}.traineeSD`)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text_size_5">End Date</label>
                  <input
                    type="date"
                    {...register(`trainingreq.${index}.traineeED`)}
                    className="input-field"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-5 my-5">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`mediRequired-${index}`}
                      {...register(`trainingreq.${index}.mediRequired`)}
                      // checked={watch(`trainingreq.${index}.mediRequired`) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        // const newValue =
                        //   !mediRequiredValues?.[index]?.mediRequired;
                        // console.log(newValue);

                        setShowMedicalFields((prev) => ({
                          ...prev,
                          [index]: newValue,
                        }));
                        // setValue(`trainingreq.${index}.mediRequired`, newValue);
                      }}
                      className="w-[18px] h-[18px] border border-grey rounded appearance-none flex items-center justify-center cursor-pointer"
                    />

                    {showMedicalFields[index] && (
                      <svg
                        className="w-5 h-5 text-[white] bg-[#42e742] -ml-[26px] pointer-events-none rounded"
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

                    <label htmlFor="mediRequired" className="cursor-pointer">
                      If Medical Required
                    </label>
                  </div>
                </div>

                {showMedicalFields[index] && (
                  <div className="col-span-2 grid grid-cols-2 w-full gap-6 mb-10">
                    <div>
                      <label className="text_size_5">Medical Name</label>
                      <input
                        type="text"
                        className="input-field"
                        {...register(`trainingreq.${index}.medicalName`)}
                      />
                      {errors?.trainingreq?.[index]?.medicalName && (
                        <p className="text-[red] text-[13px] mt-1">
                          {errors.trainingreq[index].medicalName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text_size_5">
                        Medical Appointment Date
                      </label>
                      <input
                        type="date"
                        className="input-field"
                        {...register(`trainingreq.${index}.medicalAppointDate`)}
                      />
                      {errors?.trainingreq?.[index]?.medicalAppointDate && (
                        <p className="text-[red] text-[13px] mt-1">
                          {errors.trainingreq[index].medicalAppointDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text_size_5">Medical Expiry</label>
                      <input
                        type="date"
                        className="input-field"
                        {...register(`trainingreq.${index}.medicalExpiry`)}
                      />
                      {errors?.trainingreq?.[index]?.medicalExpiry && (
                        <p className="text-[red] text-[13px] mt-1">
                          {errors.trainingreq[index].medicalExpiry.message}
                        </p>
                      )}
                    </div>

                    <div className=" gap-10 w-full">
                      <div className="w-full">
                        <label className="text_size_5">
                          {" "}
                          Upload Medical Report
                        </label>
                        <label
                          onClick={() => {
                            if (isUploading?.[`${index}_medicalReport`]) {
                              alert(
                                "Please delete the previously uploaded file before uploading a new one."
                              );
                            }
                          }}
                          className="flex items-center px-3 py-3 mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
                        >
                          <input
                            type="file"
                            {...register(`trainingreq[${index}].medicalReport`)}
                            onChange={(e) =>
                              handleFileChange(e, "medicalReport", index)
                            }
                            accept="application/pdf"
                            className="hidden "
                            disabled={isUploading?.[`${index}_medicalReport`]}
                          />
                          <span className="ml-2  w-full font-normal flex justify-between items-center gap-10">
                            Upload Medical Report
                            <GoUpload />
                          </span>
                        </label>
                        <div className="flex items-center justify-between ">
                          {uploadedFileNames?.[`${index}_medicalReport`] ? (
                            <p className="text-grey text-sm my-1">
                              {Array.isArray(
                                uploadedFileNames[`${index}_medicalReport`]
                              ) &&
                                uploadedFileNames[`${index}_medicalReport`]
                                  .slice()
                                  .reverse()
                                  .map((file, fileIndex) => (
                                    <span
                                      key={fileIndex}
                                      className="mt-2 flex justify-between items-center"
                                    >
                                      {file}
                                      {/* Optional console log for debugging */}
                                      {/* {console.log(formattedPermissions?.deleteAccess)} */}
                                      <button
                                        type="button"
                                        className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                        onClick={() => {
                                          handleDeleteMethod(
                                            "medicalReport",
                                            file,
                                            index
                                          );
                                        }}
                                      >
                                        <MdCancel />
                                      </button>
                                    </span>
                                  ))}
                            </p>
                          ) : (
                            fileNames?.[`${index}_medicalReport`] && (
                              <p className="text-grey text-sm my-1">
                                {Array.isArray(
                                  fileNames[`${index}_medicalReport`]
                                ) &&
                                  fileNames[`${index}_medicalReport`]
                                    .slice()
                                    .reverse()
                                    .map((file, fileIndex) => (
                                      <span
                                        key={fileIndex}
                                        className="mt-2 flex justify-between items-center"
                                      >
                                        {file}
                                        {formattedPermissions?.deleteAccess?.[
                                          access
                                        ]?.some((permission) =>
                                          requiredPermissions.includes(
                                            permission
                                          )
                                        ) && (
                                          <button
                                            type="button"
                                            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                            onClick={() => {
                                              handleDeleteMethod(
                                                "medicalReport",
                                                file,
                                                index
                                              );
                                            }}
                                          >
                                            <MdCancel />
                                          </button>
                                        )}
                                      </span>
                                    ))}
                              </p>
                            )
                          )}
                        </div>

                        {errors?.medicalReport && (
                          <p className="text-red text-sm">
                            {errors.medicalReport.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

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
