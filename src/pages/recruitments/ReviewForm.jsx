import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { ScheduleInter } from "./Form/ScheduleInter";
import {
  createInterviewSchedule,
  updateInterviewSchedule,
  updatePersonalDetails,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../utils/SpinLogo";
import { DataSupply } from "../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import { sendEmail } from "../../services/EmailServices";
import defaultAvatar from "../../assets/navabar/defaultAvatar.jpg"

const client = generateClient();

export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => {
  const { IVSSDetails, empPDData } = useContext(DataSupply);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [notiText, setNotiText] = useState("");
  const [pathText, setPathText] = useState("");

  const handleScheduleInterview = () => {
    setIsScheduleOpen(true);
  };

  const closeScheduleInterview = () => {
    setIsScheduleOpen(false);
  };

  const handleRejected = async (dataCandi) => {
    console.log(dataCandi);

    const REJECTED_CANDY_SUB = `Candidate Rejection Notification:`;
    const REJECTED_CANDY_MSG = `
    <html>
      <body>
        <p>Subject: Candidate Rejection Update Position:– ${dataCandi[0]?.position}</p>    
        <p>Dear HR,</p>    
        <p>After careful evaluation, the following candidates have been rejected for the position: <strong>${dataCandi[0]?.position}</strong>.</p>
        <p>Candidate name: <strong>${dataCandi[0]?.name}.</strong></p>
        <p>Best regards,<br>HR Team.</p>
      </body>
    </html>
    `;

    const FROM_ADDRESS = "hr_no-reply@adininworks.com";
    const TO_ADDRESS = "Hr-notification@adininworks.com";

    try {
      if (!Array.isArray(dataCandi)) {
        throw new Error("dataCandi must be an array.");
      }

      const matchTempIDs = dataCandi.map((val) => {
        // Attempt to find matching entry in both IVSSDetails and empPDData
        const matchIVSS = IVSSDetails?.find(
          (match) => val.tempID === match?.tempID
        );
        const matchPI = empPDData?.find(
          (match) => val.tempID === match?.tempID
        );

        // Return whichever match is found, prioritizing IVSSDetails first
        return matchIVSS || matchPI;
      });

      const validMatches = matchTempIDs.filter((item) => item?.id);

      if (validMatches.length === 0) {
        console.error("No matching candidates found.");
        return;
      }

      for (const match of validMatches) {
        const data = {
          id: match.id,
          candidateStatus: "Rejected",
          status: "Rejected",
        };

        // Check which table (IVSSDetails or empPDData) the match belongs to
        if (
          match.tempID &&
          IVSSDetails?.some((ivss) => ivss.tempID === match.tempID)
        ) {
          try {
            setIsLoading("Rejected");

            // Update the interview schedule if it's found in IVSSDetails
            const response = await client.graphql({
              query: updateInterviewSchedule,
              variables: { input: data },
            });

            await sendEmail(
              REJECTED_CANDY_SUB,
              REJECTED_CANDY_MSG,
              FROM_ADDRESS,
              TO_ADDRESS
            );

            setIsLoading("");
            setNotiText("Canditate Rejected Successfully.");
            setPathText("/recrutiles/status");

            setTimeout(() => {
              setNotification(true);
            }, 300);
          } catch (err) {
            console.error(
              "Error updating candidate ID in interviewSchedule:",
              match.id,
              ":",
              err
            );
            setIsLoading("");
          }
        } else if (
          match.tempID &&
          empPDData?.some((pi) => pi.tempID === match.tempID)
        ) {
          try {
            setIsLoading("Rejected");

            // Update the personal details if it's found in empPDData
            const response = await client.graphql({
              query: updatePersonalDetails,
              variables: {
                input: {
                  id: match.id,
                  status: "Inactive",
                },
              },
            });

            // console.log("Res", response);

            await sendEmail(
              REJECTED_CANDY_SUB,
              REJECTED_CANDY_MSG,
              FROM_ADDRESS,
              TO_ADDRESS
            );

            setIsLoading("");
            setNotiText("Canditate Rejected Successfully.");
            setPathText("/recrutiles/listofcandi");

            setTimeout(() => {
              setNotification(true);
            }, 300);
          } catch (err) {
            console.error(
              "Error updating candidate ID in personalDetails:",
              match.id,
              ":",
              err
            );
            setIsLoading("");
          }
        }
      }

      // onClose();
    } catch (err) {
      console.error("Error in handleRejected function:", err);
      setIsLoading("");
    }
  };

  
  const handleSelected = async (dataCandi) => {
    const SELECTED_CANDY_SUB = `Candidate Selected Notification:`;

    const SELECTED_CANDY_MSG = `
      <html>
        <body>
          <p>Subject: Selected Candidates Notification:</p> 
          <p>Dear HR,</p>    
          <p>We have completed the selection process, and 
          the following candidates have been selected for the position: <strong>${dataCandi[0]?.position}</strong>.</p>
          <p>Candidate name: <strong>${dataCandi[0]?.name}.</strong></p>
          <p>Best regards,<br>HR Team.</p>
        </body>
      </html>
    `;

    const FROM_ADDRESS = "hr_no-reply@adininworks.com";
    const TO_ADDRESS = "Hr-notification@adininworks.com";

    try {
      if (!Array.isArray(dataCandi)) {
        throw new Error("dataCandi must be an array.");
      }

      const ivssCandidates = IVSSDetails;

      const tempIdsCandi = dataCandi.map((val) => val?.tempID);
      console.log(tempIdsCandi);

      const matchTempIDs = ivssCandidates.filter((ivss) =>
        tempIdsCandi.includes(ivss?.tempID)
      );

      if (matchTempIDs.length > 0) {
        setIsLoading("Selected");

        const match = matchTempIDs[0];
        const data = {
          id: match.id,
          status: "Selected",
          candidateStatus: "pending"
        };

        try {
          // console.log("Update", match);
          const response = await client.graphql({
            query: updateInterviewSchedule,
            variables: { input: data },
          });

          await sendEmail(
            SELECTED_CANDY_SUB,
            SELECTED_CANDY_MSG,
            FROM_ADDRESS,
            TO_ADDRESS
          );

        } catch (err) {
          console.log("Error during update call: ", err);
        }
      } else {
        const createData = {
          tempID: tempIdsCandi[0],
          status: "Selected",
        };
        // console.log("Create", createData);

        try {
          const response = await client.graphql({
            query: createInterviewSchedule,
            variables: { input: createData },
          });
        } catch (err) {
          console.log("Error during create call: ", err);
        }
      }

      setIsLoading("");
      setNotiText("Candidate Selected Successfully");
      setPathText("/recrutiles/listofcandi");

      setTimeout(() => {
        setNotification(true);
      }, 300);

    } catch (err) {
      console.log(err);
      console.error("Error in handleSelected function:", err);
      setIsLoading("");
    }
  };

  useEffect(() => {
    // Disable scrolling on the body when the popup is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the popup is closed
      document.body.style.overflow = "";
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "";
    }
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const linkToImageFile = async (pathUrl) => {
      try {
        const result = await getUrl({ path: pathUrl });
        const fetchedUrl = result.url.toString();

        // Check if the fetched URL contains 'undefined' or is invalid
        if (fetchedUrl && !fetchedUrl.includes('undefined')) {
          setImageUrl(fetchedUrl); // Set the fetched URL if valid
        } else {
          setImageUrl(defaultAvatar); // Set the fallback image
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
        setImageUrl(defaultAvatar); // Fallback in case of error
      }
    };

    if (candidate?.profilePhoto) {
      linkToImageFile(candidate.profilePhoto); // Fetch image URL based on profile photo
    } else {
      setImageUrl('../../assets/navabar/defaultAvatar.jpg'); // Fallback if no profile photo
    }
  }, [candidate?.profilePhoto]);

  console.log(imageUrl);

  const parseJson = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  };

  // Parse work experience, education details, and family details
  const workExperience = parseJson(candidate.workExperience);
  const eduDetails = parseJson(candidate.eduDetails);
  const familyDetails = parseJson(candidate.familyDetails);

  return (
    <section>
      {/* Main Review Form */}
      <div className="fixed top-0 left-0 inset-0 bg-grey bg-opacity-80 center z-50">
        <div className="bg-white w-full max-w-[700px] max-h-[90vh] p-6 rounded-lg relative overflow-y-auto">
          {/* Close button */}
          <button
            className="absolute top-2 right-4 w-8 h-8 border rounded-full text-xl"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Form Heading with Logo */}
          <div className="flex items-center gap-20">
            <img src={AweLogo} alt="Logo" className="max-w-[180px] w-full" />
            <h2 className="text-xl font-bold underline">
              Employee Application Review
            </h2>
          </div>

          {/* Pre-filled Form Content */}
          <div className="mt-6 relative">
            <div className="flex justify-end absolute right-0 top-0 mt-4 mr-4">
              <img
                src={imageUrl}
                alt={`${candidate.name}'s photo`}
                className="w-32 h-36 border-2 border-lite_grey shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
              />
            </div>

            {/* Section One */}
            <div className="mt-6">
              {[
                { label: "Applying For", value: candidate.position || "N/A" },
                { label: "Experience", value: candidate.noExperience || "N/A" },
                { label: "Contract", value: candidate.contractType || "N/A" },
                { label: "Type", value: candidate.empType || "N/A" },
                { label: "CV Received From", value: candidate.agent || "N/A" },
                { label: "Name", value: candidate.name || "N/A" },
                { label: "Nationality", value: candidate.nationality || "N/A" },
                { label: "Race", value: candidate.race || "N/A" },
                { label: "Gender", value: candidate.gender || "N/A" },
                {
                  label: "Date of Birth",
                  value: formatDate(candidate.dob) || "N/A",
                },
                { label: "Age", value: candidate.age || "N/A" },
                { label: "Marital Status", value: candidate.marital || "N/A" },
                { label: "Religion", value: candidate.religion || "N/A" },
                { label: "Country of Birth", value: candidate.cob || "N/A" },
                { label: "Language Profiency", value: candidate.lang || "N/A" },
                {
                  label: "Home Address",
                  value: candidate.permanentAddress || "N/A",
                },
                { label: "Email", value: candidate.email || "N/A" },
                { label: "Contact", value: candidate.contactNo || "N/A" },
                { label: "Brunei IC No.", value: candidate.bwnIcNo || "N/A" },
                {
                  label: "Brunei IC Colour.",
                  value: candidate.bwnIcColour || "N/A",
                },
                {
                  label: "Brunei IC Expiry",
                  value: formatDate(candidate.bwnIcExpiry) || "N/A",
                },
                {
                  label: "Malaysia IC No.",
                  value: candidate.alternateNo || "N/A",
                },
                { label: "Passport No.", value: candidate.ppNo || "N/A" },
                {
                  label: "Passport Issue Date",
                  value: formatDate(candidate.ppIssued) || "N/A",
                },
                {
                  label: "Passport Expiry Date",
                  value: formatDate(candidate.ppExpiry) || "N/A",
                },
                {
                  label: "Passport Issued Place",
                  value: candidate.ppDestinate || "N/A",
                },
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                  <strong className="w-full">{item.label}</strong>
                  <span className="w-full col-span-2">
                    : &nbsp;{item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Section Two (Family Details) */}
            {familyDetails?.length > 0 && (
              <div className="mt-6">
                {familyDetails.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Family Details {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Occupation</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.occupation || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Name</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.name || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Place of Occupation</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.placeOfOccupation || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Relationship</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.relationship || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Age</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.age || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Work Experience */}
            {workExperience?.length > 0 && (
              <div className="mt-6">
                {workExperience.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Work Experience {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Company</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.company || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Position</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.position || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">From</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.from || "N/A"} - {item.to || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Reason For Leaving</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.reasonForLeaving || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Salary</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.salary || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education Details */}
            {eduDetails?.length > 0 && (
              <div className="mt-6">
                {eduDetails.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Education Details {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">University</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.university || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Degree</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.degree || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">From</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.fromDate || "N/A"} -{" "}
                        {item.toDate || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Buttons: Reject and Schedule Interview */}
          <div className="">
            {showDecisionButtons !== undefined && (
              <>
                {/* First Block: Reject, Schedule Interview, and Selected */}
                {!showDecisionButtons && (
                  <div className="flex justify-between space-x-4 py-12 px-14">
                    <button
                      className="hover:bg-rejectHover bg-rejectRed  font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
                      onClick={() => {
                        handleRejected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading === "Rejected" ? "Loading..." : "Reject"}
                    </button>

                    <button
                      className="hover:bg-[#ffe927] bg-yellow  font-semibold shadow-xl rounded-md px-4 py-2"
                      onClick={handleScheduleInterview}
                    >
                      Schedule Interview
                    </button>

                    <button
                      className="hover:bg-selectGreenHover bg-selectGreen  font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
                      onClick={() => {
                        handleSelected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading === "Selected" ? "Loading..." : "Selected"}
                    </button>
                  </div>
                )}

                {/* Second Block: Reject and Selected */}
                {showDecisionButtons && (
                  <div className="flex justify-between space-x-4 mt-4 py-12 px-36">
                    <button
                      className="hover:bg-rejectHover bg-rejectRed  font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
                      onClick={() => {
                        handleRejected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading === "Rejected" ? "Loading..." : "Reject"}
                    </button>

                    <button
                      className="hover:bg-selectGreenHover bg-selectGreen  font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
                      onClick={() => {
                        handleSelected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading === "Selected" ? "Loading..." : "Selected"}
                    </button>
                  </div>
                )}
              </>
            )}

            {notification && (
              <SpinLogo
                text={notiText}
                notification={notification}
                path={pathText}
              />
            )}
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {isScheduleOpen && (
        <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-50 w-full z-50">
          <ScheduleInter
            candidate={candidate}
            // onSave={handleSave}
            onClose={closeScheduleInterview}
          />
        </div>
      )}
    </section>
  );
};
