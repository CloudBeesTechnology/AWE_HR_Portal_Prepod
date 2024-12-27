import React from "react";
import { MdCancel } from "react-icons/md";

export const PopupForMissMatchExcelSheet = ({ setClosePopup }) => {
  return (
    // <div className="flex justify-center">
    //   <div className=" flex flex-col items-center gap-5 p-5 px-16  rounded shadow-lg">
    //     <p className="text-dark_grey text_size_5">Message :</p>
    //     <p className={`text-dark_grey `}>
    //       Your excel sheet is not expected format
    //     </p>
    //     <p className={`text-[#00DF0F] text_size_5`}>ERROR</p>
    //   </div>
    // </div>
    <div className="flex justify-center">
      <div className="relative flex flex-col items-center gap-5 p-5 px-16 rounded shadow-lg border border-lite_grey bg-white">
        {/* Cancel Icon */}
        <div>
          <button
            className="absolute top-2 right-2 text-dark_grey "
            onClick={() => {
              setClosePopup(false);
            }}
          >
            <MdCancel className=" text-[25px]  text-dark_grey" />
          </button>
        </div>
        <div className="flex flex-col items-center  gap-2">
        {/* Message Content */}
        <p className="text-dark_grey text_size_3 font-semibold">Alert!</p>
        <p className="text-dark_grey text-center text_size_6">
          The uploaded Excel sheet does not match the expected format.
        </p>
        <p>Please verify the structure and try uploading again.</p>
        <p className="text-[#FF0000] text_size_5 font-bold">ERROR</p>
        </div>
      </div>
    </div>
  );
};
