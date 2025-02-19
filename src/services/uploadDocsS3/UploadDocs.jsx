import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData, remove } from "@aws-amplify/storage";

export const uploadDocString = async (
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

          // Initialize the array if it doesn't exist
          updatedUploads[fileType] = updatedUploads[fileType] || [];
          updatedUploads[fileType][index] =
            updatedUploads[fileType][index] || [];

          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );

          if (!existingUpload) {
            updatedUploads[fileType][index].push({
              upload: fileUrl,
              date: uploadDate,
            });
          }

          return updatedUploads;
        });
      } 
      // else if (
      //   fileType === "profilePhoto" ||
      //   fileType === "inducBriefUp" ||
      //   fileType === "uploadJobDetails"||
      //   fileType === "loiFile"
      // ) {
        setUploadedDocs((prevState) => ({
          ...prevState,
          [fileType]: fileUrl,
        }));
      // } 
      // else {
      //   setUploadedDocs((prev) => ({
      //     ...prev,
      //     [fileType]: [
      //       ...(prev[fileType] || []),
      //       { upload: fileUrl, date: uploadDate },
      //     ],
      //   }));
      // }
    }
  } catch (error) {
    // console.log(`Error uploading ${fileType}:`, error);
  }
};
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

          // Initialize the array if it doesn't exist
          updatedUploads[fileType] = updatedUploads[fileType] || [];
          updatedUploads[fileType][index] =
            updatedUploads[fileType][index] || [];

          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );

          if (!existingUpload) {
            updatedUploads[fileType][index].push({
              upload: fileUrl,
              date: uploadDate,
            });
          }

          return updatedUploads;
        });
      } 
      // else if (
      //   fileType === "profilePhoto" ||
      //   fileType === "inducBriefUp" ||
      //   fileType === "uploadJobDetails"||
      //   fileType === "loiFile"
      // ) {
      //   setUploadedDocs((prevState) => ({
      //     ...prevState,
      //     [fileType]: fileUrl,
      //   }));
      // } 
      // else {
        setUploadedDocs((prev) => ({
          ...prev,
          [fileType]: [
            ...(prev[fileType] || []),
            { upload: fileUrl, date: uploadDate },
          ],
        }));
      }
    // }
  } catch (error) {
    // console.log(`Error uploading ${fileType}:`, error);
  }
};

// Delete file from S3 and update state
export const deleteDocs = async (
  fileUrl,
  fileType,
  setUploadedDocs,
  empID,
  index
) => {
  try {
    // Delete from S3
    await remove(fileUrl);

    // Update the state to remove the deleted file reference
    setUploadedDocs((prev) => {
      const updatedUploads = { ...prev };

      if (
        typeof index === "number" &&
        Array.isArray(updatedUploads[fileType])
      ) {
        updatedUploads[fileType][index] = updatedUploads[fileType][
          index
        ].filter((item) => item.upload !== fileUrl);

        // Remove the index array if it becomes empty
        if (updatedUploads[fileType][index].length === 0) {
          delete updatedUploads[fileType][index];
        }
      } else if (updatedUploads[fileType] === fileUrl) {
        // Handle single file types like profilePhoto
        updatedUploads[fileType] = null;
      } else if (Array.isArray(updatedUploads[fileType])) {
        // For general arrays of files
        updatedUploads[fileType] = updatedUploads[fileType].filter(
          (item) => item.upload !== fileUrl
        );
      }

      return updatedUploads;
    });
  } catch (error) {
    console.error(`Error deleting ${fileType}:`, error);
  }
};
