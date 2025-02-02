import { remove } from "aws-amplify/storage";
import {
  updateTerminationInfo,
  updateServiceRecord,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { getTerminationInfo, getServiceRecord } from "../../graphql/queries";

export const handleDeleteFile = async (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  setValue,
  trigger,
  terminateID,
  serviceID
) => {
  const client = generateClient();

  console.log(serviceID, "SR");

  if (!empID) {
    alert("Please provide the Employee ID before deleting files.");
    return;
  }

  if (!fileName) {
    alert("File name is missing. Please select a valid file to delete.");
    console.error("Missing fileName. Received parameters:", {
      fileType,
      empID,
      fileName,
    });
    return;
  }

  try {
    const fileKey = `${fileType}/${empID}/${fileName}`; // File path

    console.log("Attempting to delete file with key:", fileKey);
    await remove({
      path: `public/${fileKey}`, // S3 public path
      bucket: "aweadininstorage20242a2fe-dev",
    });

    console.log(`File "${fileName}" deleted successfully from ${fileKey}`);

    // Update local state to remove deleted file
    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };
      if (Array.isArray(updatedFiles[fileType])) {
        updatedFiles[fileType] = updatedFiles[fileType].filter(
          (name) => name !== fileName
        );

        if (updatedFiles[fileType]?.length === 0) {
          delete updatedFiles[fileType];
        }
      } else if (updatedFiles[fileType] === fileName) {
        delete updatedFiles[fileType];
      }

      return updatedFiles;
    });

    // alert(`File "${fileName}" deleted successfully!`);

    // Fetch the ID details
  
        // console.log(serviceID);
  
        try {
          const fetchWSDetailsResponse = await client.graphql({
            query: getServiceRecord,
            variables: { id: serviceID },
          });
          // console.log("DATA", fetchWSDetailsResponse);
  
          const wiDetails = fetchWSDetailsResponse.data.getServiceRecord;
  
          // console.log(wiDetails);
  
          const currentUploadData = JSON.parse(wiDetails[fileType]);
  
          // console.log(currentUploadData);
  
          // Filter out objects where the 'upload' key contains the fileName
          const updatedUploadData = currentUploadData.filter((item) => {
            // Keep items that don't match the fileName in 'upload' or the 'upload' key is missing
            return !item.upload || !item.upload.includes(fileName);
          });
  
          // After this, updatedUploadData will have the objects with 'upload' that doesn't match 'fileName'
          // console.log(updatedUploadData);
          setValue(fileType, updatedUploadData);
          trigger(fileType);

          // const updateIDResponse = await client.graphql({
          //   query: updateServiceRecord,
          //   variables: {
          //     input: {
          //       id: serviceID,
          //       [fileType]: JSON.stringify(updatedUploadData),
          //     },
          //   },
          // });
  
          // console.log("API RESPONSE", updateIDResponse);
          // alert(`File "${fileName}" deleted successfully`);
        } catch (err) {
          console.log(err);
        }
      

   
      const fetchWSDetailsResponse = await client.graphql({
        query: getTerminationInfo,
        variables: { id: terminateID },
      });
      // console.log(fetchWSDetailsResponse);

      const wiDetails = fetchWSDetailsResponse.data.getTerminationInfo;

      // console.log(wiDetails);

      const currentUploadData = JSON.parse(wiDetails[fileType]);

      // console.log(currentUploadData);

      // Filter out objects where the 'upload' key contains the fileName
      const updatedUploadData = currentUploadData.filter((item) => {
        // Keep items that don't match the fileName in 'upload' or the 'upload' key is missing
        return !item.upload || !item.upload.includes(fileName);
      });

      // After this, updatedUploadData will have the objects with 'upload' that doesn't match 'fileName'
      // console.log(updatedUploadData);
      setValue(fileType, updatedUploadData);
      trigger(fileType);
      // const updateIDResponse = await client.graphql({
      //   query: updateTerminationInfo,
      //   variables: {
      //     input: {
      //       id: terminateID,
      //       [fileType]: JSON.stringify(updatedUploadData),
      //     },
      //   },
      // });

      // console.log("API RESPONSE", updateIDResponse);
    //   alert(`File "${fileName}" deleted from the database successfully!`);
    alert(`File "${fileName}" deleted successfully`);


    
  } catch (err) {
    // console.error("Error deleting file:", err);
    // alert("Error processing the file deletion.");
    // console.log("Error:", err);
  }
};
