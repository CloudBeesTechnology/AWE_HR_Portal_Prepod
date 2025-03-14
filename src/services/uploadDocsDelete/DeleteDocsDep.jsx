export const DeleteDocsDep = (
  fileName,
  empID,
  setUploadedFileNames,
  setTempFilesName,
  index,
) => {
  try {
  
    setUploadedFileNames((prev) => {
      // console.log("Previous uploadedFileDep state:", prev);  depInsurance

      const updatedDepFiles = { ...prev };
      // console.log(updatedDepFiles);
      // Find the key associated with the fileName and remove it
      Object.keys(updatedDepFiles).forEach((key) => {
        if (updatedDepFiles[key] === fileName) {
          delete updatedDepFiles[key]; // Remove the key from the object
        }
      });

      // console.log("Updated uploadedFileDep state:", updatedDepFiles);
      return updatedDepFiles;
    });

     setTempFilesName((prev) => {
      const updatedFiles = { ...prev };
    
      // Debugging: Check the empID value
      // console.log("empID before deletion:", empID);
    
      // Provide a default empty string if empID is undefined
      const validEmpID = empID || "";
    
      // Ensure `depInsurance` is an object
      if (!updatedFiles.depInsurance || typeof updatedFiles.depInsurance !== "object") {
        updatedFiles.depInsurance = {};
      }
    
      // Ensure `depInsurance[index]` is an array
      if (!Array.isArray(updatedFiles.depInsurance[index])) {
        updatedFiles.depInsurance[index] = [];
      }
    
      // Debugging: Log existing file structure before deletion
      // console.log("Before deletion:", updatedFiles.depInsurance[index]);
    
      // Find the object index to remove
      const objectIndex = updatedFiles.depInsurance[index].findIndex(
        (file) => file.upload.includes(`/${fileName}`)
      );
    
      // console.log("Object Index Found:", objectIndex);
    
      if (objectIndex !== -1) {
        // Remove the found object
        updatedFiles.depInsurance[index].splice(objectIndex, 1);
        // console.log("After deletion:", updatedFiles.depInsurance[index]);
      }
    
      // If the inner array is now empty, remove it from the object
      if (updatedFiles.depInsurance[index].length === 0) {
        delete updatedFiles.depInsurance[index];
        // console.log(`Index ${index} deleted`);
      }
    
      return updatedFiles;
    });

    } catch (err) {
    console.log("Caught error:", err);
  }
};
