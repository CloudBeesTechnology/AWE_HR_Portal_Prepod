import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../services/Validation";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { BwnIcColourDD, LanguageDD } from "../../utils/DropDownMenus";
import { useTempID } from "../../utils/TempIDContext";
import { DataSupply } from "../../utils/DataStoredContext";
import { ChevronDown } from "lucide-react";
import { FaRegWindowClose } from "react-icons/fa";
export const PersonalDetails = () => {
  const { tempID } = useTempID();
  const { empPDData } = useContext(DataSupply);
  const location = useLocation();
  const applicationData = location.state?.FormData;
// console.log(applicationData);

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
      familyDetails: [
        {
          name: "",
          relationship: "",
          age: "",
          occupation: "",
          placeOfOccupation: "",
        },
      ],
      eduDetails: [{ university: "", fromDate: "", toDate: "", degree: "" }],
      workExperience: [{ company: "", position: "", from: "", to: "" }],
      lang:[]
    },
  });

  const navigate = useNavigate();
  
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "Malay", label: "Malay" },
    { value: "Tamil", label: "Tamil" },
    // { value: "Other", label: "Other" },
  ];
  const [isOpen, setIsOpen] = useState(false); // For dropdown visibility
  const [showOtherLangInput, setShowOtherLangInput] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState("");


  const {
    fields: familyDetails,
    append: appendFamily,
    remove: removeFamily,
  } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const {
    fields: eduDetails,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "eduDetails",
  });

  const {
    fields: workExperience,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const handleAddFamily = () => {
    appendFamily({
      name: "",
      relationship: "",
      age: "",
      occupation: "",
      placeOfOccupation: "",
      isNew: true,
    });
  };
  const handleAddEducation = () => {
    appendEducation({
      university: "",
      fromDate: "",
      toDate: "",
      degree: "",
      isNew: true,
    });
  };
  const handleAddEmployment = () => {
    appendEmployment({
      company: "",
      position: "",
      from: "",
      to: "",
      isNew: true,
    });
  };

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
      ...applicationData,  
      ...data
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
      "alternateNo", "bwnIcColour", "bwnIcExpiry", "bwnIcNo", "contactNo",
      "driveLic", "eduDetails", "familyDetails", "lang","otherLang", "permanentAddress",
      "ppDestinate", "ppExpiry", "ppIssued", "ppNo", "presentAddress", "workExperience"
    ];

    if (tempID) {
      if (empPDData.length > 0) {
        const interviewData = empPDData.find((data) => data.tempID === tempID);
        if (interviewData) {
          // console.log(interviewData, "1");

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
            } 
          });

          if (interviewData.lang) {
            // Convert to array if it's a string
            let langData = Array.isArray(interviewData.lang) 
              ? interviewData.lang 
              : interviewData.lang.split(",").map(item => item.trim()); // Split by comma and trim spaces
          
            // Remove square brackets if they exist in any item
            langData = langData.map(item => 
              typeof item === "string" ? item.replace(/^\[|\]$/g, "") : item
            );
          
            // Check for "Other" language
            const otherItem = langData.find(item => 
              typeof item === "string" && item.startsWith("Other:")
            );
          
            if (otherItem) {
              setShowOtherLangInput(true);
              setOtherLanguage(otherItem.replace("Other: ", "").trim());
            }
          
            console.log(langData, "Processed Language Data");
          
            setValue("lang", langData);
          }  
        } 
      }
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
        <div className="relative">
  <label className="block mb-1">Language Proficiency</label>
