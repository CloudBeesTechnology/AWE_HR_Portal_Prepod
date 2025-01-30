import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
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

export const Reports = () => {
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
    empPDData
  } = useContext(DataSupply);
console.log(IVSSDetails);

IVSSDetails.forEach((employee) => {
  if (employee.tempID === "TEMP015") {
    console.log(employee);
  }
});
  const [mergedData, setMergeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

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
      show: userType !== "Supervisor",
    },
    {
      title: "Contract Expiry Form Update",
      icon: contract,
      path: "/ContractUp",
      show: userType !== "Supervisor",
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
    { title: "Promotion", icon: rm, path: "/promotion" },
  ];

  const filteredReportTiles = reportTiles.filter(
    (tile) => tile.show !== false
  );

  useEffect(() => {
    if (!empPIData || empPIData.length === 0) return;
  
    const mergedExampleData = IVSSDetails.map((item1) => {
      const { empID, tempID } = item1;
  
      // Step 2: Find matching tempID data in WPTrackings and localMobiliz
      const matchingData2 = WPTrackings.find((item2) => item2.tempID === tempID) || {};
      const matchingData = localMobiliz.find((item3) => item3.tempID === tempID) || {};
  
      // Step 3: Merge all data together
      return {
        ...item1,
        ...matchingData2,
        ...matchingData,
      };
    });
  
    const finalMergedData = empPIData.map((piData) => {
      const empID = piData.empID;
  
      const additionalData = mergedExampleData.find((exData) => exData.empID === empID) || {};
  
      return {
        ...piData,
        ...(IDData?.find((item) => item.empID === empID) || {}),
        ...(workInfoData?.find((item) => item.empID === empID) || {}),
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
      };
    });
  
    // Check if finalMergedData is different before updating state
    setMergeData((prev) => {
      const isEqual =
        JSON.stringify(prev) === JSON.stringify(finalMergedData);
      return isEqual ? prev : finalMergedData;
    });
  
    setLoading(false);
  }, [
    empPIData, IDData, workInfoData, terminateData, DNData, PPValidsData, 
    LMIData, EmpInsuranceData, WeldeInfo, BastingInfo, leaveDetailsData, 
    trainingCertifi, AddEmpReq, ProbFData, contractForms, IVSSDetails, WPTrackings, localMobiliz
  ]);
  
  
  return (
    <div className="p-10 w-full bg-[#F5F6F1CC]">
      <p className="text-2xl font-semibold text-dark_grey text-center uppercase ">
        Report
      </p>
      <div className="grid grid-cols-4 flex-wrap gap-5 mt-14">
        {filteredReportTiles.map((tile, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer border-2 border-[#EAD892] w-[200px] h-[150px]"
            onClick={() =>
              navigate(tile.path, {
                state: { allData: mergedData, title: tile.title },
              })
            }
          >
            <img src={tile.icon} alt={tile.title} className="mb-4 w-12 h-12" />
            <p className="text-center font-medium text-gray-700">
              {tile.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
