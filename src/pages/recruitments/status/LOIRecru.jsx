import React, { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { StatusForm } from "./StatusForm";
import { ReviewForm } from "../ReviewForm";

export const LOIRecru = ({ data, formatDate, fileUpload, urlValue }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const heading = [
    "TempID",
    "Name",
    "Nationality",
    "Issue Date",
    "Accept Date",
    "LOI PDF",
    "Decline Date",
    "Decline Reason",
    "Status Update",
    "Form",
    "Edit Form",
  ];

  const handleShowForm = (candi) => {
    setSelectedCandi(candi);
    setIsFormVisible(!isFormVisible);
  };
  const handleShowReviewForm = (candi) => {
    setSelectedCandi(candi);
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <table className=" w-full rounded-lg overflow-hidden">
          <thead className="bg-[#939393] text-white">
            <tr>
              {heading.map((header, index) => (
                <th key={index} className="py-4 text-[15px] text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center border-b-2 bg-white border-[#C7BCBC] text-[15px] text-[#303030] hover:bg-medium_blue"
                  >
                    <td className="py-3">{item.tempID}</td>
                    <td className="py-3">{item.name || "N/A"}</td>
                    <td className="py-3">{item.nationality || "N/A"}</td>
                    <td className="py-3">
                      {formatDate(item.mobilizationDetails_loiIssueDate) ||
                        "N/A"}
                    </td>
                    <td className="py-3">
                      {formatDate(item.mobilizationDetails_loiAcceptDate) ||
                        "N/A"}
                    </td>
                    <td className="py-3">
                      {item.mobilizationDetails_loiFile ? (
                        <a
                          href={urlValue}
                          onClick={(e) => {
                            if (!item.mobilizationDetails_loiFile) {
                              e.preventDefault();
                            } else {
                              fileUpload(item.mobilizationDetails_loiFile);
                            }
                          }}
                          download
                          className={
                            item.mobilizationDetails_loiFile
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.mobilizationDetails_loiFile
                            ? "Download"
                            : "N/A"}
                        </a>
                      ) : (
                        <p>N/A</p>
                      )}
                    </td>
                    <td className="py-3">
                      {item.mobilizationDetails_loiDeclineDate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.mobilizationDetails_declineReason || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.interviewDetails_status || "N/A"}
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
              <tr className="text-center py-4 text-dark_grey">
                No Data Available
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-6 py-20">
          {" "}
          <p className="text-lg text-dark_grey mt-2">No Data Available</p>
        </div>
      )}
      {isReviewFormVisible && (
        <ReviewForm candidate={selectedCandi} onClose={handleShowReviewForm} />
      )}
      {isFormVisible && (
        <StatusForm candidate={selectedCandi} onClose={handleShowForm} />
      )}
    </div>
  );
};
