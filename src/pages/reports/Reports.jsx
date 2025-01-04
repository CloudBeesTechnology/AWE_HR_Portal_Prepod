import { SlCalender } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { Filter } from "./Filter";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { ReportTable } from "../../utils/ReportTable";
import { RM } from "./RM";
import { Resignation } from "./Resignation";
import { Termination } from "./Termination";
import { ProbationReview } from "./ProbationReview";
import { ContractReview } from "./ContractReview";
import { EmpPE } from "./EmpPE";
import { LDexpiry } from "./LDexpiry";
import { PassportExpiry } from "./PassportExpiry";
import { EmploymentMedical } from "./EmploymentMedical";
import { ContractPDF } from "./ContractPDF";
import { ProbationPDF } from "./ProbationPDF";
import { DataSupply } from "../../utils/DataStoredContext";
import { GroupHSData } from "./GroupHSData";
import { WeldingData } from "./WeldingData";
import { LbdKpi } from "./LbdKpi";
import { BlastingData } from "./BlastingData";
import { LeavePassData } from "./LeavePassData";
import { NewRecruit } from "./NewRecruit";
import { TrainingRCData } from "./TrainingRCData";

export const Reports = () => {
  const { empPIData,LMIData,PPValidsData, empPDData, IDData,workInfoData,terminateData,DNData,EmpInsuranceData,WeldeInfo,BastingInfo,leaveDetailsData,trainingCertifi,AddEmpReq } = useContext(DataSupply);
  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [emptySearch, setEmptySearch] = useState(false);
  const [mergedData, setMergeData] = useState([]);
  const [justFilterName, setJustFilterName] = useState("Filter The Report");
  const [typeOfReport, setTypeOfReport] = useState("Recruitment & Mobilization");
  const [reportTitle, setReportTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
// console.log(empPIData);
// console.log(empPDData);
// console.log(IDData);
// console.log(workInfoData);
// console.log(terminateData);
// console.log(DNData);
// console.log(PPValidsData);
// console.log(EmpInsuranceData);

  

  useEffect(() => {
    const mergeData =  empPIData.map((piData) => {
        // const pdData = empPDData.find((item) => item.empID === piData.empID) || {};
        const idData = IDData.find((item) => item.empID === piData.empID) || {};
        const wiData= workInfoData.find((item) => item.empID === piData.empID) || {};
        const tData= terminateData.find((item) => item.empID === piData.empID) || {};
        const dnData= DNData.find((item) => item.empID === piData.empID) || {};
        const PPVData= PPValidsData.find((item) => item.empID === piData.empID) || {};
        const LMData= LMIData.find((item) => item.empID === piData.empID) || {};
        const EmpInsData= EmpInsuranceData.find((item) => item.empID === piData.empID) || {};
        const WeldeInfoData= WeldeInfo.find((item) => item.empID === piData.empID) || {};
        const bastingData= BastingInfo.find((item) => item.empID === piData.empID) || {};
        const LSData= leaveDetailsData.find((item) => item.empID === piData.empID) || {};
        const TCData= trainingCertifi.find((item) => item.empID === piData.empID) || {};
        const AddERData= AddEmpReq.find((item) => item.empID === piData.empID) || {};
  
        return {
          ...piData,
          // ...pdData,
          ...idData,
          ...wiData,
          ...tData,
          ...dnData,
          ...PPVData,
          ...LMData,
          ...EmpInsData,
          ...WeldeInfoData,
          ...bastingData,
          ...LSData,
          ...TCData,
          ...AddERData
        };
      });
         setMergeData(mergeData);
         console.log(mergeData);
      setLoading(false); // Set loading to false once data is merged
      
  }, [empPIData, empPDData, IDData,workInfoData,terminateData, DNData,PPValidsData, LMIData,EmpInsuranceData,WeldeInfo,BastingInfo,leaveDetailsData,trainingCertifi,AddEmpReq]);

  useEffect(() => {
    setReportTitle(typeOfReport);
  }, [typeOfReport, emptySearch, mergedData]);

  const searchResult = (result) => {
    setTableBody(result);
  };

  const startDateEndDate = () => {
    if (!mergedData) return;
    const filteredTableBody = mergedData.filter((row) => {
      const startDateMatch = row.dateOfJoin === startDate.trim();
      const endDateMatch = row.contractEndDate === endDate.trim();
      return startDateMatch && endDateMatch;
    });
    setTableBody(filteredTableBody);
  };

  useEffect(() => {
    if (startDate && endDate) {
      startDateEndDate();
    } else {
      setEmptySearch(!emptySearch);
    }
  }, [startDate, endDate]);

  if (loading) return <p>Loading data...</p>; // Show loading message until data is available

  const Reports = [
    { title: "Recruitment & Mobilization" },
    { title: "Resignation" },
    { title: "Termination" },
    { title: "Probation Review" },
    { title: "Contract Expiry Review" },
    { title: "Contract Expiry PDF" },
    { title: "Employment Pass expiry" },
    { title: "LD expiry" },
    { title: "Passport Expiry" },
    { title: "Employment Medical" },
    // new added

    { title: "PROMOTION REPORT" },
    { title: "Qualified Welder Registered" },
    { title: "Blaster Painter Qualification" },
    { title: "LBD KPI" },
    { title: "Group H&S" },
    { title: "Leave Passage" },
    { title: "New Recruitment" },
    { title: "Training Record" },

  ];

  return (
    <div className=" p-10 w-full bg-[#F5F6F1CC]">
      <p className="text-2xl font-semibold text-dark_grey text-center uppercase mb-10">
        Report
      </p>

      <div className="flex justify-between items-center ">
        <Filter
          typeOfReport={typeOfReport}
          setTypeOfReport={setTypeOfReport}
          Reports={Reports}
          justFilterName={justFilterName}
        />

      </div>

      {reportTitle === "Recruitment & Mobilization" && (
        <RM
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Resignation" && (
        <Resignation
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Termination" && (
        <Termination
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Probation Review" && (
        <ProbationReview
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
     
      {reportTitle === "Contract Expiry Review" && (
        <ContractReview
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Contract Expiry PDF" && (
        <ContractPDF
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Employment Pass expiry" && (
        <EmpPE
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "LD expiry" && (
        <LDexpiry
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Passport Expiry" && (
        <PassportExpiry
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Employment Medical" && (
        <EmploymentMedical
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Group H&S" && (
        <GroupHSData
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Qualified Welder Registered" && (
        <WeldingData
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "LBD KPI" && (
        <LbdKpi
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Blaster Painter Qualification" && (
        <BlastingData
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Leave Passage" && (
        <LeavePassData
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "New Recruitment" && (
        <NewRecruit
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}
      {reportTitle === "Training Record" && (
        <TrainingRCData
          allData={mergedData}
          typeOfReport={typeOfReport}
          reportTitle={reportTitle}
        />
      )}

      <div>
        {(reportTitle !== "Contract Expiry PDF" &&
          reportTitle !== "Probation Form") && (
          <ReportTable
            MRReport={tableHead}
            MRRValues={tableBody}
            reportTitle={reportTitle}
          />
        )}
      </div>
    </div>
  );
};

// // import { SlCalender } from "react-icons/sl";
// import { useContext, useEffect, useState } from "react";
// // import { Filter } from "./Filter";
// // import { Searchbox } from "../../utils/Searchbox";
// // import { IoSearch } from "react-icons/io5";
// // import { ReportTable } from "../../utils/ReportTable";
// import { RM } from "./RM";
// import { Resignation } from "./Resignation";
// import { Termination } from "./Termination";
// // import { ProbationReview } from "./ProbationReview";
// // import { ContractReview } from "./ContractReview";
// // import { EmpPE } from "./EmpPE";
// // import { LDexpiry } from "./LDexpiry";
// // import { PassportExpiry } from "./PassportExpiry";
// // import { EmploymentMedical } from "./EmploymentMedical";
// // import { ContractPDF } from "./ContractPDF";
// // import { ProbationPDF } from "./ProbationPDF";
// import { DataSupply } from "../../utils/DataStoredContext";
// // import { GroupHSData } from "./GroupHSData";
// // import { WeldingData } from "./WeldingData";
// // import { LbdKpi } from "./LbdKpi";
// // import { BlastingData } from "./BlastingData";
// // import { LeavePassData } from "./LeavePassData";
// // import { NewRecruit } from "./NewRecruit";
// // import { TrainingRCData } from "./TrainingRCData";
// import { SelectTiles } from "../../utils/SelectTiles";
// import icon1 from "../../assets/training/icon1.svg";
// import icon2 from "../../assets/training/icon2.svg";
// import icon3 from "../../assets/training/icon3.svg";
// import icon4 from "../../assets/training/icon4.svg";
// import usePermission from "../../hooks/usePermissionDashInside";


// export const Reports = () => {
//   const { empPIData,LMIData,PPValidsData, empPDData, IDData,workInfoData,terminateData,DNData,EmpInsuranceData,WeldeInfo,BastingInfo,leaveDetailsData,trainingCertifi,AddEmpReq } = useContext(DataSupply);
//   const [tableHead, setTableHead] = useState([]);
//   const [tableBody, setTableBody] = useState([]);
//   const [emptySearch, setEmptySearch] = useState(false);
//   const [mergedData, setMergeData] = useState([]);
//   const [loading, setLoading] = useState(true); 


//   useEffect(() => {
//     const mergeData =  empPIData.map((piData) => {
//         // const pdData = empPDData.find((item) => item.empID === piData.empID) || {};
//         const idData = IDData.find((item) => item.empID === piData.empID) || {};
//         const wiData= workInfoData.find((item) => item.empID === piData.empID) || {};
//         const tData= terminateData.find((item) => item.empID === piData.empID) || {};
//         const dnData= DNData.find((item) => item.empID === piData.empID) || {};
//         const PPVData= PPValidsData.find((item) => item.empID === piData.empID) || {};
//         const LMData= LMIData.find((item) => item.empID === piData.empID) || {};
//         const EmpInsData= EmpInsuranceData.find((item) => item.empID === piData.empID) || {};
//         const WeldeInfoData= WeldeInfo.find((item) => item.empID === piData.empID) || {};
//         const bastingData= BastingInfo.find((item) => item.empID === piData.empID) || {};
//         const LSData= leaveDetailsData.find((item) => item.empID === piData.empID) || {};
//         const TCData= trainingCertifi.find((item) => item.empID === piData.empID) || {};
//         const AddERData= AddEmpReq.find((item) => item.empID === piData.empID) || {};
  
//         return {
//           ...piData,
//           // ...pdData,
//           ...idData,
//           ...wiData,
//           ...tData,
//           ...dnData,
//           ...PPVData,
//           ...LMData,
//           ...EmpInsData,
//           ...WeldeInfoData,
//           ...bastingData,
//           ...LSData,
//           ...TCData,
//           ...AddERData
//         };
//       });
//          setMergeData(mergeData);
//          console.log(mergeData);
//       setLoading(false); // Set loading to false once data is merged
      
//   }, [empPIData, empPDData, IDData,workInfoData,terminateData, DNData,PPValidsData, LMIData,EmpInsuranceData,WeldeInfo,BastingInfo,leaveDetailsData,trainingCertifi,AddEmpReq]);


//   const searchResult = (result) => {
//     setTableBody(result);
//   };

//   if (loading) return <p>Loading data...</p>; // Show loading message until data is available


//   return (
//     <div className=" p-10 w-full bg-[#F5F6F1CC]">
//       <p className="text-2xl font-semibold text-dark_grey text-center uppercase mb-10">
//         Report
//       </p>

//  <SelectTiles
//           img={icon1}
//           text1="HR"
//           fontSize="text_size_5 "
//           borderColor="border-[#BF91FF]"
//           bgColor="bg-white"
//           link="/training/hr"
//         />
//         <RM
//           allData={mergedData} 
//         />

//         <Resignation
//           allData={mergedData}
//         />

//         <Termination
//           allData={mergedData}
//         />
    
//     </div>
//   );
// };
