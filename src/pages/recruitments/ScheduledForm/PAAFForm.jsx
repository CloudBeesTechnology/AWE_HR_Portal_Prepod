import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoUpload } from "react-icons/go";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";

// Define validation schema using Yup
const PAAFFormSchema = Yup.object().shape({
  paafApproveDate: Yup.date().notRequired(),
  paafFile: Yup.mixed()
    .nullable()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value ? value.type === "application/pdf" : false
    ),
});

export const PAAFForm = () => {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadedPAAF, setUploadedPAAF] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PAAFFormSchema),
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setValue("paafFile", file); // Set file value for validation
    if (file) {
      try {
        await uploadDocs(file, "paafFile", setUploadedPAAF); // Upload file
        setUploadedFileName(file.name); // Store file name for display
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      paafFile: uploadedPAAF, // Include the uploaded file URL
    };
    // console.log("Form submitted with data:", formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label htmlFor="paafApproveDate">Approval Date</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            id="paafApproveDate"
            {...register("paafApproveDate")}
          />
        </div>

        <div className="">
          <label>Choose File</label>
          <div className="flex items-center gap-5 mt-1">
            <label className="flex items-center px-3 py-2 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
              Upload PAAF
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <span className="ml-2">
                <GoUpload />
              </span>
            </label>
            {uploadedFileName ? (
              <p className="text-xs mt-1 text-grey">{uploadedFileName}</p>
            ) : (
              errors.paafFile && (
                <p className="text-[red] text-xs mt-1">
                  {errors.paafFile.message}
                </p>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
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
