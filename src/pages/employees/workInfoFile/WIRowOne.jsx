import React, { useState, useEffect } from "react";
import { FormField } from "../../../utils/FormField";

export const WIRowOne = ({
  register,
  errors,
  watch,
  onChange,
  selection,
  dropDownVal,
}) => {
  console.log(dropDownVal);
  
  const DepartmentDD = dropDownVal[0]?.departmentDD.map((item) => ({
    value: item,
    label: item,
  }));
  const positionDD = dropDownVal[0]?.positionDD.map((item) => ({
    value: item,
    label: item,
  }));
  const jobCatDD = dropDownVal[0]?.jobCatDD.map((item) => ({
    value: item,
    label: item,
  }));



  // Watch specific fields
  const department = watch("department");
  const otherDepartment = watch("otherDepartment");

  const position = watch("position");
  const otherPosition = watch("otherPosition");

  const jobCat = watch("jobCat");
  const otherJobCat = watch("otherJobCat");

  return (
    <div>
      {/* Department Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
          <FormField
            label="Department"
            register={register}
            name="department"
            type="select"
            options={DepartmentDD}
            errors={errors}
            onChange={onChange}
          />
        </div>
        <div>
          {(selection.department === "OTHER" ||
            otherDepartment ||
            department === "OTHER") && (
            <FormField
              label="Other Department"
              register={register}
              name="otherDepartment"
              type="text"
              errors={errors}
            />
          )}
        </div>
      </div>

      {/* Position Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
          <FormField
            label="Position"
            register={register}
            name="position"
            type="select"
            options={positionDD}
            errors={errors}
            onChange={onChange}
          />
        </div>
        {/* Conditionally render the 'Other Country of Origin' input field */}
        <div>
        {(selection.position === "OTHER" ||
          (otherPosition || position === "OTHER")) && (
          <FormField
            label="Other Position"
            register={register}
            name="otherPosition"
            type="text"
            errors={errors}
          />
        )}
        </div>
      </div>

      {/* Job Category Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
        <FormField
          label="Job Category"
          register={register}
          name="jobCat"
          type="select"
          options={jobCatDD}
          errors={errors}
          onChange={onChange}
        />
          
        </div>
        <div>
        {(selection.jobCat === "OTHER" ||
          (otherJobCat || jobCat === "OTHER")) && (
          <FormField
            label="Other Job"
            register={register}
            name="otherJobCat"
            type="text"
            errors={errors}
          />
        )}
        </div>
      </div>
    </div>
  );
};
