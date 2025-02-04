import { remove } from "aws-amplify/storage";
import { updateIDDetails } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { getIDDetails } from "../../graphql/queries";

export const handleDeleteFile = async (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  deleteID,
  setValue,
  watch,
  trigger
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
    // Construct the file key (path) for S3
    const fileKey = `${fileType}/${empID}/${fileName}`;
    // console.log("Attempting to delete file with key:", fileKey);

    // Delete the file from S3
    await remove({
      path: `public/${fileKey}`, // S3 path to the file
      bucket: "aweadininstorage20242a2fe-dev", // Ensure the correct bucket name
    });
    // console.log(`File "${fileName}" deleted successfully from ${fileKey}`);

    // Update local state to remove the deleted file from the uploaded file names
    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };

      if (Array.isArray(updatedFiles[fileType])) {
        updatedFiles[fileType] = updatedFiles[fileType].filter(
          (name) => name !== fileName
        );
        // If no files left for the specific type, delete the key
        if (updatedFiles[fileType]?.length === 0) {
          delete updatedFiles[fileType];
        }
      } else if (updatedFiles[fileType] === fileName) {
        delete updatedFiles[fileType]; // If it's the only file, delete the key
      }

      return updatedFiles;
    });

    // Fetch current data from the database to update file references
    const fetchIDDetailsResponse = await client.graphql({
      query: getIDDetails,
      variables: { id: deleteID },
    });

    const idDetails = fetchIDDetailsResponse.data.getIDDetails;
    const currentUploadData = JSON.parse(idDetails[fileType]);
   

    const updatedUploadData = currentUploadData.filter((item) => {
      // Keep items that don't match the fileName in 'upload' or the 'upload' key is missing
      return !item.upload || !item.upload.includes(fileName);
    });
    // console.log("Updated upload data after deletion:", updatedUploadData);

    // Update the database using the GraphQL mutation
    // await client.graphql({
    //   query: updateIDDetails,
    //   variables: {
    //     input: {
    //       id: deleteID,
    //       [fileType]: JSON.stringify(updatedUploadData),
    //     },
    //   },
    // });

    // console.log("API response after updating database");

    // // Update the form state to reflect the file deletion
    // const currentFiles = watch(fileType) || [];
    // const updatedFiles = currentFiles.filter((file) => file.name !== fileName);

    // console.log("Updated files array after deletion:", updatedFiles);

    // Use setValue to update the form field with the updated list of files
    setValue(fileType, updatedUploadData);

    // Trigger re-validation to ensure form is correctly updated
    trigger(fileType);

    // Show success message to the user
    // alert(`File "${fileName}" deleted successfully`);

    return true; // Indicate successful deletion
  } catch (err) {
    // console.error("Error deleting file:", err);
    // alert("Error processing the file deletion.");
  }
};
