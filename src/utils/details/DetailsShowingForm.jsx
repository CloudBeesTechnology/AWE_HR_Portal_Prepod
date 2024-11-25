import React, { useState, useRef } from "react";
import TabNavigation from "./TabNavigation";
import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";
import FamilyDetails from "./FamilyDetails";
import MedicalDetails from "./MedicalDetails";
import AccommodationDetails from "./AccommodationDetails";
import InsuranceDetails from "./InsuranceDetails";
import WorkInfo from "./WorkInfo";
import { WorkPass } from "./WorkPass";
import { FaWindowClose } from "react-icons/fa";
import EmployeeDocuments from "./EmployeeDocuments";
import logo from "../../assets/logo/logo-with-name.svg";
import { useReactToPrint } from "react-to-print";

export const DetailsShowingForm = ({ passingValue, handleFormShow }) => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab
  const [currentPage, setCurrentPage] = useState(1);

  // State for PDF viewing
  const [viewingDocument, setViewingDocument] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const invoiceRef = useRef();

  // // Parse document data (for employee docs)
  // const parseDocumentData = (data) => {
  //   const docString = data[0];
  //   const docEntries = docString.split(',').map(item => item.trim());
  //   const docObject = docEntries.reduce((acc, entry) => {
  //     const [label, url] = entry.split('=').map(part => part.trim());
  //     acc[label] = decodeURIComponent(url);
  //     return acc;
  //   }, {});
  //   return docObject;
  // };

  // const parseDocumentData = (data) => {
  //   // Ensure the data is valid and an array with at least one string item
  //   if (!data || !Array.isArray(data) || typeof data[0] !== 'string') {
  //     return {};  // Return an empty object if data is not valid
  //   }

  //   const docString = data[0];
  //   const docEntries = docString.split(',').map(item => item.trim());

  //   // Handle edge cases like empty docString or malformed entries
  //   const docObject = docEntries.reduce((acc, entry) => {
  //     const [label, url] = entry.split('=').map(part => part.trim());
  //     if (label && url) {  // Ensure both label and url exist
  //       acc[label] = decodeURIComponent(url);
  //     }
  //     return acc;
  //   }, {});

  //   return docObject;
  // };

    const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onBeforePrint: () => console.log("Preparing print..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: "print", // This ensures the print view uses a different CSS style
  });

  const parseDocumentData = (data) => {
    if (!data || !Array.isArray(data) || typeof data[0] !== "string") {
      return {}; // Return an empty object if data is invalid
    }

    // Extract the first item from the array (which is the string with key-value pairs)
    let docString = data[0];

    // Remove the surrounding curly braces if they exist
    if (docString.startsWith("{") && docString.endsWith("}")) {
      docString = docString.slice(1, -1); // Remove the first and last characters (curly braces)
    }

    // Split the string by commas to get individual key-value pairs
    const docEntries = docString.split(",").map((item) => item.trim());

    // Process the key-value pairs into an object
    const docObject = docEntries.reduce((acc, entry) => {
      const [label, url] = entry.split("=").map((part) => part.trim());
      if (label && url) {
        acc[label] = decodeURIComponent(url); // Decode the URL properly
      }
      return acc;
    }, {});

    return docObject;
  };

  // Handle clicking on "View Document"
  const handleViewDocument = (url) => {
    setViewingDocument(url);
    setIsPdfOpen(true);
    setPageNumber(1); // Reset to page 1 when a new document is viewed
  };

  // Close the PDF viewer
  const handleCloseViewer = () => {
    setIsPdfOpen(false);
    setViewingDocument(null);
  };

  // On document load, set the number of pages
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Tab click handlers
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setCurrentPage(1); // Reset page number when tab changes
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = date.getDate().toString().padStart(2, "0"); // Adds leading zero if day is single digit
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const {
    age, email, aTQualify, agent, alternateNo, accidentIns, accommodation, accommodationAddress, bankAmt, bankEmpUpload, bankEndorse, bankRece, bankRefNo, bankSubmit, bankValid, bruhimsRD, bruhimsRNo, bruneiMAD, bruneiME, bwnIcColour, bwnIcExpiry, bwnIcNo, chinese, cob, contactNo, contractType, ctryOfOrigin, dependPass, dob, doeEmpApproval, doeEmpRefNo, doeEmpSubmit, doeEmpUpload, doeEmpValid, driveLic, eduDetails, educLevel, empBadgeNo, empID, empType, empUpDocs, familyDetails, gender, inducBrief, inducBriefUp, jitpaAmt, jpEmpUpload, jpEndorse, jpValid, lang, lbrDepoAmt, lbrDepoSubmit, lbrDepoUpload, lbrReceiptNo, marital, myIcNo, name, nationalCat, nationality, nlmsEmpApproval, nlmsEmpSubmit, nlmsEmpSubmitRefNo, nlmsEmpUpload, nlmsEmpValid, nlmsRefNo, oCOfOrigin, officialEmail, otherNation, otherRace, otherReligion, overMD, overME, permanentAddress, permitType, ppDestinate, ppExpiry, ppIssued, ppNo, preEmp, preEmpPeriod, profilePhoto, race, religion, sawpEmpLtrReci, sawpEmpLtrReq, sawpEmpUpload, tbaPurchase, uploadBwn, uploadFitness, uploadRegis, contractEnd, contractPeriod, contractStart, createdAt, department, doj, hr, id, jobCat, jobDesc, manager, otherDepartment, otherJobCat, otherPosition, position, probationEnd, probationStart, relationship, salaryType, sapNo, skillPool, supervisor, updatedAt, upgradeDate, upgradePosition, workHrs, workMonth, workStatus, workWeek, annualLeave, annualLeaveDate, compasLeave, compasLeaveDate, dateLeavePass, destinateLeavePass, durLeavePass, leavePass, materLeave, materLeaveDate, mrageLeave, mrageLeaveDate, paterLeave, paterLeaveDate, sickLeave, sickLeaveDate, otherResignNotConf, otherResignNotProb, otherTermiNotConf, otherTermiNotProb, reasonResign, reasonTerminate, resignDate, resignNotConf, resignNotProb, termiDate, termiNotConf, termiNotProb, workInfoUploads, depEmp, depEmpDate, positionRev, positionRevDate, remarkWI, revALD, revAnnualLeave, revLeaveDate, revLeavePass, revSalary, revSalaryDate, uploadAL, uploadDep, uploadLP, uploadPR, uploadSP,
    applicationUpload, bwnUpload, cvCertifyUpload, loiUpload, myIcUpload, paafCvevUpload, ppUpload, supportDocUpload          
} = passingValue;

  // Grouped Data
  const personalDetails = {
    Name: name,
    "Employee ID": empID,
    "Date Of Birth": formatDate(dob),
    Age: age,
    Gender: gender,
    Nationality: nationality,
    Race: race,
    Religion: religion,
    Position: Array.isArray(position) && position.length > 0 ? position[0] : "Position not available", 
    "Contact No": contactNo,
    "Alternate Number": alternateNo,
    Email: email,
    "Official Email": officialEmail,
    "Permanent Address": permanentAddress,
    // ProfilePhoto: profilePhoto,
    "Marital Status": marital,
    Language: lang,
    "Driving License": driveLic,
    "National Category": nationalCat,
    "Other Nationality": otherNation,
    "Country of Origin": ctryOfOrigin,
    "Other country of origin": oCOfOrigin,
    "Other Race": otherRace,
    "Other Religion": otherReligion,
    "Academic / Technical qualification": aTQualify,
    "Contract Type": contractType,
    "Employee Type": empType,
    "Employee Badge No": empBadgeNo,
    "Sap No": sapNo,
    Chinese: chinese,
    Cob: cob,
    "Agent Name": agent,
    "Date of Induction Briefing": formatDate(inducBrief),
    // "Induction Briefing Upload": inducBriefUp,
    "Brunei IC Colour": bwnIcColour,
    "Brunei IC Expiry": formatDate(bwnIcExpiry),
    "Brunei IC Number": bwnIcNo,
    "Malaysian IC Number": myIcNo,
    "Passport no": ppNo,
    "Passport issued destination": ppDestinate,
    "Passport Expiry": formatDate(ppExpiry),
    "Passport Issue Date": formatDate(ppIssued),
    "Previous Employment Details": preEmp,
    "Previous Employment Period": preEmpPeriod,
//     applicationUpload, 
// bwnUpload,
// cvCertifyUpload,
// loiUpload,
// myIcUpload,
// paafCvevUpload,
// ppUpload,
// supportDocUpload,
  };
 
