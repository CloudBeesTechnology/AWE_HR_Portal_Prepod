import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";

export const EmploymentMedical = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead] = useState([
    "Name",
    "Emp ID",
    "Employee Badge",
    "Nationality",
    "Work Position",
    "Department",
    "Medical Expiry",
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

  const isInNextMonth = (expiryDate) => {
    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);
    const today = new Date();

    // Calculate the start and end of the next month
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1 + 1 + 1
    ); // First day of next month
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 4,
      0
    ); // Last day of next month

    // Check if expiry date falls in the next month
    return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
  };

  const convertDateFormat = (dateStr) => {
    const parts = dateStr.split("/");
    if (
      parts.length === 3 &&
      parts[0].length === 2 &&
      parts[1].length === 2 &&
      parts[2].length === 4
    ) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to 'YYYY-MM-DD'
    }
    return dateStr; // Return the original if already valid
  };

  const medicalReviewMergedData = (data) => {
    const currentDate = new Date(); // Today's date: 24th December 2024 (example)
    const threeMonthsAhead = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 3,
      1
    ); // 24th March 2025

    // Format currentDate and threeMonthsAhead to 'YYYY-MM-DD' for comparison
    const formattedThreeMonthsAhead = `${threeMonthsAhead.getFullYear()}-${(
      threeMonthsAhead.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    // console.log("Formatted 3 months ahead: ", formattedThreeMonthsAhead); // Log this value

    const filteringValue = data.filter((item) => item?.bruneiME?.length > 0);

    const filteringBruneiValue = filteringValue
      .map((val) => {
        const isDateExactMatch = val?.bruneiME.some((bruneiDateStr) => {
          const formattedDateStr = convertDateFormat(bruneiDateStr); // Convert date if needed
          const bruneiDate = new Date(formattedDateStr);

          // Check if the bruneiDate is a valid date
          if (isNaN(bruneiDate)) {
            console.error(`Invalid date: ${formattedDateStr}`);
            return false;
          }

          const formattedBruneiDate = `${bruneiDate.getFullYear()}-${(
            bruneiDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}`;

          // Compare the dates ignoring the time part
          return formattedBruneiDate === formattedThreeMonthsAhead;
        });

        return { ...val, isDateExactMatch };
      })
      .filter((val) => val.isDateExactMatch); // Keep only the entries that match

    // console.log(filteringBruneiValue); // Logging the filtered data

    return filteringBruneiValue; // Return only the filtered data
  };

  useEffect(() => {
    const filtereddBruneiDate = medicalReviewMergedData(allData);

    const result = filtereddBruneiDate.map((val) => {
      const finalData = {
        name: val?.name,
        empID: val?.empID,
        badgeNo: val?.empBadgeNo,
        nationality: val?.nationality,
        position: val?.position,
        department: val?.department,
        medical: val?.bruneiME[val?.bruneiME.length - 1],
      };
      return finalData;
    });
    setTableBody(result);
  }, [allData]);
  // console.log(tableBody); // Ensure tableBody is correctly logged

  return (
    <div>
      <FilterTable
        tableBody={tableBody}
        tableHead={tableHead}
        typeOfReport={typeOfReport}
        reportTitle={reportTitle}
      />
    </div>
  );
};