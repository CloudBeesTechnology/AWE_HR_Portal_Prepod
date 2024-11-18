import { useState } from "react";
import { ContractTypeDD, EmpTypeDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";

export const RowTwo = ({ register, errors, watch }) => {
  const sapNo = watch("sapNo" || "");
  const empBadgeNo = watch("empBadgeNo" || "");
  const contractType = watch("contractType" || "");
  const empType = watch("empType" || "");
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
      <FormField
        label="Contract Type"
        register={register}
        name="contractType"
        type="select"
        options={ContractTypeDD}
        watch={contractType}
        value={contractType}
        errors={errors}
      />
      <FormField
        label="Employee Type"
        register={register}
        name="empType"
        type="select"
        options={EmpTypeDD}
        errors={errors}
        value={empType}
      />
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
