import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createEmpRequisition } from "../../graphql/mutations";

export const EmpReqDataFun = () => {
  const client = generateClient();

const SubmitReqData = useCallback(async ({ EmpReqValue }) => {
  if (!EmpReqValue) {
    throw new Error("Missing required parameters");
  }

  const userID = localStorage.getItem("userID");
  if (!userID) {
    throw new Error("User ID is not available in localStorage");
  }

  const requestorID = EmpReqValue.requestorID || userID;
  if (!requestorID) {
    throw new Error("Requestor ID is missing");
  }

  const totalData = {
    requestorID,
    approverID: EmpReqValue.approverID || "",
    reqName: EmpReqValue.reqName,
    department: EmpReqValue.department,
    project: EmpReqValue.project,
    position: EmpReqValue.position,
    quantity: EmpReqValue.quantity,
    reasonForReq: EmpReqValue.reasonForReq,
    justification: EmpReqValue.justification,
    replacementFor: EmpReqValue.replacementFor || null,
    qualification: EmpReqValue.qualification,
    status: EmpReqValue.status,
    remarkReq: EmpReqValue.remarkReq,
    tentativeDate: EmpReqValue.tentativeDate ? new Date(EmpReqValue.tentativeDate).toISOString() : null,
  };

  console.log("Submitting data:", totalData);

  try {
    const response = await client.graphql({
      query: createEmpRequisition,
      variables: { input: totalData },
    });
    console.log("Successfully stored data:", response);
  } catch (error) {
    console.error("Error executing GraphQL request:", error);
    throw error;
  }
}, []);

return { SubmitReqData };
};

