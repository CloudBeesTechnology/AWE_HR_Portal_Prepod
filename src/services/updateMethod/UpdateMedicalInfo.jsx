import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateLabourMedicalInfo } from "../../graphql/mutations";


export const UpdateMedical = () => {
  const client = generateClient();

  const updateMedicalSubmit = useCallback(async ({ LabUpValue }) => {
    if (!LabUpValue || !LabUpValue.LabTable) {
      throw new Error("Missing required parameters or LabTable ID");
    }

    const updateData = {
      id: LabUpValue.LabTable, // The ID of the entry to update
      empID: LabUpValue.empID,
      overMD: LabUpValue.overMD,
      overME: LabUpValue.overME,
      bruhimsRD: LabUpValue.bruhimsRD,
      bruhimsRNo: LabUpValue.bruhimsRNo,
      bruneiMAD: LabUpValue.bruneiMAD,
      bruneiME: LabUpValue.bruneiME,
      uploadBwn: LabUpValue.uploadBwn,
      dependPass: JSON.stringify(LabUpValue.dependPass),
      uploadFitness: LabUpValue.uploadFitness,
      uploadRegis: LabUpValue.uploadRegis,
    };

    // console.log("Updating data in LabourMedicalInfo table:", updateData);

    try {
      const updatedData = await client.graphql({
        query: updateLabourMedicalInfo,
        variables: {
          input: updateData,
        },
      });

      // console.log("Successfully updated data:", updatedData);
      return updatedData; // Return the updated data for further use
    } catch (error) {
      // console.error("Error updating LabourMedicalInfo:", error.message);
      throw error;
    }
  }, []);

  return { updateMedicalSubmit };
};
