import React, { useEffect, useState, useRef } from "react";
import { FilterTable } from "./FilterTable";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ContractFormPDF } from "./ContractFormPDF";
import { useLocation } from "react-router-dom";

export const ContractPDF = () => {
  const location = useLocation();
  const { allData,title } = location.state || {}; 
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Employee Badge No",
    "Name",
    "Nationality",
    "Date of Join",
    "Department",
    "Work Position",
    "Contract Start Date ",
    "Contract End Date",
    // "LD Expiry",
    // "Duration of Renewal Contract",
  ]);
  const contentRef = useRef();
  const [showContractPDF, setShowContractPDF] = useState(true); // Create a ref for the PDF content


  const formatDate = (date, type) => {
    console.log(date, type);
  
    // Handle array of dates
    if (Array.isArray(date)) {
      if (date.length === 0) return "-"; // Handle empty arrays
      const lastDate = date[date.length - 1]; // Get the last element
      return formatDate(lastDate, type); // Recursively format the last date
    }
  
    // Handle single date
    if (!date) return "-"; // Handle empty or invalid dates
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-"; // Handle invalid date strings
  
    // Format date as dd-mm-yyyy
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Days are zero-based
    const year = parsedDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  const calculateTotalMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "-";
    }
  
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };
  
  const calculateBalanceMonths = (startDate, endDate) => {
    const today = new Date();
    const totalMonths = calculateTotalMonths(startDate, endDate);
    const completedMonths = calculateTotalMonths(startDate, today);
  
    if (typeof totalMonths === "string" || typeof completedMonths === "string") {
      return "-";
    }
  
    const balanceMonths = totalMonths - completedMonths;
    return (balanceMonths >= 0 && balanceMonths !== 0) ? `${balanceMonths} months` : "Few days more";
  };
  
  const contractExpiryMergedData = (data) => {
    const today = new Date();
  
    // Start date should be the first day of the next month (excluding current month)
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    
    // End date should be the last day of the second month after today
    const endOfTwoMonthsAfter = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  
    return data
      .filter((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        if (!lastDate) return false;
  
        const contractEnd = new Date(lastDate);
  
        // Check if the contractEndDate is between the start of next month and the last day of two months after today
        return contractEnd >= startOfNextMonth && contractEnd <= endOfTwoMonthsAfter;
      })
      .map((item) => {
        const contractEndDates = item.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const contractStartDates = item.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];
  
        // const balanceMonths = calculateBalanceMonths(startDate, lastDate);
  
        return {
          empID: item.empID || "-",
          empBadgeNo: item.empBadgeNo || "-",
          name: item.name || "-",
          nationality: item.nationality || "-",
          doj: formatDate(item.doj) || "-",
          department: item.department || "-",
          position: item.position || "-",
          contractStartDate: formatDate(startDate) || "-",
          contractEndDate: formatDate(lastDate) || "-",
        };
      });
  };
  

  useEffect(() => {
    setTableBody(contractExpiryMergedData(allData));
  }, [allData]);
  // console.log(tableBody);
  const exportToPDF = () => {
    const doc = new jsPDF("landscape"); // Landscape orientation for wide tables
  
    // Add the title
    doc.setFontSize(16);
    doc.text(
      "Contract Completion Form for the Month of January 2024",
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );
  
   // Extract "Attn:" input value
const attnInput = document.querySelector('input[type="text"]').value;
doc.setFontSize(12);
doc.text(`Attn: ${attnInput}`, 14, 40); // Adjust the Y position as needed

// Add a line below the "Attn:" text
const lineYPosition = 40; // Adjust this value based on your layout
doc.setDrawColor(0, 0, 0); // Set line color to black (RGB)
doc.line(25, lineYPosition, 100, lineYPosition);

    // Add the table data
    const selectThead = document.querySelectorAll("table thead tr");
    const theadData = Array.from(selectThead).map((row) => {
      const cell = row.querySelectorAll("th");
      return Array.from(cell).map((thData) => thData.innerText);
    });
  
    const rows = document.querySelectorAll("table tbody tr");
    const tableData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map((cell) =>
        cell.querySelector("input")
          ? cell.querySelector("input").value
          : cell.innerText
      );
    });
  
    doc.autoTable({
      head: theadData,
      body: tableData,
      startY: 50, // Start below the "Attn" section
      styles: {
        cellWidth: "auto",
        overflow: "linebreak",
      },
    });
  
    // Add Notes section after the table
    doc.setFontSize(11);
    const finalY = doc.lastAutoTable.finalY + 12; // Adjust finalY to position below the table
    doc.text(
      "Notes: Deadline return to HRD after one week from the date received of Contract Completion Report",
      14,
      finalY
    );
  
    // Add the footer
    doc.setFontSize(10);
    const footerY = finalY + 25; // Adjust footerY for positioning after notes
    doc.text("Recommended By:", 40, footerY);
    doc.text("Acknowledged & Checked By:", 130, footerY);
    doc.text("Approved By:", 230, footerY);
  
    // Add signature lines
    doc.line(30, footerY + 10, 85, footerY + 10); // Recommended by line
    doc.line(120, footerY + 10, 190, footerY + 10); // Acknowledged by line
    doc.line(220, footerY + 10, 265, footerY + 10); // Approved by line
  
    // Add titles below the lines
    doc.setFontSize(11);
    doc.text("Department Head", 40, footerY + 20);
    doc.text("HRM", 150, footerY + 20);
    doc.text("GM", 238, footerY + 20);
  
    // Download the PDF
    doc.save("contract_completion_form.pdf");
  };
  

  const downloadingCFPdf = () => {
    console.log("dnfnjdbf");
    if (showContractPDF === true) {
      <ContractFormPDF contentRef={contentRef} />;
      exportToPDF();
    }
  };
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleViewDetails = (personData) => {
    setSelectedPerson(personData); // Set the selected person's data
  };

  const closeModal = () => {
    setSelectedPerson(null); // Reset the selected person to hide the modal
  };
  const handleDate = (e, type) => {
    const value = e.target.value;
  
    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);
  
    const start = type === "startDate" ? new Date(value) : startDate ? new Date(startDate) : null;
    const end = type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;
  
    const filtered = allData.filter((data) => {
      const expiryArray = data?.contractEnd || [];
      const expiryDate = expiryArray.length
        ? new Date(expiryArray[expiryArray.length - 1])
        : null;
  
      if (!expiryDate || isNaN(expiryDate.getTime())) return false;
  
      if (start && end) return expiryDate >= start && expiryDate <= end;
      if (start) return expiryDate >= start;
      if (end) return expiryDate <= end;
  
      return true;
    }).map((item) => {
      const contractEndDates = item.contractEnd || [];
      const lastDate = contractEndDates[contractEndDates.length - 1];
      const contractStartDates = item.contractStart || [];
      const startDate = contractStartDates[contractStartDates.length - 1];

  
      return {
        empID: item.empID || "-",
        empBadgeNo: item.empBadgeNo || "-",
        name: item.name || "-",
        nationality: item.nationality || "-",
        doj: formatDate(item.doj) || "-",
        department: item.department || "-",
        position: item.position || "-",
        contractStartDate: formatDate(startDate) || "-",
        contractEndDate: formatDate(lastDate) || "-",      
      };
    });
  
    setFilteredData(filtered);
  };

  return (
    <div>
      <FilterTable
            tableBody={filteredData.length ? filteredData : tableBody}
            tableHead={tableHead}
            title={title}
            handleDate={handleDate}
            />
      <div className="vertical-center p-5 pt-9 ">
        <button
          className=" bg-[#FEF116] text-dark_grey text_size_5 w-[126px] p-2 rounded"
          onClick={downloadingCFPdf}
        >
          Download
        </button>
      </div>
    </div>
  );
};
