import { useContext, useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { ClaimInsuranceSchema } from "../../services/EmployeeValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { InsClaimFun } from "../../services/createMethod/InsClaimFun";
import { SpinLogo } from "../../utils/SpinLogo";
import { useOutletContext } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { InsClainOne } from "../employees/insurance/InsClainOne";
import { InsClaimUp } from "../../services/updateMethod/InsClainUp";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";

export const InsuranceClaim = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { insuranceClaimsData, empPIData } = useContext(DataSupply);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { SubmitICData } = InsClaimFun();
  const { InsClaimUpData } = InsClaimUp();
  const [notification, setNotification] = useState(false);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
  const [insuranceClaims, setinsuranceClaims] = useState(inputFields);
  const [showTitle, setShowTitle] = useState("");
  const isInitialMount = useRef(true);

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
  const handleRemoveFileClick = (index) => {
    const newFields = insuranceClaims.filter((_, i) => i !== index);
    setinsuranceClaims(newFields);
    setValue("insuranceClaims", newFields); //
  };

  const handleFileChange = async (e, type, index) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      window.location.href = "/insuranceAdd/dependentInsurance";
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    // Allowed file types
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file");
      return;
    }

    setValue(`insuranceClaims[${index}].claimUpload`, selectedFile);

    try {
      await uploadDocs(
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

  const handleNationalityChange = (e) => {
    setSelectedNationality(e.target.value);
  };
  const searchResult = (result) => {
    console.log(result, "result");
    setValue("empID",result?.empID)
    const insuranceClaimsData = result?.insuranceClaims;
    console.log(insuranceClaimsData);
    
    if (insuranceClaimsData) {
      try {
        const parsedData = JSON.parse(insuranceClaimsData);
        if (isInitialMount.current) {
          if (parsedData && parsedData.length > 0) {
            setinsuranceClaims(parsedData);
            setValue("insuranceClaims", parsedData);

            parsedData.forEach((item, idx) => {
              if (item?.claimUpload) {
                const url = item.claimUpload;
                const parsedArray = JSON.parse(url);
                const parsedFiles = parsedArray.map((item) =>
                  typeof item === "string" ? JSON.parse(item) : item
                );
                setUploadedDocs((prev) => {
                  const updatedinsuranceClaims = [...prev.insuranceClaims];
                  updatedinsuranceClaims[idx] = parsedFiles;

                  return {
                    ...prev,
                    insuranceClaims: updatedinsuranceClaims,
                  };
                });

                setUploadedFileDep((prev) => ({
                  ...prev,
                  [idx]:
                    parsedFiles.length > 0
                      ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
                      : "", // Assign file name dynamically based on index
                }));
              }
            });
          }
          isInitialMount.current = false;
        } else if (parsedData && parsedData.length > 0) {
          setinsuranceClaims(parsedData);
          setValue("insuranceClaims", parsedData);
        }
      } catch (error) {
        console.error("Error parsing insuranceClaims data:", error);
      }
    }
  };


  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const checkingDITable = insuranceClaimsData.find(
        (match) => match.empID === data.empID
      );

      if (checkingDITable) {
        const ICValuse = {
          ...data,
          insuranceClaims: data.insuranceClaims.map((insurance, index) => {
            return {
              ...insurance,
              claimUpload:
                JSON.stringify(uploadedDocs.insuranceClaims[index]) || [], // Dynamically assign uploaded files for each index
            };
          }),

          id: checkingDITable.id,
        };

        console.log(ICValuse, "update");
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

        console.log(ICValuse, "create");

        await SubmitICData({ ICValuse });
        setShowTitle("Dependent Insurance Info saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

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
          insuranceClaims.map((field, index) => (
            <div key={index} className="flex flex-col gap-5 border-b py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1 text_size_6">
                    Type of Insurance Claim
                  </label>
                  <select
                    {...register(`insuranceClaims[${index}].claimType`)}
                    defaultValue={field.claimType || ""}
                    className="input-field select-custom"
                  >
                    <option value=""></option>
                    <option value="Group H&S Insurance">
                      Group H&S Insurance
                    </option>
                    <option value="Travelling Insurance">
                      Travelling Insurance
                    </option>
                    <option value="Personal Accident Insurance">
                      Personal Accident Insurance
                    </option>
                  </select>
                  {errors.insuranceClaims?.[index]?.claimType && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.insuranceClaims[index].claimType.message}
                    </p>
                  )}
                </div>
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

              <InsClainOne register={register} errors={errors} index={index} />

              <div className="grid grid-cols-3 gap-10">
                <div>
                  <label className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                    Upload
                    <input
                      type="file"
                      {...register(`insuranceClaims[${index}].claimUpload`)}
                      onChange={(e) =>
                        handleFileChange(e, "insuranceClaims", index)
                      }
                      accept="application/pdf"
                      className="hidden"
                    />
                    <GoUpload className="ml-1" />
                  </label>

                  <p className="text-secondary text-xs pt-1">
                    {uploadedFileDep[index]}
                  </p>
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
    </div>
  );
};
