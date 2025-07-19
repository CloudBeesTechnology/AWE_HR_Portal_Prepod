import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import logo from "../../../assets/logo/logo-with-name.svg";
import { IoArrowBack, IoArrowBackOutline } from "react-icons/io5";
import {
  capitalizedLetter,
  DateFormat,
  DateNewFormat,
  FTDateFormat,
} from "../../../utils/DateFormat";
import { useLeaveSummaryCal } from "../../../hooks/useLeaveSummaryCal";
import { usePublicHolidayList } from "../../../hooks/usePublicHolidayList";
import { useLeaveSummaryFuncs } from "../../../hooks/useLeaveSummaryFuncs";
import { EmpProDataLeaveCal } from "./EmpProDataLeaveCal";
import { IoMdPrint } from "react-icons/io";
import { LeaveSummaryPrint } from "../../../utils/LeaveSummaryPrint";

export const EmpLeaveCalculation = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { mergedLeaveData: mergedData, item: empDetails } =
    location.state || {};
  const { publicHoliday } = usePublicHolidayList();

  const { filterOnshoreOffshorePHbasis } = useLeaveSummaryCal();
  const { convertToFormattedHolidays, getSelectedMonthName } =
    useLeaveSummaryFuncs();
  const { PrintExcelSheet } = LeaveSummaryPrint();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [leaveSummary, setLeaveSummary] = useState({});
  const [primaryData, setPrimaryData] = useState([]);
  const formatToTwoDecimals = (num) => parseFloat(num.toFixed(2));

  const initializeLeaveType = (total = 0, isSpecialLeave = false) => ({
    totalLeave: isSpecialLeave ? null : total || 0,
    daysTaken: 0,
    waitingApproval: 0,
    remainingLeave: isSpecialLeave ? null : total,
  });

  // Formatted date
  const formattedDate = (selectedDate) => {
    let leaveDateObj = null;

    if (selectedDate?.includes("/")) {
      // Format: DD/MM/YYYY
      const [day, month, year] = selectedDate?.split("/").map(Number);
      leaveDateObj = new Date(year, month - 1, day);
    } else if (selectedDate?.includes("-")) {
      // Format: YYYY-MM-DD (safe to pass directly to Date)
      leaveDateObj = new Date(selectedDate);
    }

    return leaveDateObj;
  };

  const filterLeaveSummaryByHeader = (item, leaveSummaryHeader) => {
    let takenLeaves =
      item?.managerStatus === "Approved" && item?.empStatus !== "Cancelled";

    let waitingForApproval =
      item?.managerStatus === "Pending" &&
      item?.supervisorStatus !== "Rejected" &&
      item?.empStatus !== "Cancelled";

    let selectedCondition =
      leaveSummaryHeader === "daysTaken"
        ? takenLeaves
        : leaveSummaryHeader === "waitingApproval"
        ? waitingForApproval
        : null;

    return selectedCondition;
  };
  const handleAnnualLeaveConditions = (
    item,
    currentYear,
    effectiveDate,
    leaveTypeName,
    leaveSummaryHeader
  ) => {
    try {
      const effectiveYear = new Date(effectiveDate).getFullYear();
      let rangeStart, rangeEnd;
      if (currentYear === effectiveYear) {
        // Filter between effectiveDate and 31/12/currentYear
        rangeStart = new Date(effectiveDate);
        rangeEnd = new Date(`${currentYear}-12-31`);
      } else if (currentYear > effectiveYear) {
        // Filter between 01/01/currentYear and 31/12/currentYear
        rangeStart = new Date(`${currentYear}-01-01`);
        rangeEnd = new Date(`${currentYear}-12-31`);
      }

      const selectedCondition = filterLeaveSummaryByHeader(
        item,
        leaveSummaryHeader
      );

      let leaveDateObj = null;
      if (item?.empLeaveSelectedFrom) {
        leaveDateObj = formattedDate(item?.empLeaveSelectedFrom);
      } else if (item?.empLeaveStartDate) {
        leaveDateObj = new Date(item?.empLeaveStartDate);
      }

      if (
        leaveDateObj >= rangeStart &&
        leaveDateObj <= rangeEnd &&
        item?.empLeaveType === leaveTypeName &&
        item?.empBadgeNo === empDetails?.empBadgeNo &&
        selectedCondition
      ) {
        return item;
      }
    } catch (err) {
      console.log("ERROR : ", err);
    }
  };

  const handleSickLeaveConditions = (
    item,
    currentDate,
    effectiveDate,
    leaveTypeName,
    leaveSummaryHeader
  ) => {
    const effectiveDateObj = new Date(effectiveDate);

    if (currentDate >= effectiveDateObj) {
      // Calculate 1-year window that includes currentDate
      let windowStart = new Date(effectiveDateObj);
      let windowEnd = new Date(effectiveDateObj);
      windowEnd.setFullYear(windowEnd.getFullYear() + 1);

      // Shift window forward until currentDate < windowEnd
      while (currentDate >= windowEnd) {
        windowStart.setFullYear(windowStart.getFullYear() + 1);
        windowEnd.setFullYear(windowEnd.getFullYear() + 1);
      }

      // Get leave date
      let leaveDateObj = null;
      if (item.empLeaveSelectedFrom) {
        leaveDateObj = formattedDate(item.empLeaveSelectedFrom);
      } else if (item?.empLeaveStartDate) {
        leaveDateObj = new Date(item?.empLeaveStartDate);
      }

      const selectedCondition = filterLeaveSummaryByHeader(
        item,
        leaveSummaryHeader
      );
      // If leave date falls in range
      if (
        leaveDateObj &&
        leaveDateObj >= windowStart &&
        leaveDateObj < windowEnd &&
        item?.empLeaveType === leaveTypeName &&
        selectedCondition
      ) {
        return item;
      }
    }

    return null;
  };

  const handleOtherLeaveConditions = (
    item,
    leaveTypeName,
    leaveSummaryHeader
  ) => {
    const selectedCondition = filterLeaveSummaryByHeader(
      item,
      leaveSummaryHeader
    );
    if (
      item?.empLeaveType === leaveTypeName &&
      item?.empBadgeNo === empDetails?.empBadgeNo &&
      selectedCondition
    ) {
      return item;
    }
  };

  const handleAllCLLeaveConditions = (
    item,
    currentDate,
    leaveTypeName,
    leaveSummaryHeader
  ) => {
    let currentYear = currentDate.getFullYear();
    let rangeStart = new Date(`${currentYear}-01-01`);
    let rangeEnd = new Date(`${currentYear}-12-31`);

    const selectedCondition = filterLeaveSummaryByHeader(
      item,
      leaveSummaryHeader
    );

    let leaveDateObj = null;
    if (item.empLeaveSelectedFrom) {
      leaveDateObj = formattedDate(item.empLeaveSelectedFrom);
    } else if (item?.empLeaveStartDate) {
      leaveDateObj = new Date(item.empLeaveStartDate);
    }
    let correctedLeaveType =
      leaveTypeName === "Unpaid Authorize Annual"
        ? "Unpaid Authorize - Annual"
        : leaveTypeName === "Unpaid Authorize Sick"
        ? "Unpaid Authorize - Sick"
        : leaveTypeName;
    if (
      leaveDateObj >= rangeStart &&
      leaveDateObj <= rangeEnd &&
      item?.empLeaveType === correctedLeaveType &&
      item?.empBadgeNo === empDetails?.empBadgeNo &&
      selectedCondition
    ) {
      return item;
    }
  };

  const UpdateLeaveSummary = (
    getMatchedEmpLeaves,
    leaveType,
    getDaysTakenList,
    getWaitingForApprovalList
  ) => {
    let leaveTaken = getMatchedEmpLeaves[leaveType]?.daysTaken || 0;
    leaveTaken += Number(getDaysTakenList?.leaveTakenCount) || 0;

    let waitingForApproval =
      getMatchedEmpLeaves[leaveType]?.waitingApproval || 0;
    waitingForApproval +=
      Number(getWaitingForApprovalList?.leaveTakenCount) || 0;

    let getRemainingLeave =
      getMatchedEmpLeaves[leaveType]?.totalLeave -
      (leaveTaken + waitingForApproval);

    return { leaveTaken, waitingForApproval, getRemainingLeave };
  };

  const getCurrentYearLeaves = (getUpdatedLeaveData, getMatchedEmpLeaves) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const getAllKeys = Object?.keys(getMatchedEmpLeaves);

    // Loop through each leave type in getMatchedEmpLeaves
    for (let leaveType of getAllKeys) {
      const leaveDetails = getMatchedEmpLeaves[leaveType];

      if (leaveDetails) {
        // Get readable leave type name for comparison
        let leaveTypeName = "";

        switch (leaveType) {
          case "annualLeave":
            leaveTypeName = "Annual Leave";
            break;
          case "sickLeave":
            leaveTypeName = "Sick Leave";
            break;
          case "maternityLeave":
            leaveTypeName = "Maternity Leave";
            break;
          case "paternityLeave":
            leaveTypeName = "Paternity Leave";
            break;
          case "marriageLeave":
            leaveTypeName = "Marriage Leave";
            break;
          case "hospitalisationLeave":
            leaveTypeName = "Hospitalisation Leave";
            break;
          case "compassionateLeave":
            leaveTypeName = "Compassionate Leave";
            break;
          case "compensateLeave":
            leaveTypeName = "Compensate Leave";
            break;
          case "unPaidAuthorizeAnnual":
            leaveTypeName = "Unpaid Authorize Annual";
            break;
          case "unPaidAuthorizeSick":
            leaveTypeName = "Unpaid Authorize Sick";
            break;

          default:
            leaveTypeName = "";
            break;
        }

        for (let leaveData of getUpdatedLeaveData) {
          // For Annual Leave Calculation
          if (leaveData?.empBadgeNo === empDetails.empBadgeNo) {
            let latestAnnualLeaveEffDate = Array.isArray(
              leaveData?.empAnnualLeaveDate
            )
              ? leaveData?.empAnnualLeaveDate[
                  leaveData?.empAnnualLeaveDate.length - 1
                ]
              : leaveData?.empAnnualLeaveDate;

            if (leaveTypeName === "Annual Leave" && latestAnnualLeaveEffDate) {
              let getDaysTakenList = handleAnnualLeaveConditions(
                leaveData,
                currentYear,
                latestAnnualLeaveEffDate,
                leaveTypeName,
                "daysTaken"
              );
              let getWaitingForApprovalList = handleAnnualLeaveConditions(
                leaveData,
                currentYear,
                latestAnnualLeaveEffDate,
                leaveTypeName,
                "waitingApproval"
              );

              const { leaveTaken, waitingForApproval, getRemainingLeave } =
                UpdateLeaveSummary(
                  getMatchedEmpLeaves,
                  leaveType,
                  getDaysTakenList,
                  getWaitingForApprovalList
                );

              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                daysTaken: leaveTaken,
                waitingApproval: waitingForApproval,
                remainingLeave: getRemainingLeave > 0 ? getRemainingLeave : 0,
              };
            } else if (
              leaveTypeName === "Annual Leave" &&
              !latestAnnualLeaveEffDate
            ) {
              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                totalLeave: "0",
                daysTaken: "0",
                waitingApproval: "0",
                remainingLeave: "0",
              };
            }

            // For Sick Leave Calculation
            let SickLeaveEffDate = leaveData?.empSickLeaveDate
              ? leaveData?.empSickLeaveDate
              : null;
            if (leaveTypeName === "Sick Leave" && SickLeaveEffDate) {
              const getCurrentDate = new Date();
              getCurrentDate.setHours(0, 0, 0, 0);

              let getDaysTakenList = handleSickLeaveConditions(
                leaveData,
                getCurrentDate,
                SickLeaveEffDate,
                leaveTypeName,
                "daysTaken"
              );

              let getWaitingForApprovalList = handleSickLeaveConditions(
                leaveData,
                getCurrentDate,
                SickLeaveEffDate,
                leaveTypeName,
                "waitingApproval"
              );

              const { leaveTaken, waitingForApproval, getRemainingLeave } =
                UpdateLeaveSummary(
                  getMatchedEmpLeaves,
                  leaveType,
                  getDaysTakenList,
                  getWaitingForApprovalList
                );

              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                daysTaken: leaveTaken,
                waitingApproval: waitingForApproval,
                remainingLeave: getRemainingLeave > 0 ? getRemainingLeave : 0,
              };
            } else if (leaveTypeName === "Sick Leave" && !SickLeaveEffDate) {
              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                totalLeave: "0",
                daysTaken: "0",
                waitingApproval: "0",
                remainingLeave: "0",
              };
            }

            const specificLeaveTypes =
              leaveTypeName === "Hospitalisation Leave" ||
              leaveTypeName === "Maternity Leave" ||
              leaveTypeName === "Paternity Leave" ||
              leaveTypeName === "Marriage Leave";

            if (specificLeaveTypes) {
              let getDaysTakenList = handleOtherLeaveConditions(
                leaveData,
                leaveTypeName,
                "daysTaken"
              );

              let getWaitingForApprovalList = handleOtherLeaveConditions(
                leaveData,
                leaveTypeName,
                "waitingApproval"
              );

              const { leaveTaken, waitingForApproval, getRemainingLeave } =
                UpdateLeaveSummary(
                  getMatchedEmpLeaves,
                  leaveType,
                  getDaysTakenList,
                  getWaitingForApprovalList
                );

              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                daysTaken: leaveTaken,
                waitingApproval: waitingForApproval,
                remainingLeave: getRemainingLeave > 0 ? getRemainingLeave : 0,
              };
            }

            const specificOtherLeaveTypes =
              leaveTypeName === "Compassionate Leave" ||
              leaveTypeName === "Compensate Leave" ||
              leaveTypeName === "Unpaid Authorize Annual" ||
              leaveTypeName === "Unpaid Authorize Sick";
            if (specificOtherLeaveTypes) {
              const getCurrentDate = new Date();
              getCurrentDate.setHours(0, 0, 0, 0);
              let getDaysTakenList = handleAllCLLeaveConditions(
                leaveData,
                getCurrentDate,
                leaveTypeName,
                "daysTaken"
              );

              let getWaitingForApprovalList = handleAllCLLeaveConditions(
                leaveData,
                getCurrentDate,
                leaveTypeName,
                "waitingApproval"
              );

              let leaveTaken = getMatchedEmpLeaves[leaveType]?.daysTaken || 0;
              leaveTaken += Number(getDaysTakenList?.leaveTakenCount) || 0;

              let waitingForApproval =
                getMatchedEmpLeaves[leaveType]?.waitingApproval || 0;
              waitingForApproval +=
                Number(getWaitingForApprovalList?.leaveTakenCount) || 0;

              getMatchedEmpLeaves[leaveType] = {
                ...getMatchedEmpLeaves[leaveType],
                totalLeave: "-",
                daysTaken: leaveTaken,
                waitingApproval: waitingForApproval,
                remainingLeave: "-",
              };
            }
          }
        }
      }
    }

    return getMatchedEmpLeaves;
  };

  const convertStartAndEndMonth = (date) => {
    let currentYearFirstLastMonth = new Date(date);
    currentYearFirstLastMonth.setHours(0, 0, 0, 0);
    return currentYearFirstLastMonth.toLocaleDateString();
  };

  useEffect(() => {
    const handleDateFilter = () => {
      if (!startDate || !endDate) {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const currentYear = currentDate.getFullYear();
        let getFirstMont = `${currentYear}-01-01`;
        let getLastMonth = `${currentYear}-12-31`;
        const firstDate = convertStartAndEndMonth(getFirstMont);
        const seconddate = convertStartAndEndMonth(getLastMonth);
        const getSelectedMonth = getSelectedMonthName(firstDate, seconddate);
        setSelectedDate(getSelectedMonth);
        setPrimaryData(mergedData);

        // const filteredData = mergedData?.filter((fil) => {
        //   if (fil.empID === "7510" && fil?.leaveType === "Annual Leave") {
        //     // const fromDateStr = fil?.empLeaveSelectedFrom; // Format as YYYY-MM-DD
        //     // return dates?.includes(fromDateStr); // ✅ using dates directly is correct
        //     return fil
        //   }
        // });
        // console.log("filteredData : ",filteredData);

        return;
      }

      const getSelectedMonth = getSelectedMonthName(startDate, endDate);
      setSelectedDate(getSelectedMonth);

      const hasOnlySlashOrDash = /[\/-]/;
      const filteredData = mergedData?.filter((item) => {
        let fromDate = null;
        let toDate = null;
        if (
          String(item?.empLeaveSelectedFrom) &&
          String(item?.empLeaveSelectedTo) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedFrom) &&
          hasOnlySlashOrDash.test(item?.empLeaveSelectedTo)
        ) {
          fromDate = formattedDate(item.empLeaveSelectedFrom);
          toDate = formattedDate(item.empLeaveSelectedTo);
        } else if (
          String(item?.empLeaveStartDate) &&
          String(item?.empLeaveEndDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveStartDate) &&
          hasOnlySlashOrDash.test(item?.empLeaveEndDate)
        ) {
          fromDate = formattedDate(item.empLeaveStartDate);
          toDate = formattedDate(item.empLeaveEndDate);
        }

        const fDate = new Date(fromDate);
        const eDate = new Date(toDate);
        const getStrDate = new Date(startDate);
        const getEndDate = new Date(endDate);

        return fDate >= getStrDate && eDate <= getEndDate;
      });

      setPrimaryData(filteredData);
    };
    handleDateFilter();
  }, [startDate, endDate, mergedData]);

  useEffect(() => {
    try {
      const initialLeaveDetails =
        Array.isArray(primaryData) && primaryData.length > 0
          ? primaryData?.reduce((acc, val) => {
              if (val && val?.empID && !acc[val?.empID]) {
                let addTotalAnnualLeaveBalance =
                  Number(
                    Array.isArray(val?.annualLeave) &&
                      val?.annualLeave?.length > 0
                      ? val.annualLeave[val.annualLeave.length - 1]
                      : typeof val.annualLeave === "string"
                      ? parseFloat(val.annualLeave)
                      : 0
                  ) + Number(val.empPervAnnualLeaveBal || 0);
                let totalAnnualLeaveBalance = formatToTwoDecimals(
                  addTotalAnnualLeaveBalance
                );

                acc[val.empID] = {
                  gender: val.gender,
                  empId: val.empID,
                  employeeName: val.empName,
                  empBadgeNo: val.empBadgeNo,
                  position: val.position,
                  department: val.department,
                  doj: val.doj,
                  annualLeaveEntitlement: Array.isArray(val.annualLeave)
                    ? val.annualLeave[val.annualLeave.length - 1]
                    : "0",
                  sickLeaveEntitlement: val.sickLeave || 0,
                  empAnnualLeaveEffDate: Array.isArray(val.empAnnualLeaveDate)
                    ? val.empAnnualLeaveDate[val.empAnnualLeaveDate.length - 1]
                    : null,
                  empSickLeaveEffDate: val.empSickLeaveDate,
                  annualLeaveBal: val.empPervAnnualLeaveBal,
                  // empsickLeaveTaken: val.empsickLeaveTaken,
                  // effectiveDate: val.empSickLeaveDate,
                  compassionateLeave: initializeLeaveType(0, true),
                  //   unPaidAuthorisedLeave: initializeLeaveType(0, true),
                  unPaidAuthorizeSick: initializeLeaveType(0, true),
                  unPaidAuthorizeAnnual: initializeLeaveType(0, true),
                  annualLeave: initializeLeaveType(totalAnnualLeaveBalance),

                  marriageLeave: initializeLeaveType(
                    Number(val.marriageLeave) || 0
                  ),
                  hospitalisationLeave: initializeLeaveType(
                    Number(val.hospitalLeave) || 0
                  ),
                  maternityLeave: initializeLeaveType(
                    Number(val.maternityLeave) || 0
                  ),
                  sickLeave: initializeLeaveType(Number(val.sickLeave) || 0),
                  paternityLeave: initializeLeaveType(
                    Number(val.paternityLeave) || 0
                  ),
                  compensateLeave: initializeLeaveType(0, true) || 0,
                  workHrs: Array.isArray(val.workHrs)
                    ? val.workHrs[val.workHrs.length - 1]
                    : "0",

                  workMonth: Array.isArray(val.workMonth)
                    ? val.workMonth[val.workMonth.length - 1]
                    : "0",

                  workWeek: Array.isArray(val.workWeek)
                    ? val.workWeek[val.workWeek.length - 1]
                    : "0",
                  status: {
                    SAT: 0,
                    AL: "",
                    SL: "",
                  },
                  dojOrSpecifiedDate: "",
                  leaveEntitleToday: "",
                  noOfDaysWorked: "",
                  annualLeaveEntitleBal: "",
                  noOfDaysWorkedUAL: "",
                  totalWorkedDays: "",
                  leaveEligibleForThisYear: "",
                  isEligibleForAnnualLeave: "",
                };
              }
              return acc;
            }, {})
          : {};

      const getMatchedEmpLeaves = initialLeaveDetails[empDetails?.empID];

      const { formattedPHList } = convertToFormattedHolidays({
        publicHoliday,
      });

      const { getUpdatedLeaveData } = filterOnshoreOffshorePHbasis({
        formattedPHList,
        primaryData,
        getMatchedEmpLeaves,
      });

      const allCurrentYearLeaves = getCurrentYearLeaves(
        getUpdatedLeaveData,
        getMatchedEmpLeaves
      );

      setLeaveSummary(allCurrentYearLeaves);
    } catch (err) {
      setLeaveSummary((prev) => {
        const leaveTypesToReset = [
          "compassionateLeave",
          "unPaidAuthorizeSick",
          "unPaidAuthorizeAnnual",
          "annualLeave",
          "marriageLeave",
          "hospitalisationLeave",
          "maternityLeave",
          "sickLeave",
          "paternityLeave",
          "compensateLeave",
        ];

        const updated = { ...prev };

        leaveTypesToReset.forEach((key) => {
          if (updated[key]) {
            updated[key] = {
              ...updated[key],
              daysTaken: 0,
              waitingApproval: 0,
            };
          }
        });

        return updated;
      });

      // nav("/leaveManagement/leaveBalance");
    }
  }, [primaryData, empDetails, publicHoliday]);

  const getDisplayDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      const end = new Date(endDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      return `${start} - ${end}`;
    }
    const now = new Date();
    const month = now.toLocaleDateString("en-US", { month: "long" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  const leaveTypes = {
    annualLeave: "Annual Leave",
    sickLeave: "Sick Leave",
    hospitalisationLeave: "Hospitalisation Leave",
    maternityLeave: "Maternity Leave",
    paternityLeave: "Paternity Leave",
    compensateLeave: "Compensate Leave",
    compassionateLeave: "Compassionate Leave",
    marriageLeave: "Marriage Leave",
    unPaidAuthorizeSick: "unPaidAuthorizeSick",
    unPaidAuthorizeAnnual: "unPaidAuthorizeAnnual",
  };

  return (
    <main className="w-full">
      <i
        className="text-2xl text-dark_grey cursor-pointer"
        onClick={() => nav("/leaveManagement/leaveBalance")}
      >
        <IoArrowBackOutline />
      </i>
      <section className="flex justify-between items-center mt-5 gap-10">
        <div className=" flex justify-between items-center gap-5 w-full">
          <section className="flex items-center gap-5 w-full">
            <div>
              <label
                htmlFor="start-date"
                className="block text-[16px] font-medium"
              >
                Start Date
              </label>
              <div className="text_size_5 bg-white border py-1.5 rounded text-grey border-medium_grey flex items-center px-2.5 gap-2">
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-none text-grey"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-[16px] font-medium"
              >
                End Date
              </label>
              <div className="text_size_5 bg-white border py-1.5 rounded text-grey border-medium_grey flex items-center px-2.5 gap-2">
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-none text-grey"
                />
              </div>
            </div>
          </section>
        </div>
        <div className="center mt-auto">
          <button
            className="center gap-2 px-3 py-2 text-dark_grey text_size_5 bg-primary rounded"
            onClick={() => {
              PrintExcelSheet("downloadTable", selectedDate, leaveSummary);
            }}
          >
            <i>
              <IoMdPrint />
            </i>
            <span>Print</span>
          </button>
        </div>
      </section>

      <div className="flex flex-col justify-between items-center pb-5 flex-1">
        <article className="flex items-center justify-between w-full">
          <div className="flex-1 center">
            <img
              className="max-w-[240px] w-full"
              src={logo}
              alt="Company logo"
            />
          </div>
        </article>
        <p className="text-center text-dark_grey text-lg font-semibold pt-3">
          {/* {getDisplayDateRange()} */}
          {selectedDate}
        </p>
        <h2 className="uppercase text-xl text-center w-full font-medium mt-2">
          Leave Summary for{" "}
          <span className="font-semibold italic">
            {leaveSummary?.employeeName ?? "N/A"}
          </span>
        </h2>
      </div>
      <div>
        <EmpProDataLeaveCal
          selectedDate={selectedDate}
          leaveTypes={leaveTypes}
          leaveSummary={leaveSummary}
        />
      </div>
    </main>
  );
};