// Log the position array
console.log("Position array:", position);

// Log the first element of the position array

  const employeeDocument = {
    EmpUpDocs: empUpDocs,
  };
  const educationalDetails = {
    "Education Details": eduDetails,
    "Highlight Education": educLevel,
  };

  const familyInfo = {
    FamilyDetails: familyDetails,
  };

  const medicalInfo = {
    "Overseas Medical Fitness issued date": formatDate(overMD), // overseas medical
    "Overseas Medical Fitness Expiry": formatDate(overME), //overseas expiray
    //  UploadFitness: uploadFitness,
    "Date submitted of BruHims Registration": formatDate(bruhimsRD), // registration date
    "BruHims Registration Number": bruhimsRNo, // registration no
    // "BruHims Medical Details": uploadBwn,
    "Brunei Medical Appointment Date": formatDate(bruneiMAD), // medical appointment date
    "Brunei Medical Fitness Expiry": formatDate(bruneiME), // medical expiray
    // "Brunei Medical Details": uploadRegis,
    dependPass: dependPass,
  };

  const dependenPass = {
    DependPass: dependPass,
  };

  const accommodationInfo = {
    Accommodation: accommodation,
    "Accommodation Address": accommodationAddress,
  };

  const insuranceInfo = {
    "Accident Insurance": accidentIns,
  };

  const workInfo = {
    employeeDetails: {
      "Contract End Date": formatDate(contractEnd),
      "Contract Period": contractPeriod,
      "Contract Start Date": formatDate(contractStart),
      Department: department,
      "Date of Joining": formatDate(doj),
      "Employee ID": empID,
      "HR Representative": hr,
      "Job Category": jobCat,
      "Job Description": jobDesc,
      Manager: manager,
      "Other Department": otherDepartment,
      "Other Job Category": otherJobCat,
      "Other Position": otherPosition,
      Position: position,
      "Probation End Date": formatDate(probationEnd),
      "Probation Start Date": formatDate(probationStart),
      "Relationship Status": relationship,
      "Salary Type": salaryType,
      "SAP Number": sapNo,
      "Skill Pool": skillPool,
      Supervisor: supervisor,
      "Upgrade Date": formatDate(upgradeDate),
      "Upgrade Position": upgradePosition,
      "Work Hours per Day": workHrs,
      "Work Month": workMonth,
      "Work Status": workStatus,
      "Work Week": workWeek,
    },

    LeaveDetails: {
      "Annual Leave": annualLeave,
      "Annual Leave Date": annualLeaveDate,
      "Compassionate Leave": compasLeave,
      "Compassionate Leave Date": formatDate(compasLeaveDate),
      "Leave Pass Date": formatDate(dateLeavePass),
      "Destination Leave Pass": formatDate(destinateLeavePass),
      "Duration Leave Pass": durLeavePass,
      "Employee ID": empID,
      "Leave Pass": leavePass,
      "Maternity Leave": materLeave,
      "Maternity Leave Date": formatDate(materLeaveDate),
      "Marriage Leave": mrageLeave,
      "Marriage Leave Date": formatDate(mrageLeaveDate),
      "Paternity Leave": paterLeave,
      "Paternity Leave Date": formatDate(paterLeaveDate),
      "Sick Leave": sickLeave,
      "Sick Leave Date": formatDate(sickLeaveDate),
    },

    TerminateDetails: {
  
      "Other Resignation Not Confirmed": otherResignNotConf,
      "Other Resignation Not Probation": otherResignNotProb,
      "Other Termination Not Confirmed": otherTermiNotConf,
      "Other Termination Not Probation": otherTermiNotProb,
      "Resignation Reason": reasonResign,
      "Termination Reason": reasonTerminate,
      "Resignation Date": resignDate,
      "Resignation Not Confirmed": resignNotConf,
      "Resignation Not Probation": resignNotProb,
      "Termination Date": termiDate,
      "Termination Not Confirmed": termiNotConf,
      "Termination Not Probation": termiNotProb,
      "Work Info Uploads": workInfoUploads,
    },



    ServiceRoad: {
      "Dependent Employee": depEmp,
      "Dependent Employee Date": formatDate(depEmpDate),
      "Position Revision": positionRev,
      "Position Revision Date": formatDate(positionRevDate),
      "Remark for Work Info": remarkWI,
      "Revised ALD": revALD,
      "Revised Annual Leave": revAnnualLeave,
      "Revised Leave Date": formatDate(revLeaveDate),
      "Revised Leave Pass": revLeavePass,
      "Revised Salary": revSalary,
      "Revised Salary Date": formatDate(revSalaryDate),
      "Upload Annual Leave": uploadAL,
      "Upload Dependent Info": uploadDep,
      "Upload Leave Pass": uploadLP,
      "Upload Position Revision": uploadPR,
      "Upload Supporting Docs": uploadSP,
    },
  };

  console.log(
    contractEnd, "positon eeeee")

  const workPass = {
    doe: {
      "Date Of Submission": formatDate(doeEmpSubmit),
      "Date Of Approval": formatDate(doeEmpApproval),
      "Valid Until": formatDate(doeEmpValid),
      "DOE Reference Number": doeEmpRefNo,
      "DOE Employee Upload": doeEmpUpload,
    },

    labourDeposit: {
      "Labour Deposit Receipt Number": lbrReceiptNo,
      "Deposit Amount": lbrDepoAmt,
      "Date Endorsement Of Labour Deposit": lbrDepoSubmit,
      "Employee Upload": lbrDepoUpload,
    },

    swap: {
      "Client Support Letter Requested Date": formatDate(sawpEmpLtrReq),
      "Client Support Letter Received Date": formatDate(sawpEmpLtrReci),
      "SAWP Employee Upload": sawpEmpUpload,
    },

    national: {
      "Type of Work Permit Application": permitType,
      "Date Of Submission": formatDate(nlmsEmpSubmit),
      "Submission Reference Number": nlmsEmpSubmitRefNo,
      "Date Of Approval": formatDate(nlmsEmpApproval),
      "LD Reference Number": nlmsRefNo,
      "Valid Until": formatDate(nlmsEmpValid),
      "Employee Upload": nlmsEmpUpload,
    },

    bank: {
      "Date Of Submission": formatDate(bankSubmit),
      "Date Received": formatDate(bankRece),
      "BG Reference Number": bankRefNo,
      "Bank Guarantee Amount": bankAmt,
      "Bank Valid Until": formatDate(bankValid),
      "Employee Upload": bankEmpUpload,
      "Date Endorsement Of BG": formatDate(bankEndorse),
    },

    jitpa: {
      "TBA Purchase Date": formatDate(tbaPurchase),
      "JITPA Amount": jitpaAmt,
      "Valid Until": formatDate(jpValid),
      "Date Endorsement Of Jitpa": formatDate(jpEndorse),
      "Employee Upload": jpEmpUpload,
    },

    immigration: {
      "Passport no": ppNo,
     
    },
  };

  console.log(workInfoUploads, "DPLK em");

  // const documents = parseDocumentData(passingValue.empUpDocs);
  const documentsTwo = parseDocumentData(passingValue.uploadBwn);
  const documentThree = parseDocumentData(passingValue.workInfoUploads);
  

  return (
    <section className="bg-white flex fixed top-0 left-0 bg-grey w-full h-full z-[9999] center">
      <div className="bg-white py-10 px-10 h-screen w-[85%]">
        <div className="empScroll border bg-white px-10 overflow-y-auto h-[90vh] space-y-5 rounded-lg w-full">
          <div className="bg-white mt-6 sticky top-0 flex justify-between items-center z-40">
            <div className="max-w-[200px] w-full">
              <img src={logo} alt="Logo not found" />
            </div>
            <h6 className="text-center text-2xl font-medium text-dark_grey">
              Employee Details
            </h6>
            <p onClick={handleFormShow} className="text-2xl text-dark_grey">
              <FaWindowClose />
            </p>
          </div>
          <div className="">
            <TabNavigation
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
            <div className="mt-5">
              {activeTab === 0 && (
                <PersonalDetails
                  personalDetails={personalDetails}
                  profilePhoto={profilePhoto}
                  // documents={documents}
                  isPdfOpen={isPdfOpen}
                  viewingDocument={viewingDocument}
                  pageNumber={pageNumber}
                  numPages={numPages}
                  handleViewDocument={handleViewDocument}
                  handleCloseViewer={handleCloseViewer}
                  onDocumentLoadSuccess={onDocumentLoadSuccess}
                  setPageNumber={setPageNumber}
                  inducBriefUp={inducBriefUp}
                  applicationUpload={applicationUpload} 
                  bwnUpload={bwnUpload}
                  cvCertifyUpload={cvCertifyUpload}
                  loiUpload={loiUpload}
                  myIcUpload={myIcUpload}
                  paafCvevUpload={paafCvevUpload}
                  ppUpload={ppUpload}
                  supportDocUpload={supportDocUpload} 
                />
              )}
              {activeTab === 1 && (
                <EducationalDetails educationalDetails={educationalDetails} handlePrint={handlePrint} invoiceRef={invoiceRef} />
              )}
              {activeTab === 2 && (
                <FamilyDetails familyDetails={familyDetails} handlePrint={handlePrint} invoiceRef={invoiceRef} />
              )}
              {activeTab === 3 && (
                <MedicalDetails
                  medicalInfo={medicalInfo}
                  dependenPass={dependenPass}
                  uploadFitness={uploadFitness}
                  uploadBwn={uploadBwn}
                  documentsTwo={documentsTwo}
                  uploadRegis={uploadRegis}
                  handlePrint={handlePrint} invoiceRef={invoiceRef} 
                />
              )}
              {activeTab === 4 && (
                <AccommodationDetails accommodationInfo={accommodationInfo} handlePrint={handlePrint} invoiceRef={invoiceRef} />
              )}
              {activeTab === 5 && (
                <InsuranceDetails insuranceInfo={insuranceInfo} handlePrint={handlePrint} invoiceRef={invoiceRef} />
              )}
              {activeTab === 6 && <WorkInfo 
              workInfo={workInfo}
              documentThree={documentThree}
              isPdfOpen={isPdfOpen}
              viewingDocument={viewingDocument}
              setViewingDocument={setViewingDocument}
              pageNumber={pageNumber}
              numPages={numPages}
              handleViewDocument={handleViewDocument}
              handleCloseViewer={handleCloseViewer}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              setPageNumber={setPageNumber}
              uploadAL={uploadAL}
              uploadDep={uploadDep}
              uploadLP={uploadLP}
              uploadPR={uploadPR}
              uploadSP={uploadSP}
              handlePrint={handlePrint} invoiceRef={invoiceRef} 
               />}
              {activeTab === 7 && (
                <WorkPass
                  workPass={workPass}
                  doeEmpUpload={doeEmpUpload}
                  lbrDepoUpload={lbrDepoUpload}
                  sawpEmpUpload={sawpEmpUpload}
                  nlmsEmpUpload={nlmsEmpUpload}
                  bankEmpUpload={bankEmpUpload}
                  jpEmpUpload={jpEmpUpload}
                  isPdfOpen={isPdfOpen}
                  viewingDocument={viewingDocument}
                  pageNumber={pageNumber}
                  numPages={numPages}
                  handleViewDocument={handleViewDocument}
                  handleCloseViewer={handleCloseViewer}
                  onDocumentLoadSuccess={onDocumentLoadSuccess}
                  setPageNumber={setPageNumber}
                  inducBriefUp={inducBriefUp}
                  handlePrint={handlePrint} invoiceRef={invoiceRef} 
                />
              )}
              {activeTab === 8 && <EmployeeDocuments empUpDocs={empUpDocs} handlePrint={handlePrint} invoiceRef={invoiceRef} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
