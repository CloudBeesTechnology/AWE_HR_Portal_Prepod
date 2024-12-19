import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

import { EducationSchema } from "../../services/Validation"; // Adjust import as necessary
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const EducationDetails = () => {
  const location = useLocation();
  const navigatingPersonalData = location.state?.FormData;
  // console.log("Received form data:", navigatingPersonalData );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    handleSubmit,
    control,
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
      ...JSON.parse(localStorage.getItem("educationFormData")) || {},
    },
  });
  const navigate = useNavigate();
  // const { handleNext } = useOutletContext();

  useEffect(() => {
    const eduData = () => {
      localStorage.removeItem("educationFormData"); // Clear data on refresh or tab close
    };
    // Add event listener for unload
    window.addEventListener("beforeunload", eduData);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", eduData);
    };
  }, []);

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
    // Append a new referee object with isNew flag set to true
    appendCharacterReferee({
      name: "",
      address: "",
      telephone: "",
      profession: "",
      isNew: true,
    });
  };

  const handleAddRelative = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendRelative({
      name: "",
      positionHeld: "",
      relationship: "",
      isNew: true,
    });
  };

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  //   localStorage.setItem('educationDetails', JSON.stringify(data));
  //   // handleNext();
  //   navigate("/addCandidates/otherDetails");
  // });
  const onSubmit = (data) => {
    // console.log(data);
    const navigatingEduData = {
      ...data,
      ...navigatingPersonalData,
    };
    // setNavigateEduData(navigatingEduData)
    // console.log(navigatingEduData);
    // handleNext();
    localStorage.setItem("educationFormData", JSON.stringify(navigatingEduData));
    
    navigate("/addCandidates/otherDetails", {
      state: { FormData: navigatingEduData },
    });
  };


  // const onSubmit = async (data) => {
  // try {

  //   console.log(data);

  //   // Combine all form data
  //   const result = await client.graphql({
  //     query: createEducation,
  //     variables: {
  //       input: data ,
  //     },
  //   });
  //   console.log("Successfully submitted:hiiiiiiiii", result);

  // } catch (error) {
  //   console.log(error);

  //   console.error(
  //     "Error submitting data to AWS:",
  //     JSON.stringify(error, null, 2)
  //   );
  // }
  // navigate("/addCandidates/personalDetails", {
  //   state: { FormData: data },
  // });
  // };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {/* h-screen overflow-y-auto scrollbar-hide */}
      {/* Character Referees */}
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
                onClick={() => removeCharacterReferee(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddReferee} // Add a new referee with isNew: true
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Relatives Employed by the Company */}
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
                onClick={() => removeRelative(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
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

      {/* Brief Description of Present Duties */}
      <div>
        <label className="text_size_6 mb-3">
          Brief Description of Present Duties
        </label>
        <Controller
          name="description"
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

      {/* Emergency Contact */}
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
                onClick={() => removeEmergency(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
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

      {/* Yes or NO */}

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
              <div className="flex items-center gap-2">
                <Controller
                  name={section.field}
                  control={control}
                  defaultValue="no" // Set initial value
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`${section.field}_yes`}
                        {...field}
                        value="yes"
                        name={`${section.field}`}
                        className="border p-2.5 rounded"
                      />
                      <label htmlFor={`${section.field}_yes`}>Yes</label>
                    </>
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <Controller
                  name={section.field}
                  control={control}
                  defaultValue="no" // Set initial value
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`${section.field}_no`}
                        {...field}
                        value="no"
                        name={`${section.field}`}
                        defaultChecked
                        className="border p-2.5 rounded"
                      />
                      <label htmlFor={`${section.field}_no`}>No</label>
                    </>
                  )}
                />
              </div>
            </div>

            {/* Conditional Description Input */}
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
                defaultValue="" // Set initial value
                render={({ field }) => (
                  <input
                    id={`${section.field}Desc`}
                    {...field}
                    className={`w-[450px] mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded ${
                      errors[`${section.field}Desc`] ? "border-red-500" : ""
                    }`}
                    disabled={watch(section.field) !== "yes"} // Disable when "No" is selected
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

      {/* Submit Button */}
      <div className="flex justify-center my-7 gap-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};
