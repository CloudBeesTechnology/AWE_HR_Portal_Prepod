import React, { useState, useEffect } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { ReviewForm } from "../ReviewForm";
import { WorkpassForm } from "./WorkpassForm";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { CandiToEmp } from "../status/ConvertCandiToEmp";
import { SpinLogo } from "../../../utils/SpinLogo";
import { UpdateMobilization } from "../../../services/updateMethod/UpdateMobilization";
 

export const NonLocalMobTable = ({ data, formatDate, fileUpload, urlValue }) => {
  const client = generateClient();
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
    "Date of Mobilization",
    "Agent Name",
    "Recruitment Remarks",
    "Non Local Mobilization",
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
   
    let allEmpIDs = [];
    let nextToken = null;
  
    try {
      
      do {
        const result = await client.graphql({
          query: listEmpPersonalInfos,
          variables: { nextToken },
        });
  
        const items = result?.data?.listEmpPersonalInfos?.items || [];
        // Extract empIDs from the fetched items
        const filteringData = items.map((val) => val.empID);
        allEmpIDs = [...allEmpIDs, ...filteringData];
  
        // Update nextToken for the next iteration
        nextToken = result?.data?.listEmpPersonalInfos?.nextToken;
      } while (nextToken); 
  
      // Step 2: Filter only empIDs that start with 'AWE'
      const filteredData = allEmpIDs.filter((empID) => empID.startsWith("AWE"));
  
      // Step 3: Sort the empIDs numerically (based on the number part of the ID)
      const sortedData = filteredData.sort((a, b) => {
        const numA = parseInt(a.replace(/[^\d]/g, ''), 10);
        const numB = parseInt(b.replace(/[^\d]/g, ''), 10);
        return numA - numB;
      });
  
      // Step 4: Get the last valid empID (maximum empID)
      const maxValue = sortedData[sortedData.length - 1];
  
      return maxValue;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0; 
    }
  };
  
  
  const generateNextTempID = (lastTempID) => {
    const prefixMatch = lastTempID.match(/[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const numberMatch = lastTempID.match(/\d+/);
    const numberPart = numberMatch ? parseInt(numberMatch[0], 10) : 0;
    const nextNumber = numberPart + 1;
    const nextTempID = `${prefix}${nextNumber}`;
    // console.log("Next TempID", nextTempID);

    return nextTempID;
  };

  useEffect(() => {
    const fetchNextTempID = async () => {
      const lastTempID = await getTotalCount();
      const nextTempID = generateNextTempID(lastTempID);
      setLatesTempIDData(nextTempID); // Set the generated ID
    };
    fetchNextTempID();
  }, []);

  const OnSubmit = async (candi) => {
    const storedData = {
      ...candi,
      empID: latestTempIDData,
    };
    // console.log("stored", storedData);
    
    await SumbitCandiToEmp({ storedData });
    await submitMobilization({ mob:storedData })
    
    // setShowTitle("Candidate conversion to employee has been completed successfully.");
    // setNotification(true);
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <table className="w-full">
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
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="text-center text-[16px] shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                >
                  <td className="py-3">{item.tempID}</td>
                  <td className="py-3">{item.name || "N/A"}</td>
                  <td className="py-3">{item.nationality || "N/A"}</td>
                  <td className="py-3">{item.interviewDetails_manager || "N/A"}</td>
                  <td className="py-3">{item.WPTrackDetails_mobSignDate || "N/A"}</td>
                  <td className="py-3">{item.WPTrackDetails_agentname || "N/A"}</td>
                  <td className="py-3">{item.WPTrackDetails_remarkNLMob || "N/A"}</td>
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
                        className={item.WPTrackDetails_mobFile ? "border-b-2 border-[orange] text-[orange]" : ""}
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
                    onClick={() => OnSubmit(item)}
                  >
                    Convert Employee
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
        <ReviewForm candidate={selectedCandi} onClose={handleShowReviewForm} />
      )}
      {isFormVisible && (
        <WorkpassForm
          candidate={selectedCandi}
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
