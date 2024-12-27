import { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { TrainVT } from "../TableTraining/TrainVT";
import { FaArrowLeft } from "react-icons/fa6";

export const OMEDataCertify = () => {
  // const { tableColumns } = useOutletContext();
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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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

  return (
    <section className="bg-[#F8F8F8] mx-auto p-5 h-full w-full">

<div className=" flex items-center my-5">
        <div className=" ">
        <Link to="/training" className="text-xl  text-grey ">
          <FaArrowLeft />
        </Link>
        </div>
   
</div>

        <div className="flex items-center justify-center gap-10 m-4 text-[16px] font-semibold mt-10">
          <button
            className={`py-2 px-4 focus:outline-none border-b-4 border-yellow`}
          >
           OME Training Certificates
          </button>
        </div>
      <TrainVT
        mergering={filteredData.map((data) => ({
          ...data,
          certifiExpiry: formatDate(data.certifiExpiry),
          orgiCertifiDate: formatDate(data.orgiCertifiDate),
          eCertifiDate: formatDate(data.eCertifiDate),
        }))}
        columns={tableColumns?.trainCertifi}
        popupAll={addTCForm}
      />
    </section>
  );
};
