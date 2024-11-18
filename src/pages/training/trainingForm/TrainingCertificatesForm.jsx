import React, { useEffect, useRef,useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainingCertificatesValidationSchema } from "../../../services/TrainingValidation";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { GoUpload } from "react-icons/go";
import { SpinLogo } from "../../../utils/SpinLogo";
import { TCDataFun } from "../../../services/createMethod/TCDataFun";

export const TrainingCertificatesForm = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { SubmitMPData } = TCDataFun();
  const [notification, setNotification] = useState(false);

  const [uploadedFileNames, setUploadedFileNames] = useState({
    trainingUpCertifi: null,
 
  });
  const [uploadeTC, setUploadTC] = useState({
    trainingUpCertifi: null,
  });
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainingCertificatesValidationSchema),
  });
  const fileInputRef = useRef(null); // Reference to the file input element
 
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "trainingUpCertifi") {
        await uploadDocs(file, "trainingUpCertifi", setUploadTC, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          trainingUpCertifi: file.name, // Store the file name for display
        }));
      } 
    }
  };

  
  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      const TCValue = {
        ...data,
        trainingUpCertifi:uploadeTC.trainingUpCertifi
      };
     
      await SubmitMPData({ TCValue });
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`GraphQL Error ${index + 1}:`, err.message);
          if (err.extensions) {
            console.error("Error Extensions:", err.extensions);
          }
        });
      }
    
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

            <div className="mb-2">
            <label className="text_size_5">Training Course Code</label>
            <input
              type="text"
              className={`input-field `}
              {...register("courseCode")}
            />
            {errors.courseCode && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.courseCode.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="text_size_5">Training Course Name</label>
            <input
              type="text"
              className={`input-field`}
              {...register("courseName")}
            />
            {errors.courseName && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.courseName.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="text_size_5">Training Company</label>
            <input
              type="text"
              className={`input-field `}
              {...register("company")}
            />
            {errors.company && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.company.message}
              </p>
            )}
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

<div>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
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
            {/* Display uploaded file name */}
            {uploadedFileNames.trainingUpCertifi && (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.trainingUpCertifi}
              </p>
            )}
          </div>
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
