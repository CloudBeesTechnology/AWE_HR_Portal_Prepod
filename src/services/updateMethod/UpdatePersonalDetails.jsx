import { useCallback } from "react";
import {
  updateEducationDetails,
  updatePersonalDetails,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";

export const CandyDetails = () => {
  const client = generateClient();

  const candyDetails  = useCallback(async ({ reqValue }) => {
    if (!reqValue ) {
      throw new Error("Missing required parameters");
    }

    const {
      // id,
      tempID,
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
      status,
      PDTableID,
      EDTableID
    } = reqValue;
 

    const totalData = {
      id:PDTableID,
      tempID,
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
    };

    const totalDataTwo = {
      id:EDTableID,
      tempID,
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
    };

  
    

    // console.log("Total Data",totalData);
    // console.log("Total DataT",totalDataTwo);

    try {
      const [personaldetails,educationDetails] = await Promise.all([
        client.graphql({
          query: updatePersonalDetails,
          variables: { input: totalData },
        }),
        client.graphql({
          query: updateEducationDetails,
          variables: { input: totalDataTwo,  },
        }),
      ]);
      // console.log("update", personaldetails,educationDetails);
      // localStorage.removeItem("applicantFormData");
      // localStorage.removeItem("personalFormData");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { candyDetails };
};
