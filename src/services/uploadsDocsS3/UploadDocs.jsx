import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData, remove } from "@aws-amplify/storage";
import axios from "axios";

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
    // console.log(Error uploading ${fileType}:, error);
  }
};
// export const uploadReqString = async (file, fileType, tempID) => {
//   try {
//     if (!file) return null; // Skip if no file is provided

//     // Encode file name for URL safety
//     const encodedFileName = encodeURIComponent(file.name).replace(/%20/g, ' ');

//     // Construct the upload URL for API Gateway
//     const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/aweadininprod2024954b8-prod/public%2F${fileType}%2F${tempID}%2F${encodedFileName}`;

//     // Upload the file using axios
//     await axios.put(uploadUrl, file)
//       .then((res) => {
//         console.log(res.data.message);
//       })
//       .catch((err) => {
//         console.error("Error uploading file:", err);
//       });

//     // Generate the uploaded file URL
//     return `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${fileType}/${tempID}/${encodedFileName}`;
//   } catch (error) {
//     console.error(`Error uploading ${fileType}:`, error);
//     throw error;
//   }
// };

export const uploadReqString = async (file, fileType, tempID) => {
  try {
    if (!file) {
      return null;
    }

    // Encode file name for URL safety using encodeURIComponent (handles all special characters)
    const encodedFileName = encodeURIComponent(file.name);

    // Construct the upload URL for API Gateway
    const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/aweadininprod2024954b8-prod/public%2F${fileType}%2F${tempID}%2F${encodedFileName}`;

    // Upload the file using axios
    await axios
      .put(uploadUrl, file)
      .then((res) => {
        console.log("Response from API after uploading:", res.data.message);
        // alert("File uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        alert("Error uploading file. Please try again.");
        throw err;
      });

    // Decode the file name using decodeURIComponent (reverts encoding)
    const decodedFileName = decodeURIComponent(encodedFileName);

    // Generate the uploaded file URL with the decoded file name
    const uploadedFileUrl = `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${fileType}/${tempID}/${decodedFileName}`;

    return uploadedFileUrl;
  } catch (error) {
    console.error("Error during file upload process:", error);
    alert("An unexpected error occurred during the upload.");
    throw error;
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

          if (!updatedUploads[fileType]) {
            updatedUploads[fileType] = [];
          }
          if (!Array.isArray(updatedUploads[fileType][index])) {
            updatedUploads[fileType][index] = [];
          }
          // Initialize the array if it doesn't exist
          // updatedUploads[fileType] = updatedUploads[fileType] || [];
          // updatedUploads[fileType][index] =
          //   updatedUploads[fileType][index] || [];

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
    console.log(`Error uploading ${fileType}:, error`);
  }
};

export const insClaim = async (
  file,
  fileType,
  setUploadedDocs,

  empID,
  index
) => {
  try {
    console.log("Starting upload process...");
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const result = await uploadData({
        path: `public/${fileType}/${empID}/${file.name}`,
        data: file,
      }).result;
      const fileUrl = result.path;
      const uploadDate = new Date().toISOString().split("T")[0];

      console.log("File URL:", fileUrl);
      console.log("Upload Date:", uploadDate);

      // Handling when index is provided
      if (typeof index === "number") {
        console.log("Updating state at index:", index);

        setUploadedDocs((prev) => {
          const updatedUploads = { ...prev };
          console.log("Previous uploadedDocs:", prev);

          if (!updatedUploads[fileType]) {
            updatedUploads[fileType] = [];
          }

          if (!Array.isArray(updatedUploads[fileType][index])) {
            updatedUploads[fileType][index] = [];
          }

          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );
          console.log("Existing upload check:", existingUpload);

          if (!existingUpload) {
            updatedUploads[fileType][index].push({
              upload: fileUrl,
              date: uploadDate,
            });
          }

          console.log("Updated uploads:", updatedUploads);
          return updatedUploads;
        });
      } else {
        // When index is not provided, simpler structure update
        console.log("No index provided. Appending to the array.");

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
export const trainingUp = async (
  file,
  fileType,
  setUploadedDocs,

  empID,
  index
) => {
  try {
    // console.log("Starting upload process...");
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const result = await uploadData({
        path: `public/${fileType}/${empID}/${file.name}`,
        data: file,
      }).result;
      const fileUrl = result.path;
      const uploadDate = new Date().toISOString().split("T")[0];

      // console.log("File URL:", fileUrl);
      // console.log("Upload Date:", uploadDate);

      // Handling when index is provided
      if (typeof index === "number") {
        // console.log("Updating state at index:", index);

        setUploadedDocs((prev) => {
          const updatedUploads = { ...prev };
          // console.log("Previous uploadedDocs:", prev);

          if (!updatedUploads[fileType]) {
            updatedUploads[fileType] = [];
          }

          if (!Array.isArray(updatedUploads[fileType][index])) {
            updatedUploads[fileType][index] = [];
          }

          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );
          // console.log("Existing upload check:", existingUpload);

          if (!existingUpload) {
            updatedUploads[fileType][index].push({
              upload: fileUrl,
              date: uploadDate,
            });
          }

          // console.log("Updated uploads:", updatedUploads);
          return updatedUploads;
        });
      } else {
        // When index is not provided, simpler structure update
        // console.log("No index provided. Appending to the array.");

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

export const claimUploadDocs = async (
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

      console.log(result);

      setUploadedDocs((prev) => {
        if (!prev) prev = {}; // Ensure prev is not null

        const updatedUploads = { ...prev };

        // Ensure updatedUploads[fileType] is an object
        if (
          !updatedUploads[fileType] ||
          typeof updatedUploads[fileType] !== "object"
        ) {
          updatedUploads[fileType] = {};
        }

        // Ensure index is valid
        if (typeof index === "undefined" || index === null) {
          console.error("Invalid index:", index);
          return prev; // Return the previous state if index is invalid
        }

        // Ensure updatedUploads[fileType][index] is an array
        if (!Array.isArray(updatedUploads[fileType][index])) {
          updatedUploads[fileType][index] = [];
        }

        // Prevent duplicate uploads
        const existingUpload = updatedUploads[fileType][index].find(
          (item) => item.upload === fileUrl
        );

        if (!existingUpload) {
          updatedUploads[fileType][index] = [
            ...updatedUploads[fileType][index],
            {
              upload: fileUrl,
              date: uploadDate,
            },
          ];
        }

        console.log("Updated Uploads:", updatedUploads);
        return updatedUploads;
      });
    }
  } catch (error) {
    console.log(`Error uploading ${fileType}:, error`);
  }
};

export const dependUploadDocs = async (
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

      setUploadedDocs((prev) => {
        const updatedUploads = { ...prev };

        // Ensure updatedUploads[fileType] is an object
        if (
          !updatedUploads[fileType] ||
          typeof updatedUploads[fileType] !== "object"
        ) {
          updatedUploads[fileType] = {};
        }

        // Ensure updatedUploads[fileType][index] is an array
        if (!Array.isArray(updatedUploads[fileType][index])) {
          updatedUploads[fileType][index] = [];
        }

        // Prevent duplicate uploads
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
  } catch (error) {
    console.log(`Error uploading ${fileType}:, error`);
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
    console.error(`Error deleting ${fileType}:, error`);
  }
};
