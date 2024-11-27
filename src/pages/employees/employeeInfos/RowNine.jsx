
import { EducLevelDD } from '../../../utils/DropDownMenus'
import { FormField } from '../../../utils/FormField'

export const RowNine = ({register,errors}) => {
  return (
    <div className="grid grid-cols-3 gap-5 form-group">
    <FormField
      label="Academic / Technical qualification"
      register={register}
      name="aTQualify"
      type="text"
      errors={errors}
    />

    <FormField
      label="Education Level"
      register={register}
      name="educLevel"
      type="select"
      options={EducLevelDD}
      errors={errors}
    />

    <FormField
      label="Contact Number"
      register={register}
      name="contactNo"
      type="text"
      errors={errors}
    />
  </div>
  )
}
