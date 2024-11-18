import React from "react";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import logo from "../assets/logo/logo-with-name.svg";

const getDisplayValue = (value) => value || "Not Provided";

// Helper function to render PDF iframe
const renderPdfLink = (pdfUrl, label) => {
  return pdfUrl ? (
    <div className="mt-3">
      <strong>{label}:</strong>
      <iframe
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        title={`${label} PDF`}
        className="w-full h-[600px] border mt-2"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  ) : null;
};

export const DetailsShowingForm = ({ passingValue, handleFormShow }) => {
  console.log(passingValue);
  const [activeTab, setActiveTab] = useState(0); // Track active tab
  const [currentPage, setCurrentPage] = useState(1);

  // Tab click handlers
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setCurrentPage(1); // Reset page number when tab changes
  };

  const {
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
    // position,
    ppDestinate,
    ppExpiry,
    ppIssued,
    ppNo,
    preEmp,
    preEmpPeriod,
    profilePhoto,
    race,
    religion,
    // sapNo,
    sawpEmpLtrReci,
    sawpEmpLtrReq,
    sawpEmpUpload,
    tbaPurchase,
    uploadBwn,
    uploadFitness,
    uploadRegis,

    //work info
    contractEnd,
    contractPeriod,
    contractStart,
    createdAt,
    department,
    doj,
    // empID,
    hr,
    id,
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
    updatedAt,
    upgradeDate,
    upgradePosition,
    workHrs,
    workMonth,
    workStatus,
    workWeek,
  } = passingValue;

  // Grouped Data
  const personalDetails = {
    Name: name,
    "Employee ID": empID,
    "Date Of Birth": dob,
    Age: age,
    Gender: gender,
    Position: position,
    Nationality: nationality,
    Race: race,
    Religion: religion,
    "Contact No": contactNo,
    "Alternate Number": alternateNo,
    Email: email,
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
    "Empoyement Type": empType,
    "Employee Badge No": empBadgeNo,
    // EmpUpDocs: empUpDocs,
    "Sap No": sapNo,
    "Official Email": officialEmail,
    Chinese: chinese,
    Cob: cob,
    "Agent Name": agent,
    "Date of Induction Briefing": inducBrief,
    "Induction Briefing Upload": inducBriefUp,
    "Brunei IC Colour": bwnIcColour,
    "Brunei IC Expiry": bwnIcExpiry,
    "Brunei IC Number": bwnIcNo,
    "Malaysian IC Number": myIcNo,
    "Passport no": ppNo,
    "Passport issued destination": ppDestinate,
    "Passport Expiry": ppExpiry,
    "Passport Issue Date": ppIssued,
    "Previous Employment Details": preEmp,
    "Previous Employment Period": preEmpPeriod,
  };

  const educationalDetails = {
    "Education Details": eduDetails,
    "Highlight Education": educLevel,
  };

  const familyInfo = {
    FamilyDetails: familyDetails,
  };

  // const EmployeeInfo = {
  //   Position: position,
  //   "Contract Type": contractType,
  //   "Empoyement Type": empType,
  //   "Employee Badge No": empBadgeNo,
  //   // EmpUpDocs: empUpDocs,
  //   "Sap No": sapNo,
  //   "Official Email": officialEmail,
  // };

  const medicalInfo = {
    "Overseas Medical Fitness issued date": overMD, // overseas medical
    "Overseas Medical Fitness Expiry": overME, //overseas expiray
    UploadFitness: uploadFitness,
    "Date submitted of BruHims Registration": bruhimsRD, // registration date
    "BruHims Registration Number": bruhimsRNo, // registration no
    "BruHims Medical Deatails": uploadBwn,
    "Brunei Medical Appointment Date": bruneiMAD, // medical appointment date
    "Brunei Medical Fitness Expiry": bruneiME, // medical expiray
    "Brunei Medical Deatails": uploadRegis,
    DependPass: dependPass, //
  };

  const accommodationInfo = {
    Accommodation: accommodation,
    "Accommodation Address": accommodationAddress,
  };

  const insuranceInfo = {
    "Accident Insurance": accidentIns,
  };

  const workPass = {
    // Doe
    doe: {
      "Date Of Submission": doeEmpSubmit,
      "Date Of Approval": doeEmpApproval,
      "Valid Until": doeEmpValid,
      "DOE Reference Number": doeEmpRefNo,
      "DOE Employee Upload": doeEmpUpload,
    },

    // Labour Deposit
    labourDeposit: {
      "Labour Deposit Receipt Number": lbrReceiptNo,
      "Deposit Amount": lbrDepoAmt,
      "Date Endorsement Of Labour Deposit": lbrDepoSubmit,
      "Employee Upload": lbrDepoUpload,
    },

    // SWAP
    swap: {
      "Client Support Letter Requested Date": sawpEmpLtrReq,
      "Client Support Letter Received Datee": sawpEmpLtrReci,
      "SAWP Employee Upload,": sawpEmpUpload,
    },

    // National
    national: {
      "Type of Work Permit Application": permitType,
      "Date Of Submission": nlmsEmpSubmit,
      "Submission Reference Number": nlmsEmpSubmitRefNo,
      "Date Of Approval": nlmsEmpApproval,
      "LD Reference Number": nlmsRefNo,
      "Valid Until": nlmsEmpValid,
      "Employee Upload": nlmsEmpUpload,
    },

    // Bank
    bank: {
      "Date Of Submission": bankSubmit,
      "Date Received": bankRece,
      "BG Reference Numbe": bankRefNo,
      "Bank Guarantee Amount": bankAmt,
      "Bank Valid Until": bankValid,
      "Date Endorsement Of BG": bankEndorse,
      "Employee Upload": bankEmpUpload,
    },

    // JITPA
    jitpa: {
      "TBA Purchase Date": tbaPurchase,
      "JITPA Amount": jitpaAmt,
      "Valid Until": jpValid,
      "Date Endorsement Of Jitpa": jpEndorse,
      "Employee Upload": jpEmpUpload,
    },

    // Immigration
    immigration: {
      "Passport no": ppNo,
      ppDestinate,
      ppExpiry,
      ppIssued,
    },
  };

  console.log(dependPass, "DPLK");

  // Helper function to render embedded PDFs at the bottom using Google Docs viewer
  // const renderPdfLink = (pdfUrl, label) => {
  //   return pdfUrl ? (
  //     <div className="mt-3">
  //       <strong>{label}:</strong>
  //       <iframe
  //         src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
  //         title={`${label} PDF`}
  //         className="w-full h-[600px] border mt-2"
  //         frameBorder="0"
  //         allowFullScreen
  //       ></iframe>
  //     </div>
  //   ) : null;
  // };

  // const renderPdfLink = (pdfs) => {
  //   if (pdfs && typeof pdfs === 'object') {
  //     // Loop through the object and create an iframe for each PDF URL
  //     return Object.entries(pdfs).map(([label, url], index) => (
  //       <div key={index} className="mt-3">
  //         <strong>{label}:</strong>
  //         <iframe
  //           src={`https://docs.google.com/gview?url=${url}&embedded=true`}
  //           title={`${label} PDF`}
  //           className="w-full h-[600px] border mt-2"
  //           frameBorder="0"
  //           allowFullScreen
  //         ></iframe>
  //       </div>
  //     ));
  //   }
  //   return <p>No PDFs available</p>;
  // };

  // const EmpUpDocs = {
  //   "Passport Copy": "https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/Passport%20Copy%2FEthirajulu%20Kannappan%2FDummy%20Passport.pdf",
  //   "CV & Certificates": "https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/CV%20%26%20Certificates%2FEthirajulu%20Kannappan%2FDummy%20Certificate.pdf"
  // };

  // const renderPdfLink = (pdfs, labelPrefix) => {
  //   if (pdfs && typeof pdfs === 'object') {
  //     return Object.entries(pdfs).map(([label, url], index) => (
  //       <div key={index} className="mt-3">
  //         <strong>{labelPrefix ? `${labelPrefix}: ${label}` : label}:</strong>
  //         <iframe
  //           src={`https://docs.google.com/gview?url=${url}&embedded=true`}
  //           title={`${label} PDF`}
  //           className="w-full h-[600px] border mt-2"
  //           frameBorder="0"
  //           allowFullScreen
  //         ></iframe>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };

  // Render UI
  return (
    <section className="bg-white flex fixed top-0 left-0 bg-grey w-full h-full z-[9999] center">
      <div className="bg-white py-10 px-10 h-screen w-[85%]">
        <div className="empScroll border bg-white px-10 overflow-y-auto h-[90vh] space-y-5 rounded-lg w-full">
          <div className="bg-white mt-6 sticky top-0 flex justify-between items-center">
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

          {/* Tab Navigation */}
          <div className="sticky top-11 mt-4 bg-white flex justify-between items-center ">
            <p className="text_size_5">
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 0 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(0)}
              >
                Personal Details
              </span>
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 1 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(1)}
              >
                Educational Details
              </span>
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 2 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(2)}
              >
                Family Details
              </span>
              {/* {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 3 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(3)}
              >
                Employee Information
              </span> */}
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 4 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(4)}
              >
                Medical Details
              </span>
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 5 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(5)}
              >
                Accommodation Non Local Details
              </span>
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 6 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(6)}
              >
                Insurance Details
              </span>
              {" -> "}
              <span
                className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
                  activeTab === 7 && "after:bg-primary"
                }`}
                onClick={() => handleTabClick(7)}
              >
                Work Pass
              </span>
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === 0 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Personal Details:
              </h6>
              <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                {/* Personal details */}
                <div className="flex-1 ">
                  <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                    {Object.entries(personalDetails).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-center text-gray-700">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>

                {/* Profile Image */}
                <div className="w-[250px] h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
                  <img
                    src={profilePhoto || "/path/to/default-photo.jpg"}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {renderPdfLink(inducBriefUp, "Induction Briefing Upload")}
              </div>
            </section>
          )}

          {activeTab === 1 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Education Details:
              </h6>
              <div className="flex flex-col items-start gap-8">
                {/* Educational Information */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                    {Object.entries(educationalDetails).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  {renderPdfLink(uploadFitness, "UploadFitness")}
                  {renderPdfLink(uploadBwn, "BruHims Medical Deatails")}
                  {renderPdfLink(uploadRegis, "Brunei Medical Deatails")}
                </div>
              </div>
            </section>
          )}

          {activeTab === 2 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Family Details:
              </h6>
              <div className="space-y-6">
                {/* Check if familyDetails is available and properly formatted */}
                {Array.isArray(familyDetails) && familyDetails.length > 0 ? (
                  JSON.parse(familyDetails).map((family, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                    >
                      <h6 className="font-semibold text-lg text-gray-800 mb-4">
                        Family Member {index + 1}
                      </h6>
                      <div className="grid grid-cols-3 gap-y-2 items-center">
                        <span className="text-gray-800">Name</span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">
                          {family?.name || "Null"}
                        </span>

                        <span className="text-gray-800  pr-2">
                          Relationship
                        </span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">
                          {family?.relationship || "Null"}
                        </span>

                        <span className="text-gray-800  pr-2">Contact</span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">
                          {family?.contact || "Null"}
                        </span>

                        <span className="text-gray-800  pr-2">Address</span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">
                          {family?.address || "Null"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No family details available.</p>
                )}
              </div>
            </section>
          )}

          {/* {activeTab === 3 && (
            <section className="py-8 bg-gray-50 rounded-lg shadow-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Employee Information:
              </h6>
              <div className="space-y-6">
              
                <div className="grid grid-cols-3 gap-y-4 items-center">
                  {Object.entries(EmployeeInfo).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <span className="text-gray-800">{key}</span>
                      <span className="text-gray-500 text-center">:</span>
                      <span className="text-gray-800">
                        {value || "Null"}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="space-y-4">
                  {renderPdfLink(bankEmpUpload, "Bank Emp Upload")}
                  {renderPdfLink(jpEmpUpload, "Jp Emp Upload")}
             
                </div>
              </div>
            </section>
          )} */}

          {activeTab === 4 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Medical Details:
              </h6>
              <div className="space-y-6">
                {/* Medical Details */}
                <div className="grid grid-cols-3 gap-y-4 items-center">
                  {Object.entries(medicalInfo).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <span className="text-gray-800">{key}</span>
                      <span className="text-gray-500 text-center">:</span>
                      <span className="text-gray-800">{value || "Null"}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 5 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                Accommodation Details:
              </h6>
              <div className="space-y-6">
                {/* Accommodation Details */}
                <div className="grid grid-cols-3 gap-y-4 items-center">
                  {Object.entries(accommodationInfo).map(
                    ([key, value], index) => (
                      <React.Fragment key={index}>
                        <span className="text-gray-800">{key}</span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">{value || "Null"}</span>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            </section>
          )}
          {activeTab === 6 && (
            <section className="py-3">
              <h6 className="uppercase text_size_5 text-dark_grey my-3">
                Insurance Details:
              </h6>
              <div className="grid grid-cols-3 gap-y-2 items-center">
                {Object.entries(insuranceInfo).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    <span className="text-gray-800">{key}</span>
                    <span className="text-gray-500 text-center">:</span>
                    <span className="text-gray-800">{value || "Null"}</span>
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}

          {activeTab === 7 && (
            <section className="py-8 bg-gray-50 rounded-lg">
              <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
                WorkPass:
              </h6>

              <div className="space-y-6">
                {/* Doe Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    Doe
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.doe).map(([key, value], index) => (
                      <React.Fragment key={index}>
                        <span className="text-gray-800">{key}</span>
                        <span className="text-gray-500 text-center">:</span>
                        <span className="text-gray-800">{value || "Null"}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(doeEmpUpload, "DOE Employee Upload")}
                  </div>
                </div>

                {/* Labour Deposit Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    Labour Deposit
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.labourDeposit).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(lbrDepoUpload, "Employee Upload")}
                  </div>
                </div>

                {/* SWAP Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    SWAP
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.swap).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(sawpEmpUpload, "SAWP Employee Upload")}
                  </div>
                </div>

                {/* National Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    National
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.national).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(nlmsEmpUpload, "Employee Upload")}
                  </div>
                </div>

                {/* Bank Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    Bank
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.bank).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(bankEmpUpload, "Employee Upload")}
                  </div>
                </div>

                {/* JITPA Section */}
                <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    JITPA
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.jitpa).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderPdfLink(jpEmpUpload, "Employee Upload")}
                  </div>
                </div>

                {/* Immigration Section */}
                {/* <div>
                  <h6 className="text-lg font-semibold text-dark_grey mb-4">
                    Immigration
                  </h6>
                  <div className="grid grid-cols-3 gap-y-4 items-center">
                    {Object.entries(workPass.immigration).map(
                      ([key, value], index) => (
                        <React.Fragment key={index}>
                          <span className="text-gray-800">{key}</span>
                          <span className="text-gray-500 text-center">:</span>
                          <span className="text-gray-800">
                            {value || "Null"}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div> */}

                {/* PDF Document Links */}
                {/* <div className="space-y-4">
                  {renderPdfLink(doeEmpUpload, "Doe Emp Upload")}
                  {renderPdfLink(lbrDepoUpload, "Lbr Depo Upload")}
                  {renderPdfLink(sawpEmpUpload, "Sawp Emp Upload")}
                  {renderPdfLink(nlmsEmpUpload, "Nlms Emp Upload")}
                </div> */}
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
