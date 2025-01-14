

import React from "react";

const FamilyDetails = ({ familyDetails, mainRef }) => {
  let familyData = [];

  const parseFamilyDetails = (data) => {
    try {
      // console.log("Raw familyDetails:", data);
  
      // Step 1: Remove backslashes
      let cleanedData = data.replace(/\\/g, "");
  
      // Step 2: Replace single quotes with double quotes if any (JSON requires double quotes)
      cleanedData = cleanedData.replace(/'/g, '"');
  
      // Step 3: Ensure keys are wrapped with double quotes if not already
      cleanedData = cleanedData.replace(/([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$3":');
  
      // Step 4: Ensure values are quoted (e.g., for strings)
      cleanedData = cleanedData.replace(/:([a-zA-Z0-9_/.\s]+)(?=\s|,|\})/g, ':"$1"');
  
      // Step 5: Remove any surrounding quotes that could be around the whole string
      if (cleanedData.startsWith('"') && cleanedData.endsWith('"')) {
        cleanedData = cleanedData.slice(1, -1);
      }
  
      // console.log("Cleaned familyDetails:", cleanedData);
  
      // Step 6: Try parsing the cleaned string
      const parsedData = JSON.parse(cleanedData);
  
      // Ensure the data is in array format
      if (!Array.isArray(parsedData)) {
        // console.error("Parsed data is not an array:", parsedData);
        return [];
      }
  
      return parsedData;
    } catch (error) {
      // console.error("Error parsing familyDetails:", error);
      return [];
    }
  };
  
  if (Array.isArray(familyDetails) && typeof familyDetails[0] === "string") {
    familyData = parseFamilyDetails(familyDetails[0]);
  }
  

  return (
    <section ref={mainRef} className="py-8 px-10 bg-gray-50 rounded-lg">
      <h6 className="uppercase text_size_5 mb-6">Family Details:</h6>
      <div className="space-y-6">
        {familyData.length > 0 ? (
          familyData.map((family, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h6 className="font-semibold uppercase text_size_5 my-3 mb-4">
                Family Member {index + 1}
              </h6>
              <div className="grid grid-cols-3 gap-y-2 items-center font-semibold text-sm">
                <span className="text-dark_grey">Name</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-dark_grey">
                  {family?.name || "N/A"}
                </span>

                <span className="text-dark_grey pr-2">Relationship</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-dark_grey">
                  {family?.relationship || "N/A"}
                </span>

                <span className="text-dark_grey pr-2">Contact</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-dark_grey">
                  {family?.contact || "N/A"}
                </span>

                <span className="text-dark_grey pr-2">Address</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-dark_grey">
                  {family?.address || "N/A"}
                </span>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No family details available.</p>
        )}
      </div>
    </section>
  );
};

export default FamilyDetails;
