import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData } from "@aws-amplify/storage";

export const uploadDocs = async (
  file,
  fileType,
  setUploadedDocs,
  empID,
  index
) => {
  try {
    const currentUser = await getCurrentUser();

    
    if (currentUser) {
      const result = await uploadData({
        path: `public/${fileType}/${empID}/${file.name}`,
        data: file,
      }).result;
      const fileUrl = result.path;

      
     
      const uploadDate = new Date().toISOString().split("T")[0];
      if (typeof index === "number") {
        
        setUploadedDocs((prev) => {
          const updatedUploads = { ...prev };

          // Initialize the array if it doesn't exist yet for the given fileType
          updatedUploads[fileType] = updatedUploads[fileType] || [];

          // Initialize the index array if it doesn't exist yet
          updatedUploads[fileType][index] =
            updatedUploads[fileType][index] || [];

          // Avoid adding the file if it already exists
          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );

          if (!existingUpload) {
            // Push the file info to the specific index of the fileType array
            updatedUploads[fileType][index].push({
              upload: fileUrl, // The uploaded file URL
              date: uploadDate, // The upload date
            });
          }

          return updatedUploads;
        });
       
      } else {
       
      

        setUploadedDocs((prev) => ({
          ...prev,
          [fileType]: [
            ...(prev[fileType] || []),
            { upload: fileUrl, date: uploadDate },
          ],
        }));
      }
    }
  } catch (error) {
    console.log(`Error uploading ${fileType}:`, error);
  }
};
