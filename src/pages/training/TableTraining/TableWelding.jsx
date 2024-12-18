// import React, { useState, useEffect, useContext } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { DataSupply } from '../../../utils/DataStoredContext';
// import { TrainVT } from './TrainVT';

// export const TableWelding = () => {
//   const { tableColumns } = useOutletContext();
//   const {
//     empPIData,
//     WeldeInfo,
//   } = useContext(DataSupply);

//   const addWelForm = [
//     { header: "Employee ID", key: "empID" },
//     { header: "Name", key: "name" },
//     { header: "Welding Stamp Number", key: "weldingStampNor" },
//     { header: "WQR Number", key: "WQRNo" },
//     { header: "WPS Number", key: "wpsNumber" },
//     { header: "Welding Code", key: "weldingCode" },
//     { header: "Welding Process", key: "weldingProcess" },
//     { header: "Welding Material", key: "weldingMaterial" },
//     { header: "Welding Position", key: "weldingPosition" },
//     { header: "Filler Metal", key: "fillerMetal" },
//     { header: "Thickness Range", key: "thicknessRange" },
//     { header: "Diameter Range", key: "diameterRange" },
//     { header: "Qualification Expiry", key: "WQExpiry" },
//     { header: "Remarks", key: "WQRemarks" },
//     { header: "Upload File", key: "weldingUpload" },
//   ];

//     const formatDate = (dateString) => {
//     if (!dateString) return "N/A"; // Handle empty or invalid date
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };
//   const [mergeData, setMergeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (empPIData && WeldeInfo) {
//       try {
//         const mergedData = empPIData
//           .map((emp) => {
//             const weldInfo = WeldeInfo.find((item) => item.empID === emp.empID);
//             return weldInfo ? { ...emp, ...weldInfo } : null;
//           })
//           .filter(Boolean) // Remove nulls
//           .sort((a, b) => a.empID.localeCompare(b.empID));
//           console.log(mergedData);

//         setMergeData(mergedData);
//         setLoading(false);
//       } catch (err) {
//         setError('Error merging data.');
//         setLoading(false);
//       }
//     } else {
//       setError('Required data is missing.');
//       setLoading(false);
//     }
//   }, [empPIData, WeldeInfo]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <TrainVT
//         mergering={mergeData.map((data) => ({
//           ...data,
//           WQExpiry: formatDate(data.WQExpiry),
//         }))}
//         columns={tableColumns?.weldingqualifi} popupAll={addWelForm}
//       />
//     </div>
//   );
// };

import React, { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DataSupply } from '../../../utils/DataStoredContext';
import { TrainVT } from './TrainVT';

export const TableWelding = () => {
  const { tableColumns } = useOutletContext();
  const { empPIData, WeldeInfo } = useContext(DataSupply);

  const addWelForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Employee Badge No", key: "empBadgeNo" },
    { header: "Name", key: "name" },
    { header: "Welding Stamp Number", key: "weldingStampNor" },
    { header: "WQR Number", key: "WQRNo" },
    { header: "WPS Number", key: "wpsNumber" },
    { header: "Welding Code", key: "weldingCode" },
    { header: "Welding Process", key: "weldingProcess" },
    { header: "Welding Material", key: "weldingMaterial" },
    { header: "Welding Position", key: "weldingPosition" },
    { header: "Filler Metal", key: "fillerMetal" },
    { header: "Thickness Range", key: "thicknessRange" },
    { header: "Diameter Range", key: "diameterRange" },
    { header: "Qualification Expiry", key: "WQExpiry" },
    { header: "Remarks", key: "WQRemarks" },
    { header: "Upload File", key: "weldingUpload" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [mergeData, setMergeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (empPIData && WeldeInfo) {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const weldInfo = WeldeInfo.find((item) => item.empID === emp.empID);
            return weldInfo ? { ...emp, ...weldInfo } : null;
          })
          .filter(Boolean) // Remove nulls
          .sort((a, b) => a.empID.localeCompare(b.empID));

        // Update weldingUpload to show only the last item in the array
        // const updatedData = mergedData.map((data) => ({
        //   ...data,
        //   weldingUpload: Array.isArray(data.weldingUpload) && data.weldingUpload.length > 0
        //     ? JSON.stringify(data.weldingUpload[data.weldingUpload.length - 1]) // Ensure it's a valid JSON object
        //     : "N/A", // Return "N/A" if the array is empty or not an array
        //   WQExpiry: formatDate(data.WQExpiry),
        // }));
        
        const updatedData = mergedData.map((data) => ({
          ...data,
          weldingUpload: Array.isArray(data.weldingUpload) && data.weldingUpload.length > 0
            ? [data.weldingUpload[data.weldingUpload.length - 1]] // Wrap the last object in an array
            : "N/A", // If weldingUpload is empty or not an array
          WQExpiry: formatDate(data.WQExpiry),
        }));
        
        
        
        console.log(updatedData);
        setMergeData(updatedData);
        setLoading(false);
      } catch (err) {
        setError('Error merging data.');
        setLoading(false);
      }
    } else {
      setError('Required data is missing.');
      setLoading(false);
    }
  }, [empPIData, WeldeInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TrainVT
        mergering={mergeData}
        columns={tableColumns?.weldingqualifi} 
        popupAll={addWelForm}
      />
    </div>
  );
};
