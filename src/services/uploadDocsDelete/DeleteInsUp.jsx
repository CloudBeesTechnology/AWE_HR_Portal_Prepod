import { remove } from "aws-amplify/storage";
import { generateClient } from "@aws-amplify/api";
import { getEmpInsurance } from "../../graphql/queries";

// Function to extract the file name from a URL
const extractFileName = (url) => {
  if (typeof url === "string" && url) {
    return url.split("/").pop();
  }
  return "";
};

export const handleDeleteFile = async (
    fileType,
    fileName,
    empID,
    setUploadedFileNames,
    deleteID,
    setValue
  ) => {
    const client = generateClient();
    
    if (!empID) {
      alert("Please provide the Employee ID before deleting files.");
      return;
    }
  
    if (!fileName) {
      alert("File name is missing. Please select a valid file to delete.");
      return;
    }
  
    if (!deleteID) {
      alert("The provided ID is invalid. Please try again.");
      return;
    }
  
    try {
      const fileKey = `${fileType}/${empID}/${fileName}`;

      // Start the file deletion process from S3
      await remove({
        path: `public/${fileKey}`,
        bucket: "aweadininstorage20242a2fe-dev",
      });
  
      // Update the UI to reflect the file deletion
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
  
    //   alert(`File "${fileName}" deleted successfully!`);
  
      // Fetch the ID details from the database
      const fetchIDDetailsResponse = await client.graphql({
        query: getEmpInsurance,
        variables: { id: deleteID },
      });
  
      const idDetails = fetchIDDetailsResponse.data.getEmpInsurance;  
  
      // Parse the existing upload data for the specific file type
      const currentUploadData = idDetails[fileType] ? JSON.parse(idDetails[fileType]) : [];
  
      // Filter out objects where the 'upload' key contains the fileName
      const updatedUploadData = currentUploadData.filter(
        (item) => extractFileName(item.upload) !== fileName
      );
  
      console.log(updatedUploadData);
      setValue(fileType, updatedUploadData);
      // trigger(fileType);
  
      
  
    } catch (error) {
      console.error("Error occurred during the file deletion process:", error);
      alert("An error occurred while deleting the file. Please try again.");
    }
  };




