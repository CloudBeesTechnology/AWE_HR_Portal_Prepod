import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuPlusSquare } from "react-icons/lu";
import { AddInsuranceSchema } from "../../../services/EmployeeValidation";

export const Insurance = () => {
  const [notification, setNotification] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddInsuranceSchema),
    defaultValues: {
      insuranceDetails: [{ typeInsurance: "", insuranceCompany: "" }], // Initialize with one row
    },
  });

  const { fields: insuranceFields, append: appendInsurance } = useFieldArray({
    control,
    name: "insuranceDetails",
  });

  const onSubmit = async (data) => {
    try {
      const reqValue = {
        ...data,
      };
      await Promise.all([
        client.graphql({
          query: createPersonalDetails,
          variables: { input: reqValue },
        }),  ]);
      setNotification(true);
    } catch (error) {
      console.log(error);
      
      console.error(
        "Error submitting data to AWS:",
        JSON.stringify(error, null, 2)
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen p-2 my-10 bg-[#F5F6F1CC]"
    >
      {/* Employee ID Input */}
      <div className="flex justify-end items-center">
        <div className="max-w-sm">
          <label className="text_size_5">Employee ID</label> <br />
          <input
            type="text"
            className="input-field"
            {...register("empID")}
            placeholder="Enter Employee ID"
          />
          {errors.empID && (
            <p className="text-[red] text-[12px]">{errors.empID.message}</p>
          )}
        </div>
      </div>

      {/* Insurance Details */}
      <div className="mb-6 relative text_size_6">
        <div className="grid grid-cols-2 gap-5 text_size_5">
        <label className="block mb-1">Insurance Type</label>
        <label className="block mb-1">Insurance Company</label>
        </div>
        {insuranceFields.map((insurance, index) => (
          <div key={insurance.id} className="grid grid-cols-2 gap-4 mb-2">
            <input
              type="text"
              {...register(`insuranceDetails.${index}.typeInsurance`)}
              placeholder="Enter Insurance Type"
              className="mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd] outline-none rounded"
            />
            <input
              type="text"
              {...register(`insuranceDetails.${index}.insuranceCompany`)}
              placeholder=" Enter Insurance Company"
              className="mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd]  outline-none rounded"
            />
          </div>
        ))}

        {/* Button to add new row */}
        <button
          type="button"
          onClick={() =>
            appendInsurance({ typeInsurance: "", insuranceCompany: "" })
          } // Add an empty row on click
          className="absolute top-11 -right-7 text-medium_grey text-[25px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Submit Button */}
  <div className="flex justify-center items-center my-10">
         <button type="submit" className="primary_btn">
           Next
        </button>
      </div>
      {notification && (
        <SpinLogo
          text="Your Application Submitted Successfully"
          notification={notification}
          path="/recrutiles/candidate"
        />
      )}
    </form>
  );
};


