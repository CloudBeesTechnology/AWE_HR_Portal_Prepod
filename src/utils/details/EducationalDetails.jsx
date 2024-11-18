import React from "react";


const EducationalDetails = ({ educationalDetails, handlePrint, invoiceRef }) => {
  return (
    <>
      <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Education Details:
        </h6>
        <div className="flex flex-col items-start gap-8">
          {/* Educational Information */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {Object.entries(educationalDetails).map(([key, value], index) => (
                <React.Fragment key={index}>
                  <span className="text-gray-800">{key}</span>
                  <span className="text-center">:</span>
                  <span className="text-gray-800">{value || "N/A"}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
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

export default EducationalDetails;
