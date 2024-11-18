import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {blastingPaintingValidationSchema} from '../../../services/TrainingValidation'
import { uploadData } from "aws-amplify/storage";

export const BlastingPaintingForm = () => {
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blastingPaintingValidationSchema),
  });
  const [uploadedFiles, setUploadedFiles] = useState('');
  const [blastingUploads, setblastingUploads] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input element

  // Function to handle file upload button click
  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input's click event
  };

  // Function to handle file input change
  const handleFileChange = async (e, type) => {
    const files = e.target.files; // Get the file list
    const file = files[0]; // Get the first file

    // Set the uploaded file name for display
    if (file) {
      setUploadedFiles(file.name);
      setValue(type, file); // Set the file value for validation

      if (type === "blastingUpload") {
        await  blastingUpload(file); // Call the  blastingUpload function
      }
    } else {
      setUploadedFiles(''); // Reset if no file is selected
    }
  };

  // Function to upload medical report
  const blastingUpload = async (file) => {
    try {
      const result = await uploadData({
        path: `blastingUpload/${file.name}`,
        data: file,
      }).result;
      const filePath = result.path;
      const encodedFilePath = encodeURIComponent(filePath);
      const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
      console.log("Certificate uploaded successfully. File URL:", fileUrl);
      setblastingUploads(fileUrl);
    } catch (error) {
      console.log("Error uploading certificate:", error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
   <section className=' bg-white p-10 rounded-lg'>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <select {...register('employeeBadgeNumber')} className="input-field">
            <option value="">Select Badge Number</option>
            <option value="AWE025">AWE025</option>
          </select>
          {errors.employeeBadgeNumber && (
            <p className="text-[red] text-[13px] mt-1">{errors.employeeBadgeNumber.message}</p>
          )}
         </div>
         <div>
         <label className="text_size_5">Employee Name</label>
          <input
            {...register('employeeName')}
            className="input-field"
            type="text"
          />
          {errors.employeeName && (
            <p className="text-[red] text-[13px] mt-1">{errors.employeeName.message}</p>
          )}
         </div>

          <div>
          <label className="text_size_5">Department</label>
          <select {...register('department')} className="input-field">
            {/* <option value="">Select Department</option>
            <option value="Blasting/Painting">Blasting/Painting</option> */}
          </select>
          {errors.department && (
            <p className="text-[red] text-[13px] mt-1">{errors.department.message}</p>
          )}
          </div>
          <div>  <label className="text_size_5">Position</label>
          <input
            {...register('position')}
            className="input-field"
            type="text"
          />
          {errors.position && (
            <p className="text-[red] text-[13px] mt-1">{errors.position.message}</p>
          )}</div>
         <div>
         <label className="text_size_5">Blasting/Painting Badge Number</label>
          <input
            {...register('blastingPaintingBadgeNumber')}
            className="input-field"
            type="text"
          />
          {errors.blastingPaintingBadgeNumber && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingPaintingBadgeNumber.message}</p>
          )}
         </div>
<div>
  
<label className="text_size_5">Blasting/Painting Assessment Start Date</label>
          <input
            {...register('blastingPaintingAssessmentStartDate')}
            className="input-field"
            type="date"
          />
          {errors.blastingPaintingAssessmentStartDate && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingPaintingAssessmentStartDate.message}</p>
          )}
</div>
         <div>
         <label className="text_size_5">Blasting/Painting Assessment End Date</label>
          <input
            {...register('blastingPaintingAssessmentEndDate')}
            className="input-field"
            type="date"
          />
          {errors.blastingPaintingAssessmentEndDate && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingPaintingAssessmentEndDate.message}</p>
          )}
         </div>
<div>
  

<label className="text_size_5">Blasting/Painting Qualification Expiry</label>
          <input
            {...register('blastingPaintingQualificationExpiry')}
            className="input-field"
            type="date"
          />
          {errors.blastingPaintingQualificationExpiry && (
            <p className="text-[red] text-[13px] mt-1">{errors.blastingPaintingQualificationExpiry.message}</p>
          )}
</div>
         <div>
         <label className="text_size_5">Remarks for Blasting/Painting Qualification</label>
          <input
            {...register('blastingPaintingRemarks')}
            className="input-field"
            type="text"
          />
        </div>
     

        <div>
        <p className='text_size_5'>Upload </p>
        <button
          type="button"
          onClick={handleFileUploadClick}
          className="mt-2 w-full flex items-center text-grey px-3 py-3 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer"
        >
          Upload Blasting/Painting Certificates
        </button>
        <input
          {...register("blastingUpload")}
          ref={fileInputRef}
          className="input-field hidden"
          type="file"
          accept="application/pdf" // Only accept PDFs
          onChange={(e) => handleFileChange(e, "blastingUpload")} // Handle file selection
        />
        {/* Display the selected file name */}
        {uploadedFiles && <p className='text-grey text-sm'>{uploadedFiles}</p>}

        {errors.blastingUpload && (
          <p className="text-[red] text-[13px] mt-1">
            {errors.blastingUpload.message}
          </p>
        )}
      </div>
      </div>

      <div className='center'>
      <button type="submit" className="primary_btn">
        Submit
      </button>
      </div>
    </form>
   </section>
  );
};

