import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { VscClose } from "react-icons/vsc";
import logo from "../../assets/logo/logo-with-name.svg";
import { useLocation } from "react-router-dom";

export const RM = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Employee Badge",
    "Employee Name",
    "Gender",
    "Date of Birth",
    "Date of Joined",
    "Nationality",
    "Position",
    "Contact No",
    "Type of Application: Local/LPA/SAWP",
    "CV Received Form",
    "Brunei I/C No",
    "Brunei I/C Expiry",
    "Malaysian IC No",
    "Passport No",
    "Passport Expiry",
    "Employee Pass Expiry",
    "Department",
    "Contract Start Date",
    "Contract End Date",
    "Previous Company Name",
    "View All Details",
  ]);

  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const generateFullDetails = (data) => {
    // Sort the data by dateOfJoin (doj) in ascending order
    const sortedData = data
      .filter((item) => item.doj) // Filter out items without doj
      .sort((a, b) => {
        const dateA = new Date(a.doj);
        const dateB = new Date(b.doj);
        return dateA - dateB; // Sort by date in ascending order
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        gender: item.gender || "-",
        dateOfBirth: formatDate(item.dob) || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: Array.isArray(item.position) ? item.position[item.position.length - 1] : "-",
        contactNo: item.contactNo || "-",
        contractType: item.contractType || "-",
        cvReceived: item.cvReceived || "-",
        BruneiIcNo: item.bwnIcNo || "-",
        BruneiIcExpiry: Array.isArray(item.bwnIcExpiry)
          ? formatDate(item.bwnIcExpiry[item.bwnIcExpiry.length - 1])
          : "-",
        MalaysianIcNo: item.myIcNo || "-",
        PassportNo: item.ppNo || "-",
        PassportExpiry: Array.isArray(item.ppExpiry)
          ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
          : "-",
        employeePassExpiry: Array.isArray(item.empPassExp)
          ? formatDate(item.empPassExp[item.empPassExp.length - 1])
          : "-",
        department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
        contractStart: Array.isArray(item.contractStart)
          ? formatDate(item.contractStart[item.contractStart.length - 1])
          : "-",
        contractEnd: Array.isArray(item.contractEnd)
          ? formatDate(item.contractEnd[item.contractEnd.length - 1])
          : "-",
        PreviousEmployment: item.preEmp || "-",
      }));
  
    return sortedData;
  };
  

  // Ensure that useEffect is always called and will only update when `allData` changes
  useEffect(() => {
    if (allData) {
      setTableBody(generateFullDetails(allData));
    }
  }, [allData]); // Dependency on allData

  const handleViewDetails = (person) => {
    const fullDetails = allData.find((item) => item.empID === person.empID);
    setSelectedPerson(fullDetails ? generateFullDetails([fullDetails]) : null);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
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
  
    // Sort and filter the data
    const sortedData = allData
      .filter((data) => data.doj) // Filter out items without doj
      .sort((a, b) => {
        const dateA = new Date(a.doj);
        const dateB = new Date(b.doj);
        return dateA - dateB; // Sort by date in ascending order
      })
      .filter((data) => {
        const doj = new Date(data.doj);
        if (!doj || isNaN(doj.getTime())) return false;
  
        if (start && end) return doj >= start && doj <= end;
        if (start) return doj >= start;
        if (end) return doj <= end;
  
        return true;
      })
      .map((item) => ({
        empId: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        gender: item.gender || "-",
        dateOfBirth: formatDate(item.dob) || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: Array.isArray(item.position) ? item.position[item.position.length - 1] : "-",
        contactNo: item.contactNo || "-",
        contractType: item.contractType || "-",
        cvReceived: item.cvReceived || "-",
        BruneiIcNo: item.bwnIcNo || "-",
        BruneiIcExpiry: Array.isArray(item.bwnIcExpiry) ? formatDate(item.bwnIcExpiry[item.bwnIcExpiry.length - 1]) : "-",
        MalaysianIcNo: item.myIcNo || "-",
        PassportNo: item.ppNo || "-",
        PassportExpiry: Array.isArray(item.ppExpiry) ? formatDate(item.ppExpiry[item.ppExpiry.length - 1]) : "-",
        employeePassExpiry: Array.isArray(item.empPassExp) ? formatDate(item.empPassExp[item.empPassExp.length - 1]) : "-",
        department: Array.isArray(item.department) ? item.department[item.department.length - 1] : "-",
        contractStart: Array.isArray(item.contractStart) ? formatDate(item.contractStart[item.contractStart.length - 1]) : "-",
        contractEnd: Array.isArray(item.contractEnd) ? formatDate(item.contractEnd[item.contractEnd.length - 1]) : "-",
        PreviousEmployment: item.preEmp || "-",
      }));
  
    setFilteredData(sortedData);
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto scrollBar">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1 center">
                <img className="max-w-[200px]" src={logo} alt="Logo" />
              </div>
              <button className="text-[24px] rounded" onClick={closeModal}>
                <VscClose />
              </button>
            </section>
            <h2 className="text-xl font-semibold underline text-center mb-5">
              Recruitment & Mobilization
            </h2>
            {selectedPerson[0] && (
              <div className="flex flex-col  px-10">
                <div>
                  {Object.entries(selectedPerson[0]).map(([key, value]) => (
                    <div key={key} className="flex ">
                      <p className="py-2 text-[14px] font-bold flex-1">
                        {formatLabel(key)}
                      </p>
                      <p className="py-2 px-10">:</p>
                      <p className="py-2 flex-1 text-[14px] break-words overflow-hidden w-full">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
