import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createIDDetails } from "../../graphql/mutations";

export const IDDetailsFunc = () => {
  const client = generateClient();
  const SubmitIDData = useCallback(
    async ({ empValue }) => {
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
        qcCertifyUpload,
      } = empValue;

      const totalData = {
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
        qcCertifyUpload,
      };

      // console.log("Create Call Recived TotalData IDDetails", totalData);

      try {
        const idResponse = await Promise.all([
          client.graphql({
            query: createIDDetails,
            variables: {
              input: totalData,
            },
          }),
        ]);

        // console.log("Create Call IDetails Server Response", idResponse);
      } catch (error) {
        console.error("Error executing GraphQL requests:", error);
        throw error;
      }
    },
    [client]
  );
  return { SubmitIDData };
};
