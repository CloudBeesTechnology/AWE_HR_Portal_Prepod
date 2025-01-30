import { useContext, useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainingCertificatesValidation } from "../../../services/TrainingValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";
import { TCDataFun } from "../../../services/createMethod/TCDataFun";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FormField } from "../../../utils/FormField";
import { TCDataUpdate } from "../../../services/updateMethod/TCDataUpdate";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export const TrainingCertificatesForm = () => {
  const { empPIData, workInfoData, trainingCertifi, AddEmpReq} =useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { TCData } = TCDataFun();
  const { TCDataFunUp } = TCDataUpdate(); 
  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");

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
  }, [empPIData, workInfoData, trainingCertifi,AddEmpReq]);

  const {
    register,
    handleSubmit,setValue,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainingCertificatesValidation),
  });
  
  const watchedEmpID = watch("empID");

  const watchTCUpload = watch("trainingUpCertifi", ""); // Watch the trainingUpCertifi field

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
      await uploadDocs(selectedFile, label, setUploadTC, watchedEmpID);
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
  
    const keysToSet = ["empID","empBadgeNo","name","position"];
    const fields = [
      "department",
      "courseCode",
      "courseName",
      "company",
      "certifiExpiry",
      "eCertifiDate",
      "orgiCertifiDate",
      "poNo",
      "addDescretion"
    ];
    const uploadFields = ["trainingUpCertifi"];
  
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
    
          setUploadTC((prev) => ({ ...prev, [field]: parsedArray }));
    
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
    // console.log("Form data:", data);

    try {
      
      const TCDataRecord = trainingCertifi
        ? trainingCertifi.find((match) => match.empID === data.empID)
        : {};
     
      if (
        TCDataRecord 
      ) {
        const TCDataUp = {
          ...data,
          trainingUpCertifi:uploadeTC.trainingUpCertifi,
          id: TCDataRecord.id,  
        };
        // console.log(TCDataUp);

        await TCDataFunUp({ TCDataUp });
        setShowTitle("Training Certificate Details Updated successfully");
        setNotification(true);
      } else {
        const TCValue = {
          ...data,
          trainingUpCertifi:uploadeTC.trainingUpCertifi,
        };
        await TCData({ TCValue });
        setShowTitle("Training Certificate Details Saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="space-y-5 bg-[#F8F8F8]  mt-10 py-5 px-8 rounded-xl  text_size_6 text-dark_grey">
          <div className=" w-full flex items-center justify-center gap-5 my-10">
        <Link to="/training/hr" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>

        <article className="w-full  center gap-5 text-dark_grey ">
          <p
          className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
          
            Training Certificate
          </p>    
        </article>       
      </div>
   
       <div className="mt-16 mb-16 w-full rounded-md bg-white px-20 py-10">
       <div className="flex-1 w-[30%] mt-5" >
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
      <form onSubmit={handleSubmit(onSubmit)} >
     
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
            <input type="text" {...register("name")} className="input-field"/>
          </div>

          <div className="mb-2">
            <label className="text_size_5">Employee Badge Number</label>
            <input
            type="text"
              {...register("empBadgeNo")}
              className="input-field"/>    
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
              className="input-field"/>    
    </div>

    {/* Course Name */}
    <div className="mb-4">
      <label className="text_size_5">Training Course Name</label>
      <input
            type="text"
              {...register("courseName")}
              className="input-field"/>
    </div>

    {/* Training Company */}
    <div className="mb-4">
      <label className="text_size_5">Training Company</label>
      <input
            type="text"
              {...register("company")}
              className="input-field"/>
    </div>

    <div className="mb-2"> <label className="text_size_5">
        Purchase Order (PO) Number
            </label>
            <input
              {...register("poNo")}
              className="input-field"
              type="text"
            />
            {errors.poNo && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.poNo.message}
              </p>
            )}</div>
        <div className="mb-2"> <label className="text_size_5">
        Expiry Condition
            </label>
            <input
              {...register("addDescretion")}
              className="input-field"
              type="text"
            />
            {errors.addDescretion && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.addDescretion.message}
              </p>
            )}</div>

    <div className="mb-2"> <label className="text_size_5">Date received E-certificate</label>
            <input
              {...register("eCertifiDate")}
              className="input-field"
              type="date"
            />
            {errors.eCertifiDate && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.eCertifiDate.message}
              </p>
            )}</div>

            <div className="mb-2"> <label className="text_size_5">
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


<FileUploadField
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "trainingUpCertifi")}
        register={register}
        name="trainingUpCertifi"
        error={errors}
        fileName={
          uploadedFileNames.trainingUpCertifi ||
          extractFileName(watchTCUpload)
        }
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
    </section>
  );
}; 
