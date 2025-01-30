import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const EmploymentMedical = () => {
  const location = useLocation();
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { allData, title } = location.state || {};

  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Join",
    "Nationality",
    "Position",
    "Department",
    "Medical Expiry",
  ]);

  const parseDate = (dateString) => {
    if (!dateString) return null; // Handle undefined or null values

    // Standardize separators (replace "-" with "/")
    const standardizedDate = dateString.replace(/-/g, "/");

    const parts = standardizedDate.split("/");
    if (parts.length !== 3) return null; // Ensure it has three parts

    let day, month, year;

    if (parts[0].length === 4) {
      // Format: YYYY/MM/DD
      [year, month, day] = parts.map(Number);
    } else if (parts[2].length === 4) {
      // Format: DD/MM/YYYY or MM/DD/YYYY (Ambiguous in US format)
      const [part1, part2, part3] = parts.map(Number);

      // Heuristic: If part1 > 12, assume it's DD/MM/YYYY; otherwise, assume MM/DD/YYYY
      if (part1 > 12) {
        [day, month, year] = [part1, part2, part3]; // DD/MM/YYYY
      } else {
        [month, day, year] = [part1, part2, part3]; // MM/DD/YYYY
      }
    } else {
      return null; // Invalid format
    }
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
  };


  const formatDate=(dateString)=>{

    
    if (typeof dateString !== "string") return null;

    // Standardize separators (replace "-" with "/")
    const standardizedDate = dateString.replace(/-/g, "/");

    const parts = standardizedDate.split("/");
    if (parts.length !== 3) return null; // Ensure it has three parts

    let day, month, year;

    if (parts[0].length === 4) {
      // Format: YYYY/MM/DD
      [year, month, day] = parts.map(Number);
    } else if (parts[2].length === 4) {
      // Format: DD/MM/YYYY or MM/DD/YYYY (Ambiguous in US format)
      const [part1, part2, part3] = parts.map(Number);

      // Heuristic: If part1 > 12, assume it's DD/MM/YYYY; otherwise, assume MM/DD/YYYY
      if (part1 > 12) {
        [day, month, year] = [part1, part2, part3]; // DD/MM/YYYY
      } else {
        [month, day, year] = [part1, part2, part3]; // MM/DD/YYYY
      }
    } else {
      return null; // Invalid format
    }
    return `${day}-${month}-${year}` // Month is 0-indexed in JavaScript
  }

  // Check if a date is within the next 3 months from today
  const isInNextThreeMonths = (expiryDate) => {
    if (!expiryDate) return false;
    // console.log(expiryDate);
    
    const today = new Date();
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      1
    ); // Start of next month
    // console.log(startOfNextMonth);
    
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 4,
      0
    ); // End of next 3 months
    const expiry = parseDate(expiryDate);
    // console.log(expiry);
    
    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  // Merged and filtered data based on medical expiry date
  const medicalReviewMergedData = (data) => {
    const filteringValue = data?.map((val) => {
      if (!val.bruneiME || val?.bruneiME?.length === 0) {
        return false;
      }
      const medicalExpiryDate = val?.bruneiME[val?.bruneiME.length - 1];
      const isExpiryInNextThreeMonths = isInNextThreeMonths(medicalExpiryDate);
      
      if (!isExpiryInNextThreeMonths) {
        return false;
      }
      // console.log(isExpiryInNextThreeMonths);
      return {
        ...val,
        medicalExpiryDate,
        isExpiryInNextThreeMonths,
      };
    }).filter((val) => val !== false); 
    // console.log(filteringValue);
    
    return filteringValue
  };

  // Handle date change and update filtering
  const handleDate = (e, type) => {
    const value = e.target.value;
    
    // const newDate = new Date(value);
    const validDate=formatDate(value)
    console.log(validDate,"54285");
    
    if (type === "startDate") {
      setStartDate(validDate);
    } else if (type === "endDate") {
      setEndDate(validDate);
    }
  };

  useEffect(() => {
    // When either startDate or endDate changes, filter the data
    const filteredMedicalData = medicalReviewMergedData(allData);
    let result = filteredMedicalData?.map((val) => ({
      empID: val?.empID,
      empBadgeNo: val?.empBadgeNo,
      name: val?.name,
      dateOfJoin: formatDate(val?.doj) || "-",
      nationality: val?.nationality,
      position: val?.position,
      department: val?.department,
      medical: formatDate(val?.medicalExpiryDate) || "-",
    }));

    if (startDate && endDate) {
      result = result.filter((item) => {
        console.log(item,"sedfgvbhnjkm");
        
        const expiryDate = item.medical
        return expiryDate >= startDate && expiryDate <= endDate;
      });
    } 
    // else if (startDate) {
    //   result = result.filter((item) => item.medical>= startDate);
    // } else if (endDate) {
    //   result = result.filter((item) => item.medical <= endDate);
    // }

    setFilteredData(result);
  }, [startDate, endDate, allData]); // Trigger when startDate, endDate or allData changes

  return (
    <div>
      <FilterTable
        tableBody={filteredData?.length ? filteredData : tableBody}
        tableHead={tableHead}
        title={title}
        startDate={startDate ? formatDate(startDate) : ""}
        endDate={endDate ? formatDate(endDate) : ""}
        handleDate={handleDate}
      />
    </div>
  );
};

