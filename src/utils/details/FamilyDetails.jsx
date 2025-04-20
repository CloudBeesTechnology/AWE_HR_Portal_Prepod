import React from "react";

const FamilyDetails = ({ familyDetails, mainRef }) => {
  let familyData = [];

  const parseFamilyDetails = (data) => {
    try {
 
      if (Array.isArray(data)) return data;
      
      if (typeof data === 'object' && data !== null) return [data];

      if (typeof data !== 'string') {
        try {
          data = JSON.stringify(data);
        } catch (e) {
          console.error("Could not stringify data:", data);
          return [];
        }
      }

      let cleanedData = data.replace(/\\/g, "");
      
      try {
        const directParse = JSON.parse(cleanedData);
        return Array.isArray(directParse) ? directParse : [directParse];
      } catch (e) {
  
      }

      if ((cleanedData.startsWith('"') && cleanedData.endsWith('"')) ||
          (cleanedData.startsWith("'") && cleanedData.endsWith("'"))) {
        cleanedData = cleanedData.slice(1, -1);
      }

      cleanedData = cleanedData.replace(/'/g, '"');

      cleanedData = cleanedData.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3');

      cleanedData = cleanedData.replace(/:\s*([^"{\[\d][^,}\]\s]*)([,\]}])/g, (match, p1, p2) => {
        if (/^(true|false|null|\d+\.?\d*)$/.test(p1)) {
          return `: ${p1}${p2}`;
        }
        return `: "${p1.trim()}"${p2}`;
      });

      cleanedData = cleanedData.replace(/,\s*([}\]])/g, '$1');

      try {
        const parsed = JSON.parse(cleanedData);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (finalError) {
        console.error("Final parsing attempt failed:", finalError);
        console.error("Problematic data:", cleanedData);
        return [];
      }
    } catch (error) {
      console.error("Unexpected error in parseFamilyDetails:", error);
      return [];
    }
  };

  if (familyDetails) {
    if (Array.isArray(familyDetails)) {
   
      if (familyDetails.length > 0 && typeof familyDetails[0] === "string") {
        familyData = parseFamilyDetails(familyDetails[0]);
      } 

      else if (familyDetails.length > 0 && typeof familyDetails[0] === "object") {
        familyData = familyDetails;
      }
    } 
 
    else if (typeof familyDetails === "string") {
      familyData = parseFamilyDetails(familyDetails);
    } 
    else if (typeof familyDetails === "object" && familyDetails !== null) {
      familyData = parseFamilyDetails(familyDetails);
    }
  }

  return (
    <section ref={mainRef} className="py-8 px-10 bg-gray-50 rounded-lg">
      <h6 className="text_size_5 mb-6">Family Details:</h6>
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