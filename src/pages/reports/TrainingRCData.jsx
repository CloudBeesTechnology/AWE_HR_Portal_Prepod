import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const TrainingRCData = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "MR No",
    "PO No",
    "CODE",
    "COURSE / PROGRAMME",
    "CONDUCTED BY",
    "Course Fee",
    "DIVISION",
    "START DATE",
    "END DATE",
    "CERT. EXP",
    "EXPIRED/VALID",
    "Mandatory/ Supplementary",
    "E-CERTS RECEIVED",
    "ORIGINAL CERTS RECEIVED",
    "REMARKS",
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

  const checkExpiryStatus = (certifiExpiry) => {
    if (!certifiExpiry) return "EXPIRED"; // Treat missing dates as expired
    const expiryDate = new Date(certifiExpiry);
    const today = new Date();
    return expiryDate < today ? "EXPIRED" : "VALID";
  };

  const resignationMergedData = (data) => {
    return data
      .filter((item) => {
        const certifiExpiryDates = item.certifiExpiry || [];
        const lastDate = certifiExpiryDates[certifiExpiryDates.length - 1];
        if (!lastDate) return false;

        const certifiExpiry = new Date(lastDate);
        return certifiExpiry;
      })
      .map((item) => ({
        empId: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        MRNo: item.MRNo || "-",
        poNo: item.poNo || "-",
        courseCode: item.courseCode || "-",
        courseName: item.courseName || "-",
        company: item.company || "-",
        traineeCourseFee: item.traineeCourseFee || "-",
        DIVISION: item.DIVISION || "-",
        traineeSD: formatDate(item.traineeSD) || "-",
        traineeED: formatDate(item.traineeED) || "-",
        certifiExpiry: Array.isArray(item.certifiExpiry)
          ? formatDate(item.certifiExpiry[item.certifiExpiry.length - 1])
          : "-",
        expAndValid: checkExpiryStatus(item.certifiExpiry),
        traineeStatus: item.traineeStatus || "-",
        eCertifiDate: Array.isArray(item.eCertifiDate)
          ? formatDate(item.eCertifiDate[item.eCertifiDate.length - 1])
          : "-",
        orgiCertifiDate: Array.isArray(item.orgiCertifiDate)
          ? formatDate(item.orgiCertifiDate[item.orgiCertifiDate.length - 1])
          : "-",
        remark: item.remark || "-",
        rawCertifiExpiry: new Date(item.certifiExpiry), // Raw date for sorting

      })) .sort((a, b) => a.rawCertifiExpiry - b.rawCertifiExpiry)
      .map(({ rawCertifiExpiry, ...rest }) => rest);
  };

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
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
        const expiryArray = data.certifiExpiry || [];
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
        empId: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        MRNo: item.MRNo || "-",
        poNo: item.poNo || "-",
        courseCode: item.courseCode || "-",
        courseName: item.courseName || "-",
        company: item.company || "-",
        traineeCourseFee: item.traineeCourseFee || "-",
        DIVISION: item.DIVISION || "-",
        traineeSD: formatDate(item.traineeSD) || "-",
        traineeED: formatDate(item.traineeED) || "-",
        certifiExpiry: Array.isArray(item.certifiExpiry)
          ? formatDate(item.certifiExpiry[item.certifiExpiry.length - 1])
          : "-",
        expAndValid: checkExpiryStatus(item.certifiExpiry),
        traineeStatus: item.traineeStatus || "-",
        eCertifiDate: Array.isArray(item.eCertifiDate)
          ? formatDate(item.eCertifiDate[item.eCertifiDate.length - 1])
          : "-",
        orgiCertifiDate: Array.isArray(item.orgiCertifiDate)
          ? formatDate(item.orgiCertifiDate[item.orgiCertifiDate.length - 1])
          : "-",
        remark: item.remark || "-",
        rawCertifiExpiry: new Date(item.certifiExpiry), // Raw date for sorting

      })) .sort((a, b) => a.rawCertifiExpiry - b.rawCertifiExpiry)
      .map(({ rawCertifiExpiry, ...rest }) => rest);
    setFilteredData(filtered);
  };
  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        // tableBody={tableBody}
        startDate={startDate}
        endDate={endDate}
        tableHead={tableHead}
        title={title}
        handleDate={handleDate}
      />
    </div>
  );
};
