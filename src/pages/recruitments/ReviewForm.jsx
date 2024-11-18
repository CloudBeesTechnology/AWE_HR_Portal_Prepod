import React, { useState, useEffect } from "react";
import AweLogo from "../../assets/logo/logo-with-name.svg";
import { ScheduleInter } from "./Form/ScheduleInter";
import { updateInterviewScheduleSchema } from "../../graphql/mutations";
import { updatePersonalDetails } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";
import { SpinLogo } from "../../utils/SpinLogo";
import { useLeaveManage } from "../../hooks/useLeaveManage";
import { HandleRejectCandidates } from "../../services/updateMethod/HandleRejectCandidates";

const client=generateClient()


export const ReviewForm = ({ candidate, onClose, showDecisionButtons }) => {
  // Pass showDecisionButtons as a prop
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  const {personalDetails} = useLeaveManage();
  const { isRejected, isLoading, error, rejectCandidate } = HandleRejectCandidates();


  // Function to handle opening the Schedule Interview modal
  const handleScheduleInterview = () => {
    setIsScheduleOpen(true);
  };

  // Function to handle closing the Schedule Interview modal
  const closeScheduleInterview = () => {
    setIsScheduleOpen(false);
  };

  console.log("hey buddy", personalDetails)

  // const handleRejected = async () => {
  //   try {
  //     // Ensure tempID is valid before proceeding
  //     if (!candidate.id) {
  //       throw new Error('Candidate ID is missing or invalid');
  //     }
      
  //     const data = {
  //       id: candidate.id,
  //       status: "Inactive", // Update status to "Inactive"
  //     };

  //     const response = await client.graphql({
  //       query: updatePersonalDetails,  // Use your update mutation here
  //       variables: { input: data },
  //     });

  //     // Handle success
  //     console.log('Candidate status updated to "Inactive" successfully', response);
  //     setNotification(true);
  //     onClose();  // Close the review form/modal

  //   } catch (error) {
  //     console.error('Error updating candidate status:', error.message);
  //   }
  // };
  const handleRejected = () => {
    rejectCandidate(candidate.id, () => {
      setNotification(true);  // Set notification to true after successful rejection
      onClose();  // Close the modal after rejection
    });
  };


  const handleSelected = async (id) => {
    try {
      // Ensure tempID is valid before proceeding
      if (!id) {
        throw new Error('tempID is missing or invalid');
      }
      console.log(id);
      
      // Log the input object for debugging
      const data = {
        id:id,
        // Ensure this is the correct field name as per your GraphQL schema
        candidateStatus: "Selected",
      };
      
      const response = await client.graphql({
        query: updateInterviewScheduleSchema,  // Replace with your actual GraphQL mutation
        variables: { input:data },
      }) .then((res)=>{
        console.log(res);
  
        setNotification(true);
        onClose();
        
      }).catch((err)=>{
        console.log(err);
        
      })
    
      // Log the response from the mutation
      console.log('Mutation Response:', response);
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
      // Handle .then((he response and check if the update was successful
      // if (response.data && response.data.updateInterviewScheduleSchema) {
      //   console.log('Candidate status updated to "Selected" successfully');


      //   // Optionally hide the notification after a delay
      // } else {
      //   console.error('Failed to update candidate status');
      // }
  
      // // Close any modal or UI component if needed (optional)
     
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
      <div className="fixed top-0 left-0 inset-0 bg-grey bg-opacity-80 center z-[60]">
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

            {/* Candidate Info */}
            {[
              { label: "Applying For", value: candidate.position },
              { label: "Name", value: candidate.name },
              { label: "Gender", value: candidate.gender },
              { label: "Nationality", value: candidate.nationality },
              { label: "Experience", value: candidate.noExperience },
              { label: "Contract", value: candidate.contractType },
              { label: "Type", value: candidate.empType },
              { label: "Email", value: candidate.email },
              { label: "Contact", value: candidate.contactNo },
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
                  onClick={handleRejected}
                >
                  Rejected
                </button>
                <button
                  className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 shadow-xl rounded-lg"
                  onClick={() => {
                    handleSelected(candidate.id);
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
                  path="/employee"
                  />)}
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {isScheduleOpen && (
        <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-50 w-full z-[70]">
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
