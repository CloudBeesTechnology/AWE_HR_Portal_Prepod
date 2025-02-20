import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplicantSchema } from "../../services/Validation";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";
import { uploadDocString } from "../../services/uploadDocsS3/UploadDocs";
import { FormField } from "../../utils/FormField";
import { DataSupply } from "../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import { useTempID } from "../../utils/TempIDContext";
import avatar from "../../assets/navabar/avatar.jpeg";


import {
  ContractTypeDD,
  GenderDD, 
  MaritalDD,
  NationalityDD,
  RaceDD,
  ReligionDD,
} from "../../utils/DropDownMenus";

export const ApplicantDetails = () => {
  const { empPDData } = useContext(DataSupply);
  const { tempID } = useTempID();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ApplicantSchema), 
    defaultValues: {}, 
  });
  const [uploadedDocs, setUploadedDocs] = useState({ profilePhoto: null });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [profilePreview, setProfilePreview] = useState("");

  const linkToImageFile = async (pathUrl) => {
    const result = await getUrl({
      path: pathUrl,
    });
    setImageUrl(result.url.toString());
  };
  
  const profile = watch("profilePhoto");

  useEffect(() => {
 
    const savedData = JSON.parse(localStorage.getItem("applicantFormData"));
    if (savedData) {
      
      Object.keys(savedData).forEach(async (key) => {
        if (key === "profilePhoto" && savedData[key]) {
          try {
       
            const result = await getUrl({ path: savedData[key] });
            const imageUrl = result.url.toString();
            setProfilePreview(imageUrl);
            setValue(key, imageUrl); 
          } catch (error) {
            console.error(`Error setting value for ${key}:`, error);
          }
        } else {
          setValue(key, savedData[key]);
        }
      });
    } else {
      // console.log('No saved data in localStorage');
    }
  
    const handleBeforeUnload = () => {
      localStorage.removeItem("applicantFormData");
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, setValue]);
  

  // useEffect(() => {
  //   if (tempID && empPDData.length > 0) {
  //     const interviewData = empPDData.find((data) => data.tempID === tempID);
  //     if (interviewData) {
  //       console.log(interviewData);
        
  //       Object.keys(interviewData).forEach((key) => {
  //         if (interviewData[key]) {
  //           setValue(key, interviewData[key]);
  //         }
  //       });

  //       if (interviewData.profilePhoto) {
  //         setUploadedDocs((prev) => ({
  //           ...prev,
  //           profilePhoto: interviewData.profilePhoto,
  //         }));
  //         setValue("profilePhoto", interviewData.profilePhoto);
  //       }
  //     }
  //   }
  // }, [empPDData, tempID, setValue]);

  useEffect(() => {
    const parseDetails = (data) => {
      try {
        let cleanedData = data.replace(/\\/g, "");
        cleanedData = cleanedData.replace(/'/g, '"');
        cleanedData = cleanedData.replace(
          /([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g,
          '$1"$3":'
        );
        cleanedData = cleanedData.replace(
          /:([a-zA-Z0-9_/.\s]+)(?=\s|,|\})/g,
          ':"$1"'
        );
        if (cleanedData.startsWith('"') && cleanedData.endsWith('"')) {
          cleanedData = cleanedData.slice(1, -1);
        }

        const parsedData = JSON.parse(cleanedData);

        if (!Array.isArray(parsedData)) {
          return [];
        }

        return parsedData;
      } catch (error) {
        console.error("Error parsing details:", error);
        return [];
      }
    };

    const selectedFields = [
      "age", "agent", "chinese", "cob", "contractType", "dob", "email",
      "empType", "gender", "marital", "name", "nationality", "otherNation",
      "otherRace", "otherReligion", "position", "profilePhoto", "race", "religion"
    ];

    if (tempID) {
      if (empPDData.length > 0) {
        const interviewData = empPDData.find((data) => data.tempID === tempID);
        if (interviewData) {
          selectedFields.forEach((key) => {
         
            if (
              key === "familyDetails" ||
              key === "workExperience" ||
              key === "eduDetails"
            ) {
              if (
                Array.isArray(interviewData[key]) &&
                typeof interviewData[key][0] === "string"
              ) {
                let parsedData = parseDetails(interviewData[key][0]);
                if (parsedData.length > 0) {
                  setValue(key, parsedData);       
                }
              }
            } else if (interviewData[key]) {
              setValue(key, interviewData[key]);
            } else {
              // console.log(`No value for key ${key}`);
            }
          });

          if (interviewData.profilePhoto) {
            setUploadedDocs((prev) => ({
              ...prev,
              profilePhoto: interviewData.profilePhoto,
            }));
            setValue("profilePhoto", interviewData.profilePhoto);
          }

        } else {
          // console.log("No interview data found for tempID:", tempID);
        }
      } else {
        // console.log("empPDData is empty");
      }
    } else {
      // console.log("tempID is not set");
    }
  }, [tempID, setValue, empPDData]); 

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
 
    if (selectedFile) {
      
      setProfilePhoto(selectedFile);
      setValue("profilePhoto", selectedFile);
      await uploadDocString(
        selectedFile,
        "profilePhoto",
        setUploadedDocs,
        "Employee"
      );
    }
  };

  useEffect(() => {

    if (uploadedDocs.profilePhoto) {
      linkToImageFile(uploadedDocs.profilePhoto); 
    }
  }, [uploadedDocs.profilePhoto]);


  const onSubmit = async (data) => {
    try {
      const applicationUpdate = {
        ...data,
        profilePhoto: uploadedDocs.profilePhoto,
      };

      localStorage.setItem(
        "applicantFormData",
        JSON.stringify(applicationUpdate)
      );

      navigate("/addCandidates/personalDetails", {
        state: { FormData: applicationUpdate },
      });

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
                  imageUrl
                    ? imageUrl
                    : profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : uploadedDocs.profilePhoto ? profilePreview : profilePreview || avatar
                }
                id="previewImg"
                alt="profile"
                className="object-cover w-full h-full"
                onError={(e) => (e.target.src = avatar)}
              />

              {(profilePreview || profilePhoto || uploadedDocs.profilePhoto || imageUrl) && (
                <div
                  className="absolute top-24 -right-3 bg-lite_grey p-[2px] rounded-full cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <IoCameraOutline className="w-6 h-6 p-1" />
                </div>
              )}
            </div>

            {!profilePreview && !profilePhoto && !uploadedDocs.profilePhoto && !imageUrl && (
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

        <div className="grid grid-cols-2 gap-x-12 gap-y-5 mb-4 text_size_6">
          {[
            {
              label: "Contract Type",
              name: "contractType",
              type: "select",
              options: ContractTypeDD,
            },
            { label: "CV Received From", name: "agent", type: "text" },

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
            { label: "Age", name: "age", type: "number", min: 20, max: 99 }, 
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
              options: NationalityDD,
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
              options: ReligionDD,
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
                /> 
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px]">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center my-10 gap-10">
          <button type="submit" className="primary_btn">
            Next
          </button>
        </div>

      </form>
    </section>
  );
};
