import React from 'react'

export const DeleteDocsWI = (fileType, fileName, empID,setUploadedFileNames,setNameServiceUp,setIsUploading) => {
try{
    
    setUploadedFileNames((prev) => {
        const updatedFiles = { ...prev };
      
        if (Array.isArray(updatedFiles[fileType])) {
          updatedFiles[fileType] = updatedFiles[fileType].filter((name) => name !== fileName);
        } else if (typeof updatedFiles[fileType] === "string") {
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
      
      setNameServiceUp((prev) => {
        const updatedFiles = { ...prev };
        if (Array.isArray(updatedFiles[fileType])) {
          updatedFiles[fileType] = updatedFiles[fileType].filter(
            (file) =>
              file.upload !== `public/${fileType}/${empID}/${fileName}`
          );
          if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
            updatedFiles[fileType] = []; // Assign an empty array instead of deleting the key
          }
        }
        return updatedFiles;
      });
      setIsUploading((prev) => ({
        ...prev,
        [fileType]: false,
      }));
}catch(error){
    console.log(error,"deletedarrayUpload in employe info");
    
}
  
}
