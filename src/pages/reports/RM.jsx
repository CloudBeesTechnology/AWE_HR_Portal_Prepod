

import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { VscClose } from "react-icons/vsc";
import logo from "../../assets/logo/logo-with-name.svg";

export const RM = ({ allData}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
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
    if (!Array.isArray(data)) {
      console.error("Expected an array but got", data);
      return [];
    }

    return data.map((item) => ({
      empID: item.empID || "-",
      empBadgeNo: item.empBadgeNo || "-",
      name: item.name || "-",
      gender: item.gender || "-",
      dateOfBirth: formatDate(item.dob) || "-",
      dateOfJoin: formatDate(item.doj) || "-",
      nationality: item.nationality || "-",
      position: item.position || "-",
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
      department: item.department || "-",
      contractStart: Array.isArray(item.contractStart)
        ? formatDate(item.contractStart[item.contractStart.length - 1])
        : "-",
      contractEnd: Array.isArray(item.contractEnd)
        ? formatDate(item.contractEnd[item.contractEnd.length - 1])
        : "-",
        PreviousEmployment: item.preEmp || "-",
    }));
  };

  useEffect(() => {
    setTableBody(generateFullDetails(allData));
  }, [allData]);

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

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        handleViewDetails={handleViewDetails}
      />

      {/* Modal for showing person's details */}
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
              <div className="flex flex-col justify-evenly pl-20 ">
                <table className="table-auto w-full text-left ">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 font-medium">Field Name</th>
                      <th className="px-4 py-2 font-medium">:</th>
                      <th className="px-4 py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedPerson[0]).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-2 font-medium">
                          {formatLabel(key)}
                        </td>
                        <td className="px-4 py-2">:</td>
                        <td className="px-4 py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
