export const DeleteUploadBankG = (
  fileType,
  fileName,
  setUploadedFileNames,
  setUploadedSawp,
  setIsUploadingString,
  setFormData
) => {
  try {
    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };

      if (typeof updatedFiles[fileType] === "string") {
        if (updatedFiles[fileType] === fileName) {
          updatedFiles[fileType] = [];
        }
      }

      if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
        updatedFiles[fileType] = [];
      }

      return updatedFiles;
    });

    setUploadedSawp((prev) => {
      const updatedFiles = { ...prev };

      if (typeof updatedFiles[fileType] === "string") {
        updatedFiles[fileType] = "";
      }

      return updatedFiles;
    });

    setIsUploadingString((prev) => {
      return {
        ...prev,
        [fileType]: false,
      };
    });

    setFormData((prev) => {
      return {
        ...prev,
        interview: {
          ...prev.interview,
          [fileType]: "",
          bgfile: "",
        },
      };
    });
  } catch (error) {
    console.log("error", error);
  }
};
