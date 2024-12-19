import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../../assets/logo/logo-with-name.svg";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const LeaveSummaryPopUp = ({
  handleClosePopup,
  mergedData,
  empDetails,
  formatDate,
}) => {
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveSummary, setLeaveSummary] = useState({});

  const LeaveDoc = useRef();

  const handleDate = (event, type) => {
    const selectedDate = event.target.value;

    if (type === "startDate") {
      setStartDate(selectedDate);
    } else if (type === "endDate") {
      setEndDate(selectedDate);
    }
  };
  const formattingDate = (date) => {
    const [year, month, day] = date?.split("-");
    const dats = `${day}/${month}/${year}`;
    console.log(dats);

    return `${day}/${month}/${year}`;
  };
  const initializeLeaveType = (total = 0, isSpecialLeave = false) => ({
    
    total: isSpecialLeave ? null : total,
    taken: 0,
    waitingLeave: 0,
    remaining: isSpecialLeave ? null : total,
  });

  const isCurrentYear = (dateStr) => {
    const currentYear = new Date().getFullYear();
    const dateYear = new Date(dateStr).getFullYear();
    return currentYear === dateYear;
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchedData = async () => {
      const result = mergedData.reduce((acc, val) => {
        // console.log(acc[val.empID],val.empPervAnnualLeaveBal);
                
        if (!acc[val.empID]) {
          acc[val.empID] = {
            empId: val.empID,
            employeeName: val.empName,
            empBadgeNo: val.empBadgeNo,
            position: val.position,
            department: val.department,
            doj: val.doj,
            compassionateLeave: initializeLeaveType(Number(val.compassionateLeave), true),
            unPaidAuthozriationLeave: initializeLeaveType(Number(val.unPaidAuthozriationLeave), true),
            annualLeave: initializeLeaveType(Number(val.annualLeave) + Number(val.empPervAnnualLeaveBal || 0)),
            marriageLeave: initializeLeaveType(Number(val.marriageLeave)),
            hospitalisationLeave: initializeLeaveType(Number(val.hospitalLeave)),
            maternityLeave: initializeLeaveType(Number(val.maternityLeave)),
            sickLeave: initializeLeaveType(Number(val.sickLeave)),
            paternityLeave: initializeLeaveType(Number(val.paternityLeave)),
          };
        }
  
        const leaveTypeKeyMap = {
          "Compassionate Leave": "compassionateLeave",
          "Annual Leave": "annualLeave",
          "Marriage Leave": "marriageLeave",
          "Hospitalisation Leave": "hospitalisationLeave",
          "Maternity Leave": "maternityLeave",
          "Sick Leave": "sickLeave",
          "Paternity Leave": "paternityLeave",
          "Unpaid Authorize Leave": "unPaidAuthozriationLeave",
        };
  
        const leaveKey = leaveTypeKeyMap[val.empLeaveType];
        
        const applicationStartDate = formatDate(val.empLeaveStartDate);
        const applicationEndDate = formatDate(val.empLeaveEndDate);

        let shouldProcessLeave = false;

        if (startDate && endDate) {
          // If date filter is applied, check if leave falls within the filter range
          const filterStartDate = formattingDate(startDate);
          const filterEndDate = formattingDate(endDate);
          
          const appStartDate = parseDate(applicationStartDate);
          const appEndDate = parseDate(applicationEndDate);
          const filtStart = parseDate(filterStartDate);
          const filtEnd = parseDate(filterEndDate);

          shouldProcessLeave = appStartDate >= filtStart && appEndDate <= filtEnd;
        } else {
          // If no date filter, only show current year's leaves
          shouldProcessLeave = isCurrentYear(val.empLeaveStartDate);
        }

        if (shouldProcessLeave && leaveKey) {
          if (val.managerStatus === "Approved" && val.empStatus !== "Cancelled") {
            acc[val.empID][leaveKey].taken += val.leaveDays;
          } else if (
            val.managerStatus === "Pending" &&
            val.supervisorStatus !== "Rejected" &&
            val.empStatus !== "Cancelled"
          ) {
            acc[val.empID][leaveKey].waitingLeave += val.leaveDays;
          }

          if (leaveKey !== 'compassionateLeave' && leaveKey !== 'unPaidAuthozriationLeave') {
            acc[val.empID][leaveKey].remaining =
              acc[val.empID][leaveKey].total -
              (acc[val.empID][leaveKey].taken + acc[val.empID][leaveKey].waitingLeave);
          }
        }

        return acc;
      }, {});
  
      const summary = result[empDetails.empID]; // Find the leave summary for the employee
      setLeaveSummary(summary); // Set the leave summary for the employee
    };
  
    fetchedData();
  }, [mergedData, startDate, endDate, empDetails]);
  

  // Define leave types to display
  const leaveTypes = [
    "compassionateLeave",
    "annualLeave",
    "marriageLeave",
    "hospitalisationLeave",
    "maternityLeave",
    "sickLeave",
    "paternityLeave",
    "unPaidAuthozriationLeave"
  ];

  // Format leave type name
  const formatLeaveType = (type) => {
    return type
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handlePrint = useReactToPrint({
    content: () => LeaveDoc.current,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: "print", // This ensures the print view uses a different CSS style
  });

  const downloadPDF = () => {
    const input = document.getElementById("leaveSummary");

    // Temporarily adjust the table container to ensure all content is visible
    const container = input.parentElement;
    const originalHeight = container.style.height;
    container.style.height = "auto"; // Ensure the container is tall enough to show all content

    html2canvas(input, { useCORS: true, scale: 2 })
      .then((canvas) => {
        // Revert the height change
        container.style.height = originalHeight;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Calculate dimensions and scaling
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // Calculate positioning
        const x = (pdfWidth - imgWidth * scale) / 2;
        const y = (pdfHeight - imgHeight * scale) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgWidth * scale, imgHeight * scale);
        pdf.save("products.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error); // Catch any errors
      });
  };

  const handleDownload = () => {
    downloadPDF();
  };

  return (
    <section className="fixed top-0 left-0 bg-grey z-50 w-full h-full flex flex-col items-center justify-center">
    <div className="bg-white w-[80%] center flex-col rounded-xl">
    <div className=" p-6 flex justify-between items-center  gap-5 w-full">
        <section className="flex items-center gap-5">
        <div>
          <label className="block text-[16px] font-medium">Start Date</label>
          <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDate(e, "startDate")}
              className="outline-none text-grey"
            />
          </div>
        </div>
        <div>
          <label className="block text-[16px] font-medium">End Date</label>
          <div className="text_size_5 bg-white border py-2 rounded-md text-grey border-lite_grey flex items-center px-3 gap-2">
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDate(e, "endDate")}
              className="outline-none text-grey"
            />
          </div>
        </div>
        </section>
       <div>
       <p
              className="text-4xl cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              <IoIosCloseCircleOutline />
            </p>
       </div>
      </div>

      <div
        ref={LeaveDoc}
        id="leaveSummary"
        className="bg-white p-6 rounded-lg shadow-lg "
      >
        {/* Header Section */}
        <div className="flex flex-col justify-between items-center mb-4">
          <article className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-1 center">
              <img
                className="max-w-[240px] w-full"
                src={logo}
                alt="logo not found"
              />
            </div>
            {/* Close Icon */}
            
          </article>
          {/* Employee Name */}
          <h2 className="uppercase text-xl text-start w-full font-bold mt-5">
            Leave Summary for {leaveSummary?.employeeName || "N/A"}
          </h2>
        </div>

        <div className="space-y-4 font-semibold">
          {/* Employee Details */}
          <h2 className="uppercase">
            Employee ID: {leaveSummary?.empId || "N/A"}
          </h2>

          <table className="min-w-full bg-white text-sm font-semibold border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-sm">Leave Type</th>
                <th className="border px-4 py-2 text-sm">Total Leave</th>
                <th className="border px-4 py-2 text-sm">Days Taken</th>
                <th className="border px-4 py-2 text-sm">
                  Waiting for Approval
                </th>
                <th className="border px-4 py-2 text-sm">Remaining Leave</th>
              </tr>
            </thead>
            <tbody>
        {Object.entries(leaveSummary)
          .filter(([leaveType]) => leaveTypes.includes(leaveType))
          .map(([leaveType, details]) => (
            <tr key={leaveType}>
              <td className="border px-4 py-2">{formatLeaveType(leaveType)}</td>
              <td className="border px-4 text-center py-2">
                {leaveType === 'compassionateLeave' || leaveType === 'unPaidAuthozriationLeave' 
                  ? '-' 
                  : (details.total || 0)}
              </td>
              <td className="border px-4 text-center py-2">{details.taken || 0}</td>
              <td className="border px-4 text-center py-2">
                {details.waitingLeave || 0}
              </td>
              <td className="border px-4 text-center py-2">
                {leaveType === 'compassionateLeave' || leaveType === 'unPaidAuthozriationLeave'
                  ? '-'
                  : (details.remaining !== undefined && details.remaining >= 0
                      ? details.remaining
                      : 0)}
              </td>
            </tr>
          ))}
      </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center gap-40 py-5 ">
      <button                   className="border-primary border-2 bg-white text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
 onClick={handleDownload}>Download</button>
      <button                   className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2"
 onClick={handlePrint} >Print</button>
    
      </div>
    </div>
    </section>
  );
};
