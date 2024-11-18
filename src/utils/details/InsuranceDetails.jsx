import React from "react";

const InsuranceDetails = ({ insuranceInfo, handlePrint, invoiceRef }) => {
  return (
    <>
      <section ref={invoiceRef} className="py-3">
        <h6 className="uppercase text_size_5 text-dark_grey my-3">
          Insurance Details:
        </h6>
        <div className="grid grid-cols-3 gap-y-2 items-center">
          {Object.entries(insuranceInfo).map(([key, value], index) => (
            <React.Fragment key={index}>
              <span className="text-gray-800">{key}</span>
              <span className="text-gray-500 text-center">:</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </React.Fragment>
          ))}
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

export default InsuranceDetails;
