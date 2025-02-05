import { generateClient } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import {
  updateEmpPersonalInfo,
  updateIDDetails,
} from "../../graphql/mutations";

export const UpdateEmpInfo = () => {
  const client = generateClient();
  const [errorEmpID, setErrorEmpID] = useState("");
  const UpdateEIValue = useCallback(async ({ collectValue }) => {
    if (!collectValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
      PITableID,
      IDTable,
      bwnIcNo,
      bwnIcColour,
      bwnIcExpiry,
      driveLic,
      inducBrief,
      inducBriefUp,
      myIcNo,
      nationality,
      nationalCat,
      otherNation,
      otherRace,
      otherReligion,
      ppNo,
      ppIssued,
      ppExpiry,
      ppDestinate,
      preEmp,
      preEmpPeriod,
      profilePhoto,
      race,
      religion,
      bwnUpload,
      applicationUpload,
      cvCertifyUpload,
      loiUpload,
      myIcUpload,
      paafCvevUpload,
      ppUpload,
      supportDocUpload,
  
      aTQualify,
      alternateNo,
      agent,
      contactNo,
      cob,
      contractType,
      ctryOfOrigin,
      chinese,
      dob,
      educLevel,
      email,
      empBadgeNo,
      empType,
      familyDetails,
      officialEmail,
      gender,
      lang,
      marital,
      name,
      oCOfOrigin,
      permanentAddress,
      position,
      sapNo,
      bankName,
      bankAccNo,
    } = collectValue;

    const totalData = {
      id: PITableID,
      empID,
 
      aTQualify,
      alternateNo,
      agent,
      contactNo,
      cob,
      contractType,
      ctryOfOrigin,
      chinese,
      dob,
      educLevel,
      email,
      empBadgeNo,
      empType,
      familyDetails,
      officialEmail,
      gender,
      lang,
      marital,
      name,
      oCOfOrigin,
      profilePhoto,
      permanentAddress,
      position,
      sapNo,
      bankName,
      bankAccNo,
    };

    const totalData1 = {
      id: IDTable,
      empID,
      bwnIcNo,
      bwnIcColour,
      bwnIcExpiry,
      driveLic,
      inducBrief,
      inducBriefUp,
      myIcNo,
      nationality,
      nationalCat,
      otherNation,
      otherRace,
      otherReligion,
      ppNo,
      ppIssued,
      ppExpiry,
      ppDestinate,
      preEmp,
      preEmpPeriod,
      race,
      religion,
      bwnUpload,
      applicationUpload,
      cvCertifyUpload,
      loiUpload,
      myIcUpload,
      paafCvevUpload,
      ppUpload,
      supportDocUpload,
    };

    try {
      const [
        empInfoResponse,
         idResponse
        ] = await Promise.all([
        client.graphql({
          query: updateEmpPersonalInfo,
          variables: {
            input: totalData,
          },
        }),
        client.graphql({
          query: updateIDDetails,
          variables: {
            input: totalData1,
          },
        }),
      ]);
      // console.log(idResponse);
      // console.log(empInfoResponse);
      // if (idResponse.errors) {
      //   console.error("Error in idResponse:", idResponse.errors);
      // } else {
      //   console.log("idResponse:", idResponse);
      // }

      // if (empInfoResponse.errors) {
      //   console.error("Error in empInfoResponse:", empInfoResponse.errors);
      // } else {
      //   console.log("empInfoResponse:", empInfoResponse);
      // }
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { UpdateEIValue, errorEmpID };
};
