import { FormField } from '../../../utils/FormField'

export const RowTen = ({register,errors}) => {
  return (
    <div className="grid grid-cols-3 gap-5 form-group">
    <FormField
      label="Email Address"
      type="email"
      name="email"
      register={register}
      errors={errors}
    />
    <FormField
      label="Official Email Address"
      type="email"
      name="officialEmail"
      register={register}
      errors={errors}
    />

    <FormField
      label="Home Address"
      type="textarea"
      name="permanentAddress"
      register={register}
      errors={errors}
    />
  </div>
  )
}
