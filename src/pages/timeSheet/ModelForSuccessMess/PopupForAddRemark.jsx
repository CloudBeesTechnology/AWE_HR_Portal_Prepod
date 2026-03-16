import React, { useState } from "react";

import img from "../../../assets/logo/logo-with-name.svg";
import { IoCloseCircleOutline } from "react-icons/io5";
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
        <div className="flex justify-between items-center pb-2">
          <p className="flex-1"></p>
          {/* <div className="flex-1"> */}
          <img
            className="max-w-[180px] flex-1 w-full"
            src={img}
            alt="not found"
          />
          {/* </div> */}
          <button
            onClick={() => {
              if (passSelectedData) {
                const data = {
                  ...passSelectedData,
                  status: "Rejected",
                };
                addRemarks(data);
                addEditedRemarks?.(data);
                toggleForRemarkFunc();
              }
            }}
            className="text-dark_grey flex-1 flex justify-end"
          >
            <IoCloseCircleOutline className="text-[30px]  text-dark_grey cursor-pointer " />
          </button>
        </div>
        <header className="flex justify-center items-center ">
          <h2 className="text-dark_grey text-[20px] font-bold ">
          Add Remark
          </h2>
        </header>
        {/* Remark Field */}
        <div className="">
          {/* <label className="block text-dark_grey text_size_5">Add Remark</label> */}
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="mt-1 p-2 w-full border border-lite_grey rounded-md outline-none"
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
