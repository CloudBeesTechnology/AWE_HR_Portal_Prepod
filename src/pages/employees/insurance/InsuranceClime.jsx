import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiPlusSquare } from 'react-icons/fi';
import { GoUpload } from 'react-icons/go';
import logo from "../../../assets/logo/logo.png";
import { ClaimInsuranceSchema } from "../../../services/EmployeeValidation";

export const InsuranceClime = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const [notification, setNotification] = useState(false);
  const [inputFields, setInputFields] = useState([1]); // Initialize with 1 row of fields

  const handleAddFileClick = () => {
    setInputFields([...inputFields, inputFields.length + 1]); // Add new set of fields
  };

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0]; // Use the first file for single upload
    setValue(`claimUpload[${index}]`, file); // Dynamically set value for each field

    if (file) {
      try {
        await upload(file); // Only use the upload function
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }
  };

  const upload = async (file) => {
    try {
      const result = await uploadData({
        path: `claimUpload/AWE001/${file.name}`,
        data: file,
      }).result;
      const filePath = result.path;
      const encodedFilePath = encodeURIComponent(filePath);
      const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
      console.log("Uploaded successfully. File URL:", fileUrl);
      setClaimUpload((prev) => [...prev, fileUrl]); // Append file URL to state
    } catch (error) {
      console.log("Error uploading:", error);
    }
  };

  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(ClaimInsuranceSchema), // Apply Yup validation schema
  });

  const onSubmit = (data) => {
    console.log('Form submitted with data:', data);
    setNotification(true);
    setTimeout(() => {
      navigate("/employee");
    }, 3000);  
  };

  return (
    <div className="bg-[#F5F6F1CC] mx-auto p-7 py-10 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center mb-5">
        <div className='flex justify-between'>
          <h2 className="mb-5 text-[20px] font-semibold text-medium_grey">Claim Details :</h2>
          <button
            type="button"
            onClick={handleAddFileClick}
            className=" text-medium_grey mb-5 text-[25px]"
          >
            <FiPlusSquare className="" />
          </button>
        </div>

        {/* Loop through each input field set */}
        {inputFields.map((field, index) => (
          <div key={index} className="mb-5 border-b pb-5">

            {/* Claim Type */}
            <div className=" grid grid-cols-2 gap-5 form-group">
              <div className="col-span-1">
                <label htmlFor={`claim-type-${index}`} className="mb-1 text_size_5">Type of Insurance Claim</label>
                <select {...register(`claimType[${index}]`)} id={`claim-type-${index}`} className="select-custom input-field ">
                  <option value=""></option>
                  <option value="Group H&S Insurance">Group H&S Insurance</option>
                  <option value="Workmen Compensation Insurance">Workmen Compensation Insurance</option>
                  <option value="Travelling Insurance">Travelling Insurance</option>
                  <option value="Personal Accident Insurance">Personal Accident Insurance</option>
                </select>
                {errors.claimType?.[index] && <p className="text-[red] text-[13px] mt-1">{errors.claimType[index]?.message}</p>}
              </div>
              <div className="col-span-1">
                <label htmlFor={`employee-badge-number-${index}`} className="text_size_5">Employee Badge Number</label>
                <input
                  type="text"
                  className="input-field"
                  {...register(`employeeBadgeNumber[${index}]`)}
                />
                {errors.employeeBadgeNumber?.[index] && (
                  <p className="text-[red] text-[12px]">{errors.employeeBadgeNumber[index]?.message}</p>
                )}
              </div>
            </div>

            {/* Insurance Claim For, Employee Badge Number, and Date Reported */}
            <div className="grid grid-cols-2 gap-5 form-group">
              <div className="col-span-1">
                <label htmlFor={`date-submitted-${index}`} className="mb-1 text_size_5">Insurance Claim for</label>
                <select {...register(`dateSubmitted[${index}]`)} id={`date-submitted-${index}`} className="input-field select-custom">
                  <option></option>
                  <option value="Employee Name">Employee</option>
                  <option value="Spouse Name">Spouse</option>
                  <option value="Child Name">Child</option>
                </select>
                {errors.dateSubmitted?.[index] && <p className="text-[red] text-[13px] mt-1">{errors.dateSubmitted[index]?.message}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor={`employee-badge-number-${index}`} className="text_size_5">Name</label>
                <input
                  type="text"
                  className="input-field"
                  {...register(`employeeBadgeNumber[${index}]`)}
                  placeholder="Enter Name"
                />
                {errors.employeeBadgeNumber?.[index] && (
                  <p className="text-[red] text-[12px]">{errors.employeeBadgeNumber[index]?.message}</p>
                )}
              </div>


              <div className="col-span-1">
                <label htmlFor={`date-reported-${index}`} className="mb-1 text_size_5">Date Reported to Insurance Company</label>
                <input
                  {...register(`dateReported[${index}]`)}
                  type="date"
                  id={`date-reported-${index}`}
                  className="input-field"
                />
                {errors.dateReported?.[index] && <p className="text-[red] text-[13px] mt-1">{errors.dateReported[index]?.message}</p>}
              </div>

              {/* File Upload */}
              <div className="col-span-1 max-w-[300px]">
                <p className='mb-2 text_size_5'>Upload</p>
                <label className="flex items-center px-3 py-3 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <span className="ml-2">
                    <GoUpload />
                  </span>
                </label>
                {errors.claimUpload?.[index] && (
                  <p className="text-[red] text-xs mt-1">{errors.claimUpload[index]?.message}</p>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor={`payment-received-${index}`} className="mb-1 text_size_5">Date of Payment Received from Insurance Company</label>
                <input
                  {...register(`paymentReceived[${index}]`)}
                  type="date"
                  id={`payment-received-${index}`}
                  className="input-field"
                />
                {errors.paymentReceived?.[index] && <p className="text-[red] text-[13px] mt-1">{errors.paymentReceived[index]?.message}</p>}
              </div>

                          {/* File Upload */}
                          <div className="col-span-1 max-w-[300px]">
                <p className='mb-2 text_size_5'>Upload</p>
                <label className="flex items-center px-3 py-3 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <span className="ml-2">
                    <GoUpload />
                  </span>
                </label>
                {errors.claimUpload?.[index] && (
                  <p className="text-[red] text-xs mt-1">{errors.claimUpload[index]?.message}</p>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor={`date-paid-${index}`} className="mb-1 text_size_5">Date Paid to Employee</label>
                <input
                  {...register(`datePaid[${index}]`)}
                  type="date"
                  id={`date-paid-${index}`}
                  className="input-field"
                />
                {errors.datePaid?.[index] && <p className="text-[red] text-[13px] mt-1">{errors.datePaid[index]?.message}</p>}
              </div>

                          {/* File Upload */}
                          <div className="col-span-1 max-w-[300px]">
                <p className='mb-2 text_size_5'>Upload</p>
                <label className="flex items-center px-3 py-3 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <span className="ml-2">
                    <GoUpload />
                  </span>
                </label>
                {errors.claimUpload?.[index] && (
                  <p className="text-[red] text-xs mt-1">{errors.claimUpload[index]?.message}</p>
                )}
              </div>


            </div>
          </div>
        ))}

        <div className="center">
          <button
            type="submit"
            className="primary_btn"
          >
            Submit
          </button>
        </div>

        {notification && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[70]">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-dark_grey font-semibold">Your Insurance Info Submitted Successfully</p>
              <img
                src={logo}
                alt="Logo"
                className="mt-4 cursor-pointer w-12 h-12 mx-auto animate-spin-slow"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
