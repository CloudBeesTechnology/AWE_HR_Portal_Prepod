import React, { useState, useEffect, useContext } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { ScheduleInter } from "./Form/ScheduleInter";
import { updateInterviewSchedule } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../utils/SpinLogo";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { DataSupply } from "../../utils/DataStoredContext";

const client = generateClient();

export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => {
  // Pass showDecisionButtons as a prop
  const { IVSSDetails } = useContext(DataSupply);
  console.log(IVSSDetails);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const { personalDetails } = useLeaveManage();

  const handleScheduleInterview = () => {
    setIsScheduleOpen(true);
  };

  const closeScheduleInterview = () => {
    setIsScheduleOpen(false);
  };

  console.log("hey buddy", personalDetails);

  const handleRejected = async (dataCandi) => {
    try {
      if (!Array.isArray(dataCandi)) {
        throw new Error("dataCandi must be an array.");
      }

      const matchTempIDs = dataCandi.map((val) => {
        return IVSSDetails?.find((match) => val.tempID === match?.tempID);
      });

      const validMatches = matchTempIDs.filter((item) => item?.id);

      if (validMatches.length === 0) {
        console.error("No matching candidates found.");
        console.log("dataCandi:", dataCandi);
        console.log("IVSSDetails:", IVSSDetails);
        return;
      }

      for (const match of validMatches) {
        console.log("Updating candidate with ID:", match.id);

        const data = {
          id: match.id,
          candidateStatus: "Rejected",
        };

        try {
          const response = await client.graphql({
            query: updateInterviewSchedule,
            variables: { input: data },
          });

          console.log(
            "Update successful for candidate ID",
            match.id,
            ":",
            response
          );
          setNotification(true); // Show notification on success
        } catch (err) {
          console.error("Error updating candidate ID", match.id, ":", err);
        }
      }

      onClose(); // Close the modal after rejection
    } catch (err) {
      console.error("Error in handleRejected function:", err);
    }
  };

  const handleSelected = async (dataCandi) => {
    try {
      if (!Array.isArray(dataCandi)) {
        throw new Error("dataCandi must be an array.");
      }

      const matchTempIDs = dataCandi.map((val) => {
        return IVSSDetails?.find((match) => val.tempID === match?.tempID);
      });

      const validMatches = matchTempIDs.filter((item) => item?.id);

      if (validMatches.length === 0) {
        // console.log(error);
        console.log("dataCandi:", dataCandi);
        console.log("IVSSDetails:", IVSSDetails);
        return;
      }

      for (const match of validMatches) {
        console.log("Updating candidate with ID:", match.id);

        const data = {
          id: match.id,
          candidateStatus: "Selected",
        };

        try {
          const response = await client.graphql({
            query: updateInterviewSchedule,
            variables: { input: data },
          });

          console.log(
            "Update successful for candidate ID",
            match.id,
            ":",
            response
          );
        } catch (err) {
          console.log(err);

          console.error("Error updating candidate ID", match.id, ":", err);
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
                src={candidate.profilePhoto}
                alt={`${candidate.name}'s photo`}
                className="w-32 h-36 border-2 border-lite_grey shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
              />
            </div>
            {[
              { label: "Applying For", value: candidate.position },
              { label: "Experience", value: candidate.noExperience },
              { label: "Previous Company", value: candidate.workExperience },
              { label: "Contract", value: candidate.contractType },
              { label: "Type", value: candidate.empType },
              { label: "CV Received From", value: candidate.agent },
              { label: "Qualification", value: candidate.eduDetails },
              { label: "Name", value: candidate.name },
              { label: "Nationality", value: candidate.nationality },
              { label: "Race", value: candidate.race },
              { label: "Gender", value: candidate.gender },
              { label: "Date of Birth", value: candidate.dob },
              { label: "Age", value: candidate.age },
              { label: "Marital Status", value: candidate.marital },
              { label: "Religion", value: candidate.religion },
              { label: "Country of Birth", value: candidate.cob },
              { label: "Language Profiency", value: candidate.lang },
              { label: "Home Address", value: candidate.permanentAddress },
              { label: "Email", value: candidate.email },
              { label: "Contact", value: candidate.contactNo },
              { label: "Brunei IC No.", value: candidate.bwnIcNo},
              { label: "Brunei IC Colour.", value: candidate.bwnIcColour},
              { label: "Brunei IC Expiry", value: candidate.bwnIcExpiry },
              { label: "Malaysia IC No.", value: candidate.alternateNo },
              { label: "Passport No.", value: candidate.ppNo },
              { label: "Passport Issue Date", value: candidate.ppIssued },
              { label: "Passport Expiry Date", value: candidate.ppExpiry },
              { label: "Passport Issued Place", value: candidate.ppDestinate },
              { label: "Next of Kin Info", value: candidate.familyDetails },
              { label: "Emergency Contact", value: candidate.emgDetails },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <strong className="w-full">{item.label}</strong>
                <span className="w-full col-span-2">: &nbsp;{item.value}</span>
              </div>
            ))}
          </div>

          {/* Bottom Buttons: Reject and Schedule Interview */}
          <div className="flex justify-center mt-6 gap-5">
            {!showDecisionButtons && (
              <>
                <button
                  className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                  onClick={handleRejected}
                >
                  Reject
                </button>
                <button
                  className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                  onClick={handleScheduleInterview} // Opens the schedule interview form
                >
                  Schedule Interview
                </button>
              </>
            )}

            {/* Conditionally render the Rejected and Selected buttons */}
            {showDecisionButtons && (
              <>
                <button
                  className="hover:bg-medium_red hover:border-medium_red border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                  onClick={() => {
                    handleRejected([candidate]); // Pass candidate as an array
                  }}
                >
                  Rejected
                </button>

                <button
                  className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                  onClick={() => {
                    handleSelected([candidate]);
                    // console.log(candidate);
                  }}
                >
                  Selected
                </button>
              </>
            )}
            {notification && (
              <SpinLogo
                text="Candidate Selected Successfully"
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
