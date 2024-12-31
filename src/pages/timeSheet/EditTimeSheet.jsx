// import { useCallback, useEffect, useMemo, useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { SearchDisplay } from "../../utils/SearchDisplay";
// import { FaPlus } from "react-icons/fa6";
// import { FaRegSquarePlus } from "react-icons/fa6";
// import { FaRegSquareMinus } from "react-icons/fa6";
// import "../../../src/index.css";
// import img from "../../assets/logo/logo-with-name.svg";
// import { SearchDisplayForTimeSheet } from "./timeSheetSearch/SearchDisplayForTS";
// export const EditTimeSheet = ({
//   editObject,
//   toggleFunction,
//   tableHeader,
//   editFunction,
//   fields,
//   fieldObj,
//   titleName,
//   Position,
// }) => {
//   const [jobCode, setJobCode] = useState(null);
//   const [allLocation, setAllLocation] = useState(null);

//   const [warningMess, setWarningMess] = useState(null);

//   const [filteredEmployees, setFilteredEmployees] = useState([]);

//   const [formData, setFormData] = useState({
//     fieldObj,
//   });
//   const JOBCODES = [
//     { id: 1, JOBCODE: "J9001" },
//     { id: 2, JOBCODE: "J9002" },
//     { id: 3, JOBCODE: "J9009M433" },
//     { id: 4, JOBCODE: "J9010M432" },
//     { id: 5, JOBCODE: "J9013M432" },
//     { id: 6, JOBCODE: "J9014" },
//     { id: 7, JOBCODE: "J9026M433" },
//     { id: 8, JOBCODE: "J9027M433" },
//     { id: 9, JOBCODE: "J9028M432" },
//     { id: 10, JOBCODE: "J9032M431" },
//     { id: 11, JOBCODE: "J9036M433" },
//     { id: 12, JOBCODE: "J9037M433" },
//     { id: 13, JOBCODE: "J9038M433" },
//     { id: 14, JOBCODE: "J9040M433" },
//     { id: 15, JOBCODE: "J9041M433" },
//     { id: 16, JOBCODE: "J9043M432" },
//     { id: 17, JOBCODE: "J9057M431" },
//     { id: 18, JOBCODE: "J9063M431" },
//     { id: 19, JOBCODE: "J9064M431" },
//     { id: 20, JOBCODE: "J9068M431" },
//     { id: 21, JOBCODE: "J9069M433" },
//     { id: 22, JOBCODE: "J9070M431" },
//     { id: 23, JOBCODE: "J9071M433" },
//     { id: 24, JOBCODE: "J9072M431" },
//     { id: 25, JOBCODE: "J9073M431" },
//     { id: 26, JOBCODE: "J9074M433" },
//     { id: 27, JOBCODE: "J9075M433" },
//   ];

//   const LocationData = [
//     { id: 1, location: "Offshore" },
//     { id: 2, location: "Head Office" },
//     { id: 3, location: "ORMC" },
//     { id: 4, location: "SBW" },
//     { id: 5, location: "BLNG" },
//     { id: 6, location: "Crest Centurion 2" },
//     { id: 7, location: "DAY TRIPPING" },
//     { id: 8, location: "Icon Aliza" },
//     { id: 9, location: "Icon Valiant" },
//     { id: 10, location: "Khalifa" },
//     { id: 11, location: "Masshor Princess" },
//     { id: 12, location: "MV Falgout" },
//     { id: 13, location: "Accounts" },
//     { id: 14, location: "HR" },
//     { id: 15, location: "Purchasing" },
//     { id: 16, location: "Corporate" },
//     { id: 17, location: "CPT" },
//   ];

//   useEffect(() => {
//     if (editObject) {
//       setFormData(editObject);
//       console.log(editObject);
//       const validJobLocaWhrs =
//         editObject?.jobLocaWhrs?.filter(
//           (item) => item !== null && item !== undefined
//         ) || [];

//       console.log("Valid Job Location & Working Hours:", validJobLocaWhrs);

//       if (validJobLocaWhrs.length > 0) {
//         const resultData = validJobLocaWhrs.map((m, index) => {
//           // const newId = sections.length + 1;
//           return {
//             id: index + 1,
//             JOBCODE: m.JOBCODE,
//             LOCATION: m.LOCATION,
//             WORKINGHRS: m.WORKINGHRS,
//             OVERTIMEHRS: m.OVERTIMEHRS,
//           };
//         });
//         if (resultData) {
//           setSections(resultData);
//         }
//       } else {
//         setSections([
//           {
//             id: 1,
//             // jobCodeData: {
//             //   newFormData: JOBCODES,
//             //   searchResult: searchResultForJOBCODE,
//             // },
//             // locationData: {
//             //   newFormData: LocationData,
//             //   searchResult: searchResultForLocation,
//             // },
//             // WORKINGHRS: "",
//           },
//         ]);
//       }
//     }
//   }, [editObject]);

