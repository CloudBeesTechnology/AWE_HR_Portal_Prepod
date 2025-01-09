import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';
import { useLocation } from 'react-router-dom';

export const EmpPE = () => {
  const location = useLocation();
  const { allData,title } = location.state || {}; 
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Employee Badge",
    "Name",
    "Nationality",
    "Date of Join",
    "Work Position",
    "Department",
    "Pass Expiry",
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

  // Check if the date is strictly in the next month
  const isInNextMonth = (expiryDate) => {
    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);
    const today = new Date();

    // Calculate the start and end of the next month
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); // First day of next month
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);  // Last day of next month

    // Check if expiry date falls in the next month
    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  // Filter and map the employee pass data
  const empPassMergedData = (data) => {
    return data
      .filter((item) => {
        // Ensure empPassExp is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.empPassExp) &&
          item.empPassExp.length > 0 &&
          item.empPassExp.every((date) => date && !isNaN(new Date(date).getTime()))
        );
      })
      .filter((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return isInNextMonth(lastPassExp);
      })
      .map((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
          doj: formatDate(item.doj) || "-",
          position: item.position || "-",
          department: item.department || "-",
          empPassExp: formatDate(lastPassExp) || "-",
        };
      });
  };

  useEffect(() => {
      setTableBody(empPassMergedData(allData));
  }, [allData]);

  const handleDate = (e, type) => {
    const value = e.target.value;

    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);

    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

    const filtered = allData.filter((data) => {
      const expiryArray = data.empPassExp || [];
      const expiryDate = expiryArray.length
        ? new Date(expiryArray[expiryArray.length - 1])
        : null;

      if (!expiryDate || isNaN(expiryDate.getTime())) return false;

      if (start && end) return expiryDate >= start && expiryDate <= end;
      if (start) return expiryDate >= start;
      if (end) return expiryDate <= end;

      return true;
    }).map((item) => {
      const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
      return {
      empID: item.empID || "-",
      empBadgeNo: item.empBadgeNo || "-",
      name: item.name || "-",
      nationality: item.nationality || "-",
      doj: formatDate(item.doj) || "-",
      position: item.position || "-",
      department: item.department || "-",
      empPassExp: formatDate(lastPassExp) || "-",
  }});

    setFilteredData(filtered);
  };

  return (
    <div>
      <FilterTable
             tableBody={filteredData.length ? filteredData : tableBody}
             tableHead={tableHead}
             title={title}
             handleDate={handleDate}
      />
    </div>
  );
};
