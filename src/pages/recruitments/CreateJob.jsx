import { useForm } from "react-hook-form";
import { hiringJobSchema } from "../../services/Validation";
import { FormField } from "../../utils/FormField";
import { WorkDataPass } from "../employees/WorkDataPass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CreateJobFunc } from "../../services/createMethod/CreateJobFunc";
import { SpinLogo } from "../../utils/SpinLogo";
import { FileUploadField } from "../employees/medicalDep/FileUploadField";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { DeleteUploadJob } from "./workPassTrack/deleteUpload/DeleteUploadJob";
import axios from "axios";
import { getUrl } from "@aws-amplify/storage";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { DeletePopup } from "../../utils/DeletePopup";
export const CreateJob = () => {
  const { SubmitJobData } = CreateJobFunc();
  const { formattedPermissions } = useDeleteAccess();
  const { hiringJob } = WorkDataPass();
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteTitle1, setdeleteTitle1] = useState("");
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(hiringJobSchema),
  });
  const [isUploadingString, setIsUploadingString] = useState({
    uploadJobDetails: false,
  });
  const [uploadedDocs, setUploadedDocs] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const watchedJobTitle = watch("jobTitle")?.replace(/\s+/g, "");

  const extractFileName = (url) => {
    if (typeof url === "string" && url) {
      const decodedUrl = decodeURIComponent(url);
      const fileNameWithParams = decodedUrl.split("/").pop();
      return fileNameWithParams.split("?")[0].split(",")[0].split("#")[0];
    }
    return "";
  };

  const updateUploadingString = (type, value) => {
    setIsUploadingString((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleFileUpload = async (e, type) => {
    if (!watchedJobTitle) {
      alert("Please enter the Job Title before uploading files.");
      window.location.href = "/postJob";
      return;
    }

    const selectedFile = e.target.files[0];

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!selectedFile || !allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    setValue(type, selectedFile);

    if (selectedFile) {
      try {
        // Indicate upload is in progress
        updateUploadingString(type, true);

        setUploadedFileNames((prev) => ({
          ...prev,
          [type]: selectedFile.name,
        }));

        const encodedFileName = encodeURIComponent(selectedFile.name);
        const s3Path = `https://commonfiles.s3.ap-southeast-1.amazonaws.com/recruiment/applyJob/${watchedJobTitle}/${encodedFileName}`;
        setUploadedDocs(s3Path);

        const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/commonfiles/recruiment%2FapplyJob%2F${watchedJobTitle}%2F${encodedFileName}`;
        await axios.put(uploadUrl, selectedFile);

        // updateUploadingString(type, false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteMsg = () => {
    setdeletePopup(!deletePopup);
  };

  const deletedStringUpload = async (fileType, fileName) => {
    try {
      const isDeleted = await handleDeleteFile(
        fileType,
        fileName,
        watchedJobTitle
      );
      const isDeletedArrayUploaded = await DeleteUploadJob(
        fileType,
        fileName,
        watchedJobTitle,
        setUploadedFileNames,
        setUploadedDocs,
        setIsUploadingString
      );

      if (!isDeleted || isDeletedArrayUploaded) {
        console.error(
          `Failed to delete file: ${fileName}, skipping UI update.`
        );
        return;
      }
      setdeleteTitle1(`${fileName}`);
      handleDeleteMsg();

      setUploadedFileNames((prev) => {
        const updatedNames = { ...prev };
        delete updatedNames[fileType];
        return updatedNames;
      });

      setUploadedDocs(null);
    } catch (error) {
      // console.error("Error deleting file:", error);
      alert("Error processing the file deletion.");
    }
  };

  const onSubmit = handleSubmit((data) => {
    // console.log(data);

    try {
      const storedvalue = {
        ...data,
        uploadJobDetails: uploadedDocs,
      };
      // console.log(storedvalue);

      SubmitJobData({ jobValue: storedvalue });
      setShowTitle("Posted Job successfully");
      setNotification(true);
    } catch (error) {
      console.log(error);
    }
  });

  const requiredPermissions = ["Hiring Job"];

  const access = "Recruitment";

  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10">
      <div className="w-full flex items-center gap-5 mb-10">
        <Link to="/hiringJob" className="text-xl text-grey">
          <FaArrowLeft />
        </Link>
        <h6 className="text-center flex-1 mt-2 text_size_2 uppercase">
          Job Details
        </h6>
      </div>

      <div className="form-group flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-5 ">
          {hiringJob.map((field, index) => {
            return (
              <div key={index}>
                <FormField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  register={register}
                  errors={errors}
                />
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2 form-group">
          <label className="mb-1 text_size_5">Job description</label>
          <textarea
            {...register("jobDesc")}
            className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
            rows="1"
          ></textarea>
          {errors.jobDesc && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.jobDesc.message}
            </p>
          )}
        </div>
        <div>
          <FileUploadField
            label="Upload Job Document"
            register={register}
            fileKey="uploadJobDetails"
            handleFileUpload={handleFileUpload}
            uploadedFileNames={uploadedFileNames}
            deletedStringUpload={deletedStringUpload}
            isUploadingString={isUploadingString}
            error={errors?.uploadJobDetails}
            formattedPermissions={formattedPermissions}
            requiredPermissions={requiredPermissions}
            access={access}
          />
        </div>

        <div className="w-full center">
          <button className="primary_btn" onClick={onSubmit}>
            Post
          </button>
        </div>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/hiringJob"
        />
      )}
      {deletePopup && (
        <DeletePopup handleDeleteMsg={handleDeleteMsg} title1={deleteTitle1} />
      )}
    </section>
  );
};

// import { useForm } from "react-hook-form";
// import { hiringJobSchema } from "../../services/Validation";
// import { FormField } from "../../utils/FormField";
// import { WorkDataPass } from "../employees/WorkDataPass";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { CreateJobFunc } from "../../services/createMethod/CreateJobFunc";
// import { SpinLogo } from "../../utils/SpinLogo";
// import { GoUpload } from "react-icons/go";
// import { uploadDocs } from "../../services/uploadsDocsS3/UploadDocs";
// import axios from "axios";
// import { getUrl } from "@aws-amplify/storage";

// export const CreateJob = () => {
//   const { SubmitJobData } = CreateJobFunc();
//   const { hiringJob } = WorkDataPass();
//   const [notification, setNotification] = useState(false);
//   const [showTitle, setShowTitle] = useState("");
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(hiringJobSchema),
//   });
//   const [uploadedDocs, setUploadedDocs] = useState(null);
//   const [uploadedFileNames, setUploadedFileNames] = useState({});
//   const watchedJobTitle = watch("jobTitle")?.replace(/\s+/g, "");

//   const handleFileUpload = async (e, type) => {
//     if (!watchedJobTitle) {
//       alert("Please enter the Job Title before uploading files.");
//       window.location.href = "/postJob";
//       return;
//     }

//     let selectedFile = e.target.files[0];

//     // Allowed file types
//     const allowedTypes = [
//       "application/pdf",
//       "image/jpeg",
//       "image/png",
//       "image/jpg",
//     ];

//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
//       return;
//     }

//     setValue(type, selectedFile);

//     if (selectedFile) {
//       try {
//         setUploadedFileNames((prev) => ({
//           uploadJobDetails: selectedFile.name, // Dynamically store file name
//         }));

//         const url = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/commonfiles/recruiment%2FapplyJob%2F${watchedJobTitle}%2F${selectedFile.name}`;
//         //s3 bucket link
//         const URLPath = `https://commonfiles.s3.ap-southeast-1.amazonaws.com/recruiment/applyJob/${watchedJobTitle}/${encodeURIComponent(
//           selectedFile.name
//         )}`;
//         // console.log(URLPath);

//         setUploadedDocs(URLPath);

//         const response = await axios.put(url, selectedFile);

//         // console.log("Upload response:", response.data);
//       } catch (err) {
//         console.log(err, "1547");
//       }
//     }
//   };
//   // console.log(uploadedDocs);

//   const onSubmit = handleSubmit((data) => {
//     // console.log(data);

//     try {
//       const storedvalue = {
//         ...data,
//         uploadJobDetails: uploadedDocs,
//       };
//       console.log(storedvalue);

//       // SubmitJobData({ jobValue: storedvalue });
//       setShowTitle("Posted Job successfully");
//       // setNotification(true);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   return (
//     <section className="bg-[#F5F6F1CC] mx-auto p-10">
//       <div className="w-full flex items-center gap-5 mb-10">
//         <Link to="/hiringJob" className="text-xl text-grey">
//           <FaArrowLeft />
//         </Link>
//         <h6 className="text-center flex-1 mt-2 text_size_2 uppercase">
//           Job Details
//         </h6>
//       </div>

//       <div className="form-group flex flex-col gap-6">
//         <div className="grid grid-cols-2 gap-5 ">
//           {hiringJob.map((field, index) => {
//             return (
//               <div key={index}>
//                 <FormField
//                   label={field.label}
//                   name={field.name}
//                   type={field.type}
//                   register={register}
//                   errors={errors}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         <div className="md:col-span-2 form-group">
//           <label className="mb-1 text_size_5">Job description</label>
//           <textarea
//             {...register("jobDesc")}
//             className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
//             rows="1"
//           ></textarea>
//           {errors.jobDesc && (
//             <p className="text-[red] text-[13px] mt-1">
//               {errors.jobDesc.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <h2 className="text_size_5 mb-2">Upload Job Document</h2>
//           <label className="flex items-center px-3 py-2 p-2.5 bg-lite_skyBlue w-72 border border-[#dedddd] rounded-md cursor-pointer">
//             <input
//               type="file"
//               {...register("uploadJobDetails")}
//               onChange={(e) => handleFileUpload(e, "uploadJobDetails")}
//               className="hidden"
//               accept=".pdf, .jpg, .jpeg, .png"
//             />
//             <span className="ml-2 flex p-1 text-grey gap-10">
//               <GoUpload /> PDF
//             </span>
//           </label>

//           <p className="text-xs mt-1 text-grey">
//             {uploadedFileNames?.uploadJobDetails}
//           </p>
//         </div>

//         <div className="w-full center">
//           <button className="primary_btn" onClick={onSubmit}>
//             Post
//           </button>
//         </div>
//       </div>
//       {notification && (
//         <SpinLogo
//           text={showTitle}
//           notification={notification}
//           path="/hiringJob"
//         />
//       )}
//     </section>
//   );
// };
