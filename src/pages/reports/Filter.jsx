// import React, { useState } from "react";
// import { IoFilterOutline } from "react-icons/io5";

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
//           className="flex items-center gap-3 border rounded p-0.5 px-3 text-sm text-secondary  border-[#D9D9D9] bg-white"
//           onClick={handleToggle}
//         >
//           <IoFilterOutline />
//           <input
//             readOnly
//             value={justFilterName}
//             placeholder="Select type"
//             className="cursor-pointer rounded outline-none p-2 text-dark_grey text-sm w-full"
//             onClick={() => setToggleClick(true)}
//           />
//         </div>
//         {toggleClick && (
//           <div
//             className="absolute border border-[#D9D9D9] mt-1 w-full text-[16px] p-1 bg-white"
//             onClick={() => setToggleClick(false)}
//           >
//             {Reports &&
//               Reports.map((report, index) => (
//                 <p
//                   key={index}
//                   className="hover:bg-secondary hover:text-white p-1 cursor-pointer text-dark_grey border-b "
//                   onClick={() => {
//                     setTypeOfReport(report.title);
//                     setToggleClick(false);
//                   }}
//                 >
//                   {report.title}
//                 </p>
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import React from "react";

export const Filter = ({ typeOfReport, setTypeOfReport, Reports }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 p-3 border border-[#D9D9D9] bg-white rounded ">
        {Reports &&
          Reports.map((report, index) => (
            <div
              key={index}
              className={`flex items-center justify-center border border-[#D9D9D9] p-3 rounded cursor-pointer text-sm uppercase h-[250px] w-[250px] ${
                typeOfReport === report.title
                  ? "bg-secondary text-white"
                  : "bg-white text-dark_grey hover:bg-secondary hover:text-white"
              }`}
              onClick={() => setTypeOfReport(report.title)}
            >
              {report.title}
            </div>
          ))}
      </div>
    </div>
  );
};
