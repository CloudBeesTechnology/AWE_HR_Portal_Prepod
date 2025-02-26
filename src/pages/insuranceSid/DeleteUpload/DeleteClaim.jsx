export const DeleteClaim = (
  fileType,
  fileName,
  empID,
  setUploadedFileDep,
  setUploadedDocs,
  uploadedDocs,
  index,
  setIsUploading
) => {
  

  try {
    // console.log("Inside try block");
    setUploadedFileDep((prev) => {
      // console.log("Previous uploadedFileDep state:", prev);

      const updatedDepFiles = { ...prev };

      // Find the key associated with the fileName and remove it
      Object.keys(updatedDepFiles).forEach((key) => {
        if (updatedDepFiles[key] === fileName) {
          delete updatedDepFiles[key]; // Remove the key from the object
        }
      });

      // console.log("Updated uploadedFileDep state:", updatedDepFiles);
      return updatedDepFiles;
    });
    
    
    
    setUploadedDocs((prev) => {
      const updatedFiles = { ...prev };

      // Ensure `insuranceClaims` is an object
      if (
        !updatedFiles.insuranceClaims ||
        typeof updatedFiles.insuranceClaims !== "object"
      ) {
        updatedFiles.insuranceClaims = {};
      }

      // Ensure `insuranceClaims[index]` is an array
      if (!Array.isArray(updatedFiles.insuranceClaims[index])) {
        updatedFiles.insuranceClaims[index] = [];
      }

      // Find the object index to remove
      const objectIndex = updatedFiles.insuranceClaims[index].findIndex(
        (file) => file.upload === `public/${fileType}/${empID}/${fileName}`
      );
      //   console.log(objectIndex,"8952");

      if (objectIndex !== -1) {
        // Remove the found object while keeping the array structure intact
        // console.log(updatedFiles.insuranceClaims[index]);
        updatedFiles.insuranceClaims[index].splice(objectIndex, 1);
      }

      // If the inner array is now empty, remove it from the object
      if (updatedFiles.insuranceClaims[index].length === 0) {
        delete updatedFiles.insuranceClaims[index];
      }

      return updatedFiles;
    });

    setIsUploading((prev) => ({
      ...prev,
      [index]: false,
    }));
    // This should print if function is called
  } catch (err) {
    console.log("Caught error:", err);
  }
};
