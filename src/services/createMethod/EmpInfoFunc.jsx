import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpPersonalInfo } from "../../graphql/mutations";

export const EmpInfoFunc = () => {
  const client = generateClient();
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
        profilePhoto, createdBy
      } = empValue;

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
        bankAccNo, createdBy
      };

      console.log("Create Call Recived TotalData EmpInfo", totalData);

      try {
        const empInfoResponse = await Promise.all([
          client.graphql({
            query: createEmpPersonalInfo,
            variables: {
              input: {
                ...totalData,
              },
            },
          }),
        ]);

        console.log("Create Call EmpInfo Server Response", empInfoResponse);
      } catch (error) {
        console.error("Error executing GraphQL requests:", error);
        throw error;
      }
    },
    [client]
  );
  return { SubmitEIData };
};
