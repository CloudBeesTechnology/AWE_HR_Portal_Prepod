import React from 'react'
import { FormField } from '../../../utils/FormField'

export const DependFirstFile = ({ register, errors,index }) => {
  return (
    <div className="grid grid-cols-2 gap-5 flex-wrap">
    <FormField
      label="Dependent Name"
      register={register}
      name={`depInsurance[${index}].depenName`}
      type="text"
      errors={errors}
    />

    <div className="flex-1">
      <label className="mb-1 text_size_5">Relationship</label>
      <select
        {...register(`depInsurance[${index}].depenRelation`)}
        className="input-field select-custom"
      >
        <option value=""></option>
        <option value="Spouse">Spouse</option>
        <option value="Child">Child</option>
      </select>
      {errors.depInsurance?.[index]?.depenRelation && (
        <p className="text-[red] text-xs mt-1">
          {errors.depInsurance[index].depenRelation.message}
        </p>
      )}
    </div>
  </div>
    )
}
