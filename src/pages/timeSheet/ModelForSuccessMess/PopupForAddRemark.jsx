import React, { useState } from "react";
// import img from "../../assets/logo/logo-with-name.svg";
import img from "../../../assets/logo/logo-with-name.svg";
export const PopupForAddRemark = ({
  toggleForRemarkFunc,
  addRemarks,
  passSelectedData,
  addEditedRemarks,
}) => {
  const [remark, setRemark] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <div className="">
            <img className="size-30 h-12 w-full" src={img} alt="not found" />
          </div>
          <button
            onClick={() => {
              if (passSelectedData) {
                const data = {
                  ...passSelectedData,
                  status: "Rejected",
                };
                addRemarks(data);
                addEditedRemarks?.(data);
              }
              toggleForRemarkFunc();
            }}
            className="text-dark_grey "
          >
            ✖
          </button>
        </div>

        {/* Remark Field */}
        <div className="mt-4">
          <label className="block text_size_5">Add Remark</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md outline-none"
            rows="4"
            placeholder="Enter your remark..."
            data-gramm="false"
          ></textarea>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (passSelectedData) {
                const data = {
                  ...passSelectedData,
                  REMARKS: remark,
                  status: "Rejected",
                };
                addRemarks(data);
                addEditedRemarks?.(data);
              }

              toggleForRemarkFunc();
            }}
            className="px-4 py-2 text-dark_grey text_size_5 border bg-primary rounded border-primary"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
