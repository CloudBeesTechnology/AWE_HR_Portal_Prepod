import { Controller } from "react-hook-form";
import { FormField } from "../../../utils/FormField";
import { RelationshipDD } from "../../../utils/DropDownMenus";

export const WIRowTwo = ({
  register,
  errors,
  watch,
  setValue,
  control,
  upgradePosition,
  upgradeDate,
  contractPeriod,
  contractStart,
  contractEnd,
  probDuration,
  probationStart,
  probationEnd,
}) => {
  const relationship = watch("relationship");

  return (
    <div className="grid grid-cols-3 gap-5 form-group mt-5">
      {/* Relationship */}
      {/* <Controller
        name="relationship"
        control={control}
        render={({ field }) => (
          <FormField
            label="Employee Status"
            name={field.name}
            type="selectOption"
            value={field.value}
            setValue={setValue}
            options={RelationshipDD}
            watch={watch}
            register={() => field}
            errors={errors}
            append={true}
          />
        )}
      /> */}
      <FormField
        label="Employee Status"
        register={register}
        name="relationship"
        type="select"
        options={RelationshipDD}
        errors={errors}
      />

      <FormField
        label="Upgrade Position"
        register={register}
        name="upgradePosition"
        type="text"
        // control={control}
        // watch={upgradePosition}
        // setValue={setValue}
        // isArray
        // append={true}
        errors={errors}
        // arrayString={true}
      />

      <FormField
        label="Position Upgrade Effective Date"
        register={register}
        name="upgradeDate"
        type="date"
        // control={control}
        // watch={upgradeDate}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayDate={true}
        errors={errors}
      />

      <FormField
        label="Contract Period Status"
        register={register}
        name="contractPeriod"
        type="text"
        errors={errors}

        // control={control}
        // watch={contractPeriod}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayString={true}
      />

      <FormField
        label="Contract Start Date"
        register={register}
        name="contractStart"
        type="date"
        // control={control}
        // watch={contractStart}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayDate={true}
        errors={errors}
        // errorValue={errorValue}
      />

      <FormField
        label="Contract End Date"
        register={register}
        name="contractEnd"
        type="date"
        // control={control}
        // watch={contractEnd}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayDate={true}
        errors={errors}

        // errorValue={errorValue}
      />

      <FormField
        label="Probation Duration"
        register={register}
        name="probDuration"
        type="text"
        errors={errors}
        // control={control}
        // watch={probDuration}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayString={true}
      />
      <FormField
        label="Probationary Start Date"
        register={register}
        name="probationStart"
        type="date"
        errors={errors}
        // control={control}
        // watch={probationStart}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayDate={true}
        // errorValue={errorValue}
      />
      <FormField
        label="Probationary End Date"
        register={register}
        name="probationEnd"
        type="date"
        errors={errors}
        // control={control}
        // watch={probationEnd}
        // setValue={setValue}
        // isArray
        // append={true}
        // arrayDate={true}
        // errorValue={errorValue}
      />
    </div>
  );
};

