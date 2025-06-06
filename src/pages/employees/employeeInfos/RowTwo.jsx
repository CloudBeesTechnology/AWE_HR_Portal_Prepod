import { ContractTypeDD, EmpTypeDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";
import { Controller } from "react-hook-form";

export const RowTwo = ({ register, errors, watch, setValue, control }) => {
  const sapNo = watch("sapNo" || "");
  const empBadgeNo = watch("empBadgeNo" || "");
  const contractType = watch("contractType" || []);
  const empType = watch("empType" || []);

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
        errors={errors}
      />
      <FormField
        label="Employee Type"
        register={register}
        name="empType"
        type="select"
        options={EmpTypeDD}
        errors={errors}
      />
      {/* Contract Type Field
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

      <Controller
        name="empType"
        control={control}
        render={({ field }) => (
          <FormField
            label="Employee Type"
            name={field.name}
            type="selectOption"
            value={field.value
              // typeof field.value === "string" ? field.value?.trim().toUpperCase() : ""
            }
            setValue={setValue}
            options={EmpTypeDD}
            watch={watch}
            register={() => field}
            errors={errors}
            append={true}
          />
        )}
      /> */}
    </div>
  );
};
