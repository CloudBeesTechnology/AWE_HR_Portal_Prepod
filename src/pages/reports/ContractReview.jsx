import { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
export const ContractReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allData, title } = location.state || {};

  const [tableBody, setTableBody] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { gmPosition, HRMPosition } = useTempID();
  const userID = localStorage.getItem("userID");
  const userType = localStorage.getItem("userType");

  const tableHead = [
    "Emp ID",
    "Badge No",
    "Name",
    "Nationality",
    "Date of Join",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "Contract Start Date",
    "Contract End Date",
    "LD Expiry",
    userType !== "SuperAdmin" && "Status",
    // "Duration of Renewal Contract",
    "Form",
  ].filter(Boolean);

  const formatDate = (date, type) => {
    if (Array.isArray(date)) {
      if (date.length === 0) return "-";
      const lastDate = date[date.length - 1];
      return formatDate(lastDate, type);
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
    return balanceMonths > 0 ? `${balanceMonths} months` : "Few days more";
  };

  const contractExpiryMergedData = (data) => {
    const today = new Date();
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const endOfTwoMonthsAfter = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      1
    );
    endOfTwoMonthsAfter.setMilliseconds(-1);

    const sortedData = data
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
        if (!Array.isArray(contractEndDates) || contractEndDates.length === 0) {
          return false;
        }

        const lastDate = contractEndDates[contractEndDates.length - 1];
        if (!lastDate || item.contStatus) return false;

        const contractEnd = new Date(lastDate);
        return (
          contractEnd >= startOfNextMonth && contractEnd <= endOfTwoMonthsAfter
        );
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

        const isDepartmentHead = item.depHead !== null;
        const isHr = item.hrManager !== null;

        // console.log("last", lastManager);

        // if (userType === "Supervisor") {
        //   return null;
        // }

        // if (gmPosition === "GENERAL MANAGER") {
        //   return null;
        // }

        // if (userType === "Manager") {
        //   if (lastManager !== userID) return null;
        // }

        // if (userType === "Manager") {
        //   return null;
        // }

        // if (userType === "HR") {
        //   return null;
        // }

        // Allow if HR and HRMPosition is HR MANAGER
        // if (userType === "HR" && HRMPosition === "HR MANAGER") {
        //   // allow
        // }
        // Allow if Manager and HRMPosition exists
        if (HRMPosition === "HR MANAGER") {
          // allow
        }
        // Deny if GM (unless other logic elsewhere handles exceptions)
        else if (gmPosition === "GENERAL MANAGER") {
          return null;
        }
        // Deny if Manager is not the lastManager
        else if (userType === "Manager" && lastManager !== userID) {
          return null;
        }
        // Deny all other HR
        else if (userType === "HR" && HRMPosition !== "HR MANAGER") {
          return null;
        }

        // Deny if Supervisor
        else if (userType === "Supervisor") {
          return null;
        }

        return {
          lastDate: new Date(lastDate) || null,
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
          ...(HRMPosition === "HR MANAGER" && {
            status: item.hrManager ? "Approved" : "Pending",
          }),

          ...(userType === "Manager" && {
            status: item.depHead ? "Approved" : "Pending",
          }),

          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.genManager ? "Approved" : "Pending",
          }),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.lastDate - b.lastDate);

    return sortedData.map(({ lastDate, ...rest }) => rest);
  };

  useEffect(() => {
    if (allData) {
      const mergedData = contractExpiryMergedData(
        allData,
        userType,
        gmPosition,
        userID,
        HRMPosition
      );

      setTableBody(mergedData);
    }
  }, [allData, userType, gmPosition, userID, HRMPosition]);

  // console.log("All Data", allData);
  // console.log("Table body", tableBody);

  const handleViewDetails = (personData) => {
    setSelectedPerson(personData);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleNavigate = () => {
    closeModal();
    if (selectedPerson) {
      navigate("/contractForms", { state: { employeeData: selectedPerson } });
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
      .filter((item) => {
        if (!Array.isArray(item.workStatus) || item.workStatus.length === 0) {
          return false;
        }

        const lastWorkStatus = item.workStatus[item.workStatus.length - 1];

        if (
          lastWorkStatus?.toUpperCase() === "TERMINATION" ||
          lastWorkStatus?.toUpperCase() === "RESIGNATION"
        ) {
          return false;
        }

        if (!item.contStatus) {
          const expiryArray = item.contractEnd || [];
          const expiryDate = expiryArray.length
            ? new Date(expiryArray[expiryArray.length - 1])
            : null;

          if (!expiryDate || isNaN(expiryDate.getTime())) return false;

          if (start && end) return expiryDate >= start && expiryDate <= end;
          if (start) return expiryDate >= start;
          if (end) return expiryDate <= end;

          return true;
        }
        return false;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        return {
          lastDate: new Date(lastDate),
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
          ...(HRMPosition === "HR MANAGER" && {
            status: item.hrManager ? "Approved" : "Pending",
          }),

          ...(userType === "Manager" && {
            status: item.depHead ? "Approved" : "Pending",
          }),

          ...(gmPosition === "GENERAL MANAGER" && {
            status: item.genManager ? "Approved" : "Pending",
          }),
        };
      })
      .sort((a, b) => a.lastDate - b.lastDate)
      .sort((a, b) => a.lastDate - b.lastDate)
      .map(({ lastDate, ...rest }) => rest);

console.log(filtered,"filtered Data");


    setFilteredData(filtered);
  };


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