<Controller
  name="lang"
  control={control}
  render={({ field: { onChange, value } }) => {
    const normalizedValue = Array.isArray(value) ? value : [];
    const isOtherSelected = normalizedValue.includes("Other");

    return (
      <>
        <div
          className="mt-2 p-2.5 text_size_9 bg-white border border-[#dedddd] text-dark_grey outline-none rounded w-full flex items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className="w-full outline-none cursor-pointer bg-transparent"
            value={normalizedValue.join(", ")}
            readOnly
            placeholder="Select options"
          />
          <ChevronDown className="w-5 h-5 text-grey" />
        </div>
        {isOpen && (
          <div className="absolute left-0 w-full mt-2  bg-lite_skyBlue rounded-lg shadow-lg z-10">
            <div className=" absolute right-5 top-5 cursor-pointer" onClick={() => setIsOpen(false)}>
           <FaRegWindowClose/>
            </div>
            <ul className="p-2 bg-white rounded-md">
              {languageOptions.map((option) => (
                <li key={option.value} className="flex items-center gap-2 p-2  rounded">
                  <input
                    type="checkbox"
                    id={`lang-${option.value}`}
                    checked={normalizedValue.includes(option.value)}
                    onChange={() => {
                      let newValue = normalizedValue.includes(option.value)
                        ? normalizedValue.filter(item => item !== option.value)
                        : [...normalizedValue, option.value];

                      onChange(newValue); // Update form field
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`lang-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </label>
                </li>
              ))}

              <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded ">
                <input
                  type="checkbox"
                  id="lang-other"
                  checked={isOtherSelected}
                  onChange={() => {
                    if (isOtherSelected) {
                      onChange(normalizedValue.filter(item => item !== "Other"));
                      setOtherLanguage(""); // Reset input field
                    } else {
                      onChange([...normalizedValue, "Other"]);
                    }
                  }}
                  className="w-4 h-4"
                />
                <label htmlFor="lang-other" className="cursor-pointer">
                  Other
                </label>
              </li>
            </ul>
          </div>
        )}
        {isOtherSelected && (
          <input
            {...register("otherLang")}
            type="text"
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
            placeholder="Specify other language"
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
          />
        )}
      </>
    );
  }}
/>
{errors.lang && <p className="text-[red] text-[12px]">{errors.lang.message}</p>}
{errors.otherLang && <p className="text-[red] text-[12px]">{errors.otherLang.message}</p>}

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
        {familyDetails.map((key, index) => {

          return (
            <div key={key.id} className="grid grid-cols-5 gap-4 mb-2">
              {/* Use Controller for each field */}
              <Controller
                name={`familyDetails[${index}].name`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Name"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                )}
              />
              <Controller
                name={`familyDetails[${index}].relationship`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Relationship"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                )}
              />
              <Controller
                name={`familyDetails[${index}].age`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Age"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                )}
              />
              <Controller
                name={`familyDetails[${index}].occupation`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Occupation"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                )}
              />
              <Controller
                name={`familyDetails[${index}].placeOfOccupation`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Place of Occupation"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                )}
              />

              {familyDetails[index].isNew && (
                <button
                  type="button"
                  onClick={() => {
                    // console.log(`Removing family member at index: ${index}`);
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
            handleAddFamily();
          }}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">Education Details</label>
        {eduDetails.map((education, index) => (
          <div key={education.id} className="grid grid-cols-4 gap-4 mb-2">
            <Controller
              name={`eduDetails.${index}.university`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
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
                  <input
                    {...field}
                    type="date"
                    placeholder="From Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
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
                  <input
                    {...field}
                    type="date"
                    placeholder="To Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
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
                 <input
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
            handleAddEducation();
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
        {workExperience.map((employment, index) => (
          <div key={employment.id} className="grid grid-cols-6 gap-4 mb-2">
            <Controller
              name={`workExperience.${index}.name`}
              control={control}
              // defaultValue={employment.name}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Name and Address"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`workExperience.${index}.position`}
              control={control}
              // defaultValue={employment.position}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Position Held"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`workExperience.${index}.from`}
              control={control}
              // defaultValue={employment.from}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  placeholder="From"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`workExperience.${index}.to`}
              control={control}
              // defaultValue={employment.to}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  placeholder="To"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`workExperience.${index}.salary`}
              control={control}
              // defaultValue={employment.salary}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Salary"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`workExperience.${index}.reasonForLeaving`}
              control={control}
              // defaultValue={employment.reasonForLeaving}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Reason for Leaving"
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />

            {employment.isNew && (
              <button
                type="button"
                onClick={() => {
                  removeEmployment(index); // Make sure to define this function
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
          onClick={handleAddEmployment} // Ensure this function is defined to handle adding a new employment
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
