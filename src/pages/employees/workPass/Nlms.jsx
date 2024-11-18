import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NlmsEmpSchema } from '../../../services/EmployeeValidation';
import { uploadDocs } from '../../../services/uploadDocsS3/UploadDocs';
import { SpinLogo } from '../../../utils/SpinLogo';
import { FileUploadField } from '../medicalDep/FileUploadField';
import { FormField } from '../../../utils/FormField';
import { UpdateNlmsData } from '../../../services/updateMethod/UpdateNlmsData';
import { DataSupply } from '../../../utils/DataStoredContext';
import { useOutletContext } from 'react-router-dom';

export const Nlms = () => {
  const { searchResultData } = useOutletContext();
  const { DNData } = useContext(DataSupply);
  const { uploadNlmsFun } = UpdateNlmsData();

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  const [uploadedFileNames, setUploadedFileNames] = useState({
    nlmsEmpUpload: null,
  });
  const [uploadNlms, setUploadNlms] = useState({
    nlmsEmpUpload: [],
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(NlmsEmpSchema),
  });
  const watchInducNlmsUpload = watch("nlmsEmpUpload", ""); // Watch the nlmsEmpUpload field

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      return url.split("/").pop(); // Extract the file name from URL
    }
    return "";
  };

  // Move getLastValue out of useEffect for readability
  const getLastValue = (value) => Array.isArray(value) ? value[value.length - 1] : value;

  useEffect(() => {
    setValue('empID', searchResultData.empID);

    const fields = [
      'nlmsEmpApproval', 'nlmsEmpSubmit', 'nlmsEmpSubmitRefNo',
      'nlmsEmpUpload', 'nlmsEmpValid', 'nlmsRefNo', 'permitType',
    ];

    fields.forEach((field) => setValue(field, getLastValue(searchResultData[field])));

    if (searchResultData?.nlmsEmpUpload) {
      try {
        const parsedFiles = JSON.parse(searchResultData.nlmsEmpUpload).map((item) =>
          typeof item === 'string' ? JSON.parse(item) : item
        );

        setValue('nlmsEmpUpload', parsedFiles);
        setUploadNlms({ nlmsEmpUpload: parsedFiles });
        setUploadedFileNames({
          nlmsEmpUpload: parsedFiles.length > 0
            ? parsedFiles[parsedFiles.length - 1].upload.split('/').pop()
            : '',
        });
      } catch (error) {
        console.error('Error parsing nlmsEmpUpload:', error);
      }
    }
  }, [searchResultData, setValue]);

  const handleFileChange = async (e, label) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      // Update error state rather than showing an alert
      alert('Upload must be a PDF or image (JPG, JPEG, PNG)');
      return;
    }

    try {
      await uploadDocs(selectedFile, label, setUploadNlms);
      setUploadedFileNames({ [label]: selectedFile.name });
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-CA') : null;
  };

  const onSubmit = async (data) => {
    try {
      const matchedEmployee = DNData.find((val) => val.empID === data.empID);

      const DoeValue = {
        ...data,
        nlmsEmpSubmit: formatDate(data.nlmsEmpSubmit),
        nlmsEmpApproval: formatDate(data.nlmsEmpApproval),
        nlmsEmpValid: formatDate(data.nlmsEmpValid),
        nlmsEmpUpload: JSON.stringify(uploadNlms.nlmsEmpUpload),
        id: matchedEmployee?.id || null,
      };

      await uploadNlmsFun({ DoeValue });
      setShowTitle('Work Pass NLMS Data Stored Successfully');
      setNotification(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]">
      {/* Employee ID Field */}
      <div className="flex justify-end items-center">
        <div className="max-w-sm">
          <FormField
            label="Employee ID"
            register={register}
            name="empID"
            type="text"
            placeholder="Enter Employee ID"
            errors={errors}
          />
        </div>
      </div>

      {/* Other Fields */}
      <div className="grid grid-cols-2 mt-10 gap-5">
        <FormField
          label="Type of Work Permit Application"
          register={register}
          name="permitType"
          type="select"
          options={[
            { value: '', label: '' },
            { value: 'Foreign Worker License (LPA)', label: 'Foreign Worker License (LPA)' },
            { value: 'Foreign Worker License (SAWP)', label: 'Foreign Worker License (SAWP)' },
            // Add remaining options here
          ]}
          errors={errors}
        />

        <FormField label="Date Of Submission" register={register} name="nlmsEmpSubmit" type="date" errors={errors} />
        <FormField label="Submission Reference Number" register={register} name="nlmsEmpSubmitRefNo" type="text" errors={errors} />
        <FormField label="Date Of Approval" register={register} name="nlmsEmpApproval" type="date" errors={errors} />
        <FormField label="LD Reference Number" register={register} name="nlmsRefNo" type="text" errors={errors} />
        <FormField label="Valid Until" register={register} name="nlmsEmpValid" type="date" errors={errors} />
        
        <FileUploadField
          label="Upload File"
          onChangeFunc={(e) => handleFileChange(e, 'nlmsEmpUpload')}
          name="nlmsEmpUpload"
          register={register}
          error={errors}
          fileName={uploadedFileNames.nlmsEmpUpload ||
                    extractFileName(watchInducNlmsUpload)
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center my-10">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/employee"
        />
      )}
    </form>
  );
};
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { NlmsEmpSchema } from '../../../services/EmployeeValidation';
// import { uploadDocs } from '../../../services/uploadDocsS3/UploadDocs';
// import { SpinLogo } from '../../../utils/SpinLogo';
// import { FileUploadField } from '../medicalDep/FileUploadField';
// import { FormField } from '../../../utils/FormField';
// import { UpdateNlmsData } from '../../../services/updateMethod/UpdateNlmsData';
// import { DataSupply } from '../../../utils/DataStoredContext';
// import { useOutletContext } from 'react-router-dom';

