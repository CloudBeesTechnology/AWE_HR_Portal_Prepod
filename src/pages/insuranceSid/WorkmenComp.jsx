import React, { useEffect, useState } from 'react';
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../utils/FormField";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { SpinLogo } from "../../utils/SpinLogo";
import { WorkmenCompSchema } from '../../services/EmployeeValidation';
import { generateClient } from "@aws-amplify/api";
import { createWorkMen } from "../../graphql/mutations";
import { listWorkMen } from "../../graphql/queries";

export const WorkmenComp = () => {
  const client = generateClient();
    const [notification, setNotification] = useState(false);
    const [insuranceData, setInsuranceData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [uploadedFileNames, setUploadedFileNames] = useState({
      workmenComUp: null,
    });
    const [uploadWCU, setUploadWCU] = useState({
      workmenComUp: [], 
    });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WorkmenCompSchema),
 
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');  // Adds leading zero if day is single digit
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
    await uploadDocs(selectedFile, label, setUploadWCU);
    setUploadedFileNames((prev) => ({
      ...prev,
      [label]: selectedFile.name, // Store just the file name
    }));
  } catch (err) {
    console.log(err);
  }
};

const onSubmit = async (data) => {
  try {

    const WCCreValue = {
      ...data,
      workmenComUp: JSON.stringify(uploadWCU.workmenComUp) 
    } 
    console.log(WCCreValue);

    const response = await client.graphql({
      query: createWorkMen,
      variables: { input: WCCreValue },
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
        query: listWorkMen,
      });
      setInsuranceData(response.data.listWorkMen.items);
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

{/* Workmen Compensation Insurance Fields */}
<h3 className="mb-5 text-lg font-bold">Workmen Compensation Insurance</h3>
<div className="relative mb-5">


    <div className="grid grid-cols-4 gap-4 items-center">
      {/* Employee Type - Dropdown */}
      <FormField
        name="empStatusType"
        label="Employee Type"
        register={register}
        type="select"
        options={[
          { value: 'OffShore', label: 'OffShore' },
          { value: 'OnShore', label: 'OnShore' },
          { value: 'General', label: 'General' },
        ]}
        errors={errors}
      />

      {/* Workmen Comp Policy Number */}
      <FormField
        name="workmenCompNo"
        label="Policy Number"
        type="text"
        placeholder="Enter Workmen Comp Policy No"
        register={register}
        errors={errors}
      />

      {/* Workmen Comp Expiry Date */}
      <FormField
        name="workmenCompExp"
        label="Expiry Date"
        type="date"
        register={register}
        errors={errors}
        // className="mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
      />

      {/* File Upload Field */}
      <div className="mb-2 relative">
    <FileUploadField
      label="Upload File"
      onChangeFunc={(e) => handleFileChange(e, "workmenComUp")}
      register={register}
      name="workmenComUp"
      error={errors}
    />

<div className='absolute'>
    {uploadedFileNames.workmenComUp && (
      <span className="text-sm text-grey ">
        {uploadedFileNames.workmenComUp}
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
          text="Workmen Compensation Saved Successfully"
          notification={notification}
          path="/insuranceHr/workmenComp"
        />
      )}
{/* View Insurance Info Section */}
<div className="mt-20">
<p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>
        {insuranceData.length > 0 ? (
          <table className="w-full text-center">
            <thead className="bg-[#939393] text-white">
              <tr>
              <th className="pl-4 py-4 rounded-tl-lg">Employee Type</th>
              <th className="pl-4 py-4">Policy Number</th>
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
                  <td className="pl-4 py-4">{data.empStatusType}</td>
                  <td className="pl-4 py-4">{data.workmenCompNo}</td>
                  <td className="py-4 px-4">{formatDate(data?.workmenCompExp || "N/A")}</td>
                  <td className="pl-4 py-4">
                    {data.workmenComUp ? (
                      <a
                        href={data.workmenComUp}
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

