import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export const Filter = ({
  typeOfReport,
  setTypeOfReport,
  Reports,
  justFilterName,
}) => {
  const [toggleClick, setToggleClick] = useState(false);

  const handleToggle = () => {
    setToggleClick(!toggleClick);
  };

  return (
    <div>
      <div className="relative">
        <div
          className="flex items-center gap-3 border rounded p-0.5 px-3 text-sm text-secondary border-[#D9D9D9]"
          onClick={handleToggle}
        >
          <IoFilterOutline />
          <input
            readOnly
            value={justFilterName}
            placeholder="Select type"
            className="cursor-pointer rounded outline-none p-2 text-dark_grey text-sm w-full"
            onClick={() => setToggleClick(true)}
          />
        </div>
        {toggleClick && (
          <div
            className="absolute border border-[#D9D9D9] mt-1 w-full text-[16px] p-1 bg-white"
            onClick={() => setToggleClick(false)}
          >
            {Reports &&
              Reports.map((report, index) => (
                <p
                  key={index}
                  className="hover:bg-secondary hover:text-white p-1 cursor-pointer text-dark_grey"
                  onClick={() => {
                    setTypeOfReport(report.title);
                    setToggleClick(false);
                  }}
                >
                  {report.title}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};


// import React, { useEffect, useState } from "react";
// import { IoFilterOutline } from "react-icons/io5";
// import { FaAngleDown } from "react-icons/fa";
// export const Filter = ({
//   typeOfReport,
//   setTypeOfReport,
//   Reports,
//   justFilterName,
// }) => {
//   const [toggleClick, setToggleClick] = useState(false);

//   const handleToggle = () => {
//     setToggleClick(!toggleClick);
//   };
//   return (
//     <div>
//       <div className="relative">
//         <div
//           className="flex items-center gap-3  border rounded p-0.5 px-3 text-sm text-secondary border-[#D9D9D9]"
//           onClick={() => {
//             handleToggle();
//           }}
//         >
//           <IoFilterOutline />
//           <input
//             readOnly
//             value={justFilterName}
//             htmlFor="filter"
//             placeholder="Select type"
//             className="cursor-pointer rounded outline-none p-2 text-dark_grey text-sm w-full "
//             onClick={() => {
//               setToggleClick(true);
//             }}
//             onChange={() => {}}
//           />
//         </div>
//         {toggleClick && (
//           <div
//             className="filter absolute border border-[#D9D9D9] mt-1 w-full text-[16px] p-1 bg-white "
//             onClick={() => {
//               setToggleClick(false);
//             }}
//           >
//             {Reports &&
//               Reports.map((m, index) => {
//                 return (
//                   <p
//                     key={index}
//                     className="hover:bg-secondary hover:text-white p-1 cursor-pointer text-dark_grey"
//                     onClick={() => {
//                       setTypeOfReport(m.title);
//                     }}
//                   >
//                     {m.title}
//                   </p>
//                 );
//               })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
