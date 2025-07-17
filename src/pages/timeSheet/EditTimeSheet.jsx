import { useCallback, useEffect, useMemo, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import "../../../src/index.css";
import img from "../../assets/logo/logo-with-name.svg";
import { SearchDisplayForTimeSheet } from "./timeSheetSearch/SearchDisplayForTS";
import { JOBCODES, LocationData } from "./customTimeSheet/JobcodeAndLocation";

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
  empAndWorkInfo,
}) => {
  const [jobCode, setJobCode] = useState(null);
  const [allLocation, setAllLocation] = useState(null);

  const [warningMess, setWarningMess] = useState(null);
  const [warningStaffLevelEmp, setWarningStaffLevelEmp] = useState(false);
  const [warningMessForAdinin, setWarningMessForAdinin] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fieldObj,
  });

  useEffect(() => {
    if (editObject) {
      const formatDateTime = (getDate) => {
        try {
          const inputDate = String(getDate);
          const date = new Date(inputDate);

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const time =
            inputDate?.split(" ")[1] + " " + inputDate?.split(" ")[2];

          return `${day}/${month}/${year} ${time}`;
        } catch (err) {
          console.log("Error :", err);
        }
      };

      const formattedEntranceDateTime = formatDateTime(
        editObject?.ENTRANCEDATETIME
      );
      const formattedExitDateTime = formatDateTime(editObject?.EXITDATETIME);

      const isDateField = editObject.DATE !== undefined;
      const fieldToUpdate = isDateField ? "DATE" : "ENTRANCEDATEUSED";
      const originalDate = editObject[fieldToUpdate];

      const displayedDate = originalDate
        ? `${originalDate?.split("/")[1]}/${originalDate?.split("/")[0]}/${
            originalDate?.split("/")[2]
          }`
        : null;

      const updatedEditObject = {
        ...editObject,
        [`formatted_${fieldToUpdate}`]: displayedDate?.includes("NaN")
          ? ""
          : displayedDate,
        [`formatted_${"ENTRANCEDATETIME"}`]:
          formattedEntranceDateTime?.includes("NaN")
            ? ""
            : formattedEntranceDateTime,
        [`formatted_${"EXITDATETIME"}`]: formattedExitDateTime?.includes("NaN")
          ? ""
          : formattedExitDateTime,
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
    try {
      function addHoursMinutesFormat(input) {
        try {
          // If input contains colon (e.g., "8:30")
          if (input?.includes(":")) {
            const [hours, minutes] = input?.split(":")?.map(Number);
            return `${hours}:${minutes?.toString()?.padStart(2, "0")}`;
          }

          // If input contains decimal (e.g., "7.30")
          if (input?.includes(".")) {
            const [hours, decimal] = input?.split(".")?.map(Number);

            return `${hours}:${decimal?.toString()?.padStart(2, "0")}`;
          }

          // Default case: whole number string (e.g., "8")
          const hours = parseInt(input, 10);
          return `${hours}:00`;
        } catch (err) {
          console.log("Error : ", err);
        }
      }
      // From
      const updateFormData = (workingHoursKey, actualHoursKey) => {
        // };
        try {
          const sumHoursAndMinutes = (sections, key) => {
            let totalDecimalHours = sections?.reduce((total, sec) => {
              if (sec[key]) {
                const decimal = parseFloat(sec[key]);
                total += decimal;
              }
              return total;
            }, 0);

            // Round to two decimals and convert back to HH:100 format
            const hours = Math.floor(totalDecimalHours);
            const hundredMinutes = Math.round(
              (totalDecimalHours - hours) * 100
            );

            // Correct if minutes reach 100
            const adjustedHours = hours + Math.floor(hundredMinutes / 100);
            const adjustedMinutes = hundredMinutes % 100;

            return `${adjustedHours}:${adjustedMinutes
              .toString()
              .padStart(2, "0")}`;
          };

          let totalWorkingHrs = sumHoursAndMinutes(sections, "WORKINGHRS");

          setFormData((prevFormData) => {
            const [workingHoursPart, workingMinutesPart] = totalWorkingHrs
              ?.split(":")
              .map(Number);
            const updatedWorkingHours =
              workingHoursPart + workingMinutesPart / 100; // HH:100 basis

            const [normalHoursPart, normalMinutesPart] = addHoursMinutesFormat(
              prevFormData?.NORMALWORKINGHRSPERDAY
            )
              ?.split(":")
              .map(Number);
            const convertNWPD = normalHoursPart + normalMinutesPart / 100; // HH:100 basis

            const isOvertime = updatedWorkingHours > convertNWPD;
            setWarningMess(isOvertime);

            try {
              if (isOvertime) {
                setWarningMess(true);
              } else {
                setWarningMessForAdinin(false);
                setWarningStaffLevelEmp(false);
              }
            } catch (err) {
              console.log(err);
            }

            return {
              ...prevFormData,
              [actualHoursKey]:
                totalWorkingHrs?.includes("NaN") || !totalWorkingHrs
                  ? "0:00"
                  : totalWorkingHrs,
            };
          });
        } catch (err) {
          console.log("Error : ", err);
        }
      };
      // End

      if (titleName === "HO") {
        updateFormData("TOTALACTUALHOURS", "TOTALACTUALHOURS");
      } else if (titleName === "BLNG") {
        updateFormData("WORKINGHOURS", "WORKINGHOURS");
      } else {
        updateFormData("WORKINGHOURS", "WORKINGHOURS");
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  }, [sections]);

  useEffect(() => {
    const totalDecimalOvertime = sections?.reduce((total, sec) => {
      try {
        let overtime = sec.OVERTIMEHRS || "0:00";

        // Convert overtime string to decimal value
        if (overtime?.includes(":")) {
          const [hrs, mins] = overtime?.split(":")?.map(Number);
          overtime = hrs + mins / 100; // Convert HH:MM to HH.XX (100-base)
        } else {
          overtime = parseFloat(overtime); // Already in decimal format
        }

        return total + (isNaN(overtime) ? 0 : overtime);
      } catch (err) {
        return total;
      }
    }, 0);

    // Convert totalDecimalOvertime to HH:100 format
    const hours = Math.floor(totalDecimalOvertime);
    const hundredMinutes = Math.round((totalDecimalOvertime - hours) * 100);

    // Adjust if minutes >= 100
    const adjustedHours = hours + Math.floor(hundredMinutes / 100);
    const adjustedMinutes = hundredMinutes % 100;

    const formattedTime = `${adjustedHours}:${adjustedMinutes
      .toString()
      .padStart(2, "0")}`;

    setFormData((prevFormData) => ({
      ...prevFormData,
      OT: totalDecimalOvertime > 0 ? formattedTime : "0:00",
    }));
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
    const result = sections?.filter((sec) => {
      if (sec.id !== id) {
        return sec;
      }
    });
    setSections(result);
  };

  const handleValidation = () => {
    const newErrors = {};
    sections?.forEach((section, index) => {
      if (!section.LOCATION) {
        newErrors[`LOCATION-${index}`] = "Location is required.";
      }
      if (!section.WORKINGHRS) {
        newErrors[`WORKINGHRS-${index}`] = "Working Hrs is required.";
      }
      // Switch-case style logic using Object.keys
      if (editObject && typeof editObject === "object") {
        Object.keys(editObject).forEach((key) => {
          const value = editObject[key]?.toString().trim();

          switch (key) {
            case "BADGE":
              if (!value || value === "N/A" || value === "0") {
                newErrors["badgeNo"] = "Badge Number is required.";
              }
              break;

            case "FID":
              if (!value || value === "N/A" || value === "0") {
                newErrors["fid"] = "FID or SAP Number is required.";
              }
              break;

            case "NO":
              if (!value || value === "N/A" || value === "0") {
                newErrors["no"] = "FID or SAP Number is required.";
              }
              break;

            case "NORMALWORKINGHRSPERDAY":
              if (!value || value === "N/A" || value === "0") {
                newErrors["NWHPD"] = "Working hours per day is required.";
              }
              break;

            // Add other validations here if needed
            default:
              break;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getEmpAndWorkInfo = (empAndWorkInfo, fileType) => {
    const firstExcelTypes = ["Offshore", "Offshore's ORMC"];
    const secondExcelTypes = ["HO", "SBW", "ORMC"];
    return empAndWorkInfo?.filter((fi) => {
      if (
        editObject?.BADGE &&
        fi?.empBadgeNo &&
        editObject?.BADGE === fi?.empBadgeNo &&
        secondExcelTypes.includes(fileType)
      ) {
        return fi;
      }
      if (
        editObject?.NO &&
        fi?.sapNo &&
        editObject?.NO === fi?.sapNo &&
        firstExcelTypes.includes(fileType)
      ) {
        return fi;
      }

      if (
        editObject?.FID &&
        fi?.sapNo &&
        editObject?.FID === fi?.sapNo &&
        fileType === "BLNG"
      ) {
        return fi;
      }
    })[0];
  };

  //   const getEmpAndWorkInfo = (empAndWorkInfo) => {
  //   return empAndWorkInfo?.find((fi) => {
  //     return (
  //       (editObject.empBadgeNo && fi.empBadgeNo && editObject.empBadgeNo === fi.empBadgeNo) ||
  //       (editObject.fidNo && fi.sapNo && editObject.fidNo === fi.sapNo)
  //     );
  //   });
  // };

  function formatToHHColonMM(input) {
    const str = input?.toString();

    // Case 1: "4" → "4:00"
    if (/^\d+$/.test(str)) {
      return `${str}:00`;
    }

    // Case 2: "5.3" or "5.30" → "5:30" or "5:03" logic based on minute length
    if (/^\d+\.\d+$/.test(str)) {
      const [hours, minutes] = str.split(".");
      const min = minutes.length === 1 ? `${minutes}0` : minutes;
      return `${parseInt(hours)}:${min}`;
    }

    // Case 3: "3:2" or "6:40"
    if (/^\d{1,2}:\d{1,2}$/.test(str)) {
      const [hours, minutes] = str.split(":");
      const min = minutes.length === 1 ? `${minutes}0` : minutes;
      return `${parseInt(hours)}:${min}`;
    }

    // Invalid format
    return null;
  }
  function convertHHMMtoHH100(hhmmStr) {
    const [hoursStr, minutesStr] = hhmmStr?.split(":");
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    const hh100 = parseFloat(`${hours}.${minutes.toString().padStart(2, "0")}`);
    return normalizeHH100(hh100);
  }

  function normalizeHH100(value) {
    let hours = Math.floor(value);
    let hundredMinutes = Math.round((value - hours) * 100);

    if (hundredMinutes >= 100) {
      hours += Math.floor(hundredMinutes / 100);
      hundredMinutes = hundredMinutes % 100;
    }

    return parseFloat(`${hours}.${hundredMinutes.toString().padStart(2, "0")}`);
  }
  function convertToYYYYMMDD(dateStr, fileType) {
    const [day, month, year] = dateStr.split(/[-\/]/);

    // Pad day and month to 2 digits if needed
    const paddedDay = day.padStart(2, "0");
    const paddedMonth = month.padStart(2, "0");

    // if (
    //   fileType === "HO" ||
    //   fileType === "SBW" ||
    //   fileType === "ORMC" ||
    //   fileType === "Offshore" ||
    //   fileType === "Offshore's ORMC" ||
    //   fileType === "BLNG"
    // )
    return `${year}-${paddedDay}-${paddedMonth}`;
  }
  const handleSave = () => {
    if (handleValidation()) {
      if (warningMess) {
        alert(
          `Working hours cannot be greater than 'Normal Daily Hours' (${editObject?.NORMALWORKINGHRSPERDAY})`
        );
        return;
      }

      let AllowToExecute = true;
      let alertShown = true;
      try {
        const getMatchedData = getEmpAndWorkInfo(
          empAndWorkInfo,
          editObject?.fileType
        );

        let rawDate =
          editObject?.DATE?.trim() || editObject?.ENTRANCEDATEUSED?.trim();
        let formattedDate = convertToYYYYMMDD(rawDate, editObject.fileType);

        const currentDay = new Date(formattedDate);
        const dayOfWeek = new Intl.DateTimeFormat("en-BN", {
          weekday: "long",
        }).format(currentDay);

        let NWHPD =
          getMatchedData?.workHrs[getMatchedData?.workHrs.length - 1] || 0;
        let NWHPM =
          getMatchedData?.workMonth[getMatchedData?.workMonth.length - 1] || 0;
        let formattedNWHPD = parseFloat(NWHPD);
        if (
          String(NWHPD) === "8" &&
          String(NWHPM) === "24" &&
          dayOfWeek === "Saturday"
        ) {
          formattedNWHPD = parseFloat(NWHPD) / 2;
        }

        sections.map((val) => {
          // if(val.WORKINGHRS)
          if (!alertShown) return;
          if (!val.WORKINGHRS) return;
          const formattedWorkHrs = formatToHHColonMM(val.WORKINGHRS);
          const normalizedWorkHrs = convertHHMMtoHH100(formattedWorkHrs);
          const normalizedNormalHrs = normalizeHH100(formattedNWHPD);

          if (normalizedWorkHrs > normalizedNormalHrs) {
            alertShown = false;
            if (dayOfWeek === "Saturday" && NWHPD == 8 && NWHPM == 24) {
              setWarningStaffLevelEmp(true);
              alert(
                `On Saturdays, working hours cannot exceed the normal daily limit (${formattedNWHPD} hours) for staff-level employees.`
              );
              // return false;
              AllowToExecute = false;
              return;
            }
          }
        });
      } catch (err) {
        AllowToExecute = true;
        console.log("ERROR : ", err);
      }

      if (!AllowToExecute) return;

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
                  className="border border-slate_grey bg-[#f1f5f9] rounded text-dark_grey text-[16px] text_size_5 outline-none w-full py-[7px] px-3 cursor-auto"
                  value={
                    formData[`formatted_${field}`] || formData[field] || ""
                  }
                  onChange={handleChange}
                  // readOnly={Position !== "Manager" ? index < 0 : true}
                  // readOnly={field === "NORMALWORKINGHRSPERDAY" || Position !== "Manager" ? index < 5 : true}
                  readOnly={
                    field === "NORMALWORKINGHRSPERDAY"
                      ? true
                      : field === "BADGE" || field === "FID" || field === "NO"
                      ? false
                      : Position !== "Manager"
                      ? index < 6
                      : false
                  }
                />
                {/* {field === "BADGE" ? ( */}
                {field === "BADGE" && errors[`badgeNo`] ? (
                  <span className="text-red text_size_9">
                    {errors[`badgeNo`]}
                  </span>
                ) : field === "FID" && errors[`fid`] ? (
                  <span className="text-red text_size_9">{errors[`fid`]}</span>
                ) : field === "NO" && errors[`no`] ? (
                  <span className="text-red text_size_9">{errors[`no`]}</span>
                ) : field === "NORMALWORKINGHRSPERDAY" && errors[`NWHPD`] ? (
                  <span className="text-red text_size_9">
                    {errors[`NWHPD`]}
                  </span>
                ) : (
                  ""
                )}
                {/* ):("")} */}

                {warningStaffLevelEmp === true && warningMess === false
                  ? (field === "WORKINGHOURS" ||
                      field === "TOTALACTUALHOURS") && (
                      <span className="text_size_9 mt-2 text-red">
                        {`Staff can't exceed ${
                          parseFloat(editObject?.NORMALWORKINGHRSPERDAY) / 2
                        } hrs on Saturdays.`}
                      </span>
                    )
                  : null}
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
                        <span className="text-red text_size_9">
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
                        placeholder="H.100 or x(H.100)H.100"
                        className="border border-lite_grey rounded text-dark_grey text_size_5 outline-none w-full py-2 px-3 cursor-auto bg-white"
                        readOnly={!section.LOCATION}
                      />
                      {errors[`WORKINGHRS-${index}`] && (
                        <span className="text-red text_size_9">
                          {errors[`WORKINGHRS-${index}`]}
                        </span>
                      )}
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
                        placeholder="H.100"
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
