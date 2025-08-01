import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";
import { DateFormat } from "../../utils/DateFormat";

export const GroupHSData = () => {
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
    "Nationality",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "Group H&S Insurance",
    "Group H&S Insurance Enrollment Effective Date",
    "Group H&S Insurance Enrollment End Date",
  ]);

  // Generate table body dynamically from mergedData
  const probationReviewMergedData = (data) => {
    return data
      .filter((item) => {
        if (Array.isArray(item.workStatus) && item.workStatus.length > 0) {
          const lastWorkStatus = item.workStatus[item.workStatus.length - 1];

          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION"
          ) {
            return false;
          }
        }
        // Ensure groupInsEffectDate is a valid array with non-empty and valid date entries
        return (
          Array.isArray(item.groupInsEffectDate) &&
          item.groupInsEffectDate.length > 0 &&
          item.groupInsEffectDate.every(
            (date) => date && !isNaN(new Date(date).getTime())
          )
        );
      })
      .filter((item) => {
        const groupInsEffectDate =
          item.groupInsEffectDate[item.groupInsEffectDate.length - 1];
        return groupInsEffectDate;
      })
      .map((item) => ({
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        dateOfJoin: DateFormat(item.doj),

        nationality: item.nationality || "-",
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
        groupIns: item.groupIns || "-",
        groupInsEffectDate: Array.isArray(item.groupInsEffectDate)
          ? DateFormat(
              item.groupInsEffectDate[item.groupInsEffectDate.length - 1]
            )
          : "-",
        groupInsEndDate: Array.isArray(item.groupInsEndDate)
          ? DateFormat(item.groupInsEndDate[item.groupInsEndDate.length - 1])
          : "-",
        rawGhsd: new Date(item.groupInsEffectDate),
      }))
      .sort((a, b) => a.rawGhsd - b.rawGhsd)
      .map(({ rawGhsd, ...rest }) => rest);
  };

  useEffect(() => {
    setTableBody(probationReviewMergedData(allData));
  }, [allData]);
  // console.log(tableBody);

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
          return false;
        }

        const lastWorkStatus = data.workStatus[data.workStatus.length - 1];

        if (
          lastWorkStatus?.toUpperCase() === "TERMINATION" ||
          lastWorkStatus?.toUpperCase() === "RESIGNATION"
        ) {
          return false;
        }
        const expiryArray = data.groupInsEffectDate || [];
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
        dateOfJoin: DateFormat(item.doj),

        nationality: item.nationality || "-",
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
        groupIns: item.groupIns || "-",
        groupInsEffectDate: Array.isArray(item.groupInsEffectDate)
          ? DateFormat(
              item.groupInsEffectDate[item.groupInsEffectDate.length - 1]
            )
          : "-",
        groupInsEndDate: Array.isArray(item.groupInsEndDate)
          ? DateFormat(item.groupInsEndDate[item.groupInsEndDate.length - 1])
          : "-",
        rawGhsd: new Date(item.groupInsEffectDate),
      }))
      .sort((a, b) => a.rawGhsd - b.rawGhsd)
      .map(({ rawGhsd, ...rest }) => rest);
    if (start || end) {
      if (filtered.length === 0) {
        setIsDateFiltered(true);
      } else {
        setIsDateFiltered(false);
      }
    } else {
      setIsDateFiltered(false);
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