//   const searchedValueForJOBCODE = (id, searcValue) => {
//     console.log(searcValue);
//     if (searcValue === "") {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.id === id
//             ? {
//                 ...section,
//                 JOBCODE: searcValue || null,
//               }
//             : section
//         )
//       );
//     }
//   };
//   const searchedValueForLOCATION = (id, searcValue) => {
//     if (searcValue !== "") {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.id === id
//             ? {
//                 ...section,
//                 LOCATION: searcValue || null,
//               }
//             : section
//         )
//       );
//     } else if (searcValue === "") {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.id === id
//             ? {
//                 ...section,
//                 LOCATION: searcValue || null,
//               }
//             : section
//         )
//       );
//     }
//   };

//   // const searchedValueForLOCATION = (id, searcValue) => {
//   //   if (searcValue === "") {
//   //     setSections((prevSections) =>
//   //       prevSections.map((section) =>
//   //         section.id === id
//   //           ? {
//   //               ...section,
//   //               LOCATION: searcValue || null,
//   //             }
//   //           : section
//   //       )
//   //     );
//   //   }
//   // };
//   const searchResultForJOBCODE = (jobcode, id) => {
//     // setJobCode(jobcode);

//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === id
//           ? {
//               ...section,
//               JOBCODE: jobcode?.JOBCODE || section.JOBCODE || null,
//             }
//           : section
//       )
//     );
//   };

//   const searchResultForLocation = (loca, id) => {
//     setAllLocation(loca);

//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === id
//           ? {
//               ...section,
//               LOCATION: loca?.location || section.location || null,
//             }
//           : section
//       )
//     );
//   };
//   const [sections, setSections] = useState([
//     {
//       id: 1,
//     },
//   ]);

//   const addSection = () => {
//     const newId = sections.length + 1;
//     const newSection = {
//       id: newId,
//     };
//     setSections([...sections, newSection]);

//   };
//   console.log(sections)
//   // jobCode
//   // Original

//   const handleWorkingHoursChange = useCallback((id, value, type) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === id
//           ? {
//               ...section,
//               WORKINGHRS: type === "WorkingHrs" ? value : section.WORKINGHRS,
//               OVERTIMEHRS:
//                 type === "WorkingHrs" && (!value || value === "")
//                   ? 0
//                   : type === "OvertimeHrs"
//                   ? value
//                   : section.OVERTIMEHRS,
//             }
//           : section
//       )
//     );
//   }, []);

//   useEffect(() => {
//     const updateFormData = (workingHoursKey, actualHoursKey) => {
//       const totalWorkingHrs = sections.reduce((total, sec) => {
//         return total + (parseInt(sec.WORKINGHRS) || 0); // Default to 0 if WORKINGHRS is empty
//       }, 0);

//       const totalOvertimeHrs = sections.reduce((total, sec) => {
//         return total + (parseInt(sec.OVERTIMEHRS) || 0); // Default to 0 if OVERTIMEHRS is empty
//       }, 0);

//       setFormData((prevFormData) => {
//         // const updatedWorkingHours =
//         //   totalWorkingHrs || editObject[workingHoursKey];
//         const updatedWorkingHours = totalWorkingHrs || 0;
//         const calculatedOT =
//           updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY <= 0
//             ? 0
//             : updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY;

//         setWarningMess(
//           updatedWorkingHours > parseInt(prevFormData.NORMALWORKINGHRSPERDAY)
//         );

//         return {
//           ...prevFormData,
//           [actualHoursKey]: updatedWorkingHours || 0, // Ensure a default value of 0
//           OT: updatedWorkingHours === 0 ? 0 : calculatedOT,
//         };
//       });
//     };

//     if (titleName === "HO") {
//       updateFormData("TOTALACTUALHOURS", "TOTALACTUALHOURS");
//     } else if (titleName === "BLNG") {
//       updateFormData("WORKINGHOURS", "WORKINGHOURS");
//     } else {
//       updateFormData("WORKINGHOURS", "WORKINGHOURS");
//     }
//   }, [sections]);

//   // Original
//   useEffect(() => {
//     const totalOvertimeHrs = sections.reduce((total, sec) => {
//       return parseInt(total) + parseInt(sec.OVERTIMEHRS || 0);
//     }, 0);

//     // Update formData with totalOvertimeHrs if it exists
//     if (totalOvertimeHrs) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         OT: totalOvertimeHrs || 0,
//       }));
//     }
//   }, [sections]);

//   const addJCandLocaWhrs = useCallback(() => {
//     const getData =
//       sections &&
//       sections.map((val) => {
//         return {
//           JOBCODE: val?.JOBCODE,
//           LOCATION: val?.LOCATION,
//           WORKINGHRS: val?.WORKINGHRS,
//           OVERTIMEHRS: val?.OVERTIMEHRS,
//         };
//       });

//     const result = {
//       ...formData,
//       jobLocaWhrs: getData,
//     };

//     editFunction(result);
//   }, [sections, formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Update the form field value
//     setFormData((prevFormData) => {
//       const updatedData = {
//         ...prevFormData,
//         [name]: value,
//       };

