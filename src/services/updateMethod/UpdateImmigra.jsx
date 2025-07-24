import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updatePassportValid } from "../../graphql/mutations";

export const UpdateImmigra = () => {
  const client = generateClient();
  const UpdateImmigraData = useCallback(async ({ UpImmiValue }) => {
    if (!UpImmiValue) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      id: UpImmiValue.id,
      empID: UpImmiValue.empID,
      ppLocation: UpImmiValue.ppLocation,
      arrivStampUpload: UpImmiValue.arrivStampUpload,
      immigEmpUpload: UpImmiValue.immigEmpUpload,
      reEntryUpload: UpImmiValue.reEntryUpload,
      arrivStampExp: UpImmiValue.arrivStampExp,
      immigRefNo: UpImmiValue.immigRefNo,
      ppSubmit: UpImmiValue.ppSubmit,
      empPassExp: UpImmiValue.empPassExp,
      empPassStatus: UpImmiValue.empPassStatus,
      airTktStatus: UpImmiValue.airTktStatus,
      reEntryVisa: UpImmiValue.reEntryVisa,
      immigApproval: UpImmiValue.immigApproval,
      reEntryVisaExp: UpImmiValue.reEntryVisaExp,
      remarkImmig: UpImmiValue.remarkImmig,
      updatedBy: UpImmiValue.updatedBy,
    };
    // console.log(totalData);

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: updatePassportValid,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully stored data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  }, []);
  return { UpdateImmigraData };
};
