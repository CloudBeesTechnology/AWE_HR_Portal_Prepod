import React, { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";

import { ReviewForm } from "../ReviewForm";
import { WorkpassForm } from "./WorkpassForm";

export const DoeTable = ({ data, formatDate, fileUpload, urlValue }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const heading = [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "DOE Date of Submission",
    "DOE Date of Approval",
    "DOE Valid Until",
    "DOE DOE Reference Number",
    "DOE PDF",
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
        <table className=" w-full rounded-lg overflow-hidden table-auto">
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
                      {item.interviewDetails_manager || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_doesubmitdate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_doeapprovedate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_doeexpirydate || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_doerefno || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_doefile ? (
                        <a
                          href={urlValue}
                          onClick={(e) => {
                            if (!item.WPTrackDetails_doefile) {
                              e.preventDefault();
                            } else {
                              fileUpload(item.WPTrackDetails_doefile);
                            }
                          }}
                          download
                          className={
                            item.WPTrackDetails_doefile
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.WPTrackDetails_doefile ? "Download" : "N/A"}
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
