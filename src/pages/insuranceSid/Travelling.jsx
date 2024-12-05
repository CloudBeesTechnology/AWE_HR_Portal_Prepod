import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { TravellingSchema } from '../../services/EmployeeValidation';
import { generateClient } from "@aws-amplify/api";
import { createTravelIns } from "../../graphql/mutations";
import { listTravelIns } from "../../graphql/queries";

export const Travelling = () => {
  const client = generateClient();

  const [uploadedFileNames, setUploadedFileNames] = useState({
    travelUp: null,
  });
  const [uploadTU, setUploadTU] = useState({
    travelUp: [], 
  });
    const [notification, setNotification] = useState(false);
    const [insuranceData, setInsuranceData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); // To track error state


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TravellingSchema),
   
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');  
  const month = (date.getMonth() + 1).toString().padStart(2, '0');  // getMonth() returns 0-11, so we add 1
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

const handleFileChange = async (e, label) => {
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
    await uploadDocs(selectedFile, label, setUploadTU);
    setUploadedFileNames((prev) => ({
      ...prev,
      [label]: selectedFile.name, 
    }));
  } catch (err) {
    console.log(err);
  }
};

  const onSubmit = async (data) => {
    try {
      const TravellCreValue = {
        ...data,
        travelUp: JSON.stringify(uploadTU.travelUp)
      } 
      console.log(TravellCreValue);
  
      const response = await client.graphql({
        query: createTravelIns,
        variables: { input: TravellCreValue },
      });
  
      console.log("Successfully submitted data:", response);
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await client.graphql({
          query: listTravelIns,
        });
        setInsuranceData(response.data.listTravelIns.items);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching insurance data:', error);
        setError('insuranceData', { message: 'Error fetching data' }); // Set error using setError
        setLoading(false);
      }
    };  
    fetchInsuranceData();
  }, []);

  return (
<form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen py-5 px-10 my-10 bg-[#F5F6F1CC]">

{/* Travelling Insurance Fields */}
<h3 className="mb-5 text-lg font-bold">Travelling Insurance</h3>
<div className="relative mb-10">
    <div  className="grid grid-cols-3 gap-4 items-center">  
      <FormField
        name="travelNo"
        type="text"
        placeholder="Enter Travelling Policy Number"
        label="Policy Number"
        register={register}
        errors={errors}
        className="mt-2 p-[12px] bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />

      {/* Travelling Expiry Date */}
      <FormField
        name="travelExp"
        type="date"
        label="Expiry Date"
        register={register}
        errors={errors}
        className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />

      {/* File Upload */}
      <div className="mb-2 relative">
    <FileUploadField
      label="Upload File"
      onChangeFunc={(e) => handleFileChange(e, "travelUp")}
      register={register}
      name="travelUp"
      error={errors}
    />
<div className='absolute'>
    {uploadedFileNames.travelUp && (
      <span className="text-sm text-grey ">
        {uploadedFileNames.travelUp}
      </span>
    )}
    </div>
    </div>
</div>
</div>

{/* Submit Button */}
<div className="center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="Travelling Info Saved Successfully"
          notification={notification}
          path="/insuranceHr/travelling"
        />
      )}

       {/* View Insurance Info Section */}
       <div className="mt-20">
       <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {loading ? (
          <p>Loading...</p>
        ) :insuranceData.length > 0 ? (
          <table className="w-full text-center">
            <thead className="bg-[#939393] text-white">
              <tr>
                <th className="pl-4 py-4 rounded-tl-lg">Policy Number</th>
                <th className="pl-4 py-4">Expiry Date</th>
                <th className="pl-4 py-4 rounded-tr-lg">Uploaded File</th>
              </tr>
            </thead>
            <tbody className="bg-white cursor-pointer">
              {insuranceData.map((data, index) => (
                <tr
                  key={index}
                  className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                >
                  <td className="pl-4 py-4">{data.travelNo}</td>  
                    <td className="py-4 px-4">{formatDate(data?.travelExp || "N/A")}</td>          
                  <td className="pl-4 py-4">
                    {data.travelUp ? (
                      <a
                        href={data.travelUp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[blue] underline"
                      >
                        View
                      </a>
                    ) : (
                      "No file uploaded"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-10">No insurance information available.</p>
        )}
      </div>
    </form>
  );
};

