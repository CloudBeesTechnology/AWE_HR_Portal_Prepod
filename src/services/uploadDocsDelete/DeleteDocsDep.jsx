// import React from 'react';

// export const DeleteDocsDep = (fileType, fileName, empID, setUploadedFileNames, setUploadDepIns, setIsUploading) => {
//   try {
//     console.log("DeleteDocsDep triggered with:", { fileType, fileName, empID });

//     // Update uploaded file names
//     setUploadedFileNames((prev) => {
//       console.log("Previous uploadedFileNames:", prev);

//       const updatedFiles = { ...prev };
//       console.log("Copy of previous uploadedFileNames:", updatedFiles);

//       if (Array.isArray(updatedFiles[fileType])) {
//         console.log(`Removing ${fileName} from array of fileType: ${fileType}`);
//         updatedFiles[fileType] = updatedFiles[fileType].filter((name) => name !== fileName);
//       } else if (typeof updatedFiles[fileType] === "string") {
//         console.log(`Checking string value for ${fileType}:`, updatedFiles[fileType]);
//         if (updatedFiles[fileType] === fileName) {
//           updatedFiles[fileType] = [];
//         }
//       }

//       if (!updatedFiles[fileType] || updatedFiles[fileType].length === 0) {
//         console.log(`No files left for fileType ${fileType}, setting to empty array.`);
//         updatedFiles[fileType] = [];
//       }

//       console.log("Updated uploadedFileNames:", updatedFiles);
//       return updatedFiles;
//     });

//     // Update uploaded documents state
//     setUploadDepIns((prev) => {
//       console.log("Previous uploadDepIns state:", prev);

//       const updatedFiles = { ...prev };
//       console.log("Copy of previous uploadDepIns state:", updatedFiles);

//       if (Array.isArray(updatedFiles[fileType])) {
//         console.log(`Filtering out file with name: ${fileName} from uploadDepIns for fileType ${fileType}`);
//         updatedFiles[fileType] = updatedFiles[fileType].filter(
//           (file) => file.upload !== `public/${fileType}/${empID}/${fileName}`
//         );
        
//         // If no files are left for that fileType, reset to empty array
//         if (updatedFiles[fileType]) {
//           console.log(`No files left in uploadDepIns for fileType ${fileType}, resetting array.`);
//           updatedFiles[fileType] = []; // Explicit reset of array
//         }
//       }

//       console.log("Updated uploadDepIns:", updatedFiles);
//       return updatedFiles;
//     });

//     // Set uploading state to false for the specific fileType only if no files are left
//     setIsUploading((prev) => {
//       console.log("Previous isUploading state:", prev);
      
//       // Check if the fileType is completely empty
//       const updatedState = {
//         ...prev,
//         [fileType]: !Array.isArray(prev[fileType]) || prev[fileType]?.length === 0, // If fileType has no files, set to false
//       };

//       console.log("Updated isUploading state:", updatedState);
//       return updatedState;
//     });

//   } catch (error) {
//     console.log("Error in DeleteDocsDep:", error, "deletedarrayUpload in employee info");
//   }
// };
