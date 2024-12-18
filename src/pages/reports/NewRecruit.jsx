// import React, { useEffect, useState } from 'react'
// import { FilterTable } from './FilterTable'

// export const NewRecruit = ({allData,typeOfReport,reportTitle}) => {
//   const [tableBody, setTableBody] = useState([]);
//   const [tableHead, setTableHead] = useState([
//     "Date of Joined",
//       "Name",
//       "Employee Badge",
//       "Gender",
//       "Date of Birth",
//       "Nationality",
//       "work Position",
//       "contactNo",
//       "Brunei I/C No",
//       "Passport No",
//       "Employee Pass Expiry",
//       "Department",
//       "Contract Start Date",
//       "Contract End Date",
//       "EDUCATION LEVEL",
//       "Previous Company Name"
//     ]);

//       const formatDate = (date, type) => {
//         if (Array.isArray(date)) {
//           if (date.length === 0) return "-";
//           const lastDate = date[date.length - 1];
//           return formatDate(lastDate, type);
//         }
//         if (!date) return "-";
//         const parsedDate = new Date(date);
//         if (isNaN(parsedDate.getTime())) return "-";
//         const day = String(parsedDate.getDate()).padStart(2, "0");
//         const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
//         const year = parsedDate.getFullYear();
//         return `${day}-${month}-${year}`;
//       };

      
//   // Generate table body dynamically from mergedData
//   const generateTableBodyFromMergedData = (data) => {
//     console.log(data);
  
//     return data.map((item) => {
//       return {
//         doj: formatDate(item.doj) || "-",
//         name: item.name || "-",
//         empBadgeNo: item.empBadgeNo || "-",
//         gender: item.gender || "-",
//         dob: formatDate(item.dob) || "-",
//         nationality: item.nationality || "-",
//         position: item.position || "-",
//         contactNo: item.contactNo || "-",
//         bwnIcNo: item.bwnIcNo || "-",
//         ppNo: item.ppNo || "-",
//         ppExpiry: formatDate(item.ppExpiry) || "-",
//         department: item.department || "-",
//         contractStart: formatDate(item.contractStart) || "-",
//         contractEnd: formatDate(item.contractEnd) || "-",
//         educLevel: item.educLevel || "-",
//         preEmp: item.preEmp || "-",
//       };
//     });
//   };
  
//   useEffect(()=>{
    
//       setTableBody(generateTableBodyFromMergedData(allData))
//     },[allData])

//   return (
//     <div>
//       <FilterTable tableBody={tableBody} tableHead={tableHead} typeOfReport={typeOfReport} reportTitle={reportTitle}/>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { FilterTable } from './FilterTable';

export const NewRecruit = ({ allData, typeOfReport, reportTitle }) => {
  const [tableBody, setTableBody] = useState([]);
  const [tableHead, setTableHead] = useState([
      "Employee Badge",
      "Name",
      "Date of Joined",
    "Gender",
    "Date of Birth",
    "Nationality",
    "work Position",
    "contactNo",
    "Brunei I/C No",
    "Passport No",
    "Employee Pass Expiry",
    "Department",
    "Contract Start Date",
    "Contract End Date",
    "EDUCATION LEVEL",
    "Previous Company Name",
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

  const isDateInCurrentMonth = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return false;

    const today = new Date();
    return (
      parsedDate.getFullYear() === today.getFullYear() &&
      parsedDate.getMonth() === today.getMonth()
    );
  };

  const generateTableBodyFromMergedData = (data) => {
    return data
      .filter((item) => isDateInCurrentMonth(item.doj)) // Filter only current month dates
      .map((item) => {
        return {
            empBadgeNo: item.empBadgeNo || "-",
            name: item.name || "-",
            doj: formatDate(item.doj) || "-",
          gender: item.gender || "-",
          dob: formatDate(item.dob) || "-",
          nationality: item.nationality || "-",
          position: item.position || "-",
          contactNo: item.contactNo || "-",
          bwnIcNo: item.bwnIcNo || "-",
          ppNo: item.ppNo || "-",
          ppExpiry: Array.isArray(item.ppExpiry)
          ? formatDate(item.ppExpiry[item.ppExpiry.length - 1])
          : "-",
          department: item.department || "-",
          contractStart: Array.isArray(item.contractStart)
          ? formatDate(item.contractStart[item.contractStart.length - 1])
          : "-",
          contractEnd: Array.isArray(item.contractEnd)
          ? formatDate(item.contractEnd[item.contractEnd.length - 1])
          : "-",
          educLevel: item.educLevel || "-",
          preEmp: item.preEmp || "-",
        };
      });
  };

  useEffect(() => {
    setTableBody(generateTableBodyFromMergedData(allData));
  }, [allData]);

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
