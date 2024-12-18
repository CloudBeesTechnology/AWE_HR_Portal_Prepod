
import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const TrainingRCData = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
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
    "REMARKS"
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
    return data.map((item) => ({
      empID: item.empID || "-",
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
      certifiExpiry: formatDate(item.certifiExpiry) || "-",
      expAndValid: checkExpiryStatus(item.certifiExpiry), // Check expiry status
      traineeStatus: item.traineeStatus || "-",
      eCertifiDate: formatDate(item.eCertifiDate) || "-",
      orgiCertifiDate: formatDate(item.orgiCertifiDate) || "-",
      remark: item.remark || "-",
    }));
  };

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
  }, [allData]);

  return (
    <div>
      <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle} />
    </div>
  );
};
