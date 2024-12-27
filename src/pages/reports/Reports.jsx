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



// import { SlCalender } from "react-icons/sl";
// import { useContext, useEffect, useState } from "react";
// import { Filter } from "./Filter";
// import { Searchbox } from "../../utils/Searchbox";
// import { IoSearch } from "react-icons/io5";
// // import {
// //   listEmployeePersonalInfos,
// //   listEmployeePersonalDocs,
// //   listLabourDependentPasses,
// //   listLabourMedicalInfos,
// //   listLabourWorkPasses,
// //   listEmployeeWorkInfos,
// //   listTerminationWorkInfos,
// //   listLeaveWorkInfos,
// // } from "../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";
// import { ReportTable } from "../../utils/ReportTable";
// import { ContractFormPDF } from "./ContractFormPDF";
// import { ProbationForm } from "./ProbationForm";
// import { FilterTable } from "./FilterTable";
// import { RM } from "./RM";
// import { Resignation } from "./Resignation";
// import { Termination } from "./Termination";
// import { ProbationReview } from "./ProbationReview";
// import { ContractReview } from "./ContractReview";
// import { EmpPE } from "./EmpPE";
// import { LDexpiry } from "./LDexpiry";
// import { PassportExpiry } from "./PassportExpiry";
// import { EmploymentMedical } from "./EmploymentMedical";
// import { ContractPDF } from "./ContractPDF";
// import { ProbationPDF } from "./ProbationPDF";
// import { DataSupply } from "../../utils/DataStoredContext";

// const client = generateClient();

// export const Reports = () => {
//   const { userData, empPIData, leaveDetailsData, empPDData, educDetailsData, idData } = useContext(DataSupply);
//   const [tableHead, setTableHead] = useState([]);
//   const [tableBody, setTableBody] = useState([]);
//   const [emptySearch, setEmptySearch] = useState(false);
//   const [mergedData, setMergeData] = useState([]);
//   const [justFilterName, setJustFilterName] = useState("Filter The Report");
//   const [typeOfReport, setTypeOfReport] = useState(
//     "Recruitment & Mobilization"
//   );
//   const [reportTitle, setReportTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
// console.log(userData);

//   const Reports = [
//     { title: "Recruitment & Mobilization" },
//     { title: "Resignation" },
//     { title: "Termination" },
//     { title: "Probation Review" },
//     { title: "Contract Expiry Review" },
//     { title: "Probation Form" },
//     { title: "Contract Expiry PDF" },
//     { title: "Employment Pass expiry" },
//     { title: "LD expiry" },
//     { title: "Passport Expiry" },
//     { title: "Employment Medical" },
//   ];

//   useEffect(() => {
//     if (typeOfReport === "Filter") {
//       setReportTitle("Filter");
//     } else if (typeOfReport === "Recruitment & Mobilization") {
//       setReportTitle("Recruitment & Mobilization");
//     } else if (typeOfReport === "Resignation") {
//       setReportTitle("Resignation");
//     } else if (typeOfReport === "Termination") {
//       setReportTitle("Termination");
//     } else if (typeOfReport === "Probation Review") {
//       setReportTitle("Probation Review");
//     } else if (typeOfReport === "Contract Expiry Review") {
//       setReportTitle("Contract Expiry Review");
//     } else if (typeOfReport === "Employment Pass expiry") {
//     } else if (typeOfReport === "Probation Form") {
//       setReportTitle("Probation Form");
//     } else if (typeOfReport === "Contract Expiry PDF") {
//       setReportTitle("Contract Expiry PDF");
//     } else if (typeOfReport === "Employment Pass expiry") {
//       setReportTitle("Employment Pass expiry");
//     } else if (typeOfReport === "LD expiry") {
//       setReportTitle("LD expiry");
//     } else if (typeOfReport === "Passport Expiry") {
//       setReportTitle("Passport Expiry");
//     } else if (typeOfReport === "Employment Medical") {
//       setReportTitle("Employment Medical");
//     } else {
//       setReportTitle("Recruitment & Mobilization");
//     }
//   }, [typeOfReport, emptySearch, mergedData]);

//   const searchResult = (result) => {
//     setTableBody(result);
//   };

//   const startDateEndDate = () => {
//     if (!mergedData) return;
//     const filteredTableBody = mergedData.filter((row) => {
//       const startDateMatch = row.dateOfJoin === startDate.trim();
//       const endDateMatch = row.contractEndDate === endDate.trim();
//       return startDateMatch && endDateMatch;
//     });
//     setTableBody(generateTableBodyFromMergedData(filteredTableBody));
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       startDateEndDate();
//     } else {
//       setEmptySearch(!emptySearch);
//     }
//   }, [startDate, endDate]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const [
//   //         empPersonalInfos,
//   //         empPersonalDocs,
//   //         labourDependentPasses,
//   //         labourMedicalInfo,
//   //         labourWorkPasses,
//   //         employeeWorkInfo,
//   //         terminationWorkInfo,
//   //         leaveWorkInfo,
//   //       ] = await Promise.all([
//   //         client.graphql({ query: listEmployeePersonalInfos }),
//   //         client.graphql({ query: listEmployeePersonalDocs }),
//   //         client.graphql({ query: listLabourDependentPasses }),
//   //         client.graphql({ query: listLabourMedicalInfos }),
//   //         client.graphql({ query: listLabourWorkPasses }),
//   //         client.graphql({ query: listEmployeeWorkInfos }),
//   //         client.graphql({ query: listTerminationWorkInfos }),
//   //         client.graphql({ query: listLeaveWorkInfos }),
//   //       ]);

