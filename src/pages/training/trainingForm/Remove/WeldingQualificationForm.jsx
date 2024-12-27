import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WeldingValidationSchema } from "../../../services/TrainingValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BlastingPaintingForm } from "./BlastingPaintingForm";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";
import { WeldingDataFun } from "../../../services/createMethod/WeldingDataFun";
import { WeldingDataUp } from "../../../services/updateMethod/WeldingDataUp";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { DataSupply } from "../../../../utils/DataStoredContext";
import { useContext } from "react";
import { WeldingOneFile } from "./WeldingOneFile";

export const WeldingQualificationForm = () => {
  const { empPIData, workInfoData, WeldeInfo} =useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { WQData } = WeldingDataFun();
  const { WQDataFunUp } = WeldingDataUp(); 
  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState({
    weldingUpload: null,
 
  });
  const [uploadeWQU, setUploadWQU] = useState({
    weldingUpload: [],
  });
  const {
    register,
    handleSubmit,setValue,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WeldingValidationSchema),
  });
 
  const [show, setShow] = useState(true);
  const watchedEmpID = watch("empID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const Welde = WeldeInfo
              ? WeldeInfo.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...Welde,
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
  }, [empPIData, workInfoData,WeldeInfo]);

  const weldingTCUpload = watch("weldingUpload", ""); // Watch the trainingUpCertifi field

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return ""; 
  };

  const getFileName = (filePath) => {
    const fileNameWithExtension = filePath.split("/").pop(); // Get file name with extension
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join("."); // Remove extension
    return fileName;
  };


  const handleFileChange = async (e, label) => {
    if (!watchedEmpID) {
      alert("Please enter the Employee ID before uploading files.");
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file ");
      return;
    }

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadWQU ,watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name, // Store just the file name
      }));
    } catch (err) {
      console.log(err);
    }
  };



  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;
  
  const searchResult = (result) => {
    console.log("Search result:", result); // Debugging
  
    const keysToSet = ["empID","empBadgeNo","name","position",
      "diameterRange",
      "fillerMetal",
      "thicknessRange",
      "weldingStampNor",
      "wpsNumber",
      "weldingProcess",
      "weldingPosition",
      "WQExpiry",
      "WQRemarks",
      "WQRNo",
      "weldingCode",
      "weldingMaterial",
    ];
    const fields = [
      "department",
    ];
    const uploadFields = ["weldingUpload"];
  
    // Set simple fields
    keysToSet.forEach((key) => {
      if (result[key]) {
        setValue(key, result[key]);
      }
    });
  
   
    // Set other fields
    fields.forEach((field) => {
      const value = getLastValue(result[field]);
      if (value) {
        setValue(field, value);
      }
    });

    uploadFields.forEach((field) => {
      if (result[field]) {
        try {
          const parsedArray = JSON.parse(result?.[field][0]);
          setValue(field, parsedArray);
    
          setUploadWQU((prev) => ({ ...prev, [field]: parsedArray }));
    
          // Check if parsedArray is valid and non-empty
          if (Array.isArray(parsedArray) && parsedArray.length > 0) {
            const lastItem = parsedArray[parsedArray.length - 1];
    
            // Check if lastItem has the upload property
            const fileName = lastItem?.upload
              ? getFileName(lastItem.upload)
              : "Unknown file";
    
            setUploadedFileNames((prev) => ({
              ...prev,
              [field]: fileName,
            }));
          } 
        } catch (error) {
          console.error(`Error parsing upload field ${field}:`, error);
        }
      }
    });
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      
      const WQDataRecord = WeldeInfo
        ? WeldeInfo.find((match) => match.empID === data.empID)
        : {};
     
      if (
        WQDataRecord 
      ) {
        const WQDataUp = {
          ...data,
          weldingUpload:uploadeWQU.weldingUpload,
          id: WQDataRecord.id,  
        };
        console.log(WQDataUp);

        await WQDataFunUp({ WQDataUp });
        setShowTitle("Training Welding Qualification Updated successfully");
        setNotification(true);
      } else {
        const WQValue = {
          ...data,
          weldingUpload:uploadeWQU.weldingUpload

        };
        await WQData({ WQValue });
        setShowTitle("Training Welding Qualification Saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=" p-10 center flex-col gap-16 bg-[#F8F8F8] ">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/training" className="text-xl w-[30%] text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey">
          <h1
            className={` text-center mt-2 text_size_2 relative  ${
              show
                ? "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
                : ""
            }`}
            onClick={() => setShow(true)}
          >
            Welding Qualification
          </h1>
          <h2
            className={` text-center mt-2 text_size_2 relative  ${
              show
                ? ""
                : "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
            }`}
            onClick={() => setShow(false)}
          >
            Blasting Painting
          </h2>
        </article>

     
      </div>
      {show && (
        <section className=" p-10 w-full bg-white  rounded-lg shadow-lg mt-10">
             <div className="w-[30%]">
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

          <form
          onSubmit={handleSubmit(onSubmit)}
        >

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
            <div>
              <label className="text_size_5">Employee Badge Number</label>
              <input
                {...register("empBadgeNo")}
                className="input-field"
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
                {...register("name")}
                className="input-field"
                type="text"
              />
              </div>
              <div>
              <label className="text_size_5">Department</label>
              <input {...register("department")} className="input-field"/>
              {errors.department && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.department.message}
                </p>
              )}
              </div>

              <div>
             <label className="text_size_5">Position</label>
              <input
                {...register("position")}
                className="input-field"
                type="text"
              />
              {errors.position && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.position.message}
                </p>
              )}
             </div>
        
          </div>
          <WeldingOneFile register={register}
          errors={errors} />

       <div className="mt-6">
       <FileUploadField
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "weldingUpload")}
        register={register}
        name="weldingUpload"
        error={errors}
        fileName={
          uploadedFileNames.weldingUpload ||
          extractFileName(weldingTCUpload)
        }
      />
       </div>

          <div className="center">
            <button type="submit" className="primary_btn my-10">
              Submit
            </button>
          </div>
        </form>
        </section>
      )}{" "}
      {!show && <BlastingPaintingForm />}
      {notification && (
        <SpinLogo
        text={showTitle}
        notification={notification}
          path="/training"
        />
      )}
    </section>
  );
};
