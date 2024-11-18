import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Round = () => {
  const total = 2200;
  const onTime = 1715;
  const lateAttendance = 397;
  const permission = 74;
  const takeDayOff = 14;

  // Calculate percentages
  // const onTimePercentage = (onTime / total) * 100;
  // const lateAttendancePercentage = (lateAttendance / total) * 100;
  // const permissionPercentage = (permission / total) * 100;
  // const takeDayOffPercentage = (takeDayOff / total) * 100;

  return (
    <div className="flex flex-col  items-center h-full p-3 w-full bg-white rounded-2xl shadow-md ">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-lg font-semibold text-grey">Attendance</h2>
        {/* <button className="text-sm text-grey ">View Stats</button> */}
      </div>

      <div className="relative w-48 h-48 mt-7 ">
        <div className="absolute inset-0">
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#6E349E",
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          />
        </div>
        <div className="absolute inset-0">
          <CircularProgressbarWithChildren
            value={50}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#E61A1A",
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          />
        </div>
        <div className="absolute ">
          <CircularProgressbarWithChildren
            value={20}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#F1A924",
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          />
        </div>
        <div className="absolute ">
          <CircularProgressbarWithChildren
            value={5}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#17C900",
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          >
            <div className="text-center">
              <div className="text-3xl font-semibold">
                {onTime + lateAttendance }
              </div>
              <div className="text-sm text-grey">/ {total}</div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="mt-14 justify-evenly items-center flex gap-5 w-full">
        <div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-purple rounded-full mr-2"></span>
            <span className="text-sm text-grey">
              {onTime} <span className="text-gray-500">OnTime</span>
            </span>
          </div>
          <div className="flex items-center mt-5">
            <span className="w-3 h-3 bg-red rounded-full mr-2"></span>
            <span className="text-sm text-grey">
              {lateAttendance}{" "}
              <span className="text-gray-500">Late Attendance</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-yellow rounded-full mr-2"></span>
            <span className="text-sm text-grey">
              {permission} <span className="text-gray-500">Permission</span>
            </span>
          </div>
          <div className="flex items-center mt-5">
            <span className="w-3 h-3 bg-green rounded-full mr-2"></span>
            <span className="text-sm text-grey">
              {takeDayOff} <span className="text-gray-500">TakeDayOff</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// export const Dashboard = () => {
//   const total = 2200;
//   const onTime = 1167;
//   const lateAttendance = 397;
//   const permission = 74;
//   const takeDayOff = 14;
//   const totalAttendance = onTime + lateAttendance + permission + takeDayOff;

//   const percentage = (totalAttendance / total) * 100;

//   return (
//     <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between w-full items-center">
//         <h2 className="text-lg font-semibold text-grey">Attendance</h2>
//         <button className="text-sm text-grey hover:text-grey">View Stats</button>
//       </div>

//       <div className="w-40 h-40 mt-4">
//         <CircularProgressbarWithChildren
//           value={percentage}
//           strokeWidth={10}
//           styles={buildStyles({
//             pathColor: `#6B21A8`,
//             trailColor: '#e0e0e0',
//             strokeLinecap: 'round',
//           })}
//         >
//           <div className="text-center">
//             <div className="text-3xl font-semibold">{totalAttendance}</div>
//             <div className="text-sm text-grey">/ {total}</div>
//           </div>
//         </CircularProgressbarWithChildren>
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-2 w-full">
//         <div className="flex items-center">
//           <span className="w-3 h-3 bg-purple rounded-full mr-2"></span>
//           <span className="text-sm text-grey">{onTime} <span className="text-gray-500">on time</span></span>
//         </div>
//         <div className="flex items-center">
//           <span className="w-3 h-3 bg-red rounded-full mr-2"></span>
//           <span className="text-sm text-grey">{lateAttendance} <span className="text-gray-500">late attendance</span></span>
//         </div>
//         <div className="flex items-center">
//           <span className="w-3 h-3 bg-yellow rounded-full mr-2"></span>
//           <span className="text-sm text-grey">{permission} <span className="text-gray-500">not present</span></span>
//         </div>
//         <div className="flex items-center">
//           <span className="w-3 h-3 bg-green rounded-full mr-2"></span>
//           <span className="text-sm text-grey">{takeDayOff} <span className="text-gray-500">take day off</span></span>
//         </div>
//       </div>
//     </div>
//   );
// };
