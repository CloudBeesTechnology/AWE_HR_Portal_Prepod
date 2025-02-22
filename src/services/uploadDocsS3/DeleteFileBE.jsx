import { generateClient } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import { deleteIDDetails } from "../../graphql/mutations";

export const DeleteFileBE = () => {
  const client = generateClient();
  const [errorEmpID, setErrorEmpID] = useState("");

  // Function to delete employee info values
  const DeleteEIValue = useCallback(async ({ collectValue }) => {
    if (!collectValue) {
      throw new Error("Missing required parameters");
    }

    const {
      empID,
      IDTable,
      bwnUpload,
      applicationUpload,
      cvCertifyUpload,
      loiUpload,
      myIcUpload,
      paafCvevUpload,
      ppUpload,
      supportDocUpload,
    } = collectValue;

    const parseArray = (arr) => {
      try {
        return Array.isArray(arr) && typeof arr[0] === "string" ? JSON.parse(arr[0]) : arr;
      } catch (error) {
        console.error("Error parsing array:", error);
        return [];
      }
    };

    const totalData1 = {
      id: IDTable,
      empID,
      applicationUpload: JSON.stringify(applicationUpload || []),
      bwnUpload: JSON.stringify(parseArray(bwnUpload) || []),
      cvCertifyUpload: JSON.stringify(parseArray(cvCertifyUpload) || []),
      loiUpload: JSON.stringify(parseArray(loiUpload) || []),
      myIcUpload: JSON.stringify(parseArray(myIcUpload) || []),
      paafCvevUpload: JSON.stringify(parseArray(paafCvevUpload) || []),
      ppUpload: JSON.stringify(parseArray(ppUpload) || []),
      supportDocUpload: JSON.stringify(parseArray(supportDocUpload) || []),
    };

    try {
      const idResponse = await client.graphql({
        query: deleteIDDetails,
        variables: {
          input: totalData1,
        },
      });
      console.log("File deleted successfully:", idResponse);
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      setErrorEmpID(`Failed to delete files for Employee ID: ${empID}`);
      throw error;
    }
  }, []);

  return { DeleteEIValue, errorEmpID };
};