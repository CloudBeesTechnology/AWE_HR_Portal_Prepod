import React from "react";
import { useState, useRef } from "react";

const AccommodationDetails = ({
  accommodationInfo,
  handlePrint,
  invoiceRef,
}) => {
  return (
    <>
      <section ref={invoiceRef} className="py-8 bg-gray-50 rounded-lg">
        <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
          Accommodation Details:
        </h6>
        <div className="space-y-6">
          {/* Accommodation Details */}
          <div className="grid grid-cols-3 gap-y-4 items-center">
            {Object.entries(accommodationInfo).map(([key, value], index) => (
              <React.Fragment key={index}>
                <span className="text-gray-800">{key}</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{value || "N/A"}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccommodationDetails;
