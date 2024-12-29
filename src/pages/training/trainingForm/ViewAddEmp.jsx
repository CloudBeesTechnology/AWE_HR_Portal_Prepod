import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa6";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { TrainVT } from "../TableTraining/TrainVT";

export const ViewAddEmp = () => {
  const { empPIData, workInfoData, trainingCertifi, AddEmpReq } =
    useContext(DataSupply);

  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (empPIData && workInfoData && trainingCertifi && AddEmpReq) {
      const mergedData = empPIData
        .map((emp) => {
          const addemp = AddEmpReq.find((item) => item.empID === emp.empID);
          const Workemp = workInfoData.find((item) => item.empID === emp.empID);
          const TCemp = trainingCertifi.find(
            (item) => item.empID === emp.empID
          );

          if (addemp) {
            return {
              ...emp,
              ...addemp,
              ...Workemp,
              ...TCemp,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      const sortedData = mergedData.sort((a, b) =>
        a.empID.localeCompare(b.empID)
      );
      setMergeData(sortedData);
      setFilteredData(sortedData);
      setLoading(false);
    } else {
      setError("Data not fully available.");
      setLoading(false);
    }
  }, [empPIData, workInfoData, trainingCertifi, AddEmpReq]);

  const tableColumns = {
    addTraining: [
      { header: "Employee ID", key: "empID" },
      { header: "Employee Badge No", key: "empBadgeNo" },
      { header: "Name", key: "name" },
      { header: "Department", key: "department" },
      { header: "Material Requisition ", key: "MRNo" },
      { header: "Medical Name", key: "medicalName" },
      { header: "Medical Expiry", key: "medicalExpiry" },
      { header: "Medical Appointment Date", key: "medicalAppointDate" },
      { header: "Course", key: "courseCode" },
      { header: "Course Name", key: "courseName" },
      { header: "Company", key: "company" },
      { header: "Start Date", key: "traineeSD" },
      { header: "End Date", key: "traineeED" },
      { header: "Status", key: "traineeStatus" },
      { header: "Training Course Fee", key: "traineeCourseFee" },
    ],
  };

  const addTrainingForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Employee Badge No", key: "empBadgeNo" },
    { header: "Name", key: "name" },
    { header: "Material Requisition ", key: "MRNo" },
    { header: "Medical Name", key: "medicalName" },
    { header: "Medical Expiry", key: "medicalExpiry" },
    { header: "Medical Appointment Date", key: "medicalAppointDate" },
    { header: "Course", key: "courseCode" },
    { header: "Course Name", key: "courseName" },
    { header: "Company", key: "company" },
    { header: "Start Date", key: "traineeSD" },
    { header: "End Date", key: "traineeED" },
    { header: "Status", key: "traineeStatus" },
    { header: "Training Course Fee", key: "traineeCourseFee" },
    { header: "Upload Report", key: "medicalReport" },
  ];

  const handleDate = (e, type) => {
    const value = e.target.value;
  
    // Update startDate or endDate based on input type
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    // Filter data using the new date range
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = mergeData.filter((data) => {
      const traineeSD = new Date(data.traineeSD);
  
      if (start && end) return traineeSD >= start && traineeSD <= end;
      if (start) return traineeSD >= start;
      if (end) return traineeSD <= end;
  
      return true; // Show all data if no date filters are applied
    });
  
    setFilteredData(filtered);
  };
  
  const exportTableToExcel = () => {
    const reportTitle = "Employee Report";

    const rows = filteredData.map((data) =>
      tableColumns.addTraining.map((col) => data[col.key] || "N/A")
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${reportTitle}`);

    const headerRow = worksheet.addRow(
      tableColumns.addTraining.map((col) => col.header)
    );
    worksheet.columns = tableColumns.addTraining.map((col) => ({
      header: col.header,
      width: col.header.length < 20 ? 20 : col.header.length,
    }));

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 12, color: { argb: "f9f9f9" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "787878" },
      };
      cell.alignment = { horizontal: "left" };
    });

    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${reportTitle}.xlsx`);
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const finalData = filteredData.map((data) => ({
    ...data,
    department: Array.isArray(data.department)
      ? data.department[data.department.length - 1]
      : "-",
    medicalExpiry: formatDate(data.medicalExpiry),
    medicalAppointDate: formatDate(data.medicalAppointDate),
    traineeSD: formatDate(data.traineeSD),
    traineeED: formatDate(data.traineeED),
  }));

  return (
    <section className="bg-[#F8F8F8] w-full">
      <div className=" mx-auto p-5 h-full">

         <div className="w-full flex items-center justify-between gap-5 my-5">
                <Link to="/trainingReq" className="text-xl text-grey">
                  <FaArrowLeft />
                </Link>

          <article className="flex-1 center gap-5 text-dark_grey">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
            Add Employee View
          </h1>
        </article>
        </div>

       <div className="px-4 relative ">
    <div className="absolute z-20 -top-1 flex items-center gap-5">

    <div className=" flex items-center  gap-5 w-full ">
          <div>
            <label htmlFor="start-date" className="block text-[16px] font-medium">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => handleDate(e, "startDate")}
              className="outline-none text-grey border rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-[16px] font-medium">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => handleDate(e, "endDate")}
              className="outline-none text-grey border rounded-md p-2"
            />
          </div>
        </div>
    <div className=" mt-5 vertical-center p-5 ">
          <button
            className="bg-[#FEF116] text-dark_grey w-[126px] p-2 rounded"
            onClick={exportTableToExcel}
          >
            Download
          </button>
        </div>
   

       
    </div>
       </div>

        <TrainVT
          mergering={finalData}
          columns={tableColumns.addTraining}
          popupAll={addTrainingForm}
        />
      </div>
    </section>
  );
};

