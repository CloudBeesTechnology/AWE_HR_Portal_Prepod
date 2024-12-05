import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateSawpDetails } from "../../graphql/mutations";

export const SawpUpdate = () => {
  const client = generateClient();
  const SawpUpdateFun = useCallback(async ({ SawpUpValue }) => {
    if (!SawpUpValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:SawpUpValue.id,
        empID:SawpUpValue.empID,
        sawpEmpLtrReq:SawpUpValue.sawpEmpLtrReq,
        sawpEmpLtrReci:SawpUpValue.sawpEmpLtrReci,
        sawpEmpUpload:SawpUpValue.sawpEmpUpload,

    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateSawpDetails,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully Updated data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { SawpUpdateFun };
};
// import { generateClient } from "@aws-amplify/api";
// import { useCallback, useState } from "react";
// import { updateSawpDetails } from "../../graphql/mutations";

// export const SawpUpdate = () => {
//   const client = generateClient();
//   const [errorEmpID, setErrorEmpID] = useState("");

//   // Function to update non-local accommodation details
//   const SawpUpdateFun = useCallback(async ({ SawpUpValue }) => {
//     if (!SawpUpValue || !SawpUpValue.empID || !SawpUpValue.sawpEmpLtrReq || !SawpUpValue.sawpEmpLtrReci || !SawpUpValue.sawpEmpUpload || !SawpUpValue.IDTable) {
//       console.log(SawpUpValue.IDTable);
//       console.log(IDTable);
      
//       // Ensure all required parameters are provided
//       setErrorEmpID("All fields (empID, accommodation, accommodationAddress, IDTable) are required.");
//       throw new Error("Missing required parameters");
//     }

//     try {
//       const { empID, sawpEmpLtrReq, sawpEmpLtrReci, sawpEmpUpload, IDTable } = SawpUpValue;

//       // Prepare data for the update
//       const updatedData = {
//         id: IDTable,  // Assuming IDTable corresponds to the ID of the existing record
//         empID,
//         sawpEmpLtrReq,
//         sawpEmpLtrReci,
//         sawpEmpUpload,
//        };

//       // Call the AWS Amplify GraphQL client to update the record
//       const response = await client.graphql({
//         query: updateSawpDetails,
//         variables: { input: updatedData },
//       });

//       // Log the response to confirm the update
//       console.log("Data successfully updated:", response);

//       // Reset the error state on successful update
//       setErrorEmpID("");  // Clear any previous error messages
//     } catch (error) {
//       // Handle errors and display a message
//       console.error("Error updating data:", error);
//       setErrorEmpID("Error updating employee data. Please try again.");
//       throw error;  // Re-throw the error after logging it
//     }
//   }, []);

//   return { SawpUpdateFun, errorEmpID };
// };
