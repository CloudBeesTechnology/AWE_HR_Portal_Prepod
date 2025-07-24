import { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainingCertificatesValidation } from "../../../services/TrainingValidation";
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
import { parse, format } from "date-fns";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { trainingUp } from "../../../services/uploadsDocsS3/UploadDocs";

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
  const userType = localStorage.getItem("userID");
  const [trackEmpID, setTrackEmpID] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainingCertificatesValidation),
    defaultValues: {
      trainingProof: [
        {
          courseCode: "",
          courseName: "",
          company: "",
          certifiExpiry: "",
          eCertifiDate: "",
          orgiCertifiDate: "",
          traineeSD: "",
          traineeED: "",
          poNo: "",
          addDescretion: [],
          tcRemarks: "",
        },
      ],
    },
  });

  const [isUploading, setIsUploading] = useState({
    trainingUpCertifi: false,
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    trainingUpCertifi: [],
  });

  const [uploadedCertify, setUploadedCertify] = useState({});
  const [fileNames, setFileNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Tc", trainingCertifi);
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trainingProof",
  });

  const handleRemoveTrainingCertify = (index) => {
    // First create copies of the current state
    const newUploadedDocs = { ...uploadedDocs };
    const newUploadedCertify = { ...uploadedCertify };
    const newFileNames = { ...fileNames };

    // Remove the files associated with the deleted index
    delete newUploadedDocs.trainingUpCertifi?.[index];

    // Remove all keys related to the deleted index in uploadedCertify
    Object.keys(newUploadedCertify).forEach((key) => {
      if (key.startsWith(`${index}_`)) {
        delete newUploadedCertify[key];
      }
    });

    // Reindex the remaining items
    const reindexedUploadedDocs = {};
    const reindexedUploadedCertify = {};
    const reindexedFileNames = {};

    // Get all remaining indices in order
    const remainingIndices = Object.keys(
      newUploadedDocs.trainingUpCertifi || {}
    )
      .map(Number)
      .sort((a, b) => a - b);

    // Reindex the uploadedDocs
    remainingIndices.forEach((oldIndex, newIndex) => {
      reindexedUploadedDocs[newIndex] =
        newUploadedDocs.trainingUpCertifi[oldIndex];
    });

    // Reindex the uploadedCertify
    remainingIndices.forEach((oldIndex, newIndex) => {
      Object.keys(newUploadedCertify).forEach((key) => {
        if (key.startsWith(`${oldIndex}_`)) {
          const newKey = key.replace(`${oldIndex}_`, `${newIndex}_`);
          reindexedUploadedCertify[newKey] = newUploadedCertify[key];
        }
      });
    });

    // Reindex the fileNames
    remainingIndices.forEach((oldIndex, newIndex) => {
      Object.keys(newFileNames).forEach((key) => {
        if (key.startsWith(`${oldIndex}_`)) {
          const newKey = key.replace(`${oldIndex}_`, `${newIndex}_`);
          reindexedFileNames[newKey] = newFileNames[key];
        }
      });
    });

    // Update state
    setUploadedDocs({
      ...newUploadedDocs,
      trainingUpCertifi: reindexedUploadedDocs,
    });
    setUploadedCertify(reindexedUploadedCertify);
    setFileNames(reindexedFileNames);

    remove(index);
  };

  const watchedEmpID = watch("empID");

  const updateUploadingState = (label, value, idx) => {
    setIsUploading((prev) => ({
      ...prev,
      [`${idx}_${label}`]: value,
    }));
  };

  const handleFileChange = async (e, type, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/training/trainingCertify";
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

    setValue(`trainingProof[${index}].trainingUpCertifi`, selectedFile);
    try {
      updateUploadingState(type, true, index);
      await trainingUp(
        selectedFile,
        type,
        setUploadedDocs,
        watchedEmpID,
        index
      );
      setUploadedCertify((prev) => ({
        ...prev,
        [`${index}_${type}`]: [selectedFile.name],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop();
    return fileNameWithExtension;
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const safeParseData = (data) => {
    try {
      let raw;

      // CASE 1: data is an array like ['[{MRNo:...}]'] or ['[{"MRNo":"..."}]']
      if (Array.isArray(data)) {
        raw = data[0];
      } else {
        raw = data;
      }

      // Remove outer quotes if it's a stringified string (e.g. "\"[{...}]\"")
      if (typeof raw === "string" && raw.startsWith('"') && raw.endsWith('"')) {
        raw = JSON.parse(raw); // unescape once
      }

      // Now, handle unquoted keys: MRNo: -> "MRNo":
      const fixedJSON = raw.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');

      const parsed = JSON.parse(fixedJSON);

      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Error normalizing traineeTrackData:", error);
      return [];
    }
  };

  const searchResult = (result) => {
    // console.log("Res", result.trainingProof[0]);
  if (result) {
      setTrackEmpID(true);
    }

    if (!result) {
      console.warn("Search result is undefined or null");
      return;
    }

    const keysToSet = ["empID", "empBadgeNo", "name"];
    const fields = ["department", "position"];

    // Helper function to get the last value from an array
    const getLastValue = (data) => {
      return Array.isArray(data) && data.length ? data[data.length - 1] : data;
    };

    // Set simple fields with fallback for undefined/null/empty values
    keysToSet.forEach((key) => {
      const value = result[key] || null;
      setValue(key, value);
    });

    const formatDate = (date) => {
      if (!date) {
        return null;
      }

      let parsedDate;

      // Try to parse different formats
      if (typeof date === "string") {
        if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
          // Convert from MM-dd-yyyy to yyyy-MM-dd (assuming input is MM-dd-yyyy)
          parsedDate = parse(date, "MM-dd-yyyy", new Date());
        } else {
          parsedDate = new Date(date);
        }
      } else {
        parsedDate = new Date(date);
      }

      const formattedDate = isNaN(parsedDate)
        ? null
        : format(parsedDate, "yyyy-MM-dd");
      return formattedDate;
    };

    // Set fields with last value in the array
    fields.forEach((field) => {
      let value = getLastValue(result[field]) || null;
      setValue(field, value);
    });

    // Handle trainingProof data
    const trainingProofData = result?.trainingProof;
    const trainingTrackData = result?.traineeTrack;

    if (trainingProofData && trainingTrackData) {
      try {
        const parsedProofData = safeParseData(trainingProofData);
        const parsedTrackData = safeParseData(trainingTrackData);

        // First set values from trainingTrack (prioritize these)
        if (Array.isArray(parsedTrackData)) {
          parsedTrackData.forEach((trackItem, idx) => {
            if (trackItem.courseName)
              setValue("courseName", trackItem.courseName);
            if (trackItem.courseCode)
              setValue("courseCode", trackItem.courseCode);
            if (trackItem.company) setValue("company", trackItem.company);
          });
        }

        // Then process trainingProof data (for other fields)
        parsedProofData.forEach((trainingItem, idx) => {
          // console.log(idx,"idx");

          if (trainingItem.certifiExpiry) {
            setValue("certifiExpiry", formatDate(trainingItem.certifiExpiry));
            // console.log(trainingItem.certifiExpiry ,"trainingItem.certifiExpiry");
          }
          if (trainingItem.eCertifiDate) {
            setValue("eCertifiDate", formatDate(trainingItem.eCertifiDate));
          }
          if (trainingItem.orgiCertifiDate) {
            setValue(
              "orgiCertifiDate",
              formatDate(trainingItem.orgiCertifiDate)
            );
          }
          if (trainingItem.poNo) {
            setValue("poNo", trainingItem.epoNo);
          }
          if (trainingItem.addDescretion) {
            setValue("addDescretion", trainingItem.addDescretion);
          }

          if (trainingItem.trainingUpCertifi) {
            try {
              const uploadData =
                typeof trainingItem.trainingUpCertifi === "string"
                  ? JSON.parse(trainingItem.trainingUpCertifi)
                  : trainingItem.trainingUpCertifi;

              if (Array.isArray(uploadData)) {
                setUploadedDocs((prev) => ({
                  ...prev,
                  trainingUpCertifi: {
                    ...prev.trainingUpCertifi,
                    [idx]: uploadData,
                  },
                }));

                const fileNames = uploadData.map((file) =>
                  file?.upload ? getFileName(file.upload) : ""
                );

                setFileNames((prev) => ({
                  ...prev,
                  [`${idx}_trainingUpCertifi`]: fileNames,
                }));
              }
            } catch (uploadError) {
              console.error("Error parsing trainingUpCertifi:", uploadError);
            }
          }
        });

        const mergedData = parsedProofData.map((trackItem, idx) => {
          const proofItem = parsedTrackData?.[idx] || {};
          // console.log(trackItem, "proofItem");

          return {
            ...proofItem,
            MRNo: proofItem.MRNo,
            company: proofItem.company,
            courseCode: proofItem.courseCode,
            courseName: proofItem.courseName,
            traineeCourseFee: proofItem.traineeCourseFee,
            traineeED: proofItem.traineeED,
            traineeSD: proofItem.traineeSD,
            traineeStatus: proofItem.traineeStatus,
            certifiExpiry: trackItem.certifiExpiry || proofItem.certifiExpiry,
            eCertifiDate: trackItem.eCertifiDate || proofItem.eCertifiDate,
            orgiCertifiDate:
              trackItem.orgiCertifiDate || proofItem.orgiCertifiDate,
            poNo: trackItem.poNo || proofItem.poNo,
            addDescretion:
              trackItem.addDescretion || proofItem.addDescretion || [],
            tcRemarks: trackItem.tcRemarks || proofItem.tcRemarks,
            trainingUpCertifi:
              trackItem.trainingUpCertifi || proofItem.trainingUpCertifi || [],
          };
        });
        console.log(mergedData, "mergedData");

        setValue("trainingProof", mergedData);
      } catch (error) {
        console.error("Error parsing training data:", error);
      }
    } else if (trainingTrackData) {
      console.log("TRack", trainingTrackData);

      setUploadedDocs({ trainingUpCertifi: { 0: [] } });
      setUploadedCertify({ "0_trainingUpCertifi": [] });
      setFileNames({ "0_trainingUpCertifi": [] });

      try {
        const parsedTrackData = JSON.parse(trainingTrackData[0]);
        // Create a trainingProof structure with data from traineeTrack
        const trainingProofFromTrack = parsedTrackData.map((trackItem) => ({
          courseName: trackItem?.courseName,
          courseCode: trackItem?.courseCode,
          company: trackItem?.company,
          certifiExpiry: "",
          eCertifiDate: "",
          orgiCertifiDate: "",
          traineeSD: trackItem?.traineeSD,
          traineeED: trackItem?.traineeED,
          poNo: "",
          addDescretion: [],
          tcRemarks: "",
        }));

        // Set the values from track data
        parsedTrackData.forEach((trackItem, idx) => {
          if (trackItem.courseName)
            setValue("courseName", trackItem.courseName);
          if (trackItem.courseCode)
            setValue("courseCode", trackItem.courseCode);
          if (trackItem.company) setValue("company", trackItem.company);
          if (trackItem.traineeSD) setValue("traineeSD", trackItem?.traineeSD);
          if (trackItem.traineeED) setValue("traineeED", trackItem?.traineeED);
        });

        // Set the complete training proof data with values from traineeTrack
        setValue("trainingProof", trainingProofFromTrack);
      } catch (error) {
        console.error("Error parsing trainingTrack:", error);
      }
    } else {
      reset({
        empID: getValues("empID"),
        empBadgeNo: getValues("empBadgeNo"),
        name: getValues("name"),
        department: getValues("department"),
        trainingProof: [
          {
            courseCode: "",
            courseName: "",
            company: "",
            certifiExpiry: "",
            eCertifiDate: "",
            traineeSD: "",
            traineeED: "",
            orgiCertifiDate: "",
            poNo: "",
            addDescretion: [],
            tcRemarks: "",
          },
        ],
      });
      setUploadedDocs({ trainingUpCertifi: { 0: [] } });
      setUploadedCertify({ "0_trainingUpCertifi": [] });
      setFileNames({ "0_trainingUpCertifi": [] });
    }
  };

  const handleAddTrainingCertify = () => {
    append({
      department: "",
      courseCode: "",
      courseName: "",
      company: "",
      certifiExpiry: "",
      eCertifiDate: "",
      orgiCertifiDate: "",
      traineeSD: "",
      traineeED: "",
      poNo: "",
      addDescretion: [],
      tcRemarks: "",
    });
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

      const isDeletedArrayUpload = await DeleteDocsTrainingTC(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedCertify,
        setFileNames,
        setUploadedDocs,
        uploadedDocs,
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

  const onSubmit = async (data) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const TCDataRecord = trainingCertifi
        ? trainingCertifi.find((match) => match.empID === data.empID)
        : {};

      const extractValues = (trainingProof) => {
        return trainingProof.map(
          ({
            certifiExpiry,
            eCertifiDate,
            orgiCertifiDate,
            poNo,
            tcRemarks,
            addDescretion,
            trainingUpCertifi,
            traineeSD,
            traineeED
          }) => ({
            certifiExpiry,
            eCertifiDate,
            orgiCertifiDate,
            poNo,
            tcRemarks,
            addDescretion,
            trainingUpCertifi,
            traineeSD,
            traineeED
          })
        );
      };

      if (TCDataRecord) {
        const previous = TCDataRecord.updatedBy ? JSON.parse(TCDataRecord.updatedBy) : [];
        const updatedBy = JSON.stringify([...previous, { userID: userType, date: today }]);
        const TCDataUp = {
          ...data,
          trainingProof: extractValues(data?.trainingProof)?.map(
            (trainingCR, index) => {
              return {
                ...trainingCR,
                trainingUpCertifi:
                  JSON.stringify(uploadedDocs?.trainingUpCertifi?.[index]) ||
                  [],
              };
            }
          ),
          id: TCDataRecord.id,
          updatedBy,
        };

        await TCDataFunUp({ TCDataUp });
        setShowTitle("Training Certificate Details Updated successfully");
        setNotification(true);
        console.log("Update:", TCDataUp);
      } else {
        const TCValue = {
          ...data,
          trainingProof: extractValues(data?.trainingProof)?.map(
            (trainingCR, index) => {
              return {
                ...trainingCR,
                trainingUpCertifi:
                  JSON.stringify(uploadedDocs?.trainingUpCertifi?.[index]) ||
                  [],
              };
            }
          ),
          createdBy: JSON.stringify([{ userID: userType, date: today }]),
        };

        await TCData({ TCValue });
        setShowTitle("Training Certificate Details Saved successfully");
        setNotification(true);
        console.log("Create:", TCValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requiredPermissions = ["HR"];
  const access = "Training";

  return (
    <section className="bg-[#F8F8F8] p-10 center flex-col w-full">
      <div className=" w-full flex items-center justify-center gap-5 my-10">
        <Link to="/training/hr" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>

        <article className="w-full  center gap-5 text-dark_grey ">
          <p className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
            Training Certificates
          </p>
        </article>
      </div>

      <div className="mt-16 mb-16 w-full rounded-md bg-white px-20 py-10">
        <div className="flex justify-between items-center">
          <div className="mt-6">
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

          <div className="relative">
            <label className="text_size_5 text-dark_grey">Employee ID</label>
            <div
              className={`py-2 w-full text_size_5 border text-grey bg-white border-lite_grey ${"rounded-lg"} flex items-center px-2 gap-2`}
            >
              <input
                type="text"
                placeholder="Employee ID"
                className="outline-none w-full"
                {...register("empID")}
                disabled={trackEmpID}
              />
            </div>
            {errors.empID && (
              <p className="text-[red] text-[12px]">{errors.empID.message}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end  items-center py-5 mt-2"></div>
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
            <div>
              <label className="text_size_5">Position</label>
              <input
                type="text"
                className={`input-field `}
                {...register("position")}
              />
            </div>
          </div>

          {/* Dynamic Training Certificates */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-6 mt-6 border-t pt-6 border border-[#E9E7E7] px-8 py-6 rounded"
            >
              <h3 className="col-span-2 text-lg font-semibold">
                Training Certificate {index + 1}
              </h3>

              <div className="mb-4 ">
                <label htmlFor="courseSelect" className="font-semibold">
                  Selected Course:
                </label>
                <input
                  type="text"
                  {...register(`trainingProof.${index}.courseCode`)}
                  className="input-field"
                />
              </div>

              <div className="mb-4 relative">
                <label className="text_size_5">Training Course Name</label>
                <input
                  type="text"
                  {...register(`trainingProof.${index}.courseName`)}
                  className="input-field"
                />

                <div className="absolute -right-0 -top-10">
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={handleAddTrainingCertify}
                      className="text-grey text-xl "
                    >
                      <FaRegPlusSquare />
                    </button>
                  )}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTrainingCertify(index)}
                      className="text-xl text-grey"
                    >
                      <FaRegMinusSquare />
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="text_size_5">Training Company</label>
                <input
                  type="text"
                  {...register(`trainingProof.${index}.company`)}
                  className="input-field"
                />
              </div>
              <div className="mb-2">
                {" "}
                <label className="text_size_5">
                  Purchase Order (PO) Number
                </label>
                <input
                  {...register(`trainingProof.${index}.poNo`)}
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
                  {...register(`trainingProof.${index}.addDescretion`)}
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
                <label className="text_size_5">
                  Date received E-certificate
                </label>
                <input
                  {...register(`trainingProof.${index}.eCertifiDate`)}
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
                  {...register(`trainingProof.${index}.orgiCertifiDate`)}
                  className="input-field"
                  type="date"
                />
                {errors.orgiCertifiDate && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.orgiCertifiDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text_size_5">Start Date</label>
                <input
                  type="date"
                  {...register(`trainingProof.${index}.traineeSD`)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="text_size_5">End Date</label>
                <input
                  type="date"
                  {...register(`trainingProof.${index}.traineeED`)}
                  className="input-field"
                />
              </div>

              <div className="mb-2">
                <label className="text_size_5">
                  Training Certificate Expiry
                </label>
                <input
                  {...register(`trainingProof.${index}.certifiExpiry`)}
                  className="input-field"
                  type="date"
                />
                {errors.certifiExpiry && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.certifiExpiry.message}
                  </p>
                )}
              </div>

              <div className="">
                <label className="text_size_5">Upload Document</label>
                <div className="grid grid-cols-3 gap-10 py-2">
                  <div className="">
                    <label
                      onClick={() => {
                        if (isUploading?.[`${index}_trainingUpCertifi`]) {
                          alert(
                            "Please delete the previously uploaded file before uploading a new one."
                          );
                        }
                      }}
                      className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer w-[470px]"
                    >
                      <input
                        type="file"
                        {...register(
                          `trainingProof[${index}].trainingUpCertifi`
                        )}
                        onChange={(e) =>
                          handleFileChange(e, "trainingUpCertifi", index)
                        }
                        accept="application/pdf"
                        className="hidden"
                        disabled={isUploading?.[`${index}_trainingUpCertifi`]}
                      />
                      <span className="ml-2 w-full font-normal flex justify-between items-center gap-10">
                        Upload
                        <GoUpload />
                      </span>
                    </label>
                    <div className="flex items-center justify-between ">
                      {uploadedCertify?.[`${index}_trainingUpCertifi`] ? (
                        <p className="text-grey text-sm my-1">
                          {Array.isArray(
                            uploadedCertify[`${index}_trainingUpCertifi`]
                          ) &&
                            uploadedCertify[`${index}_trainingUpCertifi`]
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
                                        "trainingUpCertifi",
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
                        fileNames?.[`${index}_trainingUpCertifi`] && (
                          <p className="text-grey text-sm my-1">
                            {Array.isArray(
                              fileNames[`${index}_trainingUpCertifi`]
                            ) &&
                              fileNames[`${index}_trainingUpCertifi`]
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
                                      requiredPermissions.includes(permission)
                                    ) && (
                                      <button
                                        type="button"
                                        className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                                        onClick={() => {
                                          handleDeleteMethod(
                                            "trainingUpCertifi",
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

                    {errors?.claimUpload && (
                      <p className="text-red text-sm">
                        {errors.claimUpload.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <label className="text_size_5 my-3">Remarks</label>
                <textarea
                  {...register(`trainingProof.${index}.tcRemarks`)}
                  className="input-field"
                  type="text"
                  rows="3"
                ></textarea>
                {errors?.tcRemarks && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.tcRemarks.message}
                  </p>
                )}
              </div>
            </div>
          ))}

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
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};
