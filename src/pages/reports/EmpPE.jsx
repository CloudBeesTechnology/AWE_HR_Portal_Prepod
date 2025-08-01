import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";
import { DateFormat } from "../../utils/DateFormat";

export const EmpPE = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Nationality",
    "Date of Join",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "Pass Expiry",
  ]);

  // Check if the date is strictly in the next month

  const isInNextMonth = (expiryDate) => {
    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);
    const today = new Date();

    // Calculate the start and end of the next month
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    ); // First day of next month
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      1
    ); // Last day of next month

    // Check if expiry date falls in the next month
    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  // Filter and map the employee pass data
  const empPassMergedData = (data) => {
    const sortedData = data
      .filter((item) => {
        // Ensure empPassExp is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.empPassExp) &&
          item.empPassExp.length > 0 &&
          item.empPassExp.every(
            (date) => date && !isNaN(new Date(date).getTime())
          )
        );
      })
      .filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1]; // Get last element

          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION"
          ) {
            return false; // Exclude items with TERMINATION or RESIGNATION
          }
        }
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return isInNextMonth(lastPassExp);
      })
      .map((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return {
          lastPassExp: new Date(lastPassExp), // Keep for sorting only
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
          dateOfJoin: DateFormat(item.doj) || "-",
          department: Array.isArray(item.department)
            ? item.department[item.department.length - 1]
            : "-",
          otherDepartment: Array.isArray(item.otherDepartment)
            ? item.otherDepartment[item.otherDepartment.length - 1]
            : "-",
          position: Array.isArray(item.position)
            ? item.position[item.position.length - 1]
            : "-",
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          passExpiry: DateFormat(lastPassExp) || "-",
        };
      })
      .sort((a, b) => a.lastPassExp - b.lastPassExp); // Sort using lastPassExp

    // Remove lastPassExp after sorting
    return sortedData.map(({ lastPassExp, ...rest }) => rest);
  };

  useEffect(() => {
    setTableBody(empPassMergedData(allData));
  }, [allData]);

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

    const filtered = allData
      .filter((data) => {
        if (!Array.isArray(data.workStatus) || data.workStatus.length === 0) {
          return false; // Return early if workStatus is undefined or an empty array
        }

        const lastWorkStatus = data.workStatus[data.workStatus.length - 1]; // Now it's safe

        if (
          lastWorkStatus?.toUpperCase() === "TERMINATION" ||
          lastWorkStatus?.toUpperCase() === "RESIGNATION"
        ) {
          return false; // Exclude records with TERMINATION or RESIGNATION
        }
        const expiryArray = data.empPassExp || [];
        const expiryDate = expiryArray.length
          ? new Date(expiryArray[expiryArray.length - 1])
          : null;

        if (!expiryDate || isNaN(expiryDate.getTime())) return false;

        if (start && end) return expiryDate >= start && expiryDate <= end;
        if (start) return expiryDate >= start;
        if (end) return expiryDate <= end;

        return true;
      })
      .map((item) => {
        const lastPassExp = item.empPassExp[item.empPassExp.length - 1];
        return {
          lastPassExp: new Date(lastPassExp), // Keep for sorting only
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
          dateOfJoin: DateFormat(item.doj) || "-",
          department: Array.isArray(item.department)
            ? item.department[item.department.length - 1]
            : "-",
          otherDepartment: Array.isArray(item.otherDepartment)
            ? item.otherDepartment[item.otherDepartment.length - 1]
            : "-",
          position: Array.isArray(item.position)
            ? item.position[item.position.length - 1]
            : "-",
          otherPosition: Array.isArray(item.otherPosition)
            ? item.otherPosition[item.otherPosition.length - 1]
            : "-",
          passExpiry: DateFormat(lastPassExp) || "-",
        };
      })
      .sort((a, b) => a.lastPassExp - b.lastPassExp) // Sort by lastPassExp
      .map(({ lastPassExp, ...rest }) => rest); // Remove lastPassExp after sorting

    if (start || end) {
      if (filtered.length === 0) {
        setIsDateFiltered(true); // No data found
      } else {
        setIsDateFiltered(false); // Data exists
      }
    } else {
      setIsDateFiltered(false); // No date filters applied
    }

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
        isFiltered={isDateFiltered}
      />
    </div>
  );
};
