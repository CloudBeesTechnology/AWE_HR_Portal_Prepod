import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";

export const ProbationPDF = ({ userID, userType }) => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const { gmPosition, HRMPosition } = useTempID();
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
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
      "Probation Form",
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
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const calculateDeadline = (probationEndDate) => {
    const date = new Date(probationEndDate);
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  };

  const probationReviewMergedData = (data, userType, gmPosition, userID) => {
    const filteredData = data
      .filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus =
            item.workStatus[item.workStatus.length - 1]?.toUpperCase();
          if (
            ["TERMINATION", "RESIGNATION", "ACTIVE"].includes(lastWorkStatus)
          ) {
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

        const isSupervisorApproved =
          item.supervisorApproved?.toUpperCase() === "APPROVED";
        const isManagerApproved =
          item.managerApproved?.toUpperCase() === "APPROVED";
        const isGmApproved = item.gmApproved?.toUpperCase() === "APPROVED";

        // Conditional filters by user role
        if (userType === "Supervisor") {
          const result = isProbationActive;

          return result;
        }

        if (
          userType === "Manager" &&
          gmPosition !== "GENERAL MANAGER" &&
          HRMPosition !== "HR MANAGER"
        ) {
          const result =
            isProbationActive && lastManager === userID && isSupervisorApproved;

          return result;
        }

        if (gmPosition === "GENERAL MANAGER") {
          const result = isProbationActive && isManagerApproved;

          return result;
        }

        if (userType === "HR" || HRMPosition === "HR MANAGER") {
          const result = isProbationActive && isGmApproved;

          return result;
        }

        return isProbationActive;
      })
      .map((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1];
          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION"
          ) {
            return false;
          }
        }

        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];

        const formattedData = {
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
          position: Array.isArray(item.position)
            ? item.position[item.position.length - 1]
            : "-",
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
          ...(userType === "Supervisor" && {
            status: item.supervisorApproved || "Pending",
          }),
          ...(userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER" && {
              status: item.managerApproved || "Pending",
            }),

          ...(HRMPosition === "HR MANAGER" || userType === "HR"
            ? { status: item.hrName ? "Approved" : "Pending" }
            : {}),
          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.gmApproved || "Pending",
          }),
        };

        return formattedData;
      })
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
      });
    return filteredData;
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

  const handleViewDetails = (personData) => {
    setSelectedPerson(personData);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleDownload = () => {
    closeModal();
    if (selectedPerson) {
      navigate("/probForm", { state: { employeeData: selectedPerson } });
    }
  };

  const handleDate = (e, type) => {
    const value = e.target.value;

    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);

    const start =
      type === "startDate"
        ? new Date(value)
        : startDate
        ? new Date(startDate)
        : null;
    const end =
      type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

    const filtered = allData
      .filter(
        (item) =>
          item.probStatus === true &&
          item.probationEnd &&
          item.probationEnd.length > 0 &&
          (() => {
            if (
              !Array.isArray(item.workStatus) ||
              item.workStatus.length === 0
            ) {
              return false;
            }

            const lastWorkStatus = item.workStatus[item.workStatus.length - 1];

            if (
              lastWorkStatus?.toUpperCase() === "TERMINATION" ||
              lastWorkStatus?.toUpperCase() === "RESIGNATION" ||
              lastWorkStatus.toUpperCase() === "ACTIVE"
            ) {
              return false;
            }

            const expiryArray = item.probationEnd || [];
            const expiryDate = expiryArray.length
              ? new Date(expiryArray[expiryArray.length - 1])
              : null;

            if (!expiryDate || isNaN(expiryDate.getTime())) return false;

            if (start && end) return expiryDate >= start && expiryDate <= end;
            if (start) return expiryDate >= start;
            if (end) return expiryDate <= end;

            return true;
          })()
      )
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];

        return {
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
          position: Array.isArray(item.position)
            ? item.position[item.position.length - 1]
            : "-",
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
          ...(userType === "Supervisor" && {
            status: item.supervisorApproved || "Pending",
          }),
          ...(userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER" && {
              status: item.managerApproved || "Pending",
            }),
          ...(HRMPosition === "HR MANAGER" || userType === "HR"
            ? { status: item.hrName ? "Approved" : "Pending" }
            : {}),
          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.gmApproved || "Pending",
          }),
        };
      });

    setFilteredData(filtered);
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
        tableBody={filteredData.length ? filteredData : tableBody}
        tableHead={tableHead}
        title={title}
        startDate={startDate}
        endDate={endDate}
        handleDate={handleDate}
        handleViewDetails={handleViewDetails}
      />

      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
            <p className="flex justify-between mb-2">
              <strong>Name:</strong> {selectedPerson.name}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Emp ID:</strong> {selectedPerson.empID}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Emp Badge No:</strong> {selectedPerson.empBadgeNo}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Position:</strong> {selectedPerson.position}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Department:</strong> {selectedPerson.department}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Date Of Join:</strong> {selectedPerson.dateOfJoin}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Probation End Date:</strong>{" "}
              {selectedPerson.probationEndDate}
            </p>

            <div className="flex justify-evenly items-center p-3">
              <button className="primary_btn" onClick={handleDownload}>
                Go to Probation Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
