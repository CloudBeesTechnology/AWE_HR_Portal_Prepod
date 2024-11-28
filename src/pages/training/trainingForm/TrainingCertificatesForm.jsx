import React, { useContext, useEffect, useRef,useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainingCertificatesValidationSchema } from "../../../services/TrainingValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { GoUpload } from "react-icons/go";
import { SpinLogo } from "../../../utils/SpinLogo";
import { TCDataFun } from "../../../services/createMethod/TCDataFun";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FileUploadField } from "../../employees/medicalDep/FileUploadField";
import { useOutletContext } from "react-router-dom";

export const TrainingCertificatesForm = () => {
  // const { searchResultData } = useOutletContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { SubmitMPData } = TCDataFun();
  const [notification, setNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const { AddCourseDetails } = useContext(DataSupply); // Access AddCourseDetails from context
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course

 
  const [uploadedFileNames, setUploadedFileNames] = useState({
    trainingUpCertifi: null,
 
  });
  const [uploadeTC, setUploadTC] = useState({
    trainingUpCertifi: null,
  });
  const {
    register,
    handleSubmit,setValue,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainingCertificatesValidationSchema),
  });

  

  // const handleFileChange = async (e, type) => {
  //   const file = e.target.files[0];
  //   setValue(type, file); // Set file value for validation
  //   if (file) {
  //     if (type === "trainingUpCertifi") {
  //       await uploadDocs(file, "trainingUpCertifi", setUploadTC, "personName");

  //       setUploadedFileNames((prev) => ({
  //         ...prev,
  //         trainingUpCertifi: file.name, // Store the file name for display
  //       }));
  //     } 
  //   }
  // };

  

  const watchInducSwapUpload = watch("trainingUpCertifi", ""); // Watch the trainingUpCertifi field

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
    } else {
      // Clear values if no match
      setValue("courseName", "");
      setValue("company", "");
    }
  };


  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return ""; 
  };

  const getFileName = (url) => {
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;
    const decodedUrl = decodeURIComponent(filePath);

    const fileNameWithExtension = decodedUrl.substring(
      decodedUrl.lastIndexOf("/") + 1
    );

    return fileNameWithExtension;
  };

  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  // useEffect(() => {
  //   setValue("empID", searchResultData.empID);
  //   const fields = ["sawpEmpLtrReci", "sawpEmpLtrReq"];
  //   fields.forEach((field) =>
  //     setValue(field, getLastValue(searchResultData[field]))
  //   );
  //   if (searchResultData && searchResultData.trainingUpCertifi) {
  //     try {
  //       const parsedArray = JSON.parse(searchResultData.trainingUpCertifi);

  //       const parsedFiles = parsedArray.map((item) =>
  //         typeof item === "string" ? JSON.parse(item) : item
  //       );
  //       console.log(parsedFiles);
  //       setValue("trainingUpCertifi", parsedFiles);

  //       setUploadTC((prev) => ({
  //         ...prev,
  //         trainingUpCertifi: parsedFiles, 
  //       }));

  //       setUploadedFileNames((prev) => ({
  //         ...prev,
  //         trainingUpCertifi:
  //           parsedFiles.length > 0
  //             ? getFileName(parsedFiles[parsedFiles.length - 1].upload)
  //             : "",
  //       }));
  //     } catch (error) {
  //       console.error(`Failed to parse ${searchResultData.trainingUpCertifi}:`, error);
  //     }
    
  //   }
    
  // }, [searchResultData, setValue]);

  const handleFileChange = async (e, label) => {
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

    const currentFiles = watch(label) || [];
    setValue(label, [...currentFiles, selectedFile]);

    try {
      await uploadDocs(selectedFile, label, setUploadTC);
      setUploadedFileNames((prev) => ({
        ...prev,
        [label]: selectedFile.name, // Store just the file name
      }));
    } catch (err) {
      console.log(err);
    }
  };



























  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      const TCValue = {
        ...data,
        trainingUpCertifi:uploadeTC.trainingUpCertifi
      };
     
      console.log("Data sucessfully stored",TCValue);
      await SubmitMPData({ TCValue });
      
      // setNotification(true);
    } catch (error) {
      console.log(error);
      
      console.error("Error submitting data:", error);
    }
  };

  return (
    <section className="center flex-col gap-16 bg-[#F8F8F8]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 screen-size bg-white py-5 px-8 rounded-xl  text_size_6 text-dark_grey">

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
            <input type="text" {...register("employeeName")} className="input-field"/>
          
            {errors.employeeName && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.employeeName.message}
              </p>
            )} </div>

<div className="mb-2">
            <label className="text_size_5">Employee Badge Number</label>
         
            <input
            type="text"
              {...register("empBadgeNo")}
              className="input-field"
            />
            {errors.empBadgeNo && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.empBadgeNo.message}
              </p>
            )}
</div>
<div className="mb-2">
              <label className="text_size_5">Department</label>
            <input
              {...register("department")}
              className="input-field"
              type="text"
            />
            {errors.department && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.department.message}
              </p>
            )}
            </div>


            <div className="mb-4">
      <label htmlFor="courseSelect" className="font-semibold">
        Select Course:
      </label>
      <select
        {...register("courseCode")}
        onChange={handleCourseSelectChange}
        className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
      >
        <option value="">Training Course Select</option>
        {AddCourseDetails.map((course) => (
          <option key={course.courseSelect} value={course.courseSelect}>
            {course.courseSelect}
          </option>
        ))}
      </select>
    </div>

    {/* Course Name */}
    <div className="mb-4">
      <label className="text_size_5">Training Course Name</label>
      <select
        {...register("courseName")}
        className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
      >
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
    </div>

    {/* Training Company */}
    <div className="mb-4">
      <label className="text_size_5">Training Company</label>
      <select
        {...register("company")}
        className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
      >
        {selectedCourse && Array.isArray(selectedCourse.company) ? (
          selectedCourse.company.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))
        ) : (
          <option value={selectedCourse?.company || ""}>
            {selectedCourse?.company || "No Company Available"}
          </option>
        )}
      </select>
    </div>
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
            )}</div>


<FileUploadField
        label="Upload File"
        onChangeFunc={(e) => handleFileChange(e, "trainingUpCertifi")}
        register={register}
        name="trainingUpCertifi"
        error={errors}
        fileName={
          uploadedFileNames.trainingUpCertifi ||
          extractFileName(watchInducSwapUpload)
        }
      />
{/* 
<div>
<p className="mb-2">Upload</p>
            <label className="flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
            Training Certificate
              <input
                type="file"
                {...register("trainingUpCertifi")}
                onChange={(e) => handleFileChange(e, "trainingUpCertifi")}
                className="hidden"
                accept="application/pdf, image/png, image/jpeg"
              />
              <span className="ml-2">
                <GoUpload/>
              </span>
            </label>
            {uploadedFileNames.trainingUpCertifi && (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.trainingUpCertifi}
              </p>
            )}
          </div> */}
       </div>
        <div className="center py-5">
          <button type="submit" className="primary_btn">
            Submit
          </button>
        </div>
        {notification && (
        <SpinLogo
          text="Dependent Insurance Info details save successfully"
          notification={notification}
          path="/training"
        />
      )}
      </form>
    </section>
  );
}; 
