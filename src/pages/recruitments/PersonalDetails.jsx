import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../services/Validation";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { BwnIcColourDD, LanguageDD } from "../../utils/DropDownMenus";
import { useTempID } from "../../utils/TempIDContext";
import { DataSupply } from "../../utils/DataStoredContext";


export const PersonalDetails = () => {
  const { tempID } = useTempID();
  const { empPDData } = useContext(DataSupply);
  const location = useLocation();
  const applicationData = location.state?.FormData;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const {
    register,
    handleSubmit, 
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalSchema(applicationData?.nationality)),

    defaultValues: {
      familyDetails: [{ name: "", relationship: "", age: "", occupation: "", placeOfOccupation: "" }],
      eduDetails: [{ university: "", fromDate: "", toDate: "", degree: "" }],
      workExperience: [{ company: "", position: "", from: "", to: "" }],
    },
  });


  const {
    fields: familyFields,
    append: appendFamily,
    remove: removeFamily,
  } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "eduDetails",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const handleAddFamily = () => {
    
    appendFamily({ isNew: true });
  };
  const handleAddEducation = () => {
    
    appendEducation({ isNew: true });
  };
  const handleAddEmployment = () => {
    
    appendEmployment({ isNew: true });
  };

  const navigate = useNavigate();

  useEffect(() => {

  const savedData = JSON.parse(localStorage.getItem("personalFormData"));
  if (savedData) {
    Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
  }

  const handleBeforeUnload = () => {
    localStorage.removeItem("personalFormData");
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [location, setValue]); 


  const onSubmit = (data) => {
 
    const navigatingData = {
      ...data,
      ...applicationData,
    };
    localStorage.setItem("personalFormData", JSON.stringify(navigatingData));

    navigate("/addCandidates/educationDetails", {
      state: { FormData: navigatingData },
    });
   
  };


  useEffect(() => {
  
    const parseDetails = (data) => {
      try {
        let cleanedData = data.replace(/\\/g, ""); 
        cleanedData = cleanedData.replace(/'/g, '"'); 
        cleanedData = cleanedData.replace(/([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$3":'); 
        cleanedData = cleanedData.replace(/:([a-zA-Z0-9_/.\s]+)(?=\s|,|\})/g, ':"$1"'); 
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
  
    if (tempID) {
      if (empPDData.length > 0) {
        const interviewData = empPDData.find((data) => data.tempID === tempID);
        if (interviewData) { 
          Object.keys(interviewData).forEach((key) => {
            if (key === "familyDetails" || key === "workExperience" || key === "eduDetails") {
              if (Array.isArray(interviewData[key]) && typeof interviewData[key][0] === "string") {
                
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
   

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto py-6">

      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="text"
            {...register("contactNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.contactNo && (
            <p className="text-[red] text-[12px]">{errors.contactNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Alternate Number</label>
          <input
            type="text"
            {...register("alternateNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd]  text-dark_grey outline-none rounded w-full"
          />
          {errors.alternateNo && (
            <p className="text-[red] text-[12px]">
              {errors.alternateNo.message}
            </p>
          )}
        </div>
      </div>

   
      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Present Address</label>
          <input
            type="text"
            {...register("presentAddress")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.presentAddress && (
            <p className="text-[red] text-[12px]">
              {errors.presentAddress.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Permanent Address</label>
          <input
            type="text"
            {...register("permanentAddress")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          <p className="text-[red] text-[12px]">
            {errors.permanentAddress?.message}
          </p>
        </div>
      </div>

 
      <div className="grid grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Driving License Class</label>
          <input
            type="text"
            {...register("driveLic")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Language Proficiency</label>
          <select
            {...register("lang")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          >
            <option value=""></option>
            {LanguageDD.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.lang && (
            <p className="text-[red] text-[12px]">{errors.lang.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Brunei I/C No</label>
          <input
            type="text"
            {...register("bwnIcNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.bwnIcNo && (
            <p className="text-[red] text-[12px]">{errors.bwnIcNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Colour</label>
          <select
            {...register("bwnIcColour")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          >
            <option value=""></option>
            {BwnIcColourDD.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
    
          </select>
          {errors.bwnIcColour && (
            <p className="text-[red] text-[12px]">
              {errors.bwnIcColour.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Expiry</label>
          <input
            type="date"
            {...register("bwnIcExpiry")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.bwnIcExpiry && (
            <p className="text-[red] text-[12px]">
              {errors.bwnIcExpiry.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Passport Number</label>
          <input
            type="text"
            {...register("ppNo")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppNo && (
            <p className="text-[red] text-[12px] ">{errors.ppNo.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued date</label>
          <input
            type="date"
            {...register("ppIssued")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppIssued && (
            <p className="text-[red] text-[12px]">{errors.ppIssued.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport Expiry</label>
          <input
            type="date"
            {...register("ppExpiry")}
            className="mt-2 text_size_9 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppExpiry && (
            <p className="text-[red] text-[12px]">{errors.ppExpiry.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued destination</label>
          <input
            type="text"
            {...register("ppDestinate")}
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
          />
          {errors.ppDestinate && (
            <p className="text-[red] text-[12px]">
              {errors.ppDestinate.message}
            </p>
          )}
        </div>
      </div>
    
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Particulars of Immediate Family (Spouse, Children, Parents, Brothers &
          Sisters)
        </label>
        {Object.keys(familyFields).map((key, index) => {
    
          const family = familyFields[key];

          return (
            <div key={family.id} className="grid grid-cols-5 gap-4 mb-2">
              <input
                type="text"
                {...register(`familyDetails[${index}].name`)}
                defaultValue={family.name}
                placeholder="Name"
                className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
              />
              <input
                type="text"
                {...register(`familyDetails.${index}.relationship`)}
                defaultValue={family.relationship}
                placeholder="Relationship"
                className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
              />
              <input
                type="text"
                {...register(`familyDetails.${index}.age`)}
                defaultValue={family.age}
                placeholder="Age"
                className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
              />
              <input
                type="text"
                {...register(`familyDetails.${index}.occupation`)}
                defaultValue={family.occupation}
                placeholder="Occupation"
                className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
              />
              <input
                type="text"
                {...register(`familyDetails.${index}.placeOfOccupation`)}
                defaultValue={family.placeOfOccupation}
                placeholder="Place of Occupation"
                className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
              />
              {family.isNew && (
                <button
                  type="button"
                  onClick={() => {
                    console.log(`Removing family member at index: ${index}`);
                    removeFamily(index);
                  }}
                  className="absolute top-15 -right-7 text-medium_grey text-[18px]"
                >
                  <FaRegMinusSquare /> 
                </button>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => {
            handleAddFamily() 
          }}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>


      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">Education Details</label>
        {educationFields.map((education, index) => (
          <div key={education.id} className="grid grid-cols-4 gap-4 mb-2">
            <Controller
              name={`eduDetails.${index}.university`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="School / University / Professional Institute"
                    className="resize-none text_size_9 mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />

                  {errors.eduDetails?.[index]?.university && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].university.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.fromDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="From Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  ></textarea>
                  {errors.eduDetails?.[index]?.fromDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].fromDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.toDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="To Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  ></textarea>
                  {errors.eduDetails?.[index]?.toDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].toDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.degree`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="Highest Standard / Passed / Certificate / Degree / Professional Qualification"
                    className="resize-none mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
                  />
                  {errors.eduDetails?.[index]?.degree && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].degree.message}
                    </p>
                  )}
                </div>
              )}
            />
            {education.isNew && (
              <button
                type="button"
                onClick={() => {
                  removeEducation(index);
                }}
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> 
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            handleAddEducation() 
          }}
       
          className="absolute top-12 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Previous Employment Including Temporary Work
        </label>
        {employmentFields.map((employment, index) => (
          <div key={employment.id} className="grid grid-cols-6 gap-4 mb-2">
            <input
              type="text"
              {...register(`workExperience.${index}.name`)}
              placeholder="Name and Address"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.position`)}
              placeholder="Position Held"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.from`)}
              placeholder="From"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.to`)}
              placeholder="To"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.salary`)}
              placeholder="Salary"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.reasonForLeaving`)}
              placeholder="Reason for Leaving"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />

            {employment.isNew && (
              <button
                type="button"
                onClick={() => {
                  removeEmployment(index);
                }}
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> 
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEmployment}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      <div className="flex justify-center mt-12 gap-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>

    </form>
  );
};
