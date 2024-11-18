import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrainingValidationSchema } from "../../../services/TrainingValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";

export const AddEmployeeForm = () => {

  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TrainingValidationSchema),
  });
  const [showMedicalFields, setShowMedicalFields] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState({}); // Initialize as an object
  const [uploadMedicalReports, setUploadMedicalReports] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input element
  
  // Function to toggle the visibility of medical fields
  const toggleMedicalFields = () => {
    setShowMedicalFields(prev => !prev);
  };
  
  // Function to handle file upload button click
  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input's click event
  };
  
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "medicalReport") {
        await uploadDocs(file, "medicalReport", setUploadMedicalReports, "personName");
  
        setUploadedFileName((prev) => ({
          ...prev,
          medicalReport: file.name, // Store the file name for display
        }));
      } 
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <section className="bg-[#F8F8F8] p-10 center flex-col w-full ">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/training" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
          Add Employee
          </h1>
        </article>

        <div className="flex-1">
          <SearchDisplay
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-16 mb-14 w-full bg-white px-20 py-10"
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
        <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text_size_5">Employee Badge Number</label>
          <input
            type="text"
            className={`input-field `}
            {...register("empBadgeNo")}
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
            type="text"
            className={`input-field `}
            {...register("empName")}
          />
          {errors.empName && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.empName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Department</label>
          <select className={`input-field `} {...register("department")}>
            <option value="">Select Department</option>
            <option value="Corporate">Corporate</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Accounts">Accounts</option>
            <option value="LBD">LBD</option>
            <option value="Purchasing">Purchasing</option>
            <option value="Offshore">Offshore</option>
            <option value="BLNG">BLNG</option>
            <option value="CPD">CPD</option>
            <option value="E&I">E&I</option>
          </select>
          {errors.department && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">
            Material Requisition (MR) Number
          </label>
          <input
            type="number"
            className={`input-field `}
            {...register("MRNo")}
          />
          {errors.MRNo && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.MRNo.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Course Code</label>
          <select
            className={`input-field `}
            {...register("traineeCourseCode")}
          >
            <option value="">Select Course Code</option>
            <option value="A3333">A3333</option>
            {/* Add course code options here */}
          </select>
          {errors.traineeCourseCode && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeCourseCode.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Course Name</label>
          <select
            className={`input-field `}
            {...register("traineeCourseName")}
          >
            <option value="">Select Course Name</option>
            <option value="Safety Training">Safety Training</option>

            {/* Add course name options here */}
          </select>
          {errors.traineeCourseName && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeCourseName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Company</label>
          <select className={`input-field `} {...register("traineeCompany")}>
            <option value="">Select Company</option>
            <option value="CBT">CBT</option>
            {/* Add company options here */}
          </select>
          {errors.traineeCompany && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeCompany.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Course Fee</label>
          <input
            type="number"
            className={`input-field `}
            {...register("traineeCourseFee")}
          />
          {errors.traineeCourseFee && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeCourseFee.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Start Date</label>
          <input
            type="date"
            className={`input-field `}
            {...register("traineeSD")}
          />
          {errors.traineeSD && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeSD.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training End Date</label>
          <input
            type="date"
            className={`input-field `}
            {...register("traineeED")}
          />
          {errors.traineeED && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeED.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Purchase Order (PO) Number</label>
          <input
            type="text"
            className={`input-field `}
            {...register("purchaseONo")}
          />
          {errors.purchaseONo && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.purchaseONo.message}
            </p>
          )}
        </div>

        <div>
          <label className="text_size_5">Training Status</label>
          <select className={`input-field `} {...register("traineeStatus")}>
            <option value="">Select Status</option>
            <option value="Mandatory">Mandatory</option>
            <option value="Supplementary">Supplementary</option>
            {/* Add status options here */}
          </select>
          {errors.traineeStatus && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.traineeStatus.message}
            </p>
          )}
        </div>
        </div>

<div className="">
<div className="col-span-2 flex items-center gap-5 my-5">
        <div
          className={`flex items-center border w-[12px] h-[12px] cursor-pointer ${showMedicalFields ? 'bg-[green] border-none' : 'bg-gray-200'}`}
          onClick={toggleMedicalFields}
        > 
        </div>if Medical Required
      </div>

      {/* Conditionally render input fields if showMedicalFields is true */}
      {showMedicalFields && (
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text_size_5">Medical Name</label>
            <input
              type="text"
              className={`input-field`}
              {...register("medicalName")}
            />
            {errors.medicalName && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.medicalName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text_size_5">Medical Expiry</label>
            <input
              type="date"
              className={`input-field`}
              {...register("medicalExpiry",)}
            />
            {errors.medicalExpiry && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.medicalExpiry.message}
              </p>
            )}
          </div>

          <div>
            <label className="text_size_5">Medical Appointment Date</label>
            <input
              type="date"
              className={`input-field`}
              {...register("medicalAppointDate")}
            />
            {errors.medicalAppointDate && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.medicalAppointDate.message}
              </p>
            )}
          </div>
          <div>
    <p className='text_size_5'>Upload</p>
    <button
      type="button"
      onClick={handleFileUploadClick}
      className="mt-2 w-full flex items-center px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
    >
      Upload Medical Report
    </button>
    <input
      {...register("medicalReport")}
      ref={fileInputRef}
      className="input-field hidden"
      type="file"
      accept="application/pdf" // Only accept PDFs
      onChange={(e) => handleFileChange(e, "medicalReport")} // Handle file selection
    />
    {/* Display the selected file name */}
    {uploadedFileName.medicalReport && (
      <p className='text-grey text-sm'>{uploadedFileName.medicalReport}</p>
    )}
  </div>

        </div>
      )}
    </div>

        <div className="col-span-2 flex justify-center">
          <button type="submit" className="primary_btn">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
