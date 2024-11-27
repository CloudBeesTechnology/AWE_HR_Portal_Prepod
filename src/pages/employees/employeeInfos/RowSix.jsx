import { CountryORDD, NationalityDD } from "../../../utils/DropDownMenus";
import { FormField } from "../../../utils/FormField";

export const RowSix = ({
  register,
  errors,
  handleNationalityChange,
  handleCountryChange,
  selectedNationality,
  selectedCountry,
  watch,
}) => {
  const oCOfOrigin = watch("oCOfOrigin" || "");
  const otherNation = watch("otherNation" || "");
  const nation = watch("nationality" || "");
  const countryofOrigin = watch("ctryOfOrigin" || "");
  return (
    <div className="flex gap-5 form-group">
      <div className="flex flex-1 gap-7">
        {/* Nationality Field */}
        <FormField
          label="Nationality"
          register={register}
          name="nationality"
          type="select"
          options={NationalityDD}
          errors={errors}
          onChange={handleNationalityChange}
        />

        {/* Conditionally render the 'Other Nationality' input field */}
        {(selectedNationality === "Other" ||
          (otherNation && nation === "Other")) && (
          <FormField
            label="Other Nationality"
            register={register}
            name="otherNation"
            type="text"
            errors={errors}
          />
        )}
      </div>

      <div className="flex flex-1 gap-7">
        {/* Country of Origin Field */}
        <FormField
          label="Country of Origin"
          register={register}
          name="ctryOfOrigin"
          type="select"
          options={CountryORDD}
          errors={errors}
          onChange={handleCountryChange}
        />

        {/* Conditionally render the 'Other Country of Origin' input field */}
        {(selectedCountry === "Other" ||
          (oCOfOrigin && countryofOrigin === "Other")) && (
          <FormField
            label="Other Country of Origin"
            register={register}
            name="oCOfOrigin"
            type="text"
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};
