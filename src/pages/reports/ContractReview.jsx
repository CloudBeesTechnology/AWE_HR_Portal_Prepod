import React, { useEffect, useState } from 'react'
import { FilterTable } from './FilterTable'

export const ContractReview  = ({allData,typeOfReport,reportTitle}) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
     "Name",
    "Employee Badge",
    "Nationality",
    "Date of Joined",
    "Department",
    "workPosition",
    "Contract Start Date ",
    "Contract End Date",
    "LD Expiry",
    "Duration of Renewal Contract",,]);

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

  // Helper function to calculate remaining balance months
  const calculateBalanceMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date(); // Current date

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "-"; // Return "-" if any date is invalid
    }

    const totalMonths = calculateTotalMonths(startDate, endDate);

    const completedMonths = calculateTotalMonths(startDate, today);

    const balanceMonths = totalMonths - completedMonths;

    return balanceMonths >= 0 ? `${balanceMonths} months` : "-"; // Return "-" if balance is negative
  };

  const contractExpiryMergedData = (data) => {
    return data.map((item) => {
      const balanceMonths = calculateBalanceMonths(item.contractStart, item.contractEnd);
      return [
        item.name || "-",
        item.empBadgeNo || "-",
        item.nationality || "-",
        item.doj || "-",
        item.department || "-",
        item.position || "-",
        item.contractStart || "-",
        item.contractEnd || "-",
        item.nlmsEmpValid || "-",
        balanceMonths || "-",  // Store the calculated balance months
      ];
    });
  };

  useEffect(()=>{
    
      setTableBody(contractExpiryMergedData(allData))
    },[allData])
console.log(tableBody);

  return (
    <div>

      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
    </div>
  )
}
