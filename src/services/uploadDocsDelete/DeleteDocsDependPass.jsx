
import React from 'react'

export const DeleteDocsDependPass = async (
    fileType,
    fileName,
    empID,
    setUploadedFileNames,
    setDocsUploaded,
    setIsUploading
  ) => {
    try {
      // Update uploadedFileNames state
      setUploadedFileNames((prev) => {
        const updatedFiles = { ...prev };
  
        // Handle nested file names (e.g., `${index}_${fileType}`)
        Object.keys(updatedFiles).forEach((key) => {
          if (key.endsWith(`_${fileType}`)) {
            updatedFiles[key] = updatedFiles[key].filter((name) => name !== fileName);
          }
        });
  
        return updatedFiles;
      });
  
      // Update docsUploaded state
      setDocsUploaded((prev) => {
        const updatedFiles = { ...prev };
  
        if (Array.isArray(updatedFiles[fileType])) {
          updatedFiles[fileType] = updatedFiles[fileType].filter(
            (file) => file.upload !== `public/${fileType}/${empID}/${fileName}`
          );
        }
  
        return updatedFiles;
      });
  
      // Set uploading state to false
      setIsUploading((prev) => ({
        ...prev,
        [fileType]: false,
      }));
  
      return true; // Indicate success
    } catch (error) {
      console.error("Error deleting file:", error);
      return false; // Indicate failure
    }
  };
