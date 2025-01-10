// import React from "react";

// const FamilyDetails = ({ familyDetails, mainRef }) => {
//   let familyData = [];

//   // Check if familyDetails is a string and parse it if valid JSON
//   if (typeof familyDetails === "string") {
//     try {
//       familyData = JSON.parse(familyDetails);
//     } catch (error) {
//       console.error("Error parsing familyDetails:", error);
//       familyData = [];
//     }
//   } else if (Array.isArray(familyDetails)) {
//     familyData = familyDetails;
//   }

//   return (
//     <section ref={mainRef} className="py-8 bg-gray-50 rounded-lg">
//       <h6 className="uppercase text_size_5 mb-6">Family Details:</h6>
//       <div className="space-y-6">
//         {/* Check if familyDetails is available and properly formatted */}
//         {familyData.length > 0 ? (
//           familyData.map((family, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//             >
//               <h6 className="font-semibold uppercase text_size_5 my-3 mb-4">
//                 Family Member {index + 1}
//               </h6>
//               <div className="grid grid-cols-3 gap-y-2 items-center font-semibold text-sm">
//                 <span className="text-dark_grey">Name</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-dark_grey">
//                   {family?.name || "N/A"}
//                 </span>

//                 <span className="text-dark_grey pr-2">Relationship</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-dark_grey">
//                   {family?.relationship || "N/A"}
//                 </span>

//                 <span className="text-dark_grey pr-2">Contact</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-dark_grey">
//                   {family?.contact || "N/A"}
//                 </span>

//                 <span className="text-dark_grey pr-2">Address</span>
//                 <span className="text-gray-500 text-center">:</span>
//                 <span className="text-dark_grey">
//                   {family?.address || "N/A"}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No family details available.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FamilyDetails;
import React from "react";

const FamilyDetails = ({ familyDetails, mainRef }) => {
  let familyData = [];

  // Check if familyDetails is an array and if its first element is a string (stringified JSON)
  if (Array.isArray(familyDetails)) {
    if (typeof familyDetails[0] === "string") {
      try {
        familyData = JSON.parse(familyDetails[0]); // Parse the first element if it's a stringified JSON
      } catch (error) {
        console.error("Error parsing familyDetails:", error);
        familyData = [];
      }
    } else {
      familyData = familyDetails; // Directly use the array if it's not stringified
    }
  }

  return (
    <section ref={mainRef} className="py-8 px-10 bg-gray-50 rounded-lg">
      <h6 className="uppercase text_size_5 mb-6">Family Details:</h6>
      <div className="space-y-6">
        {/* Check if familyDetails is available and properly formatted */}
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
