import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import {
  createBJLDetails,
  createCandIToEMP,
  createDNDetails,
  createEmpPersonalInfo,
  createEmpWorkInfo,
  createIDDetails,
  createPassportValid,
  createSawpDetails,
  updateInterviewSchedule,
} from "../../../graphql/mutations";

export const CandiToEmp = () => {
  const client = generateClient();
  const SumbitCandiToEmp = useCallback(
    async ({ storedData }) => {
      if (!storedData) {
        throw new Error("Missing required parameters");
      }

      const empPersonalInfoTable = {
        empID: storedData.empID,
        age: storedData.age,
        agent: [storedData.agent],
        alternateNo: storedData.alternateNo,
        chinese: storedData.chinese,
        cob: storedData.cob,
        contactNo: [storedData.contactNo],
        contractType: [storedData.contractType],
        dob: storedData.dob,
        eduDetails: storedData.eduDetails,
        email: storedData.email,
        empType: [storedData.empType],
        familyDetails: storedData.familyDetails,
        gender: storedData.gender,
        lang: storedData.lang,
        marital: storedData.marital,
        name: storedData.name,
        profilePhoto: storedData.profilePhoto,
        permanentAddress: [storedData.permanentAddress],
        position: [storedData.position],
      };

      const IDDetailsTable = {
        empID: storedData.empID,
        bwnIcColour: storedData.bwnIcColour,
        bwnIcExpiry: [storedData.bwnIcExpiry],
        bwnIcNo: storedData.bwnIcNo,
        cvCertifyUpload: storedData.uploadResume,
        driveLic: storedData.driveLic,
        nationality: storedData.nationality,
        otherNation: storedData.otherNation,
        otherRace: storedData.otherRace,
        otherReligion: storedData.otherReligion,
        ppDestinate: [storedData.ppDestinate],
        ppExpiry: [storedData.ppExpiry],
        ppIssued: [storedData.ppIssued],
        ppNo: [storedData.ppNo],
        ppUpload: storedData.uploadPp,
        race: storedData.race,
        religion: storedData.religion,
      };

      const CandiToEmpTable = {
        empID: storedData.empID,
        crime: storedData.crime,
        crimeDesc: storedData.crimeDesc,
        emgDetails: storedData.emgDetails,
        empStatement: storedData.empStatement,
        noExperience: storedData.noExperience,
        desc: storedData.desc,
        disease: storedData.disease,
        diseaseDesc: storedData.diseaseDesc,
        liquor: storedData.liquor,
        liquorDesc: storedData.liquorDesc,
        perID: storedData.perIDesc,
        perIS: storedData.perIS,
        referees: storedData.referees,
        relatives: storedData.relatives,
        salaryExpectation: storedData.salaryExpectation,
        supportInfo: storedData.supportInfo,
        workExperience: storedData.workExperience,
        mobFile: storedData.mobilizationDetails_mobFile,
        mobSignDate: storedData.mobilizationDetails_mobSignDate,
        paafApproveDate: storedData.mobilizationDetails_paafApproveDate,
        paafFile: storedData.mobilizationDetails_paafFile,
        cvecApproveDate: storedData.mobilizationDetails_cvecApproveDate,
        cvecFile: storedData.mobilizationDetails_cvecFile,
        declineReason: storedData.mobilizationDetails_declineReason,
        loiAcceptDate: storedData.mobilizationDetails_loiAcceptDate,
        loiDeclineDate: storedData.mobilizationDetails_loiDeclineDate,
        loiFile: storedData.mobilizationDetails_loiFile,
        loiIssueDate: storedData.mobilizationDetails_loiIssueDate,
        uploadCertificate: storedData.uploadCertificate,
        pcNoticePeriod: storedData.noticePeriod,
        venue: storedData.interviewDetails_venue,
        message: storedData.interviewDetails_message,
        managerBadgeNo: storedData.interviewDetails_bagdeNo,
        interDate: storedData.interviewDetails_interDate,
        interTime: storedData.interviewDetails_interTime,
        interType: storedData.interviewDetails_interType,
      };

      const workInfoTable = {
        empID: storedData.empID,
        department: [storedData.interviewDetails_department],
        otherDepartment: [storedData.interviewDetails_otherDepartment],
        position: [storedData.position],
      };

      const sawpDetails = {
        empID: storedData.empID,
        // sawpEmpLtrReq: empty,
        sawpEmpLtrReci: [storedData.WPTrackDetails_sawpRecivedDate],
        sawpEmpUpload: storedData.WPTrackDetails_sawpFile,
      };

      const DNDetails = {
        empID: storedData.empID,
        doeEmpSubmit: [storedData.WPTrackDetails_doesubmitdate],
        doeEmpApproval: [storedData.WPTrackDetails_doeapprovedate],
        doeEmpValid: [storedData.WPTrackDetails_doeexpirydate],
        doeEmpRefNo: [storedData.WPTrackDetails_doerefno],
        doeEmpUpload: storedData.WPTrackDetails_doefile,
        nlmsEmpSubmit: [storedData.WPTrackDetails_nlmssubmitdate],
        nlmsEmpSubmitRefNo: [storedData.WPTrackDetails_submissionrefrenceno],
        nlmsEmpApproval: [storedData.WPTrackDetails_nlmsapprovedate],
        nlmsRefNo: [storedData.WPTrackDetails_ldreferenceno],
        nlmsEmpValid: [storedData.WPTrackDetails_nlmsexpirydate],
        nlmsEmpUpload: storedData.WPTrackDetails_nlmsfile,
      };

      const BJLDetails = {
        empID: [storedData.empID],
        bankSubmit: [storedData.WPTrackDetails_bgsubmitdate],
        bankRece: [storedData.WPTrackDetails_bgreceivedate],
        bankRefNo: [storedData.WPTrackDetails_referenceno],
        bankAmt: [storedData.WPTrackDetails_bgamount],
        bankValid: [storedData.WPTrackDetails_bgexpirydate],
        bankEmpUpload: storedData.WPTrackDetails_bgfile,
        tbaPurchase: [storedData.WPTrackDetails_tbapurchasedate],
        jitpaAmt: [storedData.WPTrackDetails_jitpaamount],
        jpValid: [storedData.WPTrackDetails_jitpaexpirydate],
        jpEndorse: [storedData.WPTrackDetails_submitdateendorsement],
        jpEmpUpload: storedData.WPTrackDetails_jitpafile,
        lbrReceiptNo: [storedData.WPTrackDetails_lbrDepoNum],
        lbrDepoAmt: [storedData.WPTrackDetails_lbrDepoAmount],
        lbrDepoSubmit: [storedData.WPTrackDetails_lbrEndroseDate],
        lbrDepoUpload: storedData.WPTrackDetails_lbrFile,
      };

      const PassportValid = {
        // ppLocation: [String],
        arrivStampUpload: storedData.WPTrackDetails_airticketfile,
        immigEmpUpload: storedData.WPTrackDetails_visaFile,
        // reEntryUpload: [AWSJSON],
        // arrivStampExp: [String],
        immigRefNo: [storedData.WPTrackDetails_visareferenceno],
        ppSubmit: [storedData.WPTrackDetails_immbdno],
        // empPassExp: [String],
        // empPassStatus: [String],
        // airTktStatus: [String],
        // reEntryVisa: [String],
        immigApproval: [storedData.WPTrackDetails_visaapprovedate],
        // reEntryVisaExp: [String],
        // remarkImmig: [String],
      };

      try {
        const [
          empPIResponse,
          IDResponse,
          candiResponse,
          workResponse,
          sawpResponse,
          dnResponse,
          bjlResponse,
          passportResponse,
        ] = await Promise.all([
          client.graphql({
            query: createEmpPersonalInfo,
            variables: { input: empPersonalInfoTable },
          }),
          client.graphql({
            query: createIDDetails,
            variables: { input: IDDetailsTable },
          }),
          client.graphql({
            query: createCandIToEMP,
            variables: { input: CandiToEmpTable },
          }),
          client.graphql({
            query: createEmpWorkInfo,
            variables: { input: workInfoTable },
          }),
          client.graphql({
            query: createSawpDetails,
            variables: { input: sawpDetails },
          }),
          client.graphql({
            query: createDNDetails,
            variables: { input: DNDetails },
          }),
          client.graphql({
            query: createBJLDetails,
            variables: { input: BJLDetails },
          }),
          client.graphql({
            query: createPassportValid,
            variables: { input: PassportValid },
          }),
        ]);

        console.log("createEmpPersonalInfo response:", empPIResponse);
        console.log("createIDDetails response:", IDResponse);
        console.log("createCandIToEMP response:", candiResponse);
        console.log("createEmpWorkInfo response:", workResponse);
        console.log("createSawpDetails response:", sawpResponse);
        console.log("createDNDetails response:", dnResponse);
        console.log("createBJLDetails response:", bjlResponse);
        console.log("createPassportValid response:", passportResponse);

        const updatingStatus = await client
          .graphql({
            query: updateInterviewSchedule,
            variables: {
              input: {
                id: storedData.interviewDetails_id,
                status: "Employee",
              },
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    [client]
  );

  return { SumbitCandiToEmp };
};
