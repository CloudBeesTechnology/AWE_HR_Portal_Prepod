
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa6";
import { TrainVT } from "../TableTraining/TrainVT";

export const TcViewData = () => {
  const { empPIData, trainingCertifi, AddEmpReq, workInfoData } = useContext(DataSupply);

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date
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
  
          // Process each item to extract the last value of arrays
          const processedData = mergedData.map((data) => {
            const processedEntry = Object.fromEntries(
              Object.entries(data).map(([key, value]) => {
                if (Array.isArray(value)) {
                  const lastValue = value[value.length - 1];
                  return [key, lastValue];
                }
                return [key, value];
              })
            );
            return processedEntry;
          });
  
          // Exclude departments "BLNG" and "Offshore"
          const filtered = processedData.filter((data) => {
            const department = data.department || "";
            const certifiExpiry = data.certifiExpiry || "";
            return department !== "BLNG" && department !== "Offshore" && certifiExpiry;
          });
  
          setMergeData(filtered);
          setFilteredData(filtered);
          setLoading(false);
        } catch (err) {
          setError("Error merging and filtering data.");
          setLoading(false);
        }
      } else {
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

  const finalData = mergeData.map((data) => {
    // console.log('Department data:', data.empID, data.department); // Log department for debugging
    return {
      ...data,
      department: Array.isArray(data.department) && data.department.length > 0
        ? data.department[data.department.length - 1] // Get last value if it's an array
        : (data.department || "-"), // If it's not an array, use the existing value or "-"
      certifiExpiry: formatDate(data.certifiExpiry),
      orgiCertifiDate: formatDate(data.orgiCertifiDate),
      eCertifiDate: formatDate(data.eCertifiDate),
    };
  });

  return (
    <section className="bg-[#F8F8F8] mx-auto p-5 h-full w-full">
      <div className="w-full flex items-center justify-between gap-5 my-5 ">
                <Link to="/training" className="text-xl  text-grey">
                  <FaArrowLeft />
                </Link>
          <article className="flex-1 flex gap-5 text-dark_grey justify-center">
          <h1 className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
          View Training Certificates
          </h1>
        </article>
        </div>

      <TrainVT
        mergering={finalData}
        columns={tableColumns?.trainCertifi}
        popupAll={addTCForm}
      />
    </section>
  );
};