//   //       const candidates = empPersonalInfos?.data?.listEmployeePersonalInfos?.items;
//   //       const interviews = empPersonalDocs?.data?.listEmployeePersonalDocs?.items;
//   //       const dependentPasses = labourDependentPasses?.data?.listLabourDependentPasses?.items;
//   //       const medicalInfo = labourMedicalInfo?.data?.listLabourMedicalInfos?.items;
//   //       const workPasses = labourWorkPasses?.data?.listLabourWorkPasses?.items;
//   //       const workInfo = employeeWorkInfo?.data?.listEmployeeWorkInfos?.items;
//   //       const terminations = terminationWorkInfo?.data?.listTerminationWorkInfos?.items;
//   //       const leaves = leaveWorkInfo?.data?.listLeaveWorkInfos?.items;

//   //       const mergedData = candidates
//   //         .map((candidate) => {
//   //           const interviewDetails = interviews.find((item) => item.empID === candidate.empID);
//   //           const dependentPassDetails = dependentPasses.find((item) => item.empID === candidate.empID);
//   //           const medicalDetails = medicalInfo.find((item) => item.empID === candidate.empID);
//   //           const workPassDetails = workPasses.find((item) => item.empID === candidate.empID);
//   //           const workInfoDetails = workInfo.find((item) => item.empID === candidate.empID);
//   //           const terminationDetails = terminations.find((item) => item.empID === candidate.empID);
//   //           const leaveDetails = leaves.find((item) => item.empID === candidate.empID);

//   //           // Return null if all details are undefined
//   //           if (
//   //             !interviewDetails &&
//   //             !dependentPassDetails &&
//   //             !medicalDetails &&
//   //             !workPassDetails &&
//   //             !workInfoDetails &&
//   //             !terminationDetails &&
//   //             !leaveDetails
//   //           ) {
//   //             return null;
//   //           }

//   //           return {
//   //             ...candidate,
//   //             ...interviewDetails,
//   //             ...dependentPassDetails,
//   //             ...medicalDetails,
//   //             ...workPassDetails,
//   //             ...workInfoDetails,
//   //             ...terminationDetails,
//   //             ...leaveDetails,
//   //           };
//   //         })
//   //         .filter((item) => item !== null); // Filter out null entries
//   //       console.log(mergedData)
//   //       setMergeData(mergedData);
//   //     } catch (err) {
//   //       console.error("Error fetching data:", err.message);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   return (
//     <div className="border border-white p-10 w-full">
//       <p className="text-2xl font-semibold text-dark_grey text-center uppercase mb-10">
//         Report
//       </p>

//       <div className="flex justify-between items-center ">
//         <Filter
//           typeOfReport={typeOfReport}
//           setTypeOfReport={setTypeOfReport}
//           Reports={Reports}
//           justFilterName={justFilterName}
//         />

//         <div className="flex justify-end gap-4 ">
//           <div className="flex items-center w-[20%] p-2 gap-1 border border-[#D9D9D9] rounded text-dark_grey">
//             <input
//               type="text"
//               value={startDate}
//               placeholder="Start Date"
//               className="outline-none w-full"
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <span>
//               <SlCalender className="text-xl text-dark_grey" />
//             </span>
//           </div>

//           <div className="border border-[#D9D9D9] rounded w-[20%] text-dark_grey flex items-center p-2 gap-1">
//             <input
//               type="text"
//               value={endDate}
//               placeholder="End Date"
//               className="outline-none w-full"
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//             <span>
//               <SlCalender className="text-xl text-dark_grey" />
//             </span>
//           </div>

//           <Searchbox
//             placeholder="Search Name"
//             onResult={searchResult}
//             icon={<IoSearch />}
//             data={mergedData}
//           />
//         </div>
//       </div>
//       {reportTitle === "Recruitment & Mobilization" && (
//         <RM
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Resignation" && (
//         <Resignation
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Termination" && (
//         <Termination
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Probation Review" && (
//         <ProbationReview
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Probation Form" && (
//         <ProbationPDF
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Contract Expiry Review" && (
//         <ContractReview
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Contract Expiry PDF" && (
//         <ContractPDF
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Employment Pass expiry" && (
//         <EmpPE
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "LD expiry" && (
//         <LDexpiry
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}
//       {reportTitle === "Passport Expiry" && (
//         <PassportExpiry
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}

//       {reportTitle === "Employment Medical" && (
//         <EmploymentMedical
//           allData={mergedData}
//           typeOfReport={typeOfReport}
//           reportTitle={reportTitle}
//         />
//       )}

//       <div>
//         {(reportTitle !== "Contract Expiry PDF" &&
//           reportTitle !== "Probation Form") && (
//           <ReportTable
//             MRReport={tableHead}
//             MRRValues={tableBody}
//             reportTitle={reportTitle}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
