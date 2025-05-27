import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateEmpPersonalInfo } from "../../graphql/mutations";

export const UpdateEmpInfo = () => {
  const client = generateClient();
  const UpdateEIValue = useCallback(async ({ collectValue }) => {
    if (!collectValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
      PITableID,
      profilePhoto,
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

    console.log("Update Call Recived TotalData EmpInfo", totalData);

    try {
      const empInfoResponse = await Promise.all([
        client.graphql({
          query: updateEmpPersonalInfo,
          variables: {
            input: totalData,
          },
        }),
      ]);

      console.log("Update Call EmpInfo Server Response", empInfoResponse);
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  }, []);
  return { UpdateEIValue };
};
