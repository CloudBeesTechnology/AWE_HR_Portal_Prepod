import React from 'react'
import { SalaryPayDD, WorkStatusDD } from '../../../utils/DropDownMenus'
import { FormField } from '../../../utils/FormField'

export const WIRowThree = ({ register, errors, dropDownVal,watch, setValue, control }) => {
  const workStatusDD = dropDownVal[0]?.workStatusDD.map((item) => ({
    value: item,
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
  return (
    <div className="grid grid-cols-3 gap-5 form-group mt-5">
        <FormField
        label="Normal Working Hours Per Day"
        register={register}
        type="text"
        name="workHrs"
        errors={errors}

      />
      <FormField
        label="Normal Working Day Per Week"
        register={register}
        type="text"
        name="workWeek"
        errors={errors}
      />
      <FormField
        label="Normal Working Day Per Month"
        register={register}
        type="text"
        name="workMonth"
        errors={errors}
      />
      <FormField
        label="Employment Work Status"
        register={register}
        type="select"
        options={workStatusDD}
        name="workStatus"
        errors={errors}
      />
      <FormField
        label="Type of Salary Pay"
        register={register}
        type="select"
        options={SalaryPayDD}
        name="salaryType"
        errors={errors}
      />
    </div>
  )
}
