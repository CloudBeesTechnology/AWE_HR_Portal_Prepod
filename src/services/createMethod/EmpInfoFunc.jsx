import { generateClient } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import {
  createEmpPersonalInfo,
  createIDDetails,
} from "../../graphql/mutations";
import { getEmpPersonalInfo } from "../../graphql/queries";

export const EmpInfoFunc = () => {
  const client = generateClient();
  const [errorEmpID, setErrorEmpID] = useState("");
  const SubmitEIData = useCallback(async ({ empValue }) => {
    if (!empValue) {
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
    } = empValue;

    const totalData1 = {
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
    console.log(totalData1,"totalData1 Create");

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
      gender,
      officialEmail,
      lang,
      marital,
      name,
      oCOfOrigin,
      permanentAddress,
      position,
      sapNo,
    } = empValue;

    const totalData = {
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
      officialEmail,
      eduDetails,
      empBadgeNo,
      empType,
      familyDetails,
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
    // console.log(totalData,"totalData");

    try {
      const [idResponse, empInfoResponse] = await Promise.all([
        client.graphql({
          query: createIDDetails,
          variables: {
            input: totalData1,
          },
        }),
        client.graphql({
          query: createEmpPersonalInfo,
          variables: {
            input: {
              ...totalData,
            },
          },
        }),
      ]);
      if (idResponse.errors || empInfoResponse.errors) {
        // Handle errors if any response contains an 'errors' field
        console.error(
          "Error in GraphQL request:",
          idResponse.errors || empInfoResponse.errors
        );
        return;
      }

      // Check if the required data is returned from GraphQL
      if (idResponse.data && idResponse.data.createIDDetails) {
        console.log(
          "ID Details successfully created:",
          idResponse.data.createIDDetails
        );
      } else {
        console.error("Failed to create ID details");
      }

      if (empInfoResponse.data && empInfoResponse.data.createEmpPersonalInfo) {
        console.log(
          "Employee Personal Info successfully created:",
          empInfoResponse.data.createEmpPersonalInfo
        );
      } else {
        console.error("Failed to create Employee Personal Info");
      }
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { SubmitEIData, errorEmpID };
};