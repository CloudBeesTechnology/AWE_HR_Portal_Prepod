import React, { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { ReviewForm } from "../ReviewForm";
import { WorkpassForm } from "./WorkpassForm";
import { DateFormat } from "../../../utils/DateFormat";
import { Pagination } from "../../leaveManagement/Pagination";

export const BankFormTable = ({ data, formatDate, fileUpload, urlValue }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const heading = [
    "S.No",
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Date of Submission",
    "Date Received",
    "Valid Until",
    "Bank Guarantee Amount",
    "Bank Guarantee Reference Number",
    "Bank Guarantee PDF",
    "Form",
    "Edit Form",
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleShowForm = (candi) => {
    setSelectedCandi(candi);
    setIsFormVisible(!isFormVisible);
  };
  const handleShowReviewForm = (candi) => {
    setSelectedCandi(candi);
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  return (
    <>
      <div className="recruitmentTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl">
        {paginatedData && paginatedData.length > 0 ? (
          <table className=" w-full rounded-lg">
            <thead className="bg-[#939393] text-white sticky top-0">
              <tr>
                {heading.map((header, index) => (
                  <th key={index} className="py-4 text-[15px] text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  //   const displayIndex = startIndex + index + 1; // Adjust index based on pagination

                  return (
                    <tr
                      key={index}
                      className="text-center border-b-2 bg-white border-[#C7BCBC] text-[15px] text-[#303030] hover:bg-medium_blue"
                    >
                      <td className="py-3">{startIndex + index + 1}</td>
                      <td className="py-3">{item.tempID}</td>
                      <td className="py-3">{item.name || "N/A"}</td>
                      <td className="py-3">{item.nationality || "N/A"}</td>
                      <td className="py-3">
                        {item.position|| "N/A"}
                      </td>
                      <td className="py-3">
                        {DateFormat(item.WPTrackDetails_bgsubmitdate) || "N/A"}
                      </td>
                      <td className="py-3">
                        {DateFormat(item.WPTrackDetails_bgreceivedate) || "N/A"}
                      </td>
                      <td className="py-3">
                        {DateFormat(item.WPTrackDetails_bgexpirydate) || "N/A"}
                      </td>
                      <td className="py-3">
                        {item.WPTrackDetails_bgamount || "N/A"}
                      </td>
                      <td className="py-3">
                        {item.WPTrackDetails_referenceno || "N/A"}
                      </td>

                      <td className="py-3">
                        {item.WPTrackDetails_bgfile ? (
                          <a
                            href={urlValue}
                            onClick={(e) => {
                              if (!item.WPTrackDetails_bgfile) {
                                e.preventDefault();
                              } else {
                                fileUpload(item.WPTrackDetails_bgfile);
                              }
                            }}
                            download
                            className={
                              item.WPTrackDetails_bgfile
                                ? "border-b-2 border-[orange] text-[orange]"
                                : ""
                            }
                          >
                            {item.WPTrackDetails_bgfile ? "Download" : "N/A"}
                          </a>
                        ) : (
                          <p>N/A</p>
                        )}
                      </td>

                      <td
                        className="py-3 text-center"
                        onClick={() => handleShowReviewForm(item)}
                      >
                        View
                      </td>
                      <td
                        className="text-2xl text-[#EA4F4F] cursor-pointer py-3 center"
                        onClick={() => handleShowForm(item)}
                      >
                        <RiFileEditLine />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-6 py-20">
            <p className="text-lg text-dark_grey mt-2">No Data Available</p>
          </div>
        )}
        {isReviewFormVisible && (
          <ReviewForm
            candidate={selectedCandi}
            onClose={handleShowReviewForm}
          />
        )}
        {isFormVisible && (
          <WorkpassForm
            candidate={selectedCandi}
            //   onSave={handleFormSave}
            onClose={handleShowForm}
          />
        )}
      </div>
      {paginatedData.length > 0 && (
        <div className="ml-20 flex justify-center">
          <div className="w-[60%] flex justify-start mt-10 px-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
