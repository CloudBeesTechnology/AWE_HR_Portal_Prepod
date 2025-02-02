import { remove } from "aws-amplify/storage";
import { generateClient } from "@aws-amplify/api";
import { getPassportValid, } from "../../graphql/queries";

export const handleDeleteFile = async (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  setValue,
  trigger,
  immigrationID,
) => {
  const client = generateClient();


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
   
      const fetchWSDetailsResponse = await client.graphql({
        query: getPassportValid,
        variables: { id: immigrationID },
      });
      console.log(fetchWSDetailsResponse);

      const wiDetails = fetchWSDetailsResponse.data.getPassportValid;

      console.log(wiDetails);

      const currentUploadData = JSON.parse(wiDetails[fileType]);

      console.log(currentUploadData);

      // Filter out objects where the 'upload' key contains the fileName
      const updatedUploadData = currentUploadData.filter((item) => {
        // Keep items that don't match the fileName in 'upload' or the 'upload' key is missing
        return !item.upload || !item.upload.includes(fileName);
      });

      // After this, updatedUploadData will have the objects with 'upload' that doesn't match 'fileName'
      console.log(updatedUploadData);
      setValue(fileType, updatedUploadData);
      trigger(fileType);
   
    // alert(`File "${fileName}" deleted successfully`);


    
  } catch (err) {
    console.error("Error file", err);
    alert("Error processing the file deletion.");
     console.log("Error:", err);

  }
};
