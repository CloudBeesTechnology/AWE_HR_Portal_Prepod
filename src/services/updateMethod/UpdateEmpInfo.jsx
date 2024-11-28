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
      IDTable,
    } = collectValue;

    const {
      age,
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
      eduDetails,
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
      PITableID,
    } = collectValue;

    const totalData = {
      id: PITableID,
      empID,
      age,
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
      eduDetails,
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



    // console.log(totalData,"totalData");

    try {
      const [empInfoResponse, idResponse] = await Promise.all([
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
   
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { UpdateEIValue, errorEmpID };
};
