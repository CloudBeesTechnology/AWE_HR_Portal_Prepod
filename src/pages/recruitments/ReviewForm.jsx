import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { ScheduleInter } from "./Form/ScheduleInter";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateInterviewSchedule, updatePersonalDetails } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../utils/SpinLogo";
import { DataSupply } from "../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import { sendEmail } from "../../services/EmailServices";
import { ReviewFormSchema } from "../../services/Validation";


const client = generateClient();

export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => {
  const { IVSSDetails, empPDData } = useContext(DataSupply);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notiText, setNotiText] = useState("")
    // const {
    //   register,
    //   handleSubmit,
    //   formState: { errors },
    // } = useForm({
    //   resolver: yupResolver(ReviewFormSchema),
    // });

  const handleScheduleInterview = () => {
    setIsScheduleOpen(true);
  };

  const closeScheduleInterview = () => {
    setIsScheduleOpen(false);
  };

  // console.log("hey buddy", personalDetails);

  // const handleRejected = async (dataCandi) => {
  //   console.log(dataCandi);
    
  //   const REJECTED_CANDY_SUB = `Candidate Rejection Notification:`;
  //   const REJECTED_CANDY_MSG = `
  //   <html>
  //     <body>
  //       <p>Subject: Candidate Rejection Update Position:– ${dataCandi[0]?.position}</p>    
  //       <p>Dear HR,</p>    
  //       <p>After careful evaluation, the following candidates have been rejected for the position: <strong>${dataCandi[0]?.position}</strong>.</p>
  //       <p>Candidate name: <strong>${dataCandi[0]?.name}.</strong></p>
  //       <p>Best regards,<br>HR Team.</p>
  //     </body>
  //   </html>
  // `;

  //   const FROM_ADDRESS = "hr_no-reply@adininworks.com";
  //   const TO_ADDRESS = "Hr-notification@adininworks.com";

  //   try {
  //     if (!Array.isArray(dataCandi)) {
  //       throw new Error("dataCandi must be an array.");
  //     }

  //     const matchTempIDs = dataCandi.map((val) => {
  //       return IVSSDetails?.find((match) => val.tempID === match?.tempID);
  //     });

  //     const validMatches = matchTempIDs.filter((item) => item?.id);

  //     if (validMatches.length === 0) {
  //       console.error("No matching candidates found.");
  //       return;
  //     }

  //     for (const match of validMatches) {
  //       const data = {
  //         id: match.id,
  //         candidateStatus: "Rejected",
  //         status: "Rejected"
  //       };

  //       try {
  //         setIsLoading(true);

  //         const response = await client.graphql({
  //           query: updateInterviewSchedule,
  //           variables: { input: data },
  //         });

  //         await sendEmail(
  //           REJECTED_CANDY_SUB,
  //           REJECTED_CANDY_MSG,
  //           FROM_ADDRESS,
  //           TO_ADDRESS
  //         );

  //         setIsLoading(false);
  //         setTimeout(() => {
  //           setNotification(true);
  //         }, 100);
  //       } catch (err) {
  //         console.error("Error updating candidate ID", match.id, ":", err);
  //       }
  //     }

  //     onClose();
  //   } catch (err) {
  //     console.error("Error in handleRejected function:", err);
  //     // setEmailSuccessMessage("Failed to send email. Please try again later.");
  //   }
  // };

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
        const matchIVSS = IVSSDetails?.find((match) => val.tempID === match?.tempID);
        const matchPI = empPDData?.find((match) => val.tempID === match?.tempID);
        
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
          status: "Rejected"
        };
  
        // Check which table (IVSSDetails or empPDData) the match belongs to
        if (match.tempID && IVSSDetails?.some((ivss) => ivss.tempID === match.tempID)) {
          try {
            setIsLoading(true);
  
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
            setNotiText("Canditate Rejected Successfully.")
           
            setTimeout(() => {
              setNotification(true);
            }, 300);
       
          } catch (err) {
            console.error("Error updating candidate ID in interviewSchedule:", match.id, ":", err);
          }
        } else if (match.tempID && empPDData?.some((pi) => pi.tempID === match.tempID)) {
          try {
            setIsLoading(true);
  
            // Update the personal details if it's found in empPDData
            const response = await client.graphql({
              query: updatePersonalDetails,
              variables: {
                input: {
                  id: match.id,
                  status: "Inactive"
                }
              },
            });

            // console.log("Res", response);
             setIsLoading(false);
            await sendEmail(
              REJECTED_CANDY_SUB,
              REJECTED_CANDY_MSG,
              FROM_ADDRESS,
              TO_ADDRESS
            );

            setIsLoading(false);
            setNotiText("Canditate Rejected Successfully.")
            setTimeout(() => {
              setNotification(true);
            }, 300);
            
          } catch (err) {
            console.error("Error updating candidate ID in personalDetails:", match.id, ":", err);
          }
        }
      }
  
      // onClose();
    } catch (err) {
      console.error("Error in handleRejected function:", err);
    }
  }
  const handleSelected = async (dataCandi) => {
    console.log(dataCandi);
    const SELECTED_CANDY_SUB = `Candidate Selected Notification:`;

    const SELECTED_CANDY_MSG = `
    <html>
      <body>
        <p>Subject: Selected Candidates Notification:</p> 
        <p>Dear HR,</p>    
        <p>We have completed the selection process, and 
        the following candidates have been selected for the position: <Strong>${dataCandi[0]?.position}</Strong>.</p>
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
        return IVSSDetails?.find((match) => val.tempID === match?.tempID);
      });

      const validMatches = matchTempIDs.filter((item) => item?.id);

      if (validMatches.length === 0) {
        return;
      }

      for (const match of validMatches) {
        const data = {
          id: match.id,
          status: "Selected",
        };

        try {
          setIsLoading(true);

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

          setIsLoading(false);

          setNotiText("Candidate Selected Successfully")
          setTimeout(() => {
            setNotification(true);
          }, 300);

        } catch (err) {
          console.log("error: ", err);
        }
      }
    } catch (err) {
      console.log(err);
      console.error("Error in handleSelected function:", err);
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
      const result = await getUrl({ path: pathUrl });
      setImageUrl(result.url.toString());
    };

    if (candidate?.profilePhoto) {
      linkToImageFile(candidate.profilePhoto);
    }
  }, [candidate?.profilePhoto]);

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
                    <h3 className="font-bold underline mb-4">Family Details {idx + 1}</h3>
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
          <div className="flex justify-center py-12 gap-12">
            {showDecisionButtons !== undefined && (
              <>
                {!showDecisionButtons && (
                  <>
                    <button
                      className="hover:bg-medium_red hover:border-black border-2 border-black px-20 py-3 shadow-xl rounded-md"
                      onClick={() => {
                        handleRejected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Reject"}
                    </button>
                    <button
                      className="hover:bg-[#d7d23c] bg-[#faf362] px-16 py-3 font-medium shadow-xl rounded-md"
                      onClick={handleScheduleInterview}
                    >
                      Schedule Interview 
                    </button>
                  </>
                )}

                {/* Conditionally render the Rejected and Selected buttons */}
                {showDecisionButtons && (
                  <>
                    <button
                      className="hover:bg-medium_red hover:border-black border-2 border-black px-20 py-3 shadow-xl rounded-md"
                      onClick={() => {
                        handleRejected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Reject"}
                    </button>

                    <button
                      className="hover:bg-[#d7d23c] bg-[#faf362] px-16 py-3 font-medium shadow-xl rounded-md"
                      onClick={() => {
                        handleSelected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Selected"}
                    </button>
                  </>
                )}
              </>
            )}

            {notification && (
              <SpinLogo
                text={notiText}
                notification={notification}
                path="/recrutiles/status"
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
