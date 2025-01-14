import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ProbationForm } from "./ProbationForm";
import { VscClose } from "react-icons/vsc";

export const ProbationReview = () => {
  const location = useLocation();
  const { allData,title } = location.state || {}; 
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Employee Badge",
    "Name",
    "Date of Join",
    "Department",
    "Work Position",
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
    const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    return data
      .filter((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];
        if (!lastDate) return false;

        const probationEnd = new Date(lastDate);
        return probationEnd >= firstDayOfNextMonth && probationEnd <= lastDayOfNextMonth;
      })
      .map((item) => {
        const probationEndDates = item.probationEnd || [];
        const lastDate = probationEndDates[probationEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];

        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          doj: formatDate(item.doj) || "-",
          department: item.department || "-",
          position: item.position || "-",
          probationEndDate: formatDate(lastDate) || "-",
          deadline: lastDate ? calculateDeadline(lastDate) : "-",
        };
      });
  };

  useEffect(() => {
    if (allData && Array.isArray(allData)) {
      const mergedData = probationReviewMergedData(allData);
      // console.log("Merged Data:", mergedData);
      setTableBody(mergedData);
    } else {
      console.warn("Invalid or missing allData:");
    }
  }, [allData]);
  // Function to handle viewing details
  const handleViewDetails = (personData) => {
    console.log("Person State:", personData);
    setSelectedPerson(personData); // Set selected person's data
  };
  // console.log("Selected Person State:", selectedPerson);
  const closeModal = () => {
    setSelectedPerson(null); // Close modal
  };

  // Function to navigate to the ProbationForm route
  const handleDownload = () => {
    closeModal(); // Close modal
    if (selectedPerson) {
      // Navigate to the form at '/probForm', passing selectedPerson data via route state
      navigate('/probForm', { state: { employeeData: selectedPerson } });
    }
  };

   const handleDate = (e, type) => {
    const value = e.target.value;
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = allData
      .filter((data) => {
        const resignDate = data.resignDate ? new Date(data.resignDate) : null;
  
        if (!resignDate || isNaN(resignDate.getTime())) return false;
  
        if (start && end) return resignDate >= start && resignDate <= end;
        if (start) return resignDate >= start;
        if (end) return resignDate <= end;
  
        return true;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        doj: item.doj || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        position: item.position || "-",
        resignDate: formatDate(item.resignDate) || "-",
        reasonResign: item.reasonResign || "-",
      }));
  
    setFilteredData(filtered);
  };
  

  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        tableHead={tableHead}
        title={title}
        handleDate={handleDate}
        handleViewDetails={handleViewDetails} // Pass the function to FilterTable
      />

      {/* Modal for showing person's details */}
      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1  center">
                <img className="max-w-[200px] " src={logo} alt="Logo" />
              </div>
              <button
                className="text-[24px] rounded"
                onClick={closeModal}
              >
                <VscClose/>
              </button>
            </section>
                <h2 className="text-xl font-semibold underline text-center mb-5">Person Details</h2>
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
              <strong>Date Of Join:</strong> {selectedPerson.doj}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Probation End Date:</strong> {selectedPerson.probationEndDate}
            </p>
            {/* <p className="flex justify-between mb-2">
              <strong>Contract End Date:</strong> {selectedPerson.probationEnd || '-' }
            </p> */}

            <div className="flex justify-evenly items-center p-3">
           

              <button
                className="mt-4 bg-green text-white px-4 py-2 rounded"
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
