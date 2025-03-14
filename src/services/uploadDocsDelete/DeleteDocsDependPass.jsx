export const DeleteDocsDependPass = (
  fileType,
  fileName,
  empID,
  setUploadedFileNames,
  setFileNames,
  setDocsUploaded,
  setIsUploading,
  field,
  index,
) => {
  try {
    // Update uploadedFileNames state
    setUploadedFileNames((prev) => {
      const updatedFiles = { ...prev };
      console.log("updatedFiles : ", updatedFiles);

      // Handle nested file names (e.g., `${index}_${fileType}`)
      Object.keys(updatedFiles).forEach((key) => {
        // If the key matches `${index}_${fileType}`
        if (key === `${index}_${fileType}`) {
          updatedFiles[key] = updatedFiles[key].filter(
            (name) => name !== fileName
          );
        }
      });

      return updatedFiles;
    });

    // console.log(`Deleting file: ${fileName} from ${fileType}, index: ${index}`);
    const key = `${index}_${fileType}`; // Use correct key format
    // console.log(`Deleting file: ${fileName} from ${key}`);

    // ✅ Update `fileNames` correctly
    setFileNames((prev) => {
      const updatedFileNames = { ...prev }; // Shallow copy of the object

      if (Array.isArray(updatedFileNames[key])) {
        // Deep copy the array before modifying it
        updatedFileNames[key] = [...updatedFileNames[key]].filter(
          (name) => name !== fileName
        );

        // ✅ Remove key if empty
        if (updatedFileNames[key].length === 0) {
          delete updatedFileNames[key];
        }
      }

      // console.log("✅ After Deletion - fileNames:", updatedFileNames);
      return updatedFileNames; // Returning a new reference forces React to detect change
    });



    // Update docsUploaded state
    setDocsUploaded((prev) => {
      const updatedFiles = { ...prev };
      console.log("updatedFiles : ", updatedFiles);

      // Ensure `fileType` is an array in docsUploaded for that specific index
      if (Array.isArray(updatedFiles[fileType]) && updatedFiles[fileType][index]) {
        updatedFiles[fileType][index] = updatedFiles[fileType][index].filter(
          (file) => file.upload !== `public/${fileType}/${empID}/${fileName}`
        );
      }

      return updatedFiles;
    });

    // Set uploading state to false for the current index and fileType
    setIsUploading((prev) => ({
      ...prev,
      [`${index}_${fileType}`]: false,
    }));

    console.log("File deletion successful");

  } catch (err) {
    console.log("Caught error:", err);
  }
};