export default ViewAddEmp;
// import { useState, useEffect, useContext } from "react";
// import { Outlet, Link } from "react-router-dom";
// import { DataSupply } from "../../../utils/DataStoredContext";
// import { FaArrowLeft } from "react-icons/fa6";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import { TrainVT } from "../TableTraining/TrainVT";

// export const ViewAddEmp = () => {
//   const { empPIData, workInfoData, trainingCertifi, AddEmpReq } =
//     useContext(DataSupply);

//   const exportTableToExcel = () => {
//     const reportTitle = "Employee Report";

//     // Extract table header (th) data
//     const selectThead = document.querySelectorAll("table thead tr");
//     const theadData = Array.from(selectThead).map((row) => {
//       const cells = row.querySelectorAll("th");
//       return Array.from(cells).map((thData) => thData.innerText);
//     });

//     // Extract table body (td) data
//     const rows = document.querySelectorAll("table tbody tr");
//     const tableData = Array.from(rows).map((row) => {
//       const cells = row.querySelectorAll("td");
//       return Array.from(cells).map((cell) => cell.innerText);
//     });

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet(`${reportTitle}`);

//     // Add header row
//     const headerRow = worksheet.addRow(theadData[0]);

//     // Dynamically adjust column width based on header length
//     worksheet.columns = theadData[0].map((header) => ({
//       header,
//       width: header.length < 20 ? 20 : header.length,
//     }));

//     headerRow.eachCell((cell) => {
//       cell.font = { bold: true, size: 12, color: { argb: "f9f9f9" } };
//       cell.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "787878" },
//       };
//       cell.alignment = { horizontal: "left" };
//     });

//     tableData.forEach((row) => {
//       worksheet.addRow(row);
//     });

//     worksheet.eachRow((row, rowNumber) => {
//       if (rowNumber !== 1) {
//         row.eachCell((cell) => {
//           cell.font = { size: 12, color: { argb: "FF000000" } };
//           cell.alignment = { horizontal: "left" };
//         });
//       }
//     });

//     // Export the Excel file
//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(blob, `${reportTitle}.xlsx`);
//     });
//   };

//   // Handle download
//   const handleDownloadCSV = () => {
//     exportTableToExcel();
//   };

//   const [mergeData, setMergeData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (empPIData && workInfoData && trainingCertifi && AddEmpReq) {
//       const mergedData = empPIData
//         .map((emp) => {
//           // Find the corresponding AddEmpReq item using empID
//           const addemp = AddEmpReq.find((item) => item.empID === emp.empID);
//           const Workemp = workInfoData.find((item) => item.empID === emp.empID);
//           const TCemp = trainingCertifi.find(
//             (item) => item.empID === emp.empID
//           );

//           if (addemp) {
//             return {
//               ...emp,
//               ...addemp,
//               ...Workemp,
//               ...TCemp,
//             };
//           }
//           return null;
//         })
//         .filter((item) => item !== null); // Remove null values (non-matching empID)

