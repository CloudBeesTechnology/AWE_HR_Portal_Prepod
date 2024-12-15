import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoUpload } from "react-icons/go";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { CreateLOI } from "../../services/createMethod/CreateLOI"

const LOIFormSchema = Yup.object().shape({
  loiIssueDate: Yup.date().required("Issue date is required"),
  loiAcceptDate: Yup.date().nullable(),
  loiDeclineDate: Yup.date().nullable(),
  declineReason: Yup.string().when("loiDeclineDate", {
    is: (val) => val != null,
    then: Yup.string().required("Decline reason is required if declined"),
  }),
  loiFile: Yup.mixed()
    .nullable()
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value[0].type === "application/pdf" : true
    ),
});



export const LOIForm = () => {
  const { mergedInterviewData } = useFetchInterview();
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadedLoi, setUploadedLoi] = useState(null);
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    interview: {
      loiIssueDate: "",
      loiAcceptDate: "",
      loiDeclineDate: "",
      declineReason: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LOIFormSchema),
  });

const { createLocalMobilization } = CreateLOI();

const createLoi = handleSubmit(async (data) => {
  const formattedData = {
    ...data,
    loiIssueDate: "",
    loiAcceptDate: "",
    loiDeclineDate: "",
    declineReason: "",
   
  };

  console.log("Formatted Data:", formattedData);

  setNotification(true);
  await createLoi(formattedData);
});

  useEffect(() => {
    if (mergedInterviewData.length > 0) {
      const interviewData = mergedInterviewData[0]; // Assuming we want to take the first item
      setFormData({
        interview: {
          loiIssueDate: interviewData.localMobilization.position,
          loiAcceptDate: interviewData.department,
          loiDeclineDate: interviewData.otherDepartment,
          declineReason: interviewData.declineReason
        },
      });
    }
  }, [mergedInterviewData]);

  
  // Function to handle changes for non-file fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [field]: value,
      },
    }));
  };


  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "loiFile") {
        // Assuming uploadLoi is a custom function to upload the file
        await uploadDocs(file, "loiFile", setUploadedLoi); // Ensure uploadLoi function works correctly
        setUploadedFileName(file.name); // Store file name for display
      }
    }
  };

  const onSubmit = (data) => {
    console.log({
      ...data,
      loiFile: uploadedLoi, // Ensure correct data structure when submitting
    });
  };

  return (
    <form onSubmit={() => {
      onSubmit();
    }}>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="loiIssueDate">Date of Issue</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiIssueDate"
            {...register("loiIssueDate")}
          />
          {errors.loiIssueDate && (
            <p className="text-[red] text-xs">{errors.loiIssueDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiAcceptDate">Date of Acceptance</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiAcceptDate"
            {...register("loiAcceptDate")}
          />
          {errors.loiAcceptDate && (
            <p className="text-[red] text-xs">{errors.loiAcceptDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="loiDeclineDate">Date of Decline</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="loiDeclineDate"
            {...register("loiDeclineDate")}
          />
          {errors.loiDeclineDate && (
            <p className="text-[red] text-xs">
              {errors.loiDeclineDate.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="declineReason">Decline Reason</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            id="declineReason"
            rows="2" // Optional: Defines the height of the textarea
            {...register("declineReason")}
          ></textarea>
          {errors.declineReason && (
            <p className="text-[red] text-xs">{errors.declineReason.message}</p>
          )}
        </div>

        <div className="">
          <label className="text_size_6">Choose file</label>
          <div className="flex items-center justify-between mt-3 mb-5 gap-5">
            {/* LOI File Upload */}
            <div>
              <label className="flex items-center px-3 py-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
                Upload LOI
                <input
                  type="file"
                  {...register("loiFile")}
                  onChange={(e) => handleFileChange(e, "loiFile")}
                  className="hidden"
                  accept="application/pdf"
                />
                <span className="ml-2">
                  <GoUpload />
                </span>
              </label>
              {/* Display uploaded file name */}
              {uploadedFileName ? (
                <p className="text-xs mt-1 text-grey">{uploadedFileName}</p>
              ) : (
                <p className="text-[red] text-xs mt-1">
                  {errors?.loiFile?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="center mt-5">
        <button
          type="submit"
          className="py-1 px-5 rounded-xl shadow-lg border-2 border-yellow hover:bg-yellow"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
