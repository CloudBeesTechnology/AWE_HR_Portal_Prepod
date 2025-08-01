import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const Resignation = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "Date of join",
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
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
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
        otherDepartment: Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: (() => {
          const today = new Date();
          const positionRevDate =
            item.positionRevDate?.[item.positionRevDate.length - 1];
          const positionRev = item.positionRev?.[item.positionRev.length - 1];
          const upgradePosition =
            item.upgradePosition?.[item.upgradePosition.length - 1];
          const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];
          let finalPosition;

          // Convert to dates for comparison (ensure dates are valid before comparing)
          const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
          const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

          if (revDateObj && upgradeDateObj) {
            if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
              finalPosition = item.position?.[item.position.length - 1];
            } else if (revDateObj > upgradeDateObj) {
              finalPosition =
                today >= revDateObj
                  ? positionRev
                  : today >= upgradeDateObj
                  ? upgradePosition
                  : item.position?.[item.position.length - 1];
            } else if (upgradeDateObj > revDateObj) {
              finalPosition =
                today >= upgradeDateObj
                  ? upgradePosition
                  : today >= revDateObj
                  ? positionRev
                  : item.position?.[item.position.length - 1];
            }
          } else if (revDateObj && !upgradeDateObj) {
            finalPosition = today >= revDateObj && positionRev;
          } else if (upgradeDateObj && !revDateObj) {
            finalPosition = today >= upgradeDateObj && upgradePosition;
          } else {
            finalPosition = item.position?.[item.position.length - 1];
          }

          return finalPosition || "-";
        })(),
        otherPosition: Array.isArray(item.otherPosition)
          ? item.otherPosition[item.otherPosition.length - 1]
          : "-",
        resignDate: formatDate(item.resignDate) || "-", // Display formatted resignDate
        rawResignDate: new Date(item.resignDate), // Add raw date for sorting
        reasonResign: item.reasonResign || "-", // Display reason for resignation
      }))
      .sort((a, b) => a.rawResignDate - b.rawResignDate) // Sort by raw resignDate
      .map(({ rawResignDate, ...rest }) => rest); // Remove rawResignDate after sorting
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
        dateOfJoin: formatDate(item.doj) || "-",
        nationality: item.nationality || "-",
        department: Array.isArray(item.department)
          ? item.department[item.department.length - 1]
          : "-",
        otherDepartment: Array.isArray(item.otherDepartment)
          ? item.otherDepartment[item.otherDepartment.length - 1]
          : "-",
        position: (() => {
          const today = new Date();
          const positionRevDate =
            item.positionRevDate?.[item.positionRevDate.length - 1];
          const positionRev = item.positionRev?.[item.positionRev.length - 1];
          const upgradePosition =
            item.upgradePosition?.[item.upgradePosition.length - 1];
          const upgradeDate = item.upgradeDate?.[item.upgradeDate.length - 1];
          let finalPosition;

          // Convert to dates for comparison (ensure dates are valid before comparing)
          const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
          const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

          if (revDateObj && upgradeDateObj) {
            if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
              finalPosition = item.position?.[item.position.length - 1];
            } else if (revDateObj > upgradeDateObj) {
              finalPosition =
                today >= revDateObj
                  ? positionRev
                  : today >= upgradeDateObj
                  ? upgradePosition
                  : item.position?.[item.position.length - 1];
            } else if (upgradeDateObj > revDateObj) {
              finalPosition =
                today >= upgradeDateObj
                  ? upgradePosition
                  : today >= revDateObj
                  ? positionRev
                  : item.position?.[item.position.length - 1];
            }
          } else if (revDateObj && !upgradeDateObj) {
            finalPosition = today >= revDateObj && positionRev;
          } else if (upgradeDateObj && !revDateObj) {
            finalPosition = today >= upgradeDateObj && upgradePosition;
          } else {
            finalPosition = item.position?.[item.position.length - 1];
          }

          return finalPosition || "-";
        })(),
        otherPosition: Array.isArray(item.otherPosition)
          ? item.otherPosition[item.otherPosition.length - 1]
          : "-",
        resignDate: formatDate(item.resignDate) || "-",
        rawResignDate: new Date(item.resignDate), // Add raw date for sorting
        reasonResign: item.reasonResign || "-",
      }))
      .sort((a, b) => a.rawResignDate - b.rawResignDate) // Sort by raw termiDate
      .map(({ rawResignDate, ...rest }) => rest); // Remove raw date after sorting

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
        // tableBody={tableBody}
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
