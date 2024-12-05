import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData } from "@aws-amplify/storage";

export const uploadDocs = async (
  file,
  fileType,
  setUploadedDocs,
  empID,
  index
) => {
  try {
    const currentUser = await getCurrentUser();
    console.log(empID);

    if (currentUser) {
      const result = await uploadData({
        path: `public/${fileType}/${empID}/${file.name}`,
        data: file,
      }).result;
      const fileUrl = result.path;
      console.log(fileUrl);

      // const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodeURIComponent(
      //   result.path
      // )}`;
      //   setUploadedDocs((prev) => ({
      //     ...prev,
      //     [fileType]: fileUrl,
      //     // Dynamically set the specific field in uploadedDocs
      //   }));
      // }
      const uploadDate = new Date().toISOString().split("T")[0];
      if (typeof index === "number") {
        // If updating a specific index in an array
        // setUploadedDocs((prev) => ({
        //   ...prev,
        //   [`${fileType}_${index}`]: fileUrl, // Use dynamic keys to separate uploads by index
        // }));
        // console.log("index");
        setUploadedDocs((prev) => {
          const updatedUploads = { ...prev };

          // Initialize the array if it doesn't exist yet for the given fileType
          updatedUploads[fileType] = updatedUploads[fileType] || [];

          // Initialize the index array if it doesn't exist yet
          updatedUploads[fileType][index] =
            updatedUploads[fileType][index] || [];

          // Avoid adding the file if it already exists
          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );

          if (!existingUpload) {
            // Push the file info to the specific index of the fileType array
            updatedUploads[fileType][index].push({
              upload: fileUrl, // The uploaded file URL
              date: uploadDate, // The upload date
            });
          }

          return updatedUploads;
        });
        // setUploadedDocs((prev) => {
        //   const updatedArray = [...(prev[fileType] || [])]; // Copy existing array or initialize if undefined
        //   updatedArray[index] = { upload: fileUrl, date: uploadDate }; // Update specific index

        //   return {
        //     ...prev,
        //     [fileType]: updatedArray,
        //   };
        // });
      } else if (fileType === "profilePhoto" || fileType === "inducBriefUp") {
        setUploadedDocs((prevState) => ({
          ...prevState,
          [fileType]: fileUrl,
        }));
      } else {
        // If updating an object directly (non-array scenario)
        // setUploadedDocs((prev) => ({
        //   ...prev,
        //   [fileType]: fileUrl,
        // }));
        console.log("not index");

        setUploadedDocs((prev) => ({
          ...prev,
          [fileType]: [
            ...(prev[fileType] || []),
            { upload: fileUrl, date: uploadDate },
          ],
        }));
      }
    }
  } catch (error) {
    console.log(`Error uploading ${fileType}:`, error);
  }
};
