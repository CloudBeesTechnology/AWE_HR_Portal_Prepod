import { useContext, useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { ClaimInsuranceSchema } from "../../services/EmployeeValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { claimUploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
import { InsClaimFun } from "../../services/createMethod/InsClaimFun";
import { SpinLogo } from "../../utils/SpinLogo";
import { DataSupply } from "../../utils/DataStoredContext";
import { InsClainOne } from "../employees/insurance/InsClainOne";
import { InsClaimUp } from "../../services/updateMethod/InsClainUp";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FormField } from "../../utils/FormField";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { DeleteClaim } from "./DeleteUpload/DeleteClaim";
import { MdCancel } from "react-icons/md";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { DeletePopup } from "../../utils/DeletePopup";

export const InsuranceClaim = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { insuranceClaimsData, empPIData, dropDownVal } =
    useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { SubmitICData } = InsClaimFun();
  const { InsClaimUpData } = InsClaimUp();
  const [notification, setNotification] = useState(false);
  const [allEmpDetails, setAllEmpDetails] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useForm({
    resolver: yupResolver(ClaimInsuranceSchema),
    defaultValues: {
      insuranceClaims: [{}],
    },
  });

  const [inputFields, setInputFields] = useState([{ id: Date.now() }]);
  const [uploadedFileDep, setUploadedFileDep] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState({
    insuranceClaims: [],
  });
  const [isUploading, setIsUploading] = useState({ insuranceClaims: false });
  const [insuranceClaims, setinsuranceClaims] = useState(inputFields);
  const [showTitle, setShowTitle] = useState("");
  const isInitialMount = useRef(true);

  const insuClaimDD = dropDownVal[0]?.insuClaimDD.map((item) => ({
    value: item,
    label: item,
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const InscClaimDetails = insuranceClaimsData
              ? insuranceClaimsData.find((user) => user.empID === emp.empID)
              : {};

            return { ...emp, ...InscClaimDetails };
          })
          .filter(Boolean);

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, insuranceClaimsData]);

  const handleAddFileClick = () => {
    const newField = { id: Date.now() };
    setinsuranceClaims((prev) => [...prev, newField]);
  };
  const watchedEmpID = watch("empID");

