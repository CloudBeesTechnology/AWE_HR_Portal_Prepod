import { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
import logo from "../../assets/logo/logo-with-name.svg";

export const ProbationReview = () => {
  const userID = localStorage.getItem("userID");
  const userType = localStorage.getItem("userType");
  const location = useLocation();
  const { allData, title } = location.state || {};
  const { gmPosition, HRMPosition } = useTempID();
  const [tableBody, setTableBody] = useState([]);
  const [originalTableBody, setOriginalTableBody] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [extenFlag, setExtenFlag] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [tableHead] = useState(
    [
      "Emp ID",
      "Badge no",
      "Name",
      "Date of Join",
      "Department",
      "Other Department",
      "Position",
      "Other Position",
      "Probation Expiry Date",
      "Deadline to Return to HRD",
      userType !== "SuperAdmin" && "Status",
    ].filter(Boolean)
  );

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (Array.isArray(date)) {
      if (date.length === 0) return "-";
      const lastDate = date[date.length - 1];
      return formatDate(lastDate);
    }

    if (!date) return "-";

    let parsedDate;

    if (typeof date === "string" && date.includes("/")) {
      const [day, month, year] = date.split("/");
      parsedDate = new Date(`${year}-${month}-${day}`);
    } else {
      parsedDate = new Date(date);
    }

    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const calculateDeadline = (probationEndDate) => {
    let date;

    if (probationEndDate.includes("/")) {
      const [day, month, year] = probationEndDate.split("/");
      date = new Date(`${year}-${month}-${day}`);
    } else {
      date = new Date(probationEndDate);
    }

    if (isNaN(date)) return "Invalid Date";

    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  };

  const probationReviewMergedData = (data) => {
    const today = new Date();

    const firstDayOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const lastDayOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      1
    );
    lastDayOfNextMonth.setMilliseconds(-1);

    const sortedData = data
      ?.filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1];

          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION" ||
            lastWorkStatus.toUpperCase() === "ACTIVE"
          ) {
            return false;
          }

          const probationEndDates = item.probationEnd || [];
          const lastDate = probationEndDates[probationEndDates.length - 1];

          if (!lastDate) return false;

          const probationEnd = new Date(lastDate);

          let prevProbExDate = null;
          if (item.prevProbExDate) {
            const [day, month, year] = item.prevProbExDate.split("/");
            prevProbExDate = new Date(`${year}-${month}-${day}`);
          }

          if (
            prevProbExDate &&
            probationEnd.toDateString() === prevProbExDate.toDateString()
          ) {
            return false;
          }

          if (
            item.probExtendStatus === "probup" ||
            item.probExtendStatus === "completed"
          ) {
            return false;
          }

          return (
            probationEnd >= firstDayOfNextMonth &&
            probationEnd <= lastDayOfNextMonth
          );
        }
        return false;
      })
      .map((item) => {
        const probationEndDates = item?.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates?.length - 1];

        const lastManager =
          Array.isArray(item.manager) && item?.manager.length > 0
            ? item.manager[item?.manager?.length - 1]
            : null;

        if (
          userType === "Manager" &&
          gmPosition !== "GENERAL MANAGER" &&
          HRMPosition !== "HR MANAGER"
        ) {
          const supervisor = item?.supervisor;
          const hasSupervisor =
            (Array.isArray(supervisor)
              ? supervisor[supervisor?.length - 1]
              : supervisor
            )?.trim() || "";

          const supervisorValid =
            hasSupervisor &&
            hasSupervisor !== "null" &&
            hasSupervisor !== "N/A" &&
            hasSupervisor !== "";

          if (lastManager !== userID && supervisorValid) return null;
        } else if (userType === "HR" || HRMPosition === "HR MANAGER") {
        } else if (gmPosition === "GENERAL MANAGER") {
          return null;
        }

        const today = new Date();

        const positionRevDate =
          item.positionRevDate?.[item.positionRevDate.length - 1];
        const positionRev = item.positionRev?.[item.positionRev.length - 1];
        const upgradePosition =
          item.upgradePosition?.[item.upgradePosition.length - 1];
        const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];

        const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
        const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

        let finalPosition;

        if (revDateObj && upgradeDateObj) {
          if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
            finalPosition = item.position?.[item.position.length - 1];
          } else if (revDateObj > upgradeDateObj) {
            if (today >= revDateObj) {
              finalPosition = positionRev;
            } else if (today >= upgradeDateObj) {
              finalPosition = upgradePosition;
            } else {
              finalPosition = item.position?.[item.position.length - 1];
            }
          } else {
            if (today >= upgradeDateObj) {
              finalPosition = upgradePosition;
            } else if (today >= revDateObj) {
              finalPosition = positionRev;
            } else {
              finalPosition = item.position?.[item.position.length - 1];
            }
          }
        } else if (revDateObj && !upgradeDateObj) {
          if (today >= revDateObj) {
            finalPosition = positionRev;
          } else {
            finalPosition = item.position?.[item.position.length - 1];
          }
        } else if (upgradeDateObj && !revDateObj) {
          if (today >= upgradeDateObj) {
            finalPosition = upgradePosition;
          } else {
            finalPosition = item.position?.[item.position.length - 1];
          }
        } else {
          finalPosition = item.position?.[item.position.length - 1];
        }

        return {
          lastDate: new Date(lastDate),
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          dateOfJoin: formatDate(item.doj) || "-",
          department: Array.isArray(item.department)
            ? item.department[item.department.length - 1]
            : "-",
          otherDepartment: Array.isArray(item.otherDepartment)
            ? item.otherDepartment[item.otherDepartment.length - 1]
            : "-",
          position: finalPosition,
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
          probExtendStatus: item.probExtendStatus,
          prevProbExDate: item.prevProbExDate,

          ...(userType === "Supervisor" && {
            status:
              item.probExtendStatus === "Extended"
                ? "Pending"
                : item.supervisorApproved
                ? "Approved"
                : "Pending",
          }),
          ...(HRMPosition === "HR MANAGER"
            ? {
                status:
                  item.probExtendStatus === "Extended"
                    ? "Pending"
                    : item.hrName
                    ? "Approved"
                    : "Pending",
              }
            : userType === "HR"
            ? {
                status:
                  item.probExtendStatus === "Extended"
                    ? "Pending"
                    : item.hrName
                    ? "Approved"
                    : "Pending",
              }
            : {}),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.lastDate - b.lastDate)
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
      });

    return sortedData?.map(({ lastDate, ...rest }) => rest);
  };

  useEffect(() => {
    const mergedData = probationReviewMergedData(
      allData,
      userType,
      gmPosition,
      userID,
      HRMPosition
    );
    setTableBody(mergedData);
    setOriginalTableBody(mergedData);
  }, [allData, userType, gmPosition, userID, HRMPosition]);

  const handleViewDetails = (personData) => {
    setSelectedPerson(personData);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleDownload = () => {
    closeModal();
    if (selectedPerson) {
      navigate("/probReviewForm", { state: { employeeData: selectedPerson } });
    }
  };

  useEffect(() => {
    if (selectedPerson) {
      const empRecords = allData.filter(
        (item) => item.empID === selectedPerson.empID
      );

      // Filter out records where probExtendStatus === "item.probExtendStatus"
      const filteredRecords = empRecords.filter(
        (item) => item.probExtendStatus !== "probup"
      );

      // Check if any remaining records have "extended" or "completed"
      const hasExtended = filteredRecords.some(
        (item) =>
          item.probExtendStatus?.trim().toLowerCase() === "extended" ||
          item.probExtendStatus?.trim().toLowerCase() === "completed"
      );

      if (hasExtended) {
        setExtenFlag(filteredRecords);
      } else {
        setExtenFlag([]);
      }
    }
  }, [allData, selectedPerson]);

  const handleDate = (e, type) => {
    const value = e.target.value;

    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);

    const start = type === "startDate" ? value : startDate;
    const end = type === "endDate" ? value : endDate;

    // Always filter from the original data
    const filtered = originalTableBody.filter((item) => {
      if (!item.probationEndDate || item.probationEndDate === "-") return false;

      const [day, month, year] = item.probationEndDate.split("-");
      const probationEnd = new Date(`${year}-${month}-${day}`);

      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;

      // If both dates are empty, include all items
      if (!startDateObj && !endDateObj) return true;

      // Filter logic
      let includeItem = true;
      if (startDateObj) {
        includeItem = includeItem && probationEnd >= startDateObj;
      }
      if (endDateObj) {
        includeItem = includeItem && probationEnd <= endDateObj;
      }

      return includeItem;
    });

    setTableBody(filtered);
  };

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        title={title}
        startDate={startDate}
        endDate={endDate}
        handleDate={handleDate}
        handleViewDetails={handleViewDetails}
        isFiltered={isDateFiltered}
      />

      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg overflow-y-auto max-h-[80vh] shadow-lg w-1/3">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1 center">
                <img className="max-w-[200px]" src={logo} alt="Logo" />
              </div>
              <button className="text-[24px] rounded" onClick={closeModal}>
                <VscClose />
              </button>
            </section>

            <h2 className="text-xl font-semibold underline text-center mb-5">
              Person Details
            </h2>
            <div className="space-y-2 text-sm font-semibold px-12">
              <div className="flex">
                <span className="w-40">Badge No</span>
                <span className="w-4 text-center">:</span>
                <span className="flex-1 text-[#666666]">
                  {selectedPerson.name}
                </span>
              </div>

              <div className="flex">
                <span className="w-40">Emp Badge No</span>
                <span className="w-4 text-center">:</span>
                <span className="flex-1 text-[#666666]">
                  {selectedPerson.empBadgeNo}
                </span>
              </div>

              <div className="flex">
                <span className="w-40">Date of Join</span>
                <span className="w-4 text-center">:</span>
                <span className="flex-1 text-[#666666]">
                  {selectedPerson.dateOfJoin}
                </span>
              </div>

              <div className="flex">
                <span className="w-40">Position</span>
                <span className="w-4 text-center">:</span>
                <span className="flex-1 text-[#666666]">
                  {selectedPerson.position === "OTHER"
                    ? selectedPerson.otherPosition
                    : selectedPerson.position}
                </span>
              </div>

              <div className="flex">
                <span className="w-40">Department</span>
                <span className="w-4 text-center">:</span>
                <span className="flex-1 text-[#666666]">
                  {selectedPerson.department === "OTHER"
                    ? selectedPerson.otherDepartment
                    : selectedPerson.department}
                </span>
              </div>
            </div>

            {extenFlag.length > 0 && (
              <div className="mt-6 center">
                <div className="mt-6 border border-lite_grey h-auto w-[400px] p-4 rounded">
                  <div className="text-center mb-4">
                    <span className="text-base font-semibold">
                      Probation Extension History
                    </span>
                  </div>

                  <div className="center">
                    <table className="border border-[#D3D3D3] rounded-md shadow-sm">
                      <thead>
                        <tr className="bg-[#E5E5E5] text-xs">
                          <th className="text-center px-6 py-2 border-r border-[#D3D3D3]">
                            No of time
                          </th>
                          <th className="text-center px-6 py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...extenFlag]
                          .sort(
                            (a, b) =>
                              new Date(b.prevProbExDate) -
                              new Date(a.prevProbExDate)
                          )
                          .map((record, index) => (
                            <tr
                              key={index}
                              className="text-xs border-t border-[#F0F0F0] text-center"
                            >
                              <td className="px-6 py-2 border-r border-[#F0F0F0]">
                                {index + 1}
                              </td>
                              <td className="px-6 py-2">
                                {formatDate(record.prevProbExDate)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center py-6 px-4">
              <button
                className="bg-primary text-sm font-bold py-2 px-6 text-dark_grey rounded-md"
                onClick={handleDownload}
              >
                Go to <strong>Probation</strong> Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