//       //
//       // If WORKINGHOURS field is changed, calculate OT and set a warning message if needed
//       if (name === "WORKINGHOURS" || name === "TOTALACTUALHOURS") {
//         const updatedWorkingHours = parseInt(value) || 0;
//         const normalWorkingHours =
//           parseInt(prevFormData.NORMALWORKINGHRSPERDAY) || 0;

//         const calculatedOT =
//           updatedWorkingHours - normalWorkingHours <= 0
//             ? "0"
//             : updatedWorkingHours - normalWorkingHours;

//         if (updatedWorkingHours > normalWorkingHours) {
//           setWarningMess(true);
//         } else {
//           setWarningMess(false);
//         }

//         return {
//           ...updatedData,
//           // WORKINGHOURS: updatedWorkingHours,
//           OT: calculatedOT,
//         };
//       }

//       return updatedData;
//     });
//   };

//   const removeItem = (id) => {
//     const result = sections.filter((sec) => {
//       if (sec.id !== id) {
//         return sec;
//       }
//     });
//     setSections(result);
//   };
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
//       // className="table-container z-50 fixed inset-0"
//       onClick={() => {
//         setFilteredEmployees([]);
//       }}
//     >
//       <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md border-4 border-[#EBEBEB] h-[600px] w-[900px] overflow-y-auto">
//         <div className="flex justify-end">
//           <RxCross2
//             className="text-2xl cursor-pointer"
//             onClick={toggleFunction}
//           />
//         </div>
//         <div className="flex justify-center ">
//           <img className="size-32 h-12 w-full" src={img} alt="not found" />
//         </div>
//         <div className="flex justify-center py-2 ">
//           <p className="text-dark_grey text_size_2">Edit Access</p>
//         </div>
//         {fields?.map((field, index) => (
//           <div key={index} className="grid grid-cols-2 pl-5 gap-5">
//             <p className="text-dark_grey text_size_6 pt-2">
//               {tableHeader[index]}
//             </p>

//             <div>
//               <input
//                 type="text"
//                 name={field}
//                 className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto bg-white"
//                 // value={editObject.FID}
//                 value={formData[field] || ""}
//                 onChange={handleChange}
//                 readOnly={index < 0}
//               />

//               {/* TOTALACTUALHOURS */}
//               {warningMess &&
//                 (field === "WORKINGHOURS" || field === "TOTALACTUALHOURS") && (
//                   <span className="text_size_9 mt-2 text-red">
//                     Working hours exceed the normal working hours per day.
//                   </span>
//                 )}
//             </div>
//           </div>
//         ))}
//         {Position === "Manager" && (
//           <div className="grid grid-cols-2 pl-5 gap-5">
//             <p className="text-dark_grey text_size_6 pt-2">STATUS</p>
//             <input
//               type="text"
//               className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto bg-white"
//               value="Pending"
//               readOnly
//             />
//           </div>
//         )}
//         {/*  */}
//         <section
//           className="grid grid-cols-1 pl-4 "
//           // onClick={() => {
//           //   setFilteredEmployees([]);
//           // }}
//         >
//           <div className="grid grid-cols-[10fr,10fr,10fr,10fr,0.6fr] gap-0 pt-5">
//             <label className="text_size_6 text-dark_grey ">JOBCODE</label>
//             <label className="text_size_6 text-dark_grey ">LOCATION</label>
//             <label className="text_size_6 text-dark_grey ">WORKING HOURS</label>
//             <label className="text_size_6 text-dark_grey ">
//               OVERTIME HOURS
//             </label>
//           </div>
//           {sections &&
//             sections.map((section, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="grid grid-cols-[5fr,5fr,5fr,5fr,0fr] gap-4 pt-1 pb-2"
//                 >
//                   <div className="w-fit">
//                     <SearchDisplayForTimeSheet
//                       // filteredEmployees={filteredEmployees}
//                       // setFilteredEmployees={setFilteredEmployees}
//                       newFormData={JOBCODES}
//                       placeholder="Search Job Code"
//                       rounded="rounded"
//                       searchResult={searchResultForJOBCODE}
//                       searchedValue={searchedValueForJOBCODE}
//                       setDrpValue={section?.JOBCODE || null}
//                       id={section.id}
//                     />
//                   </div>
//                   <div className="w-fit">
//                     <SearchDisplayForTimeSheet
//                       newFormData={LocationData}
//                       placeholder="Search Location"
//                       rounded="rounded"
//                       searchResult={searchResultForLocation}
//                       setDrpValue={section.LOCATION || null}
//                       searchedValue={searchedValueForLOCATION}
//                       id={section.id}
//                     />

//                     {!section.LOCATION && (
//                       <span className="text_size_9 mt-2 text-red">
//                         Location must not be empty.
//                       </span>
//                     )}
//                   </div>
//                   <div className="w-fit ">
//                     <input
//                       type="text"
//                       id={`workingHours-${index}`}
//                       value={section.WORKINGHRS || ""}
//                       onChange={(e) => {
//                         handleWorkingHoursChange(
//                           section.id,
//                           e.target.value,
//                           "WorkingHrs"
//                         );
//                       }}
//                       placeholder="Enter Hours"
//                       className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto bg-white"
//                       // readOnly={!section.LOCATION}
//                     />
//                   </div>
//                   <div className="w-fit">
//                     <input
//                       type="text"
//                       id={`OverTimeHours-${index}`}
//                       value={section.OVERTIMEHRS || ""}
//                       onChange={(e) => {
//                         handleWorkingHoursChange(
//                           section.id,
//                           e.target.value,
//                           "OvertimeHrs"
//                         );

