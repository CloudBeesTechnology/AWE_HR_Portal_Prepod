import React, { useEffect, useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { StatusForm } from "./StatusForm";
import { ReviewForm } from "../ReviewForm";
import { CandiToEmp } from "./ConvertCandiToEmp";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { SpinLogo } from "../../../utils/SpinLogo";
import { UpdateMobilization } from "../../../services/updateMethod/UpdateMobilization";


const client = generateClient();
export const MobilizationRecru = ({
  data,
  formatDate,
  fileUpload,
  urlValue,
}) => {
  const { SumbitCandiToEmp } = CandiToEmp();
  const {submitMobilization}  = UpdateMobilization();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedCandi, setSelectedCandi] = useState([]);
  const [latestTempIDData, setLatesTempIDData] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);
  
  const heading = [
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
      const result = await client.graphql({
        query: listEmpPersonalInfos,
        variables: { limit: 20000 }
      });
      const items = result?.data?.listEmpPersonalInfos?.items || [];
      const filteringData = items.map((val) => val.empID);
  
      // Sorting function
      const sortedData = filteringData.sort((a, b) => {
        const numA = a.match(/\d+/) ? parseInt(a.match(/\d+/)[0], 10) : 0;
        const numB = b.match(/\d+/) ? parseInt(b.match(/\d+/)[0], 10) : 0;
  
        const prefixA = a.replace(/\d+/g, "") || "";
        const prefixB = b.replace(/\d+/g, "") || "";
  
        if (prefixA === prefixB) {
          return numA - numB; // Sort numerically if prefixes match
        }
        return prefixA.localeCompare(prefixB); // Sort alphabetically if different prefixes
      });
  
      const maxValue = sortedData[sortedData.length - 1]; // Get the last (largest) value
  
      // console.log(sortedData);
      return maxValue;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  };
  

  // const getTotalCount = async () => {
  //   try {
  //     const result = await client.graphql({
  //       query: listEmpPersonalInfos,
  //       variables:{limit:20000}
  //     });
  //     const items = result?.data?.listEmpPersonalInfos?.items || [];
  //     const filteringData = items.map((val) => val.empID);
  //     const sortedData = filteringData.sort((a, b) => a - b);
  //     const maxValue = sortedData[sortedData.length - 1]; // Get the last value in the sorted array
  //     console.log(sortedData);

  //     return maxValue; // Return the count of all entries
  //   } catch (error) {
  //     console.error("Error fetching total count:", error);
  //     return 0; // Return 0 if there's an error
  //   }
  // };
  // const generateNextTempID = (totalCount) => {
  //   const nextNumber = Number(totalCount + 1);
  //   console.log(nextNumber);

  //   return  String(nextNumber);
  // };

  const generateNextTempID = (totalCount) => {
    // Check if the string contains a non-numeric prefix
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
      setLatesTempIDData(nextTempID); // Set the generated ID
    };
    fetchNextTempID();
  }, []);

  // console.log(latestTempIDData);

  const OnSubmit = async (candi) => {    
    // console.log(candi);
    const storedData = {
      ...candi,  
      empID: latestTempIDData,
    };
    // console.log(storedData);
    await SumbitCandiToEmp({ storedData });
    await submitMobilization({ mob:storedData })
    setShowTitle(
      "Candidate conversion to employee has been completed successfully."
    );
    setNotification(true);
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
                      className="text-2xl cursor-pointer py-3 center"
                      onClick={() => handleShowForm(item)}
                    >
                      <RiFileEditLine />
                    </td>
                    <td
                      className="text-sm cursor-pointer py-3 "
                      onClick={() => OnSubmit(item)}
                    >
                      Convert Employee
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
        <ReviewForm candidate={selectedCandi} onClose={handleShowReviewForm} />
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
  );
};
