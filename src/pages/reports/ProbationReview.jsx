import { useEffect, useState, useContext } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
import { DataSupply } from "../../utils/DataStoredContext";
import logo from "../../assets/logo/logo-with-name.svg";

export const ProbationReview = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const { gmPosition, HRMPosition } = useTempID();
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const userID = localStorage.getItem("userID");
  const userType = localStorage.getItem("userType");
  const [skilled, setSkilled] = useState(null);
  const { empPIData, workInfoData, ProbFData } = useContext(DataSupply);
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
        if (
          !item.probStatus &&
          Array.isArray(item.workStatus) &&
          item.workStatus.length > 0
        ) {
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
          return (
            probationEnd >= firstDayOfNextMonth &&
            probationEnd <= lastDayOfNextMonth
          );
        }
        return false;
      })
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];

        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        if (userType === "Manager" && HRMPosition !== "HR MANAGER") {
          return null;
        } else if (userType === "HR" || HRMPosition === "HR MANAGER") {
        } else if (gmPosition === "GENERAL MANAGER") {
          return null;
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
          position: Array.isArray(item.position)
            ? item.position[item.position.length - 1]
            : "-",
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
          ...(HRMPosition === "HR MANAGER" || userType === "HR"
            ? { status: item.hrName ? "Approved" : "Pending" }
            : {}),
          ...(userType === "Supervisor" && {
            status: item.supervisorApproved ? "Approved" : "Pending",
          }),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.lastDate - b.lastDate)
      .sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
      });
    return sortedData.map(({ lastDate, ...rest }) => rest);
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

    const start = type === "startDate" ? value : startDate;
    const end = type === "endDate" ? value : endDate;

    if (!start && !end) {
      setFilteredData([]);
      return;
    }

    const filtered = tableBody.filter((item) => {
      // Convert probationEndDate (DD-MM-YYYY) back to Date object for comparison
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1  center">
                <img className="max-w-[200px] " src={logo} alt="Logo" />
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
