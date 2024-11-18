import React, { useState, useEffect } from 'react';

export const RemarksDialog = ({ isOpen, onClose, onSave, initialRemarks }) => {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRemarks(initialRemarks || ""); 
    }
  }, [isOpen, initialRemarks]);

  const handleCancel = () => {
    setRemarks(""); 
    onClose();
  };

  const handleSave = () => {
    onSave(remarks); 
    setRemarks(""); 
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Remarks</h3>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md"
          placeholder="Enter your remarks here..."
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            className="hover:bg-grey border-2 border-grey hover:text-white px-4 py-1 mr-2 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="hover:bg-[#faf362] border-2 border-yellow px-4 py-1 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

