import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData, remove } from "@aws-amplify/storage";

export const uploadDocs = async (
  file,
  fileType,
  setUploadedDocs,
  empID,
  index
) => {
  try {
    const currentUser = await getCurrentUser();
    console.log(empID);

    if (currentUser) {
      const result = await uploadData({
        path: `public/${fileType}/${empID}/${file.name}`,
        data: file,
      }).result;
      const fileUrl = result.path;
      console.log(fileUrl);

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
      } else if (
        fileType === "profilePhoto" ||
        fileType === "inducBriefUp" ||
        fileType === "uploadJobDetails"
      ) {
        setUploadedDocs((prevState) => ({
          ...prevState,
          [fileType]: fileUrl,
        }));
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

// Delete file from S3 and update state
export const deleteDocs = async (fileUrl, fileType, setUploadedDocs, empID, index) => {
  try {
    // Delete from S3
    await remove(fileUrl);

    // Update the state to remove the deleted file reference
    setUploadedDocs((prev) => {
      const updatedUploads = { ...prev };

      if (typeof index === "number" && Array.isArray(updatedUploads[fileType])) {
        updatedUploads[fileType][index] = updatedUploads[fileType][index].filter(
          (item) => item.upload !== fileUrl
        );

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

    console.log(`File with URL ${fileUrl} deleted from S3 and state.`);
  } catch (error) {
    console.error(`Error deleting ${fileType}:`, error);
  }
};





// import { getCurrentUser } from "@aws-amplify/auth";
// import { uploadData } from "@aws-amplify/storage";

// export const uploadDocs = async (
//   file,
//   fileType,
//   setUploadedDocs,
//   empID,
//   index
// ) => {
//   try {
//     const currentUser = await getCurrentUser();
//     console.log(empID);

//     if (currentUser) {
//       const result = await uploadData({
//         path: `public/${fileType}/${empID}/${file.name}`,
//         data: file,
//       }).result;
//       const fileUrl = result.path;
//       console.log(fileUrl);

//       const uploadDate = new Date().toISOString().split("T")[0];
//       if (typeof index === "number") {
     
//         setUploadedDocs((prev) => {
//           const updatedUploads = { ...prev };

//           // Initialize the array if it doesn't exist yet for the given fileType
//           updatedUploads[fileType] = updatedUploads[fileType] || [];

//           // Initialize the index array if it doesn't exist yet
//           updatedUploads[fileType][index] =
//             updatedUploads[fileType][index] || [];

//           // Avoid adding the file if it already exists
//           const existingUpload = updatedUploads[fileType][index].find(
//             (item) => item.upload === fileUrl
//           );

//           if (!existingUpload) {
//             // Push the file info to the specific index of the fileType array
//             updatedUploads[fileType][index].push({
//               upload: fileUrl, // The uploaded file URL
//               date: uploadDate, // The upload date
//             });
//           }

//           return updatedUploads;
//         });
       
//       } else if (fileType === "profilePhoto" || fileType === "inducBriefUp" || fileType === "uploadJobDetails") {
//         setUploadedDocs((prevState) => ({
//           ...prevState,
//           [fileType]: fileUrl,
//         }));
//       } else {
   
//         console.log("not index");

//         setUploadedDocs((prev) => ({
//           ...prev,
//           [fileType]: [
//             ...(prev[fileType] || []),
//             { upload: fileUrl, date: uploadDate },
//           ],
//         }));
//       }
//     }
//   } catch (error) {
//     console.log(`Error uploading ${fileType}:`, error);
//   }
// };
