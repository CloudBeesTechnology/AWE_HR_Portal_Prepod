export const DeleteWorkComp = (
  fileType,
  fileName,
  fileIndex,
  workmenCompNo,
  setUploadedFileNames,
  setUploadWCU,
  setIsUploading
) => {

  try {
    if (!workmenCompNo) {
      return;
    }

    setUploadWCU((prev) => {
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
    console.log("Error in delete workmen function:", error);
  }
};
