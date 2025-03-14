// export const DeleteClaim = (
//   fileType,
//   fileName,
//   watchedEmpID,
//   setUploadedFileDep,
//   setFileNames,
//   setUploadedDocs,
//   uploadedDocs,
//   index,
//   field,
//   setIsUploading
// ) => {

//   try {
//     // console.log("Inside try block");
//     setUploadedFileDep((prev) => {
//       const updatedDepFiles = { ...prev }; // Clone the current state

//       // Iterate through the object keys (like 0_insuranceClaims)
//       Object.keys(updatedDepFiles).forEach((key) => {
//         // If the fileName exists in the array for the given key
//         if (updatedDepFiles[key].includes(fileName)) {
//           // Remove the file from the array associated with the key
//           updatedDepFiles[key] = updatedDepFiles[key].filter(file => file !== fileName);
//         }
//       });

//       return updatedDepFiles;
//     });

//     setUploadedDocs((prev) => {
//       const updatedFiles = { ...prev };

//       // Ensure `insuranceClaims` is an object
//       if (
//         !updatedFiles.insuranceClaims ||
//         typeof updatedFiles.insuranceClaims !== "object"
//       ) {
//         updatedFiles.insuranceClaims = {};
//       }

//       // Ensure `insuranceClaims[index]` is an array
//       if (!Array.isArray(updatedFiles.insuranceClaims[index])) {
//         updatedFiles.insuranceClaims[index] = [];
//       }

//       // Find the object index to remove
//       const objectIndex = updatedFiles.insuranceClaims[index].findIndex(
//         (file) => file.upload === `public/${fileType}/${watchedEmpID}/${fileName}`
//       );
//       //   console.log(objectIndex,"8952");

//       if (objectIndex !== -1) {
//         // Remove the found object while keeping the array structure intact
//         // console.log(updatedFiles.insuranceClaims[index]);
//         updatedFiles.insuranceClaims[index].splice(objectIndex, 1);
//       }

//       // If the inner array is now empty, remove it from the object
//       if (updatedFiles.insuranceClaims[index].length === 0) {
//         delete updatedFiles.insuranceClaims[index];
//       }

//       return updatedFiles;
//     });

//     setFileNames((prev) => {
//       const updatedFiles = { ...prev };

//       // Ensure `insuranceClaims` is an object
//       if (
//         !updatedFiles.insuranceClaims ||
//         typeof updatedFiles.insuranceClaims !== "object"
//       ) {
//         updatedFiles.insuranceClaims = {};
//       }

//       // Ensure `insuranceClaims[index]` is an array
//       if (!Array.isArray(updatedFiles.insuranceClaims[index])) {
//         updatedFiles.insuranceClaims[index] = [];
//       }

//       // Find the object index to remove
//       const objectIndex = updatedFiles.insuranceClaims[index].findIndex(
//         (file) => file.upload === `public/${fileType}/${watchedEmpID}/${fileName}`
//       );
//       //   console.log(objectIndex,"8952");

//       if (objectIndex !== -1) {
//         // Remove the found object while keeping the array structure intact
//         // console.log(updatedFiles.insuranceClaims[index]);
//         updatedFiles.insuranceClaims[index].splice(objectIndex, 1);
//       }

//       // If the inner array is now empty, remove it from the object
//       if (updatedFiles.insuranceClaims[index].length === 0) {
//         delete updatedFiles.insuranceClaims[index];
//       }

//       return updatedFiles;
//     });

//     setIsUploading((prev) => ({
//       ...prev,
//       [index]: false,
//     }));
//     // This should print if function is called
//   } catch (err) {
//     console.log("Caught error:", err);
//   }
// };
export const DeleteClaim = (
  fileType,
  fileName,
  watchedEmpID,
  setUploadedFileDep,
  setFileNames,
  setUploadedDocs,
  uploadedDocs,
  index,
  field,
  setIsUploading
) => {
  try {
    // First, ensure index is not undefined and has valid value
    if (index === undefined || index === null) {
      return; // Exit early if index is invalid
    }

    setUploadedFileDep((prev) => {
      const updatedDepFiles = { ...prev }; // Clone the state

      Object.keys(updatedDepFiles).forEach((key) => {
        if (updatedDepFiles[key].includes(fileName)) {
          updatedDepFiles[key] = updatedDepFiles[key].filter(
            (file) => file !== fileName
          );
        }
      });

      return updatedDepFiles;
    });

    // Update uploadedDocs
    setUploadedDocs((prev) => {
      const updatedFiles = { ...prev };

      // Ensure insuranceClaims exists
      if (!updatedFiles.insuranceClaims) {
        updatedFiles.insuranceClaims = {};
      }

      // Ensure that the index exists in insuranceClaims
      if (!updatedFiles.insuranceClaims[index]) {
        updatedFiles.insuranceClaims[index] = [];
      }

      // Find the file to remove by matching the upload path
      const objectIndex = updatedFiles.insuranceClaims[index].findIndex(
        (file) =>
          file.upload === `public/${fileType}/${watchedEmpID}/${fileName}`
      );

      if (objectIndex !== -1) {
        updatedFiles.insuranceClaims[index].splice(objectIndex, 1);
      }

      // If the inner array is now empty, delete it
      if (updatedFiles.insuranceClaims[index].length === 0) {
        delete updatedFiles.insuranceClaims[index];
      }

      return updatedFiles;
    });

    const key = `${index}_${fileType}`;

    // ✅ Update `fileNames` correctly
    setFileNames((prev) => {
      const updatedFileNames = { ...prev }; // Shallow copy of the object

      if (Array.isArray(updatedFileNames[key])) {
        // Deep copy the array before modifying it
        updatedFileNames[key] = [...updatedFileNames[key]].filter(
          (name) => name !== fileName
        );

        // ✅ Remove key if empty
        if (updatedFileNames[key].length === 0) {
          delete updatedFileNames[key];
        }
      }
      return updatedFileNames; // Returning a new reference forces React to detect change
    });

    // Update isUploading
    // setIsUploading((prev) => {
    //   const updatedState = { ...prev };
    //   updatedState[index] = false;
    //   return updatedState;
    // });
    setIsUploading((prev) => {
      const updatedState = { ...prev };
    
      // Use the same key format as in updateUploadingState
      const key = `${index}_${fileType}`;
    
      if (updatedState[key]) {
        updatedState[key] = false;
      }
    
      return updatedState;
    });
    
  } catch (err) {
    console.log("Caught error:", err);
  }
};
