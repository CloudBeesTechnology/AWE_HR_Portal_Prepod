import React, { useState, useEffect } from "react";
import { DepartmentDD, JobCatDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";
import { WorkDataPass } from "../WorkDataPass";
import { Controller } from "react-hook-form";

export const WIRowOne = ({ register, errors, watch, setValue, control,onChange,selection }) => {

  // Watch specific fields
  const department = watch("department");
  const otherDepartment = watch("otherDepartment");

  const position = watch("position");
  const otherPosition = watch("otherPosition");

  const jobCat = watch("jobCat");
  const otherJobCat = watch("otherJobCat");

  // console.log(jobCat);

  // // Update display states based on field values
  // useEffect(() => {
  //   setForDisplaydep(department === "Other");
  //   setForDisplaypos(position === "Other");
  //   setForDisplayjob(jobCat === "Other");
  // }, [department, position, jobCat]);

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
          {/* <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <FormField
                label="Department"
                name={field.name}
                type="selectOption"
                value={field.value}
                setValue={setValue}
                options={DepartmentDD}
                // onChange={(e) => setValue("department", e.target.value)} // Use setValue to update field
                watch={watch}
                register={() => field}
                errors={errors}
                append={true}
              />
            )} */}
          {/* /> */}
        </div>
        <div>
        {(selection.department === "Other" ||
          (otherDepartment && department === "Other")) && (
          <FormField
            label="Other Department"
            register={register}
            name="otherDepartment"
            type="text"
            errors={errors}
          />
        )}
        </div>
        {/* {Array.isArray(department) && department.includes("Other") && (
          <div>
            <FormField
              label="Other Department"
              register={register}
              name="otherDepartment"
              type="text"
              setValue={setValue}
              errors={errors}
            />
          </div>
        )} */}
      </div>

      {/* Position Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
        <FormField
          label="Position"
          register={register}
          name="position"
          type="select"
          options={WorkDataPass.positions.map((position) => ({
            value: position,
            label: position,
          }))}
          errors={errors}
          onChange={onChange}
        />

        
          {/* <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <FormField
                label="Position"
                name={field.name}
                type="selectOption"
                value={field.value}
                setValue={setValue}
                options={WorkDataPass.positions.map((position) => ({
                  value: position,
                  label: position,
                }))}
                watch={watch}
                // onChange={(e) => setValue("position", e.target.value)} // Use setValue to update field
                register={() => field}
                errors={errors}
                append={true}
              />
            )}
          /> */}
        </div>
        {/* Conditionally render the 'Other Country of Origin' input field */}
        <div>
        {(selection.position === "Other" ||
          (otherPosition && position === "Other")) && (
          <FormField
            label="Other Position"
            register={register}
            name="otherPosition"
            type="text"
            errors={errors}
          />
        )}
        </div>
        {/* {Array.isArray(position) && position.includes("Other") && (
          <div>
            <FormField
              label="Other Position"
              register={register}
              setValue={setValue}
              name="otherPosition"
              type="text"
              errors={errors}
            />
          </div>
        )} */}
      </div>

      {/* Job Category Field */}
      <div className="grid grid-cols-2 gap-5 form-group mt-2">
        <div>
        <FormField
          label="Job Category"
          register={register}
          name="jobCat"
          type="select"
          options={JobCatDD}
          errors={errors}
          onChange={onChange}
        />
          {/* <Controller
            name="jobCat"
            control={control}
            render={({ field }) => (
              <FormField
                label="Job Category"
                name={field.name}
                type="selectOption"
                value={field.value}
                setValue={setValue}
                options={JobCatDD}
                watch={watch}
                // onChange={(e) => setValue("jobCat", e.target.value)} // Use setValue to update field
                register={() => field}
                errors={errors}
                append={true}
              />
            )}
          /> */}
        </div>
        <div>
        {(selection.jobCat === "Other" ||
          (otherJobCat && jobCat === "Other")) && (
          <FormField
            label="Other Job"
            register={register}
            name="otherJobCat"
            type="text"
            errors={errors}
          />
        )}
        </div>
        {/* {Array.isArray(jobCat) && jobCat.includes("Other") && (
          <div>
            <FormField
              label="Other Job"
              register={register}
              setValue={setValue}
              name="otherJobCat"
              watch={otherJobCat}
              type="text"
              errors={errors}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
