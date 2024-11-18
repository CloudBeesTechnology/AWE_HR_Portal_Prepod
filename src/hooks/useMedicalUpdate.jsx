// // // // import { useState } from 'react';
// // // // import { updateLabourMedicalInfo } from '../graphql/mutations';
// // // // import { generateClient } from "@aws-amplify/api";


// // // // const client = generateClient();

// // // // const useMedicalUpdate = () => {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [updatedData, setUpdatedData] = useState(null);

  
// // // //   const updateMedicalInfo = async (id, updatedData) => {
// // // //     setLoading(true);
// // // //     setError(null);
  
// // // //     try {
// // // //       // Ensure dependPass is stringified if it's an array
// // // //       const input = {
// // // //         id,  // Pass the ID of the employee record
// // // //         empID: updatedData.empID,
// // // //         overMD: updatedData.overMD,  // Example field
// // // //         overME: updatedData.overME,
// // // //         bruhimsRD: updatedData.bruhimsRD,
// // // //         bruhimsRNo: updatedData.bruhimsRNo,
// // // //         bruneiMAD: updatedData.bruneiMAD, // Ensure this field exists
// // // //         bruneiME: updatedData.bruneiME,   // Ensure this field exists
// // // //         uploadFitness: updatedData.uploadFitness, 
// // // //         uploadRegis: updatedData.uploadRegis,
// // // //         uploadBwn: updatedData.uploadBwn,
// // // //         dependPass: JSON.stringify(updatedData.dependPass), // Stringify if it's an array of objects
// // // //         // Include other fields as necessary
// // // //       };
  
// // // //       console.log("Mutation input data: ", input);
  
// // // //       // Make the GraphQL request to update the medical info
// // // //       const result = await client.graphql({
// // // //         query: updateLabourMedicalInfo,
// // // //         variables: {
// // // //           input,
// // // //         },
// // // //       });
  
// // // //       const updatedMedicalInfo = result.data.updateLabourMedicalInfo;
  
// // // //       setUpdatedData((prevData) => {
// // // //         return prevData.map((item) =>
// // // //           item.id === id ? updatedMedicalInfo : item
// // // //         );
// // // //       });
  
// // // //       return updatedMedicalInfo;
// // // //     } catch (err) {
// // // //       setError(err);
// // // //       console.error("Error updating medical info:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };
  

// // // //   return { updateMedicalInfo, loading, error, updatedData };
// // // // };

// // // // export default useMedicalUpdate;

// // // import { useState } from 'react';
// // // import { updateLabourMedicalInfo } from '../graphql/mutations';
// // // import { generateClient } from '@aws-amplify/api';

// // // // Create the GraphQL client
// // // const client = generateClient();

// // // const useMedicalUpdate = () => {
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [updatedData, setUpdatedData] = useState(null);

// // //   const updateMedicalInfo = async (id, updatedData) => {
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       // Prepare the input data for the mutation
// // //       const input = {
// // //         id,  // Pass the ID of the employee record
// // //         empID: updatedData.empID,
// // //         overMD: updatedData.overMD,
// // //         overME: updatedData.overME,
// // //         bruhimsRD: updatedData.bruhimsRD,
// // //         bruhimsRNo: updatedData.bruhimsRNo,
// // //         bruneiMAD: updatedData.bruneiMAD,
// // //         bruneiME: updatedData.bruneiME,
// // //         uploadFitness: updatedData.uploadFitness,
// // //         uploadRegis: updatedData.uploadRegis,
// // //         uploadBwn: updatedData.uploadBwn,
// // //         dependPass: updatedData.dependPass,  // Assuming dependPass is already correctly formatted
// // //       };

// // //       console.log("Mutation input data: ", input); // For debugging

// // //       // Make the GraphQL request to update the medical info
// // //       const result = await client.graphql({
// // //         query: updateLabourMedicalInfo,
// // //         variables: {
// // //           input, // Send the data with no condition
// // //         },
// // //       });

// // //       // Check the result and set the updated data in state
// // //       const updatedMedicalInfo = result.data.updateLabourMedicalInfo;
// // //       if (updatedMedicalInfo) {
// // //         setUpdatedData(updatedMedicalInfo); // Update state with the new medical info
// // //       }

// // //       // Optionally return the updated data
// // //       return updatedMedicalInfo;
// // //     } catch (err) {
// // //       setError(err);
// // //       console.error("Error updating medical info:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return { updateMedicalInfo, loading, error, updatedData };
// // // };

// // // export default useMedicalUpdate;

// // import { useState } from 'react';
// // import { updateLabourMedicalInfo } from '../graphql/mutations';
// // import { generateClient } from '@aws-amplify/api';

// // const client = generateClient();

// // const useMedicalUpdate = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [updatedData, setUpdatedData] = useState(null);

// //   const updateMedicalInfo = async (id, updatedData) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Ensure dependPass is always an array, even if empty
// //       const dependPass = Array.isArray(updatedData.dependPass)
// //         ? updatedData.dependPass
// //         : []; // If it's not an array, set it to an empty array

// //       // Prepare the input data for the mutation
// //       const input = {
// //         id,  // Pass the ID of the employee record
// //         empID: updatedData.empID,
// //         overMD: updatedData.overMD,
// //         overME: updatedData.overME,
// //         bruhimsRD: updatedData.bruhimsRD,
// //         bruhimsRNo: updatedData.bruhimsRNo,
// //         bruneiMAD: updatedData.bruneiMAD,
// //         bruneiME: updatedData.bruneiME,
// //         uploadFitness: updatedData.uploadFitness,
// //         uploadRegis: updatedData.uploadRegis,
// //         uploadBwn: updatedData.uploadBwn,
// //         dependPass,  // Ensure dependPass is always an array
// //       };

