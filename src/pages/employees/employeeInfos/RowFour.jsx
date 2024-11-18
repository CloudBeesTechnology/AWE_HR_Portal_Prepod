import { useEffect, useState } from "react";
import { RaceDD, ReligionDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";

export const RowFour = ({
  register,
  errors,
  handleRaceChange,
  selectedRace,
 watch
}) => {
  const race = watch("race" || "");
  const otherRace = watch("otherRace" || "");
  return (
    <div className="grid grid-cols-2 gap-5 form-group">
      {/* Religion dropdown */}
      <FormField
        label="Religion"
        register={register}
        name="religion"
        type="select"
        options={ReligionDD}
        errors={errors}
      />

      {/* Race dropdown and Other Race input */}
      <div className="flex items-center gap-5">
        <FormField
          label="Race"
          register={register}
          name="race"
          type="select"
          watch={race}
          options={RaceDD}
          errors={errors}
          onChange={handleRaceChange} // Make sure this function is defined in your component
        />

        {/* Conditionally render the 'Other Race' input beside Race dropdown */}
        {(selectedRace === "Other" || (otherRace && race === "other")) && (
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
