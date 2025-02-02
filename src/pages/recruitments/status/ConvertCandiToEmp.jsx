import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import {
  createCandIToEMP,
  createEmpPersonalInfo,
  createEmpWorkInfo,
  createIDDetails,
  updateInterviewSchedule,
} from "../../../graphql/mutations";

export const CandiToEmp = () => {
  const client = generateClient();
  const SumbitCandiToEmp = useCallback(
    async ({ storedData }) => {

      if (!storedData) {
        throw new Error("Missing required parameters");
      }
      // const MigrationData = {
      //   empID: storedData.empID,
      //   age: storedData.age,
      //   agent: storedData.agent,
      //   alternateNo: storedData.alternateNo,
      //   bwnIcColour: storedData.bwnIcColour,
      //   bwnIcExpiry: storedData.bwnIcExpiry,
      //   bwnIcNo: storedData.bwnIcNo,
      //   chinese: storedData.chinese,
      //   cob: storedData.cob,
      //   contactNo: storedData.contactNo,
      //   contractType: storedData.contractType,
      //   crime: storedData.crime,
      //   crimeDesc: storedData.crimeDesc,
      //   desc: storedData.desc,
      //   disease: storedData.disease,
      //   diseaseDesc: storedData.diseaseDesc,
      //   dob: storedData.dob,
      //   driveLic: storedData.driveLic,
      //   educLevel: storedData.eduDetails,
      //   email: storedData.email,
      //   emgDetails: storedData.emgDetails,
      //   empStatement: storedData.empStatement,
      //   empType: storedData.empType,
      //   familyDetails: storedData.familyDetails,
      //   gender: storedData.gender,
      //   department: storedData.interviewDetails_department,
      //   interDate: storedData.interviewDetails_interDate,
      //   interTime: storedData.interviewDetails_interTime,
      //   interType: storedData.interviewDetails_interType,
      //   manager: storedData.interviewDetails_manager,
      //   message: storedData.interviewDetails_message,
      //   managerBadgeNo: storedData.interviewDetails_bagdeNo,
      //   otherDepartment: storedData.interviewDetails_otherDepartment,
      //   venue: storedData.interviewDetails_venue,
      //   lang: storedData.lang,
      //   liquor: storedData.liquor,
      //   liquorDesc: storedData.liquorDesc,
      //   marital: storedData.marital,
      //   cvecApproveDate: storedData.mobilizationDetails_cvecApproveDate,
      //   cvecFile: storedData.mobilizationDetails_cvecFile,
      //   declineReason: storedData.mobilizationDetails_declineReason,
      //   loiAcceptDate: storedData.mobilizationDetails_loiAcceptDate,
      //   loiDeclineDate: storedData.mobilizationDetails_loiDeclineDate,
      //   loiFile: storedData.mobilizationDetails_loiFile,
      //   loiIssueDate: storedData.mobilizationDetails_loiIssueDate,
      //   mobFile: storedData.mobilizationDetails_mobFile,
      //   mobSignDate: storedData.mobilizationDetails_mobSignDate,
      //   paafApproveDate: storedData.mobilizationDetails_paafApproveDate,
      //   paafFile: storedData.mobilizationDetails_paafFile,
      //   name: storedData.name,
      //   nationality: storedData.nationality,
      //   noExperience: storedData.noExperience,
      //   pcNoticePeriod: storedData.noticePeriod,
      //   otherNation: storedData.otherNation,
      //   otherRace: storedData.otherRace,
      //   otherReligion: storedData.otherReligion,
      //   perID: storedData.perIDesc,
      //   perIS: storedData.perIS,
      //   permanentAddress: storedData.permanentAddress,
      //   position: storedData.position,
      //   ppDestinate: storedData.ppDestinate,
      //   ppExpiry: storedData.ppExpiry,
      //   ppIssued: storedData.ppIssued,
      //   ppNo: storedData.ppNo,
      //   presentAddress: storedData.permanentAddress,
      //   profilePhoto: storedData.profilePhoto,
      //   race: storedData.race,
      //   referees: storedData.referees,
      //   relatives: storedData.relatives,
      //   religion: storedData.religion,
      //   salaryExpectation: storedData.salaryExpectation,
      //   supportInfo: storedData.supportInfo,
      //   uploadCertificate: storedData.uploadCertificate,
      //   ppUpload: storedData.uploadPp,
      //   cvCertifyUpload: storedData.uploadResume,
      //   workExperience: storedData.workExperience,
      // };
      // console.log(MigrationData);

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
        educLevel: storedData.eduDetails,
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
        cvCertifyUpload: JSON.stringify(storedData.uploadResume),
        driveLic: storedData.driveLic,
        nationality: storedData.nationality,
        otherNation: storedData.otherNation,
        otherRace: storedData.otherRace,
        otherReligion: storedData.otherReligion,
        ppDestinate: [storedData.ppDestinate],
        ppExpiry: [storedData.ppExpiry],
        ppIssued: [storedData.ppIssued],
        ppNo: [storedData.ppNo],
        ppUpload: JSON.stringify(storedData.uploadPp),
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
        uploadCertificate: JSON.stringify(storedData.uploadCertificate),
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
   try{   const [empPIResponse, IDResponse, candiResponse, workResponse] =
    await Promise.all([
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
    ]);

  // console.log("Emp Personal Info:", empPIResponse.data);
  // console.log("ID Details:", IDResponse.data);
  // console.log("Candidate to Employee:", candiResponse.data);
  // console.log("Work Info:", workResponse.data);

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
      
    }).catch((err)=>{
console.log(err);

    })
  
  }catch(err){console.log(err);
   }
    },
    [client]
  );

  return { SumbitCandiToEmp };
};
