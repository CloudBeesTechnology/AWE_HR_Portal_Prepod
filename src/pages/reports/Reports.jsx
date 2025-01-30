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
    localMobiliz
  } = useContext(DataSupply);
console.log(IVSSDetails);

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

const DataExample=[
  {    
    title: "Contract Expiry Form Update",
    icon: "contract",
    submitdateendorsement: "03-07-2000",
    show: "Supervisor",
    tempID: "TEMP016"  
  },
  {    
    title1: "Contract Expiry Form Update 17",
    icon1: "contract 17",
    path1: "ContractUp 17",
    show1: "Supervisor 17",
    tempID: "TEMP017", 
    empID:"8011" 
  },
]
const DataExample1=[
  {    
    title1: "Contract ggg 16",
    receiptno: "444 5555 666 gg16",
    path1: "ContractUp  gggggggggg16",
    jitpaamount: "334355555555555555555555",
    tempID: "TEMP016",
    empID:"011"
  },
  {    
    title1: "Contract Expiry Form Update 17",
    icon1: "contract 17",
    path1: "ContractUp 17",
    show1: "Supervisor 17",
    tempID: "TEMP017", 
    empID:"8011" 
  },
  {    
    title1: "Contract 88888888888 18",
    icon1: "contract 88888888888 18",
    path1: "ContractUp 88888888888 18",
    show1: "Supervisor 88888888888 18",
    tempID: "TEMP018" ,
    empID:"7716"
  },
]
const DataExample2=[
  {    
    title2: "Cont555555",
    icon2: "4444444444",
    path2: "33333333333333",
    receiptno: "22222222222",
    tempID: "TEMP016"  
  },
  {    
    title2: "Contract Expiry Form Update 28",
    icon2: "contract 28",
    path2: "ContractUp 28",
    show2: "Supervisor 28",
    tempID: "TEMP018"  
  },
]

  // useEffect(() => {
  //   const mergeData = empPIData.map((piData) => {
  //     const data = {
  //       ...piData,
  //       ...(IDData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(workInfoData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(terminateData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(DNData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(PPValidsData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(LMIData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(EmpInsuranceData?.find((item) => item.empID === piData.empID) ||
  //         {}),
  //       ...(WeldeInfo?.find((item) => item.empID === piData.empID) || {}),
  //       ...(BastingInfo?.find((item) => item.empID === piData.empID) || {}),
  //       ...(leaveDetailsData?.find((item) => item.empID === piData.empID) ||
  //         {}),
  //       ...(trainingCertifi?.find((item) => item.empID === piData.empID) || {}),
  //       ...(AddEmpReq?.find((item) => item.empID === piData.empID) || {}),
  //       ...(ProbFData?.find((item) => item.empID === piData.empID) || {}),
  //       ...(contractForms?.find((item) => item.empID === piData.empID) || {}),
  //       ...(IVSSDetails?.find((item) => item.empID === piData.empID) || {}),
  //     };
  //     return data;
  //   });

  //   setMergeData(mergeData);

  //   setLoading(false);
  // }, [
  //   empPIData,
  //   IDData,
  //   workInfoData,
  //   terminateData,
  //   DNData,
  //   PPValidsData,
  //   LMIData,
  //   EmpInsuranceData,
  //   WeldeInfo,
  //   BastingInfo,
  //   leaveDetailsData,
  //   trainingCertifi,
  //   AddEmpReq,
  //   ProbFData,
  //   contractForms,
  //   IVSSDetails,
  // ]);
  useEffect(() => {
    if (!empPIData || empPIData.length === 0) return;
  
    const mergedExampleData = DataExample1.map((item1) => {
      const { empID, tempID } = item1;
  
      // Step 2: Find matching tempID data in DataExample2 and DataExample
      const matchingData2 = DataExample2.find((item2) => item2.tempID === tempID) || {};
      const matchingData = DataExample.find((item3) => item3.tempID === tempID) || {};
  
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
    trainingCertifi, AddEmpReq, ProbFData, contractForms, IVSSDetails, 
    DataExample1, DataExample2, DataExample
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
