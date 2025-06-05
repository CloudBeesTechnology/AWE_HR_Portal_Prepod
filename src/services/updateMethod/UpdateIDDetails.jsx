import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateIDDetails } from "../../graphql/mutations";

export const UpdateIDDetails = () => {
  const client = generateClient();
  const UpdateIDValue = useCallback(async ({ collectValue }) => {
    if (!collectValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
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
    } = collectValue;

    const totalData = {
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
      qcCertifyUpload,
    };

    // console.log("Update Call Recived TotalData IDDetails", totalData);

    try {
      const idResponse = await Promise.all([
        client.graphql({
          query: updateIDDetails,
          variables: {
            input: totalData,
          },
        }),
      ]);

      // console.log("Update Call IDetails Server Response", idResponse);

    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  }, []);
  return { UpdateIDValue };
};
