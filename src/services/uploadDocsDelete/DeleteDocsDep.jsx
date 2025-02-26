
export const DeleteDocsDep = (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  setUploadedDocs,
  uploadedDocs,
  index,
  setIsUploading
) => {
  

  try {
    // console.log("Inside try block");
    setUploadedFileNames((prev) => {
      // console.log("Previous uploadedFileDep state:", prev);  depInsurance


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

      // Ensure `depInsurance` is an object
      if (
        !updatedFiles.depInsurance ||
        typeof updatedFiles.depInsurance !== "object"
      ) {
        updatedFiles.depInsurance = {};
      }

      // Ensure `depInsurance[index]` is an array
      if (!Array.isArray(updatedFiles.depInsurance[index])) {
        updatedFiles.depInsurance[index] = [];
      }

      // Find the object index to remove
      const objectIndex = updatedFiles.depInsurance[index].findIndex(
        (file) => file.upload === `public/${fileType}/${empID}/${fileName}`
      );
      //   console.log(objectIndex,"8952");

      if (objectIndex !== -1) {
        // Remove the found object while keeping the array structure intact
        // console.log(updatedFiles.depInsurance[index]);
        updatedFiles.depInsurance[index].splice(objectIndex, 1);
      }

      // If the inner array is now empty, remove it from the object
      if (updatedFiles.depInsurance[index].length === 0) {
        delete updatedFiles.depInsurance[index];
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
