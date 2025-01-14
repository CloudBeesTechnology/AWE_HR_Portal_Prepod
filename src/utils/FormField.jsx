import { useEffect, useState } from "react";
import { get } from "lodash";
import { Controller } from "react-hook-form";

export const FormField = ({
  label,
  name,
  type = "text",
  options = [],
  register,
  value,
  errors,
  select,
  onChange,
  valueData,
  setValue,
  append,
  isArray,
  control,
  errorValue,
  arrayString,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    value || (isArray ? [] : "")
  );

  useEffect(() => {
    if (value !== undefined) {
      // Trim whitespace from the fetched value
      const updatedValue = Array.isArray(value)
        ? value.map((val) => val.trim()) // Trim each value in the array
        : value.trim(); // Trim the string value

      setSelectedOption(updatedValue);
    }
  }, [value, isArray]);

  const errorMessage = get(errors, name)?.message;

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value

    if (append) {
      const newSelectedOption = selectedOption.includes(selectedValue)
        ? selectedOption
        : [...selectedOption, selectedValue];
      setSelectedOption(newSelectedOption);
      if (setValue) {
        setValue(name, newSelectedOption);
      }
      if (onChange) onChange(e);
    } else {
      setSelectedOption(selectedValue);
      if (setValue) {
        setValue(name, isArray ? [selectedValue] : selectedValue);
      }
      if (onChange) onChange(e);
    }
  };

  // Process options: trim and convert to uppercase
  const processedOptions = options.map((option) => ({
    ...option,
    value:
      typeof option?.value === "string"
        ? option?.value.trim()
        : option?.value, // Ensure value is a string before applying trim and toUpperCase
    label:
      typeof option?.label === "string" ? option?.label.trim() : option?.label, // Ensure label is a string before applying trim
  }));

  return (
    <div className="form-group w-full">
      <label className="block text_size_6">{label}</label>
      {type === "selectOption" ? (
        <select
          className="input-field select-custom"
          {...register(name)}
          value={
            Array.isArray(selectedOption)
              ? selectedOption[selectedOption?.length - 1] || ""
              : selectedOption || ""
          }
          onChange={(e) => {
            handleSelectChange(e);
          }}
        >
          <option value="">{select || " "}</option>
          {processedOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "select" ? (
        <select
          className="input-field select-custom"
          {...register(name)}
          onChange={handleSelectChange}
        >
          <option value={`${valueData || ""}`}>{select}</option>
          {processedOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : arrayString && control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="text"
                className="input-field border"
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const textValue = e.target.value;
                  field.onChange(isArray ? [textValue] : textValue);
                }}
              />
            </div>
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          className="input-field border"
          {...register(name)} // Connect to React Hook Form
        />
      )}

      {selectedOption === "other" && (
        <input
          type="text"
          className="input-field border mt-2"
          placeholder="Please specify"
          value={value}
          {...register(`${name}Details`)}
        />
      )}
      {/* Display error message */}
      {errorValue?.[name]?.[0]?.message && (
        <p className="text-[red] text-[12px] pt-2">
          {errorValue?.[name]?.[0]?.message}
        </p>
      )}

      {/* General error message */}
      {errorMessage && (
        <p className="text-[red] text-[12px] pt-2">{errorMessage}</p>
      )}
    </div>
  );
};
