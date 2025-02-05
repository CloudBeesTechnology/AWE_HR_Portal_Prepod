import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateIDDetails } from "../../graphql/mutations"; // Assuming this is your GraphQL mutation

export const UpdateCandidateDetails = () => {
  const client = generateClient();

  const candidateDetails = useCallback(async ({ candidateData }) => {
    if (!candidateData) {
      throw new Error("Missing required parameters or candidateData");
    }

    try {
      const {
        age,
        agent,
        alternateNo,
        bwnIcColour,
        bwnIcExpiry,
        bwnIcNo,
        chinese,
        cob,
        contactNo,
        contractType,
        createdAt,
        dob,
        driveLic,
        eduDetails,
        email,
        empType,
        familyDetails,
        gender,
        id,
        lang,
        marital,
        name,
        nationality,
        otherNation,
        otherRace,
        otherReligion,
        permanentAddress,
        position,
        ppDestinate,
        ppExpiry,
        ppIssued,
        ppNo,
        presentAddress,
        profilePhoto,
        race,
        religion,
        status,
        tempID,
        updatedAt,
        workExperience,
      } = candidateData;

      // Prepare the data to update
      const updatedData = {
        id,
        age,
        agent,
        alternateNo,
        bwnIcColour,
        bwnIcExpiry,
        bwnIcNo,
        chinese,
        cob,
        contactNo,
        contractType,
        createdAt,
        dob,
        driveLic,
        eduDetails,
        email,
        empType,
        familyDetails,
        gender,
        lang,
        marital,
        name,
        nationality,
        otherNation,
        otherRace,
        otherReligion,
        permanentAddress,
        position,
        ppDestinate,
        ppExpiry,
        ppIssued,
        ppNo,
        presentAddress,
        profilePhoto,
        race,
        religion,
        status,
        tempID,
        updatedAt,
        workExperience,
      };

      // Send the updated data to the backend
      const response = await client.graphql({
        query: updateIDDetails, // The mutation for updating candidate details
        variables: { input: updatedData, },
      });

      // Log the response to confirm the update
      // console.log("Candidate details successfully updated:", response);
    } catch (error) {
      console.error("Error updating candidate details:", error);
      throw error; // Re-throw the error after logging
    }
  }, []);

  return { candidateDetails };
};
