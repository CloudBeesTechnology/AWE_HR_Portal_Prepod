import { useEffect, useState } from "react";
import { ContractTypeDD, EmpTypeDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";
import { Controller } from "react-hook-form";

export const RowTwo = ({ register, errors, watch, setValue, control }) => {
  const sapNo = watch("sapNo" || "");
  const empBadgeNo = watch("empBadgeNo" || "");
  const contractType = watch("contractType" || []);
  const empType = watch("empType" || []);

  // useEffect(() => {
  //   const transformedContractType =
  //     typeof contractType === "string" ? [contractType] : contractType;
  //   const transformedEmpType =
  //     typeof empType === "string" ? [empType] : empType;

  //   console.log("Contract Type:", transformedContractType);
  //   console.log("Employee Type:", transformedEmpType);
  // }, [contractType, empType]);

  // const onSubmit = (data) => {
  //   console.log("Final Submitted Data:", data);
  // };
  // const [justT,setJustT]=useState([])
  // const handlesleceted = (e) => {
  //   const selectedValues = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );

  //   setJustT((prev) => [...prev, ...selectedValues]);  // Spread previous values and append new selected values
  //   console.log(selectedValues);
  // };
  // const submit=()=>{
  //   console.log(justT);

  // }
  return (
    <div className="form-group grid grid-cols-1 md:grid-cols-4 gap-5">
      <FormField
        label="Badge Number"
        register={register}
        watch={empBadgeNo}
        name="empBadgeNo"
        errors={errors}
      />
      <FormField
        label="SAP Number"
        register={register}
        watch={sapNo}
        name="sapNo"
        errors={errors}
      />

      {/* Contract Type Field */}
      <Controller
        name="contractType"
        control={control}
        render={({ field }) => (
          <FormField
            label="Contract Type"
            name={field.name}
            type="selectOption"
            value={field.value}
            setValue={setValue}
            options={ContractTypeDD}
            watch={watch}
            register={() => field}
            errors={errors}
            append={true}
          />
        )}
      />

      {/* Employee Type Field */}
      <Controller
        name="empType"
        control={control}
        render={({ field }) => (
          <FormField
            label="Employee Type"
            name={field.name}
            type="selectOption"
            value={field.value}
            setValue={setValue}
            options={EmpTypeDD}
            watch={watch}
            register={() => field}
            // setValue={(name, value) =>
            //   console.log(`${name} updated to:`, value)
            // }
            errors={errors}
            append={true}
          />
        )}
      />
      {/* <FormField
        label="Contract Type"
        register={register}
        name="contractType"
        type="select"
        options={ContractTypeDD}
        watch={watch}
        value={contractType}
        errors={errors}
        setValue={setValue}
      /> */}
      {/* <FormField
        label="Employee Type"
        register={register}
        name="empType"
        type="select"
        options={EmpTypeDD}
        watch={watch}
        errors={errors}
        setValue={setValue}
        value={empType}
      /> */}
      {/* <select
        onChange={(e) => {
          handlesleceted(e);
        }}
      >
        <option>dfgh</option>
        <option>125</option>
      </select>
      <button onClick={submit}>submit</button> */}
    </div>
  );
};
