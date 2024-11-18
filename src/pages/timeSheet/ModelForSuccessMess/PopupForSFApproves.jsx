import React from "react";

export const PopupForSFApproves = ({
  toggleSFAMessage,
  setExcelData,
  icons,
  iconColor,
  textColor,
  title,
  message,
  btnText,
}) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative ">
          <div
            className={`absolute  left-44 -top-5 text-5xl ${iconColor} z-50 `}
          >
            {icons}
          </div>
          <div className="border w-[409px] h-[218px]  border-lite_grey rounded shadow-md  bg-white pt-12">
            <div>
              <div className=" flex flex-col items-center gap-5">
                <p className={`text_size_2 ${textColor}`}>{title}</p>
                <p className={` text-dark_grey  text_size_6 `}>{message}</p>

                <button
                  className=" p-2 rounded border-[#FEF116] bg-[#FEF116] text-dark_grey text_size_5 w-52"
                  onClick={() => {
                    toggleSFAMessage(null);
                    setExcelData?.(null);
                  }}
                >
                  {btnText}
                </button>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};
