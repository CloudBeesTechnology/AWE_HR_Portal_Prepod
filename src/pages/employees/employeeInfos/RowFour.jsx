import { useEffect, useState } from "react";
import { RaceDD, ReligionDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";

export const RowFour = ({
  register,
  errors,
  handleRaceChange,handleRelegianChange,
  selectedRace,selectedReligion,
 watch,dropDownVal
}) => {
    
  const religionDD = dropDownVal[0]?.religionDD.map((item) => ({
    value: item,
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
  const raceDD = dropDownVal[0]?.raceDD.map((item) => ({
    value: item,
    label: item.split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "),
  }));
  const race = watch("race" || "");
  const religion = watch("Religion" || "");
  const otherRace = watch("otherRace" || "");
  const otherReligion = watch("otherReligion" || "");
  return (
    <div className="grid grid-cols-2 gap-5 form-group">
      {/* Religion dropdown */}
      <div className="flex items-center gap-5">

      <FormField
        label="Religion"
        register={register}
        name="religion"
        type="select"
        options={religionDD}
        onChange={handleRelegianChange}
        errors={errors}
      />
   {(selectedReligion === "OTHERS" || (otherReligion && religion === "OTHERS")) && (
          <FormField
            label="Other Religion"
            register={register}
            name="otherReligion"
            type="text"
            watch={otherReligion} // Bind the value of the "Other Race" input
            errors={errors}
            placeholder="Enter Other Religion"
          />
        )}
        </div>
      {/* Race dropdown and Other Race input */}
      <div className="flex items-center gap-5">
        <FormField
          label="Race"
          register={register}
          name="race"
          type="select"
          watch={race}
          options={raceDD}
          errors={errors}
          onChange={handleRaceChange} // Make sure this function is defined in your component
        />

        {/* Conditionally render the 'Other Race' input beside Race dropdown */}
        {(selectedRace === "OTHER" || (otherRace && race === "OTHER")) && (
          <FormField
            label="Other Race"
            register={register}
            name="otherRace"
            type="text"
            watch={otherRace} // Bind the value of the "Other Race" input
            errors={errors}
            placeholder="Enter Race"
          />
        )}
      </div>
    </div>
  );
};
