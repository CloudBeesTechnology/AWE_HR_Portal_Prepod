import { FormField } from "../../../utils/FormField";

export const RowThirteen = ({ register, errors }) => {
  return (
    <>
      <FormField
        label="Bank Name"
        type="text"
        name="bankName"
        register={register}
        errors={errors}
      />
      <FormField
        label="Bank Account Number"
        type="text"
        name="bankAccNo"
        register={register}
        errors={errors}
      />
    </>
  );
};
