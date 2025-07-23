import { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
import logo from "../../assets/logo/logo-with-name.svg";

export const ProbationPDF = ({ userID, userType }) => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const { gmPosition, HRMPosition } = useTempID();
  const [tableBody, setTableBody] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [extenFlag, setExtenFlag] = useState([]);
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
      "Probation End Date",
      "Deadline to Return to HRD",
      userType !== "SuperAdmin" && "Status",
    ].filter(Boolean)
  );

  const [selectedPerson, setSelectedPerson] = useState(null);
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

  const probationReviewMergedData = (data, userType, gmPosition, userID) => {
    // Step 1: Filter data based on role logic
    const filteredData = data.filter((item) => {
      if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
        const lastWorkStatus =
          item.workStatus[item.workStatus.length - 1]?.toUpperCase();
        if (["TERMINATION", "RESIGNATION", "ACTIVE"].includes(lastWorkStatus)) {
          return false;
        }
      }

      const isProbationActive =
        item.probStatus === true && item.probationEnd?.length > 0;

      const lastSupervisor =
        Array.isArray(item.supervisor) && item.supervisor.length > 0
          ? item.supervisor[item.supervisor.length - 1]
          : null;

      const lastManager =
        Array.isArray(item.manager) && item.manager.length > 0
          ? item.manager[item.manager.length - 1]
          : null;

      const skillPool = item.skillPool ? item.skillPool.toUpperCase() : "";

      const isSupervisorApproved =
        item.supervisorApproved?.toUpperCase() === "APPROVED";
      const isManagerApproved =
        item.managerApproved?.toUpperCase() === "APPROVED";
      const isGmApproved = item.gmApproved?.toUpperCase() === "APPROVED";

      if (userType === "Supervisor") {
        return isProbationActive;
      }

      if (
        userType === "Manager" &&
        gmPosition !== "GENERAL MANAGER" &&
        HRMPosition !== "HR MANAGER"
      ) {
        return (
          isProbationActive && lastManager === userID && isSupervisorApproved
        );
      }

      if (gmPosition === "GENERAL MANAGER") {
        if (skillPool === "SKILLED" || skillPool === "UNSKILLED") {
          return false;
        }
        return isProbationActive && isManagerApproved;
      }

      if (userType === "HR" || HRMPosition === "HR MANAGER") {
        if (skillPool === "SKILLED" || skillPool === "UNSKILLED") {
          return isProbationActive;
        }
        return isProbationActive && isGmApproved;
      }

      return isProbationActive;
    });

    // Step 2: Pick latest record per empID (based on last probationEnd)
    const latestRecordsMap = new Map();

    for (const item of filteredData) {
      const currentCreatedAt = new Date(item.probCreatedAt || 0);
      const existing = latestRecordsMap.get(item.empID);

      if (
        !existing ||
        currentCreatedAt > new Date(existing.probCreatedAt || 0)
      ) {
        latestRecordsMap.set(item.empID, item);
      }
    }

    const latestFilteredData = Array.from(latestRecordsMap.values());

    // Step 3: Map and transform data
    const finalData = latestFilteredData
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];

        const today = new Date();
        const positionRevDate =
          item.positionRevDate?.[item.positionRevDate.length - 1];
        const positionRev = item.positionRev?.[item.positionRev.length - 1];
        const upgradePosition =
          item.upgradePosition?.[item.upgradePosition.length - 1];
        const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];
        let finalPosition;

        const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
        const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

        if (revDateObj && upgradeDateObj) {
          if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
            finalPosition = item.position?.[item.position.length - 1];
          } else if (revDateObj > upgradeDateObj) {
            finalPosition =
              today >= revDateObj
                ? positionRev
                : today >= upgradeDateObj
                ? upgradePosition
                : item.position?.[item.position.length - 1];
          } else {
            finalPosition =
              today >= upgradeDateObj
                ? upgradePosition
                : today >= revDateObj
                ? positionRev
                : item.position?.[item.position.length - 1];
          }
        } else if (revDateObj) {
          finalPosition = today >= revDateObj && positionRev;
        } else if (upgradeDateObj) {
          finalPosition = today >= upgradeDateObj && upgradePosition;
        } else {
          finalPosition = item.position?.[item.position.length - 1];
        }

        let status = "";

        if (userType !== "SuperAdmin") {
          if (item.probExtendStatus?.trim().toLowerCase() === "extended") {
            status = "Extended";
          } else if (userType === "Supervisor") {
            status = item.supervisorApproved ? "Approved" : "Pending";
          } else if (HRMPosition === "HR MANAGER" || userType === "HR") {
            status = item.hrName ? "Approved" : "Pending";
          } else if (
            userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER"
          ) {
            status = item.managerApproved ? "Approved" : "Pending";
          } else if (gmPosition === "GENERAL MANAGER") {
            status =
              item.probExtendStatus === "Extended"
                ? "Extended"
                : item.gmApproved || "Pending";
          }
        }

        return {
          probID: item.probID,
          probCreatedAt: item.probCreatedAt,
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
          otherPosition: item.otherPosition?.[item.otherPosition.length - 1],
          probationEndDate: item.prevProbExDate
            ? formatDate(item.prevProbExDate)
            : formatDate(lastDate),
          deadline: item.prevProbExDate
            ? formatDate(calculateDeadline(item.prevProbExDate))
            : formatDate(calculateDeadline(lastDate)),
          probExtendStatus: item.probExtendStatus,
          prevProbExDate: item.prevProbExDate,
          status,
        };
      })
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
      });

    return finalData;
  };

  useEffect(() => {
    setLoading(true);

    const mergedData = probationReviewMergedData(
      allData,
      userType,
      gmPosition,
      userID,
      HRMPosition
    );
    setTableBody(mergedData);
    setLoading(false);
  }, [allData, userType, gmPosition, userID, HRMPosition]);

  const closeModal = () => {
    setSelectedPerson(null);
  };
  const handleViewDetails = (personData) => {
    setSelectedPerson(personData);
  };

  const handleSingleData = () => {
    closeModal();
    if (selectedPerson) {
      navigate("/probForm", { state: { employeeData: selectedPerson } });
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

    if (!start && !end) {
      return;
    }

    const filtered = tableBody.filter((item) => {
      const [day, month, year] = item.probationEndDate.split("-");
      const probationEnd = new Date(`${year}-${month}-${day}`);

      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;

      if (startDateObj && endDateObj) {
        return probationEnd >= startDateObj && probationEnd <= endDateObj;
      } else if (startDateObj) {
        return probationEnd >= startDateObj;
      } else if (endDateObj) {
        return probationEnd <= endDateObj;
      }
      return true;
    });

    setTableBody(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[82vh]">
        <p className="text-sm font-semibold">Loading...</p>
      </div>
    );
  }

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
              Personal Details
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
                          {/* <th className="text-center px-6 py-2">Status</th> */}
                          <th className="text-center px-6 py-2">Action</th>
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
                              {/* <td className="px-6 py-2">{record.probExtendStatus}</td> */}
                              <td
                                onClick={() => {
                                  closeModal();
                                  navigate("/probForm", {
                                    state: { employeeData: record },
                                  });
                                }}
                                className="px-3 py-2 text-blue underline cursor-pointer"
                              >
                                View
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedPerson?.probExtendStatus !== "Extended" && (
              <div className="flex justify-center items-center py-6 px-4">
                <button
                  className="bg-primary text-sm font-bold py-2 px-6 text-dark_grey rounded-md"
                  onClick={handleSingleData}
                >
                  Go to <strong>Probation</strong> Form
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
