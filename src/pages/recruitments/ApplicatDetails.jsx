import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import avatar from "../../assets/navabar/avatar.jpeg";
import { ApplicantSchema } from "../../services/Validation";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";
import { uploadDocs } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { ContractTypeDD, GenderDD, MaritalDD, NationalityDD, RaceDD, ReligionDD } from "../../utils/DropDownMenus";

export const ApplicantDetails = () => {

  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const location = useLocation();
  const data = location.state?.editingData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ApplicantSchema), // Use the Yup schema for validation
    defaultValues: {}, // Load saved data from localStorage
  });
  const [uploadedDocs, setUploadedDocs] = useState({ profilePhoto: null });
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Load form data from localStorage when the component mounts
  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("applicantFormData"));
  //   if (savedData) {
  //     Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
  //   }
  // }, [setValue]);

  // Handle file upload and set the profile photo URL
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfilePhoto(selectedFile);
      setValue("profilePhoto", selectedFile);

      await uploadDocs(selectedFile, "profilePhoto", setUploadedDocs, "Employee");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const applicationUpdate = {
        ...data,
        profilePhoto: uploadedDocs.profilePhoto,
      };
      // Save form data to localStorage before navigating
      localStorage.setItem(
        "applicantFormData",
        JSON.stringify(applicationUpdate)
      );
      // Navigate to the next page
      navigate("/addCandidates/personalDetails", {
        state: { FormData: applicationUpdate },
      });
      setUploadedDocs({ profilePhoto: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center flex-wrap">
          {/* Position */}
          <div className="mt-10 mb-5 text_size_6">
            <FormField
              label="Applying for the position of"
              register={register}
              name="position"
              type="text"
              errors={errors}
            />
          </div>

          {/* Employee Type Radio Buttons */}
          <div>
            <div className="flex justify-center items-center gap-5">
              <input
                type="radio"
                id="offshore"
                {...register("empType")}
                value="Offshore"
              />
              <label htmlFor="offshore">Offshore</label>
              <input
                type="radio"
                id="onshore"
                {...register("empType")}
                value="Onshore"
              />
              <label htmlFor="onshore">Onshore</label>
            </div>
            {errors.empType && (
              <p className="text-[red] text-[13px] text-center mt-3">
                {errors.empType.message}
              </p>
            )}
          </div>

          {/* Upload Photo */}
          <div className="py-2 center flex-col max-w-[160px]">
            <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
           <div className="h-[120px] max-w-[120px] relative rounded-md bg-lite_skyBlue">
              <img
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : uploadedDocs.profilePhoto
                    ? uploadedDocs.profilePhoto
                    : avatar
                }
                id="previewImg"
                alt="profile"
                className="object-cover w-full h-full"
                onError={(e) => (e.target.src = avatar)}
              />
              {(profilePhoto || uploadedDocs.profilePhoto) && (
                <div
                  className="absolute top-24 -right-3  bg-lite_grey p-[2px] rounded-full cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <IoCameraOutline className="w-6 h-6 p-1" />
                </div>
              )}
            </div>

            {!profilePhoto && !uploadedDocs.profilePhoto && (
              <div className="mt-1 rounded-lg text-center">
                <button
                  type="button"
                  className="text_size_6"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Choose Image
                </button>
              </div>
            )}

            {errors.profilePhoto && (
              <p className="text-[red] text-[13px] text-center">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>
           
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-5 mb-4 text_size_6">
          {[
            {
              label: "Contract Type",
              name: "contractType",
              type: "select",
              options: ContractTypeDD,
            },
            { label: "Agent", name: "agent", type: "text" },

            { label: "Name", name: "name", type: "text" },
            {
              label: "Chinese characters (if applicable)",
              name: "chinese",
              type: "text",
            },
            {
              label: "Gender",
              name: "gender",
              type: "select",
              options: GenderDD,
            },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Age", name: "age", type: "number", min: 20, max: 99 }, // Modified for age input
            { label: "Email ID", name: "email", type: "email" },
            {
              label: "Marital Status",
              name: "marital",
              type: "select",
              options: MaritalDD,
            },
            { label: "Country of Birth", name: "cob", type: "text" },
            {
              label: "Nationality",
              name: "nationality",
              type: "select",
              options:  NationalityDD,
            },
            {
              label: "Other Nationality",
              name: "otherNation",
              type: "text",
              disabled: watch("nationality")?.toLowerCase() !== "other",
            },
            {
              label: "Race",
              name: "race",
              type: "select",
              options: RaceDD,
            },
            {
              label: "Other Race",
              name: "otherRace",
              type: "text",
              disabled: watch("race")?.toLowerCase() !== "other",
            },
            {
              label: "Religion",
              name: "religion",
              type: "select",
              options:ReligionDD,
            },
            {
              label: "Other Religion",
              name: "otherReligion",
              type: "text",
              disabled: watch("religion")?.toLowerCase() !== "other",
            },
          ].map((field, index) => (
            <div key={index}>
              <label className="block">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="mt-2 p-2.5 text_size_7 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                >
                    <option value=""></option>
                  {(field.options || []).map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...register(field.name)}
                  type={field.type}
                  disabled={field.disabled}
                  min={field.min}
                  max={field.max}
                  className="mt-2 p-2 text_size_7 bg-lite_skyBlue border border-[#dedddd] text-dark_grey   outline-none rounded w-full"
                /> // border border-[#EAEAEA]
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px]">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center my-10 gap-10">
          <button type="submit" className="primary_btn">
            Next
          </button>
        </div>
      </form>
    </section>
  );
};
