// import React, { useContext } from "react";
import { generateClient } from "@aws-amplify/api";
import {
  createBJLDetails,
  createCandIToEMP,
  createDNDetails,
  createEmpPersonalInfo,
  createEmpWorkInfo,
  createIDDetails,
  createPassportValid,
  createSawpDetails,
} from "../../../graphql/mutations";

export const CandiToEmp = async ({ storedData }) => {
  const client = generateClient();

  if (!storedData) {
    throw new Error("Missing required parameters");
  }

  // console.log("Stored", storedData);

  const currentDate = new Date().toISOString().split("T")[0];

  const wrapUpload = (filePath) => {
    return filePath ? [{ upload: filePath, date: currentDate }] : null;
  };

  const isJSONStringWithUpload = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) && parsed[0]?.upload;
    } catch (e) {
      return false;
    }
  };

  const wrapUploadSmart = (value) => {
    if (!value) return [];

    // Already a JSON string in desired format
    if (typeof value === "string" && isJSONStringWithUpload(value)) {
      return [value];
    }

    // Assume it's a raw path
    return [JSON.stringify(wrapUpload(value))];
  };

  const empPersonalInfoTable = {
    empID: storedData.empID,
    age: storedData.age || null,
    aTQualify: storedData.aTQualify || "",
    alternateNo: storedData.alternateNo || "",
    agent: storedData.agentname
      ? [storedData.agentname]
      : storedData.agent
      ? [storedData.agent]
      : [],
    bankName: storedData.bankName || "",
    bankAccNo: storedData.bankAccNo || "",
    contactNo: storedData.contactNo ? [storedData.contactNo] : [],
    cob: storedData.cob || "",
    contractType: storedData.contractType ? [storedData.contractType] : [],
    ctryOfOrigin: storedData.ctryOfOrigin || "",
    chinese: storedData.chinese || "",
    dob: storedData.dob || "",
    educLevel: storedData.educLevel || "",
    email: storedData.email || "",
    eduDetails: storedData.eduDetails ? storedData.eduDetails : [],
    empBadgeNo: storedData.empBadgeNo || "",
    empType: storedData.empType ? [storedData.empType] : [],
    familyDetails: storedData.familyDetails ? storedData.familyDetails : [],
    gender: storedData.gender || "",
    lang: storedData.lang || "",
    marital: storedData.marital || "",
    name: storedData.name,
    officialEmail: storedData.officialEmail || "",
    oCOfOrigin: storedData.oCOfOrigin || "",
    profilePhoto: storedData.profilePhoto || "",
    permanentAddress: storedData.permanentAddress
      ? [storedData.permanentAddress]
      : [],
    position: storedData.position ? [storedData.position] : [],
    sapNo: storedData.sapNo || "",
    otherLang: storedData.otherLang || "",
  };

  const IDDetailsTable = {
    empID: storedData.empID,
    bwnIcColour: storedData.bwnIcColour || "",
    bwnIcExpiry: storedData.bwnIcExpiry ? [storedData.bwnIcExpiry] : [],
    bwnIcNo: storedData.bwnIcNo || "",
    driveLic: storedData.driveLic || "",
    nationality: storedData.nationality || "",
    otherNation: storedData.otherNation || "",
    otherRace: storedData.otherRace || "",
    otherReligion: storedData.otherReligion || "",
    ppDestinate: storedData.ppDestinate ? [storedData.ppDestinate] : [],
    ppExpiry: storedData.ppExpiry ? [storedData.ppExpiry] : [],
    ppIssued: storedData.ppIssued ? [storedData.ppIssued] : [],
    ppNo: storedData.ppNo ? [storedData.ppNo] : [],
    race: storedData.race || "",
    religion: storedData.religion || "",
    cvCertifyUpload: wrapUploadSmart(storedData.uploadResume),
    qcCertifyUpload: wrapUploadSmart(storedData.uploadCertificate),
    ppUpload: wrapUploadSmart(storedData.uploadPp),
    bwnUpload: wrapUploadSmart(storedData.uploadIc),
    loiUpload: storedData.loiFile
      ? wrapUploadSmart(storedData.loiFile)
      : wrapUploadSmart(storedData.mobilizationDetails_loiFile),
    paafCvevUpload: storedData.cvecFile
      ? wrapUploadSmart(storedData.cvecFile)
      : storedData.paafFile
      ? wrapUploadSmart(storedData.paafFile)
      : storedData.mobilizationDetails_cvecFile
      ? wrapUploadSmart(storedData.mobilizationDetails_cvecFile)
      : wrapUploadSmart(storedData.mobilizationDetails_paafFile),
  };

  const CandiToEmpTable = {
    empID: storedData.empID,
    crime: storedData.crime || "",
    crimeDesc: storedData.crimeDesc || "",
    emgDetails: storedData.emgDetails ? storedData.emgDetails : [],
    empStatement: storedData.empStatement || "",
    noExperience: storedData.noExperience || "",
    desc: storedData.desc || "",
    disease: storedData.disease || "",
    diseaseDesc: storedData.diseaseDesc || "",
    liquor: storedData.liquor || "",
    liquorDesc: storedData.liquorDesc || "",
    perID: storedData.perIDesc || "",
    perIS: storedData.perIS || "",
    referees: storedData.referees ? storedData.referees : [],
    relatives: storedData.relatives ? storedData.relatives : [],
    salaryExpectation: storedData.salaryExpectation || "",
    supportInfo: storedData.supportInfo || "",
    workExperience: storedData.workExperience ? storedData.workExperience : [],
    mobFile: storedData.mobilizationDetails_mobFile || "",
    mobSignDate: storedData.mobilizationDetails_mobSignDate || "",
    paafApproveDate: storedData.mobilizationDetails_paafApproveDate || "",
    paafFile: storedData.mobilizationDetails_paafFile || "",
    cvecApproveDate: storedData.mobilizationDetails_cvecApproveDate || "",
    cvecFile: storedData.mobilizationDetails_cvecFile || "",
    declineReason: storedData.mobilizationDetails_declineReason || "",
    loiAcceptDate: storedData.mobilizationDetails_loiAcceptDate || "",
    loiDeclineDate: storedData.mobilizationDetails_loiDeclineDate || "",
    loiFile: storedData.loiFile
      ? wrapUploadSmart(storedData.loiFile)
      : storedData.mobilizationDetails_loiFile
      ? wrapUploadSmart(storedData.mobilizationDetails_loiFile)
      : [],
    loiIssueDate: storedData.mobilizationDetails_loiIssueDate || "",
    uploadCertificate: storedData.uploadCertificate
      ? wrapUploadSmart(storedData.uploadCertificate)
      : [],
    pcNoticePeriod: storedData.noticePeriod || "",
    venue: storedData.interviewDetails_venue || "",
    message: storedData.interviewDetails_message || "",
    managerBadgeNo: storedData.interviewDetails_bagdeNo || "",
    interDate: storedData.interviewDetails_interDate || "",
    interTime: storedData.interviewDetails_interTime || "",
    interType: storedData.interviewDetails_interType || "",
  };

  const workInfoTable = {
    empID: storedData.empID,
    department: storedData.interviewDetails_department
      ? [storedData.interviewDetails_department]
      : [],
    otherDepartment: storedData.interviewDetails_otherDepartment
      ? [storedData.interviewDetails_otherDepartment]
      : [],
    position: storedData.position ? [storedData.position] : [],
  };

  const sawpDetails = {
    empID: storedData.empID,
    sawpEmpLtrReq: storedData.WPTrackDetails_sawpDate
      ? [storedData.WPTrackDetails_sawpDate]
      : [],
    sawpEmpLtrReci: storedData.WPTrackDetails_sawpRecivedDate
      ? [storedData.WPTrackDetails_sawpRecivedDate]
      : [],
    sawpEmpUpload: storedData.WPTrackDetails_sawpFile
      ? wrapUploadSmart(storedData.WPTrackDetails_sawpFile)
      : [],
  };

  const DNDetails = {
    empID: storedData.empID,
    doeEmpSubmit: storedData.WPTrackDetails_doesubmitdate
      ? [storedData.WPTrackDetails_doesubmitdate]
      : [],
    doeEmpApproval: storedData.WPTrackDetails_doeapprovedate
      ? [storedData.WPTrackDetails_doeapprovedate]
      : [],
    doeEmpValid: storedData.WPTrackDetails_doeexpirydate
      ? [storedData.WPTrackDetails_doeexpirydate]
      : [],
    doeEmpRefNo: storedData.WPTrackDetails_doerefno
      ? [storedData.WPTrackDetails_doerefno]
      : [],
    doeEmpUpload: storedData.WPTrackDetails_doefile
      ? wrapUploadSmart(storedData.WPTrackDetails_doefile)
      : [],
    nlmsEmpSubmit: storedData.WPTrackDetails_nlmssubmitdate
      ? [storedData.WPTrackDetails_nlmssubmitdate]
      : [],
    nlmsEmpSubmitRefNo: storedData.WPTrackDetails_submissionrefrenceno
      ? [storedData.WPTrackDetails_submissionrefrenceno]
      : [],
    nlmsEmpApproval: storedData.WPTrackDetails_nlmsapprovedate
      ? [storedData.WPTrackDetails_nlmsapprovedate]
      : [],
    nlmsRefNo: storedData.WPTrackDetails_ldreferenceno
      ? [storedData.WPTrackDetails_ldreferenceno]
      : [],
    nlmsEmpValid: storedData.WPTrackDetails_nlmsexpirydate
      ? [storedData.WPTrackDetails_nlmsexpirydate]
      : [],
    nlmsEmpUpload: storedData.WPTrackDetails_nlmsfile
      ? wrapUploadSmart(storedData.WPTrackDetails_nlmsfile)
      : [],
    permitType: [],
  };

  const BJLDetails = {
    empID: storedData.empID,
    bankSubmit: storedData.WPTrackDetails_bgsubmitdate
      ? [storedData.WPTrackDetails_bgsubmitdate]
      : [],
    bankRece: storedData.WPTrackDetails_bgreceivedate
      ? [storedData.WPTrackDetails_bgreceivedate]
      : [],
    bankRefNo: storedData.WPTrackDetails_referenceno
      ? [storedData.WPTrackDetails_referenceno]
      : [],
    bankAmt: storedData.WPTrackDetails_bgamount
      ? [storedData.WPTrackDetails_bgamount]
      : [],
    bankValid: storedData.WPTrackDetails_bgexpirydate
      ? [storedData.WPTrackDetails_bgexpirydate]
      : [],
    bankEndorse: storedData.WPTrackDetails_bgendorsedate
      ? [storedData.WPTrackDetails_bgendorsedate]
      : [],
    bankEmpUpload: storedData.WPTrackDetails_bgfile
      ? wrapUploadSmart(storedData.WPTrackDetails_bgfile)
      : [],
    tbaPurchase: storedData.WPTrackDetails_tbapurchasedate
      ? [storedData.WPTrackDetails_tbapurchasedate]
      : [],
    jitpaAmt: storedData.WPTrackDetails_jitpaamount
      ? [storedData.WPTrackDetails_jitpaamount]
      : [],
    jpValid: storedData.WPTrackDetails_jitpaexpirydate
      ? [storedData.WPTrackDetails_jitpaexpirydate]
      : [],
    jpEndorse: storedData.WPTrackDetails_submitdateendorsement
      ? [storedData.WPTrackDetails_submitdateendorsement]
      : [],
    jpEmpUpload: storedData.WPTrackDetails_jitpafile
      ? wrapUploadSmart(storedData.WPTrackDetails_jitpafile)
      : [],
    lbrReceiptNo: storedData.WPTrackDetails_lbrDepoNum
      ? [storedData.WPTrackDetails_lbrDepoNum]
      : [],
    lbrDepoAmt: storedData.WPTrackDetails_lbrDepoAmount
      ? [storedData.WPTrackDetails_lbrDepoAmount]
      : [],
    lbrDepoSubmit: storedData.WPTrackDetails_lbrEndroseDate
      ? [storedData.WPTrackDetails_lbrEndroseDate]
      : [],
    lbrDepoUpload: storedData.WPTrackDetails_lbrFile
      ? wrapUploadSmart(storedData.WPTrackDetails_lbrFile)
      : [],
  };

  const PassportValid = {
    empID: storedData.empID,
    immigEmpUpload: storedData.WPTrackDetails_visaFile
      ? wrapUploadSmart(storedData.WPTrackDetails_visaFile)
      : [],
    immigRefNo: storedData.WPTrackDetails_immbdno || "",
    ppSubmit: storedData.WPTrackDetails_docsubmitdate
      ? [storedData.WPTrackDetails_docsubmitdate]
      : [],
    immigApproval: storedData.WPTrackDetails_visaapprovedate
      ? [storedData.WPTrackDetails_visaapprovedate]
      : [],
  };

  // console.log("empPersonalInfoTable:", empPersonalInfoTable);
  // console.log("IDDetailsTable:", IDDetailsTable);
  // console.log("CandiToEmpTable:", CandiToEmpTable);
  // console.log("workInfoTable:", workInfoTable);
  // console.log("sawpDetails:", sawpDetails);
  // console.log("DNDetails:", DNDetails);
  // console.log("BJLDetails:", BJLDetails);
  // console.log("PassportValid:", PassportValid);

  return client
    .graphql({
      query: createEmpPersonalInfo,
      variables: { input: empPersonalInfoTable },
    })
    .then((empPIResponse) => {
      console.log("createEmpPersonalInfo response:", empPIResponse);

      return client.graphql({
        query: createIDDetails,
        variables: { input: IDDetailsTable },
      });
    })
    .then((IDResponse) => {
      console.log("createIDDetails response:", IDResponse);

      return client.graphql({
        query: createCandIToEMP,
        variables: { input: CandiToEmpTable },
      });
    })
    .then((candiResponse) => {
      console.log("createCandIToEMP response:", candiResponse);

      return client.graphql({
        query: createEmpWorkInfo,
        variables: { input: workInfoTable },
      });
    })
    .then((workResponse) => {
      console.log("createEmpWorkInfo response:", workResponse);

      return client.graphql({
        query: createSawpDetails,
        variables: { input: sawpDetails },
      });
    })
    .then((sawpResponse) => {
      console.log("createSawpDetails response:", sawpResponse);

      return client.graphql({
        query: createDNDetails,
        variables: { input: DNDetails },
      });
    })
    .then((dnResponse) => {
      console.log("createDNDetails response:", dnResponse);

      return client.graphql({
        query: createBJLDetails,
        variables: { input: BJLDetails },
      });
    })
    .then((bjlResponse) => {
      console.log("createBJLDetails response:", bjlResponse);

      return client.graphql({
        query: createPassportValid,
        variables: { input: PassportValid },
      });
    })
    .then((passportResponse) => {
      console.log("createPassportValid response:", passportResponse);
      return {
        success: true,
        message: "All operations completed successfully",
      };
    })
    .catch((err) => {
      console.error("CandiToEmp Error:", err);
      return {
        success: false,
        message: "An error occurred during submission",
        error: err.message,
      };
    });
};