// export const Nlms = () => {
//   const { searchResultData } = useOutletContext();
//   const { DNData } = useContext(DataSupply);
//   const { uploadNlmsFun } = UpdateNlmsData();

//   const [notification, setNotification] = useState(false);
//   const [showTitle, setShowTitle] = useState('');
//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     nlmsEmpUpload: null,
//   });
//   const [uploadNlms, setUploadNlms] = useState({
//     nlmsEmpUpload: [],
//   });

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(NlmsEmpSchema),
//   });
//   const watchInducNlmsUpload = watch("nlmsEmpUpload", ""); // Watch the nlmsEmpUpload field

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);
  
//   const extractFileName = (url) => {
//     if (typeof url === "string" && url) {
//       return url.split("/").pop(); // Extract the file name from URL
//     }
//     return ""; 
//   };

//   useEffect(() => {
//     setValue('empID', searchResultData.empID);
//     const fields = [
//       'nlmsEmpApproval', 'nlmsEmpSubmit', 'nlmsEmpSubmitRefNo',
//       'nlmsEmpUpload', 'nlmsEmpValid', 'nlmsRefNo', 'permitType',
//     ];

//     fields.forEach((field) => setValue(field,getLastValue(searchResultData[field])));
//     const getLastValue = (value) =>
//       Array.isArray(value) ? value[value.length - 1] : value;
  
//     if (searchResultData?.nlmsEmpUpload) {
//       try {
//         const parsedFiles = JSON.parse(searchResultData.nlmsEmpUpload).map((item) =>
//           typeof item === 'string' ? JSON.parse(item) : item
//         );

//         setValue('nlmsEmpUpload', parsedFiles);
//         setUploadNlms({ nlmsEmpUpload: parsedFiles });
//         setUploadedFileNames({
//           nlmsEmpUpload: parsedFiles.length > 0
//             ? parsedFiles[parsedFiles.length - 1].upload.split('/').pop()
//             : '',
//         });
//       } catch (error) {
//         console.error('Error parsing nlmsEmpUpload:', error);
//       }
//     }
//   }, [searchResultData, setValue]);

//   const handleFileChange = async (e, label) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert('Upload must be a PDF or image (JPG, JPEG, PNG)');
//       return;
//     }

//     try {
//       await uploadDocs(selectedFile, label, setUploadNlms);
//       setUploadedFileNames({ [label]: selectedFile.name });
//     } catch (err) {
//       console.error('Error uploading file:', err);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const matchedEmployee = DNData.find((val) => val.empID === data.empID);

//       const formatDate = (date) =>
//         date ? new Date(date).toLocaleDateString('en-CA') : null;

//       const DoeValue = {
//         ...data,
//         nlmsEmpSubmit: formatDate(data.nlmsEmpSubmit),
//         nlmsEmpApproval: formatDate(data.nlmsEmpApproval),
//         nlmsEmpValid: formatDate(data.nlmsEmpValid),
//         nlmsEmpUpload: JSON.stringify(uploadNlms.nlmsEmpUpload),
//         id: matchedEmployee?.id || null,
//       };

//       await uploadNlmsFun({ DoeValue });
//       setShowTitle('Work Pass NLMS Data Stored Successfully');
//       setNotification(true);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]">
//       {/* Employee ID Field */}
//       <div className="flex justify-end items-center">
//         <div className="max-w-sm">
//           <FormField
//             label="Employee ID"
//             register={register}
//             name="empID"
//             type="text"
//             placeholder="Enter Employee ID"
//             errors={errors}
//           />
//         </div>
//       </div>

//       {/* Other Fields */}
//       <div className="grid grid-cols-2 mt-10 gap-5">
//         <FormField
//           label="Type of Work Permit Application"
//           register={register}
//           name="permitType"
//           type="select"
//           options={[
//             { value: '', label: '' },
//             { value: 'Foreign Worker License (LPA)', label: 'Foreign Worker License (LPA)' },
//             { value: 'Foreign Worker License (SAWP)', label: 'Foreign Worker License (SAWP)' },
//             // Add remaining options here
//           ]}
//           errors={errors}
//         />

//         <FormField label="Date Of Submission" register={register} name="nlmsEmpSubmit" type="date" errors={errors} />
//         <FormField label="Submission Reference Number" register={register} name="nlmsEmpSubmitRefNo" type="text" errors={errors} />
//         <FormField label="Date Of Approval" register={register} name="nlmsEmpApproval" type="date" errors={errors} />
//         <FormField label="LD Reference Number" register={register} name="nlmsRefNo" type="text" errors={errors} />
//         <FormField label="Valid Until" register={register} name="nlmsEmpValid" type="date" errors={errors} />
        
//         <FileUploadField
//           label="Upload File"
//           onChangeFunc={(e) => handleFileChange(e, 'nlmsEmpUpload')}
//           name="nlmsEmpUpload"
//           register={register}
//           error={errors}
//           fileName={ uploadedFileNames.nlmsEmpUpload ||
//                         extractFileName(watchInducNlmsUpload)
//                       }
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center items-center my-10">
//         <button type="submit" className="primary_btn">
//           Save
//         </button>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <SpinLogo
//           text={showTitle}
//           notification={notification}
//           path="/employee"
//         />
//       )}
//     </form>
//   );
// };