const getInsurance = watch("insuranceClaims");

  const handleRemoveFileClick = (index) => {
    // Remove the insurance claim at the given index
    const newFields = getInsurance
    .filter((_, i) => i !== index) // Remove the item at the given index
    .map((item) => ({ ...item }));
    // const newFields = insuranceClaims.filter((_, i) => i !== index);
    setinsuranceClaims(newFields);
    setValue("insuranceClaims", newFields);

    setUploadedDocs((prevDocs) => {
      // if (!prevDocs?.insuranceClaims || !(index in prevDocs.insuranceClaims))
      //   return prevDocs;

      // Step 1: Create an array from the insuranceClaims object, filtering out the selected index
      const filteredArray = Object.entries(prevDocs?.insuranceClaims)
        .filter(([key]) => Number(key) !== index)
        .map(([, value]) => value); // Keep only values (arrays of file objects)

      // Step 2: Reconstruct the insuranceClaims object with new sequential keys
      const reindexedInsuranceClaims = filteredArray?.reduce(
        (acc, item, newIndex) => {
          acc[newIndex] = item;
          return acc;
        },
        {}
      );
    
      // Step 3: Return the updated state
      return { ...prevDocs, insuranceClaims: reindexedInsuranceClaims };
    });
    trigger("insuranceClaims");


    const fullPath = insuranceClaims[index]?.fileName;
    if (fullPath) {
      const fileName = fullPath.split("/").pop();
      
      handleDeleteFile("insuranceClaims", fileName, watchedEmpID);
    }
    const filterAndReindex = (prev, index) =>
      Array.isArray(prev)
        ? prev
            .filter((item) => item?.ind !== index)
            .map((val, inx) => ({ ...val, ind: inx }))
        : [];

    setIsUploading((prev) => filterAndReindex(prev, index));
    setUploadedFileDep((prev) => filterAndReindex(prev, index));
  };

  const updateUploadingState = (label, value, idx) => {
    setIsUploading((prev) => ({
      ...prev,
      [idx]: value,
    }));
    // console.log(idx, value);
  };
  const handleFileChange = async (e, type, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/insuranceHr/insuranceClaim";
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

    setValue(`insuranceClaims[${index}].claimUpload`, selectedFile);
    try {
      updateUploadingState(type, true, index);
      await claimUploadDocs(
        selectedFile,
        type,
        setUploadedDocs,
        watchedEmpID,
        index
      );
      setUploadedFileDep((prev) => ({
        ...prev,
        [index]: selectedFile.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(isUploading);
  const searchResult = (result) => {
    // console.log(result, "result");
    setValue("empID", result?.empID);
    const insuranceClaimsData = result?.insuranceClaims;
    // console.log(insuranceClaimsData);

    if (insuranceClaimsData) {
      try {
        // Validate JSON format before parsing
        const parsedData = JSON.parse(insuranceClaimsData);

        if (!Array.isArray(parsedData)) {
          console.error(
            "Invalid insuranceClaims data format:",
            insuranceClaimsData
          );
          return;
        }

        // Reset the state before setting new data
        setinsuranceClaims([]);
        setUploadedDocs({});
        setUploadedFileDep({});
        setValue("insuranceClaims", []);

        if (parsedData.length > 0) {
          setinsuranceClaims(parsedData);
          setValue("insuranceClaims", parsedData);

          parsedData.forEach((item, idx) => {
            if (item?.claimUpload) {
              try {
                const url = item.claimUpload;
                if (Array.isArray(url) && url.length === 0) return; // Skip empty uploads

                const parsedArray =
                  typeof url === "string" ? JSON.parse(url) : url;

                if (!Array.isArray(parsedArray)) {
                  console.error("Invalid claimUpload format:", url);
                  return;
                }

                const parsedFiles = parsedArray
                  .map((file) => {
                    try {
                      return typeof file === "string" ? JSON.parse(file) : file;
                    } catch (nestedError) {
                      console.error(
                        "Error parsing nested claimUpload item:",
                        file
                      );
                      return null;
                    }
                  })
                  .filter(Boolean); // Remove null values
                setUploadedDocs((prev) => ({
                  ...prev,
                  insuranceClaims: {
                    ...prev.insuranceClaims,
                    [idx]: parsedFiles,
                  },
                }));

                // setUploadedDocs((prev) => ({
                //   ...prev,
                //   [idx]: parsedFiles,
                // }));

                setUploadedFileDep((prev) => ({
                  ...prev,
                  [idx]:
                    parsedFiles.length > 0
                      ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                      : "",
                }));
              } catch (innerError) {
                console.error(
                  "Error parsing claimUpload JSON:",
                  item.claimUpload
                );
              }
            }
          });
        }
      } catch (error) {
        console.error(
          "Error parsing insuranceClaimsData:",
          error,
          insuranceClaimsData
        );
      }
    }
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    // const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileNameWithExtension;
  };
  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };
  const handleDeleteMethod = async (fileType, fileName, index) => {
    // console.log(fileName, index);

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

      const isDeletedArrayUpload = await DeleteClaim(
        fileType,
        fileName,
        watchedEmpID,
        setUploadedFileDep,
        setUploadedDocs,
        uploadedDocs,
        index,
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
  // console.log(uploadedDocs, "ins1");
  // console.log(uploadedFileDep, "ins1filename");

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const checkingDITable = insuranceClaimsData.find(
        (match) => match.empID === data.empID
      );

      if (checkingDITable) {
        const ICValuse = {
          ...data,
          insuranceClaims: data?.insuranceClaims?.map((insurance, index) => {
            return {
              ...insurance,
              claimUpload:
                JSON.stringify(uploadedDocs?.insuranceClaims?.[index]) || [], // Dynamically assign uploaded files for each index
            };
          }),
          id: checkingDITable.id,
        };
        // console.log(ICValuse, "update");
        await InsClaimUpData({ ICValuse });
        setShowTitle("Dependent Insurance Info Updated successfully");
        setNotification(true);
      } else {
        const ICValuse = {
          ...data,
          insuranceClaims: data.insuranceClaims.map((insurance, index) => {
            return {
              ...insurance,
              claimUpload:
                JSON.stringify(uploadedDocs.insuranceClaims[index]) || [], // Dynamically assign uploaded files for each index
            };
          }),
        };
        // console.log(ICValuse, "create");
        await SubmitICData({ ICValuse });
        setShowTitle("Insurance claim saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const requiredPermissions = ["Insurance"];

  const access = "Insurance";

  return (
    <div
      className="bg-[#F5F6F1CC] mx-auto p-2 py-10"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="flex ">
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
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center">
          <div className="max-w-sm">
            <label className="text_size_6">Employee ID</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Employee ID"
              {...register("empID")}
            />
            {errors.empID && (
              <p className="text-[red] text-[12px]">{errors.empID.message}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddFileClick}
          className="absolute  right-3 mt-28 text-medium_grey text-[25px]"
        >
          <FiPlusSquare className="mr-1" />
        </button>

        {insuranceClaims &&
          insuranceClaims.length > 0 &&
          insuranceClaims
            .filter((field) =>
              Object.values(field).some(
                (value) =>
                  value !== "" &&
                  value !== null &&
                  value !== undefined &&
                  !(Array.isArray(value) && value.length === 0)
              )
            )
            .map((field, index) => (
              <div key={index} className="flex flex-col gap-5 border-b py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Type of Insurance Claim"
                    register={register}
                    name={`insuranceClaims[${index}].claimType`}
                    type="select"
                    options={insuClaimDD}
                    errors={errors.insuranceClaims?.[index]}
                  />

                  <div>
                    <label className="mb-1 text_size_6">
                      Insurance Claim For
                    </label>
                    <select
                      {...register(`insuranceClaims[${index}].claimInfo`)}
                      className="input-field select-custom"
                    >
                      <option value=""></option>
                      <option value="Employee">Employee</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                    </select>
                    {errors.insuranceClaims?.[index]?.depenInfo && (
                      <p className="text-[red] text-xs mt-1">
                        {errors.insuranceClaims[index].depenInfo.message}
                      </p>
                    )}
                  </div>
                </div>

                <InsClainOne
                  register={register}
                  errors={errors}
                  index={index}
                />

                <div className="grid grid-cols-3 gap-10">
                  <div className="">
                    <label
                      onClick={() => {
                        if (isUploading[index]) {
                          alert(
                            "Delete already uploaded Files or save an uploaded file."
                          );
                        }
                      }}
                      className="flex items-center  px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
                    >
                      <input
                        type="file"
                        {...register(`insuranceClaims[${index}].claimUpload`)}
                        onChange={(e) =>
                          handleFileChange(e, "insuranceClaims", index)
                        }
                        accept="application/pdf"
                        className="hidden"
                        disabled={isUploading[index]}
                      />
                       <span className="ml-2  w-full font-normal flex justify-between items-center gap-10">
                       Upload

                      <GoUpload />
                    </span>
                                           
                    </label>
                    <div className="flex items-center justify-between">
                      <p className="text-secondary text-xs pt-1">
                        {uploadedFileDep[index]}
                      </p>
                      {uploadedFileDep[index] &&
                      formattedPermissions?.deleteAccess?.[access]?.some(
                        (permission) => requiredPermissions.includes(permission)
                      ) ? (
                        <button
                          type="button"
                          className=" text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={() =>
                            handleDeleteMethod(
                              "insuranceClaims",
                              uploadedFileDep[index],
                              index
                            )
                          }
                        >
                          <MdCancel />
                        </button>
                      ) : isUploading[index] ? (
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={() =>
                            handleDeleteMethod(
                              "insuranceClaims",
                              uploadedFileDep[index],
                              index
                            )
                          }
                        >
                          <MdCancel />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    {errors?.claimUpload && (
                      <p className="text-red text-sm">
                        {errors.claimUpload.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remove button for individual fields */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFileClick(index)}
                    className="text-red mt-2  flex justify-end items-end text-[25px]"
                  >
                    <FiMinusSquare />
                  </button>
                )}
              </div>
            ))}

        <div className="md:col-span-2 flex justify-center mt-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>

        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/insuranceHr/insuranceClaim"
          />
        )}
      </form>
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </div>
  );
};
