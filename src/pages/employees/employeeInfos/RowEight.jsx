import { FormField } from "../../../utils/FormField"

export const RowEight = ({register,errors,
  value,
  control,
  setValue,
  watch,
  errorValue
}) => {
  const watchedppExpiry = watch("ppExpiry", []);
  const watchedppIssued = watch("ppIssued", []);
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
      control={control}
      watch={watchedppIssued}
      isArray
      arrayDate={true}
      errorValue={errorValue}
    />

    <FormField
      label="Passport Expiry"
      register={register}
      name="ppExpiry"
      type="date"
      errors={errors}
      control={control}
      watch={watchedppExpiry}
      isArray
      arrayDate={true}
      errorValue={errorValue}
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
