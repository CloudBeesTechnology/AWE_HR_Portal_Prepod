import { useCallback, useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { FaPlus } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
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
  const [typeLocation, setTypeLocation] = useState(null);
  const [typeJobcode, setTypeJobcode] = useState([]);
  const [workingHrs, setWorkingHrs] = useState();
  const [allData, setAllData] = useState([]);

  const [formData, setFormData] = useState({
    fieldObj,
    // FID: null,
    // NAMEFLAST: null,
    // ENTRANCEDATEUSED: null,
    // ENTRANCEDATETIME: null,
    // EXITDATETIME: null,
    // DAYDIFFERENCE: null,
    // AVGDAILYTOTALBYDAY: null,
    // AHIGHLIGHTDAILYTOTALBYGROUP: null,
    // ADININWORKSENGINEERINGSDNBHD: null,
    // NORMALWORKINGHRSPERDAY: null,
    // WORKINGHOURS: null,
    // OT: null,
    // REMARKS: null,
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
    { id: 1, location: "Crest Centurion 2" },
    { id: 2, location: "DAY TRIPPING" },
    { id: 3, location: "Icon Aliza" },
    { id: 4, location: "Icon Valiant" },
    { id: 5, location: "Khalifa" },
    { id: 5, location: "Masshor Princess" },
    { id: 5, location: "MV Falgout" },
  ];

  useEffect(() => {
    if (editObject) {
      setFormData(editObject);
      console.log(editObject);

      if (editObject.jobLocaWhrs?.length > 0) {
        const resultData = editObject.jobLocaWhrs?.map((m, index) => {
          // const newId = sections.length + 1;
          return {
            id: index + 1,
            JOBCODE: m.JOBCODE,
            LOCATION: m.LOCATION,
            WORKINGHRS: m.WORKINGHRS,
            OVERTIMEHRS: m.OVERTIMEHRS,

            // jobCodeData: {
            //   newFormData: JOBCODES,
            //   searchResult: searchResultForJOBCODE,
            // },
            // locationData: {
            //   newFormData: LocationData,
            //   searchResult: searchResultForLocation,
            // },
            // WORKINGHRS: "",
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

  const searchResultForJOBCODE = (jobcode, id) => {
    setJobCode(jobcode);
    console.log(jobcode);
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
    console.log(loca);
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
    const newId = sections.length + 1;
    const newSection = {
      id: newId,
    };
    setSections([...sections, newSection]);
  };
  // jobCode

  const handleWorkingHoursChange = useCallback(
    (id, value, type) => {
      if (type === "WorkingHrs") {
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.id === id
              ? {
                  ...section,
                  // JOBCODE: section.JOBCODE || jobCode?.JOBCODE || null,
                  // LOCATION: section.LOCATION || allLocation?.location || null,
                  WORKINGHRS: value, // Only update WORKINGHRS
                }
              : section
          )
        );
      } else if (type === "OvertimeHrs") {
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.id === id
              ? {
                  ...section,
                  OVERTIMEHRS: value,
                }
              : section
          )
        );
      }
    },

    []
  );
  // useEffect(() => {
  //   if (jobCode || allLocation) {
  //     setSections((prevSections) =>
  //       prevSections.map((section) => ({
  //         ...section,
  //         JOBCODE: jobCode ? jobCode.JOBCODE : section.JOBCODE,
  //         LOCATION: allLocation ? allLocation.location : section.LOCATION,
  //         // WORKINGHRS should be handled separately if needed.
  //       }))
  //     );
  //     console.log(jobCode, " : ", allLocation);
  //   }
  // }, [jobCode, allLocation]);
  useEffect(() => {
    console.log(titleName);
    if (titleName === "HO") {
      const totalWorkingHrs = sections.reduce((total, sec) => {
        return parseInt(total) + parseInt(sec.WORKINGHRS) || 0;
      }, 0);
      if (totalWorkingHrs) {
        setFormData((prevData) => ({
          ...prevData,
          TOTALACTUALHOURS: totalWorkingHrs,
        }));
      }
    }
  }, [sections]);
  useEffect(() => {
    //     JOBCODE

    if (titleName === "BLNG") {
      // if (
      //   sections[0]?.JOBCODE !== undefined ||
      //   sections[0]?.LOCATION !== undefined
      // ) {
      if (
        sections.some(
          (sec) => sec.JOBCODE !== undefined || sec.LOCATION !== undefined
        )
      ) {
        const totalWorkingHrs = sections.reduce((total, sec) => {
          return parseInt(total) + parseInt(sec.WORKINGHRS || null);
        }, 0);
        const totalOvertimeHrs = sections.reduce((total, sec) => {
          return parseInt(total) + parseInt(sec.OVERTIMEHRS || null);
        }, 0);

        if (totalWorkingHrs) {
          setFormData((prevFormData) => {
            const updatedWorkingHours = totalWorkingHrs || 0;
            const calculatedOT =
              updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY <= 0
                ? "0"
                : updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY;

            return {
              ...prevFormData,
              WORKINGHOURS: updatedWorkingHours,
              OT: calculatedOT,
            };
          });
        }

        // if (totalWorkingHrs) {
        //   console.log("totalWorkingHrs : ", totalWorkingHrs);
        //   setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     WORKINGHOURS: totalWorkingHrs,
        //     // OT: totalOvertimeHrs,
        //     OT:
        //       prevFormData.WORKINGHOURS - prevFormData.NORMALWORKINGHRSPERDAY <= 0
        //         ? "0"
        //         : prevFormData.WORKINGHOURS - prevFormData.NORMALWORKINGHRSPERDAY,
        //   }));
        // }
        // if (totalWorkingHrs) {
        //   setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     WORKINGHOURS: totalWorkingHrs || 0,
        //     OT: totalOvertimeHrs || 0,
        //   }));
        // }
      }
    }
    if (titleName === "SBW") {
      if (
        sections.some(
          (sec) => sec.JOBCODE !== undefined || sec.LOCATION !== undefined
        )
      ) {
        const totalWorkingHrs = sections.reduce((total, sec) => {
          return parseInt(total) + parseInt(sec.WORKINGHRS || null);
        }, 0);

        if (totalWorkingHrs) {
          setFormData((prevFormData) => {
            const updatedWorkingHours = totalWorkingHrs || 0;
            // const calculatedOT =
            //   updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY <= 0
            //     ? "0"
            //     : updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY;

            return {
              ...prevFormData,
              WORKINGHOURS: updatedWorkingHours,
              // OT: calculatedOT,
            };
          });
        }
      }
    }

    if (titleName === "ORMC") {
      if (
        sections.some(
          (sec) => sec.JOBCODE !== undefined || sec.LOCATION !== undefined
        )
      ) {
        const totalWorkingHrs = sections.reduce((total, sec) => {
          return parseInt(total) + parseInt(sec.WORKINGHRS || null);
        }, 0);

        if (totalWorkingHrs) {
          setFormData((prevFormData) => {
            const updatedWorkingHours = totalWorkingHrs || 0;
            // const calculatedOT =
            //   updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY <= 0
            //     ? "0"
            //     : updatedWorkingHours - prevFormData.NORMALWORKINGHRSPERDAY;

            return {
              ...prevFormData,
              WORKINGHOURS: updatedWorkingHours,
              // OT: calculatedOT,
            };
          });
        }
      }
    }
    console.log(sections);
    if (
      sections.some(
        (sec) => sec.JOBCODE !== undefined || sec.LOCATION !== undefined
      )
    ) {
      // Calculate totalOvertimeHrs, defaulting to 0 if OVERTIMEHRS is not present
      const totalOvertimeHrs = sections.reduce((total, sec) => {
        return parseInt(total) + parseInt(sec.OVERTIMEHRS || 0);
      }, 0);
      console.log(totalOvertimeHrs);
      // Update formData with totalOvertimeHrs if it exists
      if (totalOvertimeHrs) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          OT: totalOvertimeHrs || 0,
        }));
      }
    }

    // if (
    //   sections[0].JOBCODE !== undefined ||
    //   sections[0].LOCATION !== undefined
    // ) {
    //   const totalOvertimeHrs = sections.reduce((total, sec) => {
    //     return parseInt(total) + parseInt(sec.OVERTIMEHRS || null);
    //   }, 0);
    //   if (totalOvertimeHrs) {
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       OT: totalOvertimeHrs || 0,
    //     }));
    //   }
    // }
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
    console.log(result);
    editFunction(result);
  }, [sections, formData]);
  // const combineAllData = useCallback(
  //   (id, value) => {
  //     const result = sections.map((m) => {
  //       if (m.id === id) {
  //         return {
  //           ...m,
  //           JOBCODE: jobCode?.JOBCODE || null,
  //           LOCATION: allLocation?.location || null,
  //           WORKINGHRS: value,
  //         };
  //       }
  //     });
  //     // const newEntry = {
  //     //   JOBCODE: jobCode.JOBCODE,
  //     //   LOCATION: allLocation.location,
  //     //   WORKINGHRS: value,
  //     // };
  //     // setSections((prevSections) =>
  //     //   prevSections.map((section) =>
  //     //     section.id === id ? { ...section, workingHours: value } : section
  //     //   )
  //     // );
  //     // setAllData((prevData) => [...prevData, result]);
  //     // console.log("Combined Data:", newEntry);
  //     console.log(result);
  //     setSections(result);
  //   },
  //   [jobCode, allLocation]
  // );

  // useEffect(() => {
  //   if (jobCode && allLocation && workingHrs) {
  //     combineAllData();
  //   }
  // }, [jobCode, allLocation, workingHrs, combineAllData]);

  // useEffect(() => {
  //   if (sections) {
  //     console.log(sections);
  //   }
  // }, [sections]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "WORKINGHOURS") {
      setFormData((prevData) => ({
        ...prevData,
        OT:
          prevData.WORKINGHOURS - prevData.NORMALWORKINGHRSPERDAY <= 0
            ? "0"
            : prevData.WORKINGHOURS - prevData.NORMALWORKINGHRSPERDAY,
      }));
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md border-4 border-[#EBEBEB] h-[600px] w-[900px] overflow-y-auto">
        <div className="flex justify-end">
          <RxCross2
            className="text-2xl cursor-pointer"
            onClick={toggleFunction}
          />
        </div>
        <div className="flex justify-center ">
          <img
            className="size-32 h-12 w-full"
            src="/src/assets/logo/logo-with-name.svg"
            alt="not found"
          />
        </div>
        <div className="flex justify-center py-2 ">
          <p className="text-dark_grey text_size_2">Edit Access</p>
        </div>
        {fields?.map((field, index) => (
          <div key={index} className="grid grid-cols-2 pl-5 gap-5">
            <p className="text-dark_grey text_size_6 pt-2">
              {tableHeader[index]}
            </p>

            <input
              type="text"
              name={field}
              className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto"
              // value={editObject.FID}
              value={formData[field] || ""}
              onChange={handleChange}
              readOnly={index < 10}
            />
          </div>
        ))}
        {Position === "Manager" && (
          <div className="grid grid-cols-2 pl-5 gap-5">
            <p className="text-dark_grey text_size_6 pt-2">STATUS</p>
            <input
              type="text"
              className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto"
              value="Pending"
              readOnly
            />
          </div>
        )}
        {/*  */}
        <section className="grid grid-cols-1 pl-4 ">
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
                    <SearchDisplay
                      newFormData={JOBCODES}
                      placeholder="Search Job Code"
                      rounded="rounded"
                      searchResult={searchResultForJOBCODE}
                      setDrpValue={section.JOBCODE || null}
                      id={section.id}
                    />
                  </div>
                  <div className="w-fit">
                    <SearchDisplay
                      newFormData={LocationData}
                      placeholder="Search Location"
                      rounded="rounded"
                      searchResult={searchResultForLocation}
                      setDrpValue={section.LOCATION || null}
                      id={section.id}
                    />
                  </div>
                  <div className="w-fit">
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
                        // combineAllData(section.id, e.target.value)
                      }}
                      placeholder="Enter Hours"
                      className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto"
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
                      className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto"
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
              // console.log(finalData);

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
