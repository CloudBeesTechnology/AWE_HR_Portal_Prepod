// import React, { useState, useRef, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { IoIosCalendar } from "react-icons/io";

// export const FilterMonthAndYear = ({ onDateChange }) => {
//   const [selectedDate, setSelectedDate] = useState(null); 
//   const [isOpen, setIsOpen] = useState(false);
//   const datePickerRef = useRef(); 

//   const handleChange = (date) => {
//     setSelectedDate(date); 
//     if (date) {
//       const month = date.getMonth() + 1; 
//       const year = date.getFullYear();
//       onDateChange(month.toString().padStart(2, "0"), year); 
//     }
//     setIsOpen(false);
//   };

//   const toggleDatePicker = () => {
//     setIsOpen((prev) => !prev); 
//   };

//   // Close date picker if clicked outside
//   const handleClickOutside = (event) => {
//     if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
//       setIsOpen(false); 
//     }
//   };

//   // Add event listener for clicks outside
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative w-3/5">
//       <div
//         className='py-2 w-full bg-white border text-grey border-lite_grey rounded-xl flex items-center px-5 gap-2'
//         ref={datePickerRef}
//       >
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleChange}
//           showMonthYearPicker
//           dateFormat="MM/yyyy"
//           className="outline-none w-full"
//           placeholderText="Month/Year"
//           open={isOpen} 
//         />
//         <IoIosCalendar onClick={toggleDatePicker} style={{ cursor: "pointer" }} /> 
//       </div>
//     </div>
//   );
// };


// import React, { useState, useRef, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { IoIosCalendar } from "react-icons/io";

// export const FilterMonthAndYear = ({ onDateChange }) => {
//   const [selectedDate, setSelectedDate] = useState(null); 
//   const [isOpen, setIsOpen] = useState(false);
//   const datePickerRef = useRef(); 

//   const handleChange = (date) => {
//     setSelectedDate(date); 
//     if (date) {
//       const month = date.getMonth() + 1; 
//       const year = date.getFullYear();
//       onDateChange(month.toString().padStart(2, "0"), year); 
//     }
//     setIsOpen(false);
//   };

//   const toggleDatePicker = () => {
//     setIsOpen((prev) => !prev); 
//   };

//   // Close date picker if clicked outside
//   const handleClickOutside = (event) => {
//     if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
//       setIsOpen(false); 
//     }
//   };

//   // Add event listener for clicks outside
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative w-3/5">
//       <div
//         className='py-2 w-full bg-white border text-grey border-lite_grey rounded-xl flex items-center px-5 gap-2'
//         ref={datePickerRef}
//       >
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleChange}
//           showMonthYearPicker
//           dateFormat="MM/yyyy"
//           className="outline-none w-full"
//           placeholderText="Month/Year"
//           open={isOpen} 
//         />
//         <IoIosCalendar onClick={toggleDatePicker} style={{ cursor: "pointer" }} /> 
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
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
          className="uppercase outline-none text-sm w-full"
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

