import React from "react";

export const DeleteUploadNlms = (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  setUploadedNlms,
  setIsUploadingString
) => {
  try {
    // console.log(fileType,fileName,"nduvgsd7679yt78");
    // console.log(fileName,"nduvgs");

    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };

      if (typeof updatedFiles[fileType] === "string") {
        // Handle case where fileType is a single string instead of an array
        if (updatedFiles[fileType] === fileName) {
          updatedFiles[fileType] = [];
        }
      }

      // Ensure fileType always remains an array, even if empty
      if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
        updatedFiles[fileType] = []; // Set empty array instead of deleting the key
      }

      return updatedFiles;
    });

    setUploadedNlms((prev) => {
      const updatedFiles = { ...prev };

      if (typeof updatedFiles[fileType] === "string") {
        // If fileType is a string, reset it to an empty array if the file is removed
        updatedFiles[fileType] = ""; // Reset to an empty array
      }

      return updatedFiles;
    });
    setIsUploadingString((prev) => ({
      ...prev,
      [fileType]: false,
    }));
  } catch (error) {
    console.log(error, "DeleteUploadNlms in error");
  }
};
