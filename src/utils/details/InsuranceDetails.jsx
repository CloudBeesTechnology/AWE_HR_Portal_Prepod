import React from "react";
import { useEffect } from "react";

const InsuranceDetails = ({
  insuranceInfo,
  depInsurance,
  DependentInsurance,
  handlePrint,
  invoiceRef,
 
}) => {

  useEffect(() => {
    // Log insuranceInfo and depInsurance when component is mounted or updated
    console.log("insuranceInfo:", insuranceInfo);
    console.log("depInsurance:", depInsurance);
  }, [insuranceInfo, depInsurance]);

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
        <div className="grid grid-cols-3 gap-y-2 items-center">
          {depInsurance && Object.entries(depInsurance).length > 0 ? (
            Object.entries(depInsurance).map(([key, value], index) => (
              <React.Fragment key={index}>
                <span className="text-gray-800">{key}</span>
                <span className="text-gray-500 text-center">:</span>
                <span className="text-gray-800">{value || "N/A"}</span>
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              <span className="text-gray-800">No Insurance Data</span>
              <span className="text-gray-500 text-center">:</span>
              <span className="text-gray-800">N/A</span>
            </React.Fragment>
          )}
        </div>
      </section>
    </>
  );
};

export default InsuranceDetails;
