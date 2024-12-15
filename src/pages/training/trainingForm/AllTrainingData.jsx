import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { DataSupply } from "../../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa6";

export const AllTrainingData = () => {
  const {
    IDData,
    empPIData,
    workInfoData,
    trainingCertifi,
    AddEmpReq,
    WeldeInfo,
    BastingInfo,
  } = useContext(DataSupply);

  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      IDData &&
      empPIData &&
      workInfoData &&
      trainingCertifi &&
      AddEmpReq &&
      WeldeInfo &&
      BastingInfo
    ) {
      const mergedData = empPIData
        .map((emp) => {
          // Find the corresponding AddEmpReq item using empID
          const addemp = AddEmpReq.find((item) => item.empID === emp.empID);

          if (addemp) {
            return {
              ...emp,
              ...addemp,
            };
          }
          return null;
        })
        .filter((item) => item !== null); // Remove null values (non-matching empID)

      const sortedData = mergedData.sort((a, b) => a.empID.localeCompare(b.empID));
      setMergeData(sortedData);
      setFilteredData(sortedData);
      setLoading(false);
    } else {
      setError("Data not fully available.");
      setLoading(false);
    }
  }, [IDData, empPIData, workInfoData, trainingCertifi, AddEmpReq, WeldeInfo, BastingInfo]);

  // const handleSearch = (searchTerm) => {
  //   if (!searchTerm) {
  //     setFilteredData(mergeData);
  //   } else {
  //     const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //     const filtered = mergeData.filter((item) => {
  //       return (
  //         item.empID.toLowerCase().includes(lowerCaseSearchTerm) ||
  //         item.name.toLowerCase().includes(lowerCaseSearchTerm)
  //       );
  //     });
  //     setFilteredData(filtered);
  //   }
  // };

  const [activeNavTab, setActiveNavTab] = useState("addTraining");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleTabClick = (tab, route) => {
    setActiveNavTab(tab);
    navigate(route);
  };

  // Define column configurations for each tab
  const tableColumns = {
    addTraining: [
      { header: "Employee ID", key: "empID" },
      { header: "Name", key: "name" },
      { header: "Training Start Date", key: "traineeSD" },
      { header: "End Date", key: "traineeED" },
      { header: "Status", key: "traineeStatus" },
    ],
    weldingqualifi: [
      { header: "Employee ID", key: "empID" },
      { header: "Name", key: "name" },
      { header: "Welding Position", key: "weldingPosition" },
      { header: "Welding Stamp NO", key: "weldingStampNor" },
      { header: "Qualifi Expiry", key: "WQExpiry" },
    ],
    blastingpainting: [
      { header: "Employee ID", key: "empID" },
      { header: "Name", key: "name" },
      { header: "Painting Badge Number", key: "blastingBadgeNo" },
      { header: "Start Date", key: "blastingStartDate" },
      { header: "End Date", key: "blastingEndDate" },
    ],
    trainCertifi: [
      { header: "Employee ID", key: "empID" },
      { header: "Name", key: "name" },
      { header: "Purchase Order No", key: "poNo" },
      { header: "Certificate Expiry", key: "certifiExpiry" },
      { header: "E-certificate Date", key: "eCertifiDate" },
    ],
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/allTraining") {
      setActiveNavTab("addTraining");
    } else if (path === "/allTraining/weldingqualifi") {
      setActiveNavTab("weldingqualifi");
    } else if (path === "/allTraining/blastingpainting") {
      setActiveNavTab("blastingpainting");
    } else if (path === "/allTraining/trainCertifi") {
      setActiveNavTab("trainCertifi");
    } else {
      setActiveNavTab("addTraining");
    }
  }, [location]);

  // Determine columns based on the active tab
  // const columns = tableColumns[activeNavTab] || [];

  return (
    <section className="w-full">
      <div className="relative mx-auto p-5 h-full">
       
        <div className=" flex items-center my-5">
        <div className=" ">
        <Link to="/training" className="text-xl  text-grey ">
          <FaArrowLeft />
        </Link>
        </div>
      <div className="w-full  flex justify-center items-center">
      <p className=" uppercase py-2 px-3 rounded-lg text_size_2 font-semibold w-[300px] ">      
            All Training Details
        </p>  
      </div>
</div>

        <div className="flex items-center gap-10 m-4 text-[16px] font-semibold mt-10">
          <button
            className={`py-2 px-4 focus:outline-none ${activeNavTab === "addTraining" ? "border-b-4 border-yellow" : ""}`}
            onClick={() => handleTabClick("addTraining", "/allTraining")}
          >
            Add Employee
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${activeNavTab === "weldingqualifi" ? "border-b-4 border-yellow" : ""}`}
            onClick={() => handleTabClick("weldingqualifi", "/allTraining/weldingqualifi")}
          >
            Welding Qualification
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${activeNavTab === "blastingpainting" ? "border-b-4 border-yellow" : ""}`}
            onClick={() => handleTabClick("blastingpainting", "/allTraining/blastingpainting")}
          >
            Blasting Painting List
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${activeNavTab === "trainCertifi" ? "border-b-4 border-yellow" : ""}`}
            onClick={() => handleTabClick("trainCertifi", "/allTraining/trainCertifi")}
          >
            Training Certificates
          </button>
        </div>

        <div>
          <Outlet context={{ mergeData: filteredData, tableColumns }} />
        </div>
      </div>
    </section>
  );
};
