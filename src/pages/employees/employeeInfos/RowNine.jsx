
import { EducLevelDD } from '../../../utils/DropDownMenus'
import { FormField } from '../../../utils/FormField'

export const RowNine = ({register,errors,dropDownVal}) => {
  const educLevelDD = dropDownVal[0]?.educLevelDD.map((item) => ({
    value: item,
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
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
      options={educLevelDD}
      errors={errors}
    />

    <FormField
      label="Contact Number"
      register={register}
      name="contactNo"
      type="number"
      errors={errors}
    />
  </div>
  )
}
