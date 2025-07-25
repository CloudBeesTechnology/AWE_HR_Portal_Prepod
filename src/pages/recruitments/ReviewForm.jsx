import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { ScheduleInter } from "./Form/ScheduleInter";
import { FaTimes, FaDownload } from "react-icons/fa";
import {
  createInterviewSchedule,
  updateInterviewSchedule,
  updatePersonalDetails,
} from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../utils/SpinLogo";
import { DataSupply } from "../../utils/DataStoredContext";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { getUrl } from "@aws-amplify/storage";
import { sendEmail } from "../../services/EmailServices";
import { DateFormat } from "../../utils/DateFormat";
import defaultAvatar from "../../assets/navabar/defaultAvatar.jpg";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const client = generateClient();

export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => {
  const { IVSSDetails, empPDData, educDetailsData } = useContext(DataSupply);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [notiText, setNotiText] = useState("");
  const [pathText, setPathText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [lastUploadUrl, setPPLastUP] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to fetch the cloud URL

  const candyEducDeatils = educDetailsData.find(
    (education) => education.tempID === candidate.tempID
  );

  const handleRejected = async (dataCandi) => {
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

    const CANDIDATE_REJECTION_MSG = `
    <html>
      <body>
         <p>Subject: Candidate Rejection Update Position:– ${dataCandi[0]?.position}</p>    
         <p>Dear ${dataCandi[0]?.name},</p>    
         <p>After careful evaluation, we regret to inform you that you have not been selected for <br/> the position: <strong>${dataCandi[0]?.position}</strong>.</p>
         <p>Best regards,<br>HR Team.</p>
     </body>
   </html>
`;

    const FROM_ADDRESS = "hr_no-reply@adininworks.com";
    const TO_ADDRESS = "Hr-notification@adininworks.com";
    const TO_ADDRESS_CANDY = dataCandi[0]?.email;

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

            await sendEmail(
              REJECTED_CANDY_SUB,
              CANDIDATE_REJECTION_MSG,
              FROM_ADDRESS,
              TO_ADDRESS_CANDY
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

            await sendEmail(
              REJECTED_CANDY_SUB,
              REJECTED_CANDY_MSG,
              FROM_ADDRESS,
              TO_ADDRESS
            );

            await sendEmail(
              REJECTED_CANDY_SUB,
              CANDIDATE_REJECTION_MSG,
              FROM_ADDRESS,
              TO_ADDRESS_CANDY
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

  // console.log("Cnady", candidate);

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

    const CANDIDATE_NOTIFICATION_MSG = `
    <html>
      <body>
        <p>Subject: Congratulations on Your Selection!</p>
        <p>Dear ${dataCandi[0]?.name},</p>
        <p>We are pleased to inform you that you have been selected for <br/> the position of <strong>${dataCandi[0]?.position}</strong> with our company.</p>
        <p>We are excited to have you join our team, and we will be in <br/> touch shortly with further details about the next steps in the hiring process.</p>
        <p>Best regards,<br>HR Team.</p>
      </body>
    </html>
    `;

    const FROM_ADDRESS = "hr_no-reply@adininworks.com";
    const TO_ADDRESS = "Hr-notification@adininworks.com";
    const TO_ADDRESS_CANDY = dataCandi[0]?.email;

    try {
      if (!Array.isArray(dataCandi)) {
        throw new Error("dataCandi must be an array.");
      }

      const ivssCandidates = IVSSDetails;

      const tempIdsCandi = dataCandi.map((val) => val?.tempID);

      const matchTempIDs = ivssCandidates.filter((ivss) =>
        tempIdsCandi.includes(ivss?.tempID)
      );

      if (matchTempIDs.length > 0) {
        setIsLoading("Selected");

        const match = matchTempIDs[0];
        const data = {
          id: match.id,
          status: "Selected",
          candidateStatus: "pending",
        };

        try {
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

          await sendEmail(
            SELECTED_CANDY_SUB,
            CANDIDATE_NOTIFICATION_MSG,
            FROM_ADDRESS,
            TO_ADDRESS_CANDY
          );
        } catch (err) {
          // console.log("Error during update call: ", err);
        }
      } else {
        const createData = {
          tempID: tempIdsCandi[0],
          status: "Selected",
        };

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
      // console.log(err);
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

        if (fetchedUrl && !fetchedUrl.includes("undefined")) {
          setImageUrl(fetchedUrl);
        } else {
          setImageUrl(defaultAvatar);
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
        setImageUrl(defaultAvatar);
      }
    };

    if (candidate?.profilePhoto) {
      linkToImageFile(candidate.profilePhoto);
    } else {
      setImageUrl(defaultAvatar);
    }
  }, [candidate?.profilePhoto]);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(false);
    };
  }, [imageUrl]);

  const parseJson = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  };

  // Parse work experience, education details, and family details
  const workExperience = parseJson(candidate?.workExperience);
  const eduDetails = parseJson(candidate?.eduDetails);
  // console.log("EDuc", eduDetails);

  const familyDetails = parseJson(candidate?.familyDetails);
  const emgDetails = parseJson(candyEducDeatils?.emgDetails);
  const referees = parseJson(candyEducDeatils?.referees);
  const relatives = parseJson(candyEducDeatils?.relatives);

  const linkToStorageFile = async (pathUrl) => {
    if (!pathUrl) {
      console.error("No URL provided for the file.");
      return; // Exit early if no path is provided
    }
    try {
      const result = await getUrl({ path: pathUrl });

      setPPLastUP(result.url.href);
      setViewingDocument(pathUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the file URL:", error);
      setLoading(false);
    }
  };

  const parseDocuments = (docData) => {
    // Handle null or undefined input
    if (!docData) {
      return [];
    }

    // Case: array with one JSON string element (e.g., ['[{"upload": "..."}]'])
    if (
      Array.isArray(docData) &&
      typeof docData[0] === "string" &&
      docData[0].trim().startsWith("[{")
    ) {
      try {
        const parsed = JSON.parse(docData[0]);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (doc) => doc.upload && !doc.upload.includes("undefined")
          );
        }
      } catch (err) {
        // console.error("Failed to parse JSON string in array:", err);
        return [];
      }
    }

    // Case: JSON string directly (e.g., '{"upload":"..."}')
    if (typeof docData === "string" && docData.trim().startsWith("[{")) {
      try {
        const parsed = JSON.parse(docData);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (doc) => doc.upload && !doc.upload.includes("undefined")
          );
        }
      } catch (err) {
        // console.error("Failed to parse JSON string:", err);
        return [];
      }
    }

    // Case: string path
    if (typeof docData === "string" && !docData.includes("undefined")) {
      return [{ upload: docData }];
    }

    // Case: array of strings or objects
    if (Array.isArray(docData)) {
      return docData
        .filter(
          (doc) => doc && typeof doc === "string" && !doc.includes("undefined")
        )
        .map((doc) => ({ upload: doc }));
    }

    // Unrecognized format
    // console.error("Invalid document data format:", docData);
    return [];
  };

  const closeModal = () => {
    setViewingDocument(null);
  };

  const handleScheduleInterview = () => {
    setIsScheduleOpen(true);
  };

  const closeScheduleInterview = () => {
    setIsScheduleOpen(false);
  };

  // console.log("Candy",candyEducDeatils);

  const renderDocumentsUnderCategory = (documents) => {
    return (
      <>
        {documents?.map((document, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
          >
            <div className="flex justify-center items-center">
              <button
                onClick={() => linkToStorageFile(document.upload)}
                className="text-dark_grey font-semibold text-sm"
              >
                View Document
              </button>
            </div>

            {/* Conditional rendering of PDF or image */}
            {viewingDocument === document?.upload &&
              document?.upload?.endsWith(".pdf") && (
                <div className="py-6 fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg shadow-lg w-[40vw] max-h-full flex flex-col">
                    {/* PDF Viewer */}
                    <div className="flex-grow overflow-y-auto">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={lastUploadUrl || ""} />
                      </Worker>
                    </div>

                    <div className="absolute top-2 right-2">
                      <button
                        onClick={closeModal}
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-6 py-4">
                      <div className="mt-2 flex">
                        <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                          <a href={lastUploadUrl} download>
                            Download
                          </a>
                          <FaDownload className="ml-2 mt-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {/* Image Viewer */}
            {viewingDocument === document?.upload &&
              !document?.upload?.endsWith(".pdf") && (
                <div className="mt-4">
                  <div className="relative invoice-content bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
                    <div>
                      <img
                        src={lastUploadUrl} // Use the URL for the image
                        alt="Document Preview"
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Close Button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setViewingDocument(null)} // Close the viewer
                        className="bg-red-600 text-black px-3 py-1 rounded-full text-sm hover:bg-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="mt-2 flex">
                      <button className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex gap-2">
                        <a href={lastUploadUrl} download>
                          Download
                        </a>
                        <FaDownload className="ml-2 mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </>
    );
  };

  const renderDocumentCategory = (uploadArray, categoryName) => {
    let documents = [];

    if (uploadArray && uploadArray.length > 0) {
      // Handle both string and array cases for categories like "UploadResume"
      if (
        categoryName === "UploadResume" ||
        categoryName === "Brunei IC" ||
        categoryName === "Malaysian IC"
      ) {
        // If it's a string, wrap it in an array, else treat it as an array
        documents = parseDocuments(uploadArray);
      } else {
        // For other categories, process normally (assuming it's an array of file paths)
        documents = parseDocuments(uploadArray);
      }
    }

    return (
      <div className="py-4">
        <h6 className="uppercase text_size_5 my-3">{categoryName}</h6>
        {documents.length > 0 ? (
          renderDocumentsUnderCategory(documents)
        ) : (
          <p className="text-dark_grey font-semibold text-sm">
            No documents available
          </p>
        )}
      </div>
    );
  };

  // console.log("IMG",imageUrl);
  

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
              {isLoaded ? (
                <img
                  src={imageUrl}
                  alt={`${candidate.name}'s photo`}
                  className="w-32 h-36 border-2 border-lite_grey shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt={`${candidate.name}'s photo`}
                  className="w-32 h-36 border-2 border-lite_grey shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
                />
              )}
            </div>

            {/* Section One */}
            <div className="mt-6">
              {[
                {
                  label: "Applying For The Position",
                  value: candidate.position,
                },
                { label: "Type", value: candidate.empType },
                { label: "Contract", value: candidate.contractType },
                { label: "CV Received From", value: candidate.agent },
                { label: "Name", value: candidate.name },
                { label: "Chinese characters", value: candidate.chinese },
                { label: "Gender", value: candidate.gender },
                { label: "Date of Birth", value: DateFormat(candidate.dob) },
                { label: "Age", value: candidate.age },
                { label: "Email", value: candidate.email },
                { label: "Marital Status", value: candidate.marital },
                { label: "Country of Birth", value: candidate.cob },
                { label: "Nationality", value: candidate.nationality },
                { label: "Other Nationality", value: candidate.otherNation },
                { label: "Race", value: candidate.race },
                { label: "Other Race", value: candidate.otherRace },
                { label: "Religion", value: candidate.religion },
                { label: "Other Religion", value: candidate.otherReligion },

                { label: "Contact Number", value: candidate.contactNo },
                { label: "Alternate Number", value: candidate.alternateNo },
                { label: "Present Address", value: candidate.presentAddress },
                {
                  label: "Permanent Address",
                  value: candidate.permanentAddress,
                },
                { label: "Driving License Class", value: candidate.driveLic },

                {
                  label: "Language Proficiency",
                  value: candidate.lang
                    ? typeof candidate.lang === "string"
                      ? candidate.lang.replace(/\[|\]/g, "")
                      : candidate.lang.join(", ")
                    : "N/A",
                },
                { label: "Other Language", value: candidate.otherLang },
                { label: "Brunei IC No.", value: candidate.bwnIcNo },
                { label: "Brunei IC Colour", value: candidate.bwnIcColour },
                {
                  label: "Brunei IC Expiry",
                  value: DateFormat(candidate.bwnIcExpiry),
                },
                { label: "Passport No.", value: candidate.ppNo },
                {
                  label: "Passport Issued Date",
                  value: DateFormat(candidate.ppIssued),
                },
                {
                  label: "Passport Expiry Date",
                  value: DateFormat(candidate.ppExpiry),
                },
                {
                  label: "Passport Issued Destination",
                  value: candidate.ppDestinate,
                },

                {
                  label: "Brief Description of Present Duties",
                  value: candyEducDeatils.desc,
                },
                {
                  label:
                    "Have you ever suffered from any disease or received treatment",
                  value: candyEducDeatils.disease,
                },
                {
                  label: "If yes, Details ",
                  value: candyEducDeatils.diseaseDesc,
                },
                {
                  label: "Were you ever an alcoholic or substance abuser",
                  value: candyEducDeatils.liquor,
                },
                {
                  label: "If yes, Details",
                  value: candyEducDeatils.liquorDesc,
                },
                {
                  label: "Have you ever been convicted of a crime",
                  value: candyEducDeatils.crime,
                },
                {
                  label: "If yes, Details",
                  value: candyEducDeatils.crimeDesc,
                },
                {
                  label: "Number of Years Experience",
                  value: candyEducDeatils.noExperience,
                },
                {
                  label: "Salary Expected",
                  value: candyEducDeatils.salaryExpectation,
                },
                {
                  label: "Termination Notice For Present Job",
                  value: candyEducDeatils.noticePeriod,
                },
                {
                  label:
                    "Have you been interviewed for a position at this company before",
                  value: candyEducDeatils.perIS,
                },
                {
                  label: "If yes, Details",
                  value: candyEducDeatils.perIDesc,
                },
                {
                  label: "Any other information you wish to provide",
                  value: candyEducDeatils.supportInfo,
                },
              ].map((item, index) => (
                <div key={index} className="center  mb-4 leading-relaxed">
                  <strong className="w-full max-w-[200px]">{item.label}</strong>
                  <span className="w-[50px] text-center">:</span>
                  <span className="w-full">{item.value || "N/A"}</span>
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
                      <strong className="w-full">Name</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.name || "N/A"}
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
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Place of Occupation</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.placeOfOccupation || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Occupation</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.occupation || "N/A"}
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
                      <strong className="w-full">From - To</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.fromDate || "N/A"} -{" "}
                        {item.toDate || "N/A"}
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
                        : &nbsp;{item.name || "N/A"}
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
                        : &nbsp;{DateFormat(item.from) || "N/A"} -{" "}
                        {DateFormat(item.to) || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Salary</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.salary || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Reason For Leaving</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.reasonForLeaving || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {referees?.length > 0 && (
              <div className="mt-6">
                {referees.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Referees Details {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Name</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.name || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Address</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.address || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Phone Number</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.phoneNumber || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Profession</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.profession || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {relatives?.length > 0 && (
              <div className="mt-6">
                {relatives.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Relatives Employed by the company Details {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Name</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.name || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Position Held</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.positionHeld || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Relationship</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.relationship || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {emgDetails?.length > 0 && (
              <div className="mt-6">
                {emgDetails.map((item, idx) => (
                  <div key={idx} className="mb-6 border rounded p-4">
                    <h3 className="font-bold underline mb-4">
                      Emergency Details {idx + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Name</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.name || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Relationship</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.relationship || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Address</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.address || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Phone Number</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.phoneNumber || "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <strong className="w-full">Blood Group</strong>
                      <span className="w-full col-span-2">
                        : &nbsp;{item.bloodGroup || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Document categories */}

            <div className="mt-8">
              <h6 className="uppercase text_size_5  my-3">
                Uploaded Documents:
              </h6>
              {renderDocumentCategory(
                [candyEducDeatils.uploadResume],
                "Resume"
              )}
              {renderDocumentCategory(
                [candyEducDeatils.uploadCertificate],
                "Qualification Certificate"
              )}
              {renderDocumentCategory(
                [candyEducDeatils.uploadPp],
                "Passport"
              )}
              {renderDocumentCategory(
                [candyEducDeatils.uploadIc],
                "IC"
              )}
            </div>
          </div>

          {/* Bottom Buttons: Reject and Schedule Interview */}
          <div className="">
            {showDecisionButtons !== undefined && (
              <>
                {/* First Block: Reject, Schedule Interview, and Selected */}
                {!showDecisionButtons && (
                  <div className="flex justify-between space-x-4 py-12 px-14">
                    <button
                      className="hover:bg-rejectHover bg-rejectRed text-white font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
                      onClick={() => {
                        handleRejected([candidate]);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading === "Rejected" ? "Loading..." : "Reject"}
                    </button>

                    <button
                      className="hover:bg-[#3f4a54] bg-blue text-white  font-semibold shadow-xl rounded-md px-4 py-2"
                      onClick={handleScheduleInterview}
                    >
                      Schedule Interview
                    </button>

                    <button
                      className="hover:bg-selectGreenHover bg-selectGreen text-white  font-semibold shadow-xl rounded-md px-4 py-2 min-w-[140px] max-w-[140px]"
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
