import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const WeldingData = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Name",
    "Emp ID",
    "Badge No",
    "Nationality",
    "STAMP NO",
    "WQR Number",
    "WPS Number",
    "Welding Code",
    "Welding Process",
    "Welding Material",
    "Welding Position",
    "Filler Metal",
    "Thickness Range",
    "Diameter Range",
    "Welding Qualification Expiry",
    "Remarks for Welding Qualification"
  ]);


  const resignationMergedData = (data) => {
    return data
      .filter((item) => item.WQExpiry) 
      .map((item) => ({
        name: item.name || "-",
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        nationality: item.nationality || "-",
        weldingStampNor: item.weldingStampNor || "-",
        WQRNo: item.WQRNo || "-",
        wpsNumber: item.wpsNumber || "-",
        weldingCode: item.weldingCode || "-",
        weldingProcess: item.weldingProcess || "-",
        weldingMaterial: item.weldingMaterial || "-",
        weldingPosition: item.weldingPosition || "-",
        fillerMetal: item.fillerMetal || "-",
        thicknessRange: item.thicknessRange || "-",
        diameterRange: item.diameterRange || "-",
        WQExpiry: item.WQExpiry || "-",
        WQRemarks: item.WQRemarks || "-",
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
