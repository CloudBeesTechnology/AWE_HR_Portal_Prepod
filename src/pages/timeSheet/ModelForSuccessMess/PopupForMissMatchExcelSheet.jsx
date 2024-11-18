import React from "react";

export const PopupForMissMatchExcelSheet = () => {
  return (
    <div className="flex justify-center">
      <div className=" flex flex-col items-center gap-5 p-5 px-16  rounded shadow-lg">
        <p className="text-dark_grey text_size_5">Message :</p>
        <p className={`text-dark_grey `}>
          Your excel sheet is not expected format
        </p>
        <p className={`text-[#00DF0F] text_size_5`}>ERROR</p>
      </div>
    </div>
  );
};