// //       console.log("Mutation input data: ", input); // For debugging

// //       // Make the GraphQL request to update the medical info
// //       const result = await client.graphql({
// //         query: updateLabourMedicalInfo,
// //         variables: {
// //           input, // Send the data with no condition
// //         },
// //       });

// //       // Check the result and set the updated data in state
// //       const updatedMedicalInfo = result.data.updateLabourMedicalInfo;
// //       if (updatedMedicalInfo) {
// //         setUpdatedData(updatedMedicalInfo); // Update state with the new medical info
// //       }

// //       // Optionally return the updated data
// //       return updatedMedicalInfo;
// //     } catch (err) {
// //       setError(err);
// //       console.error("Error updating medical info:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return { updateMedicalInfo, loading, error, updatedData };
// // };

// // export default useMedicalUpdate;

// import { useState } from 'react';
// import { updateLabourMedicalInfo } from '../graphql/mutations';
// import { generateClient } from '@aws-amplify/api';

// const client = generateClient();

// const useMedicalUpdate = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [updatedData, setUpdatedData] = useState(null);

//   const updateMedicalInfo = async (id, updatedData) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Ensure dependPass is always an array, even if empty
//       let dependPass = Array.isArray(updatedData.dependPass)
//         ? updatedData.dependPass
//         : []; // If it's not an array, set it to an empty array

//       // Serialize each dependPass item to a string (JSON string)
//       dependPass = dependPass.map((item) => JSON.stringify(item));

//       // Prepare the input data for the mutation
//       const input = {
//         id,  // Pass the ID of the employee record
//         empID: updatedData.empID,
//         overMD: updatedData.overMD,
//         overME: updatedData.overME,
//         bruhimsRD: updatedData.bruhimsRD,
//         bruhimsRNo: updatedData.bruhimsRNo,
//         bruneiMAD: updatedData.bruneiMAD,
//         bruneiME: updatedData.bruneiME,
//         uploadFitness: updatedData.uploadFitness,
//         uploadRegis: updatedData.uploadRegis,
//         uploadBwn: updatedData.uploadBwn,
//         dependPass,  // Now dependPass is an array of strings (serialized JSON)
//       };

//       console.log("Mutation input data: ", input); // For debugging

//       // Make the GraphQL request to update the medical info
//       const result = await client.graphql({
//         query: updateLabourMedicalInfo,
//         variables: {
//           input, // Send the data with no condition
//         },
//       });

//       // Check the result and set the updated data in state
//       const updatedMedicalInfo = result.data.updateLabourMedicalInfo;
//       if (updatedMedicalInfo) {
//         setUpdatedData(updatedMedicalInfo); // Update state with the new medical info
//       }

//       // Optionally return the updated data
//       return updatedMedicalInfo;
//     } catch (err) {
//       setError(err);
//       console.error("Error updating medical info:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateMedicalInfo, loading, error, updatedData };
// };

// export default useMedicalUpdate;
import { useState } from 'react';
import { updateLabourMedicalInfo } from '../graphql/mutations';
import { generateClient } from '@aws-amplify/api';

// Assuming client is a singleton or an already instantiated object elsewhere
const client = generateClient(); // You might want to ensure the client is not recreated each time

const useMedicalUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const updateMedicalInfo = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure dependPass is always an array, even if empty
      let dependPass = Array.isArray(updatedData.dependPass)
        ? updatedData.dependPass
        : []; // If it's not an array, set it to an empty array

      // Serialize each dependPass item to a string (JSON string)
      dependPass = dependPass.map((item) => JSON.stringify(item));

      // Prepare the input data for the mutation
      const input = {
        id,  // Pass the ID of the employee record
        empID: updatedData.empID,
        overMD: updatedData.overMD,
        overME: updatedData.overME,
        bruhimsRD: updatedData.bruhimsRD,
        bruhimsRNo: updatedData.bruhimsRNo,
        bruneiMAD: updatedData.bruneiMAD,
        bruneiME: updatedData.bruneiME,
        uploadFitness: updatedData.uploadFitness,
        uploadRegis: updatedData.uploadRegis,
        uploadBwn: updatedData.uploadBwn,
        dependPass,  // Now dependPass is an array of strings (serialized JSON)
      };

      console.log("Mutation input data: ", input); // For debugging

      // Make the GraphQL request to update the medical info
      const result = await client.graphql({
        query: updateLabourMedicalInfo,
        variables: {
          input, // Send the data with no condition
        },
      });

      // Check the result and set the updated data in state
      const updatedMedicalInfo = result.data?.updateLabourMedicalInfo;  // Optional chaining in case result is undefined
      if (updatedMedicalInfo) {
        setUpdatedData(updatedMedicalInfo); // Update state with the new medical info
      } else {
        setError("Failed to update medical info");  // In case the result is null/undefined
      }

      // Optionally return the updated data
      return updatedMedicalInfo;
    } catch (err) {
      setError(err.message || "An error occurred while updating medical info");
      console.error("Error updating medical info:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateMedicalInfo, loading, error, updatedData };
};

export default useMedicalUpdate;
