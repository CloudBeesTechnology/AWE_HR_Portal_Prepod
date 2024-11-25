import React from "react";

const FamilyDetails = ({ familyDetails, handlePrint, invoiceRef }) => {
  return (
    <>
      <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Family Details:
        </h6>
        <div className="space-y-6">
          {/* Check if familyDetails is available and properly formatted */}
          {Array.isArray(familyDetails) && familyDetails.length > 0 ? (
            JSON.parse(familyDetails).map((family, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h6 className="font-semibold text-lg text-gray-800 mb-4">
                  Family Member {index + 1}
                </h6>
                <div className="grid grid-cols-3 gap-y-2 items-center">
                  <span className="text-gray-800">Name</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">{family?.name || "N/A"}</span>

                  <span className="text-gray-800  pr-2">Relationship</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">
                    {family?.relationship || "N/A"}
                  </span>

                  <span className="text-gray-800  pr-2">Contact</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">
                    {family?.contact || "N/A"}
                  </span>

                  <span className="text-gray-800  pr-2">Address</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-gray-800">
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
      <div className="py-12 mt-2 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2"
        >
          Print
        </button>
      </div>
    </>
  );
};

export default FamilyDetails;
