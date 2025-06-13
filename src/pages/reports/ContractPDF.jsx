import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";

export const ContractPDF = ({ userID, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gmPosition, HRMPosition } = useTempID();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [storedData, setStoreData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableHead] = useState(
    [
      "Emp ID",
      "Badge No",
      "Name",
      "Nationality",
      "Date of Join",
      "Department",
      "other Department",
      "Position",
      "Other Position",
      "Contract Start Date",
      "Contract End Date",
      "LD Expiry",
      userType !== "SuperAdmin" && "Status",
      // "Duration of Renewal Contract",
      "Form",
    ].filter(Boolean)
  );

  // console.log("UserType", userType);

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

  const calculateTotalMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "-";
    }

    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };

  const calculateBalanceMonths = (startDate, endDate) => {
    const today = new Date();
    const totalMonths = calculateTotalMonths(startDate, endDate);
    const completedMonths = calculateTotalMonths(startDate, today);

    if (
      typeof totalMonths === "string" ||
      typeof completedMonths === "string"
    ) {
      return "-";
    }

    const balanceMonths = totalMonths - completedMonths;
    return balanceMonths >= 0 && balanceMonths !== 0
      ? `${balanceMonths} months`
      : "Few days more";
  };

  const contractExpiryMergedData = (data) => {
    //     const AWE87901 = data.find((item) => item.empID === "AWE87901");
    // console.log("Full record for employee AWE87901:", AWE87901);
    const filteredData = data
      .filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1];

          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION"
          ) {
            return false;
          }
        }
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const isContractActive = lastDate && item.contStatus === true;

        return isContractActive;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        const lastSupervisor =
          item.supervisor && item.supervisor.length > 0
            ? item.supervisor[item.supervisor.length - 1]
            : null;
        const lastManager =
          item.manager && item.manager.length > 0
            ? item.manager[item.manager.length - 1]
            : null;

        const isDepartmentHead = item.depHead;
        const isHr = item.hrManager;

        // console.log("Manager", isDepartmentHead);
        // console.log("HR", isHr);

        // if (userType === "Supervisor") {
        //   return null;
        // }

        // if (HRMPosition === "HR MANAGER" && !isDepartmentHead) {
        //   return null;
        // }

        // if (userType === "Manager" && gmPosition !== "GENERAL MANAGER") {
        //   if (lastManager !== userID) return null;
        // }

        // if (userType === "HR" && HRMPosition !== "HR MANAGER") {
        //   return null;
        // }

        // if (userType === "Manager" && HRMPosition !== "HR MANAGER") {
        //   return null;
        // }

        // if (gmPosition === "GENERAL MANAGER" && !isHr) {
        //   return null;
        // }

        // Allow HR user with HR MANAGER role
        if (userType === "HR" && HRMPosition === "HR MANAGER") {
          // allow
        }
        // Allow Manager with any HRMPosition defined
        else if (userType === "Manager" && HRMPosition === "HR MANAGER") {
          // allow
        }
        // Deny if Supervisor
        else if (userType === "Supervisor") {
          return null;
        }
        // Deny if HR MANAGER but not department head
        else if (HRMPosition === "HR MANAGER" && !isDepartmentHead) {
          return null;
        }
        // Deny if Manager not GM and not last manager
        else if (userType === "Manager" && gmPosition !== "GENERAL MANAGER") {
          if (lastManager !== userID) return null;
        }
        // Deny if GM but not HR
        else if (gmPosition === "GENERAL MANAGER" && !isHr) {
          return null;
        }

        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
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
          contractStartDate: formatDate(startDate) || "-",
          contractEndDate: formatDate(lastDate) || "-",
          nlmsEmpApproval: Array.isArray(item.nlmsEmpValid)
            ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
            : "-",
          ...(userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER" && {
              status: item.depHead ? "Approved" : "Pending",
            }),
          ...(HRMPosition === "HR MANAGER" && {
            status: item.hrManager ? "Approved" : "Pending",
          }),
          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.genManager ? "Approved" : "Pending",
          }),
        };
      })
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
      })
    // console.log(filteredData, "azsdxcfgvbhnj");
    setStoreData(filteredData);
    return filteredData;
  };
  // console.log("GM", gmPosition);

  useEffect(() => {

    const data = contractExpiryMergedData(
      allData,
      userType,
      gmPosition,
      userID,
      HRMPosition
    );
    setTableBody(data);
  }, [allData, userType, gmPosition, userID, HRMPosition]);

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

    const filtered = tableBody
      .filter((data) => {
        if (!Array.isArray(data.workStatus) || data.workStatus.length === 0) {
          return false;
        }

        const lastWorkStatus = data.workStatus[data.workStatus.length - 1];

        if (
          lastWorkStatus?.toUpperCase() === "TERMINATION" ||
          lastWorkStatus?.toUpperCase() === "RESIGNATION"
        ) {
          return false;
        }
        const expiryArray = data?.contractEnd || [];
        const expiryDate = expiryArray.length
          ? new Date(expiryArray[expiryArray.length - 1])
          : null;

        if (!expiryDate || isNaN(expiryDate.getTime())) return false;

        if (start && end) return expiryDate >= start && expiryDate <= end;
        if (start) return expiryDate >= start;
        if (end) return expiryDate <= end;

        return true;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
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
          contractStartDate: formatDate(startDate) || "-",
          contractEndDate: formatDate(lastDate) || "-",
          nlmsEmpApproval: Array.isArray(item.nlmsEmpValid)
            ? formatDate(item.nlmsEmpValid[item.nlmsEmpValid.length - 1])
            : "-",
          ...(userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER" && {
              status: item.depHead ? "Approved" : "Pending",
            }),
          ...(HRMPosition === "HR MANAGER" && {
            status: item.hrManager ? "Approved" : "Pending",
          }),
          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.genManager ? "Approved" : "Pending",
          }),
        };
      });

    setFilteredData(filtered);
  };
  // console.log("GM", gmPosition);

  const handleViewDetails = (personData) => {
    setSelectedPerson(personData);
    // console.log(personData);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleNavigate = () => {
    closeModal();
    if (selectedPerson) {
      // console.log("Current", selectedPerson);

      navigate("/contractForms", { state: { employeeData: selectedPerson } });
    }
  };

  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        startDate={startDate}
        endDate={endDate}
        tableHead={tableHead}
        title={title}
        allData={allData}
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
              <strong>Nationality:</strong> {selectedPerson.nationality}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Date of Join:</strong> {selectedPerson.dateOfJoin}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Position:</strong> {selectedPerson.position}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Department:</strong> {selectedPerson.department}
            </p>

            <div className="flex justify-evenly items-center p-3">
              <button className="primary_btn" onClick={handleNavigate}>
                Go to Contract Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
