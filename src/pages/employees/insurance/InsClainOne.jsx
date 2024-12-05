import React from 'react'
import { FormField } from '../../../utils/FormField'

export const InsClainOne = ({ register, errors,index }) => {
  return (
    <div className="grid grid-cols-2 gap-5 flex-wrap">

    <FormField
      label="Clainmant Name"
      register={register}
      name={`insuranceClaims[${index}].claimantName`}
      type="text"
      errors={errors}
    />
    <FormField
      label="Date Reported to Insurance Company"
      register={register}
      name={`insuranceClaims[${index}].dateReported`}
      type="date"
      errors={errors}
    />
    <FormField
      label="Date of Payment Received "
      register={register}
      name={`insuranceClaims[${index}].paymentReceived`}
      type="date"
      errors={errors}
    />
    <FormField
      label="Date Paid to Employee "
      register={register}
      name={`insuranceClaims[${index}].datePaid`}
      type="date"
      errors={errors}
    />

    {/* <div className="flex-1">
      <label className="mb-1 text_size_5">Relationship</label>
      <select
        {...register(`insuranceClaims[${index}].depenRelation`)}
        className="input-field select-custom"
      >
        <option value=""></option>
        <option value="Spouse">Spouse</option>
        <option value="Child">Child</option>
      </select>
      {errors.insuranceClaims?.[index]?.depenRelation && (
        <p className="text-[red] text-xs mt-1">
          {errors.insuranceClaims[index].depenRelation.message}
        </p>
      )}
    </div> */}
  </div>
    )
}
