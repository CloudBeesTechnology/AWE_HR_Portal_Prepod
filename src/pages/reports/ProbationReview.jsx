import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ProbationForm } from "./ProbationForm";
import { VscClose } from "react-icons/vsc";

export const ProbationReview = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Badge no",
    "Name",
    "Date of Join",
    "Department",
    "Position",
    "Probation Expiry Date",
    "Deadline to Return to HRD",
    "Probation Form",
  ]);

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
    const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    lastDayOfNextMonth.setMilliseconds(-1); // Set to the end of the next month
  
    const sortedData = data
      ?.filter((item) => {
        // Filter items where probStatus is falsy
        if (!item.probStatus) {
          const probationEndDates = item.probationEnd || [];
          const lastDate = probationEndDates[probationEndDates.length - 1];
  
          if (!lastDate) return false; // Skip items without a probation end date
  
          const probationEnd = new Date(lastDate);
          return probationEnd >= firstDayOfNextMonth && probationEnd <= lastDayOfNextMonth;
        }
        return false; // Exclude items with probStatus true
      })
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];
  
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];
  
        return {
          lastDate: new Date(lastDate), // Keep for sorting only
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          dateOfJoin: formatDate(item.doj) || "-",
          department: item.department || "-",
          position: item.position || "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
        };
      })
      .sort((a, b) => a.lastDate - b.lastDate); // Sort using lastDate
  
    // Remove lastDate after sorting
    return sortedData.map(({ lastDate, ...rest }) => rest);
  };
  
    

  useEffect(() => {
    const mergedData = probationReviewMergedData(allData);
    setTableBody(mergedData);
  }, [allData]);

  const handleViewDetails = (personData) => {
    // console.log("Person State:", personData);
    setSelectedPerson(personData); // Set selected person's data
  };

  const closeModal = () => {
    setSelectedPerson(null); // Close modal
  };

  const handleDownload = () => {
    closeModal(); // Close modal
    if (selectedPerson) {
      navigate("/probForm", { state: { employeeData: selectedPerson } });
    }
  };

  const handleDate = (e, type) => {
    const value = e.target.value;
  
    // Update the appropriate date state
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    // Parse start and end dates
    const start =
      type === "startDate"
        ? new Date(value)
        : startDate
        ? new Date(startDate)
        : null;
    const end =
      type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    // Filter and sort the data
    const filtered = allData
      ?.filter((item) => {
        // Exclude items with probStatus true
        if (item.probStatus) return false;
  
        const probationEndDates = item.probationEnd || [];
        const lastDate =
          probationEndDates.length > 0
            ? new Date(probationEndDates[probationEndDates.length - 1])
            : null;
  
        // If lastDate is invalid, exclude the item
        if (!lastDate || isNaN(lastDate.getTime())) return false;
  
        // Apply date range filters
        if (start && end) return lastDate >= start && lastDate <= end;
        if (start) return lastDate >= start;
        if (end) return lastDate <= end;
  
        // If no filters, include the item
        return true;
      })
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate =
          probationEndDates.length > 0
            ? probationEndDates[probationEndDates.length - 1]
            : null;
  
        return {
          lastDate: new Date(lastDate), // Keep for sorting
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          dateOfJoin: formatDate(item.doj) || "-",
          department: item.department?.[item.department?.length - 1] || "-",
          position: item.position?.[item.position?.length - 1] || "-",
          probationEnd: formatDate(lastDate) || "-",
          deadline: lastDate ? formatDate(calculateDeadline(lastDate)) : "-",
        };
      })
      .sort((a, b) => a.lastDate - b.lastDate) // Sort by lastDate
      .map(({ lastDate, ...rest }) => rest); // Remove lastDate after sorting
  
    // Update filtered data state
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
        handleViewDetails={handleViewDetails} // Pass the function to FilterTable
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
            {/* <p className="flex justify-between mb-2">
              <strong>Contract End Date:</strong> {selectedPerson.probationEnd || '-' }
            </p> */}

            <div className="flex justify-evenly items-center p-3">
              <button
                className="primary_btn"
                onClick={handleDownload} // Handle the download action by navigating to the form
              >
                Go to Probation Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
