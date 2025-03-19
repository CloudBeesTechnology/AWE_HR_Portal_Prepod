import { useCallback, useEffect, useMemo, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
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
  handleSubmit,
  editFormTitle,
}) => {
  const [jobCode, setJobCode] = useState(null);
  const [allLocation, setAllLocation] = useState(null);

  const [warningMess, setWarningMess] = useState(null);
  const [warningMessForAdinin, setWarningMessForAdinin] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [errors, setErrors] = useState({});
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
    { id: 1, location: "OFFSHORE" },
    { id: 2, location: "HEAD OFFICE" },
    { id: 3, location: "ORMC" },
    { id: 4, location: "SBW" },
    { id: 5, location: "BLNG" },
    { id: 6, location: "CREST CENTURION 2" },
    { id: 7, location: "DAY TRIPPING" },
    { id: 8, location: "ICON ALIZA" },
    { id: 9, location: "ICON VALIANT" },
    { id: 10, location: "KHALIFA" },
    { id: 11, location: "MASSHOR PRINCESS" },
    { id: 12, location: "MV FALGOUT" },
    { id: 13, location: "ACCOUNTS" },
    { id: 14, location: "HR" },
    { id: 15, location: "PURCHASING" },
    { id: 16, location: "CORPORATE" },
    { id: 17, location: "CPD" },
  ];

  useEffect(() => {
    if (editObject) {
      const formatDateTime = (getDate) => {
        const inputDate = String(getDate);
        const date = new Date(inputDate);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const time = inputDate?.split(" ")[1] + " " + inputDate?.split(" ")[2];

        return `${day}/${month}/${year} ${time}`;
      };

      const formattedEntranceDateTime = formatDateTime(
        editObject.ENTRANCEDATETIME
      );
      const formattedExitDateTime = formatDateTime(editObject.EXITDATETIME);

      const isDateField = editObject.DATE !== undefined;
      const fieldToUpdate = isDateField ? "DATE" : "ENTRANCEDATEUSED";
      const originalDate = editObject[fieldToUpdate];

      const displayedDate = originalDate
        ? `${originalDate.split("/")[1]}/${originalDate.split("/")[0]}/${
            originalDate.split("/")[2]
          }`
        : null;

      const updatedEditObject = {
        ...editObject,
        [`formatted_${fieldToUpdate}`]: displayedDate.includes("NaN")
          ? ""
          : displayedDate,
        [`formatted_${"ENTRANCEDATETIME"}`]: formattedEntranceDateTime.includes(
          "NaN"
        )
          ? ""
          : formattedEntranceDateTime,
        [`formatted_${"EXITDATETIME"}`]: formattedExitDateTime.includes("NaN")
          ? ""
          : displayedDate,
      };

      setFormData(updatedEditObject);

      const validJobLocaWhrs =
        editObject?.jobLocaWhrs?.filter(
          (item) => item !== null && item !== undefined
        ) || [];

      if (validJobLocaWhrs.length > 0) {
        const resultData = validJobLocaWhrs.map((m, index) => {
          return {
            // id: index + 1,
            id: m.id || index + 1,
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
          },
        ]);
      }
    }
  }, [editObject]);

  const searchedValueForJOBCODE = (id, searcValue) => {
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

  const searchResultForJOBCODE = (jobcode, id) => {
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
    setSections((prevSections) => {
      let newId = prevSections.length + 1;

      while (prevSections.some((section) => section.id === newId)) {
        newId++;
      }

      const newSection = { id: newId };

      return [...prevSections, newSection];
    });
  };

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

  useEffect(() => {
    const formatTime = (decimalHours) => {
      const hours = Math.floor(decimalHours);
      const minutes = Math.round((decimalHours - hours) * 60);
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
    };

    // From
    const updateFormData = (workingHoursKey, actualHoursKey) => {
      // };
      try {
        const ConvertHours = (sections) => {
          let totalMinutes = 0;

          if (sections) {
            let time = sections.includes(".")
              ? sections.replace(".", ":")
              : sections;

            if (!time.includes(":")) {
              time = `${time}:00`;
            }

            const [hours, minutes] = time.split(":").map(Number);

            if (isNaN(hours) || isNaN(minutes)) {
              throw new Error("Invalid time format");
            }

            totalMinutes = hours * 60 + minutes;
          }

          const outputHours = Math.floor(totalMinutes / 60);
          const outputMinutes = totalMinutes % 60;
          return `${outputHours}:${outputMinutes.toString().padStart(2, "0")}`;
        };

        const sumHoursAndMinutes = (sections, key) => {
          let totalMinutes = sections?.reduce((total, sec) => {
            if (sec[key]) {
              let time = sec[key]?.includes(".")
                ? sec[key]?.replace(".", ":")
                : sec[key];

              if (!time?.includes(":")) {
                time = `${time}:00`;
              }

              const [hours, minutes] = time?.split(":")?.map(Number);
              total += hours * 60 + (minutes || 0);
            }
            return total;
          }, 0);

          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          return `${hours}:${minutes.toString().padStart(2, "0")}`;
        };

        let totalWorkingHrs = sumHoursAndMinutes(sections, "WORKINGHRS");
        let totalOvertimeHrs = sumHoursAndMinutes(sections, "OVERTIMEHRS");

        setFormData((prevFormData) => {
          const updatedWorkingHours =
            parseFloat(totalWorkingHrs?.split(":")[0]) +
            parseFloat(totalWorkingHrs?.split(":")[1]) / 60;
          const normalWH = ConvertHours(prevFormData?.NORMALWORKINGHRSPERDAY);
          const convertNWPD =
            parseFloat(normalWH?.split(":")[0]) +
            parseFloat(normalWH?.split(":")[1]) / 60;

          const calculatedOT =
            updatedWorkingHours - convertNWPD <= 0
              ? 0
              : updatedWorkingHours - convertNWPD;

          setWarningMess(updatedWorkingHours > convertNWPD);
        
          if (
            typeof parseFloat(prevFormData?.ADININWORKSENGINEERINGSDNBHD) ===
              "number" &&
            prevFormData?.ADININWORKSENGINEERINGSDNBHD.includes(":")
          ) {
            
            const adininWorks = ConvertHours(
              prevFormData?.ADININWORKSENGINEERINGSDNBHD
            );
            const adinin =
              parseFloat(adininWorks?.split(":")[0]) +
              parseFloat(adininWorks?.split(":")[1]) / 60;

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
          } else if (prevFormData?.ADININWORKSENGINEERINGSDNBHD.includes("h")) {
            try {
              function convertToTimeFormat(timeStr) {
                return timeStr.replace(/(\d+)h\s*(\d+)m/, "$1:$2");
              }

              // Example usage
              const input = prevFormData?.ADININWORKSENGINEERINGSDNBHD;
              const adininworksEngineering = convertToTimeFormat(input);

              const adininWorks = ConvertHours(adininworksEngineering);
              const adinin =
                parseFloat(adininWorks?.split(":")[0]) +
                parseFloat(adininWorks?.split(":")[1]) / 60;

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
            } catch (err) {}
          } else {
            if (updatedWorkingHours > convertNWPD) {
              setWarningMess(updatedWorkingHours > convertNWPD);
            } else {
              setWarningMessForAdinin(false);
            }
          }

          return {
            ...prevFormData,
            [actualHoursKey]:
              totalWorkingHrs.includes("NaN") || !totalWorkingHrs
                ? "0:00"
                : totalWorkingHrs,
            OT: formatTime(calculatedOT).includes("NaN")
              ? "0:00"
              : formatTime(calculatedOT),
          };
        });
      } catch (err) {}
    };
    // End

    if (titleName === "HO") {
      updateFormData("TOTALACTUALHOURS", "TOTALACTUALHOURS");
    } else if (titleName === "BLNG") {
      updateFormData("WORKINGHOURS", "WORKINGHOURS");
    } else {
      updateFormData("WORKINGHOURS", "WORKINGHOURS");
    }
  }, [sections]);

  useEffect(() => {
    const totalOvertimeHrs = sections.reduce((total, sec) => {
      try {
        let overtime = sec.OVERTIMEHRS || "0:00";

        if (overtime.includes(".")) {
          overtime = overtime.replace(".", ":");
        } else if (!overtime.includes(":")) {
          overtime = `${overtime}:00`;
        }

        const [hrs, mins] = overtime.split(":").map(Number);
        return total + hrs * 60 + mins;
      } catch (err) {
        return "0:00";
      }
    }, 0);

    const hours = Math.floor(totalOvertimeHrs / 60);
    const minutes = totalOvertimeHrs % 60;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

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
          ...val,
          JOBCODE: val?.JOBCODE,
          LOCATION: val?.LOCATION,
          WORKINGHRS: val?.WORKINGHRS || "",
          OVERTIMEHRS: val?.OVERTIMEHRS || "",
        };
      });

    const result = {
      ...formData,
      jobLocaWhrs: getData,
    };

    editFunction(result);
    handleSubmit(result);
  }, [sections, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: value,
      };

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
  const handleValidation = () => {
    const newErrors = {};
    sections.forEach((section, index) => {
      if (!section.LOCATION) {
        newErrors[`LOCATION-${index}`] = "Location is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = () => {
    if (handleValidation()) {
      const isDateField = formData.DATE !== undefined;
      const fieldToSave = isDateField ? "DATE" : "ENTRANCEDATEUSED";
      const entranceDateTime = "ENTRANCEDATETIME";
      const exitDateTime = "EXITDATETIME";

      const dataToSave = {
        ...formData,
        [fieldToSave]: editObject[fieldToSave],
        [entranceDateTime]: editObject[entranceDateTime],
        [exitDateTime]: editObject[exitDateTime],
      };

      delete dataToSave[`formatted_${fieldToSave}`];
      delete dataToSave[`formatted_${entranceDateTime}`];
      delete dataToSave[`formatted_${exitDateTime}`];

      addJCandLocaWhrs(dataToSave);
      toggleFunction();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <section className="bg-[#f9fafb] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md   border-[#EBEBEB] w-[50%] h-[80%] overflow-y-auto ">
        <header className="flex justify-between mt-5 ">
          <div className="flex-1"></div>
          <div className="flex justify-center flex-1">
            <img className="size-36 h-12 w-52" src={img} alt="not found" />
          </div>

          <div className="flex justify-end pt-2 flex-1">
            <IoCloseCircleOutline
              className="text-[30px] cursor-pointer"
              onClick={toggleFunction}
            />
          </div>
        </header>
        <div className="mx-7 mt-2 mb-14">
          <div className="flex items-center justify-center  text-dark_grey font-bold text-[25px] mb-3">
            <u>
              <p>{editFormTitle || "Edit Form"}</p>
            </u>
          </div>
          {fields?.map((field, index) => (
            <div key={index} className="grid grid-cols-2  space-y-3  ">
              <div>
                <p className="text-dark_grey text_size_5 pt-5">
                  {tableHeader[index]}
                </p>
              </div>
              <div>
                <input
                  type="text"
                  name={
                    field === "DATE"
                      ? "formatted_DATE"
                      : field === "ENTRANCEDATEUSED"
                      ? "formatted_ENTRANCEDATEUSED"
                      : field === "ENTRANCEDATETIME"
                      ? "formatted_ENTRANCEDATETIME"
                      : field === "EXITDATETIME"
                      ? "formatted_EXITDATETIME"
                      : field
                  }
                  className="border border-slate_grey bg-[#f1f5f9] rounded text-dark_grey text-[16px] text_size_5 outline-none w-full py-[7px] px-3 cursor-auto "
                  value={
                    formData[`formatted_${field}`] || formData[field] || ""
                  }
                  onChange={handleChange}
                  readOnly={Position !== "Manager" ? index < 8 : true}
                />

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
                  : warningMess && titleName !== "BLNG"
                  ? (field === "WORKINGHOURS" ||
                      field === "TOTALACTUALHOURS") && (
                      <span className="text_size_9 mt-2 text-red">
                        {`Working hours exceed the NWHPD`}
                      </span>
                    )
                  : ""}
              </div>
            </div>
          ))}
          {Position === "Manager" && (
            <div className="grid grid-cols-2  space-y-3">
              <p className="text-dark_grey text_size_5 pt-5">STATUS</p>

              <input
                name="STATUS"
                type="text"
                className="border border-slate_grey bg-[#f1f5f9]  rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto "
                value={formData.STATUS || formData.status || ""}
                readOnly
              />
            </div>
          )}
          {/*  */}
          <section className="grid grid-cols-1 ">
            <div className="grid grid-cols-[10fr,10fr,10fr,10fr,0.6fr] gap-0 pt-5">
              <label className="text_size_5 text-dark_grey ">JOBCODE</label>
              <label className="text_size_5 text-dark_grey ">LOCATION</label>
              <label className="text_size_5 text-dark_grey ">
                WORKING HOURS
              </label>
              <label className="text_size_5 text-dark_grey ">
                OVERTIME HOURS
              </label>
            </div>
            {sections &&
              sections.map((section, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[5fr,5fr,5fr,5fr,0fr] gap-4 pt-1 pb-2 "
                    style={
                      Position === "Manager"
                        ? { pointerEvents: "none" }
                        : undefined
                    }
                  >
                    <div className="w-fit">
                      <SearchDisplayForTimeSheet
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

                      {errors[`LOCATION-${index}`] && (
                        <span className="text-red text_size_8">
                          {errors[`LOCATION-${index}`]}
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

          <div
            className={`flex justify-center ${
              Position === "Manager" ? "hidden " : ""
            }`}
          >
            <button
              className={`text-dark_grey text_size_3 rounded bg-[#FEF116] px-9 m-5 py-2 `}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
