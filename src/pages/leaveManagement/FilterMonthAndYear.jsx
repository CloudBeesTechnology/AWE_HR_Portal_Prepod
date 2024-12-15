// import React, { useState, useRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaCalendarAlt } from "react-icons/fa";

// export const FilterMonthAndYear = ({ onDateChange, selectedDate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const datePickerRef = useRef();

//   const handleChange = (date) => {
//     if (date) {
//       const isoString = date.toISOString();
//       console.log('Selected date:', isoString); // Log the selected date
//       onDateChange(isoString); // Pass the ISO string back to parent
//     } else {
//       onDateChange(""); // If no date selected, clear the date in parent
//     }
//     setIsOpen(false); // Close the calendar after selection
//   };

//   const handleIconClick = () => {
//     setIsOpen((prev) => !prev); // Toggle the calendar
//   };

//   return (
//     <div className="relative" style={{ width: "200px" }}>
//       <div className="rounded-md flex items-center py-2 w-full text_size_5 bg-white border text-grey border-lite_grey px-3 gap-2">
//         <DatePicker
//           ref={datePickerRef}
//           selected={selectedDate ? new Date(selectedDate) : null} // Display the selected date in the input
//           onChange={handleChange}
//           dateFormat="dd/MM/yyyy"
//           placeholderText="Select a date"
//           className="outline-none w-full text-sm"
//           open={isOpen}
//           onCalendarClose={() => setIsOpen(false)} // Close calendar after selection
//         />
//         <FaCalendarAlt
//           className="absolute right-2 text-gray-400 cursor-pointer"
//           onClick={handleIconClick} // Toggle calendar visibility
//         />
//       </div>
//     </div>
//   );
// };
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

export const FilterMonthAndYear = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef();

  const handleChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      const year = date.getFullYear().toString();
      onDateChange(`${month}, ${day}, ${year}`);
    } else {
      onDateChange("");
    }
    setIsOpen(false);
  };

  const handleIconClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" style={{ width: '200px' }}>
      <div className="rounded-md flex items-center py-2 w-full text_size_5 bg-white border text-grey border-lite_grey ${border} px-3 gap-2">
        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className="outline-none w-full text-sm"
          open={isOpen}
          onCalendarClose={() => setIsOpen(false)}
        />
        <FaCalendarAlt 
          className="absolute right-2 text-gray-400 cursor-pointer" 
          onClick={handleIconClick} 
        />
      </div>
    </div>
  );
};

