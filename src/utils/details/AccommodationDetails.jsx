import React from "react";

const AccommodationDetails = ({ accommodationInfo, mainRef }) => {

  return (
    <>
      <section ref={mainRef} className="py-8 px-10 bg-gray-50 rounded-lg">
        <h6 className="uppercase text_size_5 my-3">Accommodation Details:</h6>
        <div className="space-y-6">
          {/* Accommodation Details */}
          <div className="grid grid-cols-3 gap-y-4 items-center font-semibold text-sm">
            {Object.entries(accommodationInfo).map(([key, value], index) => {
              // console.log(value);
              let displayValue = "N/A";
              if (Array.isArray(value)) {
                displayValue =
                  value
                    .filter((v) => v !== null && v !== "" && v !== undefined)
                    .join(", ") || "N/A";
              } else if (value !== null && value !== "" && value !== undefined) {
                // Handle non-array values
                displayValue = value;
              }

              return (
                <React.Fragment key={index}>
                  <span className="text-dark_grey">{key}</span>
                  <span className="text-gray-500 text-center">:</span>
                  <span className="text-dark_grey">{displayValue}</span>
                </React.Fragment>
              );
            })}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default AccommodationDetails;