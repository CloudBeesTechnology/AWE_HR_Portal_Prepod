import { jsPDF } from "jspdf";
import "jspdf-autotable";
import tableLogo from "../../../assets/logo/aweLogo.png";
import checkboxicon from "../../../assets/timeSheet/viewSummaryIcons/checkmark.png";
import streamSaver from 'streamsaver';

// Polyfill for StreamSaver in older browsers
streamSaver.mitm = "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0";

const PDFGenerator = () => null;

// Convert image to base64
const getImageBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
};

// Function to prepare data for PDF generation (same as preparePrintRows)
const preparePrintRows = (
  rows = [],
  startDate,
  dayCounts,
  calculateTotalWorkingHours,
  calculateTotalAbsence,
  getStartDate
) => {
  return (rows || []).map((employee, idx) => {
    // 1) Total OT (same logic as in your render)
    const addAllOT = Object.values(employee?.OVERTIMEHRS || {}).reduce(
      (acc, ot) => acc + parseFloat(ot || 0),
      0
    );
    const totalOT = addAllOT.toFixed(2);

    // 2) Total working hours (use your helper)
    const getTotalHours = calculateTotalWorkingHours(employee) || 0;
    const totalHours = Number(getTotalHours) || 0;

    // 3) Normal days (same as render, guard divide by zero)
    const getLastIndexOfNWhrs =
      Array.isArray(employee?.workHrs) && employee?.workHrs.length > 0
        ? employee?.workHrs[employee?.workHrs.length - 1]
        : employee?.workHrs || "0";

    const NWHPD = parseFloat(getLastIndexOfNWhrs) || 0;
    const NormalDays = NWHPD ? Number(totalHours) / NWHPD : 0;

    // 4) PH-D logic (same as in render)
    const getLastWorkHr = parseFloat(employee?.workHrs?.at(-1) || "0");
    const getLastWorkMonth = parseFloat(employee?.workMonth?.at(-1) || "0");
    const calculatedPHD =
      getLastWorkHr === 8 && getLastWorkMonth === 24
        ? parseFloat(employee.hollydayCounts?.PHD || 0) / 2
        : employee.hollydayCounts?.PHD || 0;

    // 5) Total Absence (use your helper)
    const totalAbsence = calculateTotalAbsence(employee, getLastIndexOfNWhrs);
    const roundedTotalAbsentiesHrs = Number(
      parseFloat(totalAbsence || 0).toFixed(2)
    );

    // 6) Verified check (build same checkVerifiedAll map)
    const checkVerifiedAll = Array.from({ length: dayCounts }, (_, i) => {
      const currentDay = new Date(getStartDate);
      currentDay.setDate(getStartDate.getDate() + i);
      const formattedDate = `${currentDay.getDate()}-${
        currentDay.getMonth() + 1
      }-${currentDay.getFullYear()}`;
      const isVerified = employee?.getVerify?.[formattedDate] || "";
      return { date: formattedDate, value: isVerified };
    }).reduce((acc, { date, value }) => {
      acc[date] = value;
      return acc;
    }, {});

    const allFieldsYes = Object.values(checkVerifiedAll).every(
      (v) => v === "Yes"
    );

    // 7) AL + CL
    const totalOfALCL =
      parseFloat(employee?.empLeaveCount?.AL || 0) +
        parseFloat(employee?.empLeaveCount?.CL || 0) || 0;

    // 8) Timekeeper unique name
    const timeKeeperName = [...new Set(employee?.timeKeeper || [])].filter(
      (n) => n !== null
    );
    const uniqueTimeKeeperName = timeKeeperName.join(", ");

    // return augmented employee
    return {
      ...employee,
      __totalOT: totalOT,
      __totalHours: totalHours,
      __NormalDays: NormalDays,
      __calculatedPHD: calculatedPHD,
      __roundedTotalAbsentiesHrs: roundedTotalAbsentiesHrs,
      __allFieldsYes: allFieldsYes,
      __totalOfALCL: totalOfALCL,
      __uniqueTimeKeeperName: uniqueTimeKeeperName,
      __uiIndex: idx,
    };
  });
};

// Main function that accepts data directly instead of DOM element
export const DownloadExcelPDFData = async (
  allExcelSheetData,
  dayCounts,
  startDate,
  formattedStartDate,
  formattedEndDate,
  location,
  calculateTotalWorkingHours,
  calculateTotalAbsence,
  getStartDate,
  // Add progress callback parameter
  onProgress = () => {},
  setShowDownloadModal
) => {
  try {
    console.log(
      `[🔄] Processing dataset with ${
        allExcelSheetData?.length || 0
      } employees...`
    );

    // Report initial progress
    onProgress(10, "Preparing data...");

    // Prepare data for PDF generation (same logic as preparePrintRows)
    const rowsForPDF = preparePrintRows(
      allExcelSheetData,
      startDate,
      dayCounts,
      calculateTotalWorkingHours,
      calculateTotalAbsence,
      getStartDate
    );

    onProgress(20, "Data prepared, initializing Web Worker...");

    console.log("rowsForPDF : ", rowsForPDF);
    
    // Create Web Worker using the external file
    const worker = new Worker(new URL('../workers/pdfWorker.js', import.meta.url));
    
    // Convert logo to base64 for the worker
    const tableLogoBase64 = await getImageBase64(tableLogo);
    
    // Handle messages from worker
    worker.onmessage = async (event) => {
      const { type, progress, message, arrayBuffer, filename, error } = event.data;
      
      switch (type) {
        case 'progress':
          onProgress(progress, message);
          break;
        case 'complete':
          // Use StreamSaver for efficient download
          onProgress(95, "Streaming file to disk...");
          
          const fileStream = streamSaver.createWriteStream(filename);
          const writer = fileStream.getWriter();
          
          try {
            const uint8Array = new Uint8Array(arrayBuffer);
            await writer.write(uint8Array);
            writer.close();
            onProgress(100, "Download complete!");
            
            // Clean up
            worker.terminate();
            
            setTimeout(() => {
              setShowDownloadModal(false);
            }, 2000);
          } catch (err) {
            console.error("Error writing file:", err);
            writer.abort();
            worker.terminate();
            throw err;
          }
          break;
        case 'error':
          console.error("Worker error:", error);
          worker.terminate();
          throw new Error(error);
      }
    };
    
    // Send data to worker
    worker.postMessage({
      type: 'GENERATE_PDF',
      data: {
        rows: rowsForPDF,
        dayCounts,
        startDate: startDate.toISOString(), // Convert to ISO string for serialization
        formattedStartDate,
        formattedEndDate,
        location,
        tableLogoBase64
        // Removed checkboxBase64 to improve performance
      }
    });
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    throw error;
  }
};

export default PDFGenerator;