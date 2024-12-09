import { generateClient } from "@aws-amplify/api";
import { updateEmpRequisition } from "../../graphql/mutations";

export const UpdateEmpReqData = async ({ requestId, newStatus, newRemark }) => {
  if (!requestId) {
    throw new Error("Missing required parameter: requestId");
  }
  if (newStatus === undefined && newRemark === undefined) {
    throw new Error("At least one of newStatus or newRemark must be provided.");
  }

  const client = generateClient();

  const updateData = {
    id: requestId,
    ...(newStatus !== undefined && { status: newStatus }), 
    ...(newRemark !== undefined && { remarkReq: newRemark }), 
  };

  try {
    const response = await client.graphql({
      query: updateEmpRequisition,
      variables: { input: updateData },
    });
    // console.log("Successfully updated requisition data:", response);
    return response; 
  } catch (error) {
    console.error("Error updating requisition data:", error);
    throw error;
  }
};










// import { generateClient } from "@aws-amplify/api";
// import { updateEmpRequisition } from "../../graphql/mutations";

// export const UpdateEmpReqData = async ({ requestId, newStatus, newRemark }) => {
//   if (!requestId || (!newStatus && !newRemark)) {
//     throw new Error("Missing required parameters: requestId, newStatus, or newRemark");
//   }

//   const client = generateClient();

//   const updateData = {
//     id: requestId, 
//     ...(newStatus && { status: newStatus }), 
//     ...(newRemark && { remarkReq: newRemark }), 
//   };

//   try {
//     const response = await client.graphql({
//       query: updateEmpRequisition,
//       variables: { input: updateData },
//     });
//     console.log("Successfully updated requisition data:", response);
//     return response; 
//   } catch (error) {
//     console.error("Error updating requisition data:", error);
//     throw error; 
//   }
// };
