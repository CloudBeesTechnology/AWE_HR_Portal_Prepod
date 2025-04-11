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
       
// console.log(addemp?.empID,addemp?.createdAt,"addemp");

          if (addemp&& addemp?.createdAt) {
            return {
              ...emp,
              ...addemp,
              ...Workemp,
             treqCreatedAt: addemp?.createdAt,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
// console.log(mergedData);

      setMergeData(mergedData);
      setFilteredData(mergedData);
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
      { header: "Material Requisition", key: "MRNo" },
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
    { header: "Department", key: "department" },
    { header: "Position", key: "position" },
  ];

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

    const filtered = mergeData.filter((data) => {
      // Get traineeSD from traineeTrack (using the LAST item in the array)
      let traineeStartDate = null;
      let traineeEndDate = null;
      
      try {
        if (data.traineeTrack && data.traineeTrack.length > 0) {
          // Get the last element of traineeTrack array
          const lastTrackItem = data.traineeTrack[data.traineeTrack.length - 1];
          const track = JSON.parse(lastTrackItem);
          
          // console.log(track[track.length - 1]);
          if (Array.isArray(track)) {
            const lastTrack = track[track.length - 1];
            if (lastTrack?.traineeSD) {
              traineeStartDate = new Date(lastTrack.traineeSD);
            }
            if (lastTrack?.traineeED) {
              traineeEndDate = new Date(lastTrack.traineeED); // Get end date
            }
          } else {
            
            if (track.traineeSD) {
              traineeStartDate = new Date(track.traineeSD); // Get start date
            }
            if (track.traineeED) {
              traineeEndDate = new Date(track.traineeED); // Get end date
            }
        }
        }
      } catch (e) {
        console.error("Error parsing traineeTrack:", e);
      }

      if (!traineeStartDate || !traineeEndDate) return false;


      if (start && end)
        return traineeStartDate >= start && traineeEndDate <= end;
      if (start) {
        return traineeStartDate >= start && traineeEndDate >= start; // Ensure both dates are within the start date
      }
      if (end) {
        return traineeStartDate <= end && traineeEndDate <= end; // Ensure both dates are within the end date
      }

      return true;
    });
console.log(filtered);

    setFilteredData(filtered);
  };

  const exportTableToExcel = () => {
    const reportTitle = "Employee Report";
  
    // Prepare all rows including all traineeTrack records
    const allRows = [];
    
    filteredData.forEach((data) => {
      // Get basic employee info
      const employeeInfo = {
        empID: data.empID || "N/A",
        empBadgeNo: data.empBadgeNo || "N/A",
        name: data.name || "N/A",
        department: Array.isArray(data.department) 
          ? data.department[data.department.length - 1] 
          : data.department || "N/A",
      };
  
      // Parse traineeTrack if it exists
      let trackRecords = [];
      try {
        if (data.traineeTrack && data.traineeTrack.length > 0) {
          // Parse each traineeTrack item (some might be arrays)
          data.traineeTrack.forEach(trackItem => {
            const parsed = JSON.parse(trackItem);
            if (Array.isArray(parsed)) {
              trackRecords.push(...parsed); 
            } else {
              trackRecords.push(parsed); 
            }
          });
        }
      } catch (e) {
        console.error("Error parsing traineeTrack:", e);
      }
  
      // If no track records, add one row with basic info
      if (trackRecords.length === 0) {
        allRows.push({
          ...employeeInfo,
          MRNo: "N/A",
          medicalName: "N/A",
          medicalExpiry: "N/A",
          medicalAppointDate: "N/A",
          courseCode: "N/A",
          courseName: "N/A",
          company: "N/A",
          traineeSD: "N/A",
          traineeED: "N/A",
          traineeStatus: "N/A",
          traineeCourseFee: "N/A",
        });
      } else {
        // Add a row for each track record
        trackRecords.forEach(track => {
          allRows.push({
            ...employeeInfo,
            MRNo: track.MRNo || "N/A",
            medicalName: track.medicalName || "N/A",
            medicalExpiry: formatDate(track.medicalExpiry),
            medicalAppointDate: formatDate(track.medicalAppointDate),
            courseCode: track.courseCode || "N/A",
            courseName: track.courseName || "N/A",
            company: track.company || "N/A",
            traineeSD: formatDate(track.traineeSD),
            traineeED: formatDate(track.traineeED),
            traineeStatus: track.traineeStatus || "N/A",
            traineeCourseFee: track.traineeCourseFee || "N/A",
          });
        });
      }
    });
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${reportTitle}`);
  
    // Add headers
    const headerRow = worksheet.addRow(
      tableColumns.addTraining.map((col) => col.header)
    );
    
    // Set column widths
    worksheet.columns = tableColumns.addTraining.map((col) => ({
      header: col.header,
      width: col.header.length < 20 ? 20 : col.header.length,
    }));
  
    // Style headers
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 12, color: { argb: "f9f9f9" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "787878" },
      };
      cell.alignment = { horizontal: "left" };
    });
  
    // Add data rows
    allRows.forEach((row) => {
      worksheet.addRow(
        tableColumns.addTraining.map(col => row[col.key] || "N/A")
      );
    });
  
    // Generate and download the file
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
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const finalData = filteredData
    .sort((a, b) => new Date(b.treqCreatedAt) - new Date(a.treqCreatedAt))
    .map((data) => {

      // Parse traineeTrack to get the training details
      let traineeDetails = {
        MRNo: "N/A",
        medicalName: "N/A",
        medicalExpiry: "N/A",
        medicalAppointDate: "N/A",
        courseCode: "N/A",
        courseName: "N/A",
        company: "N/A",
        traineeSD: "N/A",
        traineeED: "N/A",
        traineeStatus: "N/A",
        traineeCourseFee: "N/A",
      };
// console.log(data.empID,data?.tcCreatedAt,filteredData);

      try {
        if (data.traineeTrack && data.traineeTrack[0]) {
          const track = JSON.parse(data.traineeTrack[0]);
          let lastTrack = track;

          if (Array.isArray(track)) {
            lastTrack = track[track.length - 1];
          }

          if (lastTrack) {
            traineeDetails = {
              MRNo: lastTrack.MRNo || "N/A",
              medicalName: lastTrack.medicalName || "N/A",
              medicalExpiry: formatDate(lastTrack.medicalExpiry),
              medicalAppointDate: formatDate(lastTrack.medicalAppointDate),
              courseCode: lastTrack.courseCode || "N/A",
              courseName: lastTrack.courseName || "N/A",
              company: lastTrack.company || "N/A",
              traineeSD: formatDate(lastTrack.traineeSD),
              traineeED: formatDate(lastTrack.traineeED),
              traineeStatus: lastTrack.traineeStatus || "N/A",
              traineeCourseFee: lastTrack.traineeCourseFee || "N/A",
            };
          }
        }
      } catch (e) {
        console.error("Error parsing traineeTrack:", e);
      }

      return {
        ...data,
        empID: data.empID || "-",
        empBadgeNo: data.empBadgeNo || "-",
        name: data.name || "-",
        department: Array.isArray(data.department)
          ? data.department[data.department.length - 1]
          : "-",
        ...traineeDetails,
      };
    });

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
                <label
                  htmlFor="start-date"
                  className="block text-[16px] font-medium"
                >
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
                <label
                  htmlFor="end-date"
                  className="block text-[16px] font-medium"
                >
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
