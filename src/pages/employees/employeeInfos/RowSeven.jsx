import { BwnIcColourDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";

export const RowSeven = ({
  register,
  errors,
 
}) => {
  return (
    <div className="grid grid-cols-4 gap-5 form-group">
      <FormField
        label="Brunei IC Number"
        register={register}
        name="bwnIcNo"
        type="text"
        errors={errors}
      />

      <FormField
        label="Brunei IC Colour"
        register={register}
        name="bwnIcColour"
        type="select"
        options={BwnIcColourDD}
        errors={errors}
      />

      <FormField
        label="Brunei IC Expiry"
        register={register}
        name="bwnIcExpiry"
        type="date"
        errors={errors}/>

      <FormField
        label="Malaysian IC Number"
        register={register}
        name="myIcNo"
        type="text"
        errors={errors}
      />
    </div>
  );
};