//       const sortedData = mergedData.sort((a, b) =>
//         a.empID.localeCompare(b.empID)
//       );
//       setMergeData(sortedData);
//       setFilteredData(sortedData);
//       setLoading(false);
//     } else {
//       setError("Data not fully available.");
//       setLoading(false);
//     }
//   }, [empPIData, workInfoData, trainingCertifi, AddEmpReq]);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   const tableColumns = {
//     addTraining: [
//       { header: "Employee ID", key: "empID" },
//       { header: "Employee Badge No", key: "empBadgeNo" },
//       { header: "Name", key: "name" },
//       { header: "Department", key: "department" },
//       { header: "Material Requisition ", key: "MRNo" },
//       { header: "Medical Name", key: "medicalName" },
//       { header: "Medical Expiry", key: "medicalExpiry" },
//       { header: "Medical Appointment Date", key: "medicalAppointDate" },
//       { header: "Course", key: "courseCode" },
//       { header: "Course Name", key: "courseName" },
//       { header: "Company", key: "company" },
//       { header: "Start Date", key: "traineeSD" },
//       { header: "End Date", key: "traineeED" },
//       { header: "Status", key: "traineeStatus" },
//       { header: "Training Course Fee", key: "traineeCourseFee" },
//     ],
//   };

//   const addTrainingForm = [
//     { header: "Employee ID", key: "empID" },
//     { header: "Employee Badge No", key: "empBadgeNo" },
//     { header: "Name", key: "name" },
//     { header: "Material Requisition ", key: "MRNo" },
//     { header: "Medical Name", key: "medicalName" },
//     { header: "Medical Expiry", key: "medicalExpiry" },
//     { header: "Medical Appointment Date", key: "medicalAppointDate" },
//     { header: "Course", key: "courseCode" },
//     { header: "Course Name", key: "courseName" },
//     { header: "Company", key: "company" },
//     { header: "Start Date", key: "traineeSD" },
//     { header: "End Date", key: "traineeED" },
//     { header: "Status", key: "traineeStatus" },
//     { header: "Training Course Fee", key: "traineeCourseFee" },
//     { header: "Upload Report", key: "medicalReport" },
//   ];

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A"; // Handle empty or invalid date
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const finalData = mergeData.map((data) => {
//     console.log('Department data:',data.empID, data.department); // Log department for debugging
//     return {
//       ...data,
//       department: Array.isArray(data.department)
//         ? (data.department[data.department.length - 1])
//         : "-",
//       medicalExpiry: formatDate(data.medicalExpiry),
//       medicalAppointDate: formatDate(data.medicalAppointDate),
//       traineeSD: formatDate(data.traineeSD),
//       traineeED: formatDate(data.traineeED),
//     };
//   });
  

//   return (
//     <section className="bg-[#F8F8F8] w-full">
//       <div className="relative mx-auto p-5 h-full">
//         <div className="flex items-center my-5">
//           <Link to="/trainingReq" className="text-xl text-grey">
//             <FaArrowLeft />
//           </Link>
//         </div>

//         <div className="relative flex items-center justify-center gap-10 m-4 text-[16px] font-semibold mt-10">
//           <button className="py-2 px-4 focus:outline-none border-b-4 border-yellow">
//             Add Employee
//           </button>
//         </div>
// <section className="flex items-center justify-center gap-5 w-full ">
//           <div>
//             <label htmlFor="start-date" className="block text-[16px] font-medium">
//               Start Date
//             </label>
//             <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
//               <input
//                 id="start-date"
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => handleDate(e, "startDate")}
//                 className="outline-none text-grey"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="end-date" className="block text-[16px] font-medium">
//               End Date
//             </label>
//             <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
//               <input
//                 id="end-date"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => handleDate(e, "endDate")}
//                 className="outline-none text-grey"
//               />
//             </div>
//           </div>
//         </section>

//         <div className="absolute z-20 top-32 vertical-center p-5 pt-9">
//           <button
//             className="bg-[#FEF116] text-dark_grey text_size_5 w-[126px] p-2 rounded"
//             onClick={handleDownloadCSV}
//           >
//             Download
//           </button>
//         </div>

//         <div>
//           <TrainVT
//             mergering={finalData}
//             columns={tableColumns.addTraining}
//             popupAll={addTrainingForm}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ViewAddEmp;
