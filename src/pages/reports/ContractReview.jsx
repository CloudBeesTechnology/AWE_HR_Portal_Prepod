import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const ContractReview = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
    "Name",
    "Emp ID",
    "Employee Badge",
    "Nationality",
    "Date of Joined",
    "Department",
    "Work Position",
    "Contract Start Date",
    "Contract End Date",
    "LD Expiry",
    "Duration of Renewal Contract",
  ]);

  const formatDate = (date, type) => {
    console.log(date, type);
  
    // Handle array of dates
    if (Array.isArray(date)) {
      if (date.length === 0) return "-"; // Handle empty arrays
      const lastDate = date[date.length - 1]; // Get the last element
      return formatDate(lastDate, type); // Recursively format the last date
    }
  
    // Handle single date
    if (!date) return "-"; // Handle empty or invalid dates
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-"; // Handle invalid date strings
  
    // Format date as dd-mm-yyyy
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = parsedDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  const calculateTotalMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "-"; // Return "-" if any date is invalid
    }

    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };

  const calculateBalanceMonths = (startDate, endDate) => {
    const today = new Date(); // Current date
    const totalMonths = calculateTotalMonths(startDate, endDate);
    const completedMonths = calculateTotalMonths(startDate, today);

    if (typeof totalMonths === "string" || typeof completedMonths === "string") {
      return "-"; // Return "-" if calculation is invalid
    }

    const balanceMonths = totalMonths - completedMonths;
    return (balanceMonths >= 0 && balanceMonths !== 0) ? `${balanceMonths} months` : "Few days more"; // Return "-" if balance is negative
  };

  const contractExpiryMergedData = (data) => {
    const today = new Date(); // Current date for comparison
  
    return data
      .filter((item) => {
        const contractEndDates = item.contractEnd || []; // Ensure it's an array
        const lastDate = contractEndDates[contractEndDates.length - 1]; // Get the last date
        return lastDate && new Date(lastDate) >= today; // Include only valid dates
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1]; // Get the last element safely
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1]; // Get the last element safely
  
        const balanceMonths = calculateBalanceMonths(startDate, lastDate);
  
        return [
          item.name || "-",
          item.empID || "-",
          item.empBadgeNo || "-",
          item.nationality || "-",
          formatDate(item.doj) || "-", // Format Date of Joined
          item.department || "-",
          item.position || "-",
          formatDate(startDate) || "-", // Format Contract Start Date
          formatDate(lastDate) || "-", // Format Contract End Date
          formatDate(item.nlmsEmpValid) || "-",
          balanceMonths, // Store the calculated balance months
        ];
      });
  };
  

  useEffect(() => {
    if (allData) {
      setTableBody(contractExpiryMergedData(allData));
    }
  }, [allData]);

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
