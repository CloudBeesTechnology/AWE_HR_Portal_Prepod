import { useCallback } from "react";
import {
  createEducationDetails,
  createPersonalDetails,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";

export const RecODFunc = () => {
  const client = generateClient();
  const submitODFunc = useCallback(async ({ reqValue, latestTempIDData }) => {
    if (!reqValue || !latestTempIDData) {
      throw new Error("Missing required parameters");
    }

    const {
      crime,
      crimeDesc,
      emgDetails,
      noExperience,
      empStatement,
      desc,
      disease,
      diseaseDesc,
      liquor,
      liquorDesc,
      noticePeriod,
      perIS,
      perIDesc,
      referees,
      relatives,
      salaryExpectation,
      supportInfo,
      age,
      alternateNo,
      agent,
      bwnIcNo,
      bwnIcExpiry,
      bwnIcColour,
      contactNo,
      cob,
      contractType,
      chinese,
      dob,
      driveLic,
      email,
      empType,
      eduDetails,
      familyDetails,
      gender,
      lang,
      otherLang,
      marital,
      name,
      nationality,
      otherNation,
      otherRace,
      otherReligion,
      ppNo,
      ppIssued,
      ppExpiry,
      ppDestinate,
      presentAddress,
      permanentAddress,
      profilePhoto,
      position,
      race,
      religion,
      workExperience,
      uploadResume,
      uploadCertificate,
      uploadPp,
      uploadIc,
      status,
      createdBy,
    } = reqValue;

    const totalData = {
      tempID: latestTempIDData,
      crime,
      crimeDesc,
      emgDetails,
      noExperience,
      empStatement,
      desc,
      disease,
      diseaseDesc,
      liquor,
      liquorDesc,
      noticePeriod,
      perIS,
      perIDesc,
      referees,
      relatives,
      salaryExpectation,
      supportInfo,
      uploadResume,
      uploadCertificate,
      uploadPp,
      uploadIc,
      createdBy,
    };

    const totalData1 = {
      tempID: latestTempIDData,
      age,
      alternateNo,
      agent,
      bwnIcNo,
      bwnIcExpiry,
      bwnIcColour,
      contactNo,
      cob,
      contractType,
      chinese,
      dob,
      driveLic,
      email,
      empType,
      eduDetails,
      familyDetails,
      gender,
      lang,
      otherLang,
      marital,
      name,
      nationality,
      otherNation,
      otherRace,
      otherReligion,
      ppNo,
      ppIssued,
      ppExpiry,
      ppDestinate,
      presentAddress,
      permanentAddress,
      profilePhoto,
      position,
      race,
      religion,
      status,
      workExperience,
      createdBy,
    };

    console.log(totalData);
    console.log(totalData1);

    try {
      await Promise.all([
        client.graphql({
          query: createPersonalDetails,
          variables: { input: totalData1 },
        }),
        client.graphql({
          query: createEducationDetails,
          variables: { input: totalData },
        }),
      ]);
      // console.log("Server Response", res);
      // localStorage.removeItem("applicantFormData");
      // localStorage.removeItem("personalFormData");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; 
    }
  }, []);
  return { submitODFunc };
};
