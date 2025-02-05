import { useEffect, useContext } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { EducationSchema } from "../../services/Validation"; 
import { useLocation, useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { useTempID } from "../../utils/TempIDContext";

export const EducationDetails = ({ fetchedData }) => {
  const { tempID } = useTempID();
  const { educDetailsData } = useContext(DataSupply);

  const location = useLocation();
  const navigatingPersonalData = location.state?.FormData;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(EducationSchema),
    defaultValues: {
      referees: [{ name: "", address: "", telephone: "", profession: "" }],
      relatives: [{ name: "", positionHeld: "", relationship: "" }],
      emgDetails: [
        {
          name: "",
          relationship: "",
          address: "",
          phoneNumber: "",
          bloodGroup: "",
        },
      ],
      disease: "no",
      liquor: "no",
      crime: "no",
      diseaseDesc: "",
      liquorDesc: "",
      crimeDesc: "",
    },
  });

  useEffect(() => {
    if (fetchedData) {
      setValue("disease", fetchedData.disease || "no");
      setValue("liquor", fetchedData.liquor || "no");
      setValue("crime", fetchedData.crime || "no");
      setValue("diseaseDesc", fetchedData.diseaseDesc || "");
      setValue("liquorDesc", fetchedData.liquorDesc || "");
      setValue("crimeDesc", fetchedData.crimeDesc || "");
    }
  }, [fetchedData, setValue]);

  const navigate = useNavigate();

  const {
    fields: emgDetails,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control,
    name: "emgDetails",
  });
  const {
    fields: referees,
    append: appendCharacterReferee,
    remove: removeCharacterReferee,
  } = useFieldArray({
    control,
    name: "referees",
  });
  const {
    fields: relatives,
    append: appendRelative,
    remove: removeRelative,
  } = useFieldArray({
    control,
    name: "relatives",
  });

  const handleAddEmergency = () => {
    appendEmergency({
      name: "",
      relationship: "",
      address: "",
      phoneNumber: "",
      bloodGroup: "",
      isNew: true,
    });
  };

  
  const handleAddReferee = () => {
 
    appendCharacterReferee({
      name: "",
      address: "",
      telephone: "",
      profession: "",
      isNew: true,
    });
  };

  const handleAddRelative = () => {

    appendRelative({
      name: "",
      positionHeld: "",
      relationship: "",
      isNew: true,
    });
  };

  useEffect(() => {

    const savedData = JSON.parse(localStorage.getItem("educationFormData"));
    if (savedData) {
      Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
    }
  
    const handleBeforeUnload = () => {
      localStorage.removeItem("educationFormData");
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, setValue]); 

  const onSubmit = (data) => {
 
    const navigatingEduData = {
      ...data,
      ...navigatingPersonalData,
    };

    localStorage.setItem("educationFormData", JSON.stringify(navigatingEduData));

    navigate("/addCandidates/otherDetails", {
      state: { FormData: navigatingEduData },
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
      if (educDetailsData.length > 0) {
        const interviewData = educDetailsData.find((data) => data.tempID === tempID);
        if (interviewData) {
          Object.keys(interviewData).forEach((key) => {

            if (key === "emgDetails" || key === "referees" || key === "relatives") {
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
        // console.log("educDetailsData is empty");
      }
    } else {
      // console.log("tempID is not set");
    }
  }, [tempID, setValue, educDetailsData]);
   
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
   
      <div className="relative mt-10">
        <label className="text_size_6 mb-3">
          Characters Referees{" "}
          <span className="text-[#838383]">
            (Names of relatives should not be given)
          </span>
        </label>
        {referees.map((referee, index) => (
          <div key={referee.id} className="flex gap-2 mb-7">
            <Controller
              name={`referees.${index}.name`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Name"
                  className="mt-2  text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />
            <Controller
              name={`referees.${index}.address`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Address"
                  className="mt-2  text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />
            <Controller
              name={`referees.${index}.telephone`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Telephone"
                  className="mt-2 text_size_7 w-[150px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                />
              )}
            />
            <Controller
              name={`referees.${index}.profession`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Profession"
                  className="mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />
            {referee.isNew && (
              <button
                type="button"
                onClick={() => removeCharacterReferee(index)} 
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddReferee} 
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      <div className="relative">
        <label className="text_size_6 mb-3">
          Relatives Employed by the company
        </label>
        {relatives.map((relative, index) => (
          <div key={relative.id} className="grid grid-cols-3 gap-4 mb-7">
            <Controller
              name={`relatives.${index}.name`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Name"
                  className="mt-2  text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />
            <Controller
              name={`relatives.${index}.positionHeld`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Position Held"
                  className="mt-2  text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />
            <Controller
              name={`relatives.${index}.relationship`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Relationship"
                  className="mt-2  text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
              )}
            />

            {relative.isNew && (
              <button
                type="button"
                onClick={() => removeRelative(index)} 
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> 
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRelative}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

    
      <div>
        <label className="text_size_6 mb-3">
          Brief Description of Present Duties
        </label>
        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="resize-none mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
              rows="3"
            ></textarea>
          )}
        />
      </div>

      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">In Case of Accident / Emergency</label>
        {emgDetails.map((emergency, index) => (
          <div key={emergency.id} className="grid grid-cols-5 gap-3 mb-2">
            <Controller
              name={`emgDetails.${index}.name`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Name of Person notify"
                    className="resize-none text_size_9 mt-2   p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.emgDetails?.[index]?.name && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emgDetails[index].name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emgDetails.${index}.relationship`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Relationship"
                    className="mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.emgDetails?.[index]?.relationship && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emgDetails[index].relationship.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emgDetails.${index}.address`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Address"
                    className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.emgDetails?.[index]?.address && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emgDetails[index].address.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emgDetails.${index}.phoneNumber`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Contant Number"
                    className=" mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
                  />
                  {errors.emgDetails?.[index]?.phoneNumber && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emgDetails[index].phoneNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emgDetails.${index}.bloodGroup`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Blood Group"
                    className=" mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.emgDetails?.[index]?.bloodGroup && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emgDetails[index].bloodGroup.message}
                    </p>
                  )}
                </div>
              )}
            />
            {emergency.isNew && (
              <button
                type="button"
                onClick={() => removeEmergency(index)} 
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> 
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEmergency}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>


      {[
        {
          field: "disease",
          label:
            "Have you ever suffered from any disease or received treatment?",
        },
        {
          field: "liquor",
          label: "Were you ever an alcoholic or substance abuser?",
        },
        { field: "crime", label: "Have you ever been convicted of a crime?" },
      ].map((section, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-4 text_size_6 mt-5">
          <div>
            <label htmlFor={section.field} className="text_size_6 mb-2">
              {section.label}
            </label>
          </div>
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-4">
              {["yes", "no"].map((value) => (
                <div key={value} className="flex items-center gap-2">
                  <Controller
                    name={section.field}
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="radio"
                          id={`${section.field}_${value}`}
                          {...field}
                          value={value}
                          checked={field.value === value}
                          onChange={() => setValue(section.field, value)}
                          className="border p-2.5 rounded"
                        />
                        <label htmlFor={`${section.field}_${value}`}>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </label>
                      </>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="items-center">
              <label
                htmlFor={`${section.field}Desc`}
                className="text_size_7 mr-5 text-[#C7C7C7]"
              >
                If yes, please provide details
              </label>
              <Controller
                name={`${section.field}Desc`}
                control={control}
                render={({ field }) => (
                  <input
                    id={`${section.field}Desc`}
                    {...field}
                    className={`w-[450px] mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded ${
                      errors[`${section.field}Desc`] ? "border-red-500" : ""
                    }`}
                    disabled={watch(section.field) !== "yes"} 
                  />
                )}
              />
              {errors[`${section.field}Desc`] && (
                <p className="text-[red] text-xs mt-4">
                  {errors[`${section.field}Desc`]?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center my-7 gap-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};
