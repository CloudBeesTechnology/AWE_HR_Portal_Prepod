import { MaritalDD, NationalCatDD } from "../../../utils/DropDownMenus"
import { FormField } from "../../../utils/FormField"


export const RowFive = ({register,errors,dropDownVal}) => {
  
  return (
    <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="National Category"
            register={register}
            name="nationalCat"
            type="select"
            options={NationalCatDD}
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
