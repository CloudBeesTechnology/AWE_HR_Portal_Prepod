import React, { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { ReviewForm } from "../ReviewForm";
import { WorkpassForm } from "./WorkpassForm";

export const NlmsTable = ({ data, formatDate, fileUpload, urlValue }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const heading = [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "NLMS Date of Submission",
    "NLMS Submission Reference Number",
    "NLMS Date of Approval",
    "NLMS Valid Until",
    "NLMS LD Reference Number",
    "NLMS PDF",
    "Form",
    "Edit Form",
  ];
  // console.log(data);
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
        <table className=" w-full">
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
                //   const displayIndex = startIndex + index + 1; // Adjust index based on pagination

                return (
                  <tr
                    key={index}
                    className="text-center text-[16px] shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    {/* <td className="py-3">{displayIndex}</td> */}
                    <td className="py-3">{item.tempID}</td>
                    <td className="py-3">{item.name || "N/A"}</td>
                    <td className="py-3">{item.nationality || "N/A"}</td>
                    <td className="py-3">
                      {item.interviewDetails_manager || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_nlmssubmitdate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_referenceno || "N/A"}
                    </td>

                    <td className="py-3">
                      {item.WPTrackDetails_nlmsapprovedate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_nlmsexpirydate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_ldreferenceno || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_nlmsfile ? (
                        <a
                          href={urlValue}
                          onClick={(e) => {
                            if (!item.WPTrackDetails_nlmsfile) {
                              e.preventDefault();
                            } else {
                              fileUpload(item.WPTrackDetails_nlmsfile);
                            }
                          }}
                          download
                          className={
                            item.WPTrackDetails_nlmsfile
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.WPTrackDetails_nlmsfile ? "Download" : "N/A"}
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
                      className="text-2xl cursor-pointer py-3 center"
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
        <ReviewForm candidate={selectedCandi} onClose={handleShowReviewForm} />
      )}
      {isFormVisible && (
        <WorkpassForm
          candidate={selectedCandi}
          //   onSave={handleFormSave}
          onClose={handleShowForm}
        />
      )}
    </div>
  );
};
