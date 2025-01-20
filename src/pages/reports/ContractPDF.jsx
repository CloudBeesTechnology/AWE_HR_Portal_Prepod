import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";

export const ContractPDF = ({ userID, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [storedData, setStoreData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableHead] = useState([
    "Emp ID",
    "Employee Badge",
    "Name",
    "Nationality",
    "Date of Joined",
    "Department",
    "Work Position",
    "Contract Start Date",
    "Contract End Date",
    "Duration of Renewal Contract",
    "Form",
  ]);

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
    const today = new Date();
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const endOfTwoMonthsAfter = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      0
    );

    // console.log("Today:", today);
    // console.log("Start of Next Month:", startOfNextMonth);
    // console.log("End of Two Months After:", endOfTwoMonthsAfter);

    const filteredData = data
      .filter((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const isContractActive = lastDate && item.contStatus === true;

        // console.log("Contract End Date:", lastDate);
        // console.log("Is Contract Active:", isContractActive);

        // Only include entries with contractEnd and contStatus is true
        return isContractActive;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        const balanceMonths = calculateBalanceMonths(startDate, lastDate);
        // console.log("Balance Months:", balanceMonths);

        // User-specific filtering
        const lastSupervisor =
          item.supervisor && item.supervisor.length > 0
            ? item.supervisor[item.supervisor.length - 1]
            : null;
        const lastManager =
          item.manager && item.manager.length > 0
            ? item.manager[item.manager.length - 1]
            : null;

        const isDepartmentHead = item.depHead !== null;
        const isGm = item.genManager !== null;

        // Filtering logic based on user role
        if (userType === "Supervisor" && lastSupervisor !== userID) {
          // console.log("Skipping item, Supervisor does not match.");
          return null; // Skip item if supervisor doesn't match
        }

        if (userType === "Manager" && lastManager !== userID) {
          // console.log(
          //   "Skipping item, Manager does not match or Supervisor not approved."
          // );
          return null; // Skip item if manager doesn't match or supervisor not approved
        }

        if (userType === "GM" && isDepartmentHead) {
          // console.log("Skipping item, Manager has not approved.");
          return null; // Skip item if manager has not approved
        }

        if (userType === "HR" && isGm) {
          // console.log("Skipping item, GM has not approved.");
          return null; // Skip item if GM has not approved
        }

        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
          doj: formatDate(item.doj) || "-",
          department: item.department || "-",
          position: item.position || "-",
          contractStartDate: formatDate(startDate) || "-",
          contractEndDate: formatDate(lastDate) || "-",
          balanceMonths: balanceMonths,
        };
      })
      .filter((item) => item !== null);

    // console.log("Filtered Data:", filteredData);
    setStoreData(filteredData);
    return filteredData;
  };

  // console.log("stored data", storedData);

  useEffect(() => {
   
    const data = contractExpiryMergedData(allData);
    // console.log("Processed Data to set:", data);

    setTableBody(data);
  }, [allData]);

 const handleDate = (e, type) => {
    const value = e.target.value;
  
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = tableBody.filter((data) => {
      const expiryArray = data?.contractEnd || [];
      const expiryDate = expiryArray.length
        ? new Date(expiryArray[expiryArray.length - 1])
        : null;
  
      if (!expiryDate || isNaN(expiryDate.getTime())) return false;
  
      if (start && end) return expiryDate >= start && expiryDate <= end;
      if (start) return expiryDate >= start;
      if (end) return expiryDate <= end;
  
      return true;
    }).map((item) => {
      const contractEndDates = item.contractEnd || [];
      const lastDate = contractEndDates[contractEndDates.length - 1];
      const contractStartDates = item.contractStart || [];
      const startDate = contractStartDates[contractStartDates.length - 1];

  
      return {
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        nationality: item.nationality || "-",
        doj: formatDate(item.doj) || "-",
        department: item.department || "-",
        position: item.position || "-",
        contractStartDate: formatDate(startDate) || "-",
        contractEndDate: formatDate(lastDate) || "-",      
      };
    });
  
    setFilteredData(filtered);
  };

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
              <button
                className="mt-4 bg-green text-white px-4 py-2 rounded"
                onClick={handleNavigate}
              >
                Go to Contract Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

