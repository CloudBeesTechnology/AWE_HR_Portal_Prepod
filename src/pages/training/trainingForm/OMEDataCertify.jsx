import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa6";
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
      { header: "Start Date", key: "traineeSD" },
      { header: "End Date", key: "traineeED" },
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
          const track = safeParseData(lastTrackItem);

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

    setFilteredData(filtered);
  };

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
    let traineeSD = "N/A";
    let traineeED = "N/A";

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

      // Extract from traineeTrack
      if (data.traineeTrack && data.traineeTrack) {
        const track = safeParseData(data.traineeTrack);

        let lastTrack = track;

        if (Array.isArray(track)) {
          lastTrack = track[track.length - 1];
        }

        if (lastTrack) {
          traineeSD = lastTrack.traineeSD
            ? formatDate(lastTrack.traineeSD)
            : "N/A";
          traineeED = lastTrack.traineeED
            ? formatDate(lastTrack.traineeED)
            : "N/A";
        }
      } else {
        console.log("No valid traineeTrack found for this entry.");
      }
    } catch (e) {
      console.error("Error parsing trainingProof or traineeTrack:", e);
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
      traineeSD,
      traineeED,
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
