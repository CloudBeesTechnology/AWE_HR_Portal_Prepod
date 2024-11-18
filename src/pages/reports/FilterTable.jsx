import React, { useState } from "react";
import logo from "../../assets/logo/logo-with-name.svg"
import { ProbationForm } from "./ProbationForm";

export const FilterTable = ({
  tableBody,
  tableHead,
  typeOfReport,
  reportTitle,
  allData,
  handleViewDetails
}) => {

  return (
    <div>
      {tableBody.length > 0 ? (
        <div>
          <h1 className="text-xl font-bold center my-10">{typeOfReport}</h1>
          <div className=" w-full overflow-x-auto overflow-auto scrollbar-hide shadow-lg ">
            <table className=" mt-5 border-collapse w-full ">
              <thead className="w-full ">
                <tr className="bg-[#C5C5C5]  rounded-sm">
                  {tableHead.map((head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-5 text-[15px] text-secondary w-full "
                    >
                      <span className="w-[120px] center">{head}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableBody.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-sm border-b-2 border-[#CECECE]">
                    {row.map((col, colIndex) => (
                      <td key={colIndex} className="border-b-2 text-center border-[#CECECE] p-2">
                        {col}
                      </td>
                    ))}
                    {typeOfReport === "Probation Form" && (
                      <td
                        className="border-b-2 text-center border-[#CECECE] p-2 cursor-pointer text-blue-600"
                        onClick={() => handleViewDetails(allData[rowIndex])} // Call the function with the row data
                      >
                        View Details
                      </td>
                    )}
                  </tr>
                ))}
        </tbody>
      </table>

          </div>
        </div>
      ) : (
        <div className="text-center mt-10">No Report List Available Here</div>
      )}
    </div>
  );
};
