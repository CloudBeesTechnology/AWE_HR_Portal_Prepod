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

  const exportTableToExcel = () => {
    const reportTitle = "Employee Report";

    // Extract table header (th) data
    const selectThead = document.querySelectorAll("table thead tr");
    const theadData = Array.from(selectThead).map((row) => {
      const cells = row.querySelectorAll("th");
      return Array.from(cells).map((thData) => thData.innerText);
    });

    // Extract table body (td) data
    const rows = document.querySelectorAll("table tbody tr");
    const tableData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map((cell) => cell.innerText);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${reportTitle}`);

    // Add header row
    const headerRow = worksheet.addRow(theadData[0]);

    // Dynamically adjust column width based on header length
    worksheet.columns = theadData[0].map((header) => ({
      header,
      width: header.length < 20 ? 20 : header.length,
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

    tableData.forEach((row) => {
      worksheet.addRow(row);
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        row.eachCell((cell) => {
          cell.font = { size: 12, color: { argb: "FF000000" } };
          cell.alignment = { horizontal: "left" };
        });
      }
    });

    // Export the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${reportTitle}.xlsx`);
    });
  };

  // Handle download
  const handleDownloadCSV = () => {
    exportTableToExcel();
  };

  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (empPIData && workInfoData && trainingCertifi && AddEmpReq) {
      const mergedData = empPIData
        .map((emp) => {
          // Find the corresponding AddEmpReq item using empID
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
        .filter((item) => item !== null); // Remove null values (non-matching empID)

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const finalData = mergeData.map((data) => {
    console.log('Department data:',data.empID, data.department); // Log department for debugging
    return {
      ...data,
      department: Array.isArray(data.department)
        ? (data.department[data.department.length - 1])
        : "-",
      medicalExpiry: formatDate(data.medicalExpiry),
      medicalAppointDate: formatDate(data.medicalAppointDate),
      traineeSD: formatDate(data.traineeSD),
      traineeED: formatDate(data.traineeED),
    };
  });
  

  return (
    <section className="bg-[#F8F8F8] w-full">
      <div className="relative mx-auto p-5 h-full">
        <div className="flex items-center my-5">
          <Link to="/trainingReq" className="text-xl text-grey">
            <FaArrowLeft />
          </Link>
        </div>

        <div className="relative flex items-center justify-center gap-10 m-4 text-[16px] font-semibold mt-10">
          <button className="py-2 px-4 focus:outline-none border-b-4 border-yellow">
            Add Employee
          </button>
        </div>

        <div className="absolute z-20 top-32 vertical-center p-5 pt-9">
          <button
            className="bg-[#FEF116] text-dark_grey text_size_5 w-[126px] p-2 rounded"
            onClick={handleDownloadCSV}
          >
            Download
          </button>
        </div>

        <div>
          <TrainVT
            mergering={finalData}
            columns={tableColumns.addTraining}
            popupAll={addTrainingForm}
          />
        </div>
      </div>
    </section>
  );
};

export default ViewAddEmp;
