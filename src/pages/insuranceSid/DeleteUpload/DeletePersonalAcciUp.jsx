export const DeletePersonalAcciUp = (
  fileType,
  fileName,
  fileIndex,
  perAccNo,
  setUploadedFileNames,
  setUploadPAU,
  setIsUploading
) => {
  try {
    if (!perAccNo) {
      return;
    }

    setUploadPAU((prev) => {
      const updatedFiles = { ...prev };

      if (Array.isArray(updatedFiles[fileType])) {
        updatedFiles[fileType] = updatedFiles[fileType].filter(
          (file, index) => index !== fileIndex
        );
        if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
          updatedFiles[fileType] = [];
        }
      }

      return updatedFiles;
    });

    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };

      if (Array.isArray(updatedFiles[fileType])) {
        updatedFiles[fileType] = updatedFiles[fileType].filter(
          (name, index) => index !== fileIndex
        );
      } else if (typeof updatedFiles[fileType] === "string") {
        if (updatedFiles[fileType] === fileName) {
          updatedFiles[fileType] = [];
        }
      }

      if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
        updatedFiles[fileType] = [];
      }

      return updatedFiles;
    });

    setIsUploading((prev) => {
      const updatedState = { ...prev };
      updatedState[fileType] = false;

      return updatedState;
    });

  } catch (error) {
    console.log("Error in delete Personal Accident Insurance function:", error);
  }
};
