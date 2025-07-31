import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const PromotionRep = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of Join",
    "Department",
    "Other Department",
    "Position",
    "other Position",
    "UPGRADE POSITION",
    "UPGRADE POSITION EFFECTIVE DATE",
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

  const LDReviewMergedData = (data) => {
    return data
      .filter((item) => {
        // Ensure upgradeDate is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.upgradeDate) &&
          item.upgradeDate.length > 0 &&
          item.upgradeDate.every(
            (date) => date && !isNaN(new Date(date).getTime())
          )
        );
      })
      .filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus =
            item.workStatus[item.workStatus.length - 1].toUpperCase();
          if (
            lastWorkStatus === "TERMINATION" ||
            lastWorkStatus === "RESIGNATION"
          ) {
            return false; // Exclude items with TERMINATION or RESIGNATION
          }
        }
        return true;
      })
      .map((item) => {
        const lastPassExp = item.upgradeDate[item.upgradeDate.length - 1];
        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          dateOfJoin: formatDate(item.doj) || "-",
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
          upgradePosition: Array.isArray(item.upgradePosition)
            ? item.upgradePosition[item.upgradePosition.length - 1]
            : "-",
          upgradeDate: formatDate(lastPassExp) || "-",
          rawUD: new Date(lastPassExp), // Raw date for sorting
        };
      })
      .sort((a, b) => a.rawUD - b.rawUD) // Sort by rawUD (upgradeDate)
      .map(({ rawUD, ...rest }) => rest); // Remove rawUD after sorting
  };

  useEffect(() => {
    const data = LDReviewMergedData(allData);
    setTableBody(data);
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
        const expiryArray = data.upgradeDate || [];
        const expiryDate = expiryArray.length
          ? new Date(expiryArray[expiryArray.length - 1])
          : null;

        if (!expiryDate || isNaN(expiryDate.getTime())) return false;

        if (start && end) return expiryDate >= start && expiryDate <= end;
        if (start) return expiryDate >= start;
        if (end) return expiryDate <= end;

        return true;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: formatDate(item.doj) || "-",
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
        upgradePosition: Array.isArray(item.upgradePosition)
          ? item.upgradePosition[item.upgradePosition.length - 1]
          : "-",
        upgradeDate: formatDate(item.upgradeDate[item.upgradeDate.length - 1]),
        rawUD: new Date(item.upgradeDate[item.upgradeDate.length - 1]), // Raw date for sorting
      }))
      .sort((a, b) => a.rawUD - b.rawUD) // Sort by rawUD (upgradeDate)
      .map(({ rawUD, ...rest }) => rest); // Remove rawUD after sorting
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
        startDate={startDate}
        endDate={endDate}
        title={title}
        handleDate={handleDate}
        isFiltered={isDateFiltered}
      />
    </div>
  );
};
