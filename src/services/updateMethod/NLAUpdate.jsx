import { generateClient } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import { updateEmployeeNonLocalAcco } from "../../graphql/mutations";

export const NLAUpdate = () => {
  const client = generateClient();
  const [errorEmpID, setErrorEmpID] = useState("");

  // Function to update non-local accommodation details
  const NLAUpdateFun = useCallback(async ({ NLAValue }) => {
    if (!NLAValue || !NLAValue.empID || !NLAValue.accommodation || !NLAValue.accommodationAddress || !NLAValue.IDTable) {
      console.log(NLAValue.IDTable);
      console.log(IDTable);
      
      // Ensure all required parameters are provided
      setErrorEmpID("All fields (empID, accommodation, accommodationAddress, IDTable) are required.");
      throw new Error("Missing required parameters");
    }

    try {
      const { empID, accommodation, accommodationAddress, IDTable } = NLAValue;

      // Prepare data for the update
      const updatedData = {
        id: IDTable,  // Assuming IDTable corresponds to the ID of the existing record
        empID,
        accommodation,
        accommodationAddress,
      };

      // Call the AWS Amplify GraphQL client to update the record
      const response = await client.graphql({
        query: updateEmployeeNonLocalAcco,
        variables: { input: updatedData },
      });

      // Log the response to confirm the update
      console.log("Data successfully updated:", response);

      // Reset the error state on successful update
      setErrorEmpID("");  // Clear any previous error messages
    } catch (error) {
      // Handle errors and display a message
      console.error("Error updating data:", error);
      setErrorEmpID("Error updating employee data. Please try again.");
      throw error;  // Re-throw the error after logging it
    }
  }, []);

  return { NLAUpdateFun, errorEmpID };
};

// import { generateClient } from "@aws-amplify/api";
// import { useCallback, useEffect, useState } from "react";
// import { updateEmployeeNonLocalAcco } from "../graphql/mutations";

// export const NLAUpdate = () => {
//   const client = generateClient();
//   const [errorEmpID, setErrorEmpID] = useState("");
//   const NLAUpdateFun = useCallback(async ({ NLAValue }) => {
//     if (!NLAValue) {
//       throw new Error("Missing required parameters or empID");
//     }
//     try {
//       const {
//         empID,
//         accommodation,
//         accommodationAddress,
//         IDTable,
//       } = NLAValue;

//       const updatedData = {
//         id : IDTable,
//         empID,
//         accommodation,
//         accommodationAddress,
//       };

//       const response = await client.graphql({
//         query: updateEmployeeNonLocalAcco,
//         variables: { input: updatedData },
//       });

//       // // Log the response to confirm the update
//       console.log("Data successfully updated:", response);
//     } catch (error) {
//       console.error("Error updating data:", error);
//       throw error; // Re-throw the error after logging
//     }
//   }, []);

//   return { NLAUpdateFun, errorEmpID };
// };