import React from "react";
import { useNavigate } from "react-router-dom";
import { useTempID } from "../../utils/TempIDContext";
import { Pagination } from "./timeSheetSearch/Pagination";

export const ListTimeSheet = ({
  newSearchFunction,
  visibleData,
  message,
  loading,
  totalPages,
  currentPage,
  paginate,
}) => {
  const { setTimeSheetFileData, setShowListTimeSheet, setSearchQuery } =
    useTempID();
  const nav = useNavigate();

  const handleNavigate = (val) => {
    setTimeSheetFileData(null);

    setSearchQuery(null);
    setTimeSheetFileData(val);
    setShowListTimeSheet(false);
    nav("/viewTsheetDetails");
  };

  const formattedDate = (date) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day} - ${month} - ${year}`;
  };

  return (
    <section>
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

          <tbody>
            {!loading && visibleData && visibleData.length > 0 ? (
              visibleData.map((val, index) => {
                return (
                  <tr
                    key={index}
                    className="text-dark_grey h-[53px] text-[15px] bg-white  rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
                  >
                    <td>{index + 1}</td>
                    <td>{val.fileName}</td>
                    <td>{val.fileType}</td>
                    <td>{formattedDate(val.date)}</td>
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
                        val.status === "Approved"
                          ? "text-[#16a34a] text-[15px] font-bold"
                          : val.status === "Rejected"
                          ? "text-[#a31f16] text-[15px] font-bold"
                          : val.status === "Unsubmitted"
                          ? "text-[#f57340] text-[15px] font-bold"
                          : val.status === "Verified"
                          ? "text-[#9226ad] text-[15px] font-bold"
                          : "text-[#272727] text-[15px] font-bold"
                      }
                    >
                      {val.status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="15"
                  className="text-center text-dark_ash text_size_5 bg-white"
                >
                  <p className="p-5">
                    {!loading && message}
                    {loading && message}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-7">
        {visibleData.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
    </section>
  );
};
