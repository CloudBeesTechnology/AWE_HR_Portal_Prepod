import { Controller } from "react-hook-form";
import { FormField } from "../../../utils/FormField";
import { RelationshipDD } from "../../../utils/DropDownMenus";

export const WIRowTwo = ({
  register,
  errors,
  watch,
  dropDownVal,
  setValue,
  control,
}) => {
  const relationshipDD = dropDownVal[0]?.relationshipDD.map((item) => ({
    value: item,
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
  return (
    <div className="grid grid-cols-3 gap-5 form-group mt-5">
      <FormField
        label="Employee Status"
        register={register}
        name="relationship"
        type="select"
        options={relationshipDD}
        errors={errors}
      />

      <FormField
        label="Upgrade Position"
        register={register}
        name="upgradePosition"
        type="text"
        errors={errors}
        // arrayString={true}
      />

      <FormField
        label="Position Upgrade Effective Date"
        register={register}
        name="upgradeDate"
        type="date"
        errors={errors}
      />

      <FormField
        label="Contract Period Status"
        register={register}
        name="contractPeriod"
        type="text"
        errors={errors}
      />

      <FormField
        label="Contract Start Date"
        register={register}
        name="contractStart"
        type="date"
        errors={errors}
        // errorValue={errorValue}
      />

      <FormField
        label="Contract End Date"
        register={register}
        name="contractEnd"
        type="date"
        errors={errors}

        // errorValue={errorValue}
      />

      <FormField
        label="Probation Duration"
        register={register}
        name="probDuration"
        type="text"
        errors={errors}
      />
      <FormField
        label="Probationary Start Date"
        register={register}
        name="probationStart"
        type="date"
        errors={errors}
      />
      <FormField
        label="Probationary End Date"
        register={register}
        name="probationEnd"
        type="date"
        errors={errors}
      />
    </div>
  );
};

