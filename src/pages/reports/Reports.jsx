import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rm from "../../assets/ReportIcon/rm.svg";
import terminate from "../../assets/ReportIcon/terminate.svg";
import probation from "../../assets/ReportIcon/probation.svg";
import contract from "../../assets/ReportIcon/contract.svg";
import passExpiry from "../../assets/ReportIcon/passExpiry.svg";
import LD from "../../assets/ReportIcon/LD.svg";
import passport from "../../assets/ReportIcon/passport.svg";
import medical from "../../assets/ReportIcon/medical.svg";
import req from "../../assets/ReportIcon/req.svg";
import training from "../../assets/ReportIcon/training.svg";
import LBDKPI from "../../assets/ReportIcon/LBDKPI.svg";
import groupHS from "../../assets/ReportIcon/groupHS.svg";
import Resignation from "../../assets/ReportIcon/Resignation.svg";
import leavePass from "../../assets/ReportIcon/leavePass.svg";
import promotion from "../../assets/ReportIcon/promotion.svg";
import useProbData from "../../hooks/useProbData";
import { useReportsData } from "../../context/reports/ReportsContext";
import { DataSupply } from "../../utils/DataStoredContext";

// Custom skeleton component for report cards
const ReportCardSkeleton = () => (
  <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md border-2 border-[#EAD892] w-[200px] h-[150px] animate-pulse">
    <div className="mb-4 w-16 h-16 bg-medium_grey rounded-full"></div>
    <div className="h-4 bg-medium_grey rounded-lg w-3/4"></div>
  </div>
);

export const Reports = () => {
  const [mergedData, setMergeData] = useState([]);
  // const reportPermissions = usePermission("userID", "Report");
  const [permissionData, setPermissionData] = useState([]);
  let reportPermissions = permissionData;

  const { userData, setFetchTableData } = useContext(DataSupply);

  const {
    empPIData,
    LMIData,
    PPValidsData,
    IDData,
    workInfoData,
    terminateData,
    DNData,
    EmpInsuranceData,
    WeldeInfo,
    BastingInfo,
    leaveDetailsData,
    trainingCertifi,
    AddEmpReq,
    ProbFData,
    contractForms,
    IVSSDetails,
    WPTrackings,
    localMobiliz,
    SRData,
    loading,
  } = useReportsData();
  const { mergedProbData } = useProbData();
  const navigate = useNavigate();

  const reportTiles = [
    { title: "Recruitment & Mobilization", icon: rm, path: "/rm" },
    { title: "Resignation", icon: Resignation, path: "/resignation" },
    { title: "Termination", icon: terminate, path: "/termination" },
    { title: "Probation Review", icon: probation, path: "/probationReview" },
    {
      title: "Probation Form Update",
      icon: probation,
      path: "/probFormUpdate",
    },
    {
      title: "Contract Expiry Review",
      icon: contract,
      path: "/contractReview",
    },
    {
      title: "Contract Expiry Form Update",
      icon: contract,
      path: "/ContractUp",
    },
    {
      title: "Employment Pass Expiry",
      icon: passExpiry,
      path: "/empPassExpiry",
    },
    { title: "LD Expiry", icon: LD, path: "/ldExpiry" },
    { title: "Passport Expiry", icon: passport, path: "/passportExpiry" },
    { title: "Employment Medical", icon: medical, path: "/empMedical" },
    { title: "New Recruitment", icon: req, path: "/newRecruit" },
    { title: "Training Records", icon: training, path: "/trainingRC" },
    { title: "LBD KPI", icon: LBDKPI, path: "/lbdKpi" },
    { title: "Group H&S", icon: groupHS, path: "/groupHS" },
    { title: "Leave Passage", icon: leavePass, path: "/leavePass" },
    { title: "Promotion", icon: promotion, path: "/promotion" },
  ];

  useEffect(() => {
    setFetchTableData(["userData"]);
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("userID")?.toUpperCase();

    const fetchEmpPIData = async () => {
      try {
        const result = userData?.find((val) => val.empID === userID);

        if (result && Array.isArray(result.setPermissions)) {
          result.setPermissions.forEach((permissionString) => {
            const convertJson = convertToJSON(permissionString);

            if (convertJson && convertJson["Report"]) {
              setPermissionData(convertJson["Report"]);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmpPIData();
  }, [userData]);

  function convertToJSON(inputString) {
    if (!inputString) {
      return null;
    }

    let formattedString = inputString?.replace(/=/g, ":");
    formattedString = formattedString?.replace(/([a-zA-Z]+):/g, '"$1":');

    formattedString = formattedString?.replace(/\[([^\]]+)\]/g, (match, p1) => {
      let elements = p1.split(",").map((item) => `"${item.trim()}"`);
      return `[${elements.join(", ")}]`;
    });

    formattedString = `{${formattedString?.slice(1, -1)}}`;

    try {
      return JSON.parse(formattedString);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return null;
    }
  }

  useEffect(() => {
    if (!empPIData || empPIData.length === 0) return;

    const mergedExampleData = IVSSDetails.map((item1) => {
      const { empID, tempID } = item1;
      // Step 2: Find matching tempID data in WPTrackings and localMobiliz
      const matchingData2 =
        WPTrackings.find((item2) => item2.tempID === tempID) || {};
      const matchingData =
        localMobiliz.find((item3) => item3.tempID === tempID) || {};

      // Step 3: Merge all data together
      return {
        ...item1,
        ...matchingData2,
        ...matchingData,
      };
    });

    const finalMergedData = empPIData.map((piData) => {
      const empID = piData.empID;

      const additionalData =
        mergedExampleData.find((exData) => exData.empID === empID) || {};

      return {
        ...piData,
        ...(IDData?.find((item) => item.empID === empID) || {}),
        ...(terminateData?.find((item) => item.empID === empID) || {}),
        ...(DNData?.find((item) => item.empID === empID) || {}),
        ...(PPValidsData?.find((item) => item.empID === empID) || {}),
        ...(LMIData?.find((item) => item.empID === empID) || {}),
        ...(EmpInsuranceData?.find((item) => item.empID === empID) || {}),
        ...(WeldeInfo?.find((item) => item.empID === empID) || {}),
        ...(BastingInfo?.find((item) => item.empID === empID) || {}),
        ...(leaveDetailsData?.find((item) => item.empID === empID) || {}),
        ...(trainingCertifi?.find((item) => item.empID === empID) || {}),
        ...(AddEmpReq?.find((item) => item.empID === empID) || {}),
        ...(ProbFData?.find((item) => item.empID === empID) || {}),
        ...(contractForms?.find((item) => item.empID === empID) || {}),
        ...(IVSSDetails?.find((item) => item.empID === empID) || {}),
        ...additionalData, // Add the merged example data
        ...(SRData?.find((item) => item.empID === empID) || {}),

        ...(workInfoData?.find((item) => item.empID === empID) || {}),
      };
    });

    // Check if finalMergedData is different before updating state
    setMergeData((prev) => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(finalMergedData);
      return isEqual ? prev : finalMergedData;
    });
  }, [
    empPIData,
    IDData,
    workInfoData,
    terminateData,
    DNData,
    PPValidsData,
    LMIData,
    EmpInsuranceData,
    WeldeInfo,
    BastingInfo,
    leaveDetailsData,
    trainingCertifi,
    AddEmpReq,
    ProbFData,
    contractForms,
    IVSSDetails,
    WPTrackings,
    localMobiliz,
    SRData,
  ]);

  const filteredCards = reportTiles.filter((card) =>
    reportPermissions?.includes(card.title)
  );

  // Show skeleton loaders when data is loading or when filteredCards is empty
  const showSkeleton = mergedData?.length === 0 || filteredCards.length === 0;
  return (
    <div className="p-10 w-full bg-[#F5F6F1CC] min-h-screen">
      <p className="text-2xl font-semibold text-dark_grey text-center uppercase ">
        Report
      </p>
      <div className="grid grid-cols-4 flex-wrap gap-5 mt-14">
        {showSkeleton
          ? // Render custom skeleton loaders when data is loading or no cards to show
            Array.from({ length: 17 }).map((_, index) => (
              <ReportCardSkeleton key={index} />
            ))
          : // Render actual cards when data is loaded and permissions are available
            filteredCards.map((tile, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer border-2 border-[#EAD892] w-[200px] h-[150px]"
                onClick={() =>
                  navigate(tile.path, {
                    state: {
                      allData:
                        tile.title === "Probation Review" ||
                        tile.title === "Probation Form Update"
                          ? mergedProbData
                          : mergedData,
                      title: tile.title,
                    },
                  })
                }
              >
                <img
                  src={tile.icon}
                  alt={tile.title}
                  className="mb-4 w-12 h-12"
                />
                <p className="text-center font-medium text-gray-700">
                  {tile.title}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};