//                         // combineAllData(section.id, e.target.value)
//                       }}
//                       placeholder="Enter Overtime "
//                       className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto bg-white"
//                       readOnly={!section.LOCATION}
//                     />
//                   </div>
//                   <div className="pt-2.5">
//                     {index === 0 ? (
//                       <FaRegSquarePlus
//                         className={`text-xl text-dark_ash cursor-pointer`}
//                         onClick={() => {
//                           addSection();
//                         }}
//                       />
//                     ) : (
//                       <FaRegSquareMinus
//                         className={`text-xl text-dark_ash cursor-pointer`}
//                         onClick={() => {
//                           // addSection();
//                           removeItem(section.id);
//                         }}
//                       />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//         </section>

//         <div className=" flex justify-center">
//           <button
//             className=" text-dark_grey text_size_3 rounded bg-[#FEF116] px-9 m-5 py-2"
//             onClick={() => {
//               addJCandLocaWhrs();

//               toggleFunction();
//             }}
//           >
//             Save
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

import { useCallback, useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { FaPlus } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import "../../../src/index.css";
import img from "../../assets/logo/logo-with-name.svg";
import { SearchDisplayForTimeSheet } from "./timeSheetSearch/SearchDisplayForTS";
export const EditTimeSheet = ({
  editObject,
  toggleFunction,
  tableHeader,
  editFunction,
  fields,
  fieldObj,
  titleName,
  Position,
}) => {
  const [jobCode, setJobCode] = useState(null);
  const [allLocation, setAllLocation] = useState(null);

  const [warningMess, setWarningMess] = useState(null);
  const [warningMessForAdinin, setWarningMessForAdinin] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [formData, setFormData] = useState({
    fieldObj,
  });
  const JOBCODES = [
    { id: 1, JOBCODE: "J9001" },
    { id: 2, JOBCODE: "J9002" },
    { id: 3, JOBCODE: "J9009M433" },
    { id: 4, JOBCODE: "J9010M432" },
    { id: 5, JOBCODE: "J9013M432" },
    { id: 6, JOBCODE: "J9014" },
    { id: 7, JOBCODE: "J9026M433" },
    { id: 8, JOBCODE: "J9027M433" },
    { id: 9, JOBCODE: "J9028M432" },
    { id: 10, JOBCODE: "J9032M431" },
    { id: 11, JOBCODE: "J9036M433" },
    { id: 12, JOBCODE: "J9037M433" },
    { id: 13, JOBCODE: "J9038M433" },
    { id: 14, JOBCODE: "J9040M433" },
    { id: 15, JOBCODE: "J9041M433" },
    { id: 16, JOBCODE: "J9043M432" },
    { id: 17, JOBCODE: "J9057M431" },
    { id: 18, JOBCODE: "J9063M431" },
    { id: 19, JOBCODE: "J9064M431" },
    { id: 20, JOBCODE: "J9068M431" },
    { id: 21, JOBCODE: "J9069M433" },
    { id: 22, JOBCODE: "J9070M431" },
    { id: 23, JOBCODE: "J9071M433" },
    { id: 24, JOBCODE: "J9072M431" },
    { id: 25, JOBCODE: "J9073M431" },
    { id: 26, JOBCODE: "J9074M433" },
    { id: 27, JOBCODE: "J9075M433" },
  ];

  const LocationData = [
    { id: 1, location: "Offshore" },
    { id: 2, location: "Head Office" },
    { id: 3, location: "ORMC" },
    { id: 4, location: "SBW" },
    { id: 5, location: "BLNG" },
    { id: 6, location: "Crest Centurion 2" },
    { id: 7, location: "DAY TRIPPING" },
    { id: 8, location: "Icon Aliza" },
    { id: 9, location: "Icon Valiant" },
    { id: 10, location: "Khalifa" },
    { id: 11, location: "Masshor Princess" },
    { id: 12, location: "MV Falgout" },
    { id: 13, location: "Accounts" },
    { id: 14, location: "HR" },
    { id: 15, location: "Purchasing" },
    { id: 16, location: "Corporate" },
    { id: 17, location: "CPT" },
  ];

  useEffect(() => {
    if (editObject) {
      setFormData(editObject);
      console.log(editObject);
      const validJobLocaWhrs =
        editObject?.jobLocaWhrs?.filter(
          (item) => item !== null && item !== undefined
        ) || [];

      console.log("Valid Job Location & Working Hours:", validJobLocaWhrs);

      if (validJobLocaWhrs.length > 0) {
        const resultData = validJobLocaWhrs.map((m, index) => {
          // const newId = sections.length + 1;
          return {
            id: index + 1,
            JOBCODE: m.JOBCODE,
            LOCATION: m.LOCATION,
            WORKINGHRS: m.WORKINGHRS,
            OVERTIMEHRS: m.OVERTIMEHRS,
          };
        });
        if (resultData) {
          setSections(resultData);
        }
      } else {
        setSections([
          {
            id: 1,
            // jobCodeData: {
            //   newFormData: JOBCODES,
            //   searchResult: searchResultForJOBCODE,
            // },
            // locationData: {
            //   newFormData: LocationData,
            //   searchResult: searchResultForLocation,
            // },
            // WORKINGHRS: "",
          },
        ]);
      }
    }
  }, [editObject]);

  const searchedValueForJOBCODE = (id, searcValue) => {
    console.log(searcValue);
    if (searcValue !== "" || searcValue === "") {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === id
            ? {
                ...section,
                JOBCODE: searcValue || null,
              }
            : section
        )
      );
    }
  };
  const searchedValueForLOCATION = (id, searcValue) => {
    if (searcValue !== "") {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === id
            ? {
                ...section,
                LOCATION: searcValue || null,
              }
            : section
        )
      );
    } else if (searcValue === "") {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === id
            ? {
                ...section,
                LOCATION: searcValue || null,
              }
            : section
        )
      );
    }
  };

  // const searchedValueForLOCATION = (id, searcValue) => {
  //   if (searcValue === "") {
  //     setSections((prevSections) =>
  //       prevSections.map((section) =>
  //         section.id === id
  //           ? {
  //               ...section,
  //               LOCATION: searcValue || null,
  //             }
  //           : section
  //       )
  //     );
  //   }
  // };
  const searchResultForJOBCODE = (jobcode, id) => {
    // setJobCode(jobcode);

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              JOBCODE: jobcode?.JOBCODE || section.JOBCODE || null,
            }
          : section
      )
    );
  };

  const searchResultForLocation = (loca, id) => {
    setAllLocation(loca);

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              LOCATION: loca?.location || section.location || null,
            }
          : section
      )
    );
  };
  const [sections, setSections] = useState([
    {
      id: 1,
    },
  ]);

  const addSection = () => {
    // const newId = sections.length + 1;
    // while (sections.some(section => section.id === newId)) {
    //   newId++; // Increment ID until it's unique
    // }
    // const newSection = {
    //   id: newId,
    // };
    // setSections([...sections, newSection]);

    setSections((prevSections) => {
      // Generate a unique ID
      let newId = prevSections.length + 1;

      // Ensure the ID is unique
      while (prevSections.some((section) => section.id === newId)) {
        newId++; // Increment ID until unique
      }

      // Create a new section
      const newSection = { id: newId };

      // Return updated sections
      return [...prevSections, newSection]; // No reassignment here
    });
  };

  // jobCode
  // Original

  const handleWorkingHoursChange = useCallback((id, value, type) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              WORKINGHRS: type === "WorkingHrs" ? value : section.WORKINGHRS,
              OVERTIMEHRS:
                type === "WorkingHrs" && (!value || value === "")
                  ? 0
                  : type === "OvertimeHrs"
                  ? value
                  : section.OVERTIMEHRS,
            }
          : section
      )
    );
  }, []);

  // Example Inputs

  // Call the function dynamically

  // useEffect(() => {
  //   const updateFormData = (workingHoursKey, actualHoursKey) => {
  //     const totalWorkingHrs = sections.reduce((total, sec) => {
  //       return total + (parseInt(sec.WORKINGHRS) || 0); // Default to 0 if WORKINGHRS is empty
  //     }, 0);

  //     const totalOvertimeHrs = sections.reduce((total, sec) => {
  //       return total + (parseInt(sec.OVERTIMEHRS) || 0); // Default to 0 if OVERTIMEHRS is empty
  //     }, 0);

  //     setFormData((prevFormData) => {
  //       // const updatedWorkingHours =
  //       //   totalWorkingHrs || editObject[workingHoursKey];
  //       const updatedWorkingHours = totalWorkingHrs || 0;
  //       const calculatedOT =
  //         updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY <= 0
  //           ? 0
  //           : updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY;

  //       setWarningMess(
  //         updatedWorkingHours > parseInt(prevFormData.NORMALWORKINGHRSPERDAY)
  //       );

  //       // setWarningMessForAdinin(
  //       //   updatedWorkingHours + totalWorkingHrs >
  //       //     parseInt(prevFormData.ADININWORKSENGINEERINGSDNBHD)
  //       // );
  //       // if (
  //       //   updatedWorkingHours + totalOvertimeHrs >
  //       //   parseInt(prevFormData.ADININWORKSENGINEERINGSDNBHD)
  //       // ) {
  //       //   setWarningMessForAdinin(
  //       //     "AW & ESB"
  //       //   );
  //       //   console.log(updatedWorkingHours + totalOvertimeHrs)
  //       //   console.log("Yes it is true")
  //       // }

  //       return {
  //         ...prevFormData,
  //         [actualHoursKey]: updatedWorkingHours || 0, // Ensure a default value of 0
  //         OT: updatedWorkingHours === 0 ? 0 : calculatedOT,
  //       };
  //     });
  //   };

  //   if (titleName === "HO") {
  //     updateFormData("TOTALACTUALHOURS", "TOTALACTUALHOURS");
  //   } else if (titleName === "BLNG") {
  //     updateFormData("WORKINGHOURS", "WORKINGHOURS");
  //   } else {
  //     updateFormData("WORKINGHOURS", "WORKINGHOURS");
  //   }
  // }, [sections]);

  useEffect(() => {
    const formatTime = (decimalHours) => {
      const hours = Math.floor(decimalHours); // Extract hours
      const minutes = Math.round((decimalHours - hours) * 60); // Calculate minutes
      return `${hours}:${minutes.toString().padStart(2, "0")}`; // Format as HH:MM
    };

    const updateFormData = (workingHoursKey, actualHoursKey) => {
      // Calculate total working hours
      // const sumHoursAndMinutes = (sections, key) => {
      //   let totalMinutes = sections.reduce((total, sec) => {
      //     console.log(sec);
      //     if (sec[key]) {
      //       const [hours, minutes] = sec[key].split(":").map(Number); // Split into hours and minutes
      //       total += hours * 60 + (minutes || 0); // Convert to total minutes
      //     }
      //     return total;
      //   }, 0);

      //   // Convert total minutes back to HH:MM format
      //   const hours = Math.floor(totalMinutes / 60);
      //   const minutes = totalMinutes % 60;
      //   return `${hours}:${minutes.toString().padStart(2, "0")}`;
      // };
      const ConvertHours = (sections) => {
        let totalMinutes = 0; // Initialize totalMinutes to avoid undefined error

        if (sections) {
          // Replace "." with ":" to handle decimal formats like "8.20" → "8:20"
          let time = sections.includes(".")
            ? sections.replace(".", ":")
            : sections;

          // Handle whole numbers like "8" → "8:00"
          if (!time.includes(":")) {
            time = `${time}:00`;
          }

          // Split into hours and minutes
          const [hours, minutes] = time.split(":").map(Number);

          // Validate hours and minutes
          if (isNaN(hours) || isNaN(minutes)) {
            throw new Error("Invalid time format");
          }

          totalMinutes = hours * 60 + minutes; // Convert to total minutes
        }

        // Convert total minutes back to HH:MM format
        const outputHours = Math.floor(totalMinutes / 60);
        const outputMinutes = totalMinutes % 60;
        return `${outputHours}:${outputMinutes.toString().padStart(2, "0")}`;
      };
      // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      const sumHoursAndMinutes = (sections, key) => {
        let totalMinutes = sections.reduce((total, sec) => {
          console.log(sec);

          if (sec[key]) {
            // Replace "." with ":" to handle decimal formats like "8.20" → "8:20"
            let time = sec[key].includes(".")
              ? sec[key].replace(".", ":")
              : sec[key];

            // Handle whole numbers like "8" → "8:00"
            if (!time.includes(":")) {
              time = `${time}:00`;
            }

            // Split into hours and minutes
            const [hours, minutes] = time.split(":").map(Number);
            total += hours * 60 + (minutes || 0); // Convert to total minutes
          }
          return total;
        }, 0);

        // Convert total minutes back to HH:MM format
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}:${minutes.toString().padStart(2, "0")}`;
      };
      // Calculate total working hours and overtime hours
      const totalWorkingHrs = sumHoursAndMinutes(sections, "WORKINGHRS");
      const totalOvertimeHrs = sumHoursAndMinutes(sections, "OVERTIMEHRS");

      console.log(totalWorkingHrs, " : ", totalOvertimeHrs);
      setFormData((prevFormData) => {
        const updatedWorkingHours =
          parseFloat(totalWorkingHrs?.split(":")[0]) +
          parseFloat(totalWorkingHrs?.split(":")[1]) / 60;
        const normalWH = ConvertHours(prevFormData?.NORMALWORKINGHRSPERDAY);
        const convertNWPD =
          parseFloat(normalWH?.split(":")[0]) +
          parseFloat(normalWH?.split(":")[1]) / 60;
        // Calculate overtime
        const calculatedOT =
          updatedWorkingHours - convertNWPD <= 0
            ? 0
            : updatedWorkingHours - convertNWPD;

        // Update warning messages
        setWarningMess(updatedWorkingHours > convertNWPD);
        const adininWorks = ConvertHours(
          prevFormData?.ADININWORKSENGINEERINGSDNBHD
        );

        const adinin =
          parseFloat(adininWorks?.split(":")[0]) +
          parseFloat(adininWorks?.split(":")[1]) / 60;

        // Example for additional warnings
        const updatedTotalOvertimeHrs =
          parseFloat(totalOvertimeHrs?.split(":")[0]) +
          parseFloat(totalOvertimeHrs?.split(":")[1]) / 60;

        if (updatedWorkingHours + updatedTotalOvertimeHrs > adinin) {
          setWarningMessForAdinin(
            updatedWorkingHours + updatedTotalOvertimeHrs > adinin
          );
        } else {
          setWarningMessForAdinin(false);
        }

        return {
          ...prevFormData,
          [actualHoursKey]: totalWorkingHrs, // Already formatted as HH:MM
          OT: formatTime(calculatedOT), // Format OT as HH:MM
        };
      });
    };

    // Handle different cases based on titleName
    if (titleName === "HO") {
      updateFormData("TOTALACTUALHOURS", "TOTALACTUALHOURS");
    } else if (titleName === "BLNG") {
      updateFormData("WORKINGHOURS", "WORKINGHOURS");
    } else {
      updateFormData("WORKINGHOURS", "WORKINGHOURS");
    }
  }, [sections]);

  // Original
  // useEffect(() => {
  //   const totalOvertimeHrs = sections.reduce((total, sec) => {
  //     return parseInt(total) + parseInt(sec.OVERTIMEHRS || 0);
  //   }, 0);

  //   console.log(totalOvertimeHrs)
  //   // Update formData with totalOvertimeHrs if it exists
  //   if (totalOvertimeHrs) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       OT: totalOvertimeHrs || 0,
  //     }));
  //   }
  // }, [sections]);

  useEffect(() => {
    const totalOvertimeHrs = sections.reduce((total, sec) => {
      let overtime = sec.OVERTIMEHRS || "0:00"; // Default value if empty

      if (overtime.includes(".")) {
        // Handle decimal format like "8.20"
        // const [whole, fraction] = overtime.split(".");
        // const mins = Math.round((parseFloat(`0.${fraction}`) || 0) * 60); // Convert decimal to minutes
        // overtime = `${whole}:${mins.toString().padStart(2, "0")}`; // Format as hh:mm
        overtime = overtime.replace(".", ":");
      } else if (!overtime.includes(":")) {
        // Handle whole number format like "8"
        overtime = `${overtime}:00`; // Convert to hh:mm
      }

      // Split and calculate total minutes
      const [hrs, mins] = overtime.split(":").map(Number);
      return total + hrs * 60 + mins; // Convert to total minutes
    }, 0);

    // Convert total minutes back to hh:mm format
    const hours = Math.floor(totalOvertimeHrs / 60);
    const minutes = totalOvertimeHrs % 60;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

    console.log(formattedTime);

    // Update formData with formattedTime if totalOvertimeHrs exists
    if (totalOvertimeHrs > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        OT: formattedTime,
      }));
    }
  }, [sections]);

  const addJCandLocaWhrs = useCallback(() => {
    const getData =
      sections &&
      sections.map((val) => {
        return {
          JOBCODE: val?.JOBCODE,
          LOCATION: val?.LOCATION,
          WORKINGHRS: val?.WORKINGHRS,
          OVERTIMEHRS: val?.OVERTIMEHRS,
        };
      });

    const result = {
      ...formData,
      jobLocaWhrs: getData,
    };

    editFunction(result);
  }, [sections, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form field value
    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: value,
      };

      //
      // If WORKINGHOURS field is changed, calculate OT and set a warning message if needed
      if (name === "WORKINGHOURS" || name === "TOTALACTUALHOURS") {
        const updatedWorkingHours = parseInt(value) || 0;
        const normalWorkingHours =
          parseInt(prevFormData.NORMALWORKINGHRSPERDAY) || 0;

        const calculatedOT =
          updatedWorkingHours - normalWorkingHours <= 0
            ? "0"
            : updatedWorkingHours - normalWorkingHours;

        if (updatedWorkingHours > normalWorkingHours) {
          setWarningMess(true);
        } else {
          setWarningMess(false);
        }

        return {
          ...updatedData,
          // WORKINGHOURS: updatedWorkingHours,
          OT: calculatedOT,
        };
      }

      return updatedData;
    });
  };

  const removeItem = (id) => {
    const result = sections.filter((sec) => {
      if (sec.id !== id) {
        return sec;
      }
    });
    setSections(result);
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
      // className="table-container z-50 fixed inset-0"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md border-4 border-[#EBEBEB] h-[600px] w-[900px] overflow-y-auto">
        <div className="flex justify-end">
          <RxCross2
            className="text-2xl cursor-pointer"
            onClick={toggleFunction}
          />
        </div>
        <div className="flex justify-center ">
          <img className="size-32 h-12 w-full" src={img} alt="not found" />
        </div>
        <div className="flex justify-center py-2 ">
          <p className="text-dark_grey text_size_2">Edit Access</p>
        </div>
        {fields?.map((field, index) => (
          <div key={index} className="grid grid-cols-2 pl-5 gap-5">
            <p className="text-dark_grey text_size_6 pt-2">
              {tableHeader[index]}
            </p>

            <div>
              <input
                type="text"
                name={field}
                className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto bg-white"
                // value={editObject.FID}
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={index < 7}
              />

              {/* TOTALACTUALHOURS */}
              {warningMess === true &&
              warningMessForAdinin === false &&
              titleName === "BLNG"
                ? (field === "WORKINGHOURS" ||
                    field === "TOTALACTUALHOURS") && (
                    <span className="text_size_9 mt-2 text-red">
                      {`Working hours exceed the NWHPD`}
                    </span>
                  )
                : warningMess === false &&
                  warningMessForAdinin === true &&
                  titleName === "BLNG"
                ? (field === "WORKINGHOURS" ||
                    field === "TOTALACTUALHOURS") && (
                    <span className="text_size_9 mt-2 text-red">
                      {`Working hours + OT exceed the AW & ESB`}
                    </span>
                  )
                : warningMess === true &&
                  warningMessForAdinin === true &&
                  titleName === "BLNG"
                ? (field === "WORKINGHOURS" ||
                    field === "TOTALACTUALHOURS") && (
                    <span className="text_size_9 mt-2 text-red">
                      {`Working hours + OT exceed the NWHPD, AW & ESB`}
                    </span>
                  )
                : warningMess &&
                  titleName !== "BLNG" ?
                  (field === "WORKINGHOURS" ||
                    field === "TOTALACTUALHOURS") && (
                    <span className="text_size_9 mt-2 text-red">
                      {`Working hours exceed the NWHPD`}
                    </span>
                  ):""}
              {/* {warningMessForAdinin &&
                (field === "WORKINGHOURS" || field === "TOTALACTUALHOURS") && (
                  <span className="text_size_9 mt-2 text-red">
                 {" "} and AW & ESB
                  </span>
                )} */}
            </div>
          </div>
        ))}
        {Position === "Manager" && (
          <div className="grid grid-cols-2 pl-5 gap-5">
            <p className="text-dark_grey text_size_6 pt-2">STATUS</p>
            <input
              type="text"
              className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto bg-white"
              value="Pending"
              readOnly
            />
          </div>
        )}
        {/*  */}
        <section
          className="grid grid-cols-1 pl-4 "
          // onClick={() => {
          //   setFilteredEmployees([]);
          // }}
        >
          <div className="grid grid-cols-[10fr,10fr,10fr,10fr,0.6fr] gap-0 pt-5">
            <label className="text_size_6 text-dark_grey ">JOBCODE</label>
            <label className="text_size_6 text-dark_grey ">LOCATION</label>
            <label className="text_size_6 text-dark_grey ">WORKING HOURS</label>
            <label className="text_size_6 text-dark_grey ">
              OVERTIME HOURS
            </label>
          </div>
          {sections &&
            sections.map((section, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[5fr,5fr,5fr,5fr,0fr] gap-4 pt-1 pb-2"
                >
                  <div className="w-fit">
                    <SearchDisplayForTimeSheet
                      // filteredEmployees={filteredEmployees}
                      // setFilteredEmployees={setFilteredEmployees}
                      newFormData={JOBCODES}
                      placeholder="Search Job Code"
                      rounded="rounded"
                      searchResult={searchResultForJOBCODE}
                      searchedValue={searchedValueForJOBCODE}
                      setDrpValue={section?.JOBCODE || null}
                      id={section.id}
                    />
                  </div>
                  <div className="w-fit">
                    <SearchDisplayForTimeSheet
                      newFormData={LocationData}
                      placeholder="Search Location"
                      rounded="rounded"
                      searchResult={searchResultForLocation}
                      setDrpValue={section.LOCATION || null}
                      searchedValue={searchedValueForLOCATION}
                      id={section.id}
                    />

                    {!section.LOCATION && (
                      <span className="text_size_9 mt-2 text-red">
                        Location must not be empty.
                      </span>
                    )}
                  </div>
                  <div className="w-fit ">
                    <input
                      type="text"
                      id={`workingHours-${index}`}
                      value={section.WORKINGHRS || ""}
                      onChange={(e) => {
                        handleWorkingHoursChange(
                          section.id,
                          e.target.value,
                          "WorkingHrs"
                        );
                      }}
                      placeholder="Enter Hours"
                      className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto bg-white"
                      readOnly={!section.LOCATION}
                    />
                  </div>
                  <div className="w-fit">
                    <input
                      type="text"
                      id={`OverTimeHours-${index}`}
                      value={section.OVERTIMEHRS || ""}
                      onChange={(e) => {
                        handleWorkingHoursChange(
                          section.id,
                          e.target.value,
                          "OvertimeHrs"
                        );

                        // combineAllData(section.id, e.target.value)
                      }}
                      placeholder="Enter Overtime "
                      className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto bg-white"
                      readOnly={!section.LOCATION}
                    />
                  </div>
                  <div className="pt-2.5">
                    {index === 0 ? (
                      <FaRegSquarePlus
                        className={`text-xl text-dark_ash cursor-pointer`}
                        onClick={() => {
                          addSection();
                        }}
                      />
                    ) : (
                      <FaRegSquareMinus
                        className={`text-xl text-dark_ash cursor-pointer`}
                        onClick={() => {
                          // addSection();
                          removeItem(section.id);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </section>

        <div className=" flex justify-center">
          <button
            className=" text-dark_grey text_size_3 rounded bg-[#FEF116] px-9 m-5 py-2"
            onClick={() => {
              addJCandLocaWhrs();

              toggleFunction();
            }}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};
