import { useState, useContext } from "react";
import { RiFileEditLine, RiCloseLine } from "react-icons/ri";
import { ReviewForm } from "../ReviewForm";
import { WorkpassForm } from "./WorkpassForm";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { CandiToEmp } from "../status/ConvertCandiToEmp";
import { UpdateMobilization } from "../../../services/updateMethod/UpdateMobilization";
import { DateFormat } from "../../../utils/DateFormat";
import { Pagination } from "../../leaveManagement/Pagination";
import { DataSupply } from "../../../utils/DataStoredContext";
import { sendEmail } from "../../../services/EmailServices";

export const NonLocalMobTable = ({ data, fileUpload, urlValue }) => {
  const client = generateClient();
  const { IVSSDetails } = useContext(DataSupply);
  // const { SumbitCandiToEmp } = CandiToEmp();
  const { submitMobilization } = UpdateMobilization();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const [latestEmployeeID, setLatestEmployeeID] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loadingItems, setLoadingItems] = useState({});
  const [showEmpIdPopup, setShowEmpIdPopup] = useState(false);
  const [empIdLoading, setEmpIdLoading] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  const heading = [
    "S.No",
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Date of Mobilization",
    "Agent Name",
    "Recruitment Remarks",
    "Non Local Mobilization PDF",
    "Form",
    "Edit Form",
    "Status",
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

  // console.log("Data", data);

  const getTotalCount = async () => {
    try {
      let allEmpIDs = [];
      let nextToken = null;
      let iteration = 0;

      do {
        const result = await client.graphql({
          query: listEmpPersonalInfos,
          variables: { nextToken },
        });

        const items = result?.data?.listEmpPersonalInfos?.items || [];

        const empIDs = items.map((val) => val.empID);

        allEmpIDs = [...allEmpIDs, ...empIDs];
        nextToken = result?.data?.listEmpPersonalInfos?.nextToken;

        iteration++;
      } while (nextToken);

      const sortedData = allEmpIDs.sort((a, b) => {
        const numA = a.match(/\d+/) ? parseInt(a.match(/\d+/)[0], 10) : 0;
        const numB = b.match(/\d+/) ? parseInt(b.match(/\d+/)[0], 10) : 0;

        const prefixA = a.replace(/\d+/g, "") || "";
        const prefixB = b.replace(/\d+/g, "") || "";

        if (prefixA === prefixB) {
          return numA - numB;
        }
        return prefixA.localeCompare(prefixB);
      });

      const maxValue = sortedData[sortedData.length - 1];

      return maxValue;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  };

  const generateNextTempID = (lastEmpID) => {
    const prefixMatch = lastEmpID.match(/[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "";

    const numberMatch = lastEmpID.match(/\d+/);
    const numberPart = numberMatch ? parseInt(numberMatch[0], 10) : 0;

    const nextNumber = numberPart + 1;
    const nextTempID = `${prefix}${nextNumber}`;

    return nextTempID;
  };

  const handleGenerateEmpId = async () => {
    setEmpIdLoading(true);
    try {
      const lastEmpID = await getTotalCount();
      const nextTempID = generateNextTempID(lastEmpID);

      setLatestEmployeeID(nextTempID);
    } catch (error) {
      console.error("Error generating employee ID:", error);
      alert("Error generating employee ID");
    } finally {
      setEmpIdLoading(false);
    }
  };

  const handleConvertClick = (candi) => {
    setCurrentCandidate(candi);
    setShowEmpIdPopup(true);
    setLatestEmployeeID("");
  };

  const OnSubmit = async () => {
    if (!currentCandidate) {
      alert("Error: No candidate selected.");
      return;
    }

    setLoadingItems((prev) => {
      const newState = { ...prev, [currentCandidate.id]: true };
      return newState;
    });

    try {
      const storedData = {
        ...currentCandidate,
        empID: latestEmployeeID,
      };

      if (!storedData.empID) {
        alert("Error: Missing employee ID.");
        return;
      }

      if (storedData.empID && storedData.interviewDetails_id) {
        await submitMobilization({ mob: storedData });
        const { success, message } = await CandiToEmp({ storedData });

        console.log("NonLocalMobTable : ", success, message);

        if (success) {
          setShowTitle(
            "Candidate conversion to employee has been completed successfully."
          );
          setShowEmpIdPopup(false);
        } else {
          setShowEmpIdPopup(false);
          setShowTitle("Candidate conversion to employee has been failed.");
        }
      } 
    } catch (err) {
      setLoadingItems((prev) => {
        const newState = { ...prev, [currentCandidate.id]: false };
        return newState;
      });
      setShowEmpIdPopup(false);
      console.error("Error during conversion:", err);
      setShowTitle("Candidate conversion to employee has been failed.");
    } finally {
      setLoadingItems((prev) => {
        const newState = { ...prev, [currentCandidate.id]: false };
        return newState;
      });
      setShowEmpIdPopup(false);
    }
  };

  return (
    <>
      {showTitle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            {/* <div className="px-6 py-4 flex justify-end items-center bg-green-600 uppercase">
              <h3 className="text-xl font-semibold text-white">Success</h3>
              <button
                onClick={() => {
                  setShowTitle("");
                  setNotification(true);
                }}
                className=" hover:text-grey transition-colors"
              >
                <RiCloseLine size={24} />
              </button>
            </div> */}

            {/* Message */}
            <div className="p-6 text-center">
              <p className="text-darkText text-lg">{showTitle}</p>
            </div>

            {/* OK Button */}
            <div className="px-6 py-3 bg-lightBg border-t border-borderGray flex justify-center">
              <button className="bg-primary px-6 py-2 rounded-lg font-semibold uppercase hover:bg-yellow transition">
                <a href={"/recrutiles/workpasstracking"}>Okay</a>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="recruitmentTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-xl relative">
        {showEmpIdPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Popup Header */}
              <div className="px-6 py-4 flex justify-between items-center bg-[#939393] uppercase">
                <h3 className="text-xl font-semibold text-white">
                  Employee Conversion
                </h3>
                <button
                  onClick={() => setShowEmpIdPopup(false)}
                  className="text-white hover:text-borderGray transition-colors"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              {/* Popup Content */}
              <div className="p-6">
                {/* Candidate Info */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center">
                    <span className="w-full font-medium text-labelText uppercase">
                      Candidate Name:
                    </span>
                    <span className="text-darkText">
                      {currentCandidate?.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-full font-medium text-labelText uppercase">
                      Temp ID:
                    </span>
                    <span className="font-mono text-darkText">
                      {currentCandidate?.tempID}
                    </span>
                  </div>
                </div>

                {/* Generated ID Display */}
                <div className="mb-6 p-4 rounded-lg border border-borderGray bg-lightBg uppercase">
                  <p className="text-sm font-medium text-mutedText mb-1">
                    Employee ID
                  </p>
                  {latestEmployeeID ? (
                    <p className="text-xl font-bold font-mono text-mutedText">
                      {latestEmployeeID}
                    </p>
                  ) : (
                    <p className="text-placeholderText italic">
                      Not generated yet
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {!latestEmployeeID && (
                    <button
                      onClick={handleGenerateEmpId}
                      disabled={empIdLoading}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center uppercase ${
                        empIdLoading
                          ? "bg-disabledBg text-mutedText cursor-not-allowed"
                          : "bg-primary hover:hover:bg-yellow"
                      }`}
                    >
                      {empIdLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      )}
                      {empIdLoading ? "Generating..." : "Generate EmpID"}
                    </button>
                  )}

                  {latestEmployeeID && (
                    <button
                      onClick={OnSubmit}
                      disabled={
                        !latestEmployeeID || loadingItems[currentCandidate?.id]
                      }
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center uppercase ${
                        !latestEmployeeID || loadingItems[currentCandidate?.id]
                          ? "bg-disabledBg text-mutedText cursor-not-allowed"
                          : "bg-primary hover:hover:bg-yellow"
                      }`}
                    >
                      {loadingItems[currentCandidate?.id] && (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      )}
                      {loadingItems[currentCandidate?.id]
                        ? "Converting..."
                        : "Convert to employee"}
                    </button>
                  )}
                </div>
              </div>

              {/* Help Text */}
              <div className="px-6 py-3 bg-lightBg border-t border-borderGray">
                <p className="text-xs text-mutedText text-center">
                  Generate an Employee ID before conversion
                </p>
              </div>
            </div>
          </div>
        )}

        {paginatedData && paginatedData.length > 0 ? (
          <table className="w-full rounded-lg">
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
              {paginatedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center border-b-2 bg-white border-[#C7BCBC] text-[15px] text-[#303030] hover:bg-medium_blue"
                  >
                    <td className="py-3">{startIndex + index + 1}</td>
                    <td className="py-3">{item.tempID}</td>
                    <td className="py-3">{item.name || "N/A"}</td>
                    <td className="py-3">{item.nationality || "N/A"}</td>
                    <td className="py-3">{item.position || "N/A"}</td>
                    <td className="py-3">
                      {DateFormat(item.WPTrackDetails_mobSignDate) || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_agentname || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_remarkNLMob || "N/A"}
                    </td>
                    <td className="py-3">
                      {item.WPTrackDetails_mobFile ? (
                        <a
                          href={urlValue}
                          onClick={(e) => {
                            if (!item.WPTrackDetails_mobFile) {
                              e.preventDefault();
                            } else {
                              fileUpload(item.WPTrackDetails_mobFile);
                            }
                          }}
                          download
                          className={
                            item.WPTrackDetails_mobFile
                              ? "border-b-2 border-[orange] text-[orange]"
                              : ""
                          }
                        >
                          {item.WPTrackDetails_mobFile ? "Download" : "N/A"}
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
                    <td
                      className="text-sm cursor-pointer py-3"
                      onClick={() => handleConvertClick(item)}
                      disabled={loadingItems[item.id]}
                    >
                      {loadingItems[item.id]
                        ? "Loading..."
                        : "Convert Employee"}
                    </td>
                  </tr>
                );
              })}
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
          <WorkpassForm candidate={selectedCandi} onClose={handleShowForm} />
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
