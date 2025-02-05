import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";

const Performance = ({ title, name, register, formData, handleInputChange }) => {
  const [selectedPerformance, setSelectedPerformance] = useState("");
  const [details, setDetails] = useState("");
  const location = useLocation();

  const { employeeData } = location.state || {};

  useEffect(() => {
    if (formData?.probData) {
      setSelectedPerformance(formData.probData[name] || "");
      setDetails(formData.probData[`${name}Details`] || "");
    } else {
      setSelectedPerformance(""); // Reset for create method
      setDetails(""); // Reset for create method
    }
  }, [formData, name]);

  const performanceOptions = [
    { value: "exceeding", label: "Exceeding expectations" },
    { value: "meeting", label: "Meeting expectations" },
    { value: "notMeeting", label: "Not meeting expectations (provide details)" },
  ];

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setSelectedPerformance(value);
    handleInputChange(event);
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setDetails(value);
    handleInputChange({
      target: { name, value },
    });
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2">
        {performanceOptions.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}_${option.value}`}
            className="flex items-center relative mt-2"
          >
            <input
              id={`${name}_${option.value}`}
              type="radio"
              name={name}
              {...register(name)}
              value={option.value}
              checked={selectedPerformance === option.value}
              onChange={handleRadioChange}
              className="mr-2 appearance-none w-5 h-5 border rounded-sm"
            />
            {option.label}
            {selectedPerformance === option.value && (
              <TiTick className="text-[#4ad84a] text-[28px] absolute -bottom-0.5 -left-0.5" />
            )}
          </label>
        ))}

        {selectedPerformance === "notMeeting" && (
          <div className="mt-4">
            <textarea
              {...register(`${name}Details`, { required: selectedPerformance === "notMeeting" })}
              value={details}
              onChange={handleDetailsChange}
              placeholder="Please provide details"
              name={`${name}Details`}
              className="w-1/3 border p-2 rounded resize-none outline-none scrollBar"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
