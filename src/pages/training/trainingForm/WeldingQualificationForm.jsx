import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WeldingValidationSchema } from "../../../services/TrainingValidation";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BlastingPaintingForm } from "./BlastingPaintingForm";
import { uploadDocs } from "../../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";
import { GoUpload } from "react-icons/go";

export const WeldingQualificationForm = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);
  // const { SubmitMPData } = TCDataFun();
  // const [notification, setNotification] = useState(false);

  const [uploadedFileNames, setUploadedFileNames] = useState({
    weldingUpload: null,
 
  });
  const [uploadeWQU, setUploadWQU] = useState({
    weldingUpload: null,
  });
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WeldingValidationSchema),
  });
  const [uploadedFile, setUploadedFile] = useState('');
  const [weldingUploads, setweldingUploads] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input element
  const [show, setShow] = useState(true);

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setValue(type, file); // Set file value for validation
    if (file) {
      if (type === "weldingUpload") {
        await uploadDocs(file, "weldingUpload", setUploadWQU, "personName");

        setUploadedFileNames((prev) => ({
          ...prev,
          weldingUpload: file.name, // Store the file name for display
        }));
      } 
    }
  };



  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      const TCValue = {
        ...data,
        weldingUpload:uploadeWQU.weldingUpload
      };
     
      await SubmitMPData({ TCValue });
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`GraphQL Error ${index + 1}:`, err.message);
          if (err.extensions) {
            console.error("Error Extensions:", err.extensions);
          }
        });
      }
    
    }
  };

  return (
    <section className=" p-10 center flex-col gap-16 bg-[#F8F8F8]">
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/training" className="text-xl w-[30%] text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey">
          <h1
            className={` text-center mt-2 text_size_2 relative  ${
              show
                ? "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
                : ""
            }`}
            onClick={() => setShow(true)}
          >
            Welding Qualification
          </h1>
          <h2
            className={` text-center mt-2 text_size_2 relative  ${
              show
                ? ""
                : "after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0"
            }`}
            onClick={() => setShow(false)}
          >
            Blasting Painting
          </h2>
        </article>

        <div className="w-[30%]">
          <SearchDisplay
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
          />
        </div>
      </div>
      {show && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white  rounded-lg shadow-lg w-full  p-8 "
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
          <div className="grid grid-cols-2 gap-6 ">
            <div>
              <label className="text_size_5">Employee Badge Number</label>
              <input
                {...register("empBadgeNo")}
                className="input-field"
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
                {...register("empName")}
                className="input-field"
                type="text"
              />
              {errors.empName && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.empName.message}
                </p>
              )}</div>
              <div>
              <label className="text_size_5">Department</label>
              <input {...register("department")} className="input-field"/>
              {errors.department && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.department.message}
                </p>
              )}
              </div>

              <div>
             <label className="text_size_5">Position</label>
              <input
                {...register("position")}
                className="input-field"
                type="text"
              />
              {errors.position && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.position.message}
                </p>
              )}
             </div>
            <div>
            <label className="text_size_5">Welding Stamp Number</label>
              <input
                {...register("weldingStampNo")}
                className="input-field"
                type="text"
              />
              {errors.weldingStampNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingStampNo.message}
                </p>
              )}
            </div>
            <div>
             <label className="text_size_5">WQR Number</label>
              <input
                {...register("WQRNo")}
                className="input-field"
                type="text"
              />
              {errors.WQRNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.WQRNo.message}
                </p>
              )}
             </div>

              <div>
              <label className="text_size_5">WPS Number</label>
              <input
                {...register("wpsNumber")}
                className="input-field"
                type="text"
              />
              {errors.wpsNumber && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.wpsNumber.message}
                </p>
              )}
              </div>
              <div>
              <label className="text_size_5">Welding Code</label>
              <input
                {...register("weldingCode")}
                className="input-field"
                type="text"
              />
              {errors.weldingCode && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingCode.message}
                </p>
              )}
              </div>
              
             <div>
             <label className="text_size_5">Welding Process</label>
              <input
                {...register("weldingProcess")}
                className="input-field"
                type="text"
              />
              {errors.weldingProcess && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingProcess.message}
                </p>
              )}
             </div>

             <div>
             <label className="text_size_5">Welding Material</label>
              <input
                {...register("weldingMaterial")}
                className="input-field"
                type="text"
              />
              {errors.weldingMaterial && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingMaterial.message}
                </p>
              )}
             </div>
            <div>
            <label className="text_size_5">Welding Position</label>
              <input
                {...register("weldingPosition")}
                className="input-field"
                type="text"
              />
              {errors.weldingPosition && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingPosition.message}
                </p>
              )}
            </div>
            <div>
              <label className="text_size_5">Filler Metal</label>
              <input
                {...register("fillerMetal")}
                className="input-field"
                type="text"
              />
              {errors.fillerMetal && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.fillerMetal.message}
                </p>
              )}
              </div>
            <div>
            <label className="text_size_5">Thickness Range</label>
              <input
                {...register("thicknessRange")}
                className="input-field"
                type="text"
              />
              {errors.thicknessRange && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.thicknessRange.message}
                </p>
              )}
            </div>

            <div>
             <label className="text_size_5">Diameter Range</label>
              <input
                {...register("diameterRange")}
                className="input-field"
                type="text"
              />
              {errors.diameterRange && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.diameterRange.message}
                </p>
              )}
             </div>
              <div>
              <label className="text_size_5">
                Welding Qualification Expiry
              </label>
              <input
                {...register("WQExpiry")}
                className="input-field"
                type="date"
              />
              {errors.WQExpiry && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.WQExpiry.message}
                </p>
              )}
              </div>
              <div>
              <label className="text_size_5">
                Remarks for Welding Qualification
              </label>
              <input
                {...register("WQRemarks")}
                className="input-field"
                type="text"
              />
            </div>


            <div>
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer">
            Upload Welding Qualification Certificates
              <input
                type="file"
                {...register("weldingUpload")}
                onChange={(e) => handleFileChange(e, "weldingUpload")}
                className="hidden"
                accept="application/pdf, image/png, image/jpeg"
              />
              <span className="ml-2">
                <GoUpload/>
              </span>
            </label>
            {/* Display uploaded file name */}
            {uploadedFileNames.weldingUpload && (
              <p className="text-xs mt-1 text-grey">
                Uploaded: {uploadedFileNames.weldingUpload}
              </p>
            )}
          </div>
          </div>

          <div className="center">
            <button type="submit" className="primary_btn my-10">
              Submit
            </button>
          </div>
        </form>
      )}{" "}
      {!show && <BlastingPaintingForm />}
    </section>
  );
};
