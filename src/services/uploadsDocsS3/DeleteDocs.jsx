import { remove } from "aws-amplify/storage";

export const handleDeleteFile = async (fileType, fileName, empID) => {
  if (!empID) {
    alert("Please provide the Employee ID before deleting files.");
    return false;
  }
  if (!fileName) {
    alert("File name is missing. Please select a valid file to delete.");
    console.error("Missing fileName. Received parameters:", { fileType, empID, fileName });
    return false;
  }

  try {
    // Construct the file key for S3
    const fileKey = `public/${fileType}/${empID}/${fileName}`;

    // Delete the file from S3
    await remove({
      path: fileKey,
      bucket: "aweadininstorage20242a2fe-dev",
    });  
 
    return true;
  } catch (err) {
    console.error("Error deleting file:", err);
    alert("Error processing the file deletion.");
    return false;
  }
};