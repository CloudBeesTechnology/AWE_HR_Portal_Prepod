import React from "react";

const FamilyDetails = ({ familyDetails, mainRef }) => {
  return (
    <>
      <section ref={mainRef} className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text_size_5 mb-6">Family Details:</h6>
        <div className="space-y-6">
          {/* Check if familyDetails is available and properly formatted */}
          {Array.isArray(familyDetails) && familyDetails.length > 0 ? (
            JSON.parse(familyDetails).map((family, index) => (
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

                  <span className="text-dark_grey  pr-2">Contact</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-dark_grey">
                    {family?.contact || "N/A"}
                  </span>

                  <span className="text-dark_grey  pr-2">Address</span>
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
    </>
  );
};

export default FamilyDetails;
