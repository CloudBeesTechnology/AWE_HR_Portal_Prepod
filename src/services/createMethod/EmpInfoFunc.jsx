import { generateClient } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import {
  createEmpPersonalInfo,
  createIDDetails,
} from "../../graphql/mutations";

export const EmpInfoFunc = () => {
  const client = generateClient();
  const [errorEmpID, setErrorEmpID] = useState("");
  const SubmitEIData = useCallback(
    async ({ empValue }) => {
      if (!empValue) {
        throw new Error("Missing required parameters");
      }
      const {
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
        gender,
        officialEmail,
        lang,
        marital,
        name,
        oCOfOrigin,
        permanentAddress,
        position,
        sapNo,
        bankName,
        bankAccNo,
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
        qcCertifyUpload
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
        qcCertifyUpload
      };
      // console.log(totalData1,"totalData1 Create");

      const totalData = {
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
        officialEmail,

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
        bankName,
        bankAccNo,
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

        // console.log(empInfoResponse);
      } catch (error) {
        console.error("Error executing GraphQL requests:", error);
        throw error; // Rethrow error if needed
      }
    },
    [client]
  );
  return { SubmitEIData, errorEmpID };
};
