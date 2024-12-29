import { useFieldArray } from "react-hook-form";
import { FormField } from "../../../utils/FormField";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useRef } from "react";

export const RowEleven = ({
  register,
  errors,
  control,
  value,
  watch,
  setValue,
}) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const isInitialMount = useRef(true);

  // Watch familyDetails to ensure it's synced with the form state
  const familyDetails = watch("familyDetails");

  useEffect(() => {
    if (isInitialMount.current) {
      if (value && value.length > 0) {
        // Log the value to see its format
        console.log("Received value:", value);
  
        let parsedValue;
  
        try {
          if (typeof value === "string") {
            // Attempt to clean up the string by removing unnecessary escape characters
            const cleanedValue = value.replace(/\\"/g, '"'); // Remove escaped quotes
            console.log("Cleaned value:", cleanedValue);
  
            // Try to parse the cleaned string
            parsedValue = JSON.parse(cleanedValue);
          } else {
            parsedValue = value; // If value is already an array, use it directly
          }
  
          replace(parsedValue); // Replace fields with parsed data
          setValue("familyDetails", parsedValue); // Set the form value
        } catch (error) {
          console.error("Error parsing value:", error);
        }
      } else {
        append({
          name: "",
          relationship: "",
          contact: "",
          address: "",
          isNew: false,
        });
      }
      isInitialMount.current = false;
    } else if (value && value.length > 0) {
      // Ensure the fields are replaced when value updates later
      let parsedValue;
  
      try {
        if (typeof value === "string") {
          const cleanedValue = value.replace(/\\"/g, '"'); // Handle escaped quotes
          console.log("Cleaned value (on update):", cleanedValue);
  
          parsedValue = JSON.parse(cleanedValue);
        } else {
          parsedValue = value;
        }
  
        replace(parsedValue); // Replace fields with parsed data
        setValue("familyDetails", parsedValue); // Set the form value
      } catch (error) {
        console.error("Error parsing value (on update):", error);
      }
    }
  }, [value, append, replace, setValue]);
  
  
  const handleAddFamily = () => {
    append({
      name: "",
      relationship: "",
      contact: "",
      address: "",
      isNew: true,
    });
  };

  return (
    <div className="relative">
      <label className="block text_size_5">Employee Next of Kin Info</label>

      {/* Render existing entries with a conditional remove button */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-4 form-group gap-5 mt-4 relative"
        >
          <FormField
            label="Name"
            type="text"
            name={`familyDetails.${index}.name`}
            register={register}
            errors={errors}
            // value={familyDetails?.[index]?.name || ""}
            // value={familyDetails ? familyDetails[index]?.name || "" : ""} 
          />
          <FormField
            label="Relationship"
            type="text"
            name={`familyDetails.${index}.relationship`}
            register={register}
            errors={errors}
            // value={familyDetails?.[index]?.relationship || ""}
          />
          <FormField
            label="Contact number"
            type="text"
            inputmode="numeric"
            name={`familyDetails.${index}.contact`}
            register={register}
            errors={errors}
            // value={familyDetails?.[index]?.contact || ""}
          />
          <FormField
            label="Home address"
            type="text"
            name={`familyDetails.${index}.address`}
            register={register}
            errors={errors}
            value={familyDetails?.[index]?.address || ""}
          />

          {/* Conditionally render the remove button only if the field is marked as new */}
          {field.isNew && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 -right-8 text-medium_grey text-[18px]"
            >
              <FaRegMinusSquare /> {/* Minus icon */}
            </button>
          )}
        </div>
      ))}

      {/* Add New Kin button */}
      <button
        type="button"
        onClick={handleAddFamily}
        className="mt-4 flex items-center text-medium_grey text-[20px] absolute -right-8 top-16"
      >
        <CiSquarePlus className="mr-2" />
      </button>
    </div>
  );
};