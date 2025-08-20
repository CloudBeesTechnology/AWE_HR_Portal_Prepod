export const DeleteDocsTrainingTC = (
  fileType,
  fileName,
  watchedEmpID,
  setUploadedCertify,
  setFileNames,
  setUploadedDocs,
  index,
  setIsUploading
) => {
  try {
    // First, ensure index is not undefined and has valid value
    if (index === undefined || index === null) {
      return; // Exit early if index is invalid
    }

    setFileNames((prev) => {
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

      // Ensure  trainingUpCertifiyy exists
      if (!updatedFiles.trainingUpCertifi) {
        updatedFiles.trainingUpCertifi = {};
      }

      // Ensure that the index exists in  trainingUpCertifi
      if (!updatedFiles.trainingUpCertifi[index]) {
        updatedFiles.trainingUpCertifi[index] = [];
      }

      // Find the file to remove by matching the upload path
      const objectIndex = updatedFiles.trainingUpCertifi[index].findIndex(
        (file) =>
          file.upload === `public/${fileType}/${watchedEmpID}/${fileName}`
      );

      if (objectIndex !== -1) {
        updatedFiles.trainingUpCertifi[index].splice(objectIndex, 1);
      }

      // If the inner array is now empty, delete it
      if (updatedFiles.trainingUpCertifi[index].length === 0) {
        delete updatedFiles.trainingUpCertifi[index];
      }

      return updatedFiles;
    });

    const key = `${index}_${fileType}`;

    setUploadedCertify((prev) => {
      const updatedFileNames = { ...prev };

      if (Array.isArray(updatedFileNames[key])) {
        updatedFileNames[key] = [...updatedFileNames[key]].filter(
          (name) => name !== fileName
        );

        // ✅ Remove key if empty
        if (updatedFileNames[key].length === 0) {
          delete updatedFileNames[key];
        }
      }
      return updatedFileNames;
    });

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
