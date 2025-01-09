import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';
import { useLocation } from "react-router-dom";

export const Resignation = () => {
  const location = useLocation();
  const { allData,title } = location.state || {}; 
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of join",
    "Nationality",
    "Department",
    "Position",
    "Date of Resignation",
    "Reason of Resignation",
  ]);

  const formatDate = (date, type) => {
    if (Array.isArray(date)) {
      if (date.length === 0) return "-";
      const lastDate = date[date.length - 1];
      return formatDate(lastDate, type);
    }

    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };


  // Generate table body dynamically from mergedData
  const resignationMergedData = (data) => {
    return data
      ?.filter((item) => item?.resignDate) // Only include items with resignDate
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        doj:item.doj || "-",
        nationality: item.nationality || "-",
        department: item.department || "-",
        position: item.position || "-",
        resignDate: formatDate(item.resignDate) || "-",
        reasonResign: item.reasonResign || "-",
      }));
  };
  
  useEffect(() => {
    const data = resignationMergedData(allData);
    setTableBody(data);
    // setTableBody(resignationMergedData(allData));
  }, [allData]);


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
      // tableBody={tableBody}
       tableHead={tableHead} title={title}
      handleDate={handleDate}
      />
    </div>
  );
};
