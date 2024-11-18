import { FormField } from "../../../utils/FormField"

export const RowEight = ({register,errors}) => {
  return (
    <div className="grid grid-cols-4 gap-5 form-group">
    <FormField
      label="Passport Number"
      register={register}
      name="ppNo"
      type="text"
      errors={errors}
    />

    <FormField
      label="Passport Issue Date"
      register={register}
      name="ppIssued"
      type="date"
      errors={errors}
    />

    <FormField
      label="Passport Expiry"
      register={register}
      name="ppExpiry"
      type="date"
      errors={errors}
    />

    <FormField
      label="Passport issued destination"
      register={register}
      name="ppDestinate"
      type="text"
      errors={errors}
    />
  </div>
  )
}
