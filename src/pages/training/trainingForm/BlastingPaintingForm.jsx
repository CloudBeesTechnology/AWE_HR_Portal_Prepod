import { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {blastingPaintingSchema} from '../../../services/TrainingValidation'
import { DataSupply } from '../../../utils/DataStoredContext';
import { useContext } from 'react';
import { uploadDocs } from "../../../services/uploadsDocsS3/UploadDocs";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { BlastDataFun } from '../../../services/createMethod/BlastDataFun';
import { BlastDataUp } from '../../../services/updateMethod/BlastDataUp';
import { SpinLogo } from '../../../utils/SpinLogo';
export const BlastingPaintingForm = () => {
  
  const { empPIData, workInfoData, BastingInfo} =useContext(DataSupply);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  

  const { BlastData } = BlastDataFun();
  const { BlastUp } = BlastDataUp(); 
  const [notification, setNotification] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState({
    blastingUpload: null,
  });
  const [uploadeBlast, setUploadBlast] = useState({
    blastingUpload: [],
  });
  const {
    register,
    handleSubmit,setValue,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blastingPaintingSchema),
  });
  const watchedEmpID = watch("empID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const Basting = BastingInfo
              ? BastingInfo.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...Basting,
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
  }, [empPIData, workInfoData, BastingInfo]);

  const BlasUpload = watch("blastingUpload", ""); // Watch the trainingUpCertifi field

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
      await uploadDocs(selectedFile, label, setUploadBlast,watchedEmpID);
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
      "blastingRemarks",
      "blastingEndDate",
      "blastingStartDate",
      "blastingBadgeNo",
      "blastingQulifiExp",
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
    const uploadFields = ["blastingUpload"];
  
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
    
          setUploadBlast((prev) => ({ ...prev, [field]: parsedArray }));
    
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
      
      const BlastRecord = BastingInfo
        ? BastingInfo.find((match) => match.empID === data.empID)
        : {};
     
      if (
        BlastRecord 
      ) {
        const BlastUpValue = {
          ...data,
          blastingUpload:uploadeBlast.blastingUpload,
          id: BlastRecord.id,  
        };
        console.log(BlastUpValue);

        await BlastUp({ BlastUpValue });
        setShowTitle("Training Blasting Painting Updated successfully");
        setNotification(true);
      } else {
        const BlastValue = {
          ...data,
          blastingUpload:uploadeBlast.blastingUpload

        };
    console.log(BlastValue,"Creact method");
    
        await BlastData({ BlastValue });
        setShowTitle("Training Blasting Painting Saved successfully");
        setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <section className='bg-[#F8F8F8] p-10 rounded-lg mt-10'>
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

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
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
        {/* Left Column */}
         <div>
         <label className="text_size_5">Employee Badge Number</label>           
          <input
            {...register('empBadgeNo')}
            className="input-field"
            type="text"
          />
         </div>
         <div>
         <label className="text_size_5">Employee Name</label>
          <input
            {...register('name')}
            className="input-field"
            type="text"
          />        
         </div>

          <div>
          <label className="text_size_5">Department</label>
          <input
            {...register('department')}
            className="input-field"
            type="text"
          />       
          </div>

          <div>  
            <label className="text_size_5">Position</label>
          <input
            {...register('position')}
            className="input-field"
            type="text"
          />
        </div>

         <div>
         <label className="text_size_5">Blasting/Painting Badge Number</label>
          <input
            {...register('blastingBadgeNo')}
            className="input-field"
            type="text"
          />
          {errors.blastingBadgeNo && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingBadgeNo.message}</p>
          )}
         </div>

          <div>
          <label className="text_size_5">Blasting/Painting Assessment Start Date</label>
          <input
            {...register('blastingStartDate')}
            className="input-field"
            type="date"
          />
          {errors.blastingStartDate && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingStartDate.message}</p>
          )}
        </div>

         <div>
         <label className="text_size_5">Blasting/Painting Assessment End Date</label>
          <input
            {...register('blastingEndDate')}
            className="input-field"
            type="date"
          />
          {errors.blastingEndDate && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingEndDate.message}</p>
          )}
         </div>

        <div>
          <label className="text_size_5">Blasting/Painting Qualification Expiry</label>
          <input
            {...register('blastingQulifiExp')}
            className="input-field"
            type="date"
          />
          {errors.blastingQulifiExp && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingQulifiExp.message}</p>
          )}
          </div>

         <div>
         <label className="text_size_5">Remarks for Blasting/Painting Qualification</label>
          <input
            {...register('blastingRemarks')}
            className="input-field"
            type="text"
          />
        </div>

        <FileUploadField
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "blastingUpload")}
        register={register}
        name="blastingUpload"
        error={errors}
        fileName={
          uploadedFileNames.blastingUpload ||
          extractFileName(BlasUpload)
        }
      />
      </div>

      <div className='center'>
      <button type="submit" className="primary_btn">
        Submit
      </button>
      </div>
    </form>
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

