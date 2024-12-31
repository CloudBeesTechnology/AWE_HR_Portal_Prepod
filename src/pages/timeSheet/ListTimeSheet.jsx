import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useTempID } from "../../utils/TempIDContext";

export const ListTimeSheet = ({
  newSearchFunction,
  visibleData,
  message,
  setVisibleData,
}) => {
  const { setTimeSheetFileData, setShowListTimeSheet, setSearchQuery } =
    useTempID();
  const nav = useNavigate();

  const handleNavigate = (val) => {
    setTimeSheetFileData(null);
    setVisibleData([]);
    setSearchQuery(null);
    setTimeSheetFileData(val);
    setShowListTimeSheet(false);
    nav("/viewTsheetDetails");
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
          {visibleData && visibleData.length > 0 ? (
            visibleData.map((val, index) => {
              return (
                // <React.Fragment key={index}>
                <tr
                  key={index}
                  className="text-dark_grey h-[53px] text-sm bg-white  rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
                >
                  <td>{index + 1}</td>
                  <td>{val.fileName}</td>
                  <td>{val.fileType}</td>
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
                  <td
                    className={
                      val.status === "Approved" ? "text-[#16a34a]" : ""
                    }
                  >
                    {val.status}
                  </td>
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
                <p className="p-5">{message || "Please wait few seconds."}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
