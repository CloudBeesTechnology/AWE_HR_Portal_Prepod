// import get from 'lodash.get';

// export const FormField = ({
//   label,
//   name,
//   type = "text",
//   options,
//   register,
//   errors,
//   select,
//   onChange,
//   icon,
//   uploadedFileName,
// }) => {
//   const errorMessage = get(errors, name)?.message;

//   return (
//     <div className="form-group w-full">
//       <label className="block text_size_6">{label}</label>
//       {type === "select" ? (
//         <select
//           className="input-field select-custom"
//           {...register(name)}
//           // onChange={onChange}
//           {...(onChange ? { onChange } : {})}
//         >
//           <option value="">{select}</option>
//           {options.map((option, index) => (
//             <option key={index} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input type={type} className="input-field border" {...register(name)} />
//       )}
//       {errorMessage && (
//         <p className="text-[red] text-[12px] pt-2">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import get from "lodash.get";

export const FormField = ({
  label,
  name,
  type = "text",
  options,
  register,
  value,
  errors,
  select,
  onChange,
  valueData,
  icon,
  uploadedFileName,

}) => {
  const [selectedOption, setSelectedOption] = useState("");

  // Display error only if there's no value in the selected option
  const errorMessage = !selectedOption && get(errors, name)?.message;

  const handleSelectChange = (e) => {
//     const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedOption((prev) => [...prev, ...selectedValues]);
// // console.log(selectedValues);

//     // If the onChange handler is provided by parent, pass the selected values
//     if (onChange) {
//       onChange(e);
//     }
//     console.log(selectedOption);
    
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) onChange(e); // Calls parent component's onChange if provided
  };

  return (
    <div className="form-group w-full">
      <label className="block text_size_6">{label}</label>
      {type === "select" ? (
        <select
          className="input-field select-custom"
          {...register(name)}
          onChange={handleSelectChange}
     
        >
          <option value={`${valueData || ""}`}>{select}</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          className="input-field border"
          {...register(name)}
        />
      )}

      {/* Conditionally render additional input if "other" option is selected */}
      {selectedOption === "other" && (
        <input
          type="text"
          className="input-field border mt-2"
          placeholder="Please specify"
          value={value}
          {...register(`${name}Details`)}
        />
      )}

      {/* Show error message if no value is selected and there's an error */}
      {errorMessage && !value && !valueData && (
        <p className="text-[red] text-[12px] pt-2">{errorMessage}</p>
      )}
    </div>
  );
};
