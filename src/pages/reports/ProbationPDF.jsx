import React, { useEffect, useState, useRef } from "react"; 
import { FilterTable } from "./FilterTable";
import logo from "../../assets/logo/logo-with-name.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { ProbationForm } from "./ProbationForm"; // Import the ProbationForm

export const ProbationPDF = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
    "Name",
    "Employee ID",
    "Employee Badge",
    "Date of Joined",
    "Department",
    "Position",
    "Probation Expiry Date",
    "Deadline to return HRD",
    "Download"
  ]);

  const [selectedPerson, setSelectedPerson] = useState(null); // State for the selected person
  const navigate = useNavigate(); // Hook for navigation

  const probationReviewMergedData = (data) => {
    return data
      .filter((item) => item.probationEnd) // Only include items with resignDate
      .map((item) => [
    // return data.map((item) => [
      item.name || "-",
      item.empID || "-",
      item.empBadgeNo || "-",
      item.doj || "-",
      item.department || "-",
      item.position || "-",
      item.probationEnd || "-",
      item.deadlineToReturnHRD || "-",
    ]);
  };

  useEffect(() => {
    setTableBody(probationReviewMergedData(allData)); // Update the table body when allData changes
  }, [allData]);

  // Function to handle viewing details
  const handleViewDetails = (personData) => {
    setSelectedPerson(personData); // Set selected person's data
  };

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

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        typeOfReport={typeOfReport}
        reportTitle={reportTitle}
        allData={allData}
        handleViewDetails={handleViewDetails} // Pass the function to FilterTable
      />

      {/* Modal for showing person's details */}
      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <section className="flex justify-start gap-10 items-center mb-5">
              <div className="max-w-[150px] w-full">
                <img className="w-full" src={logo} alt="Logo" />
              </div>
              <div>
              <button
                className="mt-4 bg-blue text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              </div>
            </section>
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
              <strong>Probation End Date:</strong> {selectedPerson.probationEnd}
            </p>
            <p className="flex justify-between mb-2">
              <strong>Contract End Date:</strong> {selectedPerson.contractEnd || '-' }
            </p>

            <div className="center p-3">
              {/* Download Button */}
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
