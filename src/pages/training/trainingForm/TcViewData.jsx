import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa6";
import { CertifyTable } from "../TableTraining/CertifyTable";

export const TcViewData = () => {
  const { empPIData, trainingCertifi, AddEmpReq, workInfoData } =
    useContext(DataSupply);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tableColumns = {
    trainCertifi: [
      { header: "Employee ID", key: "empID" },
      { header: "Employee Badge No", key: "empBadgeNo" },
      { header: "Name", key: "name" },
      { header: "Purchase Order", key: "poNo" },
      { header: "Certificate Expiry", key: "certifiExpiry" },
      { header: "E-certificate Date", key: "eCertifiDate" },
      { header: "Original Certificate Date", key: "orgiCertifiDate" },
    ],
  };

  const addTCForm = [
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
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

          if (TCemp && TCemp?.createdAt) {
            return {
              ...emp,
              ...addemp,
              ...Workemp,
              ...TCemp,
              CertifyCreatedAt: TCemp?.createdAt,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      const sortedData = mergedData.sort((a, b) =>
        a.empID.localeCompare(b.empID)
      );

      const filtered = sortedData.filter((data) => {
        const departmentArray = Array.isArray(data.department)
          ? data.department
          : [];
        const lastDepartment =
          departmentArray.length > 0 &&
          typeof departmentArray[departmentArray.length - 1] === "string"
            ? departmentArray[departmentArray.length - 1].trim().toLowerCase()
            : "";
        return lastDepartment !== "blng" && lastDepartment !== "offshore";
      });

      setMergeData(filtered);
      setFilteredData(filtered);
      setLoading(false);
    } else {
      setError("Data not fully available.");
      setLoading(false);
    }
  }, [empPIData, workInfoData, trainingCertifi, AddEmpReq]);

  // Filter data when startDate or endDate changes

  // useEffect(() => {
  //   if (!mergeData.length) return;
    
  //   // Parse filter dates (input format is YYYY-MM-DD from date inputs)
  //   const start = startDate ? new Date(startDate) : null;
  //   const end = endDate ? new Date(endDate) : null;
    
  //   if (!start && !end) {
  //     setFilteredData(mergeData);
  //     return;
  //   }
  
  //   const filtered = mergeData.filter((data) => {
  //     // First filter by work status (if needed)
  //     if (Array.isArray(data?.workStatus) && data?.workStatus.length > 0) {
  //       const lastWorkStatus = data.workStatus[data.workStatus.length - 1];
  //       if (
  //         lastWorkStatus.toUpperCase() === "TERMINATION" ||
  //         lastWorkStatus.toUpperCase() === "RESIGNATION"
  //       ) {
  //         return false;
  //       }
  //     }
  
  //     let certifiExpiryDate = null;
    
  //     try {
  //       if (data.trainingProof && data.trainingProof.length > 0) {
  //         const lastProofItem = data.trainingProof[data.trainingProof.length - 1];
  //         const proof = JSON.parse(lastProofItem);
    
  //         if (Array.isArray(proof)) {
  //           const lastProof = proof[proof.length - 1];
  //           if (lastProof?.certifiExpiry) {
  //             certifiExpiryDate = new Date(lastProof.certifiExpiry);
  //           }
  //         } else if (proof?.certifiExpiry) {
  //           // Handle case where proof is not an array but has certifiExpiry
  //           certifiExpiryDate = new Date(proof.certifiExpiry);
  //         }
  //       }
  //     } catch (e) {
  //       console.error("Error parsing trainingProof:", e);
  //     }
    
  //     if (!certifiExpiryDate || isNaN(certifiExpiryDate.getTime())) return false;
  
  //     // Normalize dates to midnight for accurate comparison
  //     const normalizeDate = (date) => {
  //       const d = new Date(date);
  //       d.setHours(0, 0, 0, 0);
  //       return d;
  //     };
  
  //     const normalizedExpiry = normalizeDate(certifiExpiryDate);
  //     const normalizedStart = start ? normalizeDate(start) : null;
  //     const normalizedEnd = end ? normalizeDate(end) : null;
  
  //     // Single day selection
  //     if (normalizedStart && normalizedEnd && normalizedStart.getTime() === normalizedEnd.getTime()) {
  //       return normalizedExpiry.getTime() === normalizedStart.getTime();
  //     }
      
  //     // Date range selection
  //     if (normalizedStart && normalizedEnd) {
  //       return normalizedExpiry >= normalizedStart && normalizedExpiry <= normalizedEnd;
  //     }
      
  //     // Only start date
  //     if (normalizedStart) return normalizedExpiry >= normalizedStart;
      
  //     // Only end date
  //     if (normalizedEnd) return normalizedExpiry <= normalizedEnd;
  
  //     return true;
  //   });
    
  //   setFilteredData(filtered);
  // }, [startDate, endDate, mergeData]);

  useEffect(() => {
    console.log('[Filter] Effect triggered', { startDate, endDate, mergeDataLength: mergeData.length });
  
    if (!mergeData.length) {
      console.log('[Filter] No mergeData available');
      return;
    }
    
    // Parse filter dates
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    console.log('[Filter] Parsed dates', { 
      start: start?.toISOString(), 
      end: end?.toISOString() 
    });
    
    if (!start && !end) {
      console.log('[Filter] No date filters - returning all data');
      setFilteredData(mergeData);
      return;
    }
  
    console.log('[Filter] Starting filtering process...');
    const filtered = mergeData.filter((data, index) => {
      console.group(`[Filter] Processing record ${index} - EmpID: ${data.empID}`);
      
      // Work status check
      if (Array.isArray(data?.workStatus) && data?.workStatus.length > 0) {
        const lastWorkStatus = data.workStatus[data.workStatus.length - 1];
        console.log('[Filter] Work status:', lastWorkStatus);
        
        if (
          lastWorkStatus.toUpperCase() === "TERMINATION" ||
          lastWorkStatus.toUpperCase() === "RESIGNATION"
        ) {
          console.log('[Filter] Excluded - terminated/resigned');
          console.groupEnd();
          return false;
        }
      }
  
      // Parse training proof
      let certifiExpiryDate = null;
      try {
        if (data.trainingProof && data.trainingProof.length > 0) {
          console.log('[Filter] Training proof exists, length:', data.trainingProof.length);
          const lastProofItem = data.trainingProof[data.trainingProof.length - 1];
          console.log('[Filter] Last proof item:', lastProofItem);
          
          const proof = JSON.parse(lastProofItem);
          console.log('[Filter] Parsed proof:', proof);
  
          if (Array.isArray(proof)) {
            console.log('[Filter] Proof is array, length:', proof.length);
            const lastProof = proof[proof.length - 1];
            if (lastProof?.certifiExpiry) {
              certifiExpiryDate = new Date(lastProof.certifiExpiry);
              console.log('[Filter] Got expiry date from array proof:', certifiExpiryDate);
            }
          } else if (proof?.certifiExpiry) {
            certifiExpiryDate = new Date(proof.certifiExpiry);
            console.log('[Filter] Got expiry date from object proof:', certifiExpiryDate);
          }
        } else {
          console.log('[Filter] No training proof available');
        }
      } catch (e) {
        console.error('[Filter] Error parsing trainingProof:', e);
      }
      
      if (!certifiExpiryDate || isNaN(certifiExpiryDate.getTime())) {
        console.log('[Filter] No valid expiry date - excluding');
        console.groupEnd();
        return false;
      }
  
      // Date normalization and comparison
      const normalizeDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
      };
  
      const normalizedExpiry = normalizeDate(certifiExpiryDate);
      const normalizedStart = start ? normalizeDate(start) : null;
      const normalizedEnd = end ? normalizeDate(end) : null;
      
      console.log('[Filter] Normalized dates:', {
        expiry: normalizedExpiry.toISOString(),
        start: normalizedStart?.toISOString(),
        end: normalizedEnd?.toISOString()
      });
  
      // Single day selection
      if (normalizedStart && normalizedEnd && normalizedStart.getTime() === normalizedEnd.getTime()) {
        const isMatch = normalizedExpiry.getTime() === normalizedStart.getTime();
        console.log('[Filter] Single day check:', isMatch);
        console.groupEnd();
        return isMatch;
      }
      
      // Date range selection
      if (normalizedStart && normalizedEnd) {
        const isInRange = normalizedExpiry >= normalizedStart && normalizedExpiry <= normalizedEnd;
        console.log('[Filter] Date range check:', isInRange);
        console.groupEnd();
        return isInRange;
      }
      
      // Only start date
      if (normalizedStart) {
        const isAfterStart = normalizedExpiry >= normalizedStart;
        console.log('[Filter] Start date only check:', isAfterStart);
        console.groupEnd();
        return isAfterStart;
      }
      
      // Only end date
      if (normalizedEnd) {
        const isBeforeEnd = normalizedExpiry <= normalizedEnd;
        console.log('[Filter] End date only check:', isBeforeEnd);
        console.groupEnd();
        return isBeforeEnd;
      }
  
      console.log('[Filter] No date conditions - including');
      console.groupEnd();
      return true;
    });
    
    console.log('[Filter] Filtering complete. Results:', {
      totalRecords: mergeData.length,
      filteredCount: filtered.length,
      filteredRecords: filtered.map(f => ({
        empID: f.empID,
        name: f.name,
        certifiExpiry: f.trainingProof?.[f.trainingProof.length - 1]?.certifiExpiry
      }))
    });
    
    setFilteredData(filtered);
  }, [startDate, endDate, mergeData]);
  
  const safeParseData = (data) => {
    try {
  
      let raw;
      if (Array.isArray(data)) {
        raw = data[0];
      } else {
        raw = data;
      }
  
      if (typeof raw === "string" && raw.startsWith('"') && raw.endsWith('"')) {
        raw = JSON.parse(raw);
      }
  
      const fixedJSON = raw.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
  
      const parsed = JSON.parse(fixedJSON);
  
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Error normalizing traineeTrackData:", error);
      return [];
    }
  };
  
  const finalData = filteredData
    .sort((a, b) => new Date(b.CertifyCreatedAt) - new Date(a.CertifyCreatedAt))
    .map((data) => {
  
      let certifiExpiry = "N/A";
      let eCertifiDate = "N/A";
      let orgiCertifiDate = "N/A";
      let poNo = "N/A";
  
      try {
        if (data.trainingProof && data.trainingProof) {
  
          const proof = safeParseData(data.trainingProof);
  
          let lastProof = proof;
  
          if (Array.isArray(proof)) {
            lastProof = proof[proof.length - 1];
          }
  
          if (lastProof) {
            certifiExpiry = lastProof.certifiExpiry
              ? formatDate(lastProof.certifiExpiry)
              : "N/A";
            eCertifiDate = lastProof.eCertifiDate
              ? formatDate(lastProof.eCertifiDate)
              : "N/A";
            orgiCertifiDate = lastProof.orgiCertifiDate
              ? formatDate(lastProof.orgiCertifiDate)
              : "N/A";
            poNo = lastProof.poNo || "N/A";
          }
        } else {
          console.log("No valid trainingProof found for this entry.");
        }
      } catch (e) {
        console.error("Error parsing trainingProof:", e);
      }
  
      const finalEntry = {
        ...data,
        empID: data.empID || "-",
        empBadgeNo: data.empBadgeNo || "-",
        name: data.name || "-",
        certifiExpiry,
        eCertifiDate,
        orgiCertifiDate,
        poNo,
        department: Array.isArray(data.department)
          ? data.department[data.department.length - 1]
          : "-",
        position: Array.isArray(data.position)
          ? data.position[data.position.length - 1]
          : "-",
      };
  
      return finalEntry;
    });
  
  return (
    <section className="bg-[#F8F8F8] mx-auto p-5 h-full w-full">
      <div className="w-full flex items-center justify-between gap-5 my-5">
        <Link to="/training/hr" className="text-xl text-grey">
          <FaArrowLeft />
        </Link>
        <article className="flex-1 flex gap-5 text-dark_grey justify-center">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
            View Training Certificates
          </h1>
        </article>
      </div>
      <div className="px-4 relative">
        <div className="absolute z-20 top-3 flex items-center gap-5">
          <div className="flex items-center gap-5 w-full">
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
        </div>
      </div>
      <CertifyTable
        mergering={finalData}
        columns={tableColumns?.trainCertifi}
        popupAll={addTCForm}
      />
    </section>
  );
};
