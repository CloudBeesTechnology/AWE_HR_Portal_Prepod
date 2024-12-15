import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export const ListTimeSheet = () => {
  const {
    allExcelSheetData,
    newSearchFunction
    // setCategoryFilter,
    // AllFieldData,
    // categoryFilter,
    // visibleData,
    // handleScroll, 
  } = useOutletContext();
  
  const nav = useNavigate();

  const handleNavigate = (val) => {

    nav("viewSheet", {
      state: {
        fileData: val,
      },
    });
  };
  return (
    <div className="table-container flex justify-center ">
      <table className="styled-table w-full">
        <thead className="sticky-header">
          <tr className="text_size_6 text-center h-12">
            <th>S No.</th>
            <th>File Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>View</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* context={{ allExcelSheetData, AllFieldData, categoryFilter, visibleData, handleScroll }} */}
        <tbody>
          {allExcelSheetData && allExcelSheetData.length > 0 ? (
            allExcelSheetData.map((val, index) => {
              return (
                // <React.Fragment key={index}>
                  <tr key={index} className="text-dark_grey h-[53px] text-sm bg-white  rounded-sm shadow-md text-start border-b-2 border-[#CECECE]">
                    <td>{index + 1}</td>
                    <td>{val.fileName}</td>
                    <td>{val.type}</td>
                    <td>{val.date}</td>
                    <td
                      onClick={() => {
                        handleNavigate(val);
                        newSearchFunction(val);
                      }}
                      className="underline text-dark_skyBlue cursor-pointer"
                    >
                      View
                    </td>  
                    <td>{val.status}</td>
                  </tr>
                // </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="15"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                <p className="p-5">Please wait few seconds...</p>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};
