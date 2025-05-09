import React, { useState, useRef } from "react";
import TabNavigation from "./TabNavigation";
import PersonalDetailsView from "./PersonalDetailsView";
import FamilyDetails from "./FamilyDetails";
import MedicalDetails from "./MedicalDetails";
import AccommodationDetails from "./AccommodationDetails";
import InsuranceDetails from "./InsuranceDetails";
import WorkInfoView from "./WorkInfoView";
import { WorkPassView } from "./WorkPassView";
import { FaWindowClose } from "react-icons/fa";
import logo from "../../assets/logo/logo-with-name.svg";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

export const DetailsShowingForm = ({ passingValue, handleFormShow }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const invoiceRef = useRef();
  const mainRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
    pageStyle: `
      @page {       
        height:  874px;
        padding: 22px, 0px, 22px, 0px;     
      }
    `,
  });

  const handlePrintMain = useReactToPrint({
    content: () => mainRef.current,
    onBeforePrint: () => console.log("Preparing print for Item 2..."),
    onAfterPrint: () => console.log("Print complete for Item 2"),
    pageStyle: `
      @page {
        margin: 500mm;
      }
      body {
        
      }
      .page {
        page-break-after: always;
      }
    `,
  });

  const parseDocumentData = (data) => {
    if (!data || !Array.isArray(data) || typeof data[0] !== "string") {
      return {};
    }
    let docString = data[0];
    if (docString.startsWith("{") && docString.endsWith("}")) {
      docString = docString.slice(1, -1);
    }
    const docEntries = docString.split(",").map((item) => item.trim());

    const docObject = docEntries.reduce((acc, entry) => {
      const [label, url] = entry.split("=").map((part) => part.trim());
      if (label && url) {
        acc[label] = decodeURIComponent(url);
      }
      return acc;
    }, {});

    return docObject;
  };

  // Handle clicking on "View Document"
  const handleViewDocument = (url) => {
    setViewingDocument(url);
    setIsPdfOpen(true);
    setPageNumber(1);
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
  };

  const formatDate = (dateInput) => {
    if (dateInput === null || dateInput === undefined) {
      return "N/A";
    }

    if (Array.isArray(dateInput)) {
      return dateInput.map((dateString) => {
        if (dateString === null || dateString === undefined) {
          return "N/A";
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "N/A";
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      });
    }

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "N/A";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const {
    empStatusType,
    bankAccNo,
    bankName,
    insuranceClaims,
    age,
    email,
    aTQualify,
    agent,
    alternateNo,
    accidentIns,
    accommodation,
    accommodationAddress,
    bankAmt,
    bankEmpUpload,
    bankEndorse,
    bankRece,
    bankRefNo,
    bankSubmit,
    bankValid,
    bruhimsRD,
    bruhimsRNo,
    bruneiMAD,
    bruneiME,
    bwnIcColour,
    bwnIcExpiry,
    bwnIcNo,
    chinese,
    cob,
    otherLang,
    contactNo,
    contractType,
    ctryOfOrigin,
    dependPass,
    dob,
    doeEmpApproval,
    doeEmpRefNo,
    doeEmpSubmit,
    doeEmpUpload,
    doeEmpValid,
    driveLic,
    eduDetails,
    educLevel,
    empBadgeNo,
    empID,
    empType,
    empUpDocs,
    familyDetails,
    gender,
    inducBrief,
    inducBriefUp,
    jitpaAmt,
    jpEmpUpload,
    jpEndorse,
    jpValid,
    lang,
    lbrDepoAmt,
    lbrDepoSubmit,
    lbrDepoUpload,
    lbrReceiptNo,
    marital,
    myIcNo,
    name,
    nationalCat,
    nationality,
    nlmsEmpApproval,
    nlmsEmpSubmit,
    nlmsEmpSubmitRefNo,
    nlmsEmpUpload,
    nlmsEmpValid,
    nlmsRefNo,
    oCOfOrigin,
    officialEmail,
    otherNation,
    otherRace,
    otherReligion,
    overMD,
    overME,
    permanentAddress,
    permitType,
    ppDestinate,
    ppExpiry,
    ppIssued,
    ppNo,
    preEmp,
    preEmpPeriod,
    profilePhoto,
    race,
    religion,
    sawpEmpLtrReci,
    sawpEmpLtrReq,
    sawpEmpUpload,
    tbaPurchase,
    uploadBwn,
    uploadFitness,
    uploadRegis,
    contractEnd,
    contractPeriod,
    contractStart,
    department,
    doj,
    hr,
    jobCat,
    jobDesc,
    manager,
    otherDepartment,
    otherJobCat,
    otherPosition,
    position,
    probationEnd,
    probationStart,
    relationship,
    salaryType,
    sapNo,
    skillPool,
    supervisor,
    upgradeDate,
    upgradePosition,
    workHrs,
    workMonth,
    workStatus,
    workWeek,
    annualLeave,
    annualLeaveDate,
    dateLeavePass,
    destinateLeavePass,
    durLeavePass,
    leavePass,
    materLeave,
    mrageLeave,
    paterLeave,
    sickLeave,
    sickLeaveDate,
    otherResignNotConf,
    otherResignNotProb,
    otherTermiNotConf,
    otherTermiNotProb,
    reasonResign,
    reasonTerminate,
    resignDate,
    resignNotConf,
    resignNotProb,
    termiDate,
    termiNotConf,
    termiNotProb,
    workInfoUploads,
    depEmp,
    depEmpDate,
    positionRev,
    positionRevDate,
    remarkWI,
    revALD,
    revAnnualLeave,
    revLeaveDate,
    revLeavePass,
    revSalary,
    revSalaryDate,
    uploadAL,
    uploadDep,
    uploadLP,
    uploadPR,
    uploadSP,
    applicationUpload,
    bwnUpload,
    cvCertifyUpload,
    qcCertifyUpload,
    loiUpload,
    myIcUpload,
    paafCvevUpload,
    ppUpload,
    supportDocUpload,
    WIContract,
    WILeaveEntitle,
    WIProbation,
    WIResignation,
    WITermination,
    groupIns,
    groupInsEffectDate,
    groupInsEndDate,
    travelIns,
    empInsUpload,
    depInsurance,
    airTktStatus,
    reEntryVisa,
    immigApproval,
    reEntryVisaExp,
    remarkImmig,
    ppLocation,
    arrivStampExp,
    immigRefNo,
    ppSubmit,
    empPassExp,
    empPassStatus,
    arrivStampUpload,
    immigEmpUpload,
    reEntryUpload,
    probDuration,
    hospLeave,
    pervAnnualLeaveBal,
    workmenCompNo,
    workExperience,
  } = passingValue;

  const cleanLanguageData = (lang) => {
    if (!lang || lang === "N/A") return "N/A";

    // Handle array case
    if (Array.isArray(lang)) {
      return lang.filter((l) => l && l.trim()).join(", ");
    }

    // Handle string case (like "[, English, Mandarin]")
    if (typeof lang === "string") {
      return lang
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((l) => l.trim())
        .filter((l) => l && l !== "N/A")
        .join(", ");
    }

    return "N/A";
  };

  let parsedWorkExperience = [];
  try {
    parsedWorkExperience = Array.isArray(workExperience)
      ? JSON.parse(workExperience[0])
      : [];
  } catch (err) {
    console.error("Failed to parse workExperience:", err);
  }

  const defaultPreEmp =
    preEmp || (parsedWorkExperience[0]?.name ?? "Not Available");
  const defaultPreEmpPeriod =
    preEmpPeriod ||
    (parsedWorkExperience[0]?.from
      ? `${formatDate(parsedWorkExperience[0].from)} To ${
          parsedWorkExperience[0]?.to
            ? formatDate(parsedWorkExperience[0].to)
            : "Present"
        }`
      : "Not Available");

  const formatValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && (value.length === 0 || value[0] === ""))
    ) {
      return "N/A";
    }
    return value;
  };

  const personalDetails = {
    Name: name,
    "Chinese character": chinese,
    "Employee ID": empID,
    "Employee Badge Number": empBadgeNo,
    "Sap Number": sapNo,
    "Contract Type": contractType,
    "Employee Type": empType,
    Position:
      Array.isArray(position) && position.length > 0
        ? position[0]
        : "Position not available",
    "Date Of Birth": formatDate(dob),
    Age: age,
    Gender: gender,
    "Marital Status": marital,
    "Country of birth": cob,
    "Country of Origin": ctryOfOrigin,
    "Other country of origin": oCOfOrigin,
    "National Category": nationalCat,
    Nationality: nationality,
    "Other Nationality": otherNation,
    Religion: religion,
    "Other Religion": otherReligion,
    Race: race,
    "Other Race": otherRace,
    "Brunei IC Number": bwnIcNo,
    "Brunei IC Colour": bwnIcColour,
    "Brunei IC Expiry": formatDate(bwnIcExpiry),
    "Malaysian IC Number": myIcNo,
    "Passport number": ppNo,
    "Passport Issue Date": formatDate(ppIssued),
    "Passport Expiry": formatDate(ppExpiry),
    "Passport issued destination": ppDestinate,
    Email: email,
    "Official Email": officialEmail,
    Address: permanentAddress,
    "Contact No": contactNo,
    "Alternate Number": alternateNo,
    Language: cleanLanguageData(lang),
    "Other Language": otherLang,
    "Driving License": driveLic,
    "Agent Name": formatValue(agent),
    "Company Name of Previous Employment": defaultPreEmp,
    "Previous Employment Period": defaultPreEmpPeriod,
    "Date of Induction Briefing": formatDate(inducBrief),
    "Bank name": bankName,
    "Bank account number": bankAccNo,
  };

  const educationalDetails = {
    "Education Level": educLevel,
    // "Education Details": eduDetails,
    "Academic / Technical qualification": aTQualify,
  };

  const medicalInfo = {
    "Overseas Medical Fitness issued date": overMD,
    "Overseas Medical Fitness Expiry": overME,
    "Date submitted of BruHims Registration": bruhimsRD,
    "BruHims Registration Number": bruhimsRNo,
    "Brunei Medical Appointment Date": bruneiMAD,
    "Brunei Medical Fitness Expiry": bruneiME,
  };

  const dependenPass = {
    DependPass: dependPass,
  };

  const accommodationInfo = {
    Accommodation: accommodation,
    "Accommodation Address": accommodationAddress,
  };

  const insuranceInfo = {
    "Group H&S Insurance": groupIns,
    "Group H&S Insurance Enrollment Effective Date":
      formatDate(groupInsEffectDate),
    "Group H&S Insurance Enrollment End Date": formatDate(groupInsEndDate),
    "Workmen Compensation Insurance": empStatusType,
    "Workmen compensation insurance policy number": workmenCompNo,
    "Personal Accident Insurance": accidentIns,
    "Travelling Insurance": travelIns,
  };

  const DependentInsurance = {
    "Dependent Insurance": depInsurance,
  };

  const InsuranceClaim = {
    "Insurance Claim": insuranceClaims,
  };

  const workInfo = {
    employeeDetails: {
      Department: department,
      "Other Department": otherDepartment,
      Position: position,
      "Other Position": otherPosition,
      "Job Category": jobCat,
      "Other Job Category": otherJobCat,
      "Date of Joining": formatDate(doj),
      "Job Description": jobDesc,
      "Skill Pool": skillPool,
      HR: hr,
      Manager: manager,
      Supervisor: supervisor,
      "Employee Status": relationship,
      "Upgrade Position": upgradePosition,
      "Position Upgrade Effective date": formatDate(upgradeDate),
      "Contract Period Status": contractPeriod,
      "Contract Start Date": formatDate(contractStart),
      "Contract End Date": formatDate(contractEnd),
      "Probation Start Date": formatDate(probationStart),
      "Probation End Date": formatDate(probationEnd),
      "Probation Duration": probDuration,
      "Normal Working Hours Per Day": workHrs,
      "Normal Working Day per Week": workWeek,
      "Normal Working Day per Month": workMonth,
      "Employment Work Status": workStatus,
      "Type of Salary Pay": salaryType,
    },

    LeaveDetails: {
      "Leave Passage Entitlement for Non-Local": leavePass,
      "Date of Leave Passage Entitlement After Contract":
        formatDate(dateLeavePass),
      "Duration Period of Leave Passage Entitlement": durLeavePass,
      "Destination of Leave Passage Entitlement": destinateLeavePass,
      "Annual Leave Entitlement": annualLeave,
      "Annual Leave Effective Date": formatDate(annualLeaveDate),
      "Sick Leave Entitlement": sickLeave,
      "Sick Leave Effective Date": formatDate(sickLeaveDate),
      "Maternity Leave Entitlement": materLeave,
      "Paternity Leave Entitlement": paterLeave,
      "Marriage Leave Entitlement": mrageLeave,
      "Hospitalisation Leave Entitlement": hospLeave,
      "Previous Year Annual Leave Balance": pervAnnualLeaveBal,
    },

    TerminateDetails: {
      "Date of Resignation": formatDate(resignDate),
      "Resignation Notice during Probation": resignNotProb,
      "Other Resignation Notice Probation": otherResignNotProb,
      "Resignation Notice after Confirmation": resignNotConf,
      "Other Resignation Notice Confirmation": otherResignNotConf,
      "Reason of Resignation": reasonResign,
      "Date of Termination": formatDate(termiDate),
      "Termination Notice during Probation": termiNotProb,
      "Other Termination Not Probation": otherTermiNotProb,
      "Termination Notice after Confirmation": termiNotConf,
      "Other Termination Not Confirmed": otherTermiNotConf,
      "Reason of Termination": reasonTerminate,
    },

    ServiceRoad: {
      "Position Revision": positionRev,
      "Position Revision Effective Date": formatDate(positionRevDate),
      "Salary Package Revision": revSalary,
      "Salary Package Revision Effective Date": formatDate(revSalaryDate),
      "Leave Passage Revision": revLeavePass,
      "Leave Passage Revision Effective Date": formatDate(revLeaveDate),
      "Annual Leave Revison": revAnnualLeave,
      "Annual Leave Revison Effective Date": formatDate(revALD),
      "Change of Department": depEmp,
      "Change of Department Effective Date": formatDate(depEmpDate),
      "Remarks for Work Info": remarkWI,
    },
  };

  const workPass = {
    doe: {
      "Date Of Submission": formatDate(doeEmpSubmit),
      "Date Of Approval": formatDate(doeEmpApproval),
      "Valid Until": formatDate(doeEmpValid),
      "DOE Reference Number": doeEmpRefNo,
    },

    labourDeposit: {
      "Labour Deposit Receipt Number": lbrReceiptNo,
      "Deposit Amount": lbrDepoAmt,
      "Date Endorsement Of Labour Deposit": formatDate(lbrDepoSubmit),
    },

    swap: {
      "Client Support Letter Requested Date": formatDate(sawpEmpLtrReq),
      "Client Support Letter Received Date": formatDate(sawpEmpLtrReci),
    },

    national: {
      "Type of Work Permit Application": permitType,
      "Date Of Submission": formatDate(nlmsEmpSubmit),
      "Submission Reference Number": nlmsEmpSubmitRefNo,
      "Date Of Approval": formatDate(nlmsEmpApproval),
      "LD Reference Number": nlmsRefNo,
      "Valid Until": formatDate(nlmsEmpValid),
    },

    bank: {
      "Date Of Submission": formatDate(bankSubmit),
      "Date Received": formatDate(bankRece),
      "BG Reference Number": bankRefNo,
      "Bank Guarantee Amount": bankAmt,
      "Bank Guarantee Valid Until": formatDate(bankValid),
      "Date Endorsement Of BG": formatDate(bankEndorse),
    },

    jitpa: {
      "TBA Purchase Date": formatDate(tbaPurchase),
      "JITPA Amount": jitpaAmt,
      "Valid Until": formatDate(jpValid),
      "Date Endorsement Of JITPA": formatDate(jpEndorse),
    },

    immigration: {
      "Original Passport Location": ppLocation,
      "Date Of Arrival Stamping Expiry": formatDate(arrivStampExp),
      "Immigration Reference Number": cleanLanguageData(immigRefNo),
      "Passport Submit Date To Immigration Dept": formatDate(ppSubmit),
      "Employment Pass Expiry": formatDate(empPassExp),
      "Employment Pass Status": empPassStatus,
      "Air Ticket Status": airTktStatus,
      "Re-entry Visa Application": reEntryVisa,
      "Date Approved by Immigration Dept": formatDate(immigApproval),
      "Re-Entry Visa Expiry": formatDate(reEntryVisaExp),
      "Remarks for Immigration": remarkImmig,
    },
  };

  const documentsTwo = parseDocumentData(passingValue.uploadBwn);
  const documentThree = parseDocumentData(passingValue.workInfoUploads);

  return (
    <>
      <section className="bg-white flex flex-col fixed top-0 left-0 bg-grey w-full h-full z-[9999] center">
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
                  <PersonalDetailsView
                    personalDetails={personalDetails}
                    profilePhoto={profilePhoto}
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
                    qcCertifyUpload={qcCertifyUpload}
                    loiUpload={loiUpload}
                    myIcUpload={myIcUpload}
                    paafCvevUpload={paafCvevUpload}
                    ppUpload={ppUpload}
                    supportDocUpload={supportDocUpload}
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    educationalDetails={educationalDetails}
                    formatDate={formatDate}
                    mainRef={mainRef}
                  />
                )}

                {activeTab === 1 && (
                  <FamilyDetails
                    familyDetails={familyDetails}
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    formatDate={formatDate}
                    mainRef={mainRef}
                  />
                )}

                {activeTab === 2 && (
                  <WorkInfoView
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
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    WIContract={WIContract}
                    WILeaveEntitle={WILeaveEntitle}
                    WIProbation={WIProbation}
                    WIResignation={WIResignation}
                    WITermination={WITermination}
                    formatDate={formatDate}
                    mainRef={mainRef}
                  />
                )}
                {activeTab === 3 && (
                  <WorkPassView
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
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    formatDate={formatDate}
                    arrivStampUpload={arrivStampUpload}
                    immigEmpUpload={immigEmpUpload}
                    reEntryUpload={reEntryUpload}
                    mainRef={mainRef}
                  />
                )}

                {activeTab === 4 && (
                  <MedicalDetails
                    medicalInfo={medicalInfo}
                    dependenPass={dependenPass}
                    uploadFitness={uploadFitness}
                    uploadBwn={uploadBwn}
                    documentsTwo={documentsTwo}
                    uploadRegis={uploadRegis}
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    dependPass={dependPass}
                    formatDate={formatDate}
                    mainRef={mainRef}
                  />
                )}

                {activeTab === 5 && (
                  <InsuranceDetails
                    insuranceInfo={insuranceInfo}
                    DependentInsurance={DependentInsurance}
                    InsuranceClaim={insuranceClaims}
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    depInsurance={depInsurance}
                    empInsUpload={empInsUpload}
                    formatDate={formatDate}
                    mainRef={mainRef}
                  />
                )}

                {activeTab === 6 && (
                  <AccommodationDetails
                    accommodationInfo={accommodationInfo}
                    handlePrint={handlePrint}
                    invoiceRef={invoiceRef}
                    mainRef={mainRef}
                  />
                )}
              </div>
              <div className="flex justify-center py-6">
                <button
                  onClick={handlePrintMain}
                  className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2 "
                >
                  Print
                  <FaPrint className="ml-2 mt-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
