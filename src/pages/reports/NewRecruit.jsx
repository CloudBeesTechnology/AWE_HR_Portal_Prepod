import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '@react-pdf-viewer/core';

export const NewRecruit = () => {
  const location = useLocation();
  const { allData,title } = location.state || {}; 
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Birth",
    "Gender",
    "Date of Join",
    "Nationality",
    "Position",
    "contactNo",
    "Brunei I/C No",
    "Passport No",
    "Pass Expiry",
    "Department",
    "Contract Start Date",
    "Contract End Date",
    "IMMIGRATION REFERENCE NUMBER",
    "EDUCATION LEVEL",
    "Previous Company Name",
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

  const isDateInCurrentMonth = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return false;

    const today = new Date();
    return (
      parsedDate.getFullYear() === today.getFullYear() &&
      parsedDate.getMonth() === today.getMonth()
    );
  };

  const generateTableBodyFromMergedData = (data) => {
    return data
      .filter((item) => isDateInCurrentMonth(item.doj)) // Filter only current month dates
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfBirth: formatDate(item.dob) || "-",
        gender: item.gender || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        passportNo: item.ppNo || "-",
        passporExpiry: Array.isArray(item.ppExpiry)
          ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
          : "-",
        department: item.department || "-",
        contractStart: Array.isArray(item.contractStart)
          ? formatDate(item.contractStart[item.contractStart.length - 1])
          : "-",
        contractEnd: Array.isArray(item.contractEnd)
          ? formatDate(item.contractEnd[item.contractEnd.length - 1])
          : "-",
          immigRefNo: item.immigRefNo || "-",
        educLevel: item.educLevel || "-",
        previousEmployee: item.preEmp || "-",
        rawDateOfJoin: new Date(item.doj), // Raw date for sorting
      }))
      .sort((a, b) => a.rawDateOfJoin - b.rawDateOfJoin)
      .map(({ rawDateOfJoin, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  };
  
  useEffect(() => {
    setTableBody(generateTableBodyFromMergedData(allData));
  }, [allData]);
  
  const handleDate = (e, type) => {
    const value = e.target.value;
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = allData
      .filter((data) => {
        const doj = data.doj ? new Date(data.doj) : null;
  
        if (!doj || isNaN(doj.getTime())) return false;
  
        if (start && end) return doj >= start && doj <= end;
        if (start) return doj >= start;
        if (end) return doj <= end;
  
        return true;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfBirth: formatDate(item.dob) || "-",
        gender: item.gender || "-",
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        position: item.position || "-",
        contactNo: item.contactNo || "-",
        bruneiIcNo: item.bwnIcNo || "-",
        passportNo: item.ppNo || "-",
        passporExpiry: Array.isArray(item.ppExpiry)
          ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
          : "-",
        department: item.department || "-",
        contractStart: Array.isArray(item.contractStart)
          ? formatDate(item.contractStart[item.contractStart.length - 1])
          : "-",
        contractEnd: Array.isArray(item.contractEnd)
          ? formatDate(item.contractEnd[item.contractEnd.length - 1])
          : "-",
          immigRefNo: item.immigRefNo || "-",
        educLevel: item.educLevel || "-",
        previousEmployee: item.preEmp || "-",
        // rawDateOfJoin: new Date(item.doj), // Raw date for sorting
      }))
      // .sort((a, b) => a.rawDateOfJoin - b.rawDateOfJoin) // Sort by rawDateOfJoin in ascending order
      // .map(({ rawDateOfJoin, ...rest }) => rest); // Remove rawDateOfJoin after sorting
  
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
      />
    </div>
  );
};
