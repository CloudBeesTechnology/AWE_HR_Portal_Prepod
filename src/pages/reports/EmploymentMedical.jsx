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

  // console.log("All data received:", allData);

  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Join",
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Medical Expiry",
  ]);

  const parseDate = (dateString) => {
    if (!dateString) return null;

    // console.log("Parsing date:", dateString);

    const standardizedDate = dateString.replace(/-/g, "/");
    const parts = standardizedDate.split("/");
    if (parts.length !== 3) return null;

    let day, month, year;

    if (parts[0].length === 4) {
      [year, month, day] = parts.map(Number);
    } else if (parts[2].length === 4) {
      const [part1, part2, part3] = parts.map(Number);
      if (part1 > 12) {
        [day, month, year] = [part1, part2, part3];
      } else {
        [month, day, year] = [part1, part2, part3];
      }
    } else {
      return null;
    }
    const parsedDate = new Date(year, month - 1, day);
    // console.log("Parsed date:", parsedDate);
    return parsedDate;
  };

  const formatDate = (dateString) => {
    if (typeof dateString !== "string") return null;

    // console.log("Formatting date:", dateString);

    const standardizedDate = dateString.replace(/-/g, "/");
    const parts = standardizedDate.split("/");
    if (parts.length !== 3) return null;

    let day, month, year;

    if (parts[0].length === 4) {
      [year, month, day] = parts.map(Number);
    } else if (parts[2].length === 4) {
      const [part1, part2, part3] = parts.map(Number);
      if (part1 > 12) {
        [day, month, year] = [part1, part2, part3];
      } else {
        [month, day, year] = [part1, part2, part3];
      }
    } else {
      return null;
    }
    const formattedDate = `${day}-${month}-${year}`;
    // console.log("Formatted date:", formattedDate);
    return formattedDate;
  };

  const isInNextThreeMonths = (expiryDate) => {
    if (!expiryDate) return false;

    // console.log("Checking expiry date within next three months:", expiryDate);

    const expiry = parseDate(expiryDate);
    const today = new Date();
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 4, 1);

    // console.log("Expiry:", expiry, "Start of next 3 months:", startOfNextMonth, "End of next 3 months:", endOfNextMonth);

    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  const medicalReviewMergedData = (data) => {
    // console.log("Processing medical review data:", data);

    const filteringValue = data?.map((val) => {
      if (!val.bruneiME || val?.bruneiME?.length === 0) {
        // console.log("Skipping entry due to missing bruneiME:", val);
        return false;
      }

      const medicalExpiryDate = val?.bruneiME[val?.bruneiME.length - 1];
      const isExpiryInNextThreeMonths = isInNextThreeMonths(medicalExpiryDate);

      if (!isExpiryInNextThreeMonths) {
        // console.log("Skipping entry due to expiry not in range:", val);
        return false;
      }

      const formattedEntry = {
        empID: val?.empID,
        empBadgeNo: val?.empBadgeNo,
        name: val?.name,
        dateOfJoin: formatDate(val?.doj) || "-",
        nationality: val?.nationality,
        department: Array.isArray(val.department)
        ? val.department[val.department.length - 1]
        : "-",
        otherDepartment:Array.isArray(val.otherDepartment)
        ? val.otherDepartment[val.otherDepartment.length - 1]
        : "-",
      position: Array.isArray(val.position)
        ? val.position[val.position.length - 1]
        : "-",
        medicalExpiryDate: formatDate(medicalExpiryDate) || "-",
      };

      // console.log("Filtered entry:", formattedEntry);
      return formattedEntry;
    }).filter((val) => val !== false);

    // console.log("Final filtered data:", filteringValue);
    return filteringValue;
  };

  useEffect(() => {
    const data = medicalReviewMergedData(allData);
    // console.log("Setting tableBody with:", data);
    setTableBody(data);
  }, [allData]);


  const handleDate = (e, type) => {
    const value = e.target.value;
    const newDate = value ? parseDate(value) : null;
  
    // Set the state based on the date type (startDate or endDate)
    if (type === "startDate") setStartDate(newDate);
    if (type === "endDate") setEndDate(newDate);
  
    // Use the newly selected date (newDate) to filter data
    const filtered = allData
      .filter((data) => {
        const expiryArray = data.bruneiME || [];
        const expiryDate = expiryArray.length ? parseDate(expiryArray[expiryArray.length - 1]) : null;
  
        if (!expiryDate || isNaN(expiryDate.getTime())) return false;
  
        // Filtering based on start and end dates
        if (newDate) {
          if (type === "startDate" && endDate) return expiryDate >= newDate && expiryDate <= endDate;
          if (type === "endDate" && startDate) return expiryDate >= startDate && expiryDate <= newDate;
          return true;
        }
        return true;
      })
      .map((item) => {
        const lastValidDate = item.bruneiME[item.bruneiME.length - 1];
        return {
          empID: item?.empID,
          empBadgeNo: item?.empBadgeNo,
          name: item?.name,
          dateOfJoin: formatDate(item?.doj) || "-",
          nationality: item?.nationality,
          department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
          otherDepartment:Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: Array.isArray(item.position)
          ? item.position[item.position.length - 1]
          : "-",
          medicalExpiryDate: formatDate(lastValidDate),
        };
      });
  
    setFilteredData(filtered);
  };
  
  

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