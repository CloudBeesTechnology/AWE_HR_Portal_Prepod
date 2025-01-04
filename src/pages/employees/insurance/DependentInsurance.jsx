import React, { useContext, useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { DependentInsuranceSchema } from "../../../services/EmployeeValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { DependSecondFile } from "./DependSecondFile";
import { DependFirstFile } from "./DependFirstFile";
import { DependInsDataFun } from "../../../services/createMethod/DependInsDataFun";
import { SpinLogo } from "../../../utils/SpinLogo";
import { useOutletContext } from "react-router-dom";
import { UpdateDepInsDataFun } from "../../../services/updateMethod/UpdateDepInsurance";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FormField } from "../../../utils/FormField";

export const DependentInsurance = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { depInsuranceData,dropDownVal} = useContext(DataSupply);
  const { SubmitMPData } = DependInsDataFun();
  const { UpdateDIData } = UpdateDepInsDataFun();

  const [notification, setNotification] = useState(false);
  const { searchResultData } = useOutletContext();

  const [selectedNationality, setSelectedNationality] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(DependentInsuranceSchema),
    defaultValues: {
      depInsurance: [{}],
    },
  });

  const [inputFields, setInputFields] = useState([{ id: Date.now() }]);
  const [uploadedFileDep, setUploadedFileDep] = useState({});
  
  const [uploadedDocs, setUploadedDocs] = useState({
    depInsurance: [],
  });
  const [depInsurance, setDepInsurance] = useState(inputFields);
  const [showTitle, setShowTitle] = useState("");
  const isInitialMount = useRef(true);
  const handleAddFileClick = () => {
    const newField = { id: Date.now() };
    setDepInsurance((prev) => [...prev, newField]);
  };
  const watchedEmpID = watch("empID");
  const handleRemoveFileClick = (index) => {
    const newFields = depInsurance.filter((_, i) => i !== index);
    setDepInsurance(newFields);
    setValue("depInsurance", newFields); //
  };
  const insuClaimDD = dropDownVal[0]?.insuClaimDD.map((item) => ({
    value: item,
    label: item,
  }));
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
    setValue(`depInsurance[${index}].depenInfUpload, selectedFile`);
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
  useEffect(() => {
    setValue("empID", searchResultData?.empID);

    // Check if depInsurance is defined and not null before parsing
    const depInsuranceData = searchResultData?.depInsurance;
    if (depInsuranceData) {
      try {
        const parsedData = JSON.parse(depInsuranceData);
        if (isInitialMount.current) {
          if (parsedData && parsedData.length > 0) {
            setDepInsurance(parsedData);
            setValue("depInsurance", parsedData);

            parsedData.forEach((item, idx) => {
              if (item?.depenInfUpload) {
                const url = item.depenInfUpload;
                const parsedArray = JSON.parse(url);
                const parsedFiles = parsedArray.map((item) =>
                  typeof item === "string" ? JSON.parse(item) : item
                );
                setUploadedDocs((prev) => {
                  const updatedDepInsurance = [...prev.depInsurance];
                  updatedDepInsurance[idx] = parsedFiles;

                  return {
                    ...prev,
                    depInsurance: updatedDepInsurance,
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
          setDepInsurance(parsedData);
          setValue("depInsurance", parsedData);
        }
      } catch (error) {
        console.error("Error parsing depInsurance data:", error);
      }
    }
  }, [searchResultData]);


  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const checkingDITable = depInsuranceData.find(
        (match) => match.empID === data.empID
      );

      if (checkingDITable) {
        const depValue = {
          ...data,
          depInsurance: data.depInsurance.map((insurance, index) => {
            return {
              ...insurance,
              depenInfUpload:
                JSON.stringify(uploadedDocs.depInsurance[index]) || [], // Dynamically assign uploaded files for each index
            };
          }),

          id: checkingDITable.id,
        };

        // console.log(depValue, "updatex");
        await UpdateDIData({ depValue });
        // setShowTitle("Dependent Insurance Info Updated successfully");
        // setNotification(true);
      } else {
        const depValue = {
          ...data,
          depInsurance: data.depInsurance.map((insurance, index) => {
            return {
              ...insurance,
              depenInfUpload:
                JSON.stringify(uploadedDocs.depInsurance[index]) || [], // Dynamically assign uploaded files for each index
            };
          }),
        };

        // console.log(depValue, "create");

        await SubmitMPData({ depValue });
        // setShowTitle("Dependent Insurance Info saved successfully");
        // setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="bg-[#F5F6F1CC] mx-auto p-2 py-10" >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center">
          <div className="max-w-sm">
            <label className="text_size_5">Employee ID</label>
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
          className="absolute right-3 mt-10 text-medium_grey text-[25px]"
        >
          <FiPlusSquare className="mr-1" />
        </button>

        {depInsurance &&
          depInsurance.length > 0 &&
          depInsurance.map((field, index) => (
            <div key={index} className="flex flex-col gap-5 border-b pb-10">
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
                  <label className="mb-1 text_size_5">
                    Dependent Information
                  </label>
                  <select
                    {...register(`depInsurance[${index}].depenInfo`)}
                    className="input-field select-custom"
                  >
                    <option value=""></option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Spouse&Child">Spouse & Child</option>
                  </select>
                  {errors.depInsurance?.[index]?.depenInfo && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.depInsurance[index].depenInfo.message}
                    </p>
                  )}
                </div>
              </div>

              <DependFirstFile
                register={register}
                errors={errors}
                index={index}
              />
              <DependSecondFile
                register={register}
                errors={errors}
                index={index}
                watch={watch}
                selectedNationality={selectedNationality}
                handleNationalityChange={handleNationalityChange}
                dropDownVal={dropDownVal}
              />

              <div className="grid grid-cols-3 gap-10">
                <div>
                  <label className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                    Upload
                    <input
                      type="file"
                      {...register(`depInsurance[${index}].depenInfUpload`)}
                      onChange={(e) =>
                        handleFileChange(e, "depInsurance", index)
                      }
                      accept="application/pdf"
                      className="hidden"
                    />
                    <GoUpload className="ml-1" />
                  </label>

                  <p className="text-secondary text-xs pt-1">
                    {uploadedFileDep[index]}
                  </p>
                  {errors?.depenInfUpload && (
                    <p className="text-red text-sm">
                      {errors.depenInfUpload.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Remove button for individual fields */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFileClick(index)}
                  className="text-red-500 mt-2 text-medium_grey text-[25px]"
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
            path="/employee"
          />
        )}
      </form>
    </div>
  );
};