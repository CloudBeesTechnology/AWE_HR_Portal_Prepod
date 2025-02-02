import React, { useState, useEffect } from "react";
import { UpdateEmpReqData } from "../../services/updateMethod/UpdateEmpReqData";

export const RemarksDialog = ({ isOpen, onClose, requestId, initialRemarks, onRemarkUpdated }) => {
  const [remarks, setRemarks] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRemarks(initialRemarks || ""); 
    }
  }, [isOpen, initialRemarks]);

  const handleCancel = () => {
    setRemarks(""); 
    onClose();
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Call the update method
      const response = await UpdateEmpReqData({
        requestId: requestId,
        newRemark: remarks,
      });

      console.log("Remark updated successfully:", response);

      // Notify parent component to update the table
      if (onRemarkUpdated) {
        onRemarkUpdated(requestId, remarks);
      }
    } catch (error) {
      console.error("Error updating remark:", error);
    } finally {
      setIsSaving(false);
      setRemarks(""); 
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-grey bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="mb-4 text-xl font-semibold">Remarks</h3>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md resize-y"
          placeholder="Enter your remarks here..."
          aria-label="Remarks"
        ></textarea>
        <div className="mt-4 flex justify-center">
          <button
            className="hover:bg-grey border-2 border-grey hover:text-white px-4 py-1 mr-2 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`hover:bg-[#faf362] border-2 border-yellow px-4 py-1 rounded-lg ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};












// import React, { useState, useEffect } from "react";

// export const RemarksDialog = ({ isOpen, onClose, onSave, initialRemarks }) => {
//   const [remarks, setRemarks] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setRemarks(initialRemarks || ""); 
//     }
//   }, [isOpen, initialRemarks]);

//   const handleCancel = () => {
//     setRemarks(""); 
//     onClose();
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     await onSave(remarks); 
//     setIsSaving(false);
//     setRemarks(""); 
//     onClose();
//   };

//   return isOpen ? (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h3 className="mb-4 text-xl font-semibold">Remarks</h3>
//         <textarea
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           rows="4"
//           className="w-full p-2 border rounded-md resize-y"
//           placeholder="Enter your remarks here..."
//           aria-label="Remarks"
//         ></textarea>
//         <div className="mt-4 flex justify-center">
//           <button
//             className="hover:bg-grey border-2 border-grey hover:text-white px-4 py-1 mr-2 rounded-lg"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className={`hover:bg-[#faf362] border-2 border-yellow px-4 py-1 rounded-lg ${
//               isSaving ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={handleSave}
//             disabled={isSaving}
//           >
//             {isSaving ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };
