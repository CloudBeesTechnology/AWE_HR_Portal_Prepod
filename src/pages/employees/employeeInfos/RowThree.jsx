import { GenderDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";
export const RowThree = ({ register, errors }) => {
  return (
    <div className="form-group grid grid-cols-1 md:grid-cols-3 gap-5">
      <FormField
        label="Name"
        register={register}
        name="name"
        type="text"
        errors={errors}
      />

      <FormField
        label="Gender"
        register={register}
        name="gender"
        type="select"
        options={GenderDD}
        errors={errors}
      />
      <FormField
        label="Date of Birth"
        register={register}
        name="dob"
        type="date"
        errors={errors}
      />
    </div>
  );
};
