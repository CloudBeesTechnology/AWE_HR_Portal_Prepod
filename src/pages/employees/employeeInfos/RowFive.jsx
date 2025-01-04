import { MaritalDD, NationalCatDD } from "../../../utils/DropDownMenus"
import { FormField } from "../../../utils/FormField"


export const RowFive = ({register,errors,dropDownVal}) => {
  const nationalityDD = dropDownVal[0]?.nationalityDD.map((item) => ({
    value: item,
    label: item,
  }));
  return (
    <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="National Category"
            register={register}
            name="nationalCat"
            type="select"
            options={nationalityDD}
            errors={errors}
          />

          <FormField
            label="Marital Status"
            register={register}
            name="marital"
            type="select"
            options={MaritalDD}
            errors={errors}
          />
        </div>
  )
}
