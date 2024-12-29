import { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { TrainVT } from "../TableTraining/TrainVT";
import { FaArrowLeft } from "react-icons/fa6";

export const OMEDataCertify = () => {
  // const { tableColumns } = useOutletContext();
  const { empPIData, trainingCertifi, AddEmpReq, workInfoData } = useContext(DataSupply);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableColumns = {
    trainCertifi: [
      { header: "Employee ID", key: "empID" },
      { header: "Name", key: "name" },
      { header: "Department", key: "department" },
      { header: "Certificate Expiry", key: "certifiExpiry" },
      { header: "E-certificate Date", key: "eCertifiDate" },
    ],
  };

  const addTCForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Employee Badge No", key: "empBadgeNo" },
    { header: "Name", key: "name" },
    { header: "Department", key: "department" },
    { header: "Course", key: "courseCode" },
    { header: "Course Name", key: "courseName" },
    { header: "Company", key: "company" },
    { header: "Purchase Order No", key: "poNo" },
    { header: "Expiry Condition", key: "addDescretion" },
    { header: "Date E-certificate", key: "eCertifiDate" },
    { header: "Training Certificate Expiry", key: "certifiExpiry" },
    { header: "Original Certificate", key: "orgiCertifiDate" },
    { header: "Upload File", key: "trainingUpCertifi" },
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
      const certifiExpiry = new Date(data.certifiExpiry);
  
      if (start && end) return certifiExpiry >= start && certifiExpiry <= end;
      if (start) return certifiExpiry >= start;
      if (end) return certifiExpiry <= end;
  
      return true; // Show all data if no date filters are applied
    });
  
    setFilteredData(filtered);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 

  useEffect(() => {
    const mergeAndFilterData = () => {
      if (empPIData && trainingCertifi && AddEmpReq && workInfoData) {
        try {
          const mergedData = empPIData
            .map((emp) => {
              const TCertifi = trainingCertifi.find((item) => item.empID === emp.empID);
              const addEmp = AddEmpReq.find((item) => item.empID === emp.empID);
              const workEmp = workInfoData.find((item) => item.empID === emp.empID);
              return { ...emp, ...TCertifi, ...addEmp, ...workEmp };
            })
            .filter(Boolean); // Remove nulls
  
          // console.log("Merged Data Before Array Filter:", mergedData);
  
          // Process each item to extract the last value of arrays
          const processedData = mergedData.map((data) => {
            const processedEntry = Object.fromEntries(
              Object.entries(data).map(([key, value]) => {
                if (Array.isArray(value)) {
                  const lastValue = value[value.length - 1];
                  // console.log(`Key: ${key}, Array Last Value: ${lastValue}`);
                  return [key, lastValue];
                }
                return [key, value];
              })
            );
            return processedEntry;
          });
  
          // console.log("Processed Data with Last Array Values:", processedData);
  
          // Filter data for departments ending with "Offshore"
          const filtered = processedData.filter((data) => {
            const department = data.department || "";
          const certifiExpiry = data.certifiExpiry || "";
          return department === "Offshore" && certifiExpiry;
          });
  
          // console.log("Filtered Data (Offshore Only):", filtered);
          setMergeData(filtered);
          setFilteredData(filtered);
          setLoading(false);
        } catch (err) {
          console.error("Error merging and filtering data:", err);
          setError("Error merging and filtering data.");
          setLoading(false);
        }
      } else {
        // console.warn("Required data is missing.");
        setError("Required data is missing.");
        setLoading(false);
      }
    };
  
    mergeAndFilterData();
  }, [empPIData, trainingCertifi, AddEmpReq, workInfoData]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const finalData = filteredData.map((data) => ({
    ...data,
    // department: Array.isArray(data.department) && data.department.length > 0
    //     ? data.department[data.department.length - 1] // Get last value if it's an array
    //     : (data.department || "-"), 
      certifiExpiry: formatDate(data.certifiExpiry),
      orgiCertifiDate: formatDate(data.orgiCertifiDate),
      eCertifiDate: formatDate(data.eCertifiDate),
  }));
  return (
    <section className="bg-[#F8F8F8] mx-auto p-5 h-full w-full">

<div className="w-full flex items-center justify-between gap-5 my-5">
                <Link to="/training" className="text-xl text-grey">
                  <FaArrowLeft />
                </Link>

          <article className="flex-1 flex justify-center gap-5 text-dark_grey">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
          OME Training Certificates
          </h1>
        </article>
        </div>

        <div className="px-4 relative ">
    <div className="absolute z-20 top-3 flex items-center gap-5">

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
    </div>
       </div>

      <TrainVT
        mergering={finalData}
        columns={tableColumns?.trainCertifi}
        popupAll={addTCForm}
      />
    </section>
  );
};
