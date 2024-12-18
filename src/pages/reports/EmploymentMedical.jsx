import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const EmploymentMedical = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "Medical Expiry",
  ]);

  const employeeMedicalMergedData = (data) => {


    const filteredData = data?.filter(item => item.bruneiME) || []; // Keep only items with a valid bruneiME

    return filteredData.map((item) => {
      const expiryDate = new Date(item.bruneiME);
      // Check if the expiry date is within the last three months
      if (expiryDate ) {
        return {
          name: item.name || "-",
          empBadgeNo: item.empBadgeNo || "-",
          nationality: item.nationality || "-",
          position: item.position || "-",
          department: item.department || "-",
          bruneiME: item.bruneiME || "-",
        };
      }
      return null; // Exclude items outside the last three months
    }).filter(item => item !== null); // Remove null values
  };

  useEffect(() => {
    setTableBody(employeeMedicalMergedData(allData));
  }, [allData]);

  console.log(tableBody);

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        typeOfReport={typeOfReport}
        reportTitle={reportTitle}
      />
    </div>
  );
};