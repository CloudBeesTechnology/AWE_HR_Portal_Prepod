import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuPlusSquare } from "react-icons/lu";
import { GoUpload } from "react-icons/go";
import { InsuranceInfoSchema } from "../../../services/EmployeeValidation";

export const InsuranceInfo = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InsuranceInfoSchema),
    defaultValues: {
      groupHSDetails: [{ policyNumber: "", expiryDate: "" }], // Group H&S initialized
      workmenCompDetails: [{ policyNumber: "", expiryDate: "" }], // Workmen Compensation initialized
      travellingDetails: [{ policyNumber: "", expiryDate: "" }], // Travelling Insurance initialized
      personalAccidentDetails: [{ policyNumber: "", expiryDate: "" }], // Personal Accident initialized
    },
  });

  // Using useFieldArray for each set of insurance details
  const { fields: groupHSFields, append: appendGroupHS } = useFieldArray({
    control,
    name: "groupHSDetails",
  });

  const { fields: workmenCompFields, append: appendWorkmenComp } = useFieldArray({
    control,
    name: "workmenCompDetails",
  });

  const { fields: travellingFields, append: appendTravelling } = useFieldArray({
    control,
    name: "travellingDetails",
  });

  const { fields: personalAccidentFields, append: appendPersonalAccident } = useFieldArray({
    control,
    name: "personalAccidentDetails",
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setValue("insInfUpload", file);

    if (file) {
      try {
        await upload(file);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }
  };

  const upload = async (file) => {
    try {
      const result = await uploadData({
        path: `insInfUpload/AWE001/${file.name}`,
        data: file,
      }).result;
      const filePath = result.path;
      const encodedFilePath = encodeURIComponent(filePath);
      const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
      console.log("Uploaded successfully. File URL:", fileUrl);
    } catch (error) {
      console.log("Error uploading:", error);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data", data);
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]">

{/* Group H&S Insurance Fields */}
<h3 className="mb-5 text-lg font-bold">Group H&S Insurance</h3>

<div className="relative mb-10">

<div className="grid grid-cols-3 gap-5 text-grey text_size_5">
  <label>Policy Number</label>
  <label>Expiry Date</label>
  <label>Upload</label>
  <div></div>
</div>

{groupHSFields.map((field, index) => (
  <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
    
    <input
      type="text"
      {...register(`groupHSDetails.${index}.policyNumber`)}
      placeholder="Enter H&S Policy Number"
      className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
    />

    <input
      type="date"
      {...register(`groupHSDetails.${index}.expiryDate`)}
      className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
    />

    <label className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
    
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
      />
      <span className="ml-2">
        <GoUpload />
      </span>
    </label>

    {index === 0 && (
      <button
        type="button"
        onClick={() => appendGroupHS({ policyNumber: "", expiryDate: "" })}
        className="text-medium_grey text-[25px] absolute -right-8 mt-2"
      >
        <LuPlusSquare />
      </button>
    )}
    
  </div>
  
))}
</div>

      {/* Workmen Compensation Insurance Fields */}
      <h3 className=" mb-5 text-lg font-bold">Workmen Compensation Insurance</h3>
      <div className="relative mb-10 ">

      <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
        <label>Policy Number</label>
        <label>Expiry Date</label>
        <label>Upload</label>
        <div></div>
      </div>
      {workmenCompFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
          <input
            type="text"
            {...register(`workmenCompDetails.${index}.policyNumber`)}
            placeholder="Enter Workmen Comp Policy Number"
            className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />
          <input
            type="date"
            {...register(`workmenCompDetails.${index}.expiryDate`)}
            className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />

    <label className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
    
    <input
      type="file"
      onChange={handleFileChange}
      className="hidden"
      accept=".pdf"
    />
    <span className="ml-2">
      <GoUpload />
    </span>
  </label>

  {index === 0 && (
    <button
      type="button"
      onClick={() => appendWorkmenComp({ policyNumber: "", expiryDate: "" })}
      className="text-medium_grey text-[25px] absolute -right-8 mt-2"
    >
      <LuPlusSquare />
    </button>
  )}
  
</div>

))}
</div>


      {/* Travelling Insurance Fields */}
      <h3 className="mb-5 text-lg font-bold">Travelling Insurance</h3>
      <div className="relative mb-10">

      <div className="grid grid-cols-3 gap-5  text-grey text_size_5">
        <label>Policy Number</label>
        <label>Expiry Date</label>
        <label>Upload</label>
      <div></div>
      </div>
      {travellingFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
          <input
            type="text"
            {...register(`travellingDetails.${index}.policyNumber`)}
            placeholder="Enter Travelling Policy Number"
            className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />
          <input
            type="date"
            {...register(`travellingDetails.${index}.expiryDate`)}
            className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />
    <label className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
    
    <input
      type="file"
      onChange={handleFileChange}
      className="hidden"
      accept=".pdf"
    />
    <span className="ml-2">
      <GoUpload />
    </span>
  </label>

  {index === 0 && (
    <button
      type="button"
      onClick={() => appendTravelling({ policyNumber: "", expiryDate: "" })}
      className="text-medium_grey text-[25px] absolute -right-8 mt-2"
    >
      <LuPlusSquare />
    </button>
  )}
  
</div>

))}
</div>

      {/* Personal Accident Insurance Fields */}
      <h3 className="mb-3 mt-6 text-lg font-bold">Personal Accident Insurance</h3>
      <div className="relative mb-10">

      <div className="grid grid-cols-3 gap-5 text-grey text_size_5">
        <label>Policy Number</label>
        <label>Expiry Date</label>
        <label>Upload</label>
  <div></div>

      </div>
      {personalAccidentFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
          <input
            type="text"
            {...register(`personalAccidentDetails.${index}.policyNumber`)}
            placeholder="Enter Personal Accident Policy Number"
            className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />
          <input
            type="date"
            {...register(`personalAccidentDetails.${index}.expiryDate`)}
            className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
          />
    <label className="w-full mt-2 flex items-center px-3 py-4 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
    
    <input
      type="file"
      onChange={handleFileChange}
      className="hidden"
      accept=".pdf"
    />
    <span className="ml-2">
      <GoUpload />
    </span>
  </label>

  {index === 0 && (
    <button
      type="button"
      onClick={() => appendPersonalAccident({ policyNumber: "", expiryDate: "" })}
      className="text-medium_grey text-[25px] absolute -right-8 mt-2"
    >
      <LuPlusSquare />
    </button>
  )}
  
</div>

))}
</div>

      {/* Submit Button */}
      <div className="center my-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};



