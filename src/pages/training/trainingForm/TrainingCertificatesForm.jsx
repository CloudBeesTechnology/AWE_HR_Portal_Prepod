import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainingCertificatesValidation } from "../../../services/TrainingValidation";
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";
import { TCDataFun } from "../../../services/createMethod/TCDataFun";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FileUpload } from "../../employees/medicalDep/FileUploadField";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FormField } from "../../../utils/FormField";
import { TCDataUpdate } from "../../../services/updateMethod/TCDataUpdate";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { DeleteDocsTrainingTC } from "../../../services/uploadDocsDelete/DeleteDocsTrainingTC";
import { handleDeleteFile } from "../../../services/uploadsDocsS3/DeleteDocs";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
import { DeletePopup } from "../../../utils/DeletePopup";

export const TrainingCertificatesForm = () => {
  const { empPIData, workInfoData, trainingCertifi, AddEmpReq } =
    useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { TCData } = TCDataFun();
  const { TCDataFunUp } = TCDataUpdate();
  const { formattedPermissions } = useDeleteAccess();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [isUploading, setIsUploading] = useState({
    trainingUpCertifi: false,
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({
    trainingUpCertifi: null,
  });
  const [uploadeTC, setUploadTC] = useState({
    trainingUpCertifi: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const TrainCer = trainingCertifi
              ? trainingCertifi.find((user) => user.empID === emp.empID)
              : {};
            const AEReq = AddEmpReq
              ? AddEmpReq.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...TrainCer,
              ...AEReq,
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
  }, [empPIData, workInfoData, trainingCertifi, AddEmpReq]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainingCertificatesValidation),
  });

  const watchedEmpID = watch("empID");

  const watchTCUpload = watch("trainingUpCertifi", ""); // Watch the trainingUpCertifi field

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    return fileNameWithExtension;
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
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
      await uploadDocs(selectedFile, label, setUploadTC, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name,
      }));
    } catch (err) {
      console.error(err);
    }
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
      const isDeletedArrayUploaded = await DeleteDocsTrainingTC(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileNames,
        setUploadTC,
        setIsUploading
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setdeleteTitle1(
        `${fileName}`
      );
      handleDeleteMsg();
      // console.log(`Deleted "${fileName}". Remaining files:`);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  const searchResult = (result) => {
    // Ensure result is defined
    if (!result) {
      console.warn("Search result is undefined or null");
      return;
    }

    // Define keys to set
    const keysToSet = ["empID", "empBadgeNo", "name", "position"];
    const fields = [
      "department",
      "courseCode",
      "courseName",
      "company",
      "certifiExpiry",
      "eCertifiDate",
      "orgiCertifiDate",
      "poNo",
      "addDescretion",
    ];
    const uploadFields = ["trainingUpCertifi"];

    // Set simple fields with fallback for undefined/null/empty values
    keysToSet.forEach((key) => {
      const value = result[key] || null; // Fallback to null if undefined, null, or empty string
      setValue(key, value);
    });

    // Set other fields with the last value in the array
    fields.forEach((field) => {
      const value = getLastValue(result[field]) || null; // Fallback to null if undefined, null, or empty array
      setValue(field, value);
    });

    // Handle upload fields
    uploadFields.forEach((field) => {
      const fieldData = result[field]?.[0] || null; // Fallback to null if undefined, null, or empty array

      if (fieldData) {
        try {
          const parsedArray = JSON.parse(fieldData);
          setValue(field, parsedArray);
          setUploadTC((prev) => ({ ...prev, [field]: parsedArray }));

          // Ensure parsedArray is valid
          if (Array.isArray(parsedArray) && parsedArray.length > 0) {
            // Extract all filenames
            const fileNames = parsedArray.map((item) =>
              item?.upload ? getFileName(item.upload) : "Unknown file"
            );

            setUploadedFileNames((prev) => ({
              ...prev,
              [field]: fileNames, // Store all filenames as an array
            }));
          }
        } catch (error) {
          console.error(`Error parsing upload field ${field}:`, error);
        }
      } else {
        setValue(field, null); // Set to null if no data
        setUploadTC((prev) => ({ ...prev, [field]: null }));
        setUploadedFileNames((prev) => ({ ...prev, [field]: [] }));
      }
    });
  };

  const onSubmit = async (data) => {
    // console.log("Form data:", data);

    try {
      const TCDataRecord = trainingCertifi
        ? trainingCertifi.find((match) => match.empID === data.empID)
        : {};

      if (TCDataRecord) {
        const TCDataUp = {
          ...data,
          trainingUpCertifi: uploadeTC.trainingUpCertifi,
          id: TCDataRecord.id,
        };
        // console.log(TCDataUp);

        await TCDataFunUp({ TCDataUp });
        setShowTitle("Training Certificate Details Updated successfully");
        setNotification(true);
      } else {
        const TCValue = {
          ...data,
          trainingUpCertifi: uploadeTC.trainingUpCertifi,
        };
        await TCData({ TCValue });
        setShowTitle("Training Certificate Details Saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requiredPermissions = ["HR"];

  const access = "Training";

  return (
    <section className="space-y-5 bg-[#F8F8F8]  mt-10 py-5 px-8 rounded-xl  text_size_6 text-dark_grey">
      <div className=" w-full flex items-center justify-center gap-5 my-10">
        <Link to="/training/hr" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>

        <article className="w-full  center gap-5 text-dark_grey ">
          <p className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
            Training Certificate
          </p>
        </article>
      </div>

      <div className="mt-16 mb-16 w-full rounded-md bg-white px-20 py-10">
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
          <div className="grid grid-cols-2 gap-6 ">
            {/* Left Column */}

            <div className="mb-2">
              <label className="text_size_5">Employee Name</label>
              <input
                type="text"
                {...register("name")}
                className="input-field"
              />
            </div>

            <div className="mb-2">
              <label className="text_size_5">Employee Badge Number</label>
              <input
                type="text"
                {...register("empBadgeNo")}
                className="input-field"
              />
            </div>

            <FormField
              label="Department"
              register={register}
              name="department"
              type="text"
              errors={errors}
            />

            <div className="mb-4">
              <label htmlFor="courseSelect" className="font-semibold">
                Select Course:
              </label>
              <input
                type="text"
                {...register("courseCode")}
                className="input-field"
              />
            </div>

            {/* Course Name */}
            <div className="mb-4">
              <label className="text_size_5">Training Course Name</label>
              <input
                type="text"
                {...register("courseName")}
                className="input-field"
              />
            </div>

            {/* Training Company */}
            <div className="mb-4">
              <label className="text_size_5">Training Company</label>
              <input
                type="text"
                {...register("company")}
                className="input-field"
              />
            </div>

            <div className="mb-2">
              {" "}
              <label className="text_size_5">Purchase Order (PO) Number</label>
              <input
                {...register("poNo")}
                className="input-field"
                type="text"
              />
              {errors.poNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.poNo.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              {" "}
              <label className="text_size_5">Expiry Condition</label>
              <input
                {...register("addDescretion")}
                className="input-field"
                type="text"
              />
              {errors.addDescretion && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.addDescretion.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              {" "}
              <label className="text_size_5">Date received E-certificate</label>
              <input
                {...register("eCertifiDate")}
                className="input-field"
                type="date"
              />
              {errors.eCertifiDate && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.eCertifiDate.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              {" "}
              <label className="text_size_5">
                Date received Original Certificate
              </label>
              <input
                {...register("orgiCertifiDate")}
                className="input-field"
                type="date"
              />
              {errors.orgiCertifiDate && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.orgiCertifiDate.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="text_size_5">Training Certificate Expiry</label>
              <input
                {...register("certifiExpiry")}
                className="input-field"
                type="date"
              />
              {errors.certifiExpiry && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.certifiExpiry.message}
                </p>
              )}
            </div>

            <FileUpload
              label="Upload File"
              name="trainingUpCertifi"
              register={register}
              uploadedFileNames={uploadedFileNames} // Ensure this exists
              isUploading={isUploading} // Ensure this exists
              handleFileChange={handleFileChange}
              deleteFile={deleteFile}
              error={errors?.trainingUpCertifi}
              formattedPermissions={formattedPermissions}
              requiredPermissions={requiredPermissions}
              access={access}
            />
          </div>
          <div className="center py-5">
            <button type="submit" className="primary_btn">
              Submit
            </button>
          </div>
        </form>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/training/trainingCertify"
        />
      )}
          {deletePopup && (
              <DeletePopup
                handleDeleteMsg={handleDeleteMsg}
                title1={deleteTitle1}
              />
            )}
    </section>
  );
};
