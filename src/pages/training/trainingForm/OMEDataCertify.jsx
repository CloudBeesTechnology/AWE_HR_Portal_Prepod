import { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { TrainVT } from "../TableTraining/TrainVT";
import { FaArrowLeft } from "react-icons/fa6";
import AddCertifyPopUp from "../TableTraining/AddCertifyPopUp";
import { CertifyTable } from "../TableTraining/CertifyTable";

export const OMEDataCertify = () => {
  // const { tableColumns } = useOutletContext();
  const { empPIData, trainingCertifi, AddEmpReq, workInfoData } =
    useContext(DataSupply);
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
      { header: "Purchase Order", key: "poNo" },
      { header: "Certificate Expiry", key: "certifiExpiry" },
      { header: "E-certificate Date", key: "eCertifiDate" },
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
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (!mergeData.length) return;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!start && !end) {
      setFilteredData(mergeData);
      return;
    }

    const filtered = mergeData.filter((data) => {
      // Parse trainingProof to get the last certificate expiry date
      let certifiExpiryDate = null;
      try {
        if (data.trainingProof && data.trainingProof.length > 0) {
          // Get the last element of trainingProof array
          const lastProofItem =
            data.trainingProof[data.trainingProof.length - 1];
          const proof = JSON.parse(lastProofItem);
          if (Array.isArray(proof)) {
            const lastProof = proof[proof.length - 1];
            if (lastProof?.certifiExpiry) {
              certifiExpiryDate = new Date(lastProof.certifiExpiry);
            }
          }
        }
      } catch (e) {
        console.error("Error parsing trainingProof:", e);
      }

      if (!certifiExpiryDate) return true;

      if (start && end) {
        return certifiExpiryDate >= start && certifiExpiryDate <= end;
      }
      if (start) return certifiExpiryDate >= start;
      if (end) return certifiExpiryDate <= end;

      return true;
    });

    setFilteredData(filtered);
  }, [startDate, endDate, mergeData]);

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
        const departmentArray = Array.isArray(data.department) ? data.department : [];
        const lastDepartment = departmentArray.length > 0 && typeof departmentArray[departmentArray.length - 1] === "string"
          ? departmentArray[departmentArray.length - 1].trim().toLowerCase()
          : "";
        return lastDepartment === "offshore";
      });

      setMergeData(filtered);
      setFilteredData(filtered);
      setLoading(false);
    } else {
      setError("Data not fully available.");
      setLoading(false);
    }
  }, [empPIData, workInfoData, trainingCertifi, AddEmpReq]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const finalData = filteredData
    .sort((a, b) => new Date(b.CertifyCreatedAt) - new Date(a.CertifyCreatedAt))
    .map((data) => {
      let certifiExpiry = "N/A";
      let eCertifiDate = "N/A";
      let orgiCertifiDate = "N/A";

      try {
        if (data.trainingProof && data.trainingProof[0]) {
          const proof = JSON.parse(data.trainingProof[0]);
          let lastProof = proof;

          // If proof is an array, get the last object
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
          }
        }
      } catch (e) {
        console.error("Error parsing trainingProof:", e);
      }

      return {
        ...data,
        empID: data.empID || "-",
        empBadgeNo: data.empBadgeNo || "-",
        name: data.name || "-",
        certifiExpiry,
        eCertifiDate,
        orgiCertifiDate,
        department: Array.isArray(data.department)
        ? data.department[data.department.length - 1]
        : "-",
        position: Array.isArray(data.position)
        ? data.position[data.position.length - 1]
        : "-",
      };
    });

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
