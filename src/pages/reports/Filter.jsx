import React from "react";

export const Filter = ({ typeOfReport, setTypeOfReport, Reports }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 p-3 border border-[#D9D9D9] bg-white rounded ">
        {Reports &&
          Reports.map((report, index) => (
            <div
              key={index}
              className={`flex items-center justify-center border border-[#D9D9D9] p-3 rounded cursor-pointer text-sm uppercase h-[250px] w-[250px] ${
                typeOfReport === report.title
                  ? "bg-secondary text-white"
                  : "bg-white text-dark_grey hover:bg-secondary hover:text-white"
              }`}
              onClick={() => setTypeOfReport(report.title)}
            >
              {report.title}
            </div>
          ))}
      </div>
    </div>
  );
};
