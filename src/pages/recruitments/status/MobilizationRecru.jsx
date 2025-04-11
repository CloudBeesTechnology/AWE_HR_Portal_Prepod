import React, { useEffect, useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { StatusForm } from "./StatusForm";
import { ReviewForm } from "../ReviewForm";
import { CandiToEmp } from "./ConvertCandiToEmp";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { SpinLogo } from "../../../utils/SpinLogo";
import { UpdateMobilization } from "../../../services/updateMethod/UpdateMobilization";
import { Pagination } from "../../leaveManagement/Pagination";

const client = generateClient();
export const MobilizationRecru = ({
  data,
  formatDate,
  fileUpload,
  urlValue,
}) => {
  const { SumbitCandiToEmp } = CandiToEmp();
  const { submitMobilization } = UpdateMobilization();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const [latestTempIDData, setLatesTempIDData] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loadingItems, setLoadingItems] = useState({});

  const heading = [
    "S.No",
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Signed Date",
    "Contract PDF",
    "Status Update",
    "Form",
    "Edit Form",
    "Status",
  ];
  // console.log(data);

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

  const getTotalCount = async () => {
    try {
      let allEmpIDs = [];
      let nextToken = null;

      do {
        const result = await client.graphql({
          query: listEmpPersonalInfos,
          variables: {
            nextToken,
          },
        });

        const items = result?.data?.listEmpPersonalInfos?.items || [];
        const empIDs = items.map((val) => val.empID);
        allEmpIDs = [...allEmpIDs, ...empIDs];

        nextToken = result?.data?.listEmpPersonalInfos?.nextToken;
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

  const generateNextTempID = (totalCount) => {
    const prefixMatch = totalCount.match(/[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const numberMatch = totalCount.match(/\d+/);
    const numberPart = numberMatch ? parseInt(numberMatch[0], 10) : 0;
    const nextNumber = numberPart + 1;
    const nextTempID = `${prefix}${nextNumber}`;
    // console.log(nextTempID);

    return nextTempID;
  };

  useEffect(() => {
    const fetchNextTempID = async () => {
      const totalCount = await getTotalCount();
      const nextTempID = generateNextTempID(totalCount);
      setLatesTempIDData(nextTempID);
    };
    fetchNextTempID();
  }, []);

  // console.log(latestTempIDData);

  // const OnSubmit = async (candi) => {
  //   const storedData = {
  //     ...candi,
  //     empID: latestTempIDData,
  //   };
  //   await SumbitCandiToEmp({ storedData });
  //   await submitMobilization({ mob: storedData });
  //   setShowTitle(
  //     "Candidate conversion to employee has been completed successfully."
  //   );
  //   setNotification(true);
  // };

  const OnSubmit = async (candi) => {
    // Set the loading state for this candidate
    setLoadingItems((prev) => {
      const newState = { ...prev, [candi.id]: true };
      console.log("Loading state after update (setLoadingItems):", newState);
      return newState;
    });

    try {
      const storedData = {
        ...candi,
        empID: latestTempIDData,
      };

      // Simulating async calls here, which you can uncomment when needed
      await SumbitCandiToEmp({ storedData });
      await submitMobilization({ mob: storedData });

      setShowTitle(
        "Candidate conversion to employee has been completed successfully."
      );
      setNotification(true);
    } catch (err) {
      console.error("Error during submission:", err);
      setLoadingItems((prev) => {
        const newState = { ...prev, [candi.id]: false };
        console.log("Loading state after update (setLoadingItems):", newState);
        return newState;
      });
      alert("Error", err);
    }
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
                      <td className="py-3">{item.position || "N/A"}</td>
                      <td className="py-3">
                        {formatDate(item.mobilizationDetails_mobSignDate) ||
                          "N/A"}
                      </td>
                      <td className="py-3">
                        {item.mobilizationDetails_mobFile ? (
                          <a
                            href={urlValue}
                            onClick={(e) => {
                              if (!item.mobilizationDetails_mobFile) {
                                e.preventDefault();
                              } else {
                                fileUpload(item.mobilizationDetails_mobFile); // Fetch URL when clicked
                              }
                            }}
                            download
                            className={
                              item.mobilizationDetails_mobFile
                                ? "border-b-2 border-[orange] text-[orange]"
                                : ""
                            }
                          >
                            {item.mobilizationDetails_mobFile
                              ? "Download"
                              : "N/A"}
                          </a>
                        ) : (
                          <p>N/A</p>
                        )}
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
                      <td
                        className="text-sm cursor-pointer py-3"
                        onClick={() => OnSubmit(item)}
                        disabled={loadingItems[item.id]}
                      >
                        {loadingItems[item.id]
                          ? "Loading..."
                          : "Convert Employee"}
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
            {" "}
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
          <StatusForm
            candidate={selectedCandi}
            //   onSave={handleFormSave}
            onClose={handleShowForm}
          />
        )}
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/recrutiles/status"
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
